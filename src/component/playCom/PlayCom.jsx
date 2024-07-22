import { useEffect, useState } from "react";
import cssModul from "./PlayCom.module.css"
import { Link } from "react-router-dom";

function PlayCom (){
const [movies, setMovie] = useState([]);
useEffect(()=>{
    const fetchMovie = async () => {
        try{
            const response = await fetch('https://bet-nettok-dep.vercel.app/api/api/movies/');
            const data = await response.json();
            if(Array.isArray(data)){
                setMovie(data);
            }else{
                console.error("Expected ana array but got:",data);
            }
        } catch (error){
            console.error("Eroor fetching movies", error);
        }
    };
    fetchMovie();
},[])
    return(
    <div className={cssModul.playVideo}>
        <div className={cssModul.more}>
            <div className={cssModul.cardContainer}>
                {movies.map((movie, index) => (
                <div key={index} className={cssModul.cardMovie}>
                    <Link to={`/play/${movie.id}`}>
                        <img src={movie.image_url} alt="Image"/>
                    </Link>
                    <div className={cssModul.info}>
                        <div className={cssModul.title}>{movie.judul_movie}</div>
                        <div className={cssModul.details}>{movie.tanggal_rilis}</div>
                    </div>
                        <div className={cssModul.duration}>{movie.duration}</div>
                </div>
                ))}
            </div>
        </div>
    </div>
);
}

export default PlayCom