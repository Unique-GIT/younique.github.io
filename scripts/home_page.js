export async function onLoad(){
    const path = "../Blogs_html/About%20Me.html"
    let mainDoc = document.querySelector(".homepage-main-doc")
    let content = await fetch(path)
    let html = await content.text()
    console.log("This is the home page file fetched:  ")
    console.log(html)
    mainDoc.innerHTML = html
}
