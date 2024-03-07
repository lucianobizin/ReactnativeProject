import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useEffect } from 'react'

// Importo la función de redux que permite despachar acciones para actualizar estados
import { useDispatch, useSelector } from 'react-redux'

// Importo la acción que se despachará para actualizar el estado del carrito (navigation -> CartStack.js)
import { addCartItem } from '../../features/cart/cartSlice.js'

// Importo las acciones que se despacharán para actualizar el contador de productos (navigation -> CartStack.js)
import { increment, decrement, updatingCount } from '../../features/counter/counterSlice.js'

// Importo objetos globales de estilo de la app --> fuentes y colores
import colors from '../../utils/global/colors.js'

const Counter = ({ product, productId }) => {

    /* -------------------   TRAIGO VARIABLE GLOBAL CART  ------------------------------------------------------------------ */
    // Traigo el estado del carrito utilizando useSelector (ver -> store.js y cartSlice.js)
    const cart = useSelector((state) => state.cart)

    // Traigo la variable count (ver -> counterSlice.js)
    const count = useSelector((state) => state.counter.value)

    /* -------------------   INSTANCIACIÓN DE DISPATCH  -------------------------------------------------------------------- */
    const dispatch = useDispatch()

    /* -------------------   DECLARACIÓN DE USEFFECT PARA LA SCREEN  ------------------------------------------------------- */
    useEffect(() => {
        const cartProduct = cart.items.find(product => String(product.id) === String(productId))
        dispatch(updatingCount(cartProduct ? cartProduct.quantity : 0))
    }, [cart.items])



    return (

        <View style={styles.counterContainer}>

            <Pressable style={styles.button} onPress={() => dispatch(decrement())}>
                <Text style={styles.symbol}>-</Text>
            </Pressable>
            <Text>{count}</Text>

            <Pressable style={styles.button} onPress={() => dispatch(increment())}>
                <Text style={styles.symbol}>+</Text>
            </Pressable>

            <Pressable style={styles.buyNow} onPress={() => {
                dispatch(addCartItem({ product: product, count: count }))
            }}
            >
                <Text style={styles.buyNowText}>Agregar</Text>
            </Pressable>

        </View>

    )
}

export default Counter

const styles = StyleSheet.create({
    counterContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
        gap: 30
    },
    button: {
        width: 40,
        height: 40,
        borderColor: colors.primary,
        backgroundColor: colors.primary,
        borderWidth: 1,
        padding: 10,
        justifyContent: "center",
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
    symbol: {
        color: colors.black
    },
    inputContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        borderWidth: 2,
        width: 40,
        height: 42,
        borderColor: colors.primary,
        alignSelf: "center",
        textAlign: "center" // Centrar el texto dentro del input
    },
    buyNow: {
        width: 75,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.tertiary,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 5,
        // Sombras para Android
        elevation: 4,
        // Sombras para iOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buyNowText: {
        color: "white"
    }
})