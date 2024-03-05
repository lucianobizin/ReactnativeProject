// Importo componentes de react & react-native
import { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, useWindowDimensions } from "react-native"

// Importo componentes de react navigation
import { NavigationContainer } from '@react-navigation/native'

// Importo useSelector de Redux para traer la variable global de un slice del store
import { useSelector } from 'react-redux'

// Importo el comoponente de navegación TabNavigator (ShopStack, CartStack, OrdersStack) y de autenticación AuthStack (ver -> Register & Login)
import TabNavigator from './TabNavigator.js'
import AuthStack from './AuthStack.js'

const MainNavigation = () => {

    /* -------------------   ADMINISTRACIÓN DE DIMENSIONES DE PANTALLA   ----------------------------------------------------- */
    // Declaro variables para trabajar con la posición horizontal y vertical del móvil: 'true': vertical; 'false': horizontal
    const [portrait, setPortrait] = useState(true)

    // Declaración de función de Dimensiones
    const { width, height } = useWindowDimensions()

    // Declaración de handle para no utilizar directamente setPortrait
    const handleSetPortrait = (newSetPortraitValue) => {
        setPortrait(newSetPortraitValue)
    }

    /* -------------------   DECLARACIÓN DE USEFFECT PARA LAS SCREENS  ------------------------------------------------------- */
    // Declaración de useEffect para definir el valor de posición vertical u horizontal (=portrait) al iniciar la app y siempre que se modifique el width y el height
    useEffect(() => {
        if (width > height) handleSetPortrait(false)
        else handleSetPortrait(true)
    }, [width, height])

    /* -------------------   RENDERIZACIÓN DE PANTALLAS  --------------------------------------------------------------------- */

    /* 
    
      COMPONENTES / PANTALLAS
  
      SafeAreaView: Administra las vista para iOS
      NavigationContainer: Administrar el contenedor de navegación
      Stack.Navigator: Define las vistas en formato stack y permite pasar parámetros
      Stack.Screen: Define las rutas de navegación entre páginas
      Home: Pantalla inicial (lista de categorías de productos)
      ProductsByCategory: Pantalla con lista de productos según categoría elegida en Home
      ProductDetail: Pantalla con detalles del producto elegido en ProductsByCategory
  
      LOGICA DE PANTALLAS
  
      La app se inicializa en Home (categorySelected=null, productId=null)
      Al elegirse una categoría de producto (categorySelected, productId=null) nos dirige a ProductsByCategory
      Al elegirse un producto de la categoría de producto (categorySelected, productId) nos dirige a ProductDetail
  
    */

    // De todos los estados globales de la app (ver -> store) user almacenará el estado de la porción auth
    const user = useSelector((state) => state.auth)

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <SafeAreaView style={{ flex: 1, zIndex: 6 }}>
            <NavigationContainer>
                {user.idToken ? <TabNavigator portrait={portrait}/> : <AuthStack/>}
            </NavigationContainer>
        </SafeAreaView>
    )
}

export default MainNavigation

/* -------------------   DEFINICIÓN DE ESTILOS GENERALES   ---------------------------------------------- */
const styles = StyleSheet.create({})