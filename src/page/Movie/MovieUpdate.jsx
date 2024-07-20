import { useEffect, useState } from "react";
import cssModule from "./Form.module.css";
import { useParams } from "react-router-dom";

function MovieUpdate() {
    const [judul, setJudul] = useState('');
    const [gambar, setGambar] = useState(null);
    const [desk, setDesk] = useState('');
    const [tanggal_rilis, setTanggal_Rilis] = useState('');
    const [jenis, setJenis] = useState('');
    const [movie, setMovie] = useState(null);
    const [jenisall, setJenisall] = useState([]);
    const token = localStorage.getItem('token');
    const { id } = useParams();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/movies/show/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    console.log(data.judul_movie);
                    setJudul(data.judul_movie);
                    setDesk(data.desk);
                    setTanggal_Rilis(data.tanggal_rilis);
                    setJenis(data.jenis_id);
                } else {
                    console.error("Failed to fetch movie details", response.statusText);
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchMovieDetails();
    }, [id, token]);

    useEffect(() => {
        const fetchJenis = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/jenis');
                const data = await response.json();
                if (response.ok) {
                    setJenisall(data);
                } else {
                    console.error("Failed to fetch jenis", response.statusText);
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchJenis();
    }, []);

    const fetchMovie = async () => {
        const formData = new FormData();
        formData.append('judul_movie', judul);
        if (gambar) formData.append('gambar', gambar);
        formData.append('desk', desk);
        formData.append('tanggal_rilis', tanggal_rilis);
        formData.append('jenis_id', jenis);
        if (movie) formData.append('movie_link', movie);
        formData.append('_method', 'PUT');

        try {
            const response = await fetch(`http://localhost:8000/api/movies/update/${id}`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                return;
            }

            const result = await response.json();
            console.log(result);
            window.location.href = '/movieform';
        } catch (e) {
            console.log(e);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchMovie();
    };

    return (
        <div className={cssModule.BgForm}>
            <div className={cssModule.conteinterForm}>
                <h3>Form Update Movie</h3>
                <form onSubmit={handleSubmit}>
                    <div className={cssModule.Formgroup}>
                        <label htmlFor="judul">Judul</label>
                        <input
                            type="text"
                            id='judul'
                            name='judul'
                            placeholder='Masukan Judul'
                            value={judul}
                            onChange={(e) => setJudul(e.target.value)}
                        />
                    </div>
                    <div className={cssModule.Formgroup}>
                        <label htmlFor="gambar">Gambar</label>
                        <input
                            type="file"
                            id='gambar'
                            name='gambar'
                            onChange={(e) => setGambar(e.target.files[0])}
                        />
                    </div>
                    <div className={cssModule.Formgroup}>
                        <label htmlFor="desk">Deskripsi</label>
                        <input
                            type="text"
                            id='desk'
                            name='desk'
                            placeholder='Masukan Deskripsi'
                            value={desk}
                            onChange={(e) => setDesk(e.target.value)}
                        />
                    </div>
                    <div className={cssModule.Formgroup}>
                        <label htmlFor="tanggal_rilis">Tanggal Rilis</label>
                        <input
                            type="date"
                            id='tanggal_rilis'
                            name='tanggal_rilis'
                            placeholder='Masukan Tanggal Rilis'
                            value={tanggal_rilis}
                            onChange={(e) => setTanggal_Rilis(e.target.value)}
                        />
                    </div>
                    <div className={cssModule.Formgroup}>
                        <label htmlFor="jenis_id">Jenis</label>
                        <select
                            name="jenis_id"
                            id="jenis_id"
                            value={jenis}
                            onChange={(e) => setJenis(e.target.value)}
                        >
                            <option value="">Pilih Jenis</option>
                            {jenisall.map((jenis, index) => (
                                <option key={index} value={jenis.jenis_id}>{jenis.jenis}</option>
                            ))}
                        </select>
                    </div>
                    <div className={cssModule.Formgroup}>
                        <label htmlFor="movie">Movie</label>
                        <input
                            type="file"
                            id='movie'
                            name='movie'
                            onChange={(e) => setMovie(e.target.files[0])}
                        />
                    </div>
                    <div className={cssModule.Formgroup}>
                        <button type='submit'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MovieUpdate;
