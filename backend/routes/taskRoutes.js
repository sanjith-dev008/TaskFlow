const express = require("express");

const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ======================================
// Create Task
// POST /api/tasks
// ======================================

router.post("/", authMiddleware, async (req, res) => {

    try {

        const { title, priority, status, projectId } = req.body;

        const task = await Task.create({

            title,

            priority,

            status,

            projectId,

            userId: req.user._id

        });

        res.status(201).json({

            message: "Task Created Successfully",

            task

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


// ======================================
// Get All Tasks
// GET /api/tasks
// ======================================

router.get("/", authMiddleware, async (req, res) => {

    try {

        const tasks = await Task.find({

            userId: req.user._id

        }).populate("projectId");

        res.status(200).json(tasks);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


// ======================================
// Update Task
// PUT /api/tasks/:id
// ======================================

router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const task = await Task.findOneAndUpdate(

            {

                _id: req.params.id,

                userId: req.user._id

            },

            req.body,

            {

                new: true

            }

        ).populate("projectId");

        if (!task) {

            return res.status(404).json({

                message: "Task Not Found"

            });

        }

        res.status(200).json({

            message: "Task Updated Successfully",

            task

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


// ======================================
// Delete Task
// DELETE /api/tasks/:id
// ======================================

router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const task = await Task.findOneAndDelete({

            _id: req.params.id,

            userId: req.user._id

        });

        if (!task) {

            return res.status(404).json({

                message: "Task Not Found"

            });

        }

        res.status(200).json({

            message: "Task Deleted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});

module.exports = router;