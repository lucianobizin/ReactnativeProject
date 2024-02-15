import { StyleSheet, Text, View, Image, Pressable, useWindowDimensions } from 'react-native';
import colors from '../utils/global/colors.js';

const ProductByCategory = ({ item, selectProductId }) => {

    const { width, height } = useWindowDimensions()

    return (
        <Pressable style={styles.container} onPress={() => selectProductId(item.id)}>
            <View style={styles.imageSpan}>
                <Image style={[styles.image, { position: 'absolute' }]} source={{ uri: item.thumbnail }} resizeMode='cover' />
                <View style={styles.overlay} />
            </View>
            <View style={styles.productText}>
                <Text style={[styles.text, width > 490 ? { fontSize: 24 } : { fontSize: 16 }]}>Nombre: {item.name}</Text>
                {item.unit_price ? <Text style={[styles.text, width > 490 ? { fontSize: 24 } : { fontSize: 16 }]}>Precio Uni: {item.unit_price} €</Text> : null}
                <Text style={[styles.text, width > 490 ? { fontSize: 24 } : { fontSize: 16 }]}>Precio {item.reference_format}: {item.reference_price} €</Text>
            </View>
        </Pressable>
    );
}

export default ProductByCategory;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        width: '80%',
        marginHorizontal: '10%',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    productText: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        width: '100%',
        fontSize: 16,
    },
    imageSpan: {
        width: 90,
        height: 90,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 5,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(234, 167, 173, 0.1)', // Color primario con opacidad muy baja
    }
});