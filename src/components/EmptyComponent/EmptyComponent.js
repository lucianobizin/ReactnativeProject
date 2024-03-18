// Importo componentes generales de react-native
import { StyleSheet, Text, View } from 'react-native'

const EmptyComponent = ({ message }) => {

    /* -------------------   RENDERIZACIÓN DE COMPONENTE VACÍO --------------------------------------------------------------------- */

    /* 
    
      COMPONENTES / PANTALLAS
  
      Texto central que renderiza un mensaje dado por el desarrollador
      
    */
    return (
        <View style={styles.container}>
            <Text style={styles.errorMessage}>{message}</Text>
        </View>
    )
}

export default EmptyComponent

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