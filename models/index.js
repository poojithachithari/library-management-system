const UserModel = require('./user-model');
const BookModel = require('./book-model');

module.exports = {
    UserModel,
    BookModel
};  

// In this code, we are importing the user.model and book.model files and then exporting them as part of an object. This allows us to easily access both models from other parts of our application by importing this index.js file.
// For example, if we want to use the UserModel in another file, we can simply do:
// const { UserModel } = require('./models');
// This will give us access to the UserModel and we can use it to perform operations on the user collection in our MongoDB database.