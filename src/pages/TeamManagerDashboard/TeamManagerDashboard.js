import React, { useContext, useEffect, useState } from 'react';
import { onSnapshot, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import {  UserContext } from '../../App';
import { async } from '@firebase/util';

const MyProfile = () => {
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState([]);
    const [team, setTeam] = useState([]);
    const [user,setUser] = useContext(UserContext)
    const [selectPlayer,setSelectedPlayer]=useState({})
    const [selectTeam,setSelectedTeam]=useState({})
    useEffect(()=>{
        const unsub = onSnapshot(
            collection(db, "users"),
            (snapshot) => {
                let list = [];
                snapshot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() })
                });
                list=list.filter(item=>item.userType!=='Team Manager' && item.gamesType===user.gamesType)
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

    const sentRequest=async()=>{
        var note=prompt("Please enter a request note")
        try{
           const request={
            FromEmail:user?.email,
            ToEmail: selectPlayer.email,
            note:note
           }
            await addDoc(collection(db, 'requests'), {
                ...request,
                timeStamp: serverTimestamp(),
            });
            
        }
        catch(err){
            console.log(err)
        }
        
    }

    useEffect(()=>{
        const unsub = onSnapshot(
            collection(db, "team"),
            (snapshot) => {
                let list = [];
                snapshot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() })
                });
                setTeam(list);
                
            }, (error) => {
                console.log(error);
            }
        );
        return () => {
            unsub();
            
        }
    },[])


    function viewSelectPlayer(player){
        console.log(player)
        setSelectedPlayer(player)
       var temp=team.find(item=>item.TeamManagerEmail===player.TeamManagerEmail)
       setSelectedTeam(temp)
    }
    return (
        
        <div>
           
            <div className='flex justify-around m-24 flex-row'>
                {players.length==0?<h1 className='text-2xl text-red-500'>Sorry!! No Players Available in {user.gamesType}</h1>:
                <>
                {
                    players.map(player=>{
                        return (
                            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                                <figure><img src={player.photoURL} alt="Shoes" className='w-full h-5/6' /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{player.name}</h2>
                                    <p>{player.gamesType}</p>
                                    <div className="card-actions justify-end">
                                        <label  htmlFor="my-modal-3" className="btn btn-primary" onClick={()=>viewSelectPlayer(player)}>Show Details</label>
                                    </div>
                                </div>
                            </div>   
                        );
                    })}
                </>
                }
            </div>


            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
            <div className="modal-box relative text-left">
                <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <div className='flex justify-between'>
                    <div className="avatar">
                        <div className="w-28 mask mask-hexagon">
                            <img src={selectPlayer.photoURL}/>
                        </div>
                    </div>
                    <div className='mr-12'>
                        <div className="avatar">
                            <div className="w-16 mask mask-hexagon">
                                <img src={selectTeam.photoURL}/>
                            </div>
                        </div>
                        <p className='text-blue-500 text-xl'>{selectTeam.TeamName}</p>
                    </div>
                    
                </div>
                <h3 className="text-lg font-bold">Name: {selectPlayer.name}</h3>
                <p className="py-4"><span className='font-semibold'>SKills:</span> {selectPlayer.skill}</p>
                <p className="py-4"><span className='font-semibold'>Played Games:</span> {selectPlayer.PlaydGames}</p>
                <p className="py-4"><span className='font-semibold'>Scores:</span> {selectPlayer.scores}</p>
                <p className="py-4"><span className='font-semibold'>Expetected Price:</span> {selectPlayer.expectedPrice}</p>
                <p className="py-4"><span className='font-semibold'>Contact:</span> {selectPlayer.contact}</p>
                <p className="py-4"><span className='font-semibold'>Player email:</span> {selectPlayer.email}</p>
                <p className="py-4"><span className='font-semibold'>Presend Address:</span> {selectPlayer.present_address}</p>
                <div className='flex  '>
                    <button className='btn btn-success mr-5'>Review</button>
                    <button className='btn btn-warning' onClick={sentRequest}>Sent Request</button>
                </div>
            </div>
            </div>
        </div>  
    );
};

export default MyProfile;