// Importo componentes de react & react-native
import { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView, useWindowDimensions } from "react-native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


// Importo los componentes de las pantallas principales de la app: Home, Productos por categoría y Detalle de producto
import Home from '../screens/Home.js'
import ProductsByCategory from "../screens/ProductsByCategory.js"
import ProductDetail from '../screens/ProductDetail.js'

// Importo los componentes de las pantallas principales de la app: Home, Productos por categoría y Detalle de producto
import Header from '../components/Header.js';

// Importo objetos globales de estilo de la app --> fuentes y colores 
import fonts from '../utils/global/fonts.js'
import colors from '../utils/global/colors.js'

const Stack = createNativeStackNavigator();

const MainNavigation = () => {

  /* -------------------   ADMINISTRACIÓN DE DIMENSIONES DE PANTALLA   ----------------------------------------------------- */
  // Declaro variables para trabajar con la posición horizontal y vertical del móvil: 'true': vertical; 'false': horizontal
  const [portrait, setPortrait] = useState(true)

  // Declaración de función de Dimensiones
  const { width, height } = useWindowDimensions()

  /* -------------------   DECLARACIÓN DE USEFFECT PARA LAS SCREENS  ------------------------------------------------------- */
  // Declaración de useEffect para definir el valor de posición vertical u horizontal (=portrait) al iniciar la app y siempre que se modifique el width y el height
  useEffect(() => {
    if (width > height) setPortrait(false)
    else setPortrait(true)
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

    return (
        <SafeAreaView style={{ flex: 1, zIndex: 6 }}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='Home'
                    screenOptions={({ route, navigation }) => {
                        return {
                            header: () => {

                                {
                                    if (route.name === "Home") {

                                        return (

                                            <View style={styles.HeaderHomeContainer}>
                                                <Header
                                                    navigation={navigation}
                                                    title={"Frutizia"}
                                                    style={[styles.HeaderHomeTitle, styles.HeaderHomeText]}
                                                />
                                            </View>)

                                    } else if (route.name === "ProductsByCategory" || route.name === "ProductDetail") {

                                        return (

                                            <View style={styles.HeaderHomeContainer}>
                                                <Header
                                                    navigation={navigation}
                                                    title={route.name === "ProductsByCategory" ? route.params.categorySelected :
                                                        route.name === "ProductDetail" ? "Detalle" : "Frutizia"}
                                                    style={route.name === "ProductsByCategory" ? [styles.HeaderProdByCatTitle, styles.HeaderProdByCatText] :
                                                        route.name === "ProductDetail" ? [styles.HeaderProdByCatTitle, styles.HeaderProdByCatText] :
                                                            [styles.HeaderProdByCatText, styles.HeaderProdByCatText]}
                                                />

                                            </View>
                                        )
                                    }
                                }

                            }

                        }

                    }}>

                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="ProductsByCategory" component={ProductsByCategory} />
                    <Stack.Screen name="ProductDetail" component={ProductDetail} initialParams={{portrait}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    )
}

export default MainNavigation

/* -------------------   DEFINICIÓN DE ESTILOS GENERALES   ---------------------------------------------- */
const styles = StyleSheet.create({
    HeaderHomeContainer: {
        flex: 1,
        backgroundColor: colors.primary
    },
    HeaderHomeTitle: {
        backgroundColor: colors.primary,
        borderTopColor: "white",
        borderBottomColor: "white",
        borderTopWidth: 5,
        borderBottomWidth: 5,
        height: 80,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    HeaderHomeText: {
        fontFamily: fonts.joseginSansBold,
        fontSize: 24
    },
    HeaderProdByCatTitle: {
        backgroundColor: colors.white,
        height: 80,
        width: "100%",
        borderTopColor: "white",
        borderBottomColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    HeaderProdByCatText: {
        fontFamily: fonts.joseginSansBold,
        fontSize: 22
    }

})