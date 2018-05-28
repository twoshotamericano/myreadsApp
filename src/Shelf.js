import React,{Component} from 'react';
import Book from './Book.js';

class Shelf extends Component{

  render(){
    const {name,books,func}=this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book,idx)=>(
              <Book key={idx} shelf={book.shelf} bookDetails={book}  func={func}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
};

export default Shelf;
