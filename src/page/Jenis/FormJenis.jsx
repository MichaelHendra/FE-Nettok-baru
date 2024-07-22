import { useEffect, useState } from 'react';
import cssModule from './Form.module.css';
import { Link } from 'react-router-dom';

function FormJenis() {
    const [jeniss, setJenis] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchJenis = async () => {
            try {
                const response = await fetch('https://bet-nettok-dep.vercel.app/api/api/jenis');
                const result = await response.json();
                if (response.ok) {
                    setJenis(result);
                } else {
                    console.error("Failed to fetch jenis:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching jenis:", error);
            }
        }
        fetchJenis();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://bet-nettok-dep.vercel.app/api/api/jenis/delete/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setJenis(jeniss.filter(jenis => jenis.jenis_id !== id));
        } catch (error) {
            console.error("Error deleting jenis:", error);
        }
    };

    return (
        <div className={cssModule.BgForm}>
            <div className={cssModule.conteinterForm}>
                <h3>Table Jenis</h3>
                <Link to='/jenisformadd'>Tambah Jenis</Link>
                <div>
                    <table className={cssModule.Table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nama Jenis</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jeniss.map((jenis, index) => (
                                <tr key={index}>
                                    <td>{jenis.jenis_id}</td>
                                    <td>{jenis.jenis}</td>
                                    <td>
                                        <Link to={`/jenisformedit/${jenis.jenis_id}`}>Edit</Link>
                                        <button onClick={() => handleDelete(jenis.jenis_id)}>Delete</button>
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

export default FormJenis;
