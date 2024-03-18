// Importo los hooks useState y useEffect de react
import { useState, useEffect } from 'react'

// Importo componentes principales de react-native
import { StyleSheet, SafeAreaView, useWindowDimensions } from "react-native"

// Importo componentes de react navigation
import { NavigationContainer } from '@react-navigation/native'

// Importo useSelector y useDispatch de Redux para traer la variable global de un slice del store y traer el estado de user
import { useDispatch, useSelector } from 'react-redux'

// Importo setUser que me permite setear el estado del usuario
import { clearUser, setUser } from '../features/auth/authSlice.js'

// Importo el comoponente de navegación TabNavigator (ShopStack, CartStack, OrdersStack) y de autenticación AuthStack (ver -> Register & Login)
import TabNavigator from './TabNavigator.js'
import AuthStack from './AuthStack.js'

// Importo la función de SQLite que trae la db
import { fetchSession } from '../utils/db/index.js'

const MainNavigation = () => {

    // Instancio el despachante de funciones de seteo de estados generales de la app
    const dispatch = useDispatch()

    // Traigo de la db el usuario en caso de existir
    useEffect(() => {

        (async () => {

            const session = await fetchSession()

            if (session.rows.length) {

                // Valido que el usuario no haya tenido la sesión abierta más de 1 hora sino la cierro y debe volverse a loguear
                const now = Math.floor(Date.now() / 1000)
                const updateAt = session.rows._array[0].updateAt
                const sessionTime = now - updateAt

                if (sessionTime < 3600) {
                    const user = session.rows._array[0]
                    dispatch(setUser(user))
                } else {
                    dispatch(clearUser())
                }

            }

        })()

    }, [])

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

    return (
        <SafeAreaView style={{ flex: 1, zIndex: 6 }}>
            <NavigationContainer>
                {user.idToken ? <TabNavigator portrait={portrait} /> : <AuthStack />}
            </NavigationContainer>
        </SafeAreaView>
    )
}

export default MainNavigation

/* -------------------   DEFINICIÓN DE ESTILOS GENERALES   ---------------------------------------------- */
const styles = StyleSheet.create({})