// Importo componentes de react & react-native
import { Text, View } from 'react-native'

// El componente Header recibe title (texto a renderizar) y HeaderStyle([0]=container, [1]=texto)
const HeaderHome = ({title="Frutizia", headerProductsByCategoryStyle}) => {

  return (
    <View style={headerProductsByCategoryStyle[0]}>
      <Text style={headerProductsByCategoryStyle[1]}>{title}</Text>
    </View>
  )
}

export default HeaderHome

