// Importo componentes de react & react-native
import { StyleSheet, Text, View } from 'react-native'

// Importo componentes de react navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Importo el componente de las órdenes de compra
import Orders from '../components/Orders.js'
import Header from '../components/Header.js'

// Importo los archivos de fuentes y colores
import colors from '../utils/global/colors.js'
import fonts from '../utils/global/fonts.js'

const Stack = createNativeStackNavigator();

const OrdersStack = () => {

  /* -------------------   RENDERIZACIÓN DE PANTALLAS DE ORDENES --------------------------------------------------------------------- */

  /* 
  
    COMPONENTES / PANTALLAS
 
    Stack.Navigator: Renderiza el stack de pantallas de órdenes de compra
    Stack.Screen: Define el contenido de cada pantalla del stack de órdenes de compra
 
    LOGICA DE PANTALLAS
 
    En el stack de pantallas de órdenes de compra se puede visualizar las órdenes de compra de los usuarios
 
  */


  return (
    <Stack.Navigator
      initialRouteName='Orders'
      screenOptions={({ navigation }) => {
        return {
          header: () => {
            return <Header title="Ordenes" style={[styles.HeaderProdByCatTitle, styles.HeaderProdByCatText]} navigation={navigation} />
          }
        }
      }}>
      <Stack.Screen name="Orders" component={Orders} />
    </Stack.Navigator>
  )
}

export default OrdersStack

const styles = StyleSheet.create({

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