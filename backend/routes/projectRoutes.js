const express = require("express");

const Project = require("../models/Project");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// =====================================
// Create Project
// POST /api/projects
// =====================================

router.post("/", authMiddleware, async (req, res) => {

    try {

        const { title, description, deadline, status } = req.body;

        const project = await Project.create({

            title,

            description,

            deadline,

            status,

            userId: req.user._id

        });

        res.status(201).json({

    message: "Project Created Successfully",

    project

});

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


// =====================================
// Get All Projects
// GET /api/projects
// =====================================

router.get("/", authMiddleware, async (req, res) => {

    try {

        const projects = await Project.find({

            userId: req.user._id

        });

        res.status(200).json(projects);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


// =====================================
// Update Project
// PUT /api/projects/:id
// =====================================

router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const project = await Project.findOneAndUpdate(

            {

                _id: req.params.id,

                userId: req.user._id

            },

            req.body,

            {

                new: true

            }

        );

        if (!project) {

            return res.status(404).json({

                message: "Project Not Found"

            });

        }

        res.status(200).json({

    message: "Project Updated Successfully",

    project

});

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


// =====================================
// Delete Project
// DELETE /api/projects/:id
// =====================================

router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const project = await Project.findOneAndDelete({

            _id: req.params.id,

            userId: req.user._id

        });

        if (!project) {

            return res.status(404).json({

                message: "Project Not Found"

            });

        }

        res.status(200).json({

            message: "Project Deleted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});

module.exports = router;