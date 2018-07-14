# CardMatchingGame using multiple APIs.
This is a simple card matching game
Idea is to let the player choose any four cards
Then draw four cards from the deck
Reveal both selected cards and drawn cards.
If find a match, player wins. If not match player looses.

https://deckofcardsapi.com/api/deck/new/
{
"success": true,
"deck_id": "8hiu5ygv8h7g",
"shuffled": false,
"remaining": 52
}

https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
{
"success": true,
"deck_id": "ux2hb1no4t1k",
"shuffled": true,
"remaining": 52
}


https://deckofcardsapi.com/api/deck/z1xok980nzmi/draw/?count=4
{
"success": true,
"deck_id": "z1xok980nzmi",
"remaining": 44,
"cards": [
{
"suit": "SPADES",
"images": {
"png": "http://deckofcardsapi.com/static/img/5S.png",
"svg": "http://deckofcardsapi.com/static/img/5S.svg"
},
"image": "http://deckofcardsapi.com/static/img/5S.png",
"code": "5S",
"value": "5"
},
{
"suit": "SPADES",
"images": {
"png": "http://deckofcardsapi.com/static/img/6S.png",
"svg": "http://deckofcardsapi.com/static/img/6S.svg"
},
"image": "http://deckofcardsapi.com/static/img/6S.png",
"code": "6S",
"value": "6"
},
{
"suit": "SPADES",
"images": {
"png": "http://deckofcardsapi.com/static/img/7S.png",
"svg": "http://deckofcardsapi.com/static/img/7S.svg"
},
"image": "http://deckofcardsapi.com/static/img/7S.png",
"code": "7S",
"value": "7"
},
{
"suit": "SPADES",
"images": {
"png": "http://deckofcardsapi.com/static/img/8S.png",
"svg": "http://deckofcardsapi.com/static/img/8S.svg"
},
"image": "http://deckofcardsapi.com/static/img/8S.png",
"code": "8S",
"value": "8"
}
]
}