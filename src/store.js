import { configureStore } from "@reduxjs/toolkit"
import taskReducer from "./Component2/Slice/TaskSlice"

export const store = configureStore({
    reducer: {
        task: taskReducer
    }
})