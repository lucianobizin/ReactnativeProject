// Importo componentes de react & react-native
import { StyleSheet, Text, Pressable } from 'react-native'

// Importo objetos globales de estilo de la app --> colores y fuentes
import colors from '../utils/global/colors.js'
import fonts from '../utils/global/fonts.js'

const SubmitButton = ({ onPress, title }) => {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

export default SubmitButton

const styles = StyleSheet.create({
    button:{
        width:"60%",
        backgroundColor:colors.tertiary,
        padding:10,
        alignItems:"center",
        borderRadius:10
    },
    text:{
        textAlign:"center",
        color:"white",
        fontSize:18,
        fontFamily: fonts.lobsterRegular
    }
})