// prevent default submit
const submitButton = document.querySelector("#add-book-btn").addEventListener(
    'click', (event) => {
        event.preventDefault();
    }
)

const myLibrary = [];

function Book(title, author, pages, wasRed) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.wasRed = wasRed;
}

function addBOokToLibrary() {
    
}
