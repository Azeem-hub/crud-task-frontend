import React from "react";
import Create from "./pages/create";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowUsers from "./pages/show";
import Edit from "./pages/edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/users" element={<ShowUsers />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
