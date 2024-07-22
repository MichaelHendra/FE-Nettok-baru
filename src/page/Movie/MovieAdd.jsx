import { useEffect, useState } from "react";
import cssModule from "./Form.module.css";

function MovieAdd() {
    const [judul, setJudul] = useState('');
    const [gambar, setGambar] = useState(null);
    const [desk, setDesk] = useState('');
    const [tanggal_rilis, setTanggal_Rilis] = useState('');
    const [jenis, setJenis] = useState('');
    const [movie, setMovie] = useState(null);
    const [jenisall, setJenisall] = useState([]);
    const token = localStorage.getItem('token');

    const fetchMovie = async () => {
        const formData = new FormData();
        formData.append('judul_movie', judul);
        formData.append('gambar', gambar);
        formData.append('desk', desk);
        formData.append('tanggal_rilis', tanggal_rilis);
        formData.append('jenis_id', jenis);
        formData.append('movie_link', movie);

        try {
            const response = await fetch('https://bet-nettok-dep.vercel.app/api/api/movies/add', {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                console.log('Failed to connect');
                const errorText = await response.text();
                console.error('Error response:', errorText);
                return;
            }

            const result = await response.json();
            console.log(result);
            // Uncomment the following line if you want to redirect after a successful submission
            window.location.href = '/movieform';
        } catch (e) {
            console.log(e);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchMovie();
    };

    useEffect(() => {
        const fetchJenis = async () => {
            const rejenis = await fetch('https://bet-nettok-dep.vercel.app/api/api/jenis');
            const data = await rejenis.json();
            if (rejenis.ok) {
                setJenisall(data);
            } else {
                console.error("Failed to fetch jenis", rejenis.statusText);
            }
        };
        fetchJenis();
    }, []);

    return (
        <div className={cssModule.BgForm}>
            <div className={cssModule.conteinterForm}>
                <h3>Form Add Movie</h3>
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
                            {jenisall.map((jenisall, index) => (
                                <option key={index} value={jenisall.jenis_id}>{jenisall.jenis}</option>
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
                        <button type='submit'>Tambah</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MovieAdd;
