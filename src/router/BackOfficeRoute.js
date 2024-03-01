import { Navigate,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const BackOfficeRoute = ()=>{

    const [ isAdmin,setIsAdmin ] = useState(1)
    const currentUser = useSelector(state=> state.User.profile)
    
    useEffect(()=>{
        if(currentUser) setIsAdmin(Number(currentUser.data.is_admin))
    },[currentUser])

    return  (
        isAdmin === 1 ? <Outlet/> : <Navigate to={'/'}/>
    )
}

export default BackOfficeRoute