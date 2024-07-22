import { Link } from "react-router-dom";
import cssModule from "./Modal.module.css"
function PlayPay ({isOpenPay, onClosePay}) {
    if (!isOpenPay) return null;
   return(
    <div className={cssModule.modalOverlay}>
    <div className={cssModule.modal}>
        <button className={cssModule.closeButton} onClick={onClosePay}>X</button>
        <h2>Perhatian</h2>
            <div className={cssModule.formGroup}>
                <p className={cssModule.pow}>Masa Langganan anda Sudah Habis Atau Anda
                   Masih Belum Melakukan Langganan.  
                </p>
                <p className={cssModule.pow}>Mohon Untuk Meperpanjang Atau Melakukan Pembayaran Langganan.</p>
                <div className={cssModule.linkPisah}>
                    <Link to = '/subscribe'>Subscribe</Link>
                    <Link to = '/'>Kembali</Link>
                </div>
            </div>
    </div>
</div>
   );
}

export default PlayPay