import { Link } from "react-router-dom";
import cssModule from "./Navbar.module.css";
//images
import Logo from "../assets/Logo.png";
import Cari from "../assets/search.png";
import Bell from "../assets/bell.png";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar({ openModal, openModalRegister }) {
  const [islogin, setLogin] = useState(false);
  const [key, setKey] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(true);
    }
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    window.location.href = `/search/${key}`;
  }

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await axios.post('https://bet-nettok-dep.vercel.app/api/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("valid");
        setLogin(false);
        window.location.reload();
        console.log("Berhasil Coy");
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={cssModule.sNavbar}>
      <nav>
        <ul>
          <li><Link to="/"><img src={Logo} alt="Logo" className={`${cssModule.LinkNav} ${cssModule.logo}`} /></Link></li>
          <li><Link to="/" className={cssModule.LinkNav}>Home</Link></li>
          <li><Link to="/movie" className={cssModule.LinkNav}>Movies</Link></li>
          {islogin ? (
            <>
              <li className={cssModule.kanan}>
                <Link to="/user" className={cssModule.btn}>Account</Link>
              </li>
              <li className={cssModule.kanan}>
                <button className={cssModule.btn} onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className={cssModule.kanan}>
                <button className={cssModule.btn} onClick={openModal}>Login</button>
              </li>
              <li className={cssModule.kanan}>
                <button className={cssModule.btn} onClick={openModalRegister}>Register</button>
              </li>
            </>
          )}
          <li className={`${cssModule.kanan} ${cssModule.LinkNav}`}>
            <Link to="/"><img src={Bell} alt="bell" className={cssModule.Sd} /></Link>
          </li>
          <form onSubmit={handleSearch}>
            <li className={`${cssModule.kanan} ${cssModule.LinkNav} ${cssModule.search}`}>
              <button type="submit" className={cssModule.btnSearch}><img src={Cari} alt="cari" className={cssModule.Sd} /></button>
            </li>
            <li className={`${cssModule.kanan} ${cssModule.search}`}>
              <input className={cssModule.inputSearch} size='50' type="text" id="key" name="key" value={key} onChange={(e) => setKey(e.target.value)} />
            </li>
          </form>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
