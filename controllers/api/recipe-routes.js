const router = require('express').Router();
const { Recipe } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async(req, res) => {
    const body = req.body;

    try {
        const newRecipe = await Recipe.create({...body, userId: req.session.userId });
        res.json(newRecipe);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async(req, res) => {
    try {
        const [affectedRows] = await Recipe.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async(req, res) => {
    try {
        const [affectedRows] = Recipe.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;