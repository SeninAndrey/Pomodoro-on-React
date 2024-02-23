import {createSlice} from '@reduxjs/toolkit';
import { ITasksListItem } from '../MainPage/TasksList/TasksList';

interface ITaskListSlice {
    list: ITasksListItem[]
}

const initialState: ITaskListSlice = {
    list: []
}

const tasksListSlice = createSlice({
    name: 'tasksList',
    initialState,
    reducers: {
        addNewTask: (state, action) => {
            state.list.push({
                taskId: new Date().toISOString(),
                taskTomato: 1,
                taskText: action.payload.text,
                taskEditable: false,
                taskDone: false
            });
        },
        increaseTomato: (state, action) => {
            const currentTask = state.list.find(task => task.taskId === action.payload.currentId);
            if (currentTask) {
                currentTask.taskTomato = currentTask.taskTomato + 1;
            }
        },
        decreaseTomato: (state, action) => {
            const currentTask = state.list.find(task => task.taskId === action.payload.currentId);
            if (currentTask && currentTask.taskTomato > 1) {
                currentTask.taskTomato = currentTask.taskTomato - 1;
            }
        },
        setTaskEditable: (state, action) => {
            state.list.forEach(task => {
                if (task.taskId !== action.payload.currentId) 
                    task.taskEditable = false
            });
            const currentTask = state.list.find(task => task.taskId === action.payload.currentId);
            if (currentTask) {
                currentTask.taskEditable = !currentTask.taskEditable;
            }
        },
        setTaskText: (state, action) => {
            const currentTask = state.list.find(task => task.taskEditable === true);
            if (currentTask) {
                currentTask.taskText = action.payload;
            }
        },
        markTaskDone: (state, action) => {
            const currentTask = state.list.find(task => task.taskId === action.payload);
            if (currentTask) {
                currentTask.taskDone = true;
            }
        },
        deleteTask: (state, action) => {
            state.list = state.list.filter(task => task.taskId !== action.payload.currentId);
        } 
    }
});

export const {addNewTask, deleteTask, increaseTomato, decreaseTomato, setTaskEditable, setTaskText, markTaskDone} = tasksListSlice.actions;

export default tasksListSlice.reducer;