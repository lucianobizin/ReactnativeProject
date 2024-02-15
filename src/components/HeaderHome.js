// Importo componentes de react & react-native
import { Text, View, StyleSheet } from 'react-native'

import colors from '../utils/global/colors.js'
import fonts from '../utils/global/fonts.js'

// El componente Header recibe title (texto a renderizar) y HeaderStyle([0]=container, [1]=texto)
const HeaderHome = ({title="Frutizia"}) => {

  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

export default HeaderHome

const styles = StyleSheet.create({

header: {
  backgroundColor: colors.primary,
  borderTopColor: "white",
  borderBottomColor: "white",
  borderTopWidth: 5,
  borderBottomWidth: 5,
  height: 80,
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  marginVertical: 5
},
text: {
  fontFamily: fonts.joseginSansBold,
  fontSize: 24
}
})