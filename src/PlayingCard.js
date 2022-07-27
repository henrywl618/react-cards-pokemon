import React, { useState } from "react";
import backOfCard from "./back.png";
import "./PlayingCard.css"
import { useFlip } from "./hooks";

/* Renders a single playing card. */
function PlayingCard({ front, back = backOfCard }) {
  const [isFacingUp, toggleFlipped] = useFlip();

  return (
    <img
      src={isFacingUp ? front : back}
      alt="playing card"
      onClick={toggleFlipped}
      className="PlayingCard Card"
    />
  );
}

export default PlayingCard;
