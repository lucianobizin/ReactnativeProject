// Importo componentes de react & react-native
import { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, StatusBar, useWindowDimensions } from 'react-native'

// Importo componente de la library "expo-font" --> carga fuentes para la app movil
import { useFonts } from "expo-font"

// Importo objetos globales de estilo de la app --> fuentes y colores 
import { fontCollection } from "./src/utils/global/fonts.js"
import colors from './src/utils/global/colors.js'

// Importo los componentes de las pantallas principales de la app: Home, Productos por categoría y Detalle de producto
import Home from './src/screens/Home.js'
import ProductsByCategory from "./src/screens/ProductsByCategory.js"
import ProductDetail from './src/screens/ProductDetail.js'


const App = () => {


  /* -------------------   CARGA DE COMPONENTES GLOBALES   ----------------------------------------------------------------- */
  // Cargo las fuentes a utilizar 
  const [fontsLoaded] = useFonts(fontCollection)
  if (!fontsLoaded) return null

  /* -------------------   ADMINISTRACIÓN DE DIMENSIONES DE PANTALLA   ----------------------------------------------------- */
  // Declaro variables para trabajar con la posición horizontal y vertical del móvil: 'true': vertical; 'false': horizontal
  const [portrait, setPortrait] = useState(true)
  const { width, height } = useWindowDimensions()

  // Declaración de useEffect para definir el valor de posición vertical u horizontal (=portrait) al iniciar la app y siempre que se modifique el width y el height
  useEffect(() => {
    if (width > height) setPortrait(false)
    else setPortrait(true)
    , [width, height]
  })


  /* -------------------   DECLARACIÓN DE USESTATE PARA LAS SCREENS  ------------------------------------------------------- */
  // Instancio un useState para la categoría de producto seleccionada por el usuario (ProductsByCategory) 
  const [categorySelected, setCategorySelected] = useState("")

  // Instancio un useState para la categoría id del producto seleccionado por el usuario (ProductDetail)
  const [productId, setProductId] = useState("")


  /* -------------------   DECLARACIÓN DE FUNCIONES HANDLER (PARA RESTRINGIR ACCESO AL FUNCIONES SET)  --------------------- */
  // Creo función para modificar el estado de categorySelected (ProductsByCategory)
  const selectedCategoryState = (category) => {
    setCategorySelected(category)
  }

  // Creo función para modificar el estado de productId (ProductDetail)
  const selectProductId = (id) => {
    setProductId(id)
  }

  /* -------------------   RENDERIZACIÓN DE PANTALLAS  --------------------------------------------------------------------- */

  /* 
  
    COMPONENTES / PANTALLAS

    StatusBar: Controla el estilo de la barra de estado
    SafeAreaView: Define para iOS un área segura de visualización (en Android no influye)
    Home: Pantalla inicial (lista de categorías de productos)
    ProductsByCategory: Pantalla con lista de productos según categoría elegida en Home
    ProductDetail: Pantalla con detalles del producto elegido en ProductsByCategory

    LOGICA DE PANTALLAS

    La app se inicializa en Home (categorySelected=null, productId=null)
    Al elegirse una categoría de producto (categorySelected, productId=null) nos dirige a ProductsByCategory
    Al elegirse un producto de la categoría de producto (categorySelected, productId) nos dirige a ProductDetail

  */

  return (

    <>
      <StatusBar backgroundColor={colors.primary} />

      <SafeAreaView style={styles.container}>

        {categorySelected ?

          productId ? 
          
          <ProductDetail portrait={portrait} productId={productId} /> : <ProductsByCategory selectProductId={selectProductId} categorySelected={categorySelected} setCategorySelected={setCategorySelected} />
          
          :
          
          <Home selectedCategoryState={selectedCategoryState} />}

      </SafeAreaView>
    </>
  )
}

export default App

/* -------------------   DEFINICIÓN DE ESTILOS GENERALES Y DE PANTALLA HOME  ---------------------------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})