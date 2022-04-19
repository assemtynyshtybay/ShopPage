import { SET_CHARACTER, SET_CHARACTER_PAGE_INFO } from '../types/rickAndMorty';
import {DEFAULT_CHARACTERS_URL} from '../url';

export const fetchRickAndMorty = ({url = DEFAULT_CHARACTERS_URL, page = 1, sort}= {}) => dispatch => {
  fetch(`${url}?name=rick&status=${sort}`)
      .then((res) => res.json())
      .then(({ info, results }) => {
          console.log(results)
          dispatch({
            type: SET_CHARACTER,
            payload: results,
          })
          dispatch({
              type: SET_CHARACTER_PAGE_INFO,
              payload: {
                page: page,
                total_pages: Math.min(info.pages, 500)
              }
          })
      })
}