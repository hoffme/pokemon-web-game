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

const allCards: Card[] = [
    { id: '1', type: 'pokemon', img: 'https://images.pokemontcg.io/base1/1_hires.png' },
    { id: '1', type: 'energy', img: 'https://images.pokemontcg.io/base1/2_hires.png' },
    { id: '1', type: 'trainer', img: 'https://images.pokemontcg.io/base1/3_hires.png' },
];

class CardsService {

    private static readonly userCards: Card[] = [];

    public static async UserCards(): Promise<Card[]> {
        return this.userCards;
    }

    public static async GetBoxType(): Promise<BoxType[]> {
        return allBoxes;
    }

    public static async OpenBox(boxTypeId: string): Promise<Box> {
        const type = allBoxes.find(box => box.id === boxTypeId);
        if (!type) throw new Error('invalid box type');

        const cards: Card[] = [];

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