import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import QuizForm from "./components/QuizForm";
import Questions from "./components/Questions";

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <QuizForm />
        <Questions />
      </div>
    </Provider>
  );
};

export default App;
