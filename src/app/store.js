// Importo librerías para redux
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

// Importo el reductor de cart (ver -> cartSlice.js)
import cartReducer from "../features/cart/cartSlice.js"

// Importo el reductor de counter (ver -> counterSlice.js)
import counterSlice from '../features/counter/counterSlice.js'

// Import shopApi para que sea considerado por el store
import { shopApi } from './services/shop.js'

// Defino, configuro y exporto la constante store que se utiliza en el Provider de app.js
export const store = configureStore({

    reducer: {
    
        cart: cartReducer, // Agrego el reductor de cart al store con la clave 'cart'
        counter: counterSlice, // Agrego el reductor de counter al store con la clave 'counter'
        [shopApi.reducerPath]: shopApi.reducer, // Agrego el reductor de shopApi al store con la clave correspondiente
    
    },

    // Se agrega un  middleware de la api que habilita el cacheo, la invalidación y el polling y otras funciones de rtk-query
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(shopApi.middleware),

})

// Configuro los listeners para el dispatch de acciones en el store relacionadas con las solicitudes, el caché, etc.
setupListeners(store.dispatch)