'use strict';

let myLibrary = [];

function Book(title, author, pages, language, read) {
  this.title = title.toUpperCase().trim();
  this.author = author.trim();
  this.pages = pages;
  this.language = language;
  this.read = read;
}


Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

Book.prototype.AddReadStatusBtn = function (read) {
  const readButton = document.createElement("button");
  readButton.classList.add("btn-rounded");
  readButton.classList.add("btn-rounded_dark");
  readButton.textContent = this.read ? "Mark as unread" : "Mark as read";

  readButton.addEventListener("click", () => {
    this.toggleReadStatus();
    readButton.textContent = this.read ? "Mark as unread" : "Mark as read";
    read.textContent = this.read ? "Read" : "Unread";

    // Update the counts in the counters section
    updateCounters();
  });

  return readButton;
};

Book.prototype.toggleRemove = function (bookCard) {
  const removeButton = document.createElement("button");
  removeButton.classList.add("btn-rounded");
  removeButton.classList.add("btn-rounded_light");
  removeButton.textContent = "Delete";

  removeButton.addEventListener("click", () => {
    // Remove the book at the specified card index from the myLibrary array
    myLibrary.splice(bookCard.getAttribute("key"), 1);

    // Re-render the book cards in the library section
    displayBooks();

    // Update the counts in the counters section
    updateCounters();
  });
  return removeButton;
};

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
  regenerateUpdateValue(myLibrary);
  updateCounters();

  //filter search
  const searchBtn = document.getElementById("search-book-btn");
  searchBtn.addEventListener("click", filterSearch);

  //Show read books
  const selectShowReadBooks = document.getElementById("show-read-btn");
  selectShowReadBooks.addEventListener("click", showReadBtn);

  //show unread books
  const showUnreadBooks = document.getElementById("show-unread-btn");;
  showUnreadBooks.addEventListener("click", showUnreadBtn);

  //Show all books
  const showAllBooks = document.getElementById("show-all-btn");
  showAllBooks.addEventListener("click", showAllBtn);
}

//filter search func
function filterSearch(event) {
  event.preventDefault();

  const input = document.getElementById("search").value.trim();

  if (input === "") {
    return;
  }

  const searchKeywords = input.toLowerCase().split(' ');

  const filteredByTitle = myLibrary.filter((book) => {
    const bookTitle = book.title.toLowerCase();
    return searchKeywords.some(keyword => bookTitle.includes(keyword));
  });

  regenerateUpdateValue(filteredByTitle);
  document.getElementById("search").value = "";
}

//Show read books
function showReadBtn() {
  regenerateUpdateValue(myLibrary.filter((book) => book.read));
}

//Show unread books
function showUnreadBtn() {
  regenerateUpdateValue(myLibrary.filter((book) => !book.read));
}

//Show all books
function showAllBtn() {
  regenerateUpdateValue(myLibrary);
}

function regenerateUpdateValue(books) {
  const libraryContainer = document.getElementById("book-cards");

  libraryContainer.innerHTML = "";

  books.forEach((book, index) => {
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

    //Read status button card
    const readButton = book.AddReadStatusBtn(read);
    bookCard.appendChild(readButton);

    //set index to card
    bookCard.setAttribute("key", index);

    //remove button card
    const removeButton = book.toggleRemove(bookCard);
    bookCard.appendChild(removeButton);

    //append everythig to libraryContainer
    libraryContainer.appendChild(bookCard);
    // console.log(libraryContainer);
  });
}

// Call the displayBooks function initially to display the book cards on the page
displayBooks();

//manage the counters for total books, read and unread books
function updateCounters() {
  const totalBooks = myLibrary.length;
  const totalReadBooks = myLibrary.filter((book) => book.read).length;
  const totalUnreadBooks = myLibrary.filter((book) => !book.read).length;

  const totalBooksCounter = document.getElementById("total-books");
  totalBooksCounter.textContent = totalBooks;

  const totalReadBooksCounter = document.getElementById("total-read-books");
  totalReadBooksCounter.textContent = totalReadBooks;

  const totalUnreadBooksCounter = document.getElementById("total-unread-books");
  totalUnreadBooksCounter.textContent = totalUnreadBooks;
}

updateCounters();

function handleFormSubmit(event) {
  event.preventDefault();

  addBookToLibrary();
  displayBooks();
  updateCounters();

  // Clear the form inputs
  event.target.reset();
}

// Add an event listener to the "ADD NEW BOOK" form to handle form submit
const addNewBook = document.getElementById("submit-book-form");
addNewBook.addEventListener("submit", handleFormSubmit);