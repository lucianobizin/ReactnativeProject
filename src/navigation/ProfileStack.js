// Importo componentes de react & react-native
import { StyleSheet } from 'react-native'

// Importo componentes de react navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Importo los componentes de las pantallas principales de la app: Home, Productos por categoría y Detalle de producto
import Header from '../components/Header/Header.js'

// Importo objetos globales de estilo de la app --> fuentes y colores 
import fonts from '../utils/global/fonts.js'
import colors from '../utils/global/colors.js'

import Profile from '../screens/Profile.js'
import ImageSelector from '../screens/ImageSelector.js'

const Stack = createNativeStackNavigator();

const ProfileStack = () => {

    /* -------------------   RENDERIZACIÓN DE PANTALLA/S DEL CARRO  --------------------------------------------------------------------- */

    /* 
    
      COMPONENTES / PANTALLAS
  
      Stack.Navigator: Administra las vistas de stack del carro
      Stack.Screen: Administrar cada una de las pantallas "stackeadas"
       
      LOGICA DE PANTALLAS
  
      Se renderiza la pantalla del carro (Cart) con las tarjetas del carro (CartItem)
  
    */

    return (

        <Stack.Navigator
            initialRouteName='Profile'
            screenOptions={({ navigation }) => {
                return {
                    header: () => {
                        return <Header title='Perfil' style={[styles.HeaderProdByCatTitle, styles.HeaderProdByCatText]} navigation={navigation} />
                    }
                }
            }}>

            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ImageSelector" component={ImageSelector} />

        </Stack.Navigator>
    )
}

export default ProfileStack

const styles = StyleSheet.create({
    HeaderProdByCatTitle: {
        backgroundColor: colors.white,
        height: 80,
        width: "100%",
        borderTopColor: "white",
        borderBottomColor: "white",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        textAlign: "center"
    },
    HeaderProdByCatText: {
        fontFamily: fonts.joseginSansBold,
        fontSize: 30
    }
}) 