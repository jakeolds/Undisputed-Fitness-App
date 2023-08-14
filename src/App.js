import React, { useState } from 'react';
import './App.css';

function App() {
  const [deck, setDeck] = useState(createDeck());
  const [discardPile, setDiscardPile] = useState([]);

  const showNextCard = () => {
    if (deck.length > 0) {
      setDiscardPile([...discardPile, deck[0]]);
      setDeck(deck.slice(1));
    }
  };

  return (
    <div className="container mt-5">
      <div className="deck-area" onClick={showNextCard}>
        {deck.map((_, index) => (
          <div key={index} className={`remaining-card ${index === 0 ? "top-card" : ""}`}></div>
        ))}
      </div>

      <div className="discard-pile">
        {discardPile.map((card, index) => (
          <span key={index} className={`shown-card ${card.suit === "♥" || card.suit === "♦" ? "text-danger" : "text-dark"}`}>
            {card.value}{card.suit}
          </span>
        ))}
      </div>
    </div>
  );
}

function createDeck() {
  const suits = ['♠', '♣', '♥', '♦'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  let deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return shuffle(deck);
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export default App;