import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./Navbar.jsx";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
// import Form from "./Components/Form";
import Home from "./Components/Home.jsx";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/home" /> : children;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedIn(false);
  };

  const handleAddPost = () => {
    setEditingPost(null);
    setIsFormOpen(true);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPost(null);
  };

  return (
    <BrowserRouter basename="/BLooooG_App">
      <Navbar loggedIn={loggedIn} onLogout={handleLogout} />

      {isFormOpen && (
        <Form
          open={isFormOpen}
          onClose={handleCloseForm}
          initialData={editingPost}
          onSubmit={() => {
            setIsFormOpen(false);
            setEditingPost(null);
          }}
        />
      )}

      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login onLogin={() => setLoggedIn(true)} />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home onEditPost={handleEditPost} onAddPost={handleAddPost} />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={<Navigate to={loggedIn ? "/home" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
