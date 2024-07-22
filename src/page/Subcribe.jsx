import { useEffect, useState } from 'react';
import cssModule from './Subcribe.module.css';

function Subcribe() {
    const [subS, setSubs] = useState([]);
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in local storage
    const token = localStorage.getItem('token'); // Assuming token is stored in local storage

    useEffect(() => {
        const fetchSubs = async () => {
            try {
                const response = await fetch('https://bet-nettok-dep.vercel.app/api/api/sub');
                const data = await response.json();
                if (data) {
                    setSubs(data);
                } else {
                    console.error("Expected an array but got:", data);
                }
            } catch (error) {
                console.error("Error fetching subscriptions:", error);
            }
        };
        fetchSubs();
    }, []);

    const handleSubscribe = async (planId) => {
        try {
            const response = await fetch(`https://bet-nettok-dep.vercel.app/api/api/subcribe/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ sub_id: planId })
            });
            const data = await response.json();
            console.log(data);

            if (data.payment_url && data.snap_token) {
                console.log('Snap Token:', data.snap_token); // Tampilkan Snap Token untuk debugging
                if (window.snap && window.snap.pay) {
                    window.snap.pay(data.snap_token, {
                        onSuccess: function (result) {
                            alert('Payment Success');
                            // Handle success, like updating subscription status
                        },
                        onPending: function (result) {
                            alert('Waiting for payment');
                            // Handle pending
                        },
                        onError: function (result) {
                            alert('Payment failed');
                            // Handle failure
                        },
                        onClose: function () {
                            alert('You closed the popup without finishing the payment');
                        }
                    });
                } else {
                    console.error("Midtrans Snap.js is not loaded.");
                }
            } else {
                console.error("Failed to get payment URL or Snap Token:", data);
            }
        } catch (error) {
            console.error("Error getting payment URL:", error);
        }
    };

    return (
        <div className={cssModule.BgSub}>
            <div className={cssModule.judulSub}>
                <h1>Opsi Pilihan Berlangganan</h1>
            </div>
            <div className={cssModule.ContainerSub}>
                {subS.map((sub, index) => (
                    <div key={index} className={cssModule.cardSub}>
                        <div className={cssModule.cardSubDalam}>
                            <h1>{sub.nama_sub}</h1>
                            {sub.sub_id == 1 ? (
                                <div className={cssModule.cardInfo}>
                                    <p>Pengguna Gratisan</p>
                                </div>
                            ) : (
                                <div className={cssModule.cardInfo}>
                                    <button className={cssModule.btn} onClick={() => handleSubscribe(sub.sub_id)}>
                                        Langganan
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Subcribe;
