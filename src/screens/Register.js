// Importo componentes de react & react-native
import { useState } from 'react'
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'

// Importo el dispatch de Redux para poder actualizar el estado de user (constante global en el store)
import { useDispatch } from 'react-redux'

// Importo la función del endpoint Register que envía los datos del formulario hacia la base de datos (ver -> auth.js)
import { useRegisterMutation } from '../app/services/auth.js'
import { useRegisterUserProfileMutation } from "../app/services/profile.js"

// Importo el reducer que modificará el estado de la porción authSlice del store
import { setUser } from '../features/auth/authSlice.js'

// Importo objetos globales de estilo de la app --> colores y fuentes
import colors from '../utils/global/colors.js'
import fonts from '../utils/global/fonts.js'

// Importo los componentes de InputForm y SubmitButton
import InputForm from '../components/Forms/InputForm.js'
import SubmitButton from '../components/Buttons/SubmitButton.js'

// Importo las funciones de SQLite que borra e inserta los datos del usuario en la db respectivamente
import { deleteSession, insertSession } from '../utils/db/index.js'

// Importo el componente de Modal
import ModalMessage from '../components/Modals/ModalMessage.js'




const Register = ({ navigation }) => {

    /* -------------------   DECLARACIÓN DE USESTATE PARA LAS SCREENS  ------------------------------------------------------------------------ */

    // Guardo los datos que ingresa el usuario que se quiere registrar (nombre, apellido, email, tel, dni, dirección, provincia, contraseña y confirmación de contraseña)
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [idNumber, setIdNumber] = useState("")
    const [address, setAddress] = useState("")
    const [province, setProvince] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [triggerRegister] = useRegisterMutation()
    const [triggerRegisterUserProfile] = useRegisterUserProfileMutation()
    const [error, setError] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    const [textMessage, setTextMessage] = useState("")

    // Defino el estado de nuevos errores antes de enviar los datos del formulario
    const [newErrors, setNewErrors] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        idNumber: "",
        address: "",
        province: "",
        password: "",
        confirmedPassword: ""
    })

    /* -------------------   DECLARACIÓN DE DISPATCH PARA REDUX  ------------------------------------------------------------------------------ */


    /* -------------------   DECLARACIÓN DE FUNCION DE VALIDACIÓN DEL FORMULARIO  ------------------------------------------------------------- */
    const dispatch = useDispatch()

    // Declaro función de validación que se dispará antes de que la app envíe los datos a la base de datos (Firebase)
    const validateFields = () => {

        // Defino un diccionario con los errores
        let newErrors = {};

        // Validaciones para el campo de nombre
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u.test(name.trim())) {
            newErrors.name = "El nombre no puede estar vacío ni contener caracteres especiales ni números";
        }

        // Validaciones para el campo de apellido
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u.test(surname.trim())) {
            newErrors.surname = "El apellido no puede estar vacío ni contener caracteres especiales ni números";
        }

        // Validaciones para el campo de correo electrónico
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            newErrors.email = "El email debe ser válido";
        }

        // Validaciones para el campo de teléfono
        if (!/^\d{10}$/.test((phone.trim()).replace(/-/g, ''))) {
            newErrors.phone = "El teléfono debe contener exactamente 10 dígitos numéricos";
        }

        // Validaciones para el campo de número de identificación
        if (!/^\d+$/.test(idNumber.trim())) {
            newErrors.idNumber = "El número de identificación debe contener solo números";
        }

        // Validaciones para el campo de dirección
        if (!/^[a-zA-Z0-9º\s,.]*[a-zA-Z][a-zA-Z0-9º\s,.]*$/.test(address.trim())) {
            newErrors.address = "La dirección no debe contener caracteres especiales ni estar vacía";
        }
        // Validaciones para el campo de provincia
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u.test(province.trim())) {
            newErrors.province = "La provincia no debe contener caracteres especiales ni estar vacía";
        }
        // Validaciones para la contraseña
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()+]).{6,}/.test(password)) {
            newErrors.password = "La contraseña debe contener al menos una mayúscula, una minúscula, un caracter especial y un número, y tener al menos 6 caracteres";
        }
        // Validación de que confirmedPassword sea igual a password
        if (password !== confirmedPassword) {
            newErrors.confirmedPassword = "Las contraseñas no coinciden";
        }

        // Retorno el diccionario con los errores
        setNewErrors(newErrors)

        return Object.keys(newErrors).length === 0;

    }

    // Declaro la función que dispara el registro del usuario con los datos del formulario
    const onSubmit = async () => {


        try {

            // Validamos los campos de los inputs (en caso de error, se pasa a InputForm como error y se visualiza un cartel en rojo debajo de la variable)
            const isValid = validateFields();
            if (!isValid) return;

            // Ejecuta la función que envía los datos del usuario que se quiere registrar a la base de datos
            // Recibe data como respuesta, la cual posee el token de autenticación que se debe actualizar en el estado de authSlice
            // phone, idNumber, address, province,

            const { data, error } = await triggerRegister({ name, surname, email, phone, idNumber, address, province, password, confirmedPassword })

            // En caso de recibir un error 400 o un error (500) de fetch
            if (error) {
                setTextMessage(error?.data?.error?.message ? error?.data?.error?.message : error?.status)
                setModalVisible(true)
            }

            // Borro cualquier registro de sesión de usuario de la db de SQLite en caso de existir
            await deleteSession()

            // Inserto los datos del usuario registrado en SQLite
            await insertSession(data)

            // Guardo el resto de los datos del usuario en la base de datos de firebase
            const { data: RegisterUserData, error: errorRegisterUserData } = await triggerRegisterUserProfile({ userData: { name, surname, email, phone, address, province }, localId: data.localId })

            if (errorRegisterUserData) {
                setModalVisible(true)
            }

            // La respuesta recibida de parte del servidor es data y actualizaremos con data.email y data.idToken el estado de authSlice
            // En caso de que la respuesta posea un idToken, MainNavigation redirija al usuario a TabNavigator (ver -> MainNavigator.js -> const user)
            if (RegisterUserData) {
                dispatch(setUser({
                    email: data.email,
                    idToken: data.idToken,
                    localId: data.localId
                }))
            }
        } catch (error) {
            setError("Error al registrar. Por favor, intenta de nuevo.") // Actualiza el estado de error
        }

    }

    // Defino handler del modal
    const handlerCloseModal = () => {
        setModalVisible(false)
    }

    /* -------------------   RENDERIZACIÓN DE REGISTER  ---------------------------------------------------------------------------------------- */

    /* 
     
      COMPONENTES / PANTALLAS
    
      Inputs: Agregar información
      Pressable: Registrarse o loguearse
    
      LOGICA DE PANTALLAS
     
      La app permite a los usuarios registrarse sino no pueden ingresar a la plataforma de venta
      En caso de que no se respeten determinados criterios preestablecidos se notificarán errores en rojo
      
    */


    return (

        <>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>

                <View style={styles.container}>

                    <Text style={styles.titleContainer}>Introduce tus datos</Text>

                    <InputForm
                        label="Nombre"
                        value={name}
                        onChangeText={(t) => setName(t)}
                        isSecure={false}
                        error={newErrors.name}
                    />

                    <InputForm
                        label="Apellido"
                        value={surname}
                        onChangeText={(t) => setSurname(t)}
                        isSecure={false}
                        error={newErrors.surname}
                    />

                    <InputForm
                        label="Email"
                        value={email}
                        onChangeText={(t) => setEmail(t)}
                        isSecure={false}
                        error={newErrors.email}
                    />

                    <InputForm
                        label="Móvil"
                        value={phone}
                        onChangeText={(t) => setPhone(t)}
                        isSecure={false}
                        error={newErrors.phone}
                    />

                    <InputForm
                        label="DNI / Pasaporte"
                        value={idNumber}
                        onChangeText={(t) => setIdNumber(t)}
                        isSecure={false}
                        error={newErrors.idNumber}
                    />

                    <InputForm
                        label="Dirección"
                        value={address}
                        onChangeText={(t) => setAddress(t)}
                        isSecure={false}
                        error={newErrors.address}
                    />

                    <InputForm
                        label="Provincia"
                        value={province}
                        onChangeText={(t) => setProvince(t)}
                        isSecure={false}
                        error={newErrors.province}
                    />

                    <InputForm
                        label="Contraseña"
                        value={password}
                        onChangeText={(t) => setPassword(t)}
                        isSecure={true}
                        error={newErrors.password}
                    />

                    <InputForm
                        label="Confirmación de contraseña"
                        value={confirmedPassword}
                        onChangeText={(t) => setConfirmedPassword(t)}
                        isSecure={true}
                        error={newErrors.confirmedPassword}
                    />

                    <View style={styles.submitButton}>
                        <SubmitButton onPress={onSubmit} title="Registrarme" />
                    </View>

                    <Text style={styles.sub}>¿Ya tienes una cuenta en Frutizia?</Text>

                    <Pressable onPress={() => navigation.navigate("Login")} >
                        <Text style={styles.subLink}>Iniciar sesion</Text>
                    </Pressable>

                </View>

                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>¡Gracias por visitarnos!</Text>
                </View>

            </ScrollView>

            <ModalMessage
                textButton={"Volver a intentarlo"}
                text={textMessage}
                modalVisible={modalVisible}
                onClose={handlerCloseModal}
            />

        </>

    )

}

export default Register

const styles = StyleSheet.create({

    scrollViewContent: {
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: "1%",
        gap: 100,
    },
    container: {
        width: "90%",
        backgroundColor: colors.white,
        gap: 5,
        borderRadius: 10,
        paddingVertical: "10%",
        paddingHorizontal: "2%",
        justifyContent: "center",
        alignItems: "center",
        top: "5%",
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
        position: "relative",
        top: "2.5%"
    },
    titleContainer: {
        fontSize: 18,
        fontFamily: fonts.LobsterRegular,
        paddingVertical: "5%",
        marginBottom: "10%",
        fontWeight: "bold"
    },
    submitButton: {
        marginVertical: "5%"
    },
    sub: {
        fontSize: 16,
        fontFamily: fonts.lobsterRegular,
    },
    subLink: {
        fontSize: 16,
        fontFamily: fonts.joseginSansBold,
        color: colors.secondary
    },
    footerContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary, // Color de fondo deseado
        width: '100%',
        alignItems: 'center',
        marginBottom: "15%",
    },
    footerText: {
        color: colors.tertiary,
        fontSize: 16,
        fontFamily: fonts.playFairDisplayRegular,
        fontWeight: "bold",

    },
    errorText: {
        fontSize: 14,
        color: colors.tertiary,
        marginBottom: 15
    }

})