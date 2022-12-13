const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  removeUser
} = require('../../controllers/User-controller');

// /api/Users
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// /api/Users/:id
router
  .route('/:id')
  .get(getUserById)
  .delete(removeUser)
  .put(updateUser);

module.exports = router;
