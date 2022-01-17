class Card {
    cardId = 0;
    rotation = 0;

    async init() {
        const response = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        this.cardId = response.data.deck_id;
            console.log(this.cardId);
            this.getNewCard();                                                          
    }

    async getNewCard() {
        let response = await axios.get(`http://deckofcardsapi.com/api/deck/${this.cardId}/draw/?count=1`)
        const card1 = response.data.cards[0]
        console.log(card1.value)
        console.log(card1.suit)

        response = await axios.get(`http://deckofcardsapi.com/api/deck/${this.cardId}/draw/?count=1`)
        const card2 = response.data.cards[0]
        console.log(card2.value)
        console.log(card2.suit)
    }

    async appendCardImage() {
        const response = await axios.get(`http://deckofcardsapi.com/api/deck/${this.cardId}/draw/?count=1`)
        const card = response.data.cards[0]
        const newImg = document.createElement("img");
        newImg.style.position = "absolute";
        newImg.style.top = "60px"
        newImg.style.left = "100px"
        newImg.style.transform = `rotate(${this.rotation}deg)`;
        this.rotation += 30;
        newImg.setAttribute("src", card.image)
        document.getElementById("img-section").appendChild(newImg)
    }

}

const card = new Card();
card.init()
const newButton = document.getElementById("new-card");
newButton.addEventListener("click", event => {
    card.appendCardImage()
})