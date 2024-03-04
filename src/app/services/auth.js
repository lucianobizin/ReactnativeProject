// Importo los componentes de redux query que permiten crear la api (= handler de fetchs más pro) y hacer los fetchs
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi =  createApi({

    // Especifica el nombre del slice del store de la app donde se almacenarán los reducers generados por la "api" (handler de fetchs) 
    // Los reducers son funciones puras que especifican cómo cambia el estado de una aplicación en respuesta a una acción -> arg (state, actions) y return -> nuevo estado
    reducerPath: "authApi",

    // Configuro la URL base a la que se dirigirán las consultas (ej. Firebase Realtime Database)
    baseQuery: fetchBaseQuery({baseUrl:"https://identitytoolkit.googleapis.com/v1/"}),

    // Defino los endpoints para realizar consultas
    endpoints: (builder) => ({

        register: builder.mutation({
            query: (user) => ({
                url: "accounts:signUp?key=AIzaSyDzvu9GMSEXVlYkSpEx_cl8z9s3vS3RYCY",
                method: "POST",
                body: user
            })
        }), 
        login: builder.mutation({
            query: (user) => ({
                url: "accounts:signInWithPassword?key=AIzaSyDzvu9GMSEXVlYkSpEx_cl8z9s3vS3RYCY",
                method: "POST",
                body: user
            })
        })
    })
})

// Exporto las funciones (--Mutation por ser métodos post) que ejecutan los endpoints que pertenencen al objeto authApi
export const {useRegisterMutation, useLoginMutation} = authApi