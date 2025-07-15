const library = [];

function Book(title, author, pages, read) {
    if (!new.target)
        throw Error("Constructor must be called with the 'new' operator.");
    
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    library.push(new Book(title, author, pages, read));
}

function displayBooksFromLibrary() {
    const libraryGrid = document.querySelector(".library");
    
    library.forEach(book => {
        libraryGrid.append(createGridItem(book));
    });
}

Book.prototype.updateReadStatus = function() {
    this.read = !this.read;
}

const BOOK_ID = "id";

function createGridItem(book) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("book");
    assignId(gridItem, book);

    createButtons(gridItem);
    appendChildren(gridItem, book);
    return gridItem;
}

function appendChildren(gridItem, book) {
    const keys = filterKeys(book);

    for (let key of keys)
        gridItem.appendChild(createChildContent(key, book[key]));
}

function filterKeys(book) {
    return Object.keys(book).filter(key => key !== BOOK_ID && typeof key !== "function");
}

const DELETE_ICON = "images/close-circle.png";
const DELETE_ID = "delete-book";
const DELETE_ALT_TEXT = "Circle with X mark.";

const MARK_READ_ICON = "images/book-open-blank-variant-outline.png";
const MARK_READ_ID = "mark-read";
const MARK_READ_ALT_TEXT = "Outline of open book.";

function createButtons(gridItem) {
    const actions = document.createElement("div");
    actions.classList.add("actions");

    actions.appendChild(createButton(MARK_READ_ICON, MARK_READ_ID, MARK_READ_ALT_TEXT));
    actions.appendChild(createButton(DELETE_ICON, DELETE_ID, DELETE_ALT_TEXT));
    gridItem.appendChild(actions);
}

function createButton(image, id, description) {
    const icon = document.createElement("img");
    icon.src = image;
    icon.id = id;
    icon.alt = description;

    return icon;
}

function assignId(gridItem, book) {
    gridItem.id = book.id;
}

const AUTHOR_NAME = "author";
const PAGE_COUNT = "pages";
const READ_STATUS = "read";

const FINISHED_READING = "Finished reading";
const NOT_STARTED_READING = "Not read yet";

function createChildContent(key, value) {
    const childContent = document.createElement("p");
    childContent.classList.add(key);
    
    switch (key) {
        case AUTHOR_NAME:
            childContent.textContent = `By: ${value}`;
            break;
        case PAGE_COUNT:
            childContent.textContent = `Number of pages: ${value}`;
            break;
        case READ_STATUS:
            childContent.textContent = value ? FINISHED_READING : NOT_STARTED_READING;
            break;
        default:
            childContent.textContent = value;
    }

    return childContent;
}

const openDialog = document.getElementById("open-dialog");
const bookDialog = document.getElementById("book-dialog");
const closeDialog = document.getElementById("close-dialog");
const submitDialog = document.getElementById("submit-dialog");

openDialog.addEventListener("click", () => {
    bookDialog.showModal();
});

closeDialog.addEventListener("click", () => {
    bookDialog.close();
});

submitDialog.addEventListener("click", event => {
    event.preventDefault();
    addBookToLibrary(getTitle(), getAuthor(), getPages(), getRead());
    addBookToDisplay();
    clearForm();
});

function getTitle() {
    return document.getElementById("title").value;
}

function getAuthor() {
    return document.getElementById("author").value;
}

function getPages() {
    return document.getElementById("pages").value;
}

function getRead() {
    return document.querySelector("input[name='read']:checked").value === "true";
}

function addBookToDisplay() {
    const libraryGrid = document.querySelector(".library");
    const book = library.at(-1);

    libraryGrid.append(createGridItem(book));
}

function clearForm() {
    document.querySelector("form").reset();
    bookDialog.close();
}

const libraryGrid = document.querySelector(".library");

libraryGrid.addEventListener('click', event => {    
    if (clickedRemoveBook(event.target)) {
        removeBook(event.target);
    }
    else if (clickedMarkAsRead(event.target)) {
        markAsRead(event.target);
    }
});

function clickedRemoveBook(target) {
    return target.id === DELETE_ID;
} 

function removeBook(target) {
    const id = getId(target);
    document.getElementById(id).remove();
    removeBookFromLibrary(id);
}

function clickedMarkAsRead(target) {
    return target.id === MARK_READ_ID;
}

function markAsRead(target) {
    const id = getId(target);
    updateReadStatus(id);
}

function getId(target){
    return target.parentElement.parentElement.id;
}

function removeBookFromLibrary(id) {
    for (let i = 0; i < library.length; ++i) {
        if (matchesId(library[i], id)) {
            library.splice(index, 1);
            break;
        }
    }
}

function matchesId(book, id) {
    return book.id === id;
}

function updateReadStatus(id) {
    let readStatus = document.getElementById(id).lastElementChild;
    readStatus.textContent = readStatus.textContent === FINISHED_READING ? NOT_STARTED_READING : FINISHED_READING;
    
    const book = findBook(id);
    book.updateReadStatus();
}

function findBook(id) {
    for (let i = 0; i < library.length; ++i)
        if (matchesId(library[i], id))
            return library[i];
}

addBookToLibrary("The Book Thief", "Markus Zusak", 584, true);
addBookToLibrary("The Metamorphosis", "Franz Kafka", 75, true);
addBookToLibrary("The Catcher in the Rye", "J. D. Salinger", 234, true);
addBookToLibrary("Of Mice and Men", "John Steinbeck", 107, true);
addBookToLibrary("The Grapes of Wrath", "John Steinbeck", 464, false);
addBookToLibrary("The Influence of Sea Power Upon History", "Alfred Thayer Mahan", 557, false);
addBookToLibrary("All Quiet on the Western Front", "Erich Maria Remarque", 250, false);

displayBooksFromLibrary();