# MyReads Project (03 June 2018)

This was my final assessment project for the Udacity React Fundamentals course. It was written in `node.js` using the React package. I used the `create-react-app` package to create a template for the project. This helped me prototype the project without needing to run `babel` and `browserify`...

To get started, **clone** the repo, **install** the dependencies using node package manager (`npm i`) then start (`npm start`).

## Updates

Following initial feebdback the app was updated with the following improvements:

1.  If a book is already tracked on the main-page and it appears in the search results, then its shelf should display consistently.

The code is now a little messy (it was written whilst learning) and would benefit from refactoring!! But the functionality still works!

## Background

The app allows the user to search for books in a 3rd party data repository, add them to a list and maintain that list.

The app was built using React. Two design patters in React are important: composing user interfaces out of sub-components, separating components which contain business logic from those which are purely about UI.

To simplify the code, helper functions and static inputs have been consolidated into the inputs.js file. This is then imported into component files as needed

## Structure of the app

The first component of the app is found in the App.js file. Its purpose is to maintain state and track the books a user has selected and to track the shelf selected. It contains two submodules: BookShelf and Search.

The bookshelf component is solely about ui. It is passed as props from App.js: books, a bookshelf mapping and a callback function.

The Search component maintains state and contains some business logic. It stores the search results in its state variable. It receives as props from App.js callback functions to update the state of App.js.

### Subcomponents

The BooksShelf component is broken down into Shelf, Book and BookShelfChanger subcomponents. These are controlled components whose purpose is to display ui and nothing else.

The Search component is broker down into a SearchBar and Shelf component. These are controlled components whose purpose is to display ui and nothing else.
