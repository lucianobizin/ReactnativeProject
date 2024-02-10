import { StyleSheet, Text, View, Button, Switch } from 'react-native'

export default function CartProductList({ item, onHandlerDeleteModal, onHanedlerSwitchCompletedButton }) {
    return (
        <View style={styles.productContainer}>
            <View style={styles.cardProduct}>
                <Text style={styles.cardText}>{item.productName}</Text>
            </View>
            <View style={styles.productDetails}>
                <Text style={styles.cardPrice}>{item.productPrice}</Text>
            </View>
            <Switch value={item.completed} onValueChange={() => onHanedlerSwitchCompletedButton(item.id)} />
            <Text>{item.completed ? "✅" : ""}</Text>
            <View style={styles.deleteButton}>
                <Button borderRadius={5} color={"#EE3344"} title={"DEL"} onPress={() => onHandlerDeleteModal(item)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    productDetails: {
        width: "25%",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: "7%" 
    },
    cardProduct: {
        width: "25%",
        flex: 1,
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardPrice: {
        fontSize: 16,
        color: '#333333',
    },
    deleteButton: {
        width: "25%",
        backgroundColor: '#EE3344',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginLeft: 5
    },
    deleteButtonLabel: {
        color: '#FFFFFF',
        fontSize: 14,
    }

})