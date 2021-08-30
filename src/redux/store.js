import todosReducer from './todosSlice'
import filtersReducer from './filtersSlice'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import {
  includeMeaningOfLife,
  sayHiOnDispatch,
} from '../exampleAddons/enhancers'
import { print1, print2, print3 } from '../exampleAddons/middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

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

// using compose to put together all enhansers to a single one
const composedEnchansers = compose(sayHiOnDispatch, includeMeaningOfLife)
// applyMilleware - unique enhancer to collect all middlewares
const middleware = applyMiddleware(print1, print2, print3)

// composeWithDevTools - special version of compose from redux-devtools-extension
// which ensures that devTools chrome extension will work.
const composedEnhancer = composeWithDevTools(
  // EXAMPLE: Add whatever middleware you actually want to use here
  applyMiddleware(thunkMiddleware)
  // other store enhancers if any
)

const store = createStore(rootReducer, composedEnhancer)

export default store
