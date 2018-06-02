import React, { Component } from 'react';
import BookShelfChanger from './BookShelfChanger.js';

class Book extends Component{
  render(){
    const {key, shelf, bookDetails,  func}=this.props;
    const {id,author,title,image}=bookDetails;
    const url='url('+image+')';

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: url}}></div>
            <BookShelfChanger bookID={id} shelf={shelf} func={func} bookDetails={bookDetails}/>
          </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{author}</div>
      </div>
    )

  }

};

export default Book;
