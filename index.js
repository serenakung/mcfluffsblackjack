let cardsEl = document.getElementById("cards-el")
let gameMessages = document.getElementById("message")
let sumEl = document.getElementById("sum-el")
let playerEl = document.getElementById("player-el")
let dealerCards = document.getElementById("dealer-cards")
let dealerSum = document.getElementById("dealer-sum")
let playerChips = document.getElementById("player-chips")
let playerBet = document.getElementById("player-bet")

let player = {
    chips: 100,
    cards: [],
    sum: 0,
    isAlive: false,
    hasBlackjack: false,
    message: " ",
    stands: false,
    bet: 0
}

let dealer = {
    cards: [],
    sum: 0,
    dealerIsAlive: true,
    dealerHasBlackjack: false
}

playerChips.textContent += player.chips
playerBet.textContent += player.bet

function getRandomCard() {
    return Math.floor(Math.random() * 10+2)
}

function startGame () {
    player.cards = 0
    dealer.sum = 0
    player.sum = 0
    player.bet = 0
    player.isAlive = true
    player.stands = false
    player.hasBlackjack = false
    dealer.dealerIsAlive = true
    dealer.dealerHasBlackjack = false
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    player.cards = [firstCard, secondCard]
    cardsEl.textContent = firstCard + ", " + secondCard
    player.sum = firstCard + secondCard
    sumEl.textContent = player.sum
    playerBet.textContent = player.bet
    dealer.cards = [getRandomCard(),getRandomCard()]
    for (let i = 0; i < dealer.cards.length; i+= 1) {
        console.log(dealer.cards[i])   
       }
    dealerCards.textContent = dealer.cards[0]
    dealer.sum = dealer.cards[0] + dealer.cards[1]
    dealerSum.textContent = dealer.sum
    console.log(dealer.sum)
    renderGame()
}


function renderGame() {
    if (player.sum < 21) {
        gameMessages.textContent = "Do you want another card?"
    } else if (player.sum === 21) {
        gameMessages.textContent = "What's your next move?"
        player.hasBlackjack = true
    } else if (player.sum > 21) {
        gameMessages.textContent = "Oops, busted!"
        player.isAlive = false
        console.log(player.bet)
        console.log(player.chips)
        playerChips.textContent = player.chips - player.bet
    }
}

function newCard() {
    if (player.isAlive===true && player.hasBlackjack === false && player.stands === false) {
        let card = getRandomCard()
        player.cards.push(card)
        cardsEl.textContent += ", " + card
        player.sum += card
        sumEl.textContent = player.sum
        console.log(player.cards)
        console.log(dealer.cards)
    } 
    renderGame()
}

function winGame() {
    if (player.cards.length === 5 || player.stands === true || player.sum === 21) {
        console.log(player.cards.length, player.stands, player.sum)
        console.log(player.cards.length === 5 || player.stands === true || player.sum === 21)
        if (dealer.sum === 21 && dealer.sum > player.sum){
            console.log("i'm here")
            dealerCards.textContent = dealer.cards
            dealer.dealerHasBlackjack === true
            player.isAlive === false
            gameMessages.textContent = "House wins."
            player.chips = player.chips - player.bet
            console.log(player.chips)
            playerChips.textContent = player.chips
        } else if (dealer.sum > 16 && player.sum > dealer.sum) {
            gameMessages.textContent = "You win!"
            dealer.isAlive === false
            player.isAlive === false
            player.chips = player.chips + (player.bet * 1.5)
            console.log(player.chips)
            playerChips.textContent = player.chips
        } else if (dealer.sum <= 21 && dealer.sum > player.sum) {
            gameMessages.textContent = "House wins. You lost."
            player.isAlive === false
            player.chips = player.chips - player.bet
            playerChips.textContent = player.chips
        } else if (dealer.sum > 21) {
            gameMessages.textContent = "House busted. You win."
            player.isAlive=== false
            dealer.isAlive === false
            console.log(player.chips)
            player.chips = player.chips + (player.bet * 1.5)
            playerChips.textContent = player.chips
        } else if (player.sum > dealer.sum) {
            gameMessages.textContent = "You won!"
            dealer.isAlive === false
            player.isAlive === false
            console.log(player.chips)
            player.chips = player.chips + (player.bet * 1.5)
            playerChips.textContent = player.chips
        } 
        ///else if (player.sum === dealer.sum) { gameMessages.textContent = "Draw. Bet returns to player." player takes back her bet }
        else {
            console.log("Oh no I'm here")
        }
    }
}

function bet() {
    player.bet += 10
    console.log("player places $10 bet.")
    console.log(player.bet)
    playerBet.textContent = player.bet
}

function stand() {
    player.stands = true,
    gameMessages.textContent = ""
    winGame()
    console.log(player.stands)
    dealerFive()
}

function dealerFive() {
    if (dealer.cards.length < 5 && dealer.sum < 21) {
        let card = getRandomCard()
            dealer.cards.push(card)
            dealer.sum += card
                for (let i = 0; i < dealer.cards.length; i+= 1) {
                    console.log(dealer.cards[i])   
                }
            dealerCards.textContent = dealer.cards
            dealerSum.textContent = dealer.sum
            console.log("dealerFive")
            dealerFive()
    } else if (dealer.cards.length === 5 || dealer.sum === 21) {
        winGame()
    }
}