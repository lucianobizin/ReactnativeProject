// Importo componentes de react & react-native
import { StatusBar, View, Text, ActivityIndicator, StyleSheet } from 'react-native'

// Importo componente de la library "expo-font" --> carga fuentes para la app movil
import { useFonts } from "expo-font"

// Importo objetos globales de estilo de la app --> fuentes y colores 
import { fontCollection } from "./src/utils/global/fonts.js"
import colors from './src/utils/global/colors.js'

// Importo redux y su provider
import { Provider } from 'react-redux'

// Importo el estado de la app guardado en store
import { store } from "./src/app/store.js"

// Importo los componentes de las pantallas principales de la app: Home, Productos por categoría y Detalle de producto
import MainNavigation from "./src/navigation/MainNavigation.js"



const App = () => {

  /* -------------------   CARGA DE COMPONENTES GLOBALES   ----------------------------------------------------------------- */
  // Cargo las fuentes a utilizar 
  const [fontsLoaded, error] = useFonts(fontCollection)


  /* -------------------   HANLDER PARA ERRORES Y FUNETES NO CARGADAS  ----------------------------------------------------- */
  // Manejar el error de carga de fuentes
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>Error cargando fuentes. Por favor, revisa tu conexión a internet.</Text>
      </View>
    );
  }

  // Mostrar un indicador de carga mientras se cargan las fuentes
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  /* -------------------   RENDERIZACIÓN DE PANTALLAS  --------------------------------------------------------------------- */

  /* 
  
    COMPONENTES / PANTALLAS

    StatusBar: Controla el estilo de la barra de estado
    Provider: Permite que las variables que se guardan en el store estén disponibles para toda la app
    MainNavigation: Controla la navegación

    LOGICA DE PANTALLAS

    La app se inicializa en Home (categorySelected=null, productId=null)
    Al elegirse una categoría de producto (categorySelected, productId=null) nos dirige a ProductsByCategory
    Al elegirse un producto de la categoría de producto (categorySelected, productId) nos dirige a ProductDetail

  */

  return (

    <>
      <StatusBar backgroundColor="black" />
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </>
  )
}

export default App

/* -------------------   DEFINICIÓN DE ESTILOS GENERALES Y DE PANTALLA HOME  ---------------------------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 18,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary
  },
})