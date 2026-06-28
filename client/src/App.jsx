import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import ProfessorDashboard from "./pages/ProfessorDashboard";
import CreateProject from "./pages/CreateProject";
import MyApplications from "./pages/MyApplications";
import MyProjects from "./pages/MyProjects";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Profile from "./pages/Profile";
import AppliedProjects from "./pages/AppliedProjects";
import SavedProjects from "./pages/SavedProjects";
import Notifications from "./pages/Notifications";
import ApplicationsManagement from "./pages/ApplicationsManagement";
import EditProject from "./pages/EditProject";
import ProtectedRoute from "./components/ProtectedRoute";
import EditProfile from "./pages/EditProfile";
import StudentProfile from "./pages/StudentProfile";
import ProfessorProfile from "./pages/ProfessorProfile";
import Professors from "./pages/Professors";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <BrowserRouter>
   
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
<Route
  path="/edit-profile"
  element={
    <ProtectedRoute>
      <EditProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/professor/:id"
  element={
    <ProtectedRoute>
      <ProfessorProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/student/:id"
  element={<StudentProfile />}
/>
        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/:id"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <ProjectDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <MyApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-projects"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <SavedProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applied-projects"
          element={
            <ProtectedRoute allowedRole="STUDENT">
              <AppliedProjects />
            </ProtectedRoute>
          }
        />
       <Route
  path="/notifications"
  element={
    <ProtectedRoute>
      <Notifications />
    </ProtectedRoute>
  }
/>

        {/* Professor Routes */}
        <Route
          path="/professor"
          element={
            <ProtectedRoute allowedRole="PROFESSOR">
              <ProfessorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-project"
          element={
            <ProtectedRoute allowedRole="PROFESSOR">
              <CreateProject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-projects"
          element={
            <ProtectedRoute allowedRole="PROFESSOR">
              <MyProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-project/:id"
          element={
            <ProtectedRoute allowedRole="PROFESSOR">
              <EditProject />
            </ProtectedRoute>
          }
        />
         <Route
  path="/professors"
  element={
    <ProtectedRoute>
      <Professors />
    </ProtectedRoute>
  }
/>
        <Route
          path="/applications-management"
          element={
            <ProtectedRoute allowedRole="PROFESSOR">
              <ApplicationsManagement />
            </ProtectedRoute>
          }
        />
        <Route
  path="*"
  element={<NotFound />}
/>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;