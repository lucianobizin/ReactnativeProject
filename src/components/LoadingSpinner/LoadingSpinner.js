// Importo componentes generales de react-native
import { StyleSheet, View, ActivityIndicator } from 'react-native'

// Importo los colores generales de la app
import colors from '../../utils/global/colors.js'

const LoadingSpinner = () => {

    /* -------------------   RENDERIZACIÓN DEL SPINNER DE CARGA --------------------------------------------------------------------- */

    /* 
    
      COMPONENTES / PANTALLAS
  
      ActivityIndicator: se activa mientras se carga lo necesario para las pantallas (tiene un fondo y un spinner central)
  
    */
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.white}  />
        </View>
    )
}

export default LoadingSpinner

const styles = StyleSheet.create({
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary
    },
})