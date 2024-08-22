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
const book3 = new Book("Life of Christ", "Fulton Sheen", 690, "read")


/* Takes existing myLibrary array and adds new additions(objects) as part of array*/
function addBookToLibrary (...book) {
    for (let i = 0; i < book.length; i++) {
        myLibrary.push(book[i]);
    }
}

/* Calls function */
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);


console.log(myLibrary);


