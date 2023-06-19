const mongoose = require("mongoose");
const db = require("../config/connection");
const { User, Thought, reactionSchema } = require("../models");

async function exec() {
  await User.deleteMany({});
  await Thought.deleteMany({});



  const thought = await Thought.create({ thoughtText: `Here's a cool thought...`, username: 'Zee Bus'})

  await User.create({ username: "Lulu Lemon", email: "lulu@gmail.com" });
  await User.create({ username: "Zee Bus", email: "zb@gmail.com", thoughts:[thought._id] });


  console.log("Seeded!");
  mongoose.disconnect();
}

db.once("open", () => {
  exec();
});