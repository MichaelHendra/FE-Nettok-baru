import cssModule from './Search.module.css';
import gambar1 from '../assets/gambar1.png';

function Search() {
    return (
        <div className={cssModule.BgSearch}>
            <div className={cssModule.ContainerSearch}>
                <div className={cssModule.float}>
                    <div className={cssModule.imgSearchDiv}>
                        <img className={cssModule.imgSearch} src={gambar1} alt='Gambar 1' />
                    </div>
                    <div className={cssModule.Desk}>
                        <h3>XD</h3>
                        <p>asdasdas</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
