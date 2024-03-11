import { StyleSheet, Text, View, Pressable } from 'react-native'
import colors from '../../utils/global/colors.js'

const AddButton = ({ title, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

export default AddButton

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: 225,
    paddingVertical: 8,
    marginTop: 20,
    borderRadius: 25,
    borderColor: colors.primary,
    borderWidth: 2,
    // Sombras para Android
    elevation: 8,
    // Sombras para iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  text: {
    color: colors.black,
    textAlign: "center",
    fontSize: 16
  }
})