import {styled} from "@mui/material";
import {useState, useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";
import { REMOVE_BASKET } from "../store/types/shop";
import { incCounter, decCounter } from "../store/actions/shopActions";

const Wrapper = styled('div')`
  position: fixed;
  z-index: 1000;
  right: 20px;
  top: 80px;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: .2s;
  ${({ expanded }) => (expanded && `
    width: 400px;
    height: 600px;
    background: white;
    border: 1px solid red;
    border-radius: 10px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 16px;
  `)}
`
const BasketIcon = styled('span')`
  font-size: 40px;
`
const CloseIcon = styled('span')`
  font-size: 40px;
`
const Icons = styled('div')`
  display: flex;
  justify-content: space-between;
`
const BinIcon = styled('span')`
  font-size: 40px;
  position: absolute;
  top: -20px;
  padding: 5px;
  right: 0px;
`
const Counter = styled('span')`
  font-size: 30px;
  top: -20px;
  padding: 0px 10px;
`
const Card = styled('div')`
  position: relative;
  margin: 10px 5px;
  width: 400px;
`
export function BasketItem({ product, count, counterInc, counterDec, onRemove }) {
    return (
        <Card>
          <span>{product.title}</span>
          <Counter type="button" onClick={(e)=>{
            e.stopPropagation();
            counterDec(product);
          }}>-</Counter>
          <span>{count}</span>
          <Counter type="button" onClick={(e)=>{
            e.stopPropagation();
            counterInc(product);
          }}>+</Counter>
          <BinIcon type="button" onClick={(e) => {
            e.stopPropagation()
            onRemove(product.id)
          }}>🗑</BinIcon>
        </Card>
    )
}

export function Basket() {
    const [expanded, setExpanded] = useState(false)
    const dispatch = useDispatch()
    const basket = useSelector((state) => state.shop.basket)
    const handleRemoveFromBasket = useCallback((id) => {
      dispatch({
        type: REMOVE_BASKET,
        payload: id  
      })
    }, [dispatch])
    const incCount = useCallback((product) => {
      dispatch(incCounter(product))
    }, [dispatch])
    const decCount = useCallback((product) => {
      dispatch(decCounter(product))
    }, [dispatch])


    return (
        <Wrapper onClick={(e) => {
          setExpanded(true)
        }} expanded={expanded}>
            <Icons>
              <BasketIcon>🛒</BasketIcon>
              { expanded
                &&
                <CloseIcon onClick={(e) => {
                  e.stopPropagation()
                  setExpanded(false)
                }}>❌</CloseIcon>
              }
            </Icons>
            { expanded 
              &&
              <div>
                {basket.map(({product, count}) => (
                <BasketItem product={product} count={count} key={product.id} counterInc={incCount} counterDec={decCount} onRemove={handleRemoveFromBasket}/>
              ))}
              <span>Total price:</span>
              </div>
              
            }
        </Wrapper>
    )
}