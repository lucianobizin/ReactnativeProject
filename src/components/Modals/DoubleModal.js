// Importo componentes generales de react-native
import { StyleSheet, Text, View, Modal } from 'react-native'

// Importo el componente botón primario
import ButtonPrimary from "../Buttons/ButtonPrimary.js"

// Importo los archivos de estilo de fuentes y colores de la app
import colors from '../../utils/global/colors.js'
import fonts from '../../utils/global/fonts.js'

const DoubleModal = ({ text, textButtonAccept, onCloseAccept, textButtonCancel, onCloseCancel, modalVisible }) => {

    return (

        /* -------------------   RENDERIZACIÓN DE MODALES  ---------------------------------------------------------------------------------- */

        /* 
         
          COMPONENTES / PANTALLAS
        
          Modal: plantilla de modal
          ButtonPrimary: Botón del modal
          
        */

        <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={onCloseCancel}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.text}>{text}</Text>
                    <View style={styles.buttonContent}>
                        <ButtonPrimary
                            textButton={textButtonAccept}
                            onPress={onCloseAccept}
                            buttonColor={colors.white}
                            textColor={colors.black}
                            textFont={fonts.joseginSansBold}
                        />
                        <ButtonPrimary
                            textButton={textButtonCancel}
                            onPress={onCloseCancel}
                            buttonColor={colors.white}
                            textColor={colors.black}
                            textFont={fonts.joseginSansBold}
                        />
                    </View>
                </View>
            </View>
        </Modal>

    )

}

export default DoubleModal

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(0,0,0,0.8)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    content: {
        width: "75%",
        height: "35%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
        padding: 45,
        gap: 35,
        borderRadius: 25,
        // Sombras para Android
        elevation: 8,
        // Sombras para iOS
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonContent: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 30
    },
    text: {
        fontSize: 18,
        color: colors.black,
        fontFamily: fonts.joseginSansBold,
        textAlign: "center",
        lineHeight: 24
    }
})