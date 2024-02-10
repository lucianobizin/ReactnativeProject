import { StyleSheet, View, Text, Modal, Button } from 'react-native'

export default function ModalDeleteProducts({productSelected, onHandlerDeleteModal, onHandlerDeleteProduct, modalVisible}) {

  return (
    <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => onHandlerDeleteModal({})}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>¿Estás seguro que quieres borrar el producto: {productSelected.productName}?</Text>
        <View style={styles.modalButtons}>
          <Button title="SÍ" onPress={onHandlerDeleteProduct} color="#EE3344" />
          <Button title="NO" onPress={() => onHandlerDeleteModal({})} color="#00A0E0" />
        </View>
      </View>
    </View>
  </Modal>
  )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro para resaltar el modal
      },
      modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      }
})