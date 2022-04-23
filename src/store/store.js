import {applyMiddleware, combineReducers, createStore} from "redux";
import {moviesReducer} from "./reducers/movies";
import {todosReducer} from "./reducers/todos";
import { RickAndMortyReducer } from "./reducers/rickAndMorty";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import { shop } from "./reducers/shop";

export const store = createStore(combineReducers({
    moviesReducer,
    todosReducer,
    RickAndMortyReducer,
    shop,
}), composeWithDevTools(applyMiddleware(thunk)))