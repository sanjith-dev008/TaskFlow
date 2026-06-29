import { useEffect, useState } from "react";

function Dashboard() {

    const [projects, setProjects] = useState([]);

    const [tasks, setTasks] = useState([]);

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

            else {

                alert(data.message);

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

            else {

                alert(data.message);

            }

        }

        catch (error) {

            console.log(error);

        }

    }


    const totalProjects = projects.length;

    const pendingTasks = tasks.filter(

        task => task.status === "Todo"

    ).length;

    const completedTasks = tasks.filter(

        task => task.status === "Completed"

    ).length;

    return (

        <div>

            <h2 className="mb-4">

    Dashboard

</h2>

            <div className="row">

                <div className="col-md-4">

                    <div className="card text-center shadow">

                        <div className="card-body">

                            <h5>Total Projects</h5>

                            <h2>{totalProjects}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card text-center shadow">

                        <div className="card-body">

                            <h5>Pending Tasks</h5>

                            <h2>{pendingTasks}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card text-center shadow">

                        <div className="card-body">

                            <h5>Completed Tasks</h5>

                            <h2>{completedTasks}</h2>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;