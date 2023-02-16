import { collection, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { LoadingContext, UserContext } from '../../App';
import { db } from '../../firebase';

const Requests = () => {
    const [request,setRequest]=useState([]);
    const [user,setUser]=useContext(UserContext)
    const [loading,setLoading]=useContext(LoadingContext)
    useEffect(()=>{
        console.log(user)
        const unsub = onSnapshot(
            collection(db, "requests"),
            (snapshot) => {
                let req = [];
                snapshot.docs.forEach((doc) => {
                    req.push({ id: doc.id, ...doc.data() })
                });   
                setRequest(req.filter(item=>item.ToEmail===user.email))
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
        <div style={{display:"flex", justifyContent:"center", alignContent:"start"}}>
            {request.map(reqt=>{
                return (
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body" style={{textAlign:"left"}}>
                        <p><b>From :</b> {reqt.FromEmail}</p>
                        <p><b>Message :</b> {reqt.note}</p>
                        <div style={{display:'flex', justifyContent:"end"}}>
                            <button className="btn btn-sm btn-success mr-2">Accept</button>   
                            <button className="btn btn-sm btn-warning">Reject</button>
                        </div>
                    </div>
                </div>
                )
            })}
        </div>
    );
};

export default Requests;