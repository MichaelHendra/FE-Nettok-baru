import cssModule from './Search.module.css';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Search() {
    const {key} = useParams();
    const [movies, setMovie] = useState([]);
    useEffect(() => {
        const fetchSearch = async () => {
            const response = await fetch(`http://localhost:8000/api/search/${key}`);
            const result = await response.json();
            if(response.ok){
                setMovie(result);
            }else{
                console.log('Failed to connet');
            }
        };
        fetchSearch();
    },[])
    return (
        <div className={cssModule.BgSearch}>
            <div className={cssModule.ContainerSearch}>
            {movies.map((movie, index) => (
                <Link key={index} className={cssModule.linkKey} to={`/play/${movie.id}`}>
                <div className={cssModule.float}>
                    <div className={cssModule.imgSearchDiv}>
                        <img className={cssModule.imgSearch} src={movie.image_url} alt='Gambar 1' />
                    </div>
                    <div className={cssModule.Desk}>
                        <h3>{movie.judul_movie}</h3>
                        <p>{movie.desk}</p>
                    </div>
                </div>
                </Link>
                ))}
            </div>
        </div>
    );
}

export default Search;
