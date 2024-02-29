// Importo componentes de react & react-native
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'

// Importo el componente del contador
import Counter from '../components/Counter.js'

// Importo la función que traerá el producto por id desde Firebase (products_market.json)
import { useGetProductByIdQuery } from '../app/services/shop.js'

// Importo objetos globales de estilo de la app --> fuentes y colores
import colors from '../utils/global/colors.js'

// El componente ProductDetail recibe productId (para mostrar el producto elegido en ProductsByCateogory), portrait (handle windows) y setCategorySelected (goBack)
const ProductDetail = ({ route }) => {

  /* -------------------   OBTENCIÓN DE VARIABLE POR PARÁMETRO  ---------------------------------------------------------- */
  const { productId, portrait } = route.params

  /* -------------------   SOLICITUD DE LA LISTA DE PRODUCTOS A LA BBDD -------------------------------------------------- */
  // Obtengo el producto buscado (sobreescribí el nombre data) utilizando useGetCategoriesQuery (ver -> shop.js)
  const {data: product, isLoading} = useGetProductByIdQuery(productId)

  if (!categories) {
    return <ActivityIndicator />; // O cualquier otro indicador de carga
}

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
  if (isLoading) {

    return (

      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>

    )

  }

  return (

    <View style={styles.container}>

      <View style={[styles.content, !portrait && { flexDirection: "row", gap: 20, padding: 10 }]} >

        <Image
          style={[styles.image, !portrait && { width: "40%", height: 100 }]}
          source={{ uri: product.thumbnail ? product.thumbnail : null }}
          resizeMode='cover'
        />

        <View style={[styles.containerText, !portrait && { width: "30%" }]}>
          <Text style={styles.title}>{product.name}</Text>
        </View>

        <View style={[styles.containerPrice, !portrait && { width: "15%", flexDirection: "column" }]}>
          <Text style={styles.priceText}>Precio de bulto: {product.bulk_price} € / {product.reference_format}</Text>
          <Text style={styles.priceText}>Precio de unidad aprox: {product.unit_price} €</Text>
          <View style={styles.counter}>
            <Counter product={product} productId={productId} />
          </View>
        </View>

      </View>

    </View>

  )
}

export default ProductDetail

const styles = StyleSheet.create({

 loadingContainer: {
  backgroundColor: colors.primary
  },
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
  image: {
    width: "65%",
    height: 275,
    objectFit: "contain"
  },
  containerText: {
    backgroundColor: colors.primary,
    width: "100%",
    alignItems: "center",
    gap: 25,
    paddingHorizontal: 5,
    paddingVertical: 15,
    // Sombras para Android
    elevation: 8,
    // Sombras para iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    }

  },
  containerPrice: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 35,
    gap: 15
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10
  },
  counter: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
})