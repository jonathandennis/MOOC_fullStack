const dummy = (blogs) => {
  return blogs.length === 0
    ? 1
    : 1
}

const totalLikes = (blogs) => {
  const getLikes = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(getLikes, 0)
}

const favoriteBlog = (blogs) => {
  const getFavorite = (max, item) => {
    console.log('Comparing: ', max, item)
    return (max.likes > item.likes)
      ? max
      : item
  }
  const { author, title, likes } = blogs.reduce(getFavorite, 0)
  return { author, title, likes }
}

module.exports = { dummy, totalLikes, favoriteBlog }