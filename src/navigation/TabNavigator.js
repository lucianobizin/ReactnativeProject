import { StyleSheet } from "react-native"

// Importo componentes de react navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Importo los componentes de las tab screens
import ShopStack from './ShopStack.js'
import CartStack from './CartStack.js'
import OrdersStack from "./OrdersStack.js"
import ProfileStack from "./ProfileStack.js"

// Importo el componente que administra los botones de la navegación tab
import TabBarIcon from '../components/TabBarIcon/TabBarIcon.js'

// Importo objetos globales de estilo de la app --> colores 
import colors from '../utils/global/colors.js'

// Instancio el componente de react navigation en la constante Tab
const Tab = createBottomTabNavigator();

const TabNavigator = ({ portrait }) => {

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
            <Tab.Screen
                name="ProfileStack"
                component={ProfileStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <TabBarIcon icon="user" text="Perfil" focused={focused} />
                    }
                }}
            />

        </Tab.Navigator>

    )
}

export default TabNavigator

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