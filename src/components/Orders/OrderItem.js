// Importo componentes de react & react-native
import { StyleSheet, Text, View } from 'react-native'

// Importo componente para íconos (mediante api)
import { Feather } from "@expo/vector-icons"

// Import archivos de estilo de colores y fuentes 
import colors from '../../utils/global/colors.js'

const OrderItem = ({ order }) => {

    /* -------------------   RENDERIZACIÓN DE TARJETAS DE ORDENES DE COMPRA --------------------------------------------------------------------- */

    /* 
     
      COMPONENTES / PANTALLAS
   
      Feather: Visualiza mediante una api un ícono de búsqueda
   
      LOGICA DE PANTALLAS
   
      Genera las tarjetas de las distintas órdenes de compra 
   
    */

    const dateTime = order.createdAt.split(",")
    const data = dateTime[0]
    const time = dateTime[1]

    return (

        <View style={styles.card}>

            <View style={styles.textContainer}>
                <Text style={styles.text}> Fecha: {data}</Text>
                <Text style={styles.text}> Hora: {time}</Text>
                <Text style={styles.text2}> Total: {order.total} €</Text>
            </View>

            <Feather name="search" size={30} color="black" />

        </View>

    )

}

export default OrderItem

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderColor: colors.primary,
        padding: 20,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        height: 100,
        alignItems: "center",
        // Sombras para Android
        elevation: 8,
        // Sombras para iOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    textContainer: {
        width: "70%"
    },
    text: {
        color: colors.black
    },
    text2: {
        color: colors.black
    }
})