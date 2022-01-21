import fs from 'fs'
import path from 'path'

export default function resetCoverage() {
  const nycOutputDirPath = path.resolve(path.dirname(''), '.nyc_output')
  const coverageDirPath = path.resolve(path.dirname(''), 'coverage')

  fs.rmSync(nycOutputDirPath, { recursive: true, force: true })
  fs.rmSync(coverageDirPath, { recursive: true, force: true })
}
