// adding this check, so that the script tag can stay at the start of HTML
document.addEventListener("DOMContentLoaded", function () {
    /*------------- MODAL POP UP --------------- */
    const modal = document.querySelector(".modal");
    const bookBtn = document.getElementById("add-book-btn");
    const closeModal = document.getElementById("modal-close");
    const addBookBtn = document.getElementById("submit-book-btn");
    const modalIntro = document.querySelector(".form-intro");

    bookBtn.onclick = function() {
        // make modal visible upon click
        modal.style.display = "flex";
        // resetting modal to the default
        document.getElementById("title-input").value = "";
        document.getElementById("author-input").value = "";
        modalIntro.textContent = "The book you'd like to add:";
        modalIntro.style.color = "#1374be";
    }
    closeModal.onclick = function() {
        // hide modal
        modal.style.display = "none";
    }
    // Closes modal when user clicks outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    /* --------- Adding new book to the object array --------- */
    addBookBtn.onclick = addBookToObj;
    
    // Loop through the array and append cards to the html
    // make sure each card has a data attribute that corresponds to the array index

    // eventlistener onclick reading status,
    // changes boolean status in array read:true to false and vice versa

    // onclick delete eventlistener
    // deletes the corresponding object from the array and
    // calls the displayBookCards function
});

/*--------------Functions--------------------------------------------*/ 

// the Book constructor (constructors are capitalized)
function Book(title, author) {
  // using "this" keyword to refer to the context of this function
  this.title = title;
  this.author = author;
  this.status = false;
}

// adding a function to the prototype; as to not spam the constructor
Book.prototype.changeReadStatus = function () {
    this.status === false ? this.status = true : this.status = false;
    return this.status;
}

function addBookToObj(ev) {
    let curBook = {};
    // stopping form from submitting or it'll try to reload page 
    // ev is in this case the onclick event that we pass to this
     ev.preventDefault();
    
    // getting user input values from the text fields 
    const title = document.getElementById("title-input").value;
    const author = document.getElementById("author-input").value;
    const modal = document.querySelector(".modal");
    const modalIntro = document.querySelector(".form-intro");
    
    // form will just stay put if user isn't cooperating on input length 
    if (checkLength(title) && checkLength(author)) {
        // using the constructor to create an object
        curBook = new Book(title, author);
        let bookList = addToLocalBookTrackerList(curBook);
        console.table(bookList);
        // push the new obj into the array of objects you get from the local storage
        // closing the modal after we got everything without reloading page
        modal.style.display = "none";
    }
    else {
        // make sure the user knows he is entering too much or too little text
        modalIntro.textContent = "*Please enter the book title and author,140 char max."
        modalIntro.style.color = "#8b0a19"
    }
}

function checkLength(string) {
    // limiting user input length, so that the cards are nice n short
    const MAX_LEN = 140;
    if (string.length > 0 && string.length <= MAX_LEN) {
        return true;
    }
    else {
        return false;
    }
}

/* ----local storage functions ---- */

// ----gets array of objects out of local storage or makes one, returns the array of objects
function getLocalBookTrackerList() {
    // went with a popular and neutral choice
    const placeholderBookTitle = "The Hitchhiker's Guide to the Galaxy";
    const placeholderBookAuthor = "Douglas Adams";

    // empty array, so that we can push objects onto it
    let bookTrackerList = [];

    if (!localStorage.getItem("BookTrackerList")) {
        // create local string if it doesn't exist yet, use a placeholder so that 
        // the user who hasn't used the app ever, will know whats it about
        const placeholderBook = new Book(placeholderBookTitle, placeholderBookAuthor);

        localStorage.setItem("BookTrackerList", JSON.stringify(placeholderBook));
        bookTrackerList.push(placeholderBook);
        return bookTrackerList;
    }
    else {
        // local storage could have a single object or an array of objects,
        // if it's already an array, we can return it as is, otherwise push the
        // obj onto an array (bookTrackerList)
        const bookTrackerListUnknownType = JSON.parse(localStorage.getItem("BookTrackerList"));

        if (Array.isArray(bookTrackerListUnknownType))
        {
            // it's an array, so we can return it as is
            return bookTrackerListUnknownType;
        }
        else {
            // it's an object, needs to be pushed into an array for latter operations
            bookTrackerList.push(localBooks);
            return bookTrackerList;
        }
    }


}

function addToLocalBookTrackerList(bookObject) {
    // adds new book obj to the already existing local storage array
    let existingBookTrackerList = getLocalBookTrackerList();
    existingBookTrackerList.push(bookObject);
    const updatedBookTrackerList = existingBookTrackerList;

    localStorage.setItem("BookTrackerList", JSON.stringify(updatedBookTrackerList));
    return updatedBookTrackerList;
}

// TODO a function that goes through an array of objects (from local storage)
// and puts it into the DOM