import React, { useState } from 'react';
import './App.css';

function App() {
  const [deck, setDeck] = useState(generateDeck());
  const [shown, setShown] = useState([]);

  function generateDeck() {
    const suits = ['♠', '♣', '♦', '♥'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    let deck = [];

    for (let suit of suits) {
      for (let value of values) {
        deck.push({ value: value + suit, zIndex: 0 });
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

  const handleCardClick = () => {
    if (deck.length === 0) return;

    let currentDeck = [...deck];
    let card = currentDeck.pop();

    card.zIndex = new Date().getTime();

    setShown([...shown, card]);
    setDeck(currentDeck);
  };

  return (
    <div className="container">
      <div className="deck-area" onClick={handleCardClick}>
        {deck.map(card => (
          <div key={card.value} className="remaining-card">
            <div className="card-back"></div>
            <div className="card-front">
              {card.value}
            </div>
          </div>
        ))}
      </div>

      <div className="discard-pile">
        {shown.map(card => (
          <div key={card.value} className="shown-card" style={{ zIndex: card.zIndex }}>
            <div className="card-back"></div>
            <div className="card-front">
              {card.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;