const router = require('express').Router();
const { Recipe } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async(req, res) => {
    try {
        const recipeData = await Recipe.findAll({
            where: {
                userId: req.session.userId,
            },
        });

        const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

        res.render('all-recipes-admin', {
            layout: 'dashboard',
            recipes,
        });
    } catch (err) {
        res.redirect('login');
    }
});

router.get('/new', withAuth, (req, res) => {
    res.render('new-recipe', {
        layout: 'dashboard',
    });
});

router.get('/edit/:id', withAuth, async(req, res) => {
    try {
        const recipeData = await Recipe.findByPk(req.params.id);

        if (recipeData) {
            const recipe = recipeData.get({ plain: true });

            res.render('edit-recipe', {
                layout: 'dashboard',
                recipe,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect('login');
    }
});

module.exports = router;