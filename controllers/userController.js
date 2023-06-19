const { User, Thought } = require('../models')

module.exports = {

//get all users    
    async getUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts').populate('friends')
            res.json(users);
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },


//get a single user
    async getSingleUser (req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId})
                .select('-__v');

            if (!user) {
                return res.status(404).json({message: 'No user with this ID'})
            }
            res.json(user)
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

//create new user
    async createUser (req, res) {

        try{
            const user = await User.create(req.body)
            res.json(user)
        } catch(err){
            console.log(err)
            res.status(500).json(err)
        }   
    },

//update user by ID
    async updateUser (req, res) {
        try {
            let updatedUser =  await User.findByIdAndUpdate(
                req.params.userId,
                {$set : req.body},
                {new: true, runValidators: true});
            
            if (!updatedUser) {
                res.status(404).json({message: 'No user found with this ID'})
            }
            res.json(updatedUser)
        } catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },

//delete user by ID
    async deleteUser (req, res) {
        try{
            const user = await User.findOneAndRemove({ _id: req.params.userId})

            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID' })
            }

            const thought = await Thought.deleteMany({ _id: { $in: user.thoughts }})

            if (!thought) {
                return res.status(404).json({message: 'User deleted but no thoughts found'})
            }

            res.json({message: 'User and associated thoughts successfully deleted'})
        }catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },

//add friend to user friend list
    async addFriend (req, res) {
        console.log('You are adding a friend')
        console.log(req.params)

        try{
            const user = await User.findOneAndUpdate(
                {_id : req.params.userId},
                {$addToSet: {friends: req.params.friendId}},
                {runValidators:true, new: true}
            )
            if (!user){
                res.status(404).json({message: 'No user was found with this ID'})
            }
            res.json(user)
        }catch(err){
            console.log(err);
            res.status(500).json(err)
        }
    },

//Remove friend from user friend list
    async removeFriend (req, res) {
        console.log('You are removing a friend');
        console.log(req.params);
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
          );
      
          if (!user) {
            res.status(404).json({ message: 'No user found with this ID' });
          }
          res.json({ message: 'Friend removed', user });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      }
}

