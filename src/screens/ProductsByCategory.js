import { StyleSheet, View, FlatList, Pressable, Text } from 'react-native'
import categories from "../utils/data/categories_market.json"
import products from "../utils/data/products_market.json"
import Header from '../components/Header.js'
import { useEffect, useState } from 'react'
import ProductByCategory from '../components/ProductByCategory.js'
import Search from '../components/Search.js'
import { AntDesign } from "@expo/vector-icons"

const ProductsByCategory = ({ categorySelected, setCategorySelected }) => {

  const [categoryProductsID, setCategoryProductsID] = useState([])

  const [productsFiltered, setProductsFiltered] = useState([])

  const [keyword, setKeyword] = useState("")

  const handlerKeyword = (k) => {
    setKeyword(k)
  }

  useEffect(() => {
    if (categorySelected) {
   
      // -- Traigo la categoria cuyo nombre sea categorySelected
        const selectedCategory = Object.values(categories).find(category => String(category.name) === String(categorySelected))
        
        // Verificar si se encontró la categoría seleccionada y si tiene subcategorías
        const subcategories = selectedCategory ? selectedCategory.subcategories : [];
        
        // Actualizar el estado de categoryProductsID
        setCategoryProductsID(subcategories);

        setProductsFiltered(categoryProductsID.map(catProductID => products[catProductID]));

        console.log(productsFiltered)
    }

    if (keyword) setProductsFiltered(productsFiltered.filter(product => {

      const productTitleLower = product.name.toLowerCase()
      const keywordLower = keyword.toLowerCase()

      return productTitleLower.includes(keywordLower)
    }
    ))
  }, [categorySelected, categoryProductsID, keyword])

  const goBack = () => {
    setCategorySelected("")
  }

  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable style={styles.goBackRowContainer} onPress={goBack}>
          <AntDesign style={styles.goBackRowButton} name="doubleleft" size={35} color={"black"} />
        </Pressable>
        <Header HeaderStyle={styles.header} title={categorySelected || "Productos"} />
        <View style={styles.emptyView}></View>
      </View>
      <Search handlerKeyword={handlerKeyword} />
      <FlatList
        data={productsFiltered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ProductByCategory item={item} />}

      />
    </>
  )

  
}

export default ProductsByCategory

const styles = StyleSheet.create({
  headerContainer: {
    height: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 2,
  },
  goBackRowContainer: {
    flex: 1,
    justifyContent: "left"
  },
  goBackRowButton: {
    transform: [{ scale: 0.50 }], // Ajusta el tamaño del ícono (menos de 1 para hacerlo más pequeño)
  },
  emptyView:{
    flex: 1,
    color: "white"
  }
})