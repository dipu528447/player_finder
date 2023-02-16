import { collection, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { db } from '../../firebase';

const PlayerDashboard = () => {
    const [loading, setLoading] = useState(false);
    const [Team, setTeam] = useState([]);
    const [user,setUser] = useContext(UserContext)
    useEffect(()=>{
        const unsub = onSnapshot(
            collection(db, "team"),
            (snapshot) => {
                let list = [];
                snapshot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() })
                });
                list=list.filter(item=>item.TeamManagerEmail!==user.TeamManagerEmail && item.gamesType===user.gamesType)
                setTeam(list);
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
            {console.log(Team)}
            <div className='flex justify-around m-24 flex-row'>
                {Team.length==0?<h1 className='text-2xl text-red-500'>Sorry!! No Team Available in {user.gamesType}</h1>:
                <>
                {
                    Team.map(team=>{
                        return (
                            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                                <figure><img src={team.photoURL} alt="Shoes" className='w-full h-5/6' /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">Team Name: {team.TeamName}</h2>
                                    <p className='text-blue-800'>Team Manager Email: {team.TeamManagerEmail}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Show Details</button>
                                    </div>
                                </div>
                            </div>   
                        );
                    })}
                </>
                }
            </div>
        </div>  
        
    );
};

export default PlayerDashboard;