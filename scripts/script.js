// adding this check, so that the script tag can stay at the start of HTML
document.addEventListener("DOMContentLoaded", function () {
    const locallyStored = getStoredObjects();
    console.table(locallyStored);

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
    
    // eventlistener to the add new book button: 
    // popup form function which should have 2 input fields

    // and an ADD BOOK button
    // call addBookToLib() which in turn
    // makes use of the Book constructor storeBookInLocal {}

    // get local Library string

    // if it doesn't exist, create one with an example book, so that the 
    // page isn't empty for new users
    // probably go with The Hitchhiker's Guide to the Galaxy. by Douglas Adams

    // if it does exist: parse it into an array of objects

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
        console.log(curBook);
        // push the new obj into the array of objects you get from the local storage
        // closing the modal after we got everything without reloading page
        modal.style.display = "none";
    }
    else {
        // make sure the user knows he is entering too much or too little text
        modalIntro.textContent = "*Please enter the book title and author,140 char max."
        modalIntro.style.color = "#8b0a19"
    }

    // ----TODO add a function that gets array of objects out of local storage or makes one
    // booksCollection.push(userBookObj);
    // ----TODO add a function that saves in local storage
    // ----TODO add a function that translates string into array of objects

    // can also save it in the local storage now
    // localStorage.setItem('bookList', JSON.stringify(booksCollection));
    // console.table(booksCollection);
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
function getStoredObjects() {
    // went with a popular and neutral choice
    const placeholderBookTitle = "The Hitchhiker's Guide to the Galaxy";
    const placeholderBookAuthor = "Douglas Adams";

    if (!localStorage.getItem("BookTrackerList")) {
        let placeholderBook = new Book(placeholderBookTitle, placeholderBookAuthor);
        localStorage.setItem("BookTrackerList", JSON.stringify(placeholderBook));

        return JSON.parse(localStorage.getItem("BookTrackerList"));
    }
    else {
        return JSON.parse(localStorage.getItem("BookTrackerList"));
    }

}
// ----saves array of objects in local storage (parameter is the book obj)
// ----parses string into array of objects