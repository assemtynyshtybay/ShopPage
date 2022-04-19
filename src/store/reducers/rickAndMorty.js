import {SET_CHARACTER, SET_CHARACTER_PAGE_INFO, SET_CHARACTER_SORT_BY} from '../types/rickAndMorty';

const initState = {
  characters: [],
  pageInfo: {
    page: 1,
    total_page: 0,
  },
  sortBy: '',
}

export const RickAndMortyReducer = (state = initState, action) => {
  const newState = {...state}
  switch(action.type){
    case SET_CHARACTER:
      newState.characters = action.payload;
      break
    case SET_CHARACTER_PAGE_INFO:
      newState.pageInfo = action.payload;
      break
    case SET_CHARACTER_SORT_BY:
      newState.sortBy = action.payload;
      break;
    default:
      return state  
  }
  return newState;
}