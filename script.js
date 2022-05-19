// Test Books
const bookTest = new Book(
  "Antoine de Saint-Exupéry",
  "Le Petit Prince",
  96,
  "on"
);

const bookTest2 = new Book("Herman Melville", "Moby Dick", 378, "off");

let myLibrary = [bookTest, bookTest2];

// Book object
function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read === "on" ? "Read" : "Not read yet";
}

function addBookToLibrary(author, title, pages, read = "off") {
  const newBook = new Book(author, title, pages, read);
  myLibrary.push(newBook);
  refreshLibrary();
}

const listOfBooks = document.querySelector(".list-of-books");

function refreshLibrary() {
  while (listOfBooks.firstChild) {
    listOfBooks.removeChild(listOfBooks.lastChild);
  }
  for (let i = 0, n = myLibrary.length; i < n; i++) {
    const book = document.createElement("div");
    book.className = "book";
    book.textContent = `${myLibrary[i].title} by ${myLibrary[i].author}, ${myLibrary[i].pages} pages.`;

    // Add "read" button
    const btnRead = document.createElement("button");
    btnRead.className = "read";
    btnRead.innerHTML =
      myLibrary[i].read === "Read" ? "I have read it" : "I haven't read it yet";
    btnRead.addEventListener("click", function (e) {
      btnRead.innerHTML =
        btnRead.innerHTML === "I have read it"
          ? "I haven't read it yet"
          : "I have read it";
    });
    book.appendChild(btnRead);

    // Add "remove" button
    const btnRemove = document.createElement("button");
    btnRemove.className = "delete";
    btnRemove.innerHTML = "X";
    btnRemove.addEventListener("click", function (e) {
      myLibrary.splice(i, 1);
      refreshLibrary();
    });

    book.appendChild(btnRemove);
    listOfBooks.appendChild(book);
  }
}

refreshLibrary();

// Request data from form and add book to library
const btnShowForm = document.getElementById("show-form");
const form = document.getElementById("book-form");

btnShowForm.addEventListener("click", function (e) {
  form.style.display = form.style.display == "none" ? "block" : "none";
});

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  addBookToLibrary(
    formProps.title,
    formProps.author,
    formProps.pages,
    formProps.read
  );
  form.reset();
  form.style.display = "none";
}
