// src/App.js
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Movies from "./page/Movie";
import Mylist from "./page/Mylist";
import Play from "./page/Play";
import Home from "./page/home";
import Modal from "./component/Modal";
import Register from "./component/registerModal";
import GenreMovie from "./page/GenreMovie";
import User from "./page/User";
import Subcribe from "./page/Subcribe";
import PlayPay from "./component/PlayPay";
import Search from "./page/Search";
import FormJenisAdd from "./page/Jenis/FormJenisAdd";
import FormJenis from "./page/Jenis/FormJenis";
import FormJenisEdit from "./page/Jenis/FormJenisEdit";
import MovieForm from "./page/Movie/MovieForm";
import MovieAdd from "./page/Movie/MovieAdd";
import MovieUpdate from "./page/Movie/MovieUpdate";



const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }
    const [isModalOpenRegister, setIsModalOpenRegister] = useState(false);

    const openModalRegister = () => {
        setIsModalOpenRegister(true);
    }

    const closeModalRegister = () => {
        setIsModalOpenRegister(false);
    }

    const [isModalOpenPay, setIsModalOpenPay] = useState(false);

    const openModalPay = () =>{
        setIsModalOpenPay(true);
    }
    const closeModalPay = () => {
        setIsModalOpenPay(false);
    }

    return (
        <>
            <Navbar openModal={openModal} openModalRegister={openModalRegister}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie" element={<Movies />} />
                <Route path="/mylist" element={<Mylist />} />
                <Route path="/play/:id" element={<Play openModal={openModal} openModalPay={openModalPay} />} />
                <Route path="/genre/:id" element={<GenreMovie />} />
                <Route path="/user/" element = {<User />} />
                <Route path="/subcribe" element ={<Subcribe />}/>
                <Route path="/search/:key" element ={<Search />}/>
                <Route path="/jenisform" element= {<FormJenis />} />
                <Route path="/jenisformadd" element ={<FormJenisAdd />}/>
                <Route path="/jenisformedit/:id" element={<FormJenisEdit />} />
                <Route path="/movieform" element={<MovieForm />}/>
                <Route path="/movieformadd" element={<MovieAdd />} />
                <Route path="/movieformedit/:id" element={<MovieUpdate />} />
            </Routes>
            <Footer />
            <Modal isOpen={isModalOpen} onClose={closeModal} />
            <Register isOpenRegister={isModalOpenRegister} onCloseRegister={closeModalRegister}/>
            <PlayPay isOpenPay={isModalOpenPay} onClosePay={closeModalPay} />
        </>
    );
}

export default App;
