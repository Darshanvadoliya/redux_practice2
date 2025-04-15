import { createStore } from "redux";
import { todo } from "./reducers";

export const store = createStore(todo)