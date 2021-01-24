// adding this check, so that the script tag can stay at the start of HTML
document.addEventListener("DOMContentLoaded", function () {

/*----------------- MODAL POP UP on add book ----------------------*/

    const modal = document.querySelector(".modal");
    const bookBtn = document.getElementById("add-book-btn");
    const closeModal = document.getElementById("modal-close");

    bookBtn.onclick = function() {
        // make modal visible upon click
        modal.style.display = "flex";
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

    /* Adding new book to the object array */
    const addBookBtn = document.getElementById("submit-book-btn");
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

// adding a function to the prototype
Book.prototype.changeReadStatus = function () {
    // so that the user can spam read status button
    this.status === false ? this.status = true : this.status = false;
    return this.status;
}

function addBookToObj(ev) {
    let booksCollection = [];
    // we need to stop the form from submitting or it'll try to reload page 
    // (any button inside a form does it)
    // ev is in this case the submit event that we pass to this
     ev.preventDefault();
    
    // getting user values from the text fields 
    // (not error checking em, cause prototype)
    const title = document.getElementById("title-input").value;
    const author = document.getElementById("author-input").value;

    // TODO should call a check function for length

    // using the constructor to create an object
    userBookObj = new Book(title, author);

    booksCollection.push(userBookObj);
    // console.log(booksCollection);
    
    // TODO add a function that saves in local storage
    // TODO add a function that translates string into array of objects
    // TODO add a function that gets array of objects out of local storage

    // can also save it in the local storage now
    // localStorage.setItem('bookList', JSON.stringify(booksCollection));
    console.table(booksCollection);
}
