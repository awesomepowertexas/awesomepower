function randn(mean = 0.0, stdev = 1.0) {
  let u1, u2, v1, v2, s

  if (randn.v2 === null) {
    do {
      u1 = Math.random()
      u2 = Math.random()

      v1 = 2 * u1 - 1
      v2 = 2 * u2 - 1
      s = v1 * v1 + v2 * v2
    } while (s === 0 || s >= 1)

    randn.v2 = v2 * Math.sqrt((-2 * Math.log(s)) / s)
    return stdev * v1 * Math.sqrt((-2 * Math.log(s)) / s) + mean
  }

  v2 = randn.v2 as number
  randn.v2 = null

  return stdev * v2 + mean
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
randn.v2 = null

export function rSkewNorm(
  alpha = 0,
  loc = 0,
  scale = 1,
  min = -Infinity,
  max = Infinity,
) {
  let u0, v, u1, ret

  const sigma = alpha / Math.sqrt(1 + Math.pow(alpha, 2))

  var generate = function () {
    u0 = randn()
    v = randn()
    u1 = sigma * u0 + Math.sqrt(1 - Math.pow(sigma, 2)) * v

    if (u0 >= 0) {
      return u1 * scale + loc
    }
    return -u1 * scale + loc
  }

  do {
    ret = generate()
  } while (ret < min || ret > max)

  return ret
}
