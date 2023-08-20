const router = require('express').Router();
const {Blog, Comment, User} = require('../../models');
const withAuth = require('../../utils/auth');

//get/find all comments
router.get('/', (req, res) => {
 Comment.findAll({})
 .then(commentData => res.json(commentData))
 .catch(err => {
  console.log(err);
  res.status(500).json(err);
 });
});

//post new comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.json(newCommnet);
  }catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});
//delete comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const CommentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!commnetData) {
      res.status(404).json({ message: "404 This blog id was not found"});
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;