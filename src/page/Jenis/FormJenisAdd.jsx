import { useState } from 'react';
import cssModule from './Form.module.css'
import { useNavigate } from 'react-router-dom';
function FormJenisAdd () {
    const [namaJ, setnamaJ] = useState('');
    const token = localStorage.getItem('token');
    const fetchJenis = async() => {
        try{
            const response = await fetch('http://localhost:8000/api/jenis/add', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({jenis:namaJ})
            });
            if (!response.ok){
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            window.location.href = '/jenisform';
        }catch(error){
            console.log(error);
        }
    };
    const handleSubmit = (event) =>{
        event.preventDefault();
        fetchJenis();
    }
return(
    <div className={cssModule.BgForm}>
        <div className={cssModule.conteinterForm}>
            <h3>Form Add Jenis</h3>
            <form onSubmit={handleSubmit}>
                <div className={cssModule.Formgroup}>
                    <label htmlFor="Jenis">Nama Jenis</label>
                    <input 
                        id='jenis' 
                        name='jenis' 
                        placeholder='Masukan Nama Jenis' 
                        value={namaJ} 
                        onChange={(e) => setnamaJ(e.target.value)}
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
export default FormJenisAdd