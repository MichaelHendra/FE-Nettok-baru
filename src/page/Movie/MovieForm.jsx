import { useEffect, useState } from 'react';
import cssModule from './Form.module.css'
import { Link } from 'react-router-dom';
function MovieForm () {
    const [movies, setMovie] = useState([]);
    useEffect(() => {
        const fetchMovie = async () => {
            const response = await fetch('https://bet-nettok-dep.vercel.app/api/api/movies');
            const result = await response.json();
            console.log("Fetched data:", result);
            if(response.ok){
                setMovie(result);
            }else{
                console.error("Failed to Fetch Movie", response.statusText);
            }
        };
        fetchMovie();
    },[]);
return (
    <div className={cssModule.BgForm}>
    <div className={cssModule.conteinterForm}>
        <h3>Table Movie</h3>
        <Link to='/movieformadd'>Tambah Movie</Link>
        <div>
            <table className={cssModule.Table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Judul Movie</th>
                        <th>Tanggal Upload</th>
                        <th>Tanggal Rilis</th>
                        <th>Jenis</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {movies.map((movie, index) => (
                        <tr key={index}>
                            <td>{movie.id}</td>
                            <td>{movie.judul_movie}</td>
                            <td>{movie.tanggal_upload}</td>
                            <td>{movie.tanggal_rilis}</td>
                            <td>{movie.jenis}</td>
                            <td>
                                <Link to={`/movieformedit/${movie.id}`}>Edit</Link>
                                {/* <button onClick={() => handleDelete(movie.id)}>Delete</button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
</div>
);
}
export default MovieForm