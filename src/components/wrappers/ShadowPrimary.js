import { StyleSheet, View } from 'react-native'

const ShadowPrimary = ({style, children}) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  )
}

export default ShadowPrimary

const styles = StyleSheet.create({
    container: {
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    }
})