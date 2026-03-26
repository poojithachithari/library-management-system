const express = require("express");
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

const {UserModel, BookModel} = require("../models/index");
const {getAllBooks,getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById, deleteBookById} = require("../controllers/book-controller")
const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the list of books in the system
 * Access:Public
 * Parameters: None
 */
router.get('/',getAllBooks);

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get a book by their id
 * Access:Public
 * Parameters: id
 */


router.get('/:id',getSingleBookById)

/**
 * Route: /books/issued/for-users
 * Method: GET
 * Description: Get all the issued books in the system
 * Access:Public
 * Parameters: None
 */

// router.get('/issued/for-users',(req,res)=>{
//     // Get all the issued books in the system
//     //const issuedBooks = users.filter((each)=> each.issuedBook)
//     const userWithIssuedBooks = users.filter((each)=> {
//         if(each.issuedBook){
//             return each;
//         }
//     })
 
//     const issuedBooks = [];
//     userWithIssuedBooks.forEach((each)=>{
//         const book = books.find((book)=> book.id === each.issuedBook);

// if(book){
//     book.issuedBy = each.name;
//     book.issuedDate = each.issuedDate;
//     book.returnDate = each.returnDate;
//     issuedBooks.push(book);
// }
//     });

//     if(!issuedBooks.length === 0){
//         return res.status(404).json({
//             success: false,
//             message: "No books have been issued yet"
//         })
//     }

//     res.status(200).json({
//         success: true,
//         data: issuedBooks
//     })
// })



router.get('/issued/for-users',getAllIssuedBooks);

/**
 * Route: /books
 * Method: POST
 * Description: Create/Register a new book
 * Access:Public
 * Parameters: none
 */
 router.post('/',addNewBook);

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a book by their ID
 * Access:Public
 * Parameters: ID
 */

// router.put('/:id',(req,res)=>{
//     const {id} = req.params;
    
//     const {data} = req.body;
//     //Check if book exists
//      const book = books.find((each)=>each.id === id)
//      if(!book){
//         return res.status(404).json({
//             success: false,
//             message: `Book not found for id:${id}`
//         })
//      }
//      // if book exists update the book with the new data
//      const updatedBook = books.map((each)=>{
//         if(each.id === id){
//             return {
//                 ...each,
//                 ...data 
//             }

//         }
//         return each;
//      })

//      res.status(200).json({
//         success: true,
//         data: updatedBook,
//         message: "Book updated successfully"
//      })
// })

router.put('/:id',updateBookById);

/**
 * Route: /books/:id
 * Method: DELETE
 * Description: Deleting a book by their ID
 * Access:Public
 * Parameters: ID
 */

// router.delete('/:id',(req,res)=>{
//     //Check if book exists
//     const {id} = req.params;
//     const book = books.find((each)=>each.id === id)
//     if(!book){
//        return res.status(404).json({
//            success: false,
//            message: `Book not found for id:${id}`
//        })
//     }

//     // if book exists filter out the book from the books array
//     const updatedBooks = books.filter((each)=> each.id !== id)
//     res.status(200).json({
//         success: true,
//         data: updatedBooks,
//         message: "Book deleted successfully"
//      })
// });

router.delete('/:id', deleteBookById);

 module.exports = router;