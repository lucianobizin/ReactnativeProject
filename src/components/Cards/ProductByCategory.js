// Importo componentes de react & react-native
import { StyleSheet, Text, View, Image, Pressable, useWindowDimensions } from 'react-native';

// Importo objetos globales de estilo de la app --> fuentes y colores
import colors from '../../utils/global/colors.js';

// El componente ProductByCategory recibe item (producto de la categoría elegida por el usuario) y selectProductId (que distingue entre ProductsByCategory y ProductDetail) 
const ProductByCategory = ({ item, navigation }) => {


    /* -------------------   ADMINISTRACIÓN DE DIMENSIONES DE PANTALLA   ----------------------------------------------------- */
    // Declaro variables para trabajar con la posición horizontal y vertical del móvil: 'true': vertical; 'false': horizontal
    const { width, height } = useWindowDimensions()

    /* -------------------   RENDERIZACIÓN DE PRODUCTSBYCATEGORY ------------------------------------------------------------------------------- */

    /* 
     
      COMPONENTES / PANTALLAS
    
      Pressable: Permite seleccionar un producto (convierte la tarjeta de producto en un pressable).
      Image: Muestra la imagen de cada producto
      Header: Define el Header de la pantalla (se le debe pasar style -estilo del texto a mostrar- y title -texto a mostrar-)
      Search: Permite la búsqueda de productos por palabra clave (keyword) mediante el componente Search (se pasa el manejador de Keyword que incluye setKeyword)
      Flatlist: Lista los productos de la categoría de productos elegida y los renderiza con el compoonente ProductByCategory (tarjeta de productos) -recibe el handler de setProductId y cada producto- 
    
      LOGICA DE PANTALLAS
     
      La app se inicializa en Home pero al clickearse sobre una categoría de producto se mapean y renderizan todos los productos de esa categoria
      También se puede buscar un producto en particular (Search) mediante un filtrado de aquellos productos cuyo nombre coincide con la keyword ingresada en el search
      
    */

    return (
        <Pressable style={styles.container} onPress={() => navigation.navigate("ProductDetail", { productId: item.id })}>
            <View style={styles.imageSpan}>
                <Image style={[styles.image, { position: 'absolute' }]} source={{ uri: item.thumbnail }} resizeMode='cover' />
                <View style={styles.overlay} />
            </View>
            <View style={styles.productText}>
                <Text style={[styles.text, width > 490 ? { fontSize: 24 } : { fontSize: 16 }]}>Nombre: {item.name}</Text>
                {item.unit_price ? <Text style={[styles.text, width > 490 ? { fontSize: 24 } : { fontSize: 16 }]}>Precio Uni: {item.unit_price} €</Text> : null}
                <Text style={[styles.text, width > 490 ? { fontSize: 24 } : { fontSize: 16 }]}>Precio {item.reference_format}: {item.reference_price} €</Text>
            </View>
        </Pressable>
    );
}

export default ProductByCategory;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        width: '85%',
        padding: 10,
        marginTop: "5%",
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        left: 20,
        // Sombras para Android
        elevation: 10,
        // Sombras para iOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    productText: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        width: '100%',
        fontSize: 16,
    },
    imageSpan: {
        width: 90,
        height: 90,
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
    }
});