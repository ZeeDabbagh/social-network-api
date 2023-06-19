const { User, Thought } = require('./models')
const db = require('./config/connection');

// Testing add friend
//add friend to user friend list
    async function addFriend () {
        console.log('You are adding a friend')
        req = {
            params: {
                userId: '648f743883111984daf61fd7',
                friendId: '648f743b83111984daf61fd9'
              }
        }
        res = {
            json: (data)=>{
                console.log(data);
            }
        }
        const user1 = await User.findOne(
            {_id: req.params.userId}
        ).populate("friends").populate("thoughts").select("-__v")
        const user2 = await User.findOne(
            {_id: req.params.friendId}
        ).populate("friends").populate("thoughts").select("-__v")
        console.log({
            areTheyFound: {
                user1, user2
            }
        })

        console.log(req.params)

        //console.log(User.findOneAndUpdate);
        // try{
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                {$addToSet: {friends: req.params.friendId}},
                {new: true}
            ).populate("friends")
            if (!user){
                res.status(404).json({message: 'No user was found with this ID'})
            }
            res.json(user)
        // }catch(err){
        //     console.log(err);
        //     res.status(500).json(err)
        // }
    }

db.once('open', () => {
    addFriend();
});
