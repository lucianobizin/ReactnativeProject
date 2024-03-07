// Importo componentes de react & react-native
import { StyleSheet, Text, View } from 'react-native'

// Import componentes visuales de librerías externas
import { Entypo } from "@expo/vector-icons"

// Importo el archivo de colores
import colors from '../utils/global/colors.js'


const TabBarIcon = ({ icon, focused, text }) => {

    /* -------------------   RENDERIZACIÓN DE PANTALLAS  --------------------------------------------------------------------- */

    /* 
    
      COMPONENTES / PANTALLAS
  
      Entypo: Conecta con api de íconos
        
      LOGICA DE PANTALLAS
  
      Por cada pantalla tab existe un icono (Entypo) y su respectivo texto debajo
  
    */

    return (
        <View style={styles.container}>
            <Entypo name={icon} size={25} color={focused ? colors.white : colors.black} />
            <Text style={[styles.textFocused, !focused && styles.textNotFocused]}>{text}</Text>
        </View>
    )
}

export default TabBarIcon

const styles = StyleSheet.create({

    container: {
        backgroundColor: colors.secondary,
        alignItems: "center"
    },
    textFocused: {
        color: "white",
        textAlign: "center",
        fontSize: 15
    },
    textNotFocused: {
        color: colors.black,
        textAlign: "center",
        fontSize: 15
    }
})