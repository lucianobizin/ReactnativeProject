import { StyleSheet, Text, View } from 'react-native'

const Header = ({title="Frutizia", HeaderStyle}) => {
  return (
    <View style={[HeaderStyle, styles.container]}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: 80,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 24
    }

})