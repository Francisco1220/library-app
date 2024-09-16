const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
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

let deleteButtons;
let getElementsAtIndex;
// Add the required number of child divs and p elements(one for each book) and append them to the container div 
let specificChildDiv;
let i = 0;

function addCards () {
        const childDiv = document.createElement("div");
        childDiv.setAttribute("class", "card");
        containerDiv.appendChild(childDiv); 
        childDiv.id = `div${i}`;
        childDiv.setAttribute("data-index", `${i}`);
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
        createToggleBtn(childDiv);
        // toggleReadStatus ();
        i++;
        deleteButtons = document.querySelectorAll(".deleteBtn");
        deleteBook();
}

let n = 0;

// Displays book info
function displayBookInfo (i,element) {
        const title = element.querySelector(`#div${i} > .p1`);
        title.innerHTML = myLibrary[i].title;
        title.setAttribute("data-index", `${i}`);
        const author = element.querySelector(`#div${i} > .p2`);
        author.style.fontStyle = "italic";
        author.innerHTML = "by "+ myLibrary[i].author;
        author.setAttribute("data-index", `${i}`);
        const pages = element.querySelector(`#div${i} > .p3`);
        pages.innerHTML = myLibrary[i].pages + " pages";
        pages.setAttribute("data-index", `${i}`);
        const read = element.querySelector(`#div${i} > .p4`);
        read.setAttribute("data-index", `${i}`);
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
        read = "Not Read";
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
    for (let i = 0; i < myLibrary.length; i++) {
        deleteBookBtn.setAttribute("data-index", `${i}`);
    }
}

// Delete Book from Library and DOM
function deleteBook() {
    for(let i = 0; i < myLibrary.length; i++) {
        deleteButtons[i].addEventListener("click", () => {
            let getIndex = deleteButtons[i].getAttribute("data-index");
            document.querySelectorAll(`[data-index="${getIndex}"]`).forEach(e => e.remove());
            delete myLibrary[`${getIndex}`];
        });
    }
}

// create toggle button between "read" "not read" on Book prototype instance.

function createToggleBtn (parentNode) {
    const toggleReadBtn = document.createElement("button");
    toggleReadBtn.innerHTML = "Read"; // Will change this later, but for now will do
    toggleReadBtn.setAttribute("class", "toggleBtn");
    parentNode.appendChild(toggleReadBtn);
    for (let i = 0; i < myLibrary.length; i++) {
        toggleReadBtn.setAttribute("data-index", `${i}`);
    }
    toggleReadStatus ();
}

let checkEventListener = false;
// toggle button should change myLibrary.read value and also changes the .p4 innerHTML 
function toggleReadStatus () {
    let toggleBtn = document.querySelectorAll(".toggleBtn"); // generate nodeList
    for (let i = 0; i < myLibrary.length; i++) {
        // Ensure that only a single event listener is attached to each read button
        if (toggleBtn[i].getAttribute("data-event-listener-attached") != "true") {
            toggleBtn[i].addEventListener("click", () => {
            // toggleBtn[i].setAttribute("data-event-listener-attached", "true");
            // checkEventListener = toggleBtn[i].getAttribute("data-event-listener-attached");
                let getIndex = toggleBtn[i].getAttribute("data-index");
                let readText = document.querySelector(`.p4[data-index="${getIndex}"]`);
                let readStatus = myLibrary[`${getIndex}`].read;
                if (readStatus === "Read") {
                    myLibrary[`${getIndex}`].read = "Not Read";
                    readText.innerHTML = myLibrary[`${getIndex}`].read;
                    readText.style.color="rgb(255, 0, 0)";
                } else if (readStatus === "Not Read") {
                    myLibrary[`${getIndex}`].read = "Read";
                    readText.innerHTML = myLibrary[`${getIndex}`].read;
                    readText.style.color="rgb(0, 179, 0)";
                }
            });
            toggleBtn[i].setAttribute("data-event-listener-attached", "true");
        }
    }
}

