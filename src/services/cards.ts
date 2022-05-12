interface Card {
    id: string
    type: string
    img: string
}

interface CardPokemon extends Card {
    type: 'pokemon'
}

interface CardEnergy extends Card {
    type: 'energy'
}

interface CardTrainer extends Card {
    type: 'trainer'
}

interface BoxType {
    id: string
    type: string
    cost: number
}

interface Box {
    id: string
    type: BoxType
    cards: Card[]
}

const allBoxes: BoxType[] = [
    { id: '1', type: 'Comun', cost: 10 },
    { id: '2', type: 'Rara', cost: 50 },
    { id: '3', type: 'Legendaria', cost: 200 },
];

class CardsService {

    private static readonly userCards: Card[] = [];

    public static async UserCards(): Promise<Card[]> {
        return this.userCards;
    }

    public static async GetBoxType(): Promise<BoxType[]> {
        return allBoxes;
    }

    private static async GetCards(): Promise<Card[]> {
        const response = await fetch('https://api.pokemontcg.io/v2/cards');
        const data = await response.json();

        return data.data.map((cardData: any) => {
            return {
                id: cardData.id,
                type: 'pokemon',
                img: cardData.images.large
            }
        })
    }

    public static async OpenBox(boxTypeId: string): Promise<Box> {
        const type = allBoxes.find(box => box.id === boxTypeId);
        if (!type) throw new Error('invalid box type');

        const cards: Card[] = [];

        const allCards = await this.GetCards();

        for (let i = 0; i < 10; i++) {
            const card = allCards[Math.trunc((allCards.length - 1) * Math.random())];

            cards.push(card);
            this.userCards.push(card);
        }

        return {
            id: new Date().toString(),
            type,
            cards
        }
    }

}

export default CardsService;
export type {
    Card,
    CardPokemon,
    CardEnergy,
    CardTrainer,
    BoxType,
    Box
}