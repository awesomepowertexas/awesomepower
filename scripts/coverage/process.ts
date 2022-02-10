import fs from 'fs'
import { JSDOM } from 'jsdom'
import path from 'path'
import shell from 'shelljs'

const coverageFilePath = path.resolve('.nyc/coverage/index.html')
const outputFilePath = path.resolve('.nyc/output/out.json')

if (fs.existsSync(outputFilePath)) {
  // Remove ".nyc/instrumented/" from output file
  const coverageOutputString = fs.readFileSync(outputFilePath, 'utf8')
  fs.writeFileSync(
    outputFilePath,
    coverageOutputString.replace(/.nyc\/instrumented\//g, ''),
  )

  // Run istanbul report
  shell.exec('pnpm nyc report')

  // Remove 100% covered files from HTML report
  const html = fs.readFileSync(coverageFilePath, 'utf8')
  const { window } = new JSDOM(html)
  const trs = [...window.document.body.getElementsByTagName('tr')]

  for (const tr of trs) {
    let td_100_count = 0

    for (const td of tr.getElementsByTagName('td')) {
      if (td.innerHTML === '100%') {
        td_100_count++
      }
    }

    if (td_100_count === 4) {
      tr.remove()
    }
  }

  fs.writeFileSync(coverageFilePath, window.document.documentElement.outerHTML)
}
