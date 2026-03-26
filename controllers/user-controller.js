const {UserModel, BookModel} = require('../models/index');

// router.get('/',(req,res)=>{
//     res.status(200).json({
//         success: true,
//         data: users
//     })
// })

exports.getAllUsers = async (req, res) =>{
    const users = await UserModel.find();

    if(!users || users.length  === 0){
        return res.status(404).json({
            success: false,
            message: "No users found"
        });
    }

    res.status(200).json({
        success: true,
        data: users
    });

}

// router.get('/:id', (req,res)=>{
//     const {id} = req.params
//     const user = users.find((each)=>each.id === id)

//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `User not found for id:${id}`
//         })
//     }

//     res.status(200).json({
//         success: true,
//         data: user
//     })
// })

exports.getSingleUserById = async (req, res) => {
    const {id} = req.params
    const user = await UserModel.findById(id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found for id:${id}`
        })
    }   

    res.status(200).json({
        success: true,
        data: user
    });

}

// router.post('/',(req,res)=>{
//     const {id,name,surname,email,subscriptionType,subscriptionDate} = req.body;
//    // Validation
//     if(!id || !name || !surname || !email || !subscriptionType || !subscriptionDate){
//         return res.status(400).json({
//             success: false,
//             message: "Please Provide all the required fields"
//         })
//     }
//     // Check if user already exists
//     const user = users.find((each)=> each.id === id)
//     if(user){
//         return res.status(409).json({
//             success:false,
//             message: `User Already exists with id: ${id}`
//         })
//     }
//     // Create new user
//     users.push({id,name,surname,email,subscriptionType,subscriptionDate})
//     res.status(201).json({
//         success: true,
//         message: "User created Successfully"
//     })
// })

exports.createUser = async (req, res) => {
    const {data} = req.body;
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide the data to create a new user"
        })
    }

    await UserModel.create(data);
    const getAllUsers = await UserModel.find();

    res.status(201).json({
        success: true,
        message: "User created Successfully",
        data: getAllUsers
    })               
};

// router.put('/:id',(req,res)=>{
//     const {id} = req.params;
//     const {data} = req.body;

//     //Check if user exists
//      const user = users.find((each)=>each.id === id)
//      if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `User not found for id:${id}`
//         })
//      }

//      const updatedUser = users.map((each)=>{
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
//         data: updatedUser,
//         message: "User updated successfully"
//      })
// })

exports.updateUserById = async (req, res) => {
    const {id} = req.params;
    const {data} = req.body;    
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide the data to update the user"
         })
     }      
    
    //Check if user exists
    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found for id:${id}`
        })
     }

    // if user exists update the user with the new data

    const updatedUser = await UserModel.findByIdAndUpdate(id, data, {new: true});

    res.status(200).json({
        success: true,
        data: updatedUser,
        message: "User updated successfully"
     });     
}

// router.delete('/:id',(req,res)=>{
//     //Check if user exists
//     const {id} = req.params;
//     const user = users.find((each)=>each.id === id)
//     if(!user){
//        return res.status(404).json({
//            success: false,
//            message: `User not found for id:${id}`
//        })
//     }

//     // if user exists filter out the user from the users array
//     const updatedUsers = users.filter((each)=> each.id !== id)
//     res.status(200).json({
//         success: true,
//         data: updatedUsers,
//         message: "User deleted successfully"
//      })
// });

exports.deleteUserById = async (req, res) => {
    const {id} = req.params;

    // Check if user exists
    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found for id:${id}`
        })
     }      

    // if user exists delete the user
    await UserModel.findByIdAndDelete(id);      
    res.status(200).json({
        success: true,
        message: "User deleted successfully"
     });
}

// router.get('/subscription-details/:id',(req,res)=>{
//     const {id} = req.params;
//     const user = users.find((each)=> each.id === id)    

//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `User not found for id:${id}`
//         })
//     }
    
//     //Extract the subscription details from the user object
//     const getDateInDays = (data = '')=>{
//         let date;
//         if(data){
//             date = new Date(data)
//         } else{
//             date = new Date();
//         }
//         let days = Math.floor(date/(1000*60*60*24));
//         return days;


//     }

//     const subscriptionType = (data)=>{
//         let date = data;
//         if(user.subscriptionType === "Basic"){
//             date = date + 90
//         } else if(user.subscriptionType === "Standard"){
//             date = date + 180
//         } else if(user.subscriptionType === "Premium"){
//             date = date + 365
//         }
//         return date;
//     }

//     //subscription expiration calculation
//     //jan 1 1970 UTC // milliseconds

//     let returnDate = getDateInDays(user.returnDate);
//     let currentDate = getDateInDays();
//     let subscriptionDate = getDateInDays(user.subscriptionDate);

//     let subscriptionExpiration = subscriptionType(subscriptionDate);

//     const data = {
//         ...user,
//         subscriptionExpired: subscriptionExpiration < currentDate,
//         subscriptionDaysLeft: subscriptionExpiration - currentDate,
//         daysLeftForExpiration: returnDate - currentDate,
//         returnDate: returnDate < currentDate? "Book is Overdue":returnDate,
//         fine: returnDate < currentDate? subscriptionExpiration<=currentDate?200 :100 : 0

//     }

//       res.status(200).json({
//         success: true,
//         data: data
//     })
// })

exports.getSubscriptionDetailsById = async (req, res) => {
    const {id} = req.params;
    const user = await UserModel.findById(id);

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
        ...user._doc,
        subscriptionExpired: subscriptionExpiration < currentDate,
        subscriptionDaysLeft: subscriptionExpiration - currentDate,
        daysLeftForExpiration: returnDate - currentDate,
        returnDate: returnDate < currentDate? "Book is Overdue":returnDate,
        fine: returnDate < currentDate? subscriptionExpiration<=currentDate?200 :100 : 0        
    }

      res.status(200).json({
        success: true,
        data: data
     });


}