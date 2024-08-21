// prevent default submit
const submitButton = document.querySelector("#add-book-btn").addEventListener(
    'click', (event) => {
        event.preventDefault();
    }
)

// getting book title, author, pages and was read
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const wasRead = document.querySelector("#was-read");

const myLibrary = [];

function Book(title, author, pages, wasRed) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.wasRed = wasRed;
}

function addBOokToLibrary() {
    
}
