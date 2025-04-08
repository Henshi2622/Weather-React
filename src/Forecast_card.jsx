import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function OutlinedCard({date ,info}) {
    
      const card = (
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div">
              {`${info.temp} °C`}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{date} </Typography>
          </CardContent >
          <CardActions >
            <Button size="small"  >Learn More</Button>
          </CardActions>
        </React.Fragment>
      );
    return (
    <Box sx={{ maxWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
