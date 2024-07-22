import { Link } from "react-router-dom";
import cssModule from "./Genre.module.css";
import { useEffect, useState } from "react";

function Genre() {
    const [genres, setGenre] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const fetchGenre = async () => {
            try {
                const response = await fetch(`https://bet-nettok-dep.vercel.app/api/api/jenis`);
                const data = await response.json();
                console.log("Fetched data:", data);
                if (Array.isArray(data)) {
                    setGenre(data);
                } else {
                    console.error("Expected an array but got:", data);
                }
            } catch (error) {
                console.error("Error fetching jenis:", error);
            }
        };
        fetchGenre();
    }, []);

    const slideLeft = () => {
        setSlideIndex((prev) => Math.max(prev - 1, 0));
    };

    const slideRight = () => {
        setSlideIndex((prev) => Math.min(prev + 1, genres.length - 1));
    };

    return (
        <div className={cssModule.BG}>
            <button onClick={slideLeft} className={cssModule.slideButton}>{"<"}</button>
            <div className={cssModule.linkListContainer}>
                <div className={cssModule.linkList} style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
                    {genres.map((genre, index) => (
                        <Link key={index} className={cssModule.linkGenre} to={`/genre/${genre.jenis_id}`}>{genre.jenis}</Link>
                    ))}
                </div>
            </div>
            <button onClick={slideRight} className={cssModule.slideButton}>{">"}</button>
        </div>
    );
}

export default Genre;
