
const path = "../Blogs_html/About Me.html"

export async function onLoad(){
    let mainDoc = document.querySelector(".homepage-main-doc")
    let content = await fetch(path)
    let html = await content.text()
    mainDoc.innerHTML = html
}
