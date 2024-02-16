// Importo componentes de react & react-native
import { StyleSheet, View } from 'react-native'

// Importo objetos globales de estilo de la app --> fuentes y colores 
import colors from '../utils/global/colors.js'
import fonts from '../utils/global/fonts.js'

// Importo los componentes de las pantalla Home: Header y Categories (adminitra la lista de categorías)
import HeaderHome from '../components/HeaderHome.js'
import Categories from '../components/Categories.js'

// El componente Home recibe selectedCategoryState (handler que modifica el estado de categorySelected -setCategorySelected-)
const Home = ({selectedCategoryState}) => {

  /* -------------------   RENDERIZACIÓN DE HOME --------------------------------------------------------------------------- */

  /* 
  
    COMPONENTES / PANTALLAS

    Header: Administra el header de la pantalla
    Categories: Administra las categorías de productos en Home

    LOGICA DE PANTALLAS

    La app se inicializa en Home con el Header definido
    Se muestra las categorías de productos que retorna el componente Categories (se debe pasar la función handler de categorySelected/setCategorySelected y los estilos del header)

  */

    return (
        <View style={styles.container}>
            <HeaderHome title={'FRUTIZIA'} headerProductsByCategoryStyle={[styles.header, styles.text]} />
            <Categories
            selectedCategoryState={selectedCategoryState}/>

        </View>
    )
}

export default Home

/* -------------------   DEFINICIÓN DE CATEGORÍAS DE PRODUCTOS DE LA PANTALLA HOME  ----------------------------------------- */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    header: {
        backgroundColor: colors.primary,
        borderTopColor: "white",
        borderBottomColor: "white",
        borderTopWidth: 5,
        borderBottomWidth: 5,
        height: 80,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5
      },
      text: {
        fontFamily: fonts.joseginSansBold,
        fontSize: 24
      }
})