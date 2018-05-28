/*Here are the bookshelfs to be displayed in the app*/

const shelfs=["none","read","currentlyReading","wantToRead"];

const booksOnShelf={"Currently Reading":[1,2],
                    "Want to Read":[3],
                    "Read":[4,5,6],
                    "Search":[]
                  };

/*Make an API call to the server and return all books*/

function getBooks(){

  return new Promise(function(resolve,reject){

    fetch('https://reactnd-books-api.udacity.com/books', {

        headers: {
          'authorization': 'fom0dv1c',
          'content-type': 'application/json'
          },

        method: 'GET', // *GET, POST, PUT, DELETE, etc.
    }
    )

    .then(function(response) {

        if(response.ok){
            return response.json();
            }
        else {reject(Error('failure!'))}

    }
    )

    .then(function(response){
          resolve(response.books)
    })

  })

};

/*Make an API call to the server and return all books meeting search criteria*/

function queryBooks(data){

  return new Promise(function(resolve,reject){

    fetch('https://reactnd-books-api.udacity.com/search', {

        headers: {
          'authorization': 'fom0dv1c',
          'content-type': 'application/json'
          },
        body: JSON.stringify(data),
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        }
    )

    .then(function(response) {

        if(response.ok){
            return response.json();
            }
        else {reject(Error('failure!'))}

        }
    )

    .then(function(response){

        !response.books.error && (
          resolve(response.books)
        )
        !!response.books.error && (
          resolve([])
        )

        }
    )

  })

};

/*Make an API call to the server and update the server record*/

function updateBooks(id,shelf){

  return new Promise(function(resolve,reject){

    const url='https://reactnd-books-api.udacity.com/books/'+id;

    console.log(url);

    fetch(url, {

        headers: {
          'authorization': 'fom0dv1c',
          'content-type': 'application/json'
          },
        body:JSON.stringify(shelf),

        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    }
    )

    .then(function(response) {

        if(response.ok){
            return response.json();
            }
        else {reject(Error('failure!'))}

    }
    )

    .then(function(response){
          resolve(response)
    })

  })

};

/*Take an array of objects; return the same array of objects but with fewer key value pairs*/

function parseBooks(bookArray){
  console.log(bookArray);
  let parsedBooks=[];
  bookArray.map((book,idx)=>{
    parsedBooks[idx]={
      id:book.id,
      author:!!book.authors ? book.authors[0] : null,
      title:book.title,
      image:!!book.imageLinks ? book.imageLinks['smallThumbnail'] : null,
      shelf:book.shelf
    }
  });
  return (parsedBooks)
};

/*used to update the books held in the state object*/

function updateBook(bookArray,id,updatedShelf){

  const newArray=bookArray;

  bookArray.map((book,idx)=>{
    newArray[idx]=book;

    book.id===id && (
        newArray[idx].shelf=updatedShelf
    );
    }
  );

  return newArray;
};

/*Helper function */

function getBooksById(id,bookArray){
  console.log('get book by id',bookArray.filter(book=>book.id===id))
  return bookArray.filter(book=>book.id===id);

}

export {shelfs, booksOnShelf, getBooks, parseBooks,queryBooks,updateBooks,updateBook,getBooksById}
