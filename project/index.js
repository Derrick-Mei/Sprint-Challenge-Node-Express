const express = require("express");
const router = express.Router();

const projects = require("../data/helpers/projectModel.js");

router
    .route("/")
    .get((req, res) => {
        projects
            .get()
            .then(projects => {
                res.json(projects);
            })
            .catch(() =>
                res
                    .status(500)
                    .json({ err: "the projects could not be retrieved" })
            );
    })
    .post((req, res) => {
        const { name, description, completed } = req.body;
        const newProject = { name, description, completed };
        name && description
            ? projects
                .insert(newProject)
                .then(project => res.json(project))
                .catch(() =>
                    res.status(500).json({ error: "project not posted" })
                )
            : res
                .status(400)
                .json({ error: "please provide both name and description" });
    });

router
    .route("/:id")
    .get((req, res) => {
        const { id } = req.params;
        projects
            .get(id)
            .then(project => res.json(project))
            .catch(() =>
                res
                    .status(500)
                    .json({ error: "Could not retrieve project with that ID" })
            );
    })
    .put((req, res) => {
        const { id } = req.params;
        const { name, description, completed } = req.body;
        const updatedProject = { name, description, completed };
        if (!name || !description) {
            res.status(400).json({
                error: "Please provide both name and description"
            });
        }
        projects
            .update(id, updatedProject)
            .then(project => {
                project
                    ? res.json(project)
                    : res.status(500).json("Project with that ID not found");
            })
            .catch(() =>
                res.status(500).json({ error: "Could not update project" })
            );
    })
    .delete((req, res) => {
        const { id } = req.params;
        projects
            .remove(id)
            .then(numberDeleted => {
                numberDeleted
                    ? res.json("Project successfully deleted")
                    : res.status(400).json({
                        error: "Project with that ID could not be deleted"
                    });
            })
            .catch(() =>
                res.status(500).json({ error: "project could not be deleted" })
            );
    });

router.route("/:id/actions").get((req, res) => {
    const { id } = req.params;
    projects
        .getProjectActions(id)
        .then(projectActions => res.json(projectActions))
        .catch(() =>
            res.status(500).json({ error: "could not project actions" })
        );
});

module.exports = router;
