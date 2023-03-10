import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import EditNote from "./EditNote";
import ViewNote from "./ViewNote";

function App() {

  

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Layout />} >
          <Route path=":noteId" element={<ViewNote />} />
          <Route path=":noteId/edit" element={<EditNote />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
