// Importo componentes de react & react-native
import { StyleSheet, Text, View, Pressable } from 'react-native'

// Importo la librería que conecta con vector-icons para traer íconos
import { AntDesign } from "@expo/vector-icons"

// Importo objetos globales de estilo de la app --> fuentes y colores 
import colors from '../../utils/global/colors'

// Importo useDispatch para actualizar el estado global de user y useSelector para recuperar estados globales (en este caso, del usuario)
import { useDispatch, useSelector } from 'react-redux'

// Importo la función que mediante el dispatch borrará los datos del usuario en el estado general de la app
import { clearUser } from '../../features/auth/authSlice'

// Importo la función de SQLite que borra la db
import { deleteSession } from '../../utils/db'

// El componente Header recibe title (texto a renderizar) y HeaderStyle([0]=container, [1]=texto)
const Header = ({ title = "Frutizia", style, navigation }) => {

  // Del estado del usuario traigo el idToken
  const idToken = useSelector(state => state.auth.idToken)

  // Instancio la variable dispatch para actualizar el estado del usuario
  const dispatch = useDispatch()

  // Creo que la función de deslogueo y que además, borra la db
  const onLogout = async () => {
    dispatch(clearUser())
    await deleteSession()
  }

  /* -------------------   HEADER COMPONENT --------------------------------------------------------------------------- */

  /* 
 
  COMPONENTES / PANTALLAS

  Pressable: Botón que permite volver a la página inicial
  Text: Muestra el título (Frutizia, categoría y detalles)

  LOGICA DE PANTALLAS

  La app se inicializa en Home con el Header definido
  Se muestra las categorías de productos que retorna el componente Categories (se debe pasar la función handler de categorySelected/setCategorySelected y los estilos del header)

*/

  return (
    <View style={[style[0], styles.container]}>
      {navigation.canGoBack() && <Pressable style={styles.goBack} onPress={() => navigation.goBack()}>
        <AntDesign name="leftcircle" size={40} color={colors.primary} />
      </Pressable>}
      <Text style={style[1]}>{title}</Text>
      {idToken && 
        <Pressable style={styles.logOutIcon} onPress={onLogout}>
          <AntDesign name="logout" size={30} color={colors.primary}/>
        </Pressable>
      }
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    // Sombras para Android
    elevation: 8,
    // Sombras para iOS
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  goBack: {
    position: "absolute",
    transform: [{ scale: 0.70 }],
    left: 20,
    top: 24
  },
  logOutIcon: {
    position: "absolute",
    transform: [{ scale: 0.85 }],
    right: 20,
    bottom: 20
  }

})