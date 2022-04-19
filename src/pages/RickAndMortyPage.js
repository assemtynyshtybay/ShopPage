import {useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {styled, Pagination, FormControl, MenuItem, InputLabel, Select } from '@mui/material';

import {fetchRickAndMorty} from '../store/actions/fetchRickAndMorty';
import { SET_CHARACTER_SORT_BY } from "../store/types/rickAndMorty";
const Avatar = styled('img')`
  width: 80px;
  height: 130px;
  border: solid 1px gray;
  border-radius: 20px;
  object-fit: cover;
`
const Cards = styled('div')`
  padding: 5% 10%;
  margin: 0 auto;
  align-items: center;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-auto-rows: minmax(300px, auto);
  grid-column-gap: 10px;
  grid-row-gap: 1em;
  background: 
`
const  Card = styled('div')`
  position: grid;
  grid-template-columns: 1fr 1fr;
  width: 500px;
  border: solid 1px gray;
  border-radius: 20px;
  padding: 10px 20px;
  grid-column-gap: 10px;
  display: flex;
`
export function RickAndMortyPage() {
  const dispatch = useDispatch();
  const characters = useSelector(state => state.RickAndMortyReducer.characters);
  const pageInfo = useSelector(state => state.RickAndMortyReducer.pageInfo);
  const sortBy = useSelector(state => state.sortBy)
  // const loadEpisodes = useCallback((url = DEFAULT_EPISODES_URL) => {
  //     fetch(url)
  //         .then((data) => data.json())
  //         .then(({ info, results }) => {
  //             setEpisodes((current) => [...current, ...results])
  //             if (info.next) {
  //                 loadEpisodes(info.next)
  //             }
  //         })
  // }, [])
  const setSortBy = useCallback((payload) => {
    dispatch({type: SET_CHARACTER_SORT_BY, payload})
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchRickAndMorty())
  }, [dispatch])
  const searchCharacter = useCallback(({ page = 1, sort = sortBy } = {}) => {
    dispatch(fetchRickAndMorty({page, sort}))
  }, [dispatch]);

    return (
        <div>
          <div style={{ marginLeft: 'auto', flexGrow: 1, maxWidth: '300px' }}>
                  <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                      <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={sortBy}
                          label="Sort by"
                          onChange={(e) => {
                              setSortBy(e.target.value);
                              searchCharacter({ sort: e.target.value })
                          }}
                          size="small"
                      >
                          <MenuItem value="alive">Alive</MenuItem>
                          <MenuItem value="unknown">Unknown</MenuItem>
                          <MenuItem value="dead">Dead</MenuItem>
                      </Select>
                  </FormControl>
          </div>
            <Cards>
                {characters && characters.map((character) => (
                    <Card key={character.id}>
                        <Avatar src={character.image} />
                        <span>{character.name}</span>
                        <span>{character.species}</span>
                    </Card>
                ))}
            </Cards>
            <Pagination count={pageInfo.total_pages} page={pageInfo.page} onChange={(e, value) => searchCharacter({ page: value })}/>
        </div>
    )
}
