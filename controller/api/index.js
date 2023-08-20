const router = require('express').Router();
const blogRoutes = require('../api/blogRoutes');
const commentRoutes = require('../api/commentRoutes');

router.use('/blogs', blogRoutes);
router.use('comments', commentRoutes);

module.export = router;