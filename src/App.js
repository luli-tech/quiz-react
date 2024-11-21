import React from "react";
import "./App.css";
import QuizInterface from "./components/Quizinterface";
import WelcomePage from "./pages/WelcomePage";
import ResultPage from "./pages/resultPage";
import CategorySelection from "./pages/categorySelection";
import Navbar from "./components/navbar";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RouterProvider } from "react-router-dom";
const App = () => {
  let provider = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={<WelcomePage />} />
        <Route path="/category" element={<CategorySelection />} />
        <Route path="/quizPage" element={<QuizInterface />} />
        <Route path="/result" element={<ResultPage />} />
      </Route>
    )
  );
  return (
    <div className="app">
      <RouterProvider future={{ v7_startTransition: true }} router={provider} />
    </div>
  );
};

export default App;
