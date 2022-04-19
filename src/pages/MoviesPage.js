import {useEffect, useState} from "react";
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

export function MoviesPage() {
    const [pageInfo, setPageInfo] = useState({
        page: 1,
        total_pages: 0,
    })
    
    const [query, setQuery] = useState('')
    const [sortBy, setSortBy] = useState('popularity.desc')

    useEffect(() => {
        searchMovies()
    }, [])

    function searchMovies({ page = 1, sort = sortBy } = {}) {
        let method = 'discover'
        if (query && query.length > 0) {
            method = 'search'
        }
        fetch(`https://api.themoviedb.org/3/${method}/movie?sort_by=${sort}&api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU&include_adult=false&include_video=true&page=${page}&with_watch_monetization_types=flatrate&query=${query}`)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.results)
                setPageInfo({
                    page: data.page,
                    total_pages: Math.min(data.total_pages, 500)
                })
            })
    }

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
