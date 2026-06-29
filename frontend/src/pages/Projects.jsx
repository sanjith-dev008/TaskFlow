import { useEffect, useState } from "react";

function Projects() {

    const [projects, setProjects] = useState([]);

    const [formData, setFormData] = useState({

        title: "",

        description: "",

        deadline: "",

        status: "Todo"

    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

        fetchProjects();

    }, []);

    async function fetchProjects() {

        try {

            const response = await fetch(

                "http://localhost:5000/api/projects",

                {

                    headers: {

                        Authorization:
                            "Bearer " + localStorage.getItem("token")

                    }

                }

            );

            const data = await response.json();

            if (response.ok) {

                setProjects(data);

            }

        }

        catch (error) {

            console.log(error);

        }

    }

    function handleChange(event) {

        setFormData({

            ...formData,

            [event.target.name]: event.target.value

        });

    }

    async function handleSubmit(event) {

        event.preventDefault();

        const url = editingId

            ? "http://localhost:5000/api/projects/" + editingId

            : "http://localhost:5000/api/projects";

        const method = editingId ? "PUT" : "POST";

        try {

            const response = await fetch(

                url,

                {

                    method,

                    headers: {

                        "Content-Type": "application/json",

                        Authorization:
                            "Bearer " + localStorage.getItem("token")

                    },

                    body: JSON.stringify(formData)

                }

            );

            const data = await response.json();

            if (response.ok) {

                alert(data.message);

                setFormData({

                    title: "",

                    description: "",

                    deadline: "",

                    status: "Todo"

                });

                setEditingId(null);

                fetchProjects();

            }

            else {

                alert(data.message);

            }

        }

        catch (error) {

            console.log(error);

        }

    }

    function handleEdit(project) {

        setEditingId(project._id);

        setFormData({

            title: project.title,

            description: project.description,

            deadline: project.deadline.split("T")[0],

            status: project.status

        });

    }

    async function handleDelete(id) {

        if (!window.confirm("Delete this project?"))

            return;

        try {

            const response = await fetch(

                "http://localhost:5000/api/projects/" + id,

                {

                    method: "DELETE",

                    headers: {

                        Authorization:
                            "Bearer " + localStorage.getItem("token")

                    }

                }

            );

            const data = await response.json();

            alert(data.message);

            fetchProjects();

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <>

            <h2 className="mb-4">

                Projects

            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    placeholder="Project Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <textarea
                    className="form-control mb-3"
                    placeholder="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <input
                    type="date"
                    className="form-control mb-3"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                />

                <select
                    className="form-select mb-3"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >

                    <option>Todo</option>

                    <option>In Progress</option>

                    <option>Completed</option>

                </select>

                <button
                    className="btn btn-success"
                    type="submit"
                >

                    {editingId ? "Update Project" : "Create Project"}

                </button>

            </form>

            <hr />

            {

                projects.map((project) => (

                    <div
                        key={project._id}
                        className="card mb-3"
                    >

                        <div className="card-body">

                            <h4>

                                {project.title}

                            </h4>

                            <p>

                                {project.description}

                            </p>

                            <p>

                                Deadline :

                                {" "}

                                {project.deadline.substring(0,10)}

                            </p>

                            <p>

                                Status :

                                {" "}

                                {project.status}

                            </p>

                            <button
                                className="btn btn-warning me-2"
                                onClick={() => handleEdit(project)}
                            >
                                Edit
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(project._id)}
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))

            }

        </>

    );

}

export default Projects;