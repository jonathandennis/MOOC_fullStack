const dummy = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return blogs.length === 0
    ? 1
    : blogs.reduce(reducer, 0) / blogs.length
}

module.exports = { dummy }