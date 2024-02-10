import { FlatList, StyleSheet } from 'react-native'
import CartProductList from './CartProductList.js'

const ListContainer = ({products, onHandlerDeleteModal, onHanedlerSwitchCompletedButton}) => {
  return (
    <FlatList
    data={products}
    keyExtractor={product => product.productId}
    renderItem={({ item }) => (
        <CartProductList
        item={item}
        onHandlerDeleteModal={onHandlerDeleteModal}
        onHanedlerSwitchCompletedButton={onHanedlerSwitchCompletedButton}/>
    )}
  />

  )
}

export default ListContainer

const styles = StyleSheet.create({
  }
)