const express = require("express");
const router = express.Router();

const actions = require("../data/helpers/actionModel.js");

router
    .route("/")
    .get((req, res) => {
        actions
            .get()
            .then(actions => res.json(actions))
            .catch(() =>
                res
                    .status(500)
                    .json({ err: "the actions could not be retrieved" })
            );
    })
    .post((req, res) => {
        console.log(req.body);
        const { project_id, description, notes, completed } = req.body;
        const newAction = { project_id, description, notes, completed };
        if (!project_id || !description) {
            res.status(400).json({
                error: "Please provide both project id and description"
            });
            return;
        }
        actions
            .insert(newAction)
            .then(action => res.json(action))
            .catch(err => res.status(500).json({ error: err }));
    });

router
    .route("/:id")
    .get((req, res) => {
        const id = req.params.id;
        actions
            .get(id)
            .then(action => res.json(action))
            .catch(err => res.status(500).json({ error: err }));
    })
    .put((req, res) => {
        const { project_id, description, notes, completed } = req.body;
        const updateAction = { project_id, description, notes, completed };
        const { id } = req.params;
        actions
            .update(id, updateAction)
            .then(action => {
                action
                    ? res.json(action)
                    : res
                        .status(400)
                        .json({ err: "action with that id does not exist" });
            })
            .catch(err => res.status(500).json({ error: err }));
    })
    .delete((req, res) => {
        const { id } = req.params;
        actions
            .remove(id)
            .then(numberDeleted => {
                numberDeleted
                    ? res.json("action successfully deleted")
                    : res.status(500).json({ error: "action not deleted" });
            })
            .catch(err => res.status(500).json({ error: err }));
    });

module.exports = router;
