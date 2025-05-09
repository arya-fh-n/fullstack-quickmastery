import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import ForumDetail from "./pages/ForumDetail";
// import History from "./pages/History";
// import Dashboard from "./pages/History";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <div className="font-mono">
    <BrowserRouter>
      <Routes>
        {/** Protected User/Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          {/* <Route path="/history" element={<History />} /> */}
          {/* <Route path="/post/:id" element={<ForumDetail />} /> */}
        </Route>

        {/** Public Routes */}
        {/** TODO REMOVE PUBLIC HOME 
         * WHEN AUTH IS IMPLEMENTED */}
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/** Protected Admin Only Routes */}
        <Route element={<ProtectedRoute adminOnly={true} />}>
          {/* <Route path="/admin/home" element={<Dashboard />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
