import { Navigate,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const TitSswRoute = ()=>{

    const [ isEng,setIsEng ] = useState(0)
    // const [ acctStatus,setAccStatus ] = useState('pending')
    const currentUser = useSelector(state=> state.User.profile)

    useEffect(()=>{
        if(currentUser){
         setIsEng(Number(currentUser.data.is_engineer))
        //  setAccStatus(Number(currentUser.data.account_status))
        }
    },[currentUser])

    return  (
        isEng === 0 ? <Outlet/> : <Navigate to={'/'}/>
    )
}

export default TitSswRoute