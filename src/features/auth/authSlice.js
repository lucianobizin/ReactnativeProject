// Importo la clase que permite instanciar una porción del store
import { createSlice } from '@reduxjs/toolkit'

// Defino el estado inicial del usuario (email=vacíos y idToken=0) -> Esto servirá para autenticación / navegación mediante JWT
const initialState = {
    email: "",
    idToken: "",
    localId: "",
}

// La porción del store de la app en la que voy a almacenar el estado de mi usuario se llama "auth"
// El estado inicial del usuario es initialState: initialState
// En reducers se definen las acciones que se despacharán para que los estos actualicen el estado de mi carrito y que realizará el reducer de authSlice 
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, actions) => {
            state.email = actions.payload.email
            state.idToken = actions.payload.idToken
            state.localId = actions.payload.localId},
        clearUser: (state) => state = {email: "", idToken: "", localId: ""}
    }
})

// Exporto y agrego setUser y clearUser como acciones posibles de la porción del estado de la app "authSlice"
export const {setUser, clearUser} = authSlice.actions

// Exporto el reducer de authSlice para que se pueda asignar a store.js como tal
export default authSlice.reducer