import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import { AuthProvider } from "./context/AuthContext";
import { useAuthentication } from "./hooks/useAuthentcation";
import About from "./pages/About/about";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import CreatePost from "./pages/createPost/CreatePost";
import Dashboard from "./pages/dashboard/Dashboard";

//pages

function App() {
    const [user, setUser] = useState(undefined);
    const { auth } = useAuthentication();

    const loadingUser = user === undefined;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, [auth]);

    if (loadingUser) {
        return <p>Carregando...</p>;
    }
    return (
        <div className="App">
            <AuthProvider value={user}>
                <BrowserRouter>
                    <Navbar user={user} />
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route
                                path="/login"
                                element={
                                    !user ? <Login /> : <Navigate to={"/"} />
                                }
                            />
                            <Route
                                path="/register"
                                element={
                                    !user ? <Register /> : <Navigate to={"/"} />
                                }
                            />
                            <Route
                                path="/posts/create"
                                element={
                                    user ? (
                                        <CreatePost user={user} />
                                    ) : (
                                        <Navigate to={"/login"} />
                                    )
                                }
                            />
                            <Route
                                path="/dashboard"
                                element={
                                    user ? (
                                        <Dashboard />
                                    ) : (
                                        <Navigate to={"/login"} />
                                    )
                                }
                            />
                        </Routes>
                    </div>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;
