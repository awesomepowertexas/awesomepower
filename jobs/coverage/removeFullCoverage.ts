import consola from 'consola'
import fs from 'fs'
import { JSDOM } from 'jsdom'
import path from 'path'

export default function removeFullCoverage() {
  const filePath = path.resolve(path.dirname(''), 'coverage', 'index.html')

  fs.readFile(filePath, 'utf8', (error, html) => {
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

    fs.writeFile(
      filePath,
      window.document.documentElement.outerHTML,
      () => ({}),
    )
  })

  consola.info('Open this file in your browser the view the code coverage:')
  console.log()
  console.log(`    ${filePath}`)
  console.log()
}
