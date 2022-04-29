import { SET_PRODUCTS, ADD_TO_BASKET, REMOVE_BASKET, INC_IN_BASKET, DEC_IN_BASKET,OPEN_MODAL, IS_LOAD, CLOSE_MODAL } from "../types/shop";

const initState = {
  products: [],
  basket: JSON.parse(localStorage.getItem('basket')) || [],
  modalOpen: false,
  isLoad: true,
}

// basket = {id: //}[]
// basket = {product: {id://}, count: number }[]
export const shop = (state=initState, action) => {
  const newState = {...state}
  switch(action.type){
    case SET_PRODUCTS:
      newState.products = action.payload;
      break;
    case ADD_TO_BASKET:
      const elem = newState.basket.find((item) => action.payload.id === item.product.id)
      if (elem) {
        elem.count += 1
        newState.basket = [...newState.basket]
      } else {
        newState.basket = [...newState.basket, { product: action.payload, count: 1 }]
      }
      break;
    case REMOVE_BASKET:
      newState.basket = newState.basket.filter(({ product }) => product.id !== action.payload)
      break;
    case DEC_IN_BASKET:
      const prodDec = newState.basket.find((item) => action.payload === item.product.id)
      prodDec.count -= 1;
      newState.basket = [...newState.basket];
      break;
    case INC_IN_BASKET:
      const prodInc = newState.basket.find((item) => action.payload === item.product.id)
      prodInc.count += 1;
      newState.basket = [...newState.basket];
      break;
    case OPEN_MODAL:
      newState.modalOpen = true;
      break;
    case CLOSE_MODAL:
      newState.modalOpen = false;
      break
    case IS_LOAD:
      newState.isLoad = false;
      break;
    default:
      return state
  }
  localStorage.setItem('basket', JSON.stringify(newState.basket))
  return newState;
}