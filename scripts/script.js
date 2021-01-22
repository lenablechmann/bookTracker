// adding this check, so that the script tag can stay at the start of HTML
document.addEventListener("DOMContentLoaded", function () {
    /* MODAL POP UP on add book */
    const modal = document.querySelector(".modal");
    const bookBtn = document.getElementById("add-book-btn");
    const closeModal = document.getElementById("close-modal");

    // When the user clicks the button, open the modal 
    bookBtn.onclick = function() {
    modal.style.display = "block";
    }
    closeModal.onclick = function() {
    modal.style.display = "none";
    }
    // Closes modal when user clicks outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    // eventlistener to the add new book button: 
    // popup form function which should have 2 input fields
    // and an ADD BOOK button
});


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

