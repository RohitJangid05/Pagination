let btn = document.getElementById("btn")
let movieTitle = document.getElementById("movie-title")
let container = document.getElementById("container")
let inputField = document.getElementById('inputField')

let page1 = document.getElementById("page1")
let page2 = document.getElementById("page2")
let page3 = document.getElementById("page3")


async function fetchApi(searchMovie, page = 1) {

    try {
        if (currentPage <= 1) {
            page1.style.display = "none"
        } else {
            page1.style.display = "flex"
        }
        let api_url = `http://www.omdbapi.com/?s=${searchMovie}&page=${page}&apikey=3f154a73`
        let responseData = await fetch(api_url)
        let data = await responseData.json()
        if (data.Response == "False") {
            alert("Sorry no movie found!!")
            fetchApi("avengers")
        }
        let movies = data.Search
        movieTitle.innerText = `${searchMovie}`
        container.innerHTML = ""
        movies.map(({ Poster, Title, Year, Type }) => {

            let movieTitle = Title.length > 20 ? Title.slice(0, 18) + "..." : Title

            container.innerHTML += `
            <div class="card">
                <img src="${Poster == "N/A" ? "dummyimg.jpg" : Poster}" alt="">
                <div class="text-container">
                    <h2 id="title">${movieTitle}</h2>
                    <h2><span>Year: </span>${Year}</h2>
                    <h2><span>Type: </span>${Type}</h2>
                </div>
            </div>
            `
        })
        inputField.value = ""

    } catch (error) {
        console.log(error.message)
    }
}

let mydata = "avengers"
let currentPage = 1

function updatePages(currentPage) {
    if (currentPage >= 1) {
        page1.innerText = currentPage - 1;
        page2.innerText = currentPage;
        page3.innerText = currentPage + 1;
    }
    fetchApi(mydata, currentPage);
}

function increment() {
    currentPage++;
    updatePages(currentPage);
}
function decrement() {
    currentPage--;
    updatePages(currentPage);
}

// page3.addEventListener("click", () => {
//     increment()
// })

// btnRight.addEventListener("click", () => {
//     increment()
// });

// page1.addEventListener("click", () => {
//     decrement()
// })

// btnLeft.addEventListener("click", () => {
//     decrement()
// });

fetchApi("avengers", currentPage)

btn.addEventListener("click", async (e) => {
    e.preventDefault()
    let searchData = inputField.value
    if(searchData==""){
        alert("Please Enter a move name")
        return
    }
    mydata = searchData
    currentPage = 1
    updatePages(currentPage)
    fetchApi(searchData, currentPage)
})
