// getting book title, author, pages and was read
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const wasRead = document.querySelector("#was-read");
const bookComments = document.querySelector("#comment");

// prevent default submit and create book in library
const submitButton = document.querySelector("#add-book-btn").addEventListener(
    'click', (event) => {
        event.preventDefault();

        if (addBookToLibrary()) {
            removeAllBooks();

            myLibrary.sort((book1, book2) => {
                // Extract surnames from full names
                const surname1 = book1.author.split(' ').pop().toLowerCase();
                const surname2 = book2.author.split(' ').pop().toLowerCase();
              
                // Compare surnames for sorting
                return surname1.localeCompare(surname2);
              });

            displayLibrary(myLibrary);
        }
    }
)

const bookPlace = document.querySelector("#books");

const myLibrary = [];

function Book(title, author, pages, wasRead, comments) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.wasRead = wasRead,
    this.comments = comments;
}

const bookHobbit = new Book("Hobbit", "Tolkien", 320, false, "its Good");
const bookPride = new Book("Pride and Prejudice", "Jane", 250, true, "its better than movie!");

myLibrary.push(bookHobbit);
myLibrary.push(bookPride);

function addBookToLibrary() {
    if (bookTitle.value == "") {
        alert("Book needs to have a title");
    }
    else if (bookAuthor.value == "") {
        alert("Book needs to have an author");
    }
    else if (bookPages.value == "") {
        alert("Book needs to have some pages");
    }
    else {
        myLibrary.push(new Book(bookTitle.value, bookAuthor.value, 
            bookPages.value, wasRead.checked, bookComments.value
        ))
        bookTitle.value = '';
        bookAuthor.value = '';
        bookPages.value = '';
        wasRead.checked = false;
        bookComments.value = '';

        return true;
    }
        return false;
    
}

function displayLibrary(library) {
    library.forEach(book => {
        // add author, title and pages
        const headTitleAuthor = document.createElement("h2");
        headTitleAuthor.className = "title-and-author";
        headTitleAuthor.textContent = `${book.title} by ${book.author}`;

        const pages = document.createElement("h3");
        pages.className = "pages";
        pages.textContent = `${book.pages} pages`;

        const titleDiv = document.createElement("div");
        titleDiv.className = "title-author-pages";

        titleDiv.appendChild(headTitleAuthor);
        titleDiv.appendChild(pages);

        // add div for comments
        const commentsDiv = document.createElement("div");
        commentsDiv.className = "comments-and-rating";

        const comment = document.createElement("p");
        comment.className = "comment";

        comment.textContent = book.comments;

        commentsDiv.appendChild(comment);

        // add div for options
        const optionsDiv = document.createElement("div");
        optionsDiv.className = "book-options";

        // was read button
        const anchorRead = document.createElement("a");
        const imgRead = document.createElement("img");
        imgRead.src = "assets/read btn.svg";

        anchorRead.addEventListener('click', () => {
            if (mainDiv.className == "book book-read") {
                mainDiv.className = "book book-not-read";
            }
            else if (mainDiv.className == "book book-not-read") {
                mainDiv.className = "book book-read";
            }
        });

        anchorRead.appendChild(imgRead);

        // edit button
        const anchorEdit = document.createElement("a");
        const imgEdit = document.createElement("img");
        imgEdit.src = "assets/edit.svg";

        anchorEdit.addEventListener('click', () => {
            let editMessage = prompt(`You sure you want to edit ${book.bookTitle}?\n Type 'yes' to continue.`);
            if (editMessage.trim().toLowerCase() == 'yes') {
                bookTitle.value = book.title;
                bookAuthor.value = book.author;
                bookPages.value = book.pages;
                wasRead.value = book.wasRead;
                bookComments.value = book.comments;

                mainDiv.remove();

                myLibrary.pop(book);

                displayLibrary(myLibrary);
            }
        });

        anchorEdit.appendChild(imgEdit);

        // delete button
        const anchorDelete = document.createElement("a");

        // make delete button delete the div
        anchorDelete.addEventListener('click', () => {
            let decision = prompt('Type "delete" to delete the book');
            if (decision == "delete") {
                myLibrary.pop(book);
                mainDiv.remove();
            }
        });

        const imgDelete = document.createElement("img");
        imgDelete.src = "assets/delete.svg";
        anchorDelete.appendChild(imgDelete);

        // add all buttons to div
        optionsDiv.appendChild(anchorRead);
        optionsDiv.appendChild(anchorEdit);
        optionsDiv.appendChild(anchorDelete);
        
        // add all divs to main div
        const mainDiv = document.createElement("div");

        // conditional styling of book card
        if (book.wasRead == true) {
            mainDiv.className = "book book-read";
        }
        else {
            mainDiv.className = "book book-not-read";
        }

        mainDiv.appendChild(titleDiv);
        mainDiv.appendChild(commentsDiv);
        mainDiv.appendChild(optionsDiv);

        // add div to the book place
        bookPlace.appendChild(mainDiv);
    });
}

function removeAllBooks() {
    const bookElements = document.querySelectorAll('.book');

    bookElements.forEach(book => {
        book.remove();
    });
}

displayLibrary(myLibrary);