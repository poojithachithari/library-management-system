const { BookModel, UserModel } = require("../models/index");
const IssuedBook = require("../dtos/book-dtos");
// router.get('/',(req,res)=>{
//     res.status(200).json({
//         success: true,
//         data: books
//     })
// })

exports.getAllBooks = async (req, res) => {
  const books = await BookModel.find();

  if (books.length === 0) {
    return res.status.json({
      success: false,
      message: "No Books in",
    });
  }

  res.status(200).json({
    success: true,
    data: books,
  });
};

// router.get('/:id', (req,res)=>{
//     const {id} = req.params
//     const book = books.find((each)=>each.id === id)

//     if(!book){
//         return res.status(404).json({
//             success: false,
//             message: `Book not found for id:${id}`
//         })
//     }

//     res.status(200).json({
//         success: true,
//         data: book
//     })
// })

exports.getSingleBookById = async (req, res) => {
  const { id } = req.params;
  const book = await BookModel.findById(id);
  if (books.length === 0) {
    return res.status.json({
      success: false,
      message: "No Books in",
    });
  }

  res.status(200).json({
    success: true,
    data: books,
  });
};

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



exports.getAllIssuedBooks = async(req,res)=>{
    const users = await UserModel.find({
        issuedBook: {$exists: true}
    }).populate("issuedBook")

    const issuedBooks = users.map((each) =>{
        return new IssuedBook(each);
    });

    if(issuedBooks.length === 0){
        return res.status(404).json({
            success: false,
            message: "No books have been issued yet"
        })
    }

    res.status(200).json({
        success: true,
        data: issuedBooks
    })  



}

// router.post('/',(req,res)=>{
//     const {id,name,author,genre,price,publisher} = req.body;
//    // Validation
//     if(!id || !name || !author || !genre || !price || !publisher){
//         return res.status(400).json({
//             success: false,
//             message: "Please Provide all the required fields"
//         })
//     }
//     // Check if book already exists
//     const book = books.find((each)=> each.id === id)
//     if(book){
//         return res.status(409).json({
//             success:false,
//             message: `Book Already exists with id: ${id}`
//         })
//     }
//     // Create new book
//     books.push({id,name,author,genre,price,publisher})
//     res.status(201).json({
//         success: true,
//         message: "Book created Successfully"
//     })
// })

exports.addNewBook = async (req, res) => {
    const { data} = req.body;

    if(!data || Object.keys(data).length === 0 ){
        return res.status(400).json({
            success: false,
            message: "Please provide the data to add a new book"
        })
    }

    await BookModel.create(data);
    // res.status(201).json({
    //     success: true,
    //     message: "Book created Successfully",
    //     data: data
    // })

    const allBooks = await BookModel.find();
    res.status(201).json({
        success: true,
        message: "Book created Successfully",
        data: allBooks
     })
}

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

exports.updateBookById = async (req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide the data to update the book"
        })
    }

    const updatedBook = await BookModel.findOneAndUpdate(
        {_id: id},
        data,
        {new: true}
    );
    if(!updatedBook){
        return res.status(404).json({
            success: false,
            message: `Book not found for id:${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: updatedBook,
        message: "Book updated successfully"
    })
}


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

exports.deleteBookById = async (req, res) => {
    const {id} = req.params;

    // Check if book exists
    const book = await BookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book not found for id:${id}`
        })
    }

    // Delete the book
    await BookModel.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        message: "Book deleted successfully"
    })

}
