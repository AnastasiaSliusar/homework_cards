import { Card as MuiCard, CardContent, Typography } from "@mui/material";
import { CardData, CardListProps } from "../utils/types";
import Card from "./Card";

const CardList = ({
    cards,
    status,
    cardActions,
 }: CardListProps) => {

    const cardList = cards.map((card:CardData)=>{
        return (
            <Card 
                key={card.id}
                card={card}
                cardActions={cardActions}
            />
        );
    });

    return <MuiCard sx={{
        width: 'auto',
        marginRight: '20px',
        marginTop: '20px'
    }}>
        <Typography variant="h6" align="center" sx={{ marignTop: '10px'}}>{status}</Typography>
        <CardContent>
            {cardList}
        </CardContent>
    </MuiCard>
  }

  export default CardList;