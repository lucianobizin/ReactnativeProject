// Importo componentes de react & react-native
import { FlatList, StyleSheet, View } from 'react-native'

// Importo el componente de las tarjetas de órdenes de compra
import OrderItem from '../components/Orders/OrderItem.js'
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner.js'
import Error from '../components/Errors/Error.js'
import EmptyComponent from '../components/EmptyComponent/EmptyComponent.js'

// Importo el useSelector que permite traer estados generales de la app
import { useSelector } from 'react-redux'

// Importo la función que desencadena la petición GET de las órdenes de un usuario (ver -> localId)
import { useGetOrdersQuery } from '../app/services/orders.js'
import { useEffect } from 'react'
import colors from '../utils/global/colors.js'


const Orders = () => {

    // Traemos del estado general de la app la constante localId
    const localId = useSelector((state) => state.auth.localId)

    // Traigo las órdenes de un usuario
    const { data: orders, isLoading, isError, isSuccess } = useGetOrdersQuery(localId)

    useEffect(() => {
        console.log(orders)
    }, [orders])


    // // Creo el trigger de la petición de órdenes
    // const [triggerGetOrders] = useGetOrdersQuery()

    // En caso de que se estén cargando el producto buscado
    if (isLoading) return (<LoadingSpinner />)

    // En caso de que se produzca una error
    if (isError) return <Error message={"Se ha producido un error"} onRetry={() => navigation.goBack()} textButton={"Volver"} />

    // En caso de que la petición haya sido exitosa pero no existan categorías
    if ((isSuccess) && orders === null) return <EmptyComponent message={"No existen categorías"} />



    /* -------------------   RENDERIZACIÓN DE LISTA DE ORDENES DE COMPRA --------------------------------------------------------------------- */

    /* 
    
      COMPONENTES / PANTALLAS
   
      FlatList: Renderiza la lista de órdenes de compra definidas en el componente OrderItem
   
      LOGICA DE PANTALLAS
   
      Administra la lista de las distintas órdenes de compra mostradas en tarjetas 
   
    */

    return (

        <View style={styles.cardContainer}>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <OrderItem order={item}
                />}
            />
        </View>

    )

}

export default Orders

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: colors.primary,
        justifyContent: "space-between"
    }
})