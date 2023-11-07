import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addTask, toggleTask, deleteTask, selectTasks } from '../features/taskSlice';

const TaskList = () => {
    const [newTask, setNewTask] = useState('');
    const tasks = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();

    const handleAddTask = () => {
        dispatch(addTask(newTask));
        setNewTask('');
    };

    return (
        <div>
