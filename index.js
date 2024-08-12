import "https://code.jquery.com/jquery-3.7.1.min.js"

/**
 * 
 * @param {string} content 
 */
function place_img_post(content, img_path) {
    let lines = content.split("\n")
    let post = $('<div class="imgpost post">')
    let img = $(`<img src="posts/${img_path}">`)

    post.append(img)
    let text = $('<div class="imgtxt">')

    for (let i of lines) {
        text.append($("<a>").text(i))
        text.append("<br>")
    }
    
    text.ready(function () {
        img.css("--size", text.height()*4)
        img.height(text.height()*4)
    })
    post.append(text)
    $(".container").append(post)
}

/**
 * 
 * @param {string} content 
 */
function place_post(content) {
    const lines = content.split("\n")
    const img_match = lines[0].trim().match("img_[a-zA-Z0-9]*[.][a-zA-Z]*")
    if (img_match !== null && img_match[0] === lines[0].trim()) {
        return place_img_post(
            lines.slice(1).join("\n"), 
            lines[0].substring(4))
    }
    let post = $('<div class="txtpost post">')

    for (let i of lines) {
        post.append($("<a>").text(i))
        post.append("<br>")
    }
    
    // post.append(content)
    $(".container").append(post)
}

$(function () {
    $.get(
        "posts.txt",
        /**
         * 
         * @param {string} data 
         */
        function (data) {
            for (let i of data.split("\n")) {
                console.log(`Got ${i}.txt with exit code ${$.get(`posts/${i}.txt`, place_post).readyState}`)
            }
        }
    )
})
