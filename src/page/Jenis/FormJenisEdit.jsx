import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import cssModule from './Form.module.css';

function FormJenisEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [jenis, setJenis] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`http://localhost:8000/api/jenis/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setJenis(response.data.jenis || ''); // Ensure jenis is never undefined
        })
        .catch(error => {
            console.error('Error fetching the data', error);
        });
    }, [id, token]);

    const fetchJenis = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/api/jenis/update/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ jenis })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            navigate('/jenisform');
        } catch (error) {
            console.error('There was an error updating the data!', error);
        }
    };

    const handleSubmit = (event) => {
        fetchJenis(event);
    };

    return (
        <div className={cssModule.BgForm}>
            <div className={cssModule.conteinterForm}>
                <h3>Form Edit Jenis</h3>
                <form onSubmit={handleSubmit}>
                    <div className={cssModule.Formgroup}>
                        <label htmlFor="jenis">Nama Jenis</label>
                        <input
                            id='jenis'
                            name='jenis'
                            value={jenis}
                            onChange={(e) => setJenis(e.target.value)}
                            placeholder='Masukan Nama Jenis'
                        />
                    </div>
                    <div className={cssModule.Formgroup}>
                        <button type='submit'>Edit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormJenisEdit;
