const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

/* Manually adding books for now */
const book1 = new Book("The Hobbit", "J.R.R Tolkien", 320, "read");
const book2 = new Book("Life of Christ", "Fulton Sheen", 690, "read")



/* Takes existing myLibrary array and adds new additions(objects) as part of array */
function addBookToLibrary (...book) {
    for (let i = 0; i < book.length; i++) {
        myLibrary.push(book[i]);
    }
}

/* Calls function */
addBookToLibrary(book1);
addBookToLibrary(book2);

// Create parent div container
const containerDiv = document.createElement("div");
containerDiv.setAttribute("class", "container")
const body = document.querySelector("body");
body.appendChild(containerDiv);

// Add the required number of child divs and p elements(one for each book) and append them to the container div 
let specificChildDiv;
function addCards () {
    for (let i = 0; i < myLibrary.length; i++) {
        const childDiv = document.createElement("div");
        childDiv.setAttribute("class", "card");
        containerDiv.appendChild(childDiv); 
        childDiv.id = `div${i}`
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
        displayBookInfo(i,childDiv);
    }
}


addCards();

// Displays book info
function displayBookInfo (i,element) {
        const title = element.querySelector(`#div${i} > .p1`);
        title.innerHTML = myLibrary[i].title;
        const author = element.querySelector(`#div${i} > .p2`);
        author.innerHTML = "by "+ myLibrary[i].author;
        const pages = element.querySelector(`#div${i} > .p3`);
        pages.innerHTML = myLibrary[i].pages + " pages";
        const read = element.querySelector(`#div${i} > .p4`);
        read.innerHTML = myLibrary[i].read;
}

const dialog = document.querySelector("dialog");
const showFormBtn = document.querySelector("h1 + button");
const submitFormBtn = document.querySelector("type[submit]");

showFormBtn.addEventListener("click", () => {
    dialog.showModal();
});

submitFormBtn.addEventListener("click", (event) => {
    dialog.close();
});