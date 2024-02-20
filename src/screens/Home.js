// Importo componentes de react & react-native
import { View, StyleSheet } from "react-native"

// Importo los componentes de las pantalla Home: Header y Categories
import Categories from '../components/Categories.js'

// Importo objetos globales de estilo de la app --> fuentes y colores 
import colors from '../utils/global/colors.js'

// El componente Home recibe selectedCategoryState (handler que modifica el estado de categorySelected -setCategorySelected-)
const Home = ({ navigation }) => {

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
      <Categories navigation={navigation} />
    </View>


  )
}

export default Home

const styles = StyleSheet.create({

  container: {
      top: 80,
      backgroundColor: colors.primary
  }

})