// Importo componentes de react & react-native
import { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView, useWindowDimensions } from "react-native"

// Importo componentes de react navigation
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Importo objetos globales de estilo de la app --> fuentes y colores 
import fonts from '../utils/global/fonts.js'
import colors from '../utils/global/colors.js'

// Importo los componentes de las tab screens
import ShopStack from './ShopStack.js'
import CartStack from './CartStack.js'
import OrdersStack from "./OrdersStack.js"

// Importo el componente que administra los botones de la navegación tab
import TabBarIcon from '../components/TabBarIcon.js'

const Tab = createBottomTabNavigator();

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

    return (
        <SafeAreaView style={{ flex: 1, zIndex: 6 }}>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName='ShopStack'
                    screenOptions={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarStyle: styles.tabBar
                    }}
                >
                    <Tab.Screen
                        name="ShopStack"
                        component={ShopStack}
                        options={{
                            tabBarIcon: ({ focused }) => {
                                return <TabBarIcon icon="home" text="Mercado" focused={focused} />
                            }
                        }}
                        initialParams={{ portrait }} />
                    <Tab.Screen
                        name="CartStack"
                        component={CartStack}
                        options={{
                            tabBarIcon: ({ focused }) => {
                                return <TabBarIcon icon="shopping-cart" text="Carro" focused={focused} />
                            }
                        }}
                    />
                    <Tab.Screen
                        name="OrdersStack"
                        component={OrdersStack}
                        options={{
                            tabBarIcon: ({ focused }) => {
                                return <TabBarIcon icon="list" text="Ordenes" focused={focused} />
                            }
                        }}
                    />
                </Tab.Navigator>

            </NavigationContainer>
        </SafeAreaView>
    )
}

export default MainNavigation

/* -------------------   DEFINICIÓN DE ESTILOS GENERALES   ---------------------------------------------- */
const styles = StyleSheet.create({

    tabBar: {
        backgroundColor: colors.secondary,
        shadowColor: "black",
        elevation: 4,
        position: "absolute",
        bottom: 10,
        left: 10,
        right: 10,
        borderRadius: 15,
        height: 90,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
    }

})