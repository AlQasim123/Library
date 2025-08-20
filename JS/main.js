const myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}
Book.prototype.toggleReadStatus = function () {
  this.read = this.read ? false : true;
};
function addBookToLibrary() {
  // take params, create a book then store it in the array
  const newBook = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    formReadCheckbox.checked
  );
  myLibrary.push(newBook);
}

// open the dialog btn
const addBookButton = document.querySelector(".add-book-button");

// dialog & form element
const addBookDialog = document.querySelector("dialog");
const bookForm = document.querySelector("form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const formReadCheckbox = document.querySelector("#check-read");
const cancelButton = document.querySelector(".cancel-button");

// the booksContainer for books
const booksContainer = document.querySelector(".books");

// Show The Pop Up And Close It
addBookButton.addEventListener("click", () => {
  addBookDialog.showModal();
});
cancelButton.addEventListener("click", () => {
  addBookDialog.close();
});

// Submit And Take The Data
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (bookForm.checkValidity()) {
    addBookToLibrary();
    displayBooks();
    addBookDialog.close();
    bookForm.reset();
  }
});

// Display the Books
function displayBooks() {
  // take the book from the array and display it on the web after cleaning the booksContainer
  booksContainer.replaceChildren("");
  for (book of myLibrary) {
    const bookCard = document.createElement("article");
    bookCard.className = "book";
    bookCard.setAttribute("data-id", book.id);

    const bookDetails = document.createElement("div");
    bookDetails.className = "book-details";

    // the delete btn for the book
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", () => {
      const bookId = bookCard.getAttribute("data-id");
      const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
      if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        displayBooks();
      }
    });

    // the read toggle for the book
    const readToggleLabel = document.createElement("label");
    readToggleLabel.className = "read-toggle-label";
    const readCheckbox = document.createElement("input");
    readCheckbox.type = "checkbox";
    readCheckbox.className = "book-mark";
    readCheckbox.checked = book.read;
    const readToggleIndicator = document.createElement("span");
    readToggleIndicator.className = "read-toggle-indicator";

    readToggleLabel.appendChild(readCheckbox);
    readToggleLabel.appendChild(readToggleIndicator);

    const bookTitle = document.createElement("h2");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("span");
    const readStatus = document.createElement("span");

    bookTitle.textContent = book.title;
    bookAuthor.textContent = `Author: ${book.author}`;
    bookPages.textContent = `Pages: ${book.pages}`;
    readStatus.textContent = `Status: ${book.read ? "Read" : "Not Read"}`;

    readCheckbox.addEventListener("change", (e) => {
      const bookId = bookCard.getAttribute("data-id");
      const book = myLibrary.find((book) => book.id === bookId);
      if (book) {
        book.toggleReadStatus();
        readStatus.textContent = `Status: ${book.read ? "Read" : "Not Read"}`;
      }
    });

    bookDetails.appendChild(bookAuthor);
    bookDetails.appendChild(bookPages);
    bookDetails.appendChild(readStatus);

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookDetails);
    bookCard.appendChild(deleteButton);
    bookCard.appendChild(readToggleLabel);
    booksContainer.appendChild(bookCard);
  }
}
