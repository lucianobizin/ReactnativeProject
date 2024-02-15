// Importo componentes de react & react-native
import { Text, View, StyleSheet } from 'react-native'

// El componente Header recibe title (texto a renderizar) y HeaderStyle([0]=container, [1]=texto)
const HeaderProductsByCategory = ({headerProductsByCategoryStyle, title="Producto"}) => {

  return (

    <>
    <View style={headerProductsByCategoryStyle[0]}>
      <Text style={headerProductsByCategoryStyle[1]}>{title}</Text>
    </View>
    </>
  )
}

export default HeaderProductsByCategory