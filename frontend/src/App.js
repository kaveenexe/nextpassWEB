import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Dashboard from "./components/Admin/Dashboard";
import TravelHistory from "./pages/Admin/TravelHistory";
import TransportManager from "./pages/Admin/TransportManager";
import AssignBusses from "./pages/Admin/AssignBusses";
import AssignInspectors from "./pages/Admin/AssignInspectors";
import BusTimeTable from "./pages/Admin/BusTimeTable";
import Settings from "./pages/Admin/Settings";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route index element={<TransportManager />} />
            <Route path="travel-history" element={<TravelHistory />} />
            <Route path="bus-timetable" element={<BusTimeTable />} />
            <Route path="assign-busses" element={<AssignBusses />} />
            <Route path="assign-inspectors" element={<AssignInspectors />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
