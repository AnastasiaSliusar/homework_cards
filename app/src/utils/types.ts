export type statusType = 'PENDING' | 'DONE'| 'REJECTED';
export type buttonNameType = 'pending' | 'done'| 'reject';

export interface CardData {
    arrhythmias: Array<string>;
    created_date: string;
    id: number;
    patient_name: string;
    status: statusType;
    display?: boolean;
}

export interface CardActionsProps {
    handlePending: (card: CardData)=> void;
    handleDone: (card: CardData)=> void;
    handleReject: (card: CardData)=> void;
}

export interface CardListProps {
    cards: CardData[];
    status: statusType;
    cardActions: CardActionsProps;
}

export interface CardProps {
    card: CardData;
    cardActions: CardActionsProps;
}
export interface CardListArr {
    status: statusType,
    cards: CardData[];
    id: string;
}

export interface Search {
    handleArrhythmiasFilter: (value: string)=>void
}
