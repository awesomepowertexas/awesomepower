import vision from '@google-cloud/vision'
import axios from 'axios'
import Canvas from 'canvas'
import { JSDOM } from 'jsdom'
import pdfjs from 'pdfjs-dist/legacy/build/pdf'

type CanvasAndContext = {
  canvas: Canvas.Canvas
  context: Canvas.CanvasRenderingContext2D
}

/**
 * Factory to create a canvas with a context
 */
export class NodeCanvasFactory {
  create(width: number, height: number) {
    const canvas = Canvas.createCanvas(width, height)
    const context = canvas.getContext('2d')

    return {
      canvas,
      context,
    }
  }

  reset(canvasAndContext: CanvasAndContext, width: number, height: number) {
    canvasAndContext.canvas.width = width
    canvasAndContext.canvas.height = height
  }

  destroy(canvasAndContext: CanvasAndContext) {
    canvasAndContext.canvas.width = 0
    canvasAndContext.canvas.height = 0
  }
}

/**
 * Return the Google Vision fullTextAnnotation of a remote PDF
 */
export async function getPdfText(
  url: string,
): Promise<string | null | undefined> {
  // Request PDF
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

  const response: { data: Uint8Array; headers: { 'content-type': string } } =
    await axios.get(url, { responseType: 'arraybuffer' })

  if (response.headers['content-type'].startsWith('text/html')) {
    const encoder = new TextDecoder('utf-8')
    const html = new JSDOM(encoder.decode(new Uint8Array(response.data)))

    return html.window.document.body.textContent
    //
  } else if (response.headers['content-type'].startsWith('application/pdf')) {
    const pdfDocument = await pdfjs.getDocument({
      data: response.data,
      cMapUrl: './node_modules/pdfjs-dist/cmaps/',
      cMapPacked: true,
      standardFontDataUrl: './node_modules/pdfjs-dist/standard_fonts/',
      verbosity: 0,
    }).promise

    const firstPage = await pdfDocument.getPage(1)

    // Render the page on a Node canvas
    const viewport = firstPage.getViewport({ scale: 1.0 })
    const canvasFactory = new NodeCanvasFactory()
    const canvasAndContext = canvasFactory.create(
      viewport.width,
      viewport.height,
    )
    const renderContext = {
      canvasContext: canvasAndContext.context,
      viewport,
      canvasFactory,
    }

    await firstPage.render(renderContext).promise
    const image = canvasAndContext.canvas.toBuffer()
    firstPage.cleanup()

    // Run Google Vision document text detection
    const visionClient = new vision.ImageAnnotatorClient()
    const textDetectionResponse = await visionClient.documentTextDetection({
      image: { content: image.toString('base64') },
    })

    return textDetectionResponse[0].fullTextAnnotation?.text
  }

  return ''
}
