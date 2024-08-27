const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

/* Takes existing myLibrary array and adds new additions(objects) as part of array */
function addBookToLibrary (...book) {
    for (let i = 0; i < book.length; i++) {
        myLibrary.push(book[i]);
    }
}

// Create parent div container
const containerDiv = document.createElement("div");
containerDiv.setAttribute("class", "container")
const body = document.querySelector("body");
body.appendChild(containerDiv);

// Add the required number of child divs and p elements(one for each book) and append them to the container div 
let specificChildDiv;
let i = 0;
function addCards () {
        const childDiv = document.createElement("div");
        childDiv.setAttribute("class", "card");
        containerDiv.appendChild(childDiv); 
        childDiv.id = `div${i}`;
        for (let i = 0; i < 4; i++) {
            const p = document.createElement("p");
            if (i === 0) {
                p.setAttribute("class", "p1");
            } else if (i === 1) {
                p.setAttribute("class", "p2");
            } else if (i === 2) {
                p.setAttribute("class", "p3");
            } else {
                p.setAttribute("class", "p4");
            }
            childDiv.appendChild(p);
        }
        displayBookInfo(i, childDiv);
        createRemoveBtn(childDiv);
        i++;
}

let n = 0;

// Displays book info
function displayBookInfo (i,element) {
        const title = element.querySelector(`#div${i} > .p1`);
        title.innerHTML = myLibrary[i].title;
        const author = element.querySelector(`#div${i} > .p2`);
        author.style.fontStyle = "italic";
        author.innerHTML = "by "+ myLibrary[i].author;
        const pages = element.querySelector(`#div${i} > .p3`);
        pages.innerHTML = myLibrary[i].pages + " pages";
        const read = element.querySelector(`#div${i} > .p4`);
        if (n === 0) {
            read.style.color = "rgb(0, 179, 0)";
            read.innerHTML = myLibrary[i].read;
        } else if (n === 1) {
            read.style.color = "rgb(255, 0, 0)";
            read.innerHTML = myLibrary[i].read;
            n--;
        }
}

const dialog = document.querySelector("dialog");
const showFormBtn = document.querySelector("h1 + button");
const submitFormBtn = document.getElementById("submit");

showFormBtn.addEventListener("click", () => {
    dialog.showModal();
});

submitFormBtn.addEventListener("click", function(event) {
    dialog.close();
    event.preventDefault();
    let title = document.getElementById("book_title").value;
    let author = document.getElementById("book_author").value;
    let pages = document.getElementById("book_pages").value;
    let yesRead = document.getElementById("read_yes");
    let notRead = document.getElementById("read_no");
    let read;
    if (yesRead.checked) {
        read = "Read";
    } else if (notRead.checked) {
        read = "Read";
        n++;
    }
    addBookToLibrary(new Book(title, author, pages, read));
    addCards();
    // clears form inputs
    let inputs = document.querySelectorAll("input");
    inputs.forEach(input => input.value = "");
});

// Create button and add to DOM
function createRemoveBtn (parentNode) {
        const deleteBookBtn = document.createElement("button");
        deleteBookBtn.innerHTML = "Remove";
        deleteBookBtn.setAttribute("class", "deleteBtn");
        parentNode.appendChild(deleteBookBtn);
}
