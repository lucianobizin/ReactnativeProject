// Importo componentes de react & react-native
import { StyleSheet } from 'react-native'

// Importo componentes de react navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Importo objetos globales de estilo de la app --> colores y fuentes
import colors from '../utils/global/colors.js'
import fonts from '../utils/global/fonts.js'

// Importo el Header que se utilizará en ambas pantallas (ver -> Login y Register)
import Header from '../components/Header/Header.js'

// Importo los componentes de registro y login
import Register from '../screens/Register.js'
import Login from '../screens/Login.js'


// Instancio el componente de react navigation en la constante Tab
const Stack = createNativeStackNavigator()

const AuthStack = () => {

    /* -------------------   RENDERIZACIÓN DE PANTALLAS  --------------------------------------------------------------------- */

    /* 
    
      COMPONENTES / PANTALLAS
  
      Stack.Navigator: Define las vistas en formato stack y permite pasar parámetros
      Stack.Screen: Define las rutas de navegación entre páginas utilizando navigation.navigate("nombre de screen", {objeto por params})
      Head: Header de las pantallas de Login y Register
      Login: Pantalla para loguearse (base de datos: Firebase)
      Register: Pantalla para registrarse (base de datos: Firebase)
  
      LOGICA DE PANTALLAS
  
      El stack se inicializa en la pantalla Login y esta tiene un botón que redirige al registro.
      En caso de registrarse un nuevo usuario, si el registro fue exitoso, la app ingresa al TabNavigator (ShopStack, precisamente)
  
    */

    return (

        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={({ route, navigation }) => {
                return {
                    header: () => <Header
                        title={route.name === "Register" ? "Registro" : "Inicio de sesión"}
                        style={[styles.HeaderHomeTitle, styles.HeaderHomeText]}
                        navigation={navigation}
                    />
                }
            }
            }
        >

            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />

        </Stack.Navigator>
    )
}

export default AuthStack

const styles = StyleSheet.create({
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
        textAlign: "center",
        textAlignVertical: "center",
        paddingBottom: 10
    },
    HeaderHomeText: {
        fontFamily: fonts.joseginSansBold,
        fontSize: 26,
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
        textAlignVertical: "center",
    },
})