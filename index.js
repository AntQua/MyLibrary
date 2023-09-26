'use strict';

let myLibrary = [];

function Book(title, author, pages, language, read) {
  this.title = title.toUpperCase().trim();
  this.author = author.trim();
  this.pages = pages;
  this.language = language;
  this.read = read;
}

//Get the form input data to the library array
function addBookToLibrary() {
  // Get user input from the form
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const language = document.getElementById("language").value;
  const read = document.getElementById("read").checked;

  //validate data from form
  if (
    title.trim() === '' ||
    author.trim() === '' ||
    pages === '' ||
    language === '') {
    alert('All fields are mandatory');
    return;
  }

  // Create a new Book object with the user input
  const newBook = new Book(title, author, pages, language, read);

  // Add the new Book object to the myLibrary array
  myLibrary.push(newBook);
}

//Render the book cards on the Library
function displayBooks() {
  const libraryContainer = document.getElementById("book-cards");

  libraryContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {

    const bookCard = document.createElement("div");

    bookCard.classList.add("book-card");

    const title = document.createElement("h3");
    title.textContent = book.title;
    bookCard.appendChild(title);

    const author = document.createElement("h4");
    author.textContent = `By: ${book.author}`;
    bookCard.appendChild(author);

    const pages = document.createElement("p");
    pages.textContent = `Nr Pages: ${book.pages}`;
    bookCard.appendChild(pages);

    const language = document.createElement("p");
    language.textContent = `Language: ${book.language}`;
    bookCard.appendChild(language);

    const read = document.createElement("p");
    read.textContent = book.read ? "Read" : "Unread";
    bookCard.appendChild(read);

    //Readstatus button card
    const readButton = document.createElement("button");
    readButton.classList.add("btn-rounded");
    readButton.classList.add("btn-rounded_dark");
    readButton.textContent = read ? "Mark as unread" : "Mark as read";
    readButton.addEventListener("click", () => {
      readButton.textContent = read ? "Mark as unread" : "Mark as read";
      read.textContent = read ? "Read" : "Unread";
    });
    bookCard.appendChild(readButton);

    //set index to card
    // bookCard.setAttribute("key", index);

    //remove button card
    const removeButton = document.createElement("button");
    removeButton.classList.add("btn-rounded");
    removeButton.classList.add("btn-rounded_light");
    removeButton.textContent = "Delete book";
    bookCard.appendChild(removeButton);

    //append everythig to libraryContainer
    libraryContainer.appendChild(bookCard);
    console.log(libraryContainer);
  });
}

// Call the displayBooks function initially to display the book cards on the page
displayBooks();

function handleFormSubmit(event) {
  event.preventDefault();

  addBookToLibrary();
  displayBooks();

   // Clear the form inputs
  event.target.reset();
}


// Add an event listener to the "ADD NEW BOOK" form to handle form submit
const addNewBook = document.getElementById("submit-book-form");
addNewBook.addEventListener("submit", handleFormSubmit);