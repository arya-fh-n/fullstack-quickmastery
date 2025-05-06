import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManageProductHome from "./components/ManageProductHome";

function App() {
  return (
    <div className="min-h-screen bg-gray-100" id="appContainer">
      <BrowserRouter>
        <Routes>
          {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/" element={<ManageProductHome />} />
            {/* <Route path="/" element={<PosHome />} /> */}
            <Route path="/products" element={<ManageProductHome />} />
            {/* <Route path="/users" element={<UsersHome />} /> */}
            {/* <Route path="/checkout" element={<CartHome />} /> */}
          {/* </Route> */}
          {/* <Route path="/login" element={<Login />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
