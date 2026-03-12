// For Handelling single book
class Book{
    constructor(title, author, pages, read){
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead(){
        this.read = !this.read;
    }
}
// for handelling books collection
class Library{
    constructor(){
        this.books = [];
    }
    addBook(book){

        this.books.push(book);
    }

    removeBook(id){
      const index = this.books.findIndex(book => book.id === id);
      if(index !== -1){
        this.books.splice(index,1);
      }
    }

    toggleRead(id){
       const book = this.books.find(book => book.id === id);
       if(book){
           book.toggleRead();
       }
    }
}
const library = new Library();


// UI functions 
const libraryContainer = document.getElementById("library");

//DISPLAY LIBRARY
function displayLibrary(books){
    libraryContainer.innerHTML = "";

    books.forEach(book => {

    // creating new book div for each books
    
      const bookDiv = document.createElement("div");
      const toggleReadButton = document.createElement("button");
      toggleReadButton.textContent = book.read ? "Mark as Unread":"Mark as Read"
      bookDiv.dataset.bookId = book.id;
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", (e) => {
        const id = e.target.parentElement.dataset.bookId;
        library.removeBook(id);
        displayLibrary(library.books);
      });
      toggleReadButton.addEventListener("click",(e)=>{
        const id = e.target.parentElement.dataset.bookId;
        library.toggleRead(id);
        displayLibrary(library.books);
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
    
    const book = new Book(title, author, pages, read);
    library.addBook(book);
    displayLibrary(library.books);
    form.reset();
})

