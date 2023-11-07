import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
    id: number;
    description: string;
    completed: boolean;
}

interface TaskState {
    tasks: Task[];
}

const initialState: TaskState = {
    tasks: [],
};

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<string>) => {
            const newTask: Task = {
                id: new Date().getTime(),
                description: action.payload,
                completed: false,
            };
            state.tasks.push(newTask);
        },
        toggleTask: (state, action: PayloadAction<number>) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload);
            if (index !== -1) {
                state.tasks[index].completed = !state.tasks[index].completed;
            }
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload);
            if (index !== -1) {
                state.tasks.splice(index, 1);
            }
        },
    },
});

export const { addTask, toggleTask, deleteTask } = taskSlice.actions;

export const selectTasks = (state: any) => state.tasks.tasks;

export default taskSlice.reducer;
