const router = require('express').Router();
const withAuth = require('../../utils/auth');

const {Blog, Comment, User} = require('../../models');

//get all blog entries
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      attributes: [
        'id',
        'body',
        'title',
        'created_at'
      ],
      include: [User]
    })
    const blogs = blogData.map((blog) =>
    blog.get({
      plain:true,
    }))
    res.render('homepage', {blogs})
  }catch (err) {
    res.status(500).json(err)
  }
});

//get specific blog
router.get('blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'body',
        'title',
        'created_at'
      ],
      include: [User]
    })
    const blog = blogData.get({plain:true})
  } catch (err) {
    res.status(500).json(err)
  }
});
//check loggin
router.get('/login', (req, res) => {
  if(req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('signUp', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('dashboard')
    return;
  }
  res.render('signUp');
});

router.get('dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Blog
      }],
    });
    const user = userData.get({
      plain:true
    });
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router