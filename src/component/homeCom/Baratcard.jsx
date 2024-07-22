import { Link, useParams } from "react-router-dom";
import cssModule from "./Barat.module.css"
import { useEffect, useState } from "react";
function Baratcard ({id}) {
    // const {id} = useParams();
    const [movies, setMovie] = useState([]);

    useEffect(() => {
       const fetchMovie = async () =>{
        try{
            const respones = await fetch(`https://bet-nettok-dep.vercel.app/api/api/movie/genre/${id}`);
            const data = await respones.json();
            if(Array.isArray(data)){
                setMovie(data);
            }else{
                console.error("Expected ana array but got:",data);
            }
        }catch (error){
            console.error("Eroor fetching movies", error);
        }
       } ;
       fetchMovie();
    },[id]);
    return (
        <div className={cssModule.containter}>
        <div className={cssModule.BgBawah}>
            <div className={cssModule.cardLine}>
                <p className={`${cssModule.LineText} ${cssModule.textLineBawah}`}>Genre Movie</p>
                <div className={cssModule.card}>
                    {movies.map((movie, index) => (
                       <div key={index} className={cssModule.cardLink}>
                            <Link to={`/play/${movie.id}`}>
                                <img src={movie.image_url} alt="gambar1" className={cssModule.card}/>
                            </Link>
                            {movie.jenis && <p>{movie.jenis}</p>}
                       </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    );
}
export default Baratcard