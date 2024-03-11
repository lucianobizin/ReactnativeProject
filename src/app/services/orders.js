// Importo variables de entorno
import config from '../config/config.js'

// Importo los componentes de redux query que permiten crear la api (= handler de fetchs más pro) y hacer los fetchs
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ordersApi = createApi({

    // Especifica el nombre del slice del store de la app donde se almacenarán los reducers generados por la "api" (handler de fetchs) 
    // Los reducers son funciones puras que especifican cómo cambia el estado de una aplicación en respuesta a una acción -> arg (state, actions) y return -> nuevo estado
    reducerPath: "ordersApi",

    // Defino los tags a los que estará atento mi api (= handler de fetchs más pro)
    tagTypes: ["Orders"],

    // Configuro la URL base a la que se dirigirán las consultas (ej. Firebase Realtime Database)
    baseQuery: fetchBaseQuery({ baseUrl: config.Frutizia.FRUTIZIA_BASE_URL }),

    // Defino los endpoints para realizar consultas
    endpoints: (builder) => ({
        postOrder: builder.mutation({
            query: ({localId, order}) => ({
                url: `/orders/${localId}.json`,
                method: "POST",
                body: order
            }),
            // Si se ejecuta un nuevo post => se hace un nuevo get (ver -> getOrders -> providesTags)
            invalidatesTags:["Orders"]
        }),
        getOrders: builder.query({
            query: (localId) => `/orders/${localId}.json`,
            transformResponse: (response) => {
                // Transformo un objeto en un arreglo (es un arreglo de arreglo por lo que mapeo) 
                const data = Object.entries(response).map( (item) => {
                    return {
                        id: item[0],
                        ...item[1]
                    }
                })
                return data
            },
            providesTags:["Orders"]
        })

    })
})

// Exporto las funciones (--Mutation por ser métodos post) que ejecutan los endpoints que pertenencen al objeto authApi
export const { usePostOrderMutation, useGetOrdersQuery } = ordersApi