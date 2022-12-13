const { User } = require('../models');

const UserController = {
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: 'thought',
        select: '-__v'
      })
      .populate({
        path: 'friend',
        select: '-__v'
      })
      .select('-__v')
     // .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thought',
        select: '-__v'
      })
      .populate({
        path: 'friend',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createUser
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  removeUser({params}, res) {
    User.findOneAndDelete({_id: params.id})
    .then(dbUserData => {
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},

  // update User by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
      
  }
};

module.exports = UserController;
