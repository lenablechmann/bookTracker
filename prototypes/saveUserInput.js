/* A script that takes user input when user clicks on button 
    then saves it into an obj */

let booksCollection = [];

// the Book constructor (constructors are capitalized)
function Book(title, author) {
  // using "this" keyword to refer to the context of this function
  this.title = title;
  this.author = author;
  this.printBookInfo = function () {
    return (`You've mentioned ${title} from ${author}.`);
  };
}

// first make sure the DOM is fully loaded before script is executed
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').onsubmit = addBookToObj;
});

function addBookToObj(ev) {
    // we need to stop the form from submitting or it'll try to reload page 
    // (any button inside a form does it)
    // ev is in this case the submit event that we pass to this
    ev.preventDefault();
    
    // getting user values from the text fields 
    // (not error checking em, cause prototype)
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;

    // using the constructor to create an object
    userBookObj = new Book(title, author);

    booksCollection.push(userBookObj);
    // console.log(booksCollection);

    // accessing all forms inside document and resetting em
    document.querySelector('form').reset();
    console.warn("added", {booksCollection});
    const booksDisplay = document.querySelector(".display");
    // displaying the array of objects as a string
    booksDisplay.textContent = JSON.stringify(booksCollection, '\t', 2);

    // can also save it in the local storage now
    localStorage.setItem('bookList', JSON.stringify(booksCollection));
}
