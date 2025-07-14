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
        const gridItem = document.createElement("div");
        gridItem.classList.add("book");

        const title = document.createElement("p");
        title.classList.add("title");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.classList.add("author");
        author.textContent = `By: ${book.author}`;

        const pages = document.createElement("p");
        pages.classList.add("pages");
        pages.textContent = `Number of pages: ${book.pages}`;

        const read = document.createElement("p");
        read.classList.add("read");
        read.textContent = book.read ? "Not read yet" : "Finished reading";

        gridItem.appendChild(title);
        gridItem.appendChild(author);
        gridItem.appendChild(pages);
        gridItem.appendChild(read);

        libraryGrid.append(gridItem);
    });
}

addBookToLibrary("The Book Thief", "Markus Zusak", 584, true);
addBookToLibrary("The Metamorphosis", "Franz Kafka", 75, true);
addBookToLibrary("The Catcher in the Rye", "J. D. Salinger", 234, true);
addBookToLibrary("Of Mice and Men", "John Steinbeck", 107, true);
addBookToLibrary("The Grapes of Wrath", "John Steinbeck", 464, false);
addBookToLibrary("The Influence of Sea Power Upon History", "Alfred Thayer Mahan", 557, false);
addBookToLibrary("All Quiet on the Western Front", "Erich Maria Remarque", 250, false);

displayBooksFromLibrary();