import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shelf from './Shelf.js'

class BookShelf extends Component {
  render(){
    /*This is a controlled component, it simply displays the UI using props passed in
    */
    const {shelfs, books, map,func}=this.props;

    return (
      <div className="app">
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {
                  shelfs.map((shelf, idx)=>{
                    /*This gives the books on a particular shelf*/
                    const filteredBookIds=map[shelf];
                    const filteredBooks=!!filteredBookIds
                      ? books.filter(book=>filteredBookIds.includes(book.id))
                      : []

                    return (
                      <Shelf key={idx} name={shelf} books={filteredBooks} func={func}/>
                    )
                  })
                }
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
      </div>
    )
  }
};

export default BookShelf;
