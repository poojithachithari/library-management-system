const express = require("express");
const {users} = require("../data/users.json");

const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all the list of users in the system
 * Access:Public
 * Parameters: None
 */
router.get('/',(req,res)=>{
    res.status(200).json({
        success: true,
        data: users
    })
})

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get a user by their id
 * Access:Public
 * Parameters: id
 */
router.get('/:id', (req,res)=>{
    const {id} = req.params
    const user = users.find((each)=>each.id === id)

    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found for id:${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: user
    })
})

/**
 * Route: /users
 * Method: POST
 * Description: Create/Register a new user
 * Access:Public
 * Parameters: none
 */

router.post('/',(req,res)=>{
    const {id,name,surname,email,subscriptionType,subscriptionDate} = req.body;
   // Validation
    if(!id || !name || !surname || !email || !subscriptionType || !subscriptionDate){
        return res.status(400).json({
            success: false,
            message: "Please Provide all the required fields"
        })
    }
    // Check if user already exists
    const user = users.find((each)=> each.id === id)
    if(user){
        return res.status(409).json({
            success:false,
            message: `User Already exists with id: ${id}`
        })
    }
    // Create new user
    users.push({id,name,surname,email,subscriptionType,subscriptionDate})
    res.status(201).json({
        success: true,
        message: "User created Successfully"
    })
})

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating a user by their ID
 * Access:Public
 * Parameters: ID
 */

router.put('/:id',(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;

    //Check if user exists
     const user = users.find((each)=>each.id === id)
     if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found for id:${id}`
        })
     }

     const updatedUser = users.map((each)=>{
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
        data: updatedUser,
        message: "User updated successfully"
     })
})

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Deleting a user by their ID
 * Access:Public
 * Parameters: ID
 */

router.delete('/:id',(req,res)=>{
    //Check if user exists
    const {id} = req.params;
    const user = users.find((each)=>each.id === id)
    if(!user){
       return res.status(404).json({
           success: false,
           message: `User not found for id:${id}`
       })
    }

    // if user exists filter out the user from the users array
    const updatedUsers = users.filter((each)=> each.id !== id)
    res.status(200).json({
        success: true,
        data: updatedUsers,
        message: "User deleted successfully"
     })
});

/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: Get subscription details of a user by their ID
 * Access:Public
 * Parameters: ID
 */
router.get('/subscription-details/:id',(req,res)=>{
    const {id} = req.params;
    const user = users.find((each)=> each.id === id)    

    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found for id:${id}`
        })
    }
    
    //Extract the subscription details from the user object
    const getDateInDays = (data = '')=>{
        let date;
        if(data){
            date = new Date(data)
        } else{
            date = new Date();
        }
        let days = Math.floor(date/(1000*60*60*24));
        return days;


    }

    const subscriptionType = (data)=>{
        let date = data;
        if(user.subscriptionType === "Basic"){
            date = date + 90
        } else if(user.subscriptionType === "Standard"){
            date = date + 180
        } else if(user.subscriptionType === "Premium"){
            date = date + 365
        }
        return date;
    }

    //subscription expiration calculation
    //jan 1 1970 UTC // milliseconds

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);

    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        subscriptionDaysLeft: subscriptionExpiration - currentDate,
        daysLeftForExpiration: returnDate - currentDate,
        returnDate: returnDate < currentDate? "Book is Overdue":returnDate,
        fine: returnDate < currentDate? subscriptionExpiration<=currentDate?200 :100 : 0

    }

      res.status(200).json({
        success: true,
        data: data
    })
})

module.exports = router;
