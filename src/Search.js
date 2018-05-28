import React, { Component } from 'react';
import Shelf from './Shelf.js'
import * as inputs from './inputs.js'
import SearchBar from './SearchBar.js'


class Search extends Component {

    constructor(props){
      super(props);
      this.state={books:[]};
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
        /*  This call back function responds to users setting a new shelf for a book;
            The target is the "bookshelfchanger" select box
        */
        e.preventDefault;
        const Component=this;
        let searchTerm={shelf:e.target.options[e.target.selectedIndex].innerHTML};
        let id=e.target.options[e.target.selectedIndex].value;
        let updatedBook=[];

        /*  The state of the component is updated via the updateBooks api call;
            When the promise is resolved the state of the component is updated;
            The addBooks callback function updates the state of the App component;
        */
        const shelfs=inputs.updateBooks(id,searchTerm).then(
            function(response){
                console.log(response);
                Component.setState((prevState)=>({
                    books:inputs.updateBook(prevState.books,id,searchTerm.shelf),
                    }
                    )
                );
                Component.props.updateShelfs(response);
                updatedBook=inputs.getBooksById(id,Component.state.books)
                Component.props.addBooks(updatedBook)
            },
            function(error){
                console.log("failed",error);
            }
        )

    }

    render(){
        let books=this.state.books;

          return (
            <div className="search-books">
              <SearchBar updateState={this.updateState}/>
              <Shelf name={"Search Results"} books={this.state.books} func={this.updateShelfs}/>

            </div>
          )
        }


    };

export default Search;
