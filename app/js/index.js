const $form = document.querySelector('.add');
const $titleInput = document.querySelector('.add__title input');
const $authorInput = document.querySelector('.add__author input');
const $button = document.querySelector('.add__button');
const $list = document.querySelector('.list__order');


let myLibrary = [{
  title: "The Lord of the Rings",
  author: "Tolkien",
}];

function Book(title, author) {
  this.title = title;
  this.author = author;
  
}

function addBookToLibrary() {
  if ($titleInput.value.length === 0 || $authorInput.value.length === 0) {
    alert("Please, fill all the inputs");
    return
  }
  const newBook = new Book($titleInput.value, $authorInput.value);
  myLibrary.push(newBook);
  saveLibraryToStorage();
  clearInputs();
  renderList();
  
}

function renderList() {
  $list.innerHTML = "";
  myLibrary.forEach((book, index) => {
    const li = document.createElement('li');
    li.textContent = `${book.title}, ${book.author}`;
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML= "Remove";
    removeBtn.addEventListener('click', (event) => removeBookFromLibrary(index));

    li.appendChild(removeBtn);
    $list.appendChild(li); 
  });
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
  saveLibraryToStorage();
  renderList();
}

function saveLibraryToStorage() {
  localStorage.setItem('myLibraryToStore', JSON.stringify(myLibrary));
}

function loadLibraryFromStorage() {
  myLibrary = JSON.parse(localStorage.getItem('myLibraryToStore'));
}

function clearInputs() {
  $titleInput.value= '';
  $authorInput.value = '';
}


$button.addEventListener('click', addBookToLibrary);
loadLibraryFromStorage();
renderList();
