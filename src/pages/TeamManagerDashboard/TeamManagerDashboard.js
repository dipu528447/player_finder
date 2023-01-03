import React, { useEffect, useState } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { list } from 'firebase/storage';


const MyProfile = () => {
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState([]);
    useEffect(()=>{
        const unsub = onSnapshot(
            collection(db, "Players"),
            (snapshot) => {
                let list = [];
                snapshot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() })
                });
                setPlayers(list);
                setLoading(false);
            }, (error) => {
                console.log(error);
            }
        );
        return () => {
            unsub();
            
        }
    },[])
    return (
        
        <div>
            {console.log(players)}
            <div className='flex justify-around m-24 flex-row'>
                {players.map(player=>{
                    return (
                        <div className="card card-compact w-96 bg-base-100 shadow-xl">
                            <figure><img src={player.photo} alt="Shoes" className='w-full h-5/6' /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{player.Name}</h2>
                                <p>{player.Details}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Show Details</button>
                                </div>
                            </div>
                        </div>   
                    );
                })}
            </div>
        </div>  
    );
};

export default MyProfile;