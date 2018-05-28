import React,{ Component} from 'react';
import * as inputs from './inputs.js'

class BookShelfChanger extends Component{
  render(){
    const bookID=this.props.bookID;
    const optionArray=[]

    /*These guard functions handle the case if a book does not have a shelf property*/

    !!this.props.shelf && (inputs.shelfs.map((shelf,idx)=>{

             shelf===this.props.shelf
                      ? optionArray[idx]=<option key={idx} value={bookID} selected>{shelf}</option>
                      : optionArray[idx]=<option key={idx} value={bookID}>{shelf}</option>
    }));

    !this.props.shelf && (inputs.shelfs.map((shelf,idx)=>{

             shelf===this.props.shelf
                      ? optionArray[idx]=<option key={idx} value={bookID}>{shelf}</option>
                      : optionArray[idx]=<option key={idx} value={bookID}>{shelf}</option>


    }))


    return (
      <div className="book-shelf-changer" >
        <select id={this.props.shelf} onChange={this.props.func}>
          {
            optionArray
          }

        </select>
      </div>
    )

  }
};

export default BookShelfChanger;
