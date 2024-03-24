// Importo componentes de react & react-native
import { StyleSheet, Text, View, Image } from 'react-native'

// Importo el componente del contador
import Counter from '../components/Counter/Counter.js'

// Importo la función que traerá el producto por id desde Firebase (products_market.json)
import { useGetProductByIdQuery } from '../app/services/shop.js'

// Importo objetos globales de estilo de la app --> fuentes y colores
import colors from '../utils/global/colors.js'

// Importo el spinner de carga de la app
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner.js'

// Importo la pantalla de error de la app
import Error from '../components/Errors/Error.js'

// Importo el componente que se renderiza si el componente principal está vacío
import EmptyComponent from '../components/EmptyComponent/EmptyComponent.js'

// El componente ProductDetail recibe productId (para mostrar el producto elegido en ProductsByCateogory), portrait (handle windows) y setCategorySelected (goBack)
const ProductDetail = ({ navigation, route }) => {

  /* -------------------   OBTENCIÓN DE VARIABLE POR PARÁMETRO  ---------------------------------------------------------- */
  const { productId, portrait } = route.params

  /* -------------------   SOLICITUD DE LA LISTA DE PRODUCTOS A LA BBDD -------------------------------------------------- */
  // Obtengo el producto buscado (sobreescribí el nombre data) utilizando useGetCategoriesQuery (ver -> shop.js)
  const { data: product, isLoading, isError, isSuccess } = useGetProductByIdQuery(productId)

  /* -------------------   RENDERIZACIÓN DE PRODUCTSDETAIL -------------------------------------------------------------------------------- */

  /* 
   
    COMPONENTES / PANTALLAS
  
    Header: Define el Header de la pantalla (se le debe pasar style -estilo del texto a mostrar- y title -texto a mostrar-)
    Image: Muestra la imagen del producto si existe la imagen
    Views: Lista la información básica del producto
    Pressable: Botón de comprar (sin funcionalidad -al momento-) 
  
    LOGICA DE PANTALLAS
   
    La app se inicializa en Home pero al clickearse sobre una categoría de producto se mapean y renderizan todos los productos de esa categoria
    Al clickearse sobre un producto de la categoría elegida también se renderiza una nueva página (ProductDetail.js)
    Con el botón de las dos flechas para atrás se vuelve a la pantalla inicial
    
  */

  // En caso de que se estén cargando el producto buscado
  /* -------------------   VALIDACIONES LOǴICAS DE RESPUESTA   ------------------------------------------------------------- */

  // En caso de que se estén cargando el producto buscado
  if (isLoading) return (<LoadingSpinner />)

  // En caso de que se produzca una error
  if (isError) return <Error message={"Se ha producido un error"} onRetry={() => navigation.goBack()} textButton={"Volver"} />

  // En caso de que la petición haya sido exitosa pero no existan categorías
  if ((isSuccess) && product === null) return <EmptyComponent message={"No existen categorías"} />

  return (

    <View style={styles.container}>

      <View style={[styles.content, !portrait && { flexDirection: "row", gap: 20, padding: 10 }]} >

        <View style={styles.imageContainer}>
          <Image
            style={[styles.image, !portrait && { width: "40%", height: 100 }]}
            source={{ uri: product.thumbnail ? product.thumbnail : null }}
            resizeMode='cover'
          />
        </View>

        <View style={[styles.containerText, !portrait && { width: "30%" }]}>
          <Text style={styles.title}>{product.name}</Text>
        </View>

        <View style={[styles.containerPrice, !portrait && { width: "15%", flexDirection: "column" }]}>
          <Text style={styles.priceText}>Precio de bulto: {product.bulk_price} € / {product.reference_format}</Text>
          <Text style={styles.priceText}>Precio de unidad aprox: {product.unit_price} €</Text>
          <View style={styles.counter}>
            <Counter product={product} productId={productId} navigation={navigation}/>
          </View>
        </View>

      </View>

    </View>

  )
}

export default ProductDetail

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    top: "10%",
    flex: 1
  },
  content: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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
  imageContainer: {
    width: "70%",
    height: "45%",
    objectFit: "contain"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  },
  containerText: {
    backgroundColor: colors.primary,
    width: "100%",
    alignItems: "center",
    gap: 25,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    // Sombras para Android
    elevation: 8,
    // Sombras para iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    marginTop: 20

  },
  containerPrice: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: "10%",
    gap: 15
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: "2.5%"
  },
  counter: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
})