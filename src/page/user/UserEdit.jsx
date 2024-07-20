import { useEffect, useState } from "react";
import cssModule from "./Form.module.css";

function UserEdit () {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem("userId");

    //data user
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telp, setTelp] = useState('');
    const [image, setImage] = useState(null);

useEffect(() => {
    const fetchUser = async () => {
        try{
            const response = await fetch(`http://localhost:8000/api/user/${userId}`, {
                headers:{
                        'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            if(response.ok){
                console.log(data.name)
                setName(data.name || '');
                setEmail(data.email || '');
                setPassword(data.password || '');
                setTelp(data.telp || '');
            }else{
                console.error('failed');
            }
        }catch (e) {
            console.log(e);
        }
       
    };
    fetchUser();
}, [userId, token]);

    const fetchUserPost = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('telp', telp);
        if (image) formData.append('image', image);
        formData.append('_method', 'PUT');
        
        const response = await fetch(`http://localhost:8000/api/user/update/${userId}`,{
            method: 'POST',
            headers:{
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
        window.location.href = '/user';
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        fetchUserPost();

    }
    return (
        <div className={cssModule.BgForm}>
        <div className={cssModule.conteinterForm}>
            <h3>Form Update User</h3>
            <form onSubmit={handleSubmit}>
                <div className={cssModule.Formgroup}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id='name'
                        name='name'
                        placeholder='Masukan name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={cssModule.Formgroup}>
                    <label htmlFor="image">Gambar</label>
                    <input
                        type="file"
                        id='image'
                        name='image'
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div className={cssModule.Formgroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id='email'
                        name='email'
                        placeholder='Masukan Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={cssModule.Formgroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        id='password'
                        name='passoword'
                        placeholder='Masukan Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={cssModule.Formgroup}>
                    <label htmlFor="telp">Telpon</label>
                    <input
                        type="text"
                        id='telp'
                        name='telp'
                        placeholder='Masukan Telpon'
                        value={telp}
                        onChange={(e) => setTelp(e.target.value)}
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
export default UserEdit