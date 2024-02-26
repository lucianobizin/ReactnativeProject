// Importo componentes de react & react-native
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'

// Importo la función de redux que permite despachar acciones para actualizar estados
import { useDispatch } from 'react-redux'

// Importo la acción que se despachará para actualizar el estado del carrito (navigation -> CartStack.js)
import { deleteCartItem } from '../features/cart/cartSlice.js'

// Importo componentes visuales de librerías externas
import { Entypo } from "@expo/vector-icons"

// Importo el archivo de colores de estilo
import colors from '../utils/global/colors.js'

const CartItem = ({ item }) => {

    // Instancio el despachante
    const dispatch = useDispatch() 

    /* -------------------   RENDERIZACIÓN DE PANTALLA DEL CARRO  --------------------------------------------------------------------- */

    /* 
    
      COMPONENTES / PANTALLAS

      Image: Muestra la imagen de cada producto del carro
       
      LOGICA DE PANTALLAS
  
      Recibe cada producto que se encuentran en el carro (por ahora cart.json) y lo dispone en una tarjeta
  
    */

    return (

        <View style={styles.card}>

            <View style={styles.imageSpan}>
                <Image style={[styles.image, { position: 'absolute' }]} source={{ uri: item.thumbnail }} resizeMode='cover' />
                <View style={styles.overlay} />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text2}>Cantidad: {item.quantity} {item.size_format}</Text>
                <Text style={styles.text2}>Precio por {item.size_format}: {item.reference_price} €</Text>
                <Text style={styles.text2}>Subtotal: {item.reference_price * item.quantity} €</Text>
            </View>
            
            <Pressable onPress={ () => dispatch(deleteCartItem(item.id))}>
                <Entypo name="trash" size={30} color={colors.secondary} />
            </Pressable>

        </View>

    )

}

export default CartItem

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        padding: 20,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors.white,
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
    imageSpan: {
        width: 75,
        height: 75,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 5,
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
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(234, 167, 173, 0.15)'
    },
    textContainer: {
        widht: "70%"
    },
    text: {
        color: colors.black,
        alignItems: "flex-start"
    },
    text2: {
        color: colors.secondary,
        alignItems: "flex-start"
    }
})