const job = (await import(`./${process.argv[2]}.js`)) as {
  default: () => Promise<void>
}

await job.default()

export default job
