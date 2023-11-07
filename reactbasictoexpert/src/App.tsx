import React from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { decrement, increment, reset } from './features/counterSlice'; // Importar la acción reset

function App() {
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();

    return (
        <div>
            <button aria-label="Increment value" onClick={() => dispatch(increment())}>
                Increment
            </button>
            <span>{count}</span>
            <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                Decrement
            </button>
            <button aria-label="Reset value" onClick={() => dispatch(reset())}>
                Reset
            </button> {/* Botón para resetear el contador */}
        </div>
    );
}

export default App;
