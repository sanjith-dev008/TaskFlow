import { useEffect, useState } from "react";

function Tasks() {

    const [tasks, setTasks] = useState([]);

    const [projects, setProjects] = useState([]);

    const [search, setSearch] = useState("");

    const [priorityFilter, setPriorityFilter] = useState("All");

    const [statusFilter, setStatusFilter] = useState("All");

    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({

        title: "",

        priority: "Medium",

        status: "Todo",

        projectId: ""

    });

    useEffect(() => {

        fetchProjects();

        fetchTasks();

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

    async function fetchTasks() {

        try {

            const response = await fetch(

                "http://localhost:5000/api/tasks",

                {

                    headers: {

                        Authorization:
                            "Bearer " + localStorage.getItem("token")

                    }

                }

            );

            const data = await response.json();

            if (response.ok) {

                setTasks(data);

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

            ? "http://localhost:5000/api/tasks/" + editingId

            : "http://localhost:5000/api/tasks";

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

                    priority: "Medium",

                    status: "Todo",

                    projectId: ""

                });

                setEditingId(null);

                fetchTasks();

            }

            else {

                alert(data.message);

            }

        }

        catch (error) {

            console.log(error);

        }

    }

    function handleEdit(task) {

        setEditingId(task._id);

        setFormData({

            title: task.title,

            priority: task.priority,

            status: task.status,

            projectId: task.projectId._id

        });

    }

    async function handleDelete(id) {

        if (!window.confirm("Delete this task?")) {

            return;

        }

        try {

            const response = await fetch(

                "http://localhost:5000/api/tasks/" + id,

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

            fetchTasks();

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <>

            <h2 className="mb-4">

                Tasks

            </h2>
<h4 className="mb-3">

    {editingId ? "Update Task" : "Create Task"}

</h4>

            <form onSubmit={handleSubmit}>

                <input

                    className="form-control mb-3"

                    placeholder="Task Title"

                    name="title"

                    value={formData.title}

                    onChange={handleChange}

                    required

                />

                <select

                    className="form-select mb-3"

                    name="priority"

                    value={formData.priority}

                    onChange={handleChange}

                >

                    <option>High</option>

                    <option>Medium</option>

                    <option>Low</option>

                </select>

                <select

                    className="form-select mb-3"

                    name="status"

                    value={formData.status}

                    onChange={handleChange}

                >

                    <option>Todo</option>

                    <option>Doing</option>

                    <option>Completed</option>

                </select>

                <select

                    className="form-select mb-3"

                    name="projectId"

                    value={formData.projectId}

                    onChange={handleChange}

                    required

                >

                    <option value="">

                        Select Project

                    </option>

                    {

                        projects.map((project) => (

                            <option

                                key={project._id}

                                value={project._id}

                            >

                                {project.title}

                            </option>

                        ))

                    }

                </select>

                <button

                    className="btn btn-success"

                    type="submit"

                >

                    {

                        editingId

                            ? "Update Task"

                            : "Create Task"

                    }

                </button>

            </form>

            <hr />

<h4 className="mb-3">

    Task List

</h4>

<div className="mb-3">

    <label className="form-label">

        Search Task

    </label>

    <input

        type="text"

        className="form-control"

        placeholder="Search by title..."

        value={search}

        onChange={(event) =>

            setSearch(event.target.value)

        }

    />

</div>

<div className="mb-4">

    <label className="form-label">

        Filter

    </label>

    <div className="row">

        <div className="col-md-6">

            <select

                className="form-select"

                value={priorityFilter}

                onChange={(event) =>

                    setPriorityFilter(event.target.value)

                }

            >

                <option value="All">

                    All Priorities

                </option>

                <option value="High">

                    High

                </option>

                <option value="Medium">

                    Medium

                </option>

                <option value="Low">

                    Low

                </option>

            </select>

        </div>

        <div className="col-md-6">

            <select

                className="form-select"

                value={statusFilter}

                onChange={(event) =>

                    setStatusFilter(event.target.value)

                }

            >

                <option value="All">

                    All Statuses

                </option>

                <option value="Todo">

                    Todo

                </option>

                <option value="Doing">

                    Doing

                </option>

                <option value="Completed">

                    Completed

                </option>

            </select>

        </div>

    </div>

</div>

{

tasks

.filter((task) =>

    task.title

        .toLowerCase()

        .includes(search.toLowerCase())

)

.filter((task) =>

    priorityFilter === "All"

        ||

    task.priority === priorityFilter

)

.filter((task) =>

    statusFilter === "All"

        ||

    task.status === statusFilter

)

.map((task) => (

    <div

        key={task._id}

        className="card mb-3"

    >

        <div className="card-body">

            <h4>{task.title}</h4>

            <p>

                Project : {task.projectId.title}

            </p>

            <p>

                Priority : {task.priority}

            </p>

            <p>

                Status : {task.status}

            </p>

            <button

                className="btn btn-warning me-2"

                onClick={() => handleEdit(task)}

            >

                Edit

            </button>

            <button

                className="btn btn-danger"

                onClick={() => handleDelete(task._id)}

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

export default Tasks;