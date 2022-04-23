import { Container, Grid } from "@mui/material";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Basket } from "../components/Basket";
import { ProductItem } from "../components/ProductItem";
import { fetchShop, addToBasket } from "../store/actions/shopActions";

function Shop() {
  const dispatch = useDispatch()
  const products = useSelector(state => state.shop.products)
  useEffect(() => {
    dispatch(fetchShop())
  }, [dispatch])
  const handleAddToBasket = useCallback((product) => {
    dispatch(addToBasket(product))
  }, [dispatch])

  return(
    <Container>
      <Grid container spacing={2}>
        {products && products.map((item) => (
          <Grid item xs={3} key={item.id}>
            <ProductItem product={item} onAddToBasket={() => handleAddToBasket(item)}/>
          </Grid>
        ))
      }
      </Grid>
      <Basket />
    </Container>
  )
}
export default Shop;