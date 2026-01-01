let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;
    //1.Div Container -- result-item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);

    //2.Anchor Title -- result-title
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank"; // to open a link in new tab
    resultItemEl.appendChild(resultTitleEl);
    //3.Title break 
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);
    //4.Anchor URL -- result-url
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);
    //5.Line break
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);
    //6.Paragraph Desription -- line-descripiton
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("line-descripiton");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);
}

function displayResults(search_results) {
    spinnerEl.classList.toggle("d-none");
    for (let result of search_results)
        createAndAppendSearchResult(result);
}

function searchWikipedia(event) {
    if (event.key === 'Enter') {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle('d-none');
        let searchInput = searchInputEl.value;
        let url = 'https://apis.ccbp.in/wiki-search?search=' + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);