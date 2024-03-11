// Importo componentes de react & react-native
import { FlatList, StyleSheet, Text, View, Pressable } from 'react-native'

// Importo el useSelector y useDispatch de redux que maneja el estado actualizado del carrito
import { useSelector, useDispatch } from 'react-redux'

// Import la función global de borrar carrito
import { deleteCart } from '../features/cart/cartSlice.js'

// Import el archivo de colores y fuentes
import colors from '../utils/global/colors.js'
import fonts from '../utils/global/fonts.js'

// Importo el componente que renderiza las tarjetas de Cart (1 por producto)
import CartItem from "../components/Cards/CartItem.js"

// Importo la función que desencadena el método POST
import { usePostOrderMutation } from '../app/services/orders.js'
import { useEffect } from 'react'

const Cart = () => {

    // Genero el dispatch para traer la función global de borrar carrito
    const dispatch = useDispatch()

    // Traigo el estado del carrito utilizando useSelector (ver -> store.js y cartSlice.js)
    const cart = useSelector( (state) => state.cart)

    // Traigo el estado de localId del usuario conectado utilizando useSelector
    const localId = useSelector( (state) => state.auth.localId)

    useEffect (() => {
        console.log(localId)
    }, [localId])
    
    // Genero el método trigger que desencadenará la llamada a la API con el método POST para ingresar una nueva orden
    const [triggerAddOrder] = usePostOrderMutation()

    // Creo la función manejadora que desencadenará triggerAddOrder
    handleAppOrders = async () => {

        // Creamos la fecha y hora de la órden
        const createdAt = new Date().toLocaleString()
        
        // Creamos la orden con la fecha actual y el carrito
        const order = {
            createdAt,
            ...cart
        }

        // Desencadeno el trigger del post de la orden
        await triggerAddOrder({localId, order})
        
        // Borro el carrito
        await dispatch(deleteCart())
    }
    

    /* -------------------   RENDERIZACIÓN DE PANTALLA DEL CARRO  --------------------------------------------------------------------- */

    /* 
    
      COMPONENTES / PANTALLAS

      FlatList: Genera la lista de productos del carro según el formato dado por el componente CartItem
       
      LOGICA DE PANTALLAS
  
      Se renderiza la pantalla del carro (Cart) a partir de las tarjetas del carro (CartItem)
  
    */

    return (

        <View style={styles.container}>

            <FlatList
                data={cart.items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CartItem item={item} />}
            />

            <View style={styles.confirmContainer}>
                <Text style={styles.confirmText}> Total: $ {cart.total.toFixed(2)}</Text>
                <Pressable style={styles.pressableButton} onPress={handleAppOrders}>
                    <Text style={styles.confirmText}>Comprar</Text>
                </Pressable>

            </View>

        </View>

    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        marginBottom: 150
    },
    confirmContainer: {
        flexDirection: "row",
        backgroundColor: colors.primary,
        padding: 25,
        justifyContent: "space-between",
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
    pressableButton:{
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 10
    },
    confirmText: {
        fontFamily: fonts.lobsterRegular,
        fontSize: 18,
        color: colors.black
    }
})