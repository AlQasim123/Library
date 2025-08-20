const myLibrary = [];

function Book(title, authur, pages, read) {
  // the constructor...
  this.title = title;
  this.authur = authur;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}
Book.prototype.readToggle = function () {
  this.read = this.read ? false : true;
};
function addBookToLibrary() {
  // take params, create a book then store it in the array
  const tempBook = new Book(
    titleIn.value,
    authurIn.value,
    pagesIn.value,
    checkRead.checked
  );
  myLibrary.push(tempBook);
}

// open the dialog btn
const addBtn = document.querySelector(".add");

// dialog & form element
const popUp = document.querySelector("dialog");
const bookForm = document.querySelector("form");
const titleIn = document.querySelector("#title");
const authurIn = document.querySelector("#authur");
const pagesIn = document.querySelector("#pages");
const checkRead = document.querySelector("#check-read");
const cancelBtn = document.querySelector(".cancel");

// the container for books
const container = document.querySelector(".books");

// Show The Pop Up And Close It
addBtn.addEventListener("click", () => {
  popUp.showModal();
});
cancelBtn.addEventListener("click", () => {
  popUp.close();
});

// Submit And Take The Data
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (bookForm.checkValidity()) {
    addBookToLibrary();
    displayBooks();
    popUp.close();
    bookForm.reset();
  }
});

// Display the Books
function displayBooks() {
  // take the book from the array and display it on the web after cleaning the container
  container.replaceChildren("");
  for (book of myLibrary) {
    const card = document.createElement("article");
    card.className = "book";
    card.setAttribute("data-id", book.id);

    const info = document.createElement("div");
    info.className = "info";

    // the delete btn for the book
    const delBtn = document.createElement("button");
    delBtn.className = "delete";
    delBtn.textContent = "X";
    delBtn.addEventListener("click", (e) => {
      myLibrary.forEach((bk, index) => {
        if (bk.id === card.getAttribute("data-id")) {
          myLibrary.splice(index, 1);
        }
      });
      container.removeChild(card);
    });

    // the read toggle for the book
    const toggleRead = document.createElement("label");
    toggleRead.className = "book-mark-label";
    const toggleCheck = document.createElement("input");
    toggleCheck.type = "checkbox";
    toggleCheck.className = "book-mark";
    toggleCheck.checked = book.read;
    const customMark = document.createElement("span");
    customMark.className = "custom-mark";

    toggleRead.appendChild(toggleCheck);
    toggleRead.appendChild(customMark);

    const bookTitle = document.createElement("h2");
    const bookAuthur = document.createElement("p");
    bookAuthur.className = "authur-name";
    const bookPages = document.createElement("span");
    bookPages.className = "book-pages";
    const stats = document.createElement("span");

    bookTitle.textContent = book.title;
    bookAuthur.textContent = `Author: ${book.authur}`;
    bookPages.textContent = `Pages: ${book.pages}`;
    stats.textContent = `Status: ${book.read ? "Read" : "Not Read"}`;

    toggleCheck.addEventListener("change", (e) => {
      myLibrary.forEach((bkread) => {
        if (bkread.id === card.getAttribute("data-id")) {
          bkread.readToggle();
        }
      });
      stats.textContent = `Status: ${e.target.checked ? "Read" : "Not Read"}`;
    });
    
    info.appendChild(bookAuthur);
    info.appendChild(bookPages);
    info.appendChild(stats);

    card.appendChild(bookTitle);
    card.appendChild(info);
    card.appendChild(delBtn);
    card.appendChild(toggleRead);
    container.appendChild(card);
  }
}
