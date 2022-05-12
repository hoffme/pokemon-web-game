import Event from './event';

import {Card} from "./cards";

interface Deck {
    id: string
    name: string
    cards: Card[]
}

interface CreateDeckParams {
    name: string
    cards: Card[]
}

interface UpdateDeckParams {
    id: string
    name?: string
    cards?: Card[]
}

class DecksService {

    private static decks: Deck[] = [];

    private static readonly _events = {
        create: new Event<Deck>(),
        update: new Event<Deck>(),
        remove: new Event<Deck>(),
    };
    public static readonly events = {
        create: this._events.create.client,
        update: this._events.update.client,
        remove: this._events.remove.client,
    };

    public static async Decks(): Promise<Deck[]> {
        return this.decks;
    }

    public static async Create(params: CreateDeckParams): Promise<Deck> {
        const deck: Deck = { ...params, id: new Date().toString() };

        this.decks.push(deck);

        this._events.create.notifySync(deck)

        return deck;
    }

    public static async Update(params: UpdateDeckParams): Promise<Deck> {
        const deck: Deck | undefined = this.decks.find(deck => deck.id === params.id);
        if (!deck) throw new Error('deck not found');

        if (params.name) deck.name = params.name;
        if (params.cards) deck.cards = params.cards;

        this._events.update.notifySync(deck);

        return deck;
    }

    public static async Delete(id: string): Promise<void> {
        const deck: Deck | undefined = this.decks.find(deck => deck.id === id);
        if (!deck) throw new Error('deck not found');

        this.decks = this.decks.filter(deck => deck.id !== id);

        this._events.remove.notifySync(deck);
    }

}

export default DecksService;
export type {
    Card,
    Deck,
    CreateDeckParams,
    UpdateDeckParams
}