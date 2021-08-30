import todosReducer from './todosSlice'
import filtersReducer from './filtersSlice'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    todos: todosReducer,
    filters: filtersReducer,
  },
})

export default store
