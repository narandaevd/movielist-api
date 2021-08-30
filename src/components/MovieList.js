import React, {useContext} from 'react'
import Movie from './Movie'

// Импорт Контекста
import {MoviesContext} from '../App'
import {Button, Spinner} from 'react-bootstrap'

import {NavLink} from 'react-router-dom'

export default function MovieList() {

    // Импортируем состояние movies 
    const movies = useContext(MoviesContext);

    return (
        <div className='movie-list mt-5'>
            {
                !movies.results ? 
                <Button variant='primary' className='mx-auto mt-5'>
                    <Spinner animation='border' size='lg' variant='white' className='m-5 p-4'>
                    </Spinner>
                </Button>
                :
                movies.results.map(
                    (movie, index) => 
                    {
                        return <NavLink to={'/film/' + movie.id}>
                            <Movie movieData={movie} key={index}/>
                        </NavLink>
                    }

                )
            }
        </div>
    )
}
