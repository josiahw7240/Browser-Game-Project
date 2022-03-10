let blackJackGame = {
    you :{
        scoreSpan: '#your-blackjack-result',
        div: '#your-box',
        boxsize: '.flex-blackjack-row-2 div',
        score: 0,
    },

    dealer: {
    
         scoreSpan: '#dealer-blackjack-result',
         div: '#dealer-box',
         boxsize: '.flex-black-row-2 div',
         score: 0,
    },

    cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],

    cardsMap: {
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8, 
        9: 9,
        10: 10,
        J: 10,
        K: 10,
        Q: 10,
        A: [1, 11],
 
    },


   wins: 0,
   losses: 0,
   draws: 0,
   isStand: false,
   isTurnOver: false,
   pressOnce: false,
};


const YOU = blackJackGame['you']
const DEALER = blackJackGame['dealer']

let windowWidth = window.screen.width;
let windowHeight = window.screen.height;
let winner;

document.querySelector("#blackjack-hit-button").addEventListener("click", blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', blackjackStand);

function blackjackHit(){
    if(blackjackGame['isStand'] === false){
        let card = randomCard();
        console.log(card);
        showCard(card, YOU)
        updateScore(card, YOU);
        showScore(YOU)
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackJackGame['cards'][randomIndex];
}

function showCard(card, activePlayer)
{
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement("img");
        cardImage.src = `static/images/${card}.png`;
        cardImage.style = `width:${widthSize()}; height:${heightSize()};`;
        document.querySelector(activePlayer["div"]).appendChild(cardImage);
    }
}

function widthSize()
{
    if(windowWidth > 1000){
        let newWidthSize = window.screen.width * 0.1;
        return newWidthSize;
    }

    else {
        return window.screen.width * 0.18;
    }
}

function heightSize(){
    if(windowHeight > 700){
        letnewHeight = window.screen.height * 0.18;
        return newHeightSize;
    }

    else{
        return window.screen.height * 0.15;
    }
}

function updateScore(card, activePlayer) {
    if (card === "A") {
      if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
        activePlayer["score"] += blackjackGame["cardsMap"][card][1];
      } else {
        activePlayer["score"] += blackjackGame["cardsMap"][card][0];
      }
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card];
    }
  
    console.log(activePlayer["score"]);
  }

  function showScore(activePlayer)
  {
      if(activePlayer['score'] > 21)
      {
          document.querySelector(activePlayer['scoreSpan']).textContent = 'Bust!';
          document.querySelector(activePlayer['scoreSpan']).style.color ='red';
      }

      else 
      {
          document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
      }
  }

  function blackjackStand()
  {
      if(blackjackGame.pressOnce === false){
          blackjackGame['isStand'] = true;
          let yourImages = document.querySelector('#your-box').querySelectorAll('img');
      

      for(let i = 0; i < yourImages.length; i++){
          let card = randomCard();
          showCard(card,DEALER);
          updateScore(card,DEALER);
          showScore(DEALER);
      }

      blackJackGame['isTurnsOver'] = true;

      computeWinner();
      showWinner(winner);
    }

    blackJackGame.pressOnce = true;

  }