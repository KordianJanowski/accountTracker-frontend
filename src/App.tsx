import * as React from "react";
import { Routes, Route } from "react-router-dom";

import Home from './views/Home'
import AccountProfile from './views/AccountProfile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<AccountProfile />} />
    </Routes>
  );
}

export default App;