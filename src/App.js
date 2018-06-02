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
        mappingBooksToShelfs:{"read":[],"toberead":[],"wanttoread":[],"none":[]},
        booksToBeDisplayed:[]
      };
  }

  shelfs=["none","read","toberead","wanttoread"];

  updateState=(bookObject,mapObject)=>{
    console.log('bookObject',bookObject);
    console.log('mapObject',mapObject)

    this.setState((prevState)=>({
      booksToBeDisplayed: prevState.booksToBeDisplayed.concat(bookObject),
      mappingBooksToShelfs:mapObject
    }))
  }

  updateMappingToShelfs=(e)=>{
    /*Callback function used in the Search Component;
      When the search updates a book's shelf, then this call back is used;
    */
    const id=e.target.options[e.target.selectedIndex].value;
    const oldShelf=!!e.target.id ? e.target.id : 'none';
    const newShelf=e.target.options[e.target.selectedIndex].innerHTML;
    const previousMapping=this.state.mappingBooksToShelfs;
    const nextMapping=previousMapping;
    const flag=nextMapping[oldShelf].findIndex(element=>element===id);

    nextMapping[newShelf].splice(0,0,id);
    nextMapping[oldShelf].splice(flag,1);



    this.setState({
      mappingBooksToShelfs:nextMapping
    })

  }

  addBooks=(object)=>{
      /*Callback function used in the Search Component
        It is called when the user selects a book onto a shelf in the Search component;
      */
    const Component=this;
    const newBook=object[0];
    console.log('newBook',object);

    const bookAlreadyLogged=this.state.booksToBeDisplayed.filter(book=>book["id"]=object["id"])
    console.log(!!this.state.booksToBeDisplayed.filter(book=>book["id"]=newBook["id"]))
    !!this.state.booksToBeDisplayed.filter(book=>book["id"]=newBook["id"])
      ? Component.setState((prevState)=>({
          booksToBeDisplayed:prevState.books.concat([object]),
        }))
      : null


  };



  render() {

            return (
              <div>
                <SimpleStorage parent={this} />
                <Route
                  path='/search'
                  render={()=>(
                    <Search
                      updateState={this.updateState}
                      addBooks={this.addBookToBeDisplayed}
                      mappingBooksToShelfs={this.state.mappingBooksToShelfs}
                      />)}
                />

                <Route
                  exact path='/'
                  render={()=>(
                    <BookShelf
                        books={this.state.booksToBeDisplayed}
                        shelfs={this.shelfs.slice(1)}
                        map={this.state.mappingBooksToShelfs}
                        func={this.updateMappingToShelfs}
                    />
                      )}
                />

            </div>
            )
  }
}

export default BooksApp
