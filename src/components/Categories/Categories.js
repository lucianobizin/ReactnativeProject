// Importo componentes de react & react-native
import { StyleSheet, FlatList, Dimensions } from 'react-native'

// Importo los componentes de las pantalla Home: Header y Categories (adminitra la lista de categorías)
import CardCategory from './CardCategory.js'

// Importo las categorías desde Firebase (categories_market.json)
import { useGetCategoriesQuery } from '../../app/services/shop.js'

// Importo objetos globales de estilo de la app --> colores 
import colors from '../../utils/global/colors.js'

// Importo el spinner de carga de la app
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.js'

// Importo la pantalla de error de la app
import Error from '../Errors/Error.js'

// Importo el componente que se renderiza si el componente principal está vacío
import EmptyComponent from '../EmptyComponent/EmptyComponent.js'

// El componente Categories recibe selectedCategoryState (handler que modifica el estado de categorySelected -setCategorySelected-)
const Categories = ({ navigation }) => {

    // Obtengo las categorías y las guardo en una constante categories (sobreescribí el nombre data) utilizando useGetCategoriesQuery (ver -> shop.js)
    const { data: categories, isLoading, isError, isSuccess } = useGetCategoriesQuery()

    /* -------------------   VALIDACIONES LOǴICAS DE RESPUESTA   ------------------------------------------------------------- */

    // En caso de que se estén cargando el producto buscado
    if (isLoading) return (<LoadingSpinner />)

    // En caso de que se produzca una error

    const onRetry = () => {
        navigation.reset({
            index: 0,
            routes: [{name: "Home"}],
        })
    }

    if (isError) return <Error message={"Se ha producido un error"} onRetry={onRetry} textButton={"Reiniciar"} />

    // En caso de que la petición haya sido exitosa pero no existan categorías
    if (isSuccess && categories === null) return <EmptyComponent message={"No existen productos"}/>

    // Obtengo los nombres de categoría del objeto categories mapeando la propiedad name (=categoría)
    const categoryNames = Object.values(categories).map(category => category.name)

    /* -------------------   RENDERIZACIÓN DE CATEGORIES --------------------------------------------------------------------- */

    /* 
    
      COMPONENTES / PANTALLAS
  
      FlatList: Genera lista de categorías (data={datos a listar: json}, numColumns={nª cols a mostrar: int}, keyExtractor={item => item}, renderItem={({item}) => (componente a renderizar)})
      CardCategory: Administra el contenido de cada tarjeta de categoría de producto (nombre básicamente). Recibe: item/producto del json, style (cardContainer) y handler que modifica el estado de categorySelected -setCategorySelected- 
  
      LOGICA DE PANTALLAS
  
      categoryNames mapea y guarda los values de cada key del objeto categories (json: key=id de categoría, value: nombre de categoría)
      categoryNames se renderiza mediante el componente FlatList en dos columnas y se pasa cada nombre de categoría al componente CardCategory para su administración
  
    */

    return (
        <FlatList
            data={categoryNames}
            numColumns={2}
            keyExtractor={item => item}
            renderItem={({ item }) => (
                <CardCategory
                    item={item}
                    navigation={navigation}
                    cardContainer={styles.cardContainer}
                />
            )}
        />
    )
}

export default Categories

/* -------------------   DEFINICIÓN DE CATEGORÍAS DE PRODUCTOS DE LA PANTALLA HOME  -------------------------------------- */

const styles = StyleSheet.create({
    search: {
        top: "20%",
        position: "relative",
        zIndex: 5,
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
    cardContainer: {
        width: Dimensions.get('window').width / 2 - 20,
        height: 100,
        margin: 10,
        borderColor: colors.primary
    }
}) 