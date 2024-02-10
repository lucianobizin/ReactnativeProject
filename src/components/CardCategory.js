import { Pressable, StyleSheet, Text } from 'react-native'
import ShadowPrimary from './wrappers/ShadowPrimary.js'
import colors from '../utils/global/colors.js'
import fonts from '../utils/global/fonts.js'

const CardCategory = ({ item, cardContainer, selectedCategoryState }) => {
    return (
        
        // Todo lo que escriba dentro de ShadowPrimary este componente lo recibe como "children"
        <Pressable onPress={() => selectedCategoryState(item)}>
            <ShadowPrimary style={[cardContainer, styles.container]}>
                <Text style={styles.text}>{item}</Text>
            </ShadowPrimary>
        </Pressable>
    )
}

export default CardCategory

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        padding: 30,
        alignItems: 'center',
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        fontFamily: fonts.joseginSansBold
    }
})