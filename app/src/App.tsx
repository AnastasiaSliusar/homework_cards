import React, { useEffect, useState} from 'react';
import './App.css';
import { Box, TextField, Typography } from '@mui/material';
import CardList from './components/CardList';
import { CardData, CardListArr, statusType } from './utils/types';
import Select from './components/Select';

const filterFunction = (cards:CardData[], status: statusType)=>{
  const filteredCards = cards.filter((card) => card.status === status && card.display);
  return filteredCards;
}

function App() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [pendingCards, setPendingCards] = useState<CardData[]>([]);
  const [rejectedCards, setRejectedCards] = useState<CardData[]>([]);
  const [doneCards, setDoneCards] = useState<CardData[]>([]);

  useEffect(() => {
    if (!cards.length) {
    fetch('http://localhost:3001/cards')
      .then(resp => resp.json())
      .then(data => {
        data.forEach((card:CardData) => card.display = true);
        setCards(data);
      }).catch((error: Error)=>{
        console.error(`APP: ${error.message}`);
      })
    }
  }, [cards])

  useEffect(()=>{
    if (cards.length) {
      const newPendingCards = filterFunction(cards, 'PENDING');
      const newRejectedCards = filterFunction(cards, 'REJECTED');
      const newDoneCards = filterFunction(cards, 'DONE');
      setPendingCards(newPendingCards);
      setRejectedCards(newRejectedCards);
      setDoneCards(newDoneCards)
    }
  },[cards]);


const updateStatus= (card:CardData, status:statusType)=>{
    cards.forEach((cardItem:CardData)=>{
      if (cardItem === card) {
        cardItem.status = status;
      }
    });
    setCards([...cards]);
  }

 const cardActions = {
  handlePending: (card: CardData)=>{
    updateStatus(card, 'PENDING');
  },
  handleDone: (card: CardData)=>{
    updateStatus(card, 'DONE');
  },
  handleReject: (card: CardData)=>{
    updateStatus(card, 'REJECTED');
  }
};

const searchCards = (value:string) => {
  cards.forEach((card: CardData) => {
    card.display = card.patient_name.match(value) ? true :  false;
  });
  setCards([...cards]);
}

const handleArrhythmiasFilter = (value: string) => {
  cards.forEach((card: CardData)=>{
    if (value !== 'none') {
      card.display = card.arrhythmias.includes(value) ? true : false;
    } else {
      card.display = true;
    }
  });
  setCards([...cards]);
}

let cardListArr: CardListArr[]= [
  {
    status: 'PENDING',
    cards: pendingCards,
    id: 'pending',
  },{
    status: 'REJECTED',
    cards: rejectedCards,
    id: 'rejected'
  },{
    status: 'DONE',
    cards: doneCards,
    id: 'done'
  }
];

let cardList = cardListArr.map((list:CardListArr) => {
  return list.cards.length ? <CardList key={list.id} cards={list.cards} cardActions={cardActions} status={list.status}></CardList>: null;
});

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
 const value = String(event.target.value);
 searchCards(value);
};

  return cards ? <Box sx={{ marginLeft: '50px'}}>
  <Typography variant='h3' align="center" sx={{ marginTop: '20px' }}>Cards</Typography>
  <Box>
      <TextField
      id="search"
      label="Search Patient"
      onChange={handleInputChange}
      sx={{ marginRight: '50px'}}
      />
      <Select handleArrhythmiasFilter={handleArrhythmiasFilter}/>
    </Box>  
    <Box sx={{
        'display': 'flex',
        'flex-direction': 'row',
    }}>
    {cardList}
    </Box>
  </Box> : null;
}

export default App;
