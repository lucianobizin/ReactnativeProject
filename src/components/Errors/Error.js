// Importo componentes generales de react-native
import { StyleSheet, Text, View } from 'react-native'

// Importo el componente botón primario
import ButtonPrimary from "../Buttons/ButtonPrimary.js"

// Importo los colores y fuentes de la app
import colors from '../../utils/global/colors.js'
import fonts from '../../utils/global/fonts.js'

const Error = ({ message, textButton, onRetry }) => {

    /* -------------------   RENDERIZACIÓN DE ERRORES --------------------------------------------------------------------- */

    /* 
    
      COMPONENTES / PANTALLAS
  
      ButtonPrimary: botón para ejecutar funciones generales de la app
        - title: título que va dentro del botón
        - onPress: acción que realiza el botón al ser presionado 
        - buttonColor: color del botón
        - textColor: texto del botón
        - textFront: tipo de fuente del botón
      
    */

    return (

        <View style={styles.container}>

            <Text style={styles.errorMessage}>{message}</Text>

            <ButtonPrimary
                title={textButton}
                onPress={onRetry}
                buttonColor={colors.primary}
                textColor={colors.white}
                textFont={fonts.lobsterRegular} />

        </View>

    )

}

export default Error

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    errorMessage: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: "center"
    }
})