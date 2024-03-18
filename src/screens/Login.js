// Importo componentes de react & react-native
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

// Importo el dispatch de Redux para poder actualizar el estado de user (constante global en el store)
import { useDispatch } from 'react-redux'

// Importo la función del endpoint Login que envía los datos del formulario hacia la base de datos (ver -> auth.js)
import { useLoginMutation } from '../app/services/auth.js'

// Importo el reducer que modificará el estado de la porción authSlice del store
import { setUser } from '../features/auth/authSlice.js'

// Importo objetos globales de estilo de la app --> colores y fuentes
import colors from "../utils/global/colors.js"
import fonts from '../utils/global/fonts.js'

// Importo los componentes de InputForm y SubmitButton
import InputForm from '../components/Forms/InputForm.js'
import SubmitButton from '../components/Buttons/SubmitButton.js'

// Importo el archivo con las variables de entorno
import config from '../app/config/config.js'

// Importo las funciones de SQLite que borra, trae e inserta los datos del usuario en la db respectivamente
import { deleteSession, fetchSession, insertSession } from '../utils/db/index.js'

// Importo el componente de renderización de modales
import ModalMessage from '../components/Modals/ModalMessage.js'

const Login = ({ navigation }) => {

  /* -------------------   DECLARACIÓN DE VARIABLES DE LA SCREEN  ------------------------------------------------------------------ */

  // Instancio dispatch para despachar reducers
  const dispatch = useDispatch()

  // Instanción triggerLogin para desencadenar el login
  const [triggerLogin] = useLoginMutation()

  /* -------------------   DECLARACIÓN DE USESTATE PARA LAS SCREENS  --------------------------------------------------------------- */

  // Guardo los datos que ingresa el usuario que se quiere loguear (email, password)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newErrors, setNewErrors] = useState({
    email: "",
    password: ""
  })

  const [modalVisible, setModalVisible] = useState(false)

  /* -------------------   DECLARACIÓN DE FUNCIÓN DE VALIDACIÓN  ------------------------------------------------------------------- */
  const validateFields = () => {

    // Defino un diccionario con los errores
    let newErrors = {};

    // Validaciones para el campo de correo electrónico
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "El email debe ser válido";
    }

    // Validaciones para la contraseña
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{6,}/.test(password)) {
      newErrors.password = "La contraseña debe contener al menos una mayúscula, una minúscula, un caracter especial y un número, y tener al menos 6 caracteres";
    }

    // Retorno el diccionario con los errores
    setNewErrors(newErrors)

  }

  /* -------------------   DECLARACIÓN DE FUNCIÓNES DE LOGIN  ---------------------------------------------------------------------- */
  // Declaro la función que dispara el registro del usuario con los datos del formulario
  const onSubmit = async () => {
    try {

      // validateFields()

      // Ejecuta la función que envía los datos del usuario que se quiere loguear a la base de datos
      // Recibe data como respuesta, la cual posee el token de autenticación
      const { data, error } = await triggerLogin({ email, password })

      if (error) {
        setModalVisible(true)
      }

      // Función que borra los estados de sesión en la db de SQLite
      if (data) {

        // Hago un fetch a la sessión del usuario para ver si existe
        const session = await fetchSession()

        // Borro la sesión de usuario en caso de que la sesión del usuario no esté vacía en SQLite
        if (session.rows._array[0]) {
          await deleteSession()
        }

        // Función que inserta una nueva sesión en la db de SQLite
        await insertSession(data)

        // En caso de que exista la data se despacha el setter de los datos del usuario
        dispatch(setUser({ email: data.email, idToken: data.idToken, localId: data.localId }))

      }

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

  // Defino función que detecta cambios en el email
  const onChangeTextFunction = (t) => {
    setEmail(t)
  }

  // Defino handler del modal
  const handlerCloseModal = () => {
    setModalVisible(false)
  }
  

  /* -------------------   RENDERIZACIÓN DE LOGIN  ---------------------------------------------------------------------------------- */

  /* 
   
    COMPONENTES / PANTALLAS
  
    Inputs: Agregar información
    Pressable: Loguearse o registrarse
  
    LOGICA DE PANTALLAS
   
    La app permite a los usuarios loguearse
    En caso de que no se respeten determinados criterios preestablecidos se notificarán errores en rojo
    
  */

  return (
    <>
      <View style={styles.main}>

        <View style={styles.container}>

          <Text style={styles.titleContainer}>Introduce tus datos</Text>

          <InputForm
            label="Email"
            value={email}
            onChangeText={onChangeTextFunction}
            isSecure={false}
            error={newErrors.email}
          />

          <InputForm
            label="Password"
            value={password}
            onChangeText={(t) => setPassword(t)}
            isSecure={true}
            error={newErrors.password}
          />

          <View style={styles.submitButton}>
            <SubmitButton onPress={onSubmit} title="Iniciar Sesion" />
          </View>

          <Text style={styles.sub}>¿No tienes una cuenta?</Text>

          <Pressable onPress={() => navigation.navigate("Register")} >
            <Text style={styles.subLink}>Registrarte en Frutizia</Text>
          </Pressable>

        </View>

      </View >

      <ModalMessage 
        textButton={"Volver a intentar"}
        text={"Email o contraseña inválido"}
        modalVisible={modalVisible}
        onClose={handlerCloseModal}
      />

    </>
  )
}

export default Login

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    width: "90%",
    backgroundColor: colors.white,
    gap: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "10%",
    paddingHorizontal: "10%",
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
  submitButton: {
    marginVertical: "7.5%"
  },
  titleContainer: {
    fontSize: 18,
    fontFamily: fonts.LobsterRegular,
    paddingVertical: "10%",
    fontWeight: "bold"
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.LobsterRegular
  },
  sub: {
    fontSize: 16,
    fontFamily: fonts.JosefinSansBold
  },
  subLink: {
    fontSize: 16,
    fontFamily: fonts.JosefinSansBold,
    color: colors.tertiary
  },
  error: {
    fontSize: 14,
    color: "red",
    fontFamily: fonts.JosefinSansBold,
    fontStyle: "italic",
    textAlign: "center"
  }
})