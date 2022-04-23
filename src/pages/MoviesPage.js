import {useEffect, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    TextField
} from "@mui/material";
import {MovieItem} from "../components/MovieItem";
import { fetchMovies } from "../store/actions/fetchMovies";
import { SET_MOVIES_QUERY, SET_MOVIES_SORT_BY } from "../store/types/movies";

export function MoviesPage() {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.moviesReducer.movies)
  const query = useSelector(state => state.moviesReducer.query)
  const sortBy = useSelector(state => state.moviesReducer.sortBy)
  const pageInfo = useSelector(state => state.moviesReducer.pageInfo)

  useEffect(() => {
      dispatch(fetchMovies())
  }, [dispatch])

  const setQuery = useCallback((payload) => {
    dispatch({type: SET_MOVIES_QUERY, payload})
  }, [dispatch]);
  const setSortBy = useCallback((payload) => {
    dispatch({type: SET_MOVIES_SORT_BY, payload})
  }, [dispatch]);
  const searchMovies = useCallback(({ page = 1, sort = sortBy } = {}) => {
    dispatch(fetchMovies({ page, sort, query }))
  }, [dispatch, query, sortBy]);

  return (
      <Container maxWidth="xl">
          <div style={{ display: 'flex', alignItems: 'center' }}>
              <h1>Movies</h1>
              <div style={{ marginLeft: 'auto', flexGrow: 1, maxWidth: '300px' }}>
                  <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                      <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={sortBy}
                          label="Sort by"
                          disabled={query && query.length > 0}
                          onChange={(e) => {
                              setSortBy(e.target.value);
                              searchMovies({ sort: e.target.value })
                          }}
                          size="small"
                      >
                          <MenuItem value="popularity.desc">Popularity</MenuItem>
                          <MenuItem value="release_date.desc">Release Date</MenuItem>
                          <MenuItem value="vote_average.desc">Rating</MenuItem>
                      </Select>
                  </FormControl>
              </div>
              <div style={{ marginLeft: '5px' }}>
                  <TextField value={query} onChange={(e) => setQuery(e.target.value)} size="small" label="Search" />
                  <Button onClick={() => searchMovies()}>Search</Button>
              </div>
          </div>
          <Grid container spacing={2}>
              {movies.map((movie) => (
                  <Grid item xs={12 / 5}>
                      <MovieItem key={movie.id} movie={movie} />
                  </Grid>
              ))}
          </Grid>

            <Pagination count={pageInfo.total_pages} page={pageInfo.page} onChange={(e, value) => searchMovies({ page: value })}/>
      </Container>
  )
}
