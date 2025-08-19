const myLibrary = [];

function Book(title, authur, pages) {
  // the constructor...
  this.title = title;
  this.authur = authur;
  this.pages = pages;
  this.id = crypto.randomUUID();
}

function addBookToLibrary() {
  // take params, create a book then store it in the array
  const tempBook = new Book(titleIn.value, authurIn.value, pagesIn.value);
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

    const bookTitle = document.createElement("h2");
    const bookAuthur = document.createElement("p");
    const bookPages = document.createElement("span");

    bookTitle.textContent = book.title;
    bookAuthur.textContent = `Author: ${book.authur}`;
    bookPages.textContent = `Pages: ${book.pages}`;

    info.appendChild(bookAuthur);
    info.appendChild(bookPages);

    card.appendChild(bookTitle);
    card.appendChild(info);
    card.appendChild(delBtn);

    container.appendChild(card);
  }
}
