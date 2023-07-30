import { createStore, combineReducers } from "redux";
import { boardReducer } from "./reducers/board";
import { listReducer } from "./reducers/list";
import { taskReducer } from "./reducers/task";

const rootReducer = combineReducers({
    board: boardReducer,
    list: listReducer,
    task: taskReducer
}) 

export const store = createStore(rootReducer)