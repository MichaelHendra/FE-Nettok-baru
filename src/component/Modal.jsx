import { useState } from "react";
import cssModule from "./Modal.module.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Modal = ({isOpen, onClose}) =>{
    const [emailTok, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('https://bet-nettok-dep.vercel.app/api/api/login',{
                email: emailTok,
                password: password,
            });
            if(response.data){
                const result = await response.data;
                localStorage.setItem('token', result.token);
                localStorage.setItem('userId', result.user.id); 
                onClose();
                window.location.reload();
            }else{
                console.error("Login failed: No token received");
            }
            // const {token} = response.data.token;
            // localStorage.setItem('token', token);
        }catch{
            setError('Invalid credentials. Please try again');
        }
    };

if (!isOpen) return null;
return (
    <div className={cssModule.modalOverlay}>
        <div className={cssModule.modal}>
            <button className={cssModule.closeButton} onClick={onClose}>X</button>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
                <div className={cssModule.formGroup}>
                    <label htmlFor='username'>email</label>
                    <input type='text' id='email' name='email' placeholder='email' value={emailTok} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={cssModule.formGroup}>
                    <label htmlFor='username'>Password</label>
                    <input type='text'  id='password' name='password'placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className={cssModule.formGroup}>   
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    </div>
);
}

export default Modal