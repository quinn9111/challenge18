const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: ()=> new Types.ObjectId()
  },
    username: {
      type: String,
      required: true
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true
  },
  reaction: [ReactionSchema],
},
  {
    toJSON: {
      getters: true
    },
    id: false
    }
)


ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reaction.length;
});



const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;