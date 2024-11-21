import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { Navigate } from "react-router-dom";

// Async thunk to fetch data based on category and number of questions
export const fetchData = createAsyncThunk(
  "quiz/fetchData",
  async ({ category, numberOfQuestions }, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://the-trivia-api.com/v2/questions?category=${category}&limit=${numberOfQuestions}`
      );
      return response.data; // Return the fetched data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Handle errors
    }
  }
);

// Initial state
const initialState = {
  items: [],
  currentQuestionIndex: 0, // Track current question
  status: "idle",
  error: null,
  questions: [], // Store shuffled questions
  selectedAnswers: [], // Store the selected answers
  results: [], // Store whether the answers were correct or not
};

// Slice definition
const mainSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    // Action to go to the next question
    next: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1; // Increment the index
      } else if (state.currentQuestionIndex === state.questions.length - 1) {
        Navigate("/result"); // Go to result page
      }
    },
    resetQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.selectedAnswers = [];
      state.results = [];
    },

    // Action to go to the previous question
    previous: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1; // Decrement the index
      }
    },

    // Set shuffled questions after fetching data
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },

    // Action to store the selected answer for a question
    selectAnswer: (state, action) => {
      const { questionIndex, answer } = action.payload;
      state.selectedAnswers[questionIndex] = answer;
      const isCorrect =
        state.questions[questionIndex]?.correctAnswer === answer;
      state.results[questionIndex] = isCorrect;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        const shuffledQuestions = action.payload.map((item) => ({
          question: item.question.text,
          category: item.category,
          incorrectAnswers: item.incorrectAnswers,
          correctAnswer: item.correctAnswer,
          answers: [...item.incorrectAnswers, item.correctAnswer].sort(
            () => Math.random() - 0.5 // Shuffle answers
          ),
        }));
        state.items = action.payload; // Store the raw items
        state.questions = shuffledQuestions; // Store the shuffled questions
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Capture the error
      });
  },
});

// Export actions
export const { resetQuiz, next, previous, setQuestions, selectAnswer } =
  mainSlice.actions;

// Store configuration
const store = configureStore({
  reducer: {
    mainSlice: mainSlice.reducer, // Register the slice
  },
});

export default store;
