const { Thought, User } = require('../models');

const ThoughtController = {
  addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.UserId },
          { $push: { Thought: _id } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  getAllThought(req,res) {
    Thought.find({})
    .populate({path: 'reaction', select: '-__v'})
    .select('-__v')
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
        res.status(404).json(err);
    });
},

getThoughtById({params}, res) {
  Thought.findOne({ _id: params.id })
  .populate({path: 'reaction',select: '-__v'})
  .select('-__v')
  .then(dbThoughtData => {
  res.json(dbThoughtData)
  })
  .catch(err => {
      console.log(err);
      res.sendStatus(404);
  });
},

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.ThoughtId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
    )
    .populate({path: 'reaction', select: '-__v'})
    .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  updateThought({params, body}, res) {
    Thought.findOneAndUpdate({_id: params.id}, body, 
      {new: true, runValidators: true})
    .populate({path: 'reaction', select: '-__v'})
    .select('-___v')
    .then(dbThoughtData => {
            res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
},
  // remove Thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No Thought found!' });
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
 
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.ThoughtId },
      { $pull: { reaction: { ReactionId: params.ReactionId } } },
      { new: true })
      .then(dbThoughtData => {
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
}

};

module.exports = ThoughtController;
