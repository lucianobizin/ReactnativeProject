// Importo la clase que permite instanciar una porción del store
import { createSlice } from '@reduxjs/toolkit'

// Defino el estado inicial del carrito (items=vacíos y total=0)
const initialState = {
    items: [],
    total: 0
}

// La porción del store de la app en la que voy a almacenar el estado de mi carrito se llama "cart"
// El estado inicial del estado de mi carrito es initialState = initialState
// En reducers se definen las acciones que se despacharán para que los reducers actulicen el estado de mi carrito 
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        // Acción que modificará el state del carrito agregando objetos que se le pasen como argumento (actions)

        // -- TODO: Falta agregar la funcionalidad de agregar al carrito con número definido

        addCartItem: (state, actions) => {

            // actions recibe el producto entero y se revisa el id (ver -> ProductDetail) => return: -1 (!existe) y index (existe)
            // Reviso si existe el producto en el carrito a fin de evitar repeticiones (del state invoco los items guardados)
            // Se busca el índice del producto que tenga el id pasado en actions

            const index = state.items.findIndex((item) => item.id === actions.payload.id)

            if (index === -1) {

                // Si no existe el producto en el carrito, agrego a la lista de items el objeto traido en actions.payload y genero la propiedad quantity: 1
                state.items = [...state.items, { ...actions.payload, quantity: 1 }]

            } else {

                /* Si el producto existe en el carrito, mapeo los ítems del carrito y para el producto que tiene el id igual al producto
                   que se le ha pasado en el argumento actions, retorno el mismo objeto con todas sus propiedades y reemplazo su 
                   propiedad quantity con su valor actual + 1 */

                // Para el resto de productos que se mapean si no coincide el id, entonces se devuelve tal cual está en el carrito

                // Generalmente map se utiliza para agregar productos 

                state.items = state.items.map((item) => {
                    if (item.id === actions.payload.id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }

            // Cada vez que se agrega un producto se renueva el total mediante un función reduce, empezando su estado en 0
            state.total = state.items.reduce((acc, item) => acc = acc + (item.reference_price * item.quantity), 0)
        },

        // Defino la acción que borrará un producto del carrito (queda ponerle un contador para descontar de a uno)
        deleteCartItem: (state, actions) => {
            state.items = state.items.filter((item) => item.id !== actions.payload)
            state.total = state.items.reduce((acc, item) => acc = acc + item.reference_price * item.quantity, 0)
        }
    }
})

// Exporto y agrego addCartItem como acción posible de la porción del estado de la app "cartSlice"
export const { addCartItem, deleteCartItem } = cartSlice.actions

// Exporto el reducer de cartSlice para que se pueda asignar a store.js como tal
export default cartSlice.reducer

