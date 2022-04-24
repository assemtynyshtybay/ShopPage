import {styled} from "@mui/material";
import {useState, useCallback, useMemo} from "react";
import {useSelector, useDispatch} from "react-redux";
import { REMOVE_BASKET } from "../store/types/shop";
import { incCounter, decCounter } from "../store/actions/shopActions";
import {Drawer} from '@mui/material';

const Wrapper = styled('div')`
  position: fixed;
  z-index: 1000;
  right: 20px;
  top: 80px;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* ${({ right }) => (right && `
    visibility: hidden;
  `)} */
`
const BasketWrapper = styled('div')`
  position: fixed;
  z-index: 1000;
  top:0px;
  width: 430px;
  height: 100%;
  right: 0px;
  display: flex;
  flex: 1 1 auto;
  transition: .1s;
  cursor: pointer;
  background-color: #F3F3F7;
  flex-direction: column;
  flex-wrap: initial;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 16px;
  line-height: 1.4;
  font-weight: 400;
`
const BasketIcon = styled('span')`
  font-size: 40px;
`
const Count = styled('span')`
  right: 5px;
`
const CloseIcon = styled('span')`
  position: fixed;
  right: 5px;
  top: 5px;
  font-size: 25px;
  & :hover:
    transform: rotate(90deg);

`
// const Icons = styled('div')`
//   display: flex;
//   justify-content: space-between;
// `
// const BinIcon = styled('span')`
//   font-size: 40px;
//   position: absolute;
//   padding: 5px;
//   right: 0px;
// `
const Counter = styled('span')`
  font-size: 24px;
`
const BasketTop = styled('div')`
  height: 56px;
  padding: 0px 16px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items:center;
`
const BasketBottom = styled('div')`
  position: fixed;
  background-color: #fff;
  bottom: 0px;
  right: 0px;
  width: 398px;
  height: 72px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 16px;
  transition: transform 80ms ease-out 0s, opacity;
  align-items:center;
`
const ProductBottom = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 16px;
  align-items:center;
`
const ProductInfo = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
  overflow: hidden;
`
const ConfirmButton = styled('button')`
  align-self: center;
  color: #fff;
  padding: 5px 20px;
  font-size: 20px;
  font-weight: 500px;
  background-color: #0C3B69;
  border: 0px;
  border-radius: 20px;
  box-shadow: 1px 1px 0 0 #6B6B6B;
`
const Empty = styled('div')`
  display:flex;
  width: 430px;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700px;
`
const CountInfo = styled('div')`
  display:flex;
  flex-direction: row;
  width: 50%;
  justify-content: space-around;
  font-size: 20px;
  font-weight: 700px;
`
const ProductCard = styled('div')`
  background-color: #fff;
  width: 430px;
  padding: 12px 16px;
  margin-bottom: 8px;
`
const Img = styled('img')`
  width: 68px;
  height: 68px;
  margin-right: 16px;
`
const Text = styled('span')`
  font-size: 24px;
  color: #19191D;
`
const Content = styled('div')`
  overflow: scroll;
  margin-bottom: 80px;
`
const LongText = styled('p')`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`
export function BasketItem({ product, count, counterInc, counterDec, onRemove, totalPrice}) {
    return (
        <>
          <ProductCard>
            <ProductInfo>
              <Img alt="product's img" src={product.image}/>
              <div>
                <Counter>{product.title}</Counter>
                <br/>
                <LongText>{product.description}</LongText>
              </div>
            </ProductInfo>
            <hr/>
            <ProductBottom>
              <span>${totalPrice.toFixed(2)}</span>
              <CountInfo>
                <Counter type="button" onClick={(e)=>{
                  e.stopPropagation();
                  count > 1 ? counterDec(product) : onRemove(product.id);
                }}>-</Counter>
                <Text>{count}</Text>
                <Counter type="button" onClick={(e)=>{
                  e.stopPropagation();
                  counterInc(product);
                }}>+</Counter>
              </CountInfo>
              {/* <BinIcon type="button" onClick={(e) => {
                e.stopPropagation()
                onRemove(product.id)
              }}>🗑</BinIcon> */}
            </ProductBottom>
          </ProductCard>
        </>
    )
}

export function Basket() {
  const [right, setRight] = useState(false);
  const dispatch = useDispatch()
  const basket = useSelector((state) => state.shop.basket)
  const totalInfo = {}
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
  totalInfo.totalPrice = useMemo(() => 
    basket.reduce((acc, item) => acc + +item.count * +item.product.price, 0)
  , [basket]);
  totalInfo.amount = useMemo(() => 
    basket.reduce((acc, item) => acc + item.count, 0)
  , [basket]);

    return (
      <>
        <Wrapper onClick={(e) => {
          setRight(true)
        }}>
          <Count>{totalInfo.amount}</Count>
          <BasketIcon>🛒</BasketIcon>
        </Wrapper>
        <Drawer
          anchor={'right'}
          open={right}
          onClose={ () => setRight(false)}
          width={{ sx: 1, md: 3}}
          sx={{ display: 'flex' }}
        >
          {basket.length < 1
          ?
          <Empty>Opps! Basket is empty!</Empty>
          :
          <BasketWrapper>
            <CloseIcon onClick={(e) => {
              e.stopPropagation()
              setRight(false)
            }}>✖️</CloseIcon>
            <BasketTop>
              {totalInfo.amount} {totalInfo.amount >1 ? ' товара на ' : ' товар на '} ${totalInfo.totalPrice.toFixed(2)}
            </BasketTop>
            <Content>
              {basket.map(({product, count}) => (
              <BasketItem product={product} isEmpty={basket.length < 1 ? false : true} count={count} key={product.id} counterInc={incCount} counterDec={decCount} onRemove={handleRemoveFromBasket} totalPrice={count*product.price}/>
            ))}
            </Content>
            <BasketBottom>
              <Text>${totalInfo.totalPrice.toFixed(2)}</Text>
              <ConfirmButton>Confirm</ConfirmButton>
            </BasketBottom>
          </BasketWrapper>
          }
        </Drawer>
      </>
    )
}