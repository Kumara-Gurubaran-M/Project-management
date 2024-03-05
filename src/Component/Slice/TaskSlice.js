import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    taskList: [],
    selectedTask: {},
    isLoading: false,
    error: ''
}
const BASE_URL = 'http://localhost:8000/tasks'
//createAsyncThunk
//npx json-server --watch "C:\Users\gurub\Documents\REACT\REDUX FOLDER\redux\src\server\db.json" --port 8000
//GET
export const getTaskFromServer = createAsyncThunk(
    "tasks/getTaskFromServer",
    async (_, { rejectWithValue }) => {
        const response = await fetch('http://localhost:8000/tasks')
        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        }
        else {
            return rejectWithValue({ error: 'No task Found' })
        }

    }
)
//POST
export const addTaskToServer = createAsyncThunk(
    "tasks/addTaskToServer",
    async (task, { rejectWithValue }) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(task),
            header: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        const response = await fetch(BASE_URL, options)
        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        }
        else {
            return rejectWithValue({ error: 'Task not added' })
        }

    }
)
//PATCH
export const updateTaskInServer = createAsyncThunk(
    "tasks/updateTaskInServer",
    async (task, { rejectWithValue }) => {
        const options = {
            method: 'PATCH',
            body: JSON.stringify(task),
            header: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        const response = await fetch(BASE_URL + '/' + task.id, options)
        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        }
        else {
            return rejectWithValue({ error: 'Task not update' })
        }

    }
)
//DELETE
export const deleteTaskFromServer = createAsyncThunk(
    "tasks/deleteTaskFromServer",
    async (task, { rejectWithValue }) => {
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(BASE_URL + '/' + task.id, options)
        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        }
        else {
            return rejectWithValue({ error: 'Task not deleted' })
        }

    }
)
const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        addToList: (state, action) => {
            const id = Math.random() * 100;
            let task = { ...action.payload, id }
            state.taskList.push(task)
        },
        removeFromList: (state, action) => {
            state.taskList = state.taskList.filter((task) => task.id !== action.payload.id)
        },
        updateInList: (state, action) => {
            state.taskList = state.taskList.map((task) => task.id === action.payload.id ? action.payload : task)
        },
        setSelectedTask: (state, action) => {
            state.selectedTask = action.payload
        }
    },
    //for AsyncThunk
    extraReducers: (builder) => {
        builder
            .addCase(getTaskFromServer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTaskFromServer.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = ''
                state.taskList = action.payload
            })
            .addCase(getTaskFromServer.rejected, (state, action) => {
                state.error = action.payload.error
                state.isLoading = false
                state.taskList = []
            })
            .addCase(addTaskToServer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addTaskToServer.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = ''
                state.taskList.push(action.payload)
            })
            .addCase(addTaskToServer.rejected, (state, action) => {
                state.error = action.payload.error
                state.isLoading = false
            })
            .addCase(updateTaskInServer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateTaskInServer.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = ''
                state.taskList = state.taskList.map((task) => task.id === action.payload.id ? action.payload : task)
            })
            .addCase(updateTaskInServer.rejected, (state, action) => {
                state.error = action.payload.error
                state.isLoading = false
            })
            .addCase(deleteTaskFromServer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteTaskFromServer.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = ''
            })
            .addCase(deleteTaskFromServer.rejected, (state, action) => {
                state.error = action.payload.error
                state.isLoading = false
            })
    }
})
export const { addToList, removeFromList, updateInList, setSelectedTask } = taskSlice.actions
export default taskSlice.reducer