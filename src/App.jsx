import React, { useState, useEffect } from "react";

const suits = ["♠", "♥", "♦", "♣"];
const ranks = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

const generateDeck = () => {
  const deck = [];
  suits.forEach((suit) => {
    ranks.forEach((rank) => {
      deck.push({ rank, suit });
    });
  });
  return deck.sort(() => Math.random() - 0.5);
};

export default function App() {
  const [columns, setColumns] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const shuffledDeck = generateDeck();
    const newColumns = Array.from({ length: 7 }, (_, i) =>
      shuffledDeck.slice((i * (i + 1)) / 2, ((i + 1) * (i + 2)) / 2)
    );
    setColumns(newColumns);
  }, []);

  const handleCardClick = (colIndex, cardIndex) => {
    const card = columns[colIndex][cardIndex];
    if (selectedCard) {
      const newColumns = [...columns];
      newColumns[selectedCard.colIndex].splice(selectedCard.cardIndex, 1);
      newColumns[colIndex].push(card);
      setColumns(newColumns);
      setSelectedCard(null);
    } else {
      setSelectedCard({ card, colIndex, cardIndex });
    }
  };

  const renderCard = (card, colIndex, cardIndex) => (
    <div
      key={cardIndex}
      onClick={() => handleCardClick(colIndex, cardIndex)}
      style={{
        width: "60px",
        height: "90px",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        marginBottom: "5px",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
        color: ["♥", "♦"].includes(card.suit) ? "red" : "black",
        fontFamily: "Arial, sans-serif",
        fontSize: "20px",
        border: selectedCard?.card === card ? "2px solid yellow" : "none",
      }}
    >
      {`${card.rank}${card.suit}`}
    </div>
  );

  return (
    <div
      style={{
        backgroundColor: "#2e8b57",
        minHeight: "100vh",
        paddingTop: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "white", textAlign: "center", marginBottom: "20px" }}>
        Solitario
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {columns.map((column, colIndex) => (
          <div
            key={colIndex}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "0 10px",
            }}
          >
            {column.map((card, cardIndex) =>
              renderCard(card, colIndex, cardIndex)
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
