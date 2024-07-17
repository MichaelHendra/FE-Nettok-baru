import cssModule from './Modal.module.css'

//image
import Logo from '../assets/Logo.png'
import { useState } from 'react';
import axios from 'axios';

const Register = ({isOpenRegister, onCloseRegister}) =>{
    const [names, setName] = useState('');
    const [emails, setEmail] = useState('');
    const [passwords, setPassword] = useState('');
    const [telps, setTelp] = useState('');
    const [error, setError] = useState('');
    
    const registerHandler = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/api/register',{
                name: names,
                email:emails,
                password: passwords,
                telp: telps
            });
            const {token} = response.data
            localStorage.setItem('token', token);
            onCloseRegister();
        }catch{
            setError('Invalid credentials. Please try again');
        }
    };
    if (!isOpenRegister) return null
    return(
        <div className={cssModule.modalOverlay}>
        <div className={cssModule.modal}>
        <button className={cssModule.closeButton} onClick={onCloseRegister}>X</button>
            <div className={cssModule.LineModal}>
                <img src={Logo} alt='Netfilx' />
                <h2>Register</h2>
            </div>
            {error && <p>{error}</p>}
            <form onSubmit={registerHandler}>
                <div className={cssModule.formGroup}>
                    <label htmlFor='name'>name</label>
                    <input type='text' id='name' name='name' placeholder='Name' value={names} onChange={(e) =>setName(e.target.value)} />
                </div>
                <div className={cssModule.formGroup}>
                    <label htmlFor='username'>email</label>
                    <input type='text' id='email' name='email' placeholder='email' value={emails} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={cssModule.formGroup}>
                    <label htmlFor='passowrd'>Password</label>
                    <input type='password' id='password' name='password'placeholder='Password' value={passwords} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className={cssModule.formGroup}>
                    <label htmlFor='telp'>Telpon</label>
                    <input type='text' id='telp' name='telp'placeholder='No Telpon' value={telps} onChange={(e) => setTelp(e.target.value)}/>
                </div>
                <div className={cssModule.formGroup}>
                    <button type='submit'>Register</button>
                </div>
            </form>
        </div>
    </div>
    );
} 

export default Register