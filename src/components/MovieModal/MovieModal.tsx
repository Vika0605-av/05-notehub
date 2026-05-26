
import { useEffect } from 'react';

import { createPortal } from 'react-dom';

import type { MouseEvent } from 'react';

import type { Movie } from '../../types/movie';

import css from './MovieModal.module.css';

interface MovieModalProps {

    movie: Movie;

    onClose: () => void;

}

const modalRoot = document.getElementById('modal-root') as HTMLElement;

export const MovieModal = ({

    movie,

    onClose,

}: MovieModalProps) => {

    useEffect(() => {

        document.body.style.overflow = 'hidden';

        const handleEscape = (event: KeyboardEvent) => {

            if (event.key === 'Escape') {

                onClose();

            }

        };

        window.addEventListener('keydown', handleEscape);

        return () => {

            document.body.style.overflow = 'auto';

            window.removeEventListener(

                'keydown',

                handleEscape

            );

        };

    }, [onClose]);

    const handleBackdropClick = (

        event: MouseEvent<HTMLDivElement>

    ) => {

        if (event.target === event.currentTarget) {

            onClose();

        }

    };

    return createPortal(

        <div

            className={css.backdrop}

            onClick={handleBackdropClick}

        >

            <div className={css.modal}>

                <button

                    className={css.closeButton}

                    onClick={onClose}

                >

                    X

                </button>

                <img

                    className={css.image}

                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}

                    alt={movie.title}

                />

                <h2 className={css.title}>

                    {movie.title}

                </h2>

                <p>

                    Release date: {movie.release_date}

                </p>

                <p>

                    Rating: {movie.vote_average}

                </p>

                <p className={css.overview}>

                    {movie.overview}

                </p>

            </div>

        </div>,

        modalRoot

    );

}