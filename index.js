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

const BOOK_ID = "id";

function createGridItem(book) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("book");

    for (let key in book) {
        if (key == BOOK_ID)
            gridItem.id = book.id;
        else
            gridItem.appendChild(createChildContent(key, book[key]));
    }

    return gridItem;
}

const AUTHOR_NAME = "author";
const PAGE_COUNT = "pages";
const READ_STATUS = "read";

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
            childContent.textContent = value ? "Finished reading" : "Not read yet";
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

addBookToLibrary("The Book Thief", "Markus Zusak", 584, true);
addBookToLibrary("The Metamorphosis", "Franz Kafka", 75, true);
addBookToLibrary("The Catcher in the Rye", "J. D. Salinger", 234, true);
addBookToLibrary("Of Mice and Men", "John Steinbeck", 107, true);
addBookToLibrary("The Grapes of Wrath", "John Steinbeck", 464, false);
addBookToLibrary("The Influence of Sea Power Upon History", "Alfred Thayer Mahan", 557, false);
addBookToLibrary("All Quiet on the Western Front", "Erich Maria Remarque", 250, false);

displayBooksFromLibrary();