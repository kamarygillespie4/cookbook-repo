const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const recipeRoutes = require('./recipe-routes');
//change to recipe routes and change file name 
const commentRoutes = require('./comment-routes');

router.use('/user', userRoutes);
router.use('/recipe', recipeRoutes);
router.use('/comment', commentRoutes);

module.exports = router;