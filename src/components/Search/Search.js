// Importo el hook useState de react
import { useState } from 'react'

// Importo componentes general de react native
import { Pressable, StyleSheet, TextInput, View, Keyboard, Text } from 'react-native'

// Importo librerías externas
import { AntDesign } from "@expo/vector-icons"

// Importo objetos globales de estilo de la app --> fuentes y colores
import colors from '../../utils/global/colors.js'

// El componente Search recibe el handler del setKeyword y retorna la renderización de los productos cuyo nombre incluyan la keyword
const Search = ({ searchStyle, handlerKeyword }) => {

    /* -------------------   DECLARACIÓN DE USESTATE PARA LA SCREEN  ------------------------------------------------------- */

    // Guardo el input ingresado por el usuario
    const [input, setInput] = useState("")

    // Guardo el estado de un posible error
    const [error, setError] = useState("")

    /* -------------------   DECLARACIÓN DE FUNCIONES HANDLER (PARA RESTRINGIR ACCESO AL FUNCIONES SET)  -------------------------------------- */

    // Creo función para modificar el estado de input del search
    const handlerInput = (t) => setInput(t)

    /* -------------------   DECLARACIÓN DE FUNCIÓNES DE BÚSQUEDA ----------------------------------------------------------------------------- */
    
    // Declaro función de búsqueda (barra de búsqueda de la screen ==> ProductsByCategory)
    const search = () => {

        // Defino los caracteres que si se pasan al input y se quiere hacer la búsqueda den error
        const expression = /[\(\)@#$%^&*!]+/

        // Testeo si el input tiene alguno de los caracteres prohibidos
        if (expression.test(input)) {
            setError("Error por caracteres incorrectos")
            return
        }

        // Si no hay caracteres prohibidos, error continúa o toma el estado de ""
        setError("")

        // Actualizo el estado de keyword
        handlerKeyword(input)

        // Una vez finalizada la búsqueda, cierro el teclado automáticamente
        Keyboard.dismiss()
    }

    // Defino función que resetea la búsqueda una vez realizada actualizando los estados de keyword, input y error 
    const resetSearch = () => {
        handlerKeyword("")
        handlerInput("")
        setError("")
        Keyboard.dismiss()
    }   

    /* -------------------   RENDERIZACIÓN DE PRODUCTSBYCATEGORY ------------------------------------------------------------------------------- */

    /* 
  
    COMPONENTES / PANTALLAS

    TextInput: Permite ingresar un texto (admite ==> placeholder, style, value=input, función de actualización de input)
    Pressable: Determina que el componente que incluye dentro es "clickeable"
    AntDesign: Importa imagen de lupa para buscar y círculo con "x" para borrar búsqueda

    LOGICA DE PANTALLAS
 
    Al ingresar caracteres en el input y presionar la lupa se actualiza el valor de keyword y por lo tanto se puede hacer el filter
    En caso de caracteres prohibidos en el input, al presionar la lupa no funciona porque es un error (se muestra mensaje por consola)
    El círculo con la "x" borra el contenido de los inputs
    */

    return (
 
        <View>

            <View style={[searchStyle, styles.container]}> 
                <TextInput
                    placeholder='Buscar'
                    style={styles.input}
                    value={input}
                    onChangeText={handlerInput} />
                <Pressable style={styles.search} onPress={() => search()}>
                    <AntDesign name="search1" size={35} color={colors.secondary} />
                </Pressable>
                <Pressable style={styles.delete} onPress={resetSearch}>
                    <AntDesign name="closecircle" size={35} color={colors.secondary} />
                </Pressable>
            </View>

            {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

        </View>

    )

}

export default Search

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flexDirection: "row",
        padding: 10,
        alignItems: "center"
    },
    input: {
        width: "70%",
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        borderWidth: 1,
        paddingLeft: 20,
        paddingVertical: 5,
        borderRadius: 100,
        left: 10
    },
    search: {
        color: colors.secondary,
        transform: [{ scale: 0.75 }],
        padding: 5,
        marginLeft: 15
    },
    delete: {
        color: colors.secondary,
        transform: [{ scale: 0.75 }],
        padding: 5
    },
    errorMessage:{
        fontSize: 16,
        color: colors.tertiary,
        alignItems: "center",
        paddingHorizontal: 10
    }
})