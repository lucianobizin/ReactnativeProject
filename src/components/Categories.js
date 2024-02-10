import { StyleSheet, FlatList, Dimensions } from 'react-native'
import categories from "../utils/data/categories_market.json"
import CardCategory from './CardCategory'


const Categories = ({selectedCategoryState}) => {

    const categoryNames = Object.values(categories).map(category => category.name)

    return (
        <FlatList
            data={categoryNames}
            numColumns={2}
            keyExtractor={item => item}
            renderItem={({ item }) => (
                <CardCategory
                item={item}
                cardContainer={styles.cardContainer}
                selectedCategoryState={selectedCategoryState}/>
            )}
        />
    )
}

export default Categories

const styles = StyleSheet.create({
    cardContainer: {
        width: Dimensions.get('window').width / 2 - 20,
        margin: 10,
    },
}) 