// Importo componentes de react & react-native
import { StyleSheet, Text, View } from 'react-native'

// Importo componente para íconos (mediante api)
import { Feather } from "@expo/vector-icons"

// Import archivos de estilo de colores y fuentes 
import colors from '../../utils/global/colors.js'

const OrderItem = ({ total, createdAt, item }) => {

    /* -------------------   RENDERIZACIÓN DE TARJETAS DE ORDENES DE COMPRA --------------------------------------------------------------------- */

    /* 
     
      COMPONENTES / PANTALLAS
   
      Feather: Visualiza mediante una api un ícono de búsqueda
   
      LOGICA DE PANTALLAS
   
      Genera las tarjetas de las distintas órdenes de compra 
   
    */

    return (

        <View style={styles.card}>

            <View style={styles.textContainer}>
                <Text style={styles.text}> Creado: {new Date(createdAt * 1000).toLocaleString()}</Text>
                <Text style={styles.text2}> Total: $ {total}</Text>
            </View>

            <Feather name="search" size={30} color="black" />

        </View>

    )

}

export default OrderItem

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderColor: colors.white,
        padding: 20,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        height: 100,
        alignItems: "center"
    },
    textContainer: {
        width: "70%"
    },
    text: {
        color: colors.secondary
    },
    text2: {
        color: colors.secondary
    }
})