import React, {useEffect, useState} from 'react'
import {API} from '../App'
import {Card} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import _ from 'lodash';

function MoviePage(props) {

    const [film, setFilm] = useState({});

    useEffect(() => {
        fetch(API.getAPIUrlForMovieId(props.match.params.id))
            .then(response => response.json())
            .then(json => setFilm(json))
    }, [])

    if (_.isEmpty(film))
        return (
            <div>EMPTY</div>
        )
    else     
        return (
        <div className="container">
        <div className="full__film__info">
            <div className="wrap1">
                <div className="wrap2">
                    <div className="full__film__info__image my-auto">
                        <Card.Img 
                            variant='top' 
                            src={film.poster_path == null ? 
                                'img/no-image.jpg' 
                                : 
                                `${API.imageBaseUrl}${film.poster_path}`}
                            alt='IMAGE ERROR'/>
                    </div>
                    <div className="full__film__info__about">
                        <div className="full__film__info__all">
                            <div className="full__film__info__title">
                                {film.title}
                            </div>
                            <div className="full__film__info__original-title">
                                {/* {{ film['original_title'] }} */}
                            </div>
                            <div style={{margin: '5px 0 5px 0', fontWeight: 500, fontSize: '24px'}}>О фильме:</div>
                            <div className="full__film__info__detail">
                                <div className="full__film__info__detail__left-side">
                                    <div>Год производства: </div>
                                    <div>Страна:</div>
                                    <div>Жанры:</div>
                                    <div>Статус:</div>
                                    <div>Бюджет:</div>
                                    <div>Имеется видео:</div>
                                    <div>Время:</div>
                                </div>
                                <div className="full__film__info__detail__right-side">
                                    <div> {film.release_date} </div>
                                    <div> {film.production_countries[0].name} </div>
                                    <div> {film.genres.map(genre => <span>{genre.name} </span>)} </div>
                                    <div> {film.status} </div>
                                    <div> {film.budget} </div>
                                    <div> {film.video ? 'Да' : 'Нет'} </div>
                                    <div> {film.runtime} </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="full__film__info__descr">
                    <span style={{fontWeight: 400, fontSize: '24px'}}>Описание фильма:</span>
                    <div style={{margin: '10px 0 10px 0'}}>
                        {film.overview}
                    </div>
                    <span style={{fontWeight: 400, fontSize: '24px'}}>Оценка IMDB:</span>
                    <div style={{fontWeight: 400, fontSize: '16px',  marginTop: '10px'}}>
                        <span style={{color: '#1db224', fontSize: 18, fontWeight: 500}}>
                            {film.vote_average} | {film.vote_count}
                        </span>
                    </div>
                </div>
            </div>
            <div className="full__film__info__sidebar">
                <div className="full__film__info__rating">
                    <div>
                        {film.popularity}
                    </div>
                </div>
                <div className="full__film__info__actors">
                    <span style={{fontWeight: 500, fontSize: '24px'}}>Компании:</span>
                    {
                        film.production_companies.map(
                            company => (
                                <div>
                                    {company.name}
                                </div>
                            )
                            )
                    }
                </div>
            </div>
        </div>
    </div>

    )
}
export default withRouter(MoviePage)
