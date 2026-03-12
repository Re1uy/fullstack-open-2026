const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0
    blogs.forEach(blog => {
        total += blog.likes
    });
    return total
}

const favoriteBlog = (blogs) => {
    let favoriteblog
    if (blogs.length > 0) {
        favoriteblog = blogs[0]
    } else {
        return 0 
    }
    blogs.forEach(blog => {
        if (blog.likes > favoriteblog.likes) {
            favoriteblog = blog
        }
    });

    let returnblog = {title : favoriteblog.title, author: favoriteblog.author, likes : favoriteblog.likes}
    return returnblog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}