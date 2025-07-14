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