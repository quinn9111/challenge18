const router = require('express').Router();

const {
  addThought,
  updateThought,
  removeThought,
  getAllThought,
  getThoughtById,
  addReaction,
  removeReaction
} = require('../../controllers/Thought-controller');

// -- Directs to: /api/thoughts <GET>
router.route('/').get(getAllThought);

// /api/Thoughts/<userId>
router.route('/:userId').post(addThought);

router.route('/:id').get(getThoughtById)
.put(updateThought)
.delete(removeThought); 

// /api/Thoughts/<userId>/<ThoughtId>
router
  .route('/:userId/:ThoughtId')
  .put(addReaction)
  .delete(removeThought);

// /api/Thoughts/<userId>/<ThoughtId>/<ReactionId>
router.route('/:userId/:ThoughtId/:ReactionId').delete(removeReaction);

module.exports = router;
