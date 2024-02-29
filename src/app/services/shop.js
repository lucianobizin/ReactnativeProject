// Importo los componentes de redux query que permiten crear la api y hacer los fetchs
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Creo la api --> shop api
export const shopApi = createApi({

    // Reduzco el estado de los datos trayendo solo lo necesario para 'shopApi'
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
            query: (name) => `/products_market.json?orderBy="category"&equalTo="${name}"`,

            // Transformo la respuesta en un array y la retorno
            transformResponse: (response) => {
                const data = Object.values(response); 
                return data;
            }
        }),

        // Defino el endpoint que trae un producto específico (view -> ProductDetail)
        getProductById: builder.query({
            query: (id) => `/products_market/${id}.json`
        })

    })

})

// Exporto las funciones (--query por ser gets) que ejecutan los endpoints que pertenencen al objeto shopApi
export const { useGetCategoriesQuery, useGetProductByCategoryQuery, useGetProductByIdQuery} = shopApi