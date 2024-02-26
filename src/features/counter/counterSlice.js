// Importo la clase que permite instanciar una porción del store
import { createSlice } from '@reduxjs/toolkit'

// Defino el estado inicial del contador (value=0)
const initialState = {
    value: 0
}

// La porción del store de la app en la que voy a almacenar el estado del contador se llama "counter"
// El estado inicial del estado del contador es es initialState: initialState
// En reducers se definen las acciones que se despacharán para que los estos actualicen el estado de mi contador 
export const counterSlice = createSlice({
    name: "counter",
    initialState: initialState,
    reducers: {

        // Acción que modifica el state del contador incrementando su valor en 1
        increment: (state) => {
            state.value += 1
        },
        // Acción que modifica el state del contador disminuyendo su valor en 1
        decrement: (state) => {
            state.value -= 1
        },
        // Acción que modifica el state del contador disponiéndolo en 0
        cleaningNumber: (state) => {
            state.value = 0
        },
        // Acción que modifica el state del contador disponiéndolo en según el valor que se le pase
        updatingCount: (state, actions) => {
            state.value = actions.payload
        }
    }
})

// Exporto y agrego increment, decrement, cleaningNumber, updatingCount como acciones de la porción "contador" del store de la app
export const { increment, decrement, cleaningNumber, updatingCount } = counterSlice.actions

// Exporto el reducer de counterSlice para que se pueda asignar a store.js como tal
export default counterSlice.reducer