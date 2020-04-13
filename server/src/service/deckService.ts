import { Service } from 'typedi';
import { Card, Deck, BASE_DECK, SUIT_ABBREVIATIONS } from '../../../shared/models/cards';
import { Hand as HandSolver } from 'pokersolver';

@Service()
export class DeckService {
    newDeck() {
        const deck = { cards: [...BASE_DECK] };
        this.shuffleDeck(deck);
        return deck;
    }

    shuffleDeck(deck: Deck) {
        let i,
            j = 0;
        let temp = null;
        const cards = deck.cards;

        for (i = cards.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }
    }

    drawCard(deck: Deck) {
        return deck.cards.pop();
    }
}
