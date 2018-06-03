import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import Search from './Search.js'
import BookShelf from './BookShelf.js'
import SimpleStorage from "react-simple-storage";


class BooksApp extends React.Component {
  constructor(props){
      super(props);
      this.state={
        mappingBooksToShelfs:{"read":[],"reading":[],"wanttoread":[],"none":[]},
        booksToBeDisplayed:[]
      };
  }

  shelfs=["none","read","reading","wanttoread"];

  updateState=(bookObject,mapObject)=>{
    /*Callback function used in search page;
      Updated the mapping of books to shelfs and which books are being tracked
    */
    this.setState((prevState)=>({
      booksToBeDisplayed: prevState.booksToBeDisplayed.concat(bookObject),
      mappingBooksToShelfs:mapObject
    }))
  }

  updateMappingToShelfs=(e)=>{
    /*Callback function used in main page;
      Updated the mapping of books to shelfs
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
