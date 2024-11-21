import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "quiz/fetchData",
  async ({ category, numberOfQuestions }, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://the-trivia-api.com/v2/questions?categories=${category}&limit=${numberOfQuestions}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswers: [],
  results: [],
  status: "idle",
  error: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    next: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    previous: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    selectAnswer: (state, action) => {
      const { questionIndex, answer } = action.payload;
      state.selectedAnswers[questionIndex] = answer;
      state.results[questionIndex] =
        state.questions[questionIndex]?.correctAnswer === answer;
    },
    resetQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.selectedAnswers = [];
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload.map((item) => ({
          question: item.question.text,
          answers: [...item.incorrectAnswers, item.correctAnswer].sort(
            () => Math.random() - 0.5
          ),
          correctAnswer: item.correctAnswer,
        }));
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { next, previous, selectAnswer, resetQuiz } = quizSlice.actions;

const store = configureStore({
  reducer: {
    quiz: quizSlice.reducer,
  },
});

export default store;
