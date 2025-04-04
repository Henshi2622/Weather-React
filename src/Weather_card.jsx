import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Weather_card ({ label,value ,icon , isHighlighted }){
    return(
        <Card sx={{  maxWidth: 347, maxHeight : 200}}>
        
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
        <FontAwesomeIcon icon={icon} style={{ marginRight: "8px" , fontSize : "20px"}}/>{label} : {value}
        </Typography>
        </CardContent>
    
        </Card>
    );
}