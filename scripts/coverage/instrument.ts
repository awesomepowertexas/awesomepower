import fs from 'fs'
import path from 'path'
import shell from 'shelljs'

fs.rmSync(path.resolve('.nyc/instrumented'), { recursive: true, force: true })
fs.mkdirSync(path.resolve('.nyc/instrumented/.git'), { recursive: true })
shell.exec('rsync -a . .nyc/instrumented --exclude .git --exclude .next')
shell.exec('cd .nyc/instrumented && pnpm install')
shell.exec('cd .nyc/instrumented && pnpm exec nyc instrument src --in-place')
