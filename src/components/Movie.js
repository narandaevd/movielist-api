import React from 'react'
import {API} from './../App'
import {Card} from 'react-bootstrap'

export default function Movie({
    movieData: {
        title,
        poster_path,
        vote_average: rating,
    }
}) {

    let color = rating > 7 ? 'green' : rating > 5 ? 'yellow' : 'red';

    return (
        <Card className='movie'>
            <Card.Img variant='top' src={poster_path == null ? 'img/no-image.jpg' : `${API.imageBaseUrl}${poster_path}`}
                 alt='IMAGE ERROR'/>
            <div className='movie__info'>
                <div className='movie__title'>
                {
                    title && title.length > 20? title.slice(0, 20) + '...' : title
                }
                </div>
                <div className={`movie__rating movie__rating_${color}`}>{rating - 1e-8 > 0 ? rating : '-'}</div>
            </div>
        </Card>
    )
}
