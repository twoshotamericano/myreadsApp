import React, { Component } from 'react';
import Book from './Book.js'
import * as inputs from './inputs.js'
import SearchBar from './SearchBar.js'


class Search extends Component {

    constructor(props){
      super(props);
      this.state={
        books:[],
        mappingBooksToShelfs:this.props.mappingBooksToShelfs,
      };
    };

    getShelf=(id,object)=>{
      const bookId=id;
      const mappingBooksToShelfs=object;
      let shelf=null;

      for (var obj in mappingBooksToShelfs){
        mappingBooksToShelfs.hasOwnProperty(obj)
          ? mappingBooksToShelfs[obj].includes(id)
            ? shelf=`${obj}`
            : null
          : null
      }

      return shelf

    };

    updateState=(e)=>{
        /*  This call back function responds to users adding a new search term;
            The target is the inputs box in Search Bar component
        */
        let searchTerm={query:e.target.value};
        var component=this;
        let books=[];

        /*  This guard function prevents the api call when the search is blank*/

        !!e.target.value && (
            books=inputs.queryBooks(searchTerm).then(
                function(response){
                    component.setState(
                        {
                            books:inputs.parseBooks(response)
                        }
                    )
                },
                function(error){
                    console.log("failed",error)
                }
                )
            )
        !e.target.value && (
            component.setState(
                {
                    books:[]
                }
            )
        )


    };

    updateShelfs=(e)=>{
    /*Callback function used in the Search Component;
      When the search updates a book's shelf, then this call back is used;
    */
    const id=e.target.options[e.target.selectedIndex].value;
    const oldShelf=!!e.target.id ? e.target.id : 'none';
    const newShelf=e.target.options[e.target.selectedIndex].innerHTML;
    const previousMapping=this.state.mappingBooksToShelfs;
    const nextMapping=previousMapping;
    const bookDetails=this.state.books
    const filteredBooks=bookDetails.filter(book=>book.id===id)

    nextMapping[newShelf].splice(0,0,id);

    if (nextMapping[oldShelf].length!==0)
      {
        const flag=nextMapping[oldShelf].findIndex(element=>element===id);
        nextMapping[oldShelf].splice(flag,1)
      }

    this.setState({
      mappingBooksToShelfs:nextMapping
    })

    this.props.updateState(filteredBooks,this.state.mappingBooksToShelfs)

  }

    render(){
        let books=this.state.books;
        let book=books[0]
        !!book ? console.log(this.getShelf(book.id,this.state.bookMappingToShelfs)) : null

          return (
            <div className="search-books">
              <SearchBar updateState={this.updateState}/>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Search</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.map((book,idx)=>(
                      <Book key={idx} shelf={this.getShelf(book.id,this.state.mappingBooksToShelfs)} bookDetails={book}  func={this.updateShelfs}/>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          )
        }


    };

export default Search;
