import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import ButtonPrimary from './ButtonPrimary.js'

const AddProducts = ({ onHandlerProductName, productTitle, onHandlerProductPrice, productPrice, addProduct }) => {
  return (

    <View style={styles.inputsContainer}>

      <Text style={styles.addProductTitle}>ADD PRODUCTS TO LIST</Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputs}>
          <TextInput placeholder="Introduce a product" style={styles.input} onChangeText={onHandlerProductName} placeholderTextColor={"white"} value={productTitle} multiline numberOfLines={2} maxLength={25} />
          <TextInput placeholder="Introduce a price" style={styles.input} onChangeText={onHandlerProductPrice} placeholderTextColor={"white"} value={productPrice} multiline numberOfLines={2} maxLength={6} />
          <ButtonPrimary color="#22806B" title="ADD" onPress={addProduct} buttonColor="#22806B" textColor="white" />
        </View>
      </View>

    </View>
  )
}

export default AddProducts

const styles = StyleSheet.create({
  inputsContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 20,
    marginHorizontal: 15,
    backgroundColor: '#22806B',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addProductTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "white",
    paddingTop: 10
  },
  inputContainer: {
    height: 250,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    marginVertical: 20,
    marginHorizontal: 15,
    backgroundColor: '#FCAF14',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputs: {
    gap: 35
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#22806B',
  },
  addButtonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
