import { Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Workout from "@/pages/Workout";
import ExerciseDetails from "@/pages/ExerciseDetails";
import WorkoutComplete from "@/pages/WorkoutComplete";

const Home = () => (
  <div>
    <h1>Jylix</h1>
    <p>Home</p>
  </div>
);



const Nutrition = () => (
  <div>
    <h1>Nutrition</h1>
    <p>Your nutrition plan</p>
  </div>
);

const Progress = () => (
  <div>
    <h1>Progress</h1>
    <p>Your progress</p>
  </div>
);

const AICoach = () => (
  <div>
    <h1>AI Coach</h1>
    <p>Your personal AI fitness coach</p>
  </div>
);

const Missions = () => (
  <div>
    <h1>Missions</h1>
    <p>Your missions</p>
  </div>
);

const Settings = () => (
  <div>
    <h1>Settings</h1>
    <p>Jylix settings</p>
  </div>
);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<AppLayout />}>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/workout"
          element={<Workout />}
        />

        <Route
          path="/workout/exercise/:id"
          element={<ExerciseDetails />}
        />

        <Route
  path="/workout/complete"
  element={<WorkoutComplete />}
/>

        <Route
          path="/nutrition"
          element={<Nutrition />}
        />

        <Route
          path="/progress"
          element={<Progress />}
        />

        <Route
          path="/ai-coach"
          element={<AICoach />}
        />

        <Route
          path="/missions"
          element={<Missions />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default App;