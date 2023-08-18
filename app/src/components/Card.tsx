import { Button, Card as MuiCard, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import { buttonNameType, CardProps } from "../utils/types";
  
  const Card = ({ card, cardActions }: CardProps) => {
    let buttonsNames:Array<buttonNameType> = [];
    let buttons = [];
    let buttonsActions = {
        pending : {
            name: 'PENDING',
            onclick: cardActions.handlePending
        },
        done : {
            name: 'DONE',
            onclick: cardActions.handleDone
        },
        reject : {
            name: 'REJECT',
            onclick: cardActions.handleReject
        },
    }
    switch(card.status) {
        case 'PENDING': 
         buttonsNames = ['done', 'reject'];
            break;
        case 'DONE': 
        buttonsNames = ['reject'];
            break;
        case 'REJECTED': 
        buttonsNames = ['done'];
            break;
            
    };

    let date = new Date(card.created_date).toLocaleString();

    buttons = buttonsNames.map((button)=>{
        return (
            <Button key={button} size="small" color="primary" onClick={()=>{buttonsActions[button].onclick(card)}}>{buttonsActions[button].name}</Button>
        );
    })

    return <MuiCard sx={{
        display: card.display ? 'block': 'none',
        marginBottom: '30px'
    }}>
        <CardHeader>Name:{card.patient_name}</CardHeader>
        <CardContent>
            <Typography>Name:{card.patient_name}</Typography>
            <Typography>Arrhythmias: {card.arrhythmias.join(',')}</Typography>
            <Typography>Date: {date}</Typography>
        </CardContent>
        <CardActions>
            {buttons}
        </CardActions>
    </MuiCard>
  }

  export default Card;