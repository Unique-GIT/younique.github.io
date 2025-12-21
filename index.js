let mainDoc = document.querySelector(".main-doc")

let routes = {
    Home: "./pages/home_page.html",
    BlogList : "./pages/blog_list.html",
    ProfessionalPage : "./pages/professional.html"
}

async function loadPage(page){

    if(page in routes){
        let filePath = routes[page];
        let content = await fetch(filePath)
        let html = await content.text();

        mainDoc.innerHTML = html
    }
    else{
        console.log(page)
        let errorText = "<h1>Ooops....There's an error fetching data ! </h1>"
        mainDoc.innerHTML = errorText
    }
}

var navbar = document.querySelector(".navbar")
        
navbar.addEventListener
            (
            "click",
            async (e)=>
                {
                    let element = e.srcElement
                    if(!element) return;

                    let response = await loadPage(element.dataset.page)
                }
            ,
            {
                capture:true
            }
            )

const navlinks = document.querySelectorAll(".navbar__link")

navlinks.forEach(link => {
    link.addEventListener
    (
        "click",
        () => 
        {
            navlinks.forEach(rlink => rlink.classList.remove("select__link"))
            link.classList.add("select__link")
        },
        {capture:true}        
    )
});

loadPage("Home")