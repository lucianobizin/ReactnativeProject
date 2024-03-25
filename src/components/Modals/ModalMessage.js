// Importo componentes generales de react-native
import { StyleSheet, Text, View, Modal, FlatList, ScrollView } from 'react-native'

// Importo el componente botón primario
import ButtonPrimary from "../Buttons/ButtonPrimary.js"

// Importo el componente OrderDetail
import OrderDetail from '../Orders/OrderDetail.js'

// Importo los archivos de estilo de fuentes y colores de la app
import colors from '../../utils/global/colors.js'
import fonts from '../../utils/global/fonts.js'

const ModalMessage = ({ text, textButton, onClose, modalVisible, order }) => {

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
            onRequestClose={onClose}
        >

            <View style={styles.container}>

                <View style={order ? styles.largeContent : styles.content}>

                    <Text style={styles.text}>{text}</Text>

                    {order &&

                        <>
                            <Text style={styles.textTitle}>{order.createdAt}</Text>
                            
                            <ScrollView contentContainerStyle={styles.scrollView}>
                                {order.items && order.items.map((item, index) => (
                                    <View key={index}>
                                        <OrderDetail item={item} />
                                    </View>
                                ))}
                            </ScrollView>

                            <Text style={styles.textTitle3}>Total compra: {(order.total).toFixed(2)} €</Text>
                        </>

                    }
                    <ButtonPrimary textButton={textButton} onPress={onClose} buttonColor={colors.white} textColor={colors.black} textFont={fonts.joseginSansBold} />

                </View>

            </View>

        </Modal>

    )

}

export default ModalMessage

const styles = StyleSheet.create({

    scrollView: {
        marginVertical: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        backgroundColor: "rgba(0,0,0,0.8)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    largeContent: {
        width: "90%",
        height: "90%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
        padding: 30,
        gap: 20,
        borderRadius: 5,
    },
    content: {/*  */
        width: "70%",
        height: "30%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: colors.primary,
        padding: 30,
        gap: 20,
        borderRadius: 5
    },
    text: {
        fontSize: 24,
        color: colors.black,
        fontFamily: fonts.joseginSansBold,
        textAlign: "center"
    },
    textTitle: {
        fontSize: 18,
        color: colors.black,
        fontWeight: "bold",
        fontFamily: fonts.playFairDisplayRegular,
        textAlign: "center",
        marginVertical: 15
    },
    textTitle3: {
        fontSize: 20,
        color: colors.blue, // Cambia el color a tu preferencia
        fontFamily: fonts.playFairDisplayRegular,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 15
    }
})