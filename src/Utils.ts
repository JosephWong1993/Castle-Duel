import { Player } from "./common/Models";
import Cards from "./Cards";
import State from "./State";

// WORLD

function getWorldRatio() {
  return 1 / 1920 * window.innerWidth
}

// GAME

// Pile

// function drawCard() {
//   if (getDrawPileCount() === 0) {
//     refillPile()
//   }

//   const choice = Math.round(Math.random() * (getDrawPileCount() - 1)) + 1

//   let accumulation = 0
//   for (let k in State.drawPile) {
//     accumulation += State.drawPile[k]
//     if (choice <= accumulation) {
//       // Draw the card from the pile
//       State.drawPile[k]--
//       return {
//         id: k,
//         uid: State.cardUid++,
//         def: Cards[k],
//       }
//     }
//   }
// }

function addCardToPile(pile, cardId) {
  if (typeof pile[cardId] === 'number') {
    pile[cardId]++
  } else {
    pile[cardId] = 1
  }
}



// Card play

// function applyCardEffect(card) {
//   State.currentPlayer.lastPlayedCardId = card.id
//   card.def.play(State.currentPlayer, State.currentOpponent)
//   // Check if the stats (health, food) are not outside the boundaries
//   State.players.forEach(checkStatsBounds)
// }

function getLastPlayedCard(Cards: any, player: Player) {
  return Cards[player.lastPlayedCardId];
}

// Player

function checkPlayerLost(player: Player) {
  player.dead = (player.health === 0 || player.food === 0)
}

function isOnePlayerDead() {
  return State.players.some(p => p.dead)
}

export default {
  getWorldRatio,
  getLastPlayedCard,
  addCardToPile,
  checkPlayerLost,
  isOnePlayerDead,
};
