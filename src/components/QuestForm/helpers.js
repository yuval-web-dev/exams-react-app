export const testStringPattern = (s, pattern) => {
  const patternRegex = new RegExp(pattern)
  return patternRegex.test(s)
}