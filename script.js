const myLibrary = [];

//Constructor for creating book objects

function Book(title, author, pages, read){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//function to add books to library/ creating book objects

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}
//function to toggle read status

Book.prototype.toggleRead = function(){
    this.read =  !this.read;
}

// function to toggle specific book

function toggleBookRead(id){
    const book = myLibrary.find(book => book.id === id);
    if(book){
        book.toggleRead();
    }
}
const libraryContainer = document.getElementById("library");

// function to display library

function displayLibrary(){
    libraryContainer.innerHTML = "";
    myLibrary.forEach(book => {

    //creating new book div for each books

      const bookDiv = document.createElement("div");
      const toggleReadButton = document.createElement("button");
      toggleReadButton.textContent = book.read ? "Mark as Unread":"Mark as Read"
      bookDiv.dataset.bookId = book.id;
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", (e) => {
        const id = e.target.parentElement.dataset.bookId;
        removeBookFromLibrary(id);
        displayLibrary();
      });
      toggleReadButton.addEventListener("click",(e)=>{
        const id = e.target.parentElement.dataset.bookId;
        toggleBookRead(id);
        displayLibrary();
      });
      const info = document.createElement("p");
      info.textContent = 
      `${book.title} by ${book.author} | ${book.pages} pages | Read: ${book.read}`;
      bookDiv.appendChild(info);
      bookDiv.appendChild(removeButton);
      bookDiv.appendChild(toggleReadButton);
      libraryContainer.appendChild(bookDiv);
    });
}

// function to remove book from library

function removeBookFromLibrary(id){
    const index = myLibrary.findIndex(book => book.id === id );
    if(index !==-1){
        myLibrary.splice(index,1);
    }
}

// displayLibrary();

addBookToLibrary("The Psychology of Money","Morgan Housel", 400,true);
addBookToLibrary("Rich Dad Poor Dad","Robert Kiyosaki", 400,false);

//Clicking add book button

const newBookBtn = document.getElementById("newBookBtn");
newBookBtn.addEventListener("click", () => {
    document.getElementById("bookForm").style.display = "block";
})

//Submitting form for books

const form = document.getElementById("bookForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = +document.getElementById("pages").value;
    const read = document.getElementById("read").checked;
    addBookToLibrary(title, author, pages, read);
    displayLibrary();
    form.reset();
})
displayLibrary();
displayLibrary();

//selecting the library div