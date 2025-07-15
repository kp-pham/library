# library

The library project involves the creation of a digital library to display and keep track of the books the user has finished reading and has not started reading. The user enters the title of the book, the name of the author, the number of pages in the book, and whether the user has already read the book to add another book to the collection. The user can also remove books from their collection and change the read the status of the book once the book is added to their collection.

The project provides practice with objects and object constructors building upon the practice exercise of building an object constructor to create objects representing books. The project also provides practice with DOM manipulation and events with idalogs and modals with dialogs and modals to display the form for the user to provide the information about the book to be added to their collection.

## Objects and Object Constructors

Compared to programming languages such as Python and C++ which implement inheritance through derived classes inheriting the behaviors and properties of base classes, Javascript implements inheritance through the prototype chain with the prototype of an object being another object in which the original object inherits from. The original object contains the reference to the value of the ```.prototype``` property of the object constructor which is the prototype.

Because the behaviors and properties of prototypes are inherited through prototypal inheritance, the properties of an object should be defined in the object constructor and the behaviors of an object should be defined in the prototype of the object. Instances of an object maintain separate states independent from one another because the properties of an object represent the unique state of an object. Instances of an object share the same behaviors and defining methods in the object constructor is redundant and unnecessarily takes up memory when the instances contain copies of the same methods. 
