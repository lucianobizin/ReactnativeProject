// Importo componentes de react & react-native
import { StyleSheet, View } from 'react-native'


// El componente ShadowPrimary recibe style (que se suma al propio) y children (todo lo que está dentro del componente ShadowPrimary)
const ShadowPrimary = ({ style, children }) => {

  /* -------------------   RENDERIZACIÓN DE HOME --------------------------------------------------------------------------- */

  /* 
  
    COMPONENTES / PANTALLAS

    View: recibe todo lo que se encuentre como child/hijo dentro del componente ShadowPrimary (children)

  */

  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  )
}

export default ShadowPrimary

 /* -------------------   DEFINICIÓN DE CATEGORÍAS DE PRODUCTOS DE LA PANTALLA HOME  --------------------------------------- */

const styles = StyleSheet.create({
  container: {
    borderColor: "white",
    borderWidth: 5,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15
  }
})