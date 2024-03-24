import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../../utils/global/colors'

const OrderDetail = ({ item }) => {

    return (
        <>

            <View style={styles.container}>

                <View style={styles.imageSpan}>
                    <Image style={styles.image} source={{ uri: item.thumbnail }} resizeMode='cover' />
                    <View style={styles.overlay} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.textName}>{item.name}</Text>
                    <Text style={styles.text2}>Cantidad: {item.quantity} {item.size_format}</Text>
                    <Text style={styles.text2}>Precio por {item.size_format}: {item.reference_price} €</Text>
                    <Text style={styles.text2}>Subtotal: {(item.reference_price * item.quantity).toFixed(2)} €</Text>
                </View>

            </View>

        </>
    )
}

export default OrderDetail

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        position: "relative",
        backgroundColor: colors.white,
        padding: 20,
        marginVertical: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors.white,
        flexDirection: "row",
        justifyContent: "space-between",
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
    imageSpan: {
        width: 75,
        height: 65,
        marginRight: 5,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 5,
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
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(234, 167, 173, 0.15)'
    },
    textContainer: {
        widht: "70%"
    },
    textName: {
        color: colors.black,
        alignItems: "flex-start"
    },
    text2: {
        color: colors.secondary,
        alignItems: "flex-start"
    }
})