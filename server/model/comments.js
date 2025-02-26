const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: { 
      type: String, 
      required: true, 
      trim: true 
    }, // content 
    project: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Project", 
      required: true 
    }, // the project that belong to the comment
    author: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "users", 
      required: true 
    },
    replies: [
      {
        text: { 
          type: String, 
          required: true, 
          trim: true 
        }, // array of replys
        author: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "User", 
          required: true 
        }, // the user who replys
      },
    ], // Array of replies to the comment
  },
  { timestamps: true } 
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
