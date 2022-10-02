const nameInputEl = document.getElementById("nameInput");
const urlInputEl = document.getElementById("urlInput");
const addBtnEl = document.getElementById("addBtn");
const rowInputEl = document.getElementById("rowInput");

let bookmarksContainer;
let currentIndex = 0;

if (localStorage.getItem("myBookmarks") != null) {
  bookmarksContainer = JSON.parse(localStorage.getItem("myBookmarks"));
  displayBookMark(bookmarksContainer);
} else {
  bookmarksContainer = [];
}

function addBookMark() {
  if (addBtnEl.innerHTML == "Update") {
    addBtnEl.innerHTML = "Add";
    addBtnEl.classList.replace("btn-warning", "btn-success");
    let bookmarks = {
      name: nameInputEl.value,
      url: urlInputEl.value,
    };

    bookmarksContainer.splice(currentIndex, 1, bookmarks);
  } else {
    let bookmarks = {
      name: nameInputEl.value,
      url: urlInputEl.value,
    };
    bookmarksContainer.push(bookmarks);
  }
  localStorage.setItem("myBookmarks", JSON.stringify(bookmarksContainer));
  displayBookMark(bookmarksContainer);
  clearForm();
}

function displayBookMark(list) {
  let displayForm = ``;
  for (let i = 0; i < list.length; i++) {
    displayForm += `<div class="col-md-6 col-lg-4 mb-3">
  <div class="bookmarkForm py-3 siteForm">
      <h2>${list[i].name}</h2>
      <p class="lead" id="siteUrl">${list[i].url}</p>
      <button class="btn btn-info px-3" ><a target="_blank"
        href="https://${list[i].url}" >Visit</a></button>
       <button class="btn btn-warning mx-2 px-2" onclick="Updatebutton(${i})">Update</button>
      <button class="btn btn-danger px-2" onclick="deletedIndex(${i})">Delete</button>
  </div>
  </div>`;
  }
  rowInputEl.innerHTML = displayForm;
}

function clearForm() {
  nameInputEl.value = "";
  urlInputEl.value = "";
}

function deletedIndex(delList) {
  bookmarksContainer.splice(delList, 1);
  localStorage.setItem("myBookmarks", JSON.stringify(bookmarksContainer));
  displayBookMark(bookmarksContainer);
}

function Updatebutton(updateIndex) {
  nameInputEl.value = bookmarksContainer[updateIndex].name;
  urlInputEl.value = bookmarksContainer[updateIndex].url;

  addBtnEl.innerHTML = "Update";
  addBtnEl.classList.replace("btn-success", "btn-warning");

  currentIndex = updateIndex;

  displayBookMark(bookmarksContainer);
}
