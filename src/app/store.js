// Importo librerías para redux
import { configureStore } from '@reduxjs/toolkit'

// Importo el reductor de cart (ver -> cartSlice.js)
import cartReducer from "../features/cart/cartSlice.js"

// Importo el reductor de counter (ver -> counterSlice.js)
import counterSlice from '../features/counter/counterSlice.js'

// Defino, configuro y exporto la constante store que se utiliza en el Provider de app.js
export const store = configureStore({

    reducer: {
    
        cart: cartReducer,
        counter: counterSlice
    
    }

})