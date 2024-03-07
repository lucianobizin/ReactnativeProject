// Importo componentes de react & react-native
import { StyleSheet, View } from 'react-native'

// Importo componentes de react navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Importo los componentes de las pantallas principales de la app: Home, Productos por categoría y Detalle de producto
import Home from '../screens/Home.js'
import ProductsByCategory from "../screens/ProductsByCategory.js"
import ProductDetail from '../screens/ProductDetail.js'

// Importo los componentes de las pantallas principales de la app: Home, Productos por categoría y Detalle de producto
import Header from '../components/Header.js';

// Importo objetos globales de estilo de la app --> fuentes y colores 
import fonts from '../utils/global/fonts.js'
import colors from '../utils/global/colors.js'

// VER QUÉ SE HACE CON PORTRAIT

const Stack = createNativeStackNavigator();

const ShopStack = ({ route }) => {

    const { portrait } = route.params

    /* -------------------   RENDERIZACIÓN DE STACK DE PANTALLAS  --------------------------------------------------------------------- */

    /* 
    
      COMPONENTES / PANTALLAS
  
      Stack.Navigator: Administra la navegación del stack de screens
      Header: componente que define el header de cada pantalla
  
      LOGICA DE PANTALLAS
  
      La app se inicializa en ShopStack
      Al elegirse una categoría de producto (categorySelected) dirige a la patanlla ProductsByCategory
      Al elegirse un producto de la pantalla ProductsByCategory dirige a la pantall ProductDetail
  
    */


    return (
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
            <Stack.Screen name="ProductDetail" component={ProductDetail} initialParams={{ portrait }} />
        </Stack.Navigator>
    )
}

export default ShopStack

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
        fontSize: 32,
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