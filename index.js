let mainDoc = document.querySelector(".main-doc")

const pagesDirectory = "./pages/"
const scriptsDirectory = "./scripts/"

const routes = {
    Home: "home_page",
    BlogList : "blog_list",
    ProfessionalPage : "professional"
}

// add function , to do something once page loads 
async function onLoadPage(html,thisFunction){
    mainDoc.innerHTML = html // inner html is updated
    await thisFunction();
}

// load page 
async function loadPage(page){

    if(page in routes){
        let filePath = routes[page];

        // get content
        const contentPath = pagesDirectory + filePath + ".html"
        const content = await fetch(contentPath)
        const html = await content.text();

        // get script 
        if(page == "Home"){
            const scriptPath = scriptsDirectory + filePath + ".js"
            const response = await import(scriptPath)
            onLoadPage(html,response.onLoad)
        }
        else{
            function doNothing(){
                return
            }
            onLoadPage(html,doNothing)
        }

    }
    else{
        const errorHTML = "<h1>Ooops....There's an error fetching data ! </h1>"
        function onError(){
            console.log("Hey man... couldn't the route is wrong")
        }
        onLoadPage(errorHTML,onError)
    }
}

// add eventlistener to navbar to get the page loaded
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

// add eventlistener to each navbar block , to update the select__link 
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