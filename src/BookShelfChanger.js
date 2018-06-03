import React,{ Component} from 'react';
import * as inputs from './inputs.js'

class BookShelfChanger extends Component{
  render(){
    const bookID=this.props.bookID;
    const shelfs=["read","reading","wanttoread"];
    const shelfs2=["none","read","reading","wanttoread"]
    const shelf=this.props.shelf;
    const optionArray=[]

    /*These guard functions could be refactored*/

    !!this.props.shelf && (shelfs.map((shelf,idx)=>{

             shelf===this.props.shelf
                      ? optionArray[idx]=<option key={idx} value={bookID} selected>{shelf}</option>
                      : optionArray[idx]=<option key={idx} value={bookID}>{shelf}</option>
    }));

    !this.props.shelf && (shelfs2.map((shelf,idx)=>{

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
