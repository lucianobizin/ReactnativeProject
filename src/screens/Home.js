// Importo componentes de react & react-native
import { View, StyleSheet } from "react-native"

// Importo los componentes de las pantalla Home: Header y Categories
import Categories from '../components/Categories/Categories.js'

// Importo las categorías desde Firebase (categories_market.json)
import { useGetCategoriesQuery } from '../app/services/shop.js'

// Importo el spinner de carga de la app
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner.js'

// Importo la pantalla de error de la app
import Error from '../components/Errors/Error.js'

// Importo el componente que se renderiza si el componente principal está vacío
import EmptyComponent from '../components/EmptyComponent/EmptyComponent.js'

// Importo objetos globales de estilo de la app --> fuentes y colores 
import colors from '../utils/global/colors.js'

// El componente Home recibe selectedCategoryState (handler que modifica el estado de categorySelected -setCategorySelected-)
const Home = ({ navigation }) => {

      // Obtengo las categorías y las guardo en una constante categories (sobreescribí el nombre data) utilizando useGetCategoriesQuery (ver -> shop.js)
      const { data: categories, isLoading, isError, isSuccess } = useGetCategoriesQuery()

      /* -------------------   VALIDACIONES LOǴICAS DE RESPUESTA   ------------------------------------------------------------- */
  
      // En caso de que se estén cargando el producto buscado
      if (isLoading) return (<LoadingSpinner />)
  
      // En caso de que se produzca una error
  
      const onRetry = () => {
          navigation.reset({
              index: 0,
              routes: [{name: "Home"}],
          })
      }
  
      if (isError) return <Error message={"Se ha producido un error"} onRetry={onRetry} textButton={"Reiniciar"} />
  
      // En caso de que la petición haya sido exitosa pero no existan categorías
      if (isSuccess && categories === null) return <EmptyComponent message={"No existen productos"}/>
  

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
      <Categories navigation={navigation} categories={categories}/>
    </View>


  )
}

export default Home

const styles = StyleSheet.create({

  container: {
      top: 80,
      marginBottom: 80,
      backgroundColor: colors.primary
  }

})