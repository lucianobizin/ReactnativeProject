// Importo componentes de react & react-native
import { Pressable, StyleSheet, Text } from 'react-native'

// Importo el componente que genera sombras ShadowPrimary (aplicado a las tarjetas de categorías de productos)
import ShadowPrimary from '../Wrappers/ShadowPrimary.js'

// Importo objetos globales de estilo de la app --> fuentes y colores 
import fonts from '../../utils/global/fonts.js'

// El componente CardCategory recibe item (nombre de categoría), cardContainer (estilo), selectedCategoryState (handler que modifica el estado de categorySelected -setCategorySelected-)
const CardCategory = ({ item, cardContainer, navigation }) => {

  /* -------------------   RENDERIZACIÓN DE HOME --------------------------------------------------------------------------- */

  /* 
  
    COMPONENTES / PANTALLAS

    Pressable: Convierte en botón su contenido
    ShadowPrimary: Genera tarjetas con sombras (recibe style para cardContainer desde el contructor (cardContainer))

    LOGICA DE PANTALLAS

    La app se inicializa en Home y muestra las tarjetas que son pulsables (Pressable)
    Cada tarjeta se muestra con su sombra (ShadowPrimary) y texto (item=nombre de categoría)

  */

    return (
        
        // Todo lo que escriba dentro de ShadowPrimary este componente lo recibe como "children"
        <Pressable onPress={() => navigation.navigate("ProductsByCategory", {categorySelected: item})}>
            <ShadowPrimary style={[cardContainer, styles.container]}>
                <Text style={styles.text}>{item}</Text>
            </ShadowPrimary>
        </Pressable>
    )
}

export default CardCategory

/* -------------------   DEFINICIÓN DE ESTILOS DE LAS CARDCATEGORIES  ------------------------------------------------------ */
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        justifyContent: "space-around",
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15
    },
    text: {
        fontSize: 16,
        fontFamily: fonts.joseginSansBold,
        textAlign: "center"
    }
})