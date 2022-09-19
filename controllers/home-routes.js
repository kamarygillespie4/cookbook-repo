const router = require('express').Router();
const { Recipe, Comment, User } = require('../models/');

// get all recipes for homepage
router.get('/', async(req, res) => {
    try {
        const recipeData = await Recipe.findAll({
            include: [User],
        });

        const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

        res.render('all-recipes', { recipes });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get single recipe
router.get('/recipe/:id', async(req, res) => {
    try {
        const recipeData = await Recipe.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        if (recipeData) {
            const recipe = recipeData.get({ plain: true });

            res.render('single-recipe', { recipe });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

module.exports = router;