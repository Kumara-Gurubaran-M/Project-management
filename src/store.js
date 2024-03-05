import { configureStore } from "@reduxjs/toolkit"
import taskReducer from "./Component/Slice/TaskSlice"

export const store = configureStore({
    reducer: {
        task: taskReducer
    }
})