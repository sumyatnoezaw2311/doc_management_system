import { useNavigate,useLocation } from 'react-router-dom';
import { ListItem,ListItemButton,ListItemText, Typography} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import theme from '../../utils/theme';


const SideBarItem = ({section})=>{

    const location = useLocation()
    const path = location.pathname
    const navigate = useNavigate()

    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];

    const handleOnClick = (link)=>{
        navigate(`/back-office/${link}`)
    }

    return <>
                <Typography sx={{ marginY: 2, fontFamily: 'Lato' ,fontSize: '16px', fontWeight: 'bold' ,textTransform: 'uppercase'}} textAlign='left'>{section.title}</Typography>
                    {
                        section.items.map(item=>
                            <ListItem sx={{ borderLeft: "2px solid", borderColor: theme.palette.dark.secondary, px: 0 }} key={item.title}>
                                <CircleIcon sx={{ position: 'absolute',marginLeft: '-6px', fontSize: 10}} style={lastPart === item.link ? {display: 'block', color: theme.palette.primary.main} : {display: 'none'} }></CircleIcon>
                                    <ListItemButton  onClick={()=> handleOnClick(item.link)}>
                                        <ListItemText primary={ <Typography sx={lastPart === item.link ? {color: theme.palette.primary.main, fontWeight: 'bold', fontFamily: 'Lato'} : {fontFamily: 'Lato'} } >{item.title}</Typography> }></ListItemText>
                                    </ListItemButton>
                            </ListItem>
                    )
                }
            </>
}

export default SideBarItem