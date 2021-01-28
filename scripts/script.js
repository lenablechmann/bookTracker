// adding this check, so that the script tag can stay at the start of HTML
document.addEventListener("DOMContentLoaded", function () {
  /*------------- MODAL POP UP --------------- */
  const modal = document.querySelector(".modal");
  const bookBtn = document.getElementById("add-book-btn");
  // selecting an element with multiple classes (AND)
  const closeModal = document.querySelector(".delete-btn.modal-close");
  const addBookBtn = document.getElementById("submit-book-btn");
  const modalIntro = document.querySelector(".form-intro");

  bookBtn.onclick = function () {
    // make modal visible upon click
    modal.style.display = "flex";
    // resetting modal to the default
    document.getElementById("title-input").value = "";
    document.getElementById("author-input").value = "";
    modalIntro.textContent = "The book you'd like to add:";
    modalIntro.style.color = "#1374be";
  };

  // closes modal when user clicks on close button
  closeModal.addEventListener("click", function () {
    console.log("clicked on close");
    // hide modal
    modal.style.display = "none";
  });

  // Closes modal when user clicks outside
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Adding new book to the object array  once user clicks on the button in modal pop up
  addBookBtn.onclick = addBookToObj;

  /*------- MAIN OPERATIONS AND FUNCTIONS ------*/

  // displaying all the book cards that are currently in the local storage
  displayBookCards();


  // onclick reading status,
  // changes boolean status in array read:true to false and vice versa
  const readingStatusBtn = document.getElementsByName("book reading status");
  readingStatusBtn.forEach( function(statusBtn) {
    statusBtn.addEventListener('click', () => {
      changeReadingStatus(statusBtn.id);
    });
  });

  // onclick delete in the card
  // deletes the corresponding object from the array and
  const cardDeletionBtns = document.querySelectorAll(".delete-btn:not(.modal-close)");
  
  cardDeletionBtns.forEach( function(delBtn) {
    delBtn.addEventListener('click', () => {
      deleteBook(delBtn.id);
    });
  });

});

/*--------------Functions--------------------------------------------*/

// the Book constructor (constructors are capitalized)
function Book(title, author) {
  // using "this" keyword to refer to the context of this function
  this.title = title;
  this.author = author;
  this.status = false;
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
    // push the new obj into the array of objects you get from the local storage
    // closing the modal after we got everything without reloading page
    modal.style.display = "none";
  } else {
    // make sure the user knows he is entering too much or too little text
    modalIntro.textContent =
      "*Please enter the book title and author,140 char max.";
    modalIntro.style.color = "#8b0a19";
  }
  if (document.querySelectorAll("li")) {
    clearBooksDOM();
  }

  displayBookCards();
  window.location.reload();
}

function checkLength(string) {
  // limiting user input length, so that the cards are nice n short
  const MAX_LEN = 140;
  if (string.length > 0 && string.length <= MAX_LEN) {
    return true;
  } else {
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
    const placeholderBook = new Book(
      placeholderBookTitle,
      placeholderBookAuthor
    );

    localStorage.setItem("BookTrackerList", JSON.stringify(placeholderBook));
    bookTrackerList.push(placeholderBook);

    return bookTrackerList.reverse();
  } else {
    // local storage could have a single object or an array of objects,
    // if it's already an array, we can return it as is, otherwise push the
    // obj onto an array (bookTrackerList)
    const bookTrackerListUnknownType = JSON.parse(
      localStorage.getItem("BookTrackerList")
    );

    if (Array.isArray(bookTrackerListUnknownType)) {
      // it's an array, so we can return it as is
      return bookTrackerListUnknownType.reverse();
    } else {
      // it's an object, needs to be pushed into an array for latter operations
      bookTrackerList.push(bookTrackerListUnknownType);
      return bookTrackerList.reverse();
    }
  }
}

function addToLocalBookTrackerList(bookObject) {
  // adds new book obj to the already existing local storage array
  let existingBookTrackerList = getLocalBookTrackerList();
  existingBookTrackerList.push(bookObject);
  const updatedBookTrackerList = existingBookTrackerList;

  localStorage.setItem(
    "BookTrackerList",
    JSON.stringify(updatedBookTrackerList)
  );
  return updatedBookTrackerList;
}

function displayBookCards() {
  // add array index class/id to cards so that you can change read status + delete books
  let bookIndex = 0;

  // container of all book cards
  const bookCardsContainer = document.querySelector(".book-cards");
  const bookTrackerList = getLocalBookTrackerList();

  // looping through every object, create a card for each if card doesn't exist yet
  bookTrackerList.forEach((book) => {
      // creating all the necessary elements for the card (as shown in indexCopy.html in /prototypes)
      const cardWrapper = document.createElement("li");
      const readStatusBtn = document.createElement("input");
      const deleteCardBtn = document.createElement("input");
      const bookTitle = document.createElement("div");
      const bookAuthor = document.createElement("div");

      // add array index class/id to cards so that you can change read status + delete books
      deleteCardBtn.id = bookIndex;
      readStatusBtn.id = bookIndex;

      // styling card elements that don't depend on reading status
      cardWrapper.classList.add("card");

      readStatusBtn.setAttribute("type", "image");
      readStatusBtn.setAttribute("name", "book reading status");
      readStatusBtn.classList.add("read-status");

      deleteCardBtn.setAttribute("type", "image");
      deleteCardBtn.setAttribute("src", "images/delete.svg");
      deleteCardBtn.setAttribute("name", "delete book card");
      deleteCardBtn.classList.add("delete-btn");

      bookTitle.classList.add("title");
      bookTitle.textContent = book.title;

      bookAuthor.classList.add("author");
      bookAuthor.textContent = book.author;

      // styling card elements that depend on reading status
      if (book.status === false) {
        cardWrapper.classList.add("unread");
        readStatusBtn.setAttribute("src", "images/completed_0.svg");
        readStatusBtn.classList.add("unread");
      } else {
        cardWrapper.classList.add("read");
        readStatusBtn.setAttribute("src", "images/completed_1.svg");
        readStatusBtn.classList.add("read");
      }

      // appending all the styled elements onto the parent nodes
      cardWrapper.appendChild(readStatusBtn);
      cardWrapper.appendChild(bookTitle);
      cardWrapper.appendChild(bookAuthor);
      cardWrapper.appendChild(deleteCardBtn);
      bookCardsContainer.append(cardWrapper);

      bookIndex++;
  });
}

function clearBooksDOM() {
  // removing all cards in the DOM, to start anew
  const booksContainer = document.querySelector(".book-cards");
  booksContainer.querySelectorAll("*").forEach((childNode) => childNode.remove());
}

function deleteBook(index) {
  let bookTrackerList = getLocalBookTrackerList();

  if (index >= 0) {
    clearBooksDOM();
    // remove the object from the array
    bookTrackerList.splice(index, 1);
    // reverse array, save to local storage
    localStorage.setItem( "BookTrackerList", JSON.stringify(bookTrackerList.reverse()));
    displayBookCards();
    window.location.reload();
  }
}

function changeReadingStatus(index) {
  // TODO prototype aint getting called
  let bookTrackerList = getLocalBookTrackerList();

  if (index >= 0) {
    bookTrackerList[index].status = !bookTrackerList[index].status;

    // finding the button that got clicked
    const readingStatusBtn = document.getElementsByName("book reading status");
    readingStatusBtn.forEach(btn => {
      const cardWrapper = btn.parentElement;

      if (btn.id == index){
        console.log("the id of this btn is " + btn.id);
        if (bookTrackerList.status === false) {
         cardWrapper.classList.add("unread");
         btn.setAttribute("src", "images/completed_0.svg");
         btn.classList.add("unread");
      } else {
         cardWrapper.classList.add("read");
         btn.setAttribute("src", "images/completed_1.svg");
         btn.classList.add("read");
       }
      }
    });

    localStorage.setItem( "BookTrackerList", JSON.stringify(bookTrackerList.reverse()));
    // window.location.reload();
  }
}