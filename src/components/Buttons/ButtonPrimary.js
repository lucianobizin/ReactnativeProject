// Importo los componentes generales de react-native
import { Pressable, StyleSheet, Text } from 'react-native'

const ButtonPrimary = ({ textButton, onPress, buttonColor, textColor, textFont }) => {

    /* -------------------   RENDERIZACIÓN DE BOTÓN PRIMARIO  ---------------------------------------------------------------------------- */

    /* 
     
      COMPONENTES / PANTALLAS
    
      Se coloca el styles arriba para poder trabajarlo con los hiperparámetros de ButtonPrimary
      
    */

    const styles = StyleSheet.create({
        container: {
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: buttonColor,
            borderRadius: 8,
            paddingHorizontal: 20,
            // Sombras para Android
            elevation: 8,
            // Sombras para iOS
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        },
        text: {
            color: textColor,
            fontFamily: textFont,
        }
    })

    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{textButton}</Text>
        </Pressable>
    )

}

export default ButtonPrimary

