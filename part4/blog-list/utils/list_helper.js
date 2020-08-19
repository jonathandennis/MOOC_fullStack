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
  const { title, author, likes } = blogs.reduce(getFavorite, 0)
  return { title, author, likes }
}

// const mostBlogs =(blogs) => {
//   const result = Object.entries(blogs).reduce((a, b) => {
//     console.log('a', a)
//     console.log('b', b)
//     return a[1] > b[1] ? a : b
//   })
//   console.log('result', result)
//   console.log('number of blogs', result[0])
//   console.log('author of blogs', result.author)
// }

module.exports = { dummy, totalLikes, favoriteBlog }