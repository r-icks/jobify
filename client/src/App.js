import { Landing, Error, Register, ProtectedRoute} from "./pages";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { AddJob, AllJobs, SharedLayout, Stats, Profile} from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<ProtectedRoute>
        <SharedLayout />
        </ProtectedRoute>}>
          <Route index element={<Stats/>} />
          <Route path="all-jobs" element={<AllJobs/>} />
          <Route path="add-job" element={<AddJob/>} />
          <Route path="profile" element={<Profile/>} />
        </Route>

        <Route path="/landing" element=<Landing /> />
        <Route path="/register" element=<Register/> />
        <Route path="*" element=<Error/> />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
