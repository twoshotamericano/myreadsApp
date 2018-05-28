import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import * as inputs from './inputs.js'
import { Route } from 'react-router-dom'
import Search from './Search.js'
import BookShelf from './BookShelf.js'
import SimpleStorage from "react-simple-storage";

class BooksApp extends React.Component {
  constructor(props){
      super(props);
      this.state={
        booksOnShelf:{},
        books:[],
      };
      this.updateShelfs=this.updateShelfs.bind(this);
      this.addBooks=this.addBooks.bind(this);
  }


  updateShelfs=(object)=>{
    /*Callback function used in the Search Component;
      When the search updates a book's shelf, then this call back is used;
    */
    const Component=this;

    Component.setState({
      booksOnShelf:object,
    })
  };

  addBooks=(array)=>{
      /*Callback function used in the Search Component
        It is called when the user selects a book onto a shelf in the Search component;
      */
    const Component=this;

    Component.setState((prevState)=>({
      books:prevState.books.concat([array[0]]),
    })

  )

  };

  updateBookShelfs=(e)=>{
      /*Callback function used in the BookShelf component
        Called whenever a user changes the shelf of a book
      */
      e.preventPropagation;
      e.preventDefault;

      const Component=this;
      let searchTerm={shelf:e.target.options[e.target.selectedIndex].innerHTML};
      let id=e.target.options[e.target.selectedIndex].value;
      let updatedBook=[];

      const shelfs=inputs.updateBooks(id,searchTerm).then(
          function(response){
              Component.setState((prevState)=>({
                  books:inputs.updateBook(prevState.books,id,searchTerm.shelf),
                  booksOnShelf:response
                  }
                  )
              );

          },
          function(error){
              console.log("failed",error);
          }
      )

  }

  render() {

            return (
              <div>
                <SimpleStorage parent={this} />
                <Route
                  path='/search'
                  render={()=>(
                    <Search
                      updateShelfs={this.updateShelfs}
                      addBooks={this.addBooks}
                      />)}
                />

                <Route
                  exact path='/'
                  render={()=>(
                    <BookShelf
                        books={this.state.books}
                        shelfs={inputs.shelfs.slice(1,4)}
                        map={this.state.booksOnShelf}
                        func={this.updateBookShelfs}
                    />
                      )}
                />

            </div>
            )
  }
}

export default BooksApp
