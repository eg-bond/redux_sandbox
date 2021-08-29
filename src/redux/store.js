import todosReducer from './todosSlice'
import filtersReducer from './filtersSlice'
import { combineReducers, compose, createStore } from 'redux'
import {
  includeMeaningOfLife,
  sayHiOnDispatch,
} from '../exampleAddons/enhancers'

// hand-made rootReduser
function rootReducerCustom(state = {}, action) {
  // always return a new object for the root state
  return {
    // the value of `state.todos` is whatever the todos reducer returns
    todos: todosReducer(state.todos, action),
    // For both reducers, we only pass in their slice of the state
    filters: filtersReducer(state.filters, action),
  }
}
//-----------------------------------------------------------------------

// rootReduser created witch combineReducers
const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  todos: todosReducer,
  filters: filtersReducer,
})

const composedEnchansers = compose(sayHiOnDispatch, includeMeaningOfLife)

const store = createStore(rootReducer, composedEnchansers)

export default store
