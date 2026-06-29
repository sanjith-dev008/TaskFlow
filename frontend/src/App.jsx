import {
    Routes,
    Route,
    Link,
    Navigate,
    useNavigate,
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };

    return (

        <>

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

                <div className="container">

                    <Link
                        className="navbar-brand fw-bold"
                        to="/"
                    >
                        TaskFlow
                    </Link>

                    <div className="navbar-nav ms-auto">

                        {
                            !token ?

                                <>

                                    <Link
                                        className="nav-link"
                                        to="/register"
                                    >
                                        Register
                                    </Link>

                                    <Link
                                        className="nav-link"
                                        to="/login"
                                    >
                                        Login
                                    </Link>

                                </>

                                :

                                <>

                                    <Link
                                        className="nav-link"
                                        to="/dashboard"
                                    >
                                        Dashboard
                                    </Link>

                                    <Link
                                        className="nav-link"
                                        to="/projects"
                                    >
                                        Projects
                                    </Link>

                                    <Link
                                        className="nav-link"
                                        to="/tasks"
                                    >
                                        Tasks
                                    </Link>

                                    <button
                                        className="btn btn-danger ms-3"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>

                                </>

                        }

                    </div>

                </div>

            </nav>

            <div className="container mt-4">

                <Routes>

                    <Route
                        path="/"
                        element={<Navigate to="/login" />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>

                                <Dashboard />

                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/projects"
                        element={
                            <ProtectedRoute>

                                <Projects />

                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/tasks"
                        element={
                            <ProtectedRoute>

                                <Tasks />

                            </ProtectedRoute>
                        }
                    />

                </Routes>

            </div>

        </>

    );

}

export default App;