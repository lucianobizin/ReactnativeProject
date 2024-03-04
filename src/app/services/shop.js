// Importo los componentes de redux query que permiten crear la api y hacer los fetchs
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Creo la api --> shop api
export const shopApi = createApi({

    // Especifica el nombre del slice del store de la app donde se almacenarán los reducers generados por la "api" (handler de fetchs)
    // Los reducers son funciones puras que especifican cómo cambia el estado de una aplicación en respuesta a una acción -> arg (state, actions) y return -> nuevo estado
    reducerPath: "shopApi", 
    
    // Configuro la URL base a la que se dirigirán las consultas (ej. Firebase Realtime Database)
    baseQuery: fetchBaseQuery({baseUrl:"https://frutizia-default-rtdb.europe-west1.firebasedatabase.app"}),

    // Defino los endpoints para realizar consultas
    endpoints: (builder) => ({

        // Defino el endpoint que trae las categorías de los productos (view -> Home)
        getCategories: builder.query({
            query: () => `/categories_market.json`
        }),

        // Defino el endpoint que trae los productos por categoría (view -> ProductsByCategories)
        getProductByCategory: builder.query({
            query: () => `/products_market.json`
        }),

        // Defino el endpoint que trae un producto específico (view -> ProductDetail)
        getProductById: builder.query({
            query: (id) => `/products_market/${id}.json`
        })

    })

})

// Exporto las funciones (--query por ser gets) que ejecutan los endpoints que pertenencen al objeto shopApi
export const { useGetCategoriesQuery, useGetProductByCategoryQuery, useGetProductByIdQuery} = shopApi