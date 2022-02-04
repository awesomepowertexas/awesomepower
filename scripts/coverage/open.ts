import open from 'open'
import path from 'path'

const coverageFilePath = path.resolve('.nyc/coverage/index.html')

await open(coverageFilePath, { app: { name: open.apps.chrome } })
