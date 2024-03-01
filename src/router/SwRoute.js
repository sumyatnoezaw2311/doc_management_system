import { Navigate,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const SwRoute = ()=>{

    const [ isEng,setIsEng ] = useState(1)
    const currentUser = useSelector(state=> state.User.profile)
    
    useEffect(()=>{
        if(currentUser) setIsEng(Number(currentUser.data.is_engineer))
    },[currentUser])

    return  (
        isEng === 1 ? <Outlet/> : <Navigate to={'/'}/>
    )
}

export default SwRoute