import React, { useContext } from 'react';
import { UserContext } from '../../App';
import PlayerDashboard from '../../pages/PlayerDashboard/PlayerDasboard';
import TeamManagerDashboard from "../../pages/TeamManagerDashboard/TeamManagerDashboard"
const Home = () => {
    const [user,setUser]=useContext(UserContext)
    return (
        <div>
            {user.userType=='Team Manager'?<TeamManagerDashboard></TeamManagerDashboard>:user.userType=='Player'?<PlayerDashboard></PlayerDashboard>:<></>}
        </div>
    );
};

export default Home;