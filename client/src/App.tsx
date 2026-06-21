import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Builder from "./pages/Builder";
import Layout from "./pages/Layout";
import Preview from "./pages/Preview";
import Login from "./pages/Login";

const App = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* APP ROUTES (PROTECTED AREA) */}
      <Route path="/app" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="builder/:resumeID" element={<Builder />} />
      </Route>

      {/* PUBLIC PREVIEW */}
      <Route path="/view/:resumeID" element={<Preview />} />
    </Routes>
  );
};

export default App;