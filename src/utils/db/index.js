// Importo la librería que administra la bd
import * as SQLite from "expo-sqlite"

// Creo la base de datos (ej. name: "session.db")
const db = SQLite.openDatabase("sessionApp.db")

// Función que inicializará la base de datos cuando se lo requiera
export const init = () => {

    // Creo una promesa que según como se resuleva ejecuta una u otra función
    const promise = new Promise( (resolve, reject) => {

        db.transaction(tx => {
            // Parámetros --> "consulta", [valores que paso a la consulta], función de consulta exitosa, función de consulta rechazada
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS sessionUser (localId TEXT NOT NULL, email TEXT NOT NULL, idToken TEXT NOT NULL, updateAt INTEGER)",
                [],
                (_, result) => {resolve(result)},
                (_, result) => {reject(result)}
            )
        })

    })

    // Retorno la promesa
    return promise
}

// Función que inserta los datos del login en la base de datos --> recibe data y lo desestructura
export const insertSession = ({localId, email, idToken}) => {
    // Creo una promesa que según como se resuleva ejecuta una u otra función
    const promise = new Promise( (resolve, reject) => {

        db.transaction(tx => {
            // Parámetros --> "consulta", [valores que paso a la consulta], función de consulta exitosa, función de consulta rechazada
            // Los ?,?,? --> hacen referencia a localId, email, idToken
            tx.executeSql(
                "INSERT INTO sessionUser (localId, email, idToken, updateAt) VALUES (?,?,?, strftime('%s', 'now'))",
                [localId, email, idToken],
                (_, result) => {resolve(result)},
                (_, result) => {reject(result)}
            )
        })

    })

    // Retorno la promesa
    return promise
}

// Función que trae sesiones inicializadas
export const fetchSession = () => {
    // Creo una promesa que según como se resuleva ejecuta una u otra función
    const promise = new Promise( (resolve, reject) => {

        db.transaction(tx => {
            // Parámetros --> "consulta", [valores que paso a la consulta], función de consulta exitosa, función de consulta rechazada
            tx.executeSql(
                "SELECT * FROM sessionUser",
                [],
                (_, result) => {resolve(result)},
                (_, result) => {reject(result)}
            )
        })

    })

    // Retorno la promesa
    return promise
}

// Función que borra los datos de la bd si se cierra la sesión
export const deleteSession = () => {
    // Creo una promesa que según como se resuleva ejecuta una u otra función
    const promise = new Promise( (resolve, reject) => {

        db.transaction(tx => {
            // Parámetros --> "consulta", [valores que paso a la consulta], función de consulta exitosa, función de consulta rechazada
            tx.executeSql(
                "DELETE FROM sessionUser", // Si quisiera borrar solo un localId => ... WHERE localId = ?  
                [], // localId
                (_, result) => {resolve(result)},
                (_, result) => {reject(result)}
            )
        })

    })

    // Retorno la promesa
    return promise
}