import { Container, Grid, CircularProgress } from "@mui/material";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Basket } from "../components/Basket";
import OrderModal from "../components/orderModal";
import { ProductItem } from "../components/ProductItem";
import { fetchShop, addToBasket } from "../store/actions/shopActions";

function Shop() {
  const dispatch = useDispatch()
  const products = useSelector(state => state.shop.products)
  const basket = useSelector(state => state.shop.basket)
  const isLoad = useSelector(state => state.shop.isLoad)
  useEffect(() => {
    dispatch(fetchShop())
  }, [dispatch])
  const handleAddToBasket = useCallback((product) => {
    dispatch(addToBasket(product))
  }, [dispatch])

  return(
    <Container>
      {
        isLoad
        ?
        <CircularProgress />
        :
        (
        <>
          <Grid container spacing={2} columns={{xs: 3, md: 6, lg: 12}}>
          {products && products.map((item) => (
            <Grid item xs={3} key={item.id}>
              <ProductItem product={item} onAddToBasket={() => handleAddToBasket(item)}/>
            </Grid>
            ))
          }
          </Grid>
          <Basket />
          { basket.length>0 && <OrderModal/> }
        </>)
      }
      
      
    </Container>
  )
}
export default Shop;