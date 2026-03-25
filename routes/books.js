const express = require("express");
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");
const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the list of books in the system
 * Access:Public
 * Parameters: None
 */
router.get('/',(req,res)=>{
    res.status(200).json({
        success: true,
        data: books
    })
})

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get a book by their id
 * Access:Public
 * Parameters: id
 */
router.get('/:id', (req,res)=>{
    const {id} = req.params
    const book = books.find((each)=>each.id === id)

    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found for id:${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: book
    })
})

/**
 * Route: /books
 * Method: POST
 * Description: Create/Register a new book
 * Access:Public
 * Parameters: none
 */

router.post('/',(req,res)=>{
    const {id,name,author,genre,price,publisher} = req.body;
   // Validation
    if(!id || !name || !author || !genre || !price || !publisher){
        return res.status(400).json({
            success: false,
            message: "Please Provide all the required fields"
        })
    }
    // Check if book already exists
    const book = books.find((each)=> each.id === id)
    if(book){
        return res.status(409).json({
            success:false,
            message: `Book Already exists with id: ${id}`
        })
    }
    // Create new book
    books.push({id,name,author,genre,price,publisher})
    res.status(201).json({
        success: true,
        message: "Book created Successfully"
    })
})

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a book by their ID
 * Access:Public
 * Parameters: ID
 */

router.put('/:id',(req,res)=>{
    const {id} = req.params;
    
    const {data} = req.body;
    //Check if book exists
     const book = books.find((each)=>each.id === id)
     if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found for id:${id}`
        })
     }
     // if book exists update the book with the new data
     const updatedBook = books.map((each)=>{
        if(each.id === id){
            return {
                ...each,
                ...data 
            }

        }
        return each;
     })

     res.status(200).json({
        success: true,
        data: updatedBook,
        message: "Book updated successfully"
     })
})

/**
 * Route: /books/:id
 * Method: DELETE
 * Description: Deleting a book by their ID
 * Access:Public
 * Parameters: ID
 */

router.delete('/:id',(req,res)=>{
    //Check if book exists
    const {id} = req.params;
    const book = books.find((each)=>each.id === id)
    if(!book){
       return res.status(404).json({
           success: false,
           message: `Book not found for id:${id}`
       })
    }

    // if book exists filter out the book from the books array
    const updatedBooks = books.filter((each)=> each.id !== id)
    res.status(200).json({
        success: true,
        data: updatedBooks,
        message: "Book deleted successfully"
     })
});

/**
 * Route: /books/issued/for-users
 * Method: GET
 * Description: Get all the issued books in the system
 * Access:Public
 * Parameters: None
 */
 router.get('/issued/for-users',(req,res)=>{
    // Get all the issued books in the system
    //const issuedBooks = users.filter((each)=> each.issuedBook)
    const userWithIssuedBooks = users.filter((each)=> {
        if(each.issuedBook){
            return each;
        }
    })
 
    const issuedBooks = [];
    userWithIssuedBooks.forEach((each)=>{
        const book = books.find((book)=> book.id === each.issuedBook);

if(book){
    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;
    issuedBooks.push(book);
}
    });

    if(!issuedBooks.length === 0){
        return res.status(404).json({
            success: false,
            message: "No books have been issued yet"
        })
    }

    res.status(200).json({
        success: true,
        data: issuedBooks
    })
})

module.exports = router;