// Importo componentes de react & react-native
import { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'

// Importo los componentes de las pantallas principales de la app: Home, Productos por categoría y Detalle de producto
import ProductByCategory from '../components/ProductByCategory.js'
import Search from '../components/Search.js'

// Importo las bases de datos
import categories from "../utils/data/categories_market.json"
import products from "../utils/data/products_market.json"

// El componente ProductsByCategory recibe categorySelected, setCategorySelected (handler que modifica el estado de categorySelected) y selectProductId
const ProductsByCategory = ({ navigation, route }) => {

  /* -------------------   RECEPCIÓN DE OBJETO POR PARÁMETROS  ------------------------------------------------------------------------------ */
  const { categorySelected } = route.params

  /* -------------------   DECLARACIÓN DE USESTATE PARA LAS SCREENS  ------------------------------------------------------------------------ */

  // Guardo los productos de la categoría elegida
  const [productsCategory, setProductsCategory] = useState([]) // 

  // Guardo la palabra del buscador de productos
  const [keyword, setKeyword] = useState("")

  /* -------------------   DECLARACIÓN DE USEEFECT PARA LAS SCREENS  ------------------------------------------------------------------------ */

  // Declaración de useEffect para definir el valor de CategoryProductsID y mapear los productos que tengan como nombre de categoría el valor CategoryProductsID (elegida en Home)
  // Tambiéen funciona para el Search revisando que la keyword coincida con algún producto de la lista de productos de la categoría elegida
  // Y también lo hace para categorySelected

  useEffect(() => {

    if (categorySelected) {

      // Traigo la categoria cuyo nombre sea categorySelected (fuente: base de datos: categories_market.json )
      const selectedCategory = Object.values(categories).find(category => String(category.name) === String(categorySelected))

      // Verifico si se encontró la categoría seleccionada y si tiene subcategorías (= códigos de productos que componen la categoría)
      const subcategories = selectedCategory ? selectedCategory.subcategories : [];

      // Si no hay palabra clave, mostramos todos los productos de la categoría
      const filteredProducts = subcategories.map(catProductID => products[catProductID]);

      handleSetProductsCategory(filteredProducts);

    }

    if (keyword) {

      // Mapeo del array de ids de productos que forman parte de la categoría seleccionada y devuelvo el producto (clave=product=id del producto, valor=catProductID=producto)
      handleSetProductsCategory(productsCategory.filter(product => {

        const productNameLower = product.name.toLowerCase()
        const keywordLower = keyword.toLowerCase()

        return productNameLower.includes(keywordLower)

      })

      )
    }

  }, [categorySelected, keyword])

  /* -------------------   DECLARACIÓN DE FUNCIONES HANDLER (PARA RESTRINGIR ACCESO AL FUNCIONES SET)  -------------------------------------- */

  // Creo función para modificar el estado de keyword (Search)
  const handlerKeyword = (k) => {
    setKeyword(k)
  }

  const handleSetProductsCategory = (products) => { // 
    setProductsCategory(products) // 
  }

  /* -------------------   RENDERIZACIÓN DE PRODUCTSBYCATEGORY ------------------------------------------------------------------------------- */

  /* 
   
    COMPONENTES / PANTALLAS
  
    Pressable: Permite volver a la pantalla "Home" mediante la función "goback" que actualiza el estado de categorySelected a "".
    AntDesign: Permite inscrustar una imagen al Pressable, en este caso, las flechas para atrás
    Header: Define el Header de la pantalla (se le debe pasar style -estilo del texto a mostrar- y title -texto a mostrar-)
    Search: Permite la búsqueda de productos por palabra clave (keyword) mediante el componente Search (se pasa el manejador de Keyword que incluye setKeyword)
    Flatlist: Lista los productos de la categoría de productos elegida y los renderiza con el compoonente ProductByCategory (tarjeta de productos) -recibe el handler de setProductId y cada producto- 
  
    LOGICA DE PANTALLAS
   
    La app se inicializa en Home pero al clickearse sobre una categoría de producto se mapean y renderizan todos los productos de esa categoria
    También se puede buscar un producto en particular (Search) mediante un filtrado de aquellos productos cuyo nombre coincide con la keyword ingresada en el search
    
  */

  return (

    <>

      <Search searchStyle={styles.search} handlerKeyword={handlerKeyword} />
      <View style={styles.container}>
        <FlatList
          data={productsCategory}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ProductByCategory navigation={navigation} item={item} />}
        />
      </View>

    </>

  )


}

export default ProductsByCategory

/* -------------------   DEFINICIÓN DE CATEGORÍAS DE PRODUCTOS DE LA PANTALLA ProductsByCategory  ----------------------------------------- */


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
  container: {
    marginTop: "20%",
    marginBottom: 2,
  }
})