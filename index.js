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

function createGridItem(book) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("book");

    for (let key in book)
        if (key != "id")
            gridItem.appendChild(createChildContent(key, book[key]));

    return gridItem;
}

function createChildContent(key, value) {
    const childContent = document.createElement("p");
    childContent.classList.add(key);
    
    switch (key) {
        case "author":
            childContent.textContent = `By: ${value}`;
            break;
        case "pages":
            childContent.textContent = `Number of pages: ${value}`;
            break;
        case "read":
            childContent.textContent = value ? "Not read yet" : "Finished reading";
            break;
        default:
            childContent.textContent = value;
    }

    return childContent;
}

const openDialog = document.getElementById("open-dialog");
const bookDialog = document.getElementById("book-dialog");
const closeDialog = document.getElementById("close-dialog");

openDialog.addEventListener("click", () => {
    bookDialog.showModal();
});

closeDialog.addEventListener("click", () => {
    bookDialog.close();
});

addBookToLibrary("The Book Thief", "Markus Zusak", 584, true);
addBookToLibrary("The Metamorphosis", "Franz Kafka", 75, true);
addBookToLibrary("The Catcher in the Rye", "J. D. Salinger", 234, true);
addBookToLibrary("Of Mice and Men", "John Steinbeck", 107, true);
addBookToLibrary("The Grapes of Wrath", "John Steinbeck", 464, false);
addBookToLibrary("The Influence of Sea Power Upon History", "Alfred Thayer Mahan", 557, false);
addBookToLibrary("All Quiet on the Western Front", "Erich Maria Remarque", 250, false);

displayBooksFromLibrary();