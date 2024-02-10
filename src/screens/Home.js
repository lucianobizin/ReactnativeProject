import { StyleSheet, View } from 'react-native'
import Header from '../components/Header'
import Categories from '../components/Categories.js'


const Home = ({selectedCategoryState}) => {

    return (
        <View>
            <Header
                title={'FRUTIZIA'} />
            <Categories
            selectedCategoryState={selectedCategoryState}/>

        </View>
    )
}

export default Home

const styles = StyleSheet.create({})