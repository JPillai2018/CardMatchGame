//A  Simple Card Game
$(document).ready(function(){

//Game Code begins
        // Golbal variable section begins
        var deckId = "";
        var cardsRemaining = parseInt(52);
        var cardValue = "";
        var cardSuite = "";
        var cardCode = "";
        var selectCount = 0;
        var countDraw = 4;
        var valuePicked, suitePicked = false;
        var selectedCards = [];
        var drawnCards = [];
        drawCardNow = false;
        // Golbal variable section ends
        var i=0;

        // Initial Load function creates buttons from the array.
        initialLoad();
        // Getting a new deck of cards. This will return a Deck_Id
        newDeckCards();
        // Shuffling the selected deck. This will make sure cards are shuffled first time. Otherwise returned cadrs may be of same pattern
        shuffleCards();

        function initialLoad(){
            $("#imgrow1col1").css('background-image', 'url("assets/images/PlayingCard-front2.jpg")');
            $("#imgrow1col2 img").css('background-image', 'url("assets/images/PlayingCard-front2.jpg")');
            $("#imgrow2col1 img").css('background-image', 'url("assets/images/PlayingCard-front2.jpg")');
            $("#imgrow2col2 img").css('background-image', 'url("assets/images/PlayingCard-front2.jpg")');
            document.getElementById("bttnGameStart").disabled = false;  
            document.getElementById("bttnDrawCard").disabled = true;  
            $("#bttnDrawCard").attr("class", "btnStart btn-warning");
            $("#message").html("Choose Your choice of any four cards to Play");
        };
        
        // This function Pulls a Deck of Cards- For this game, we do this first time time. This call returns the Deck Id , which will be sued for subsequent calls.
        function newDeckCards(){
            var queryURL = "https://deckofcardsapi.com/api/deck/new/";

            $.ajax({
                url: queryURL,
                method: "GET"
            })
              .then(function(response) {
              // Following code fetches the response from the query
              deckId = response.deck_id;
            });
        };


        
        function shuffleCards(){
          // Shuffle the cards
          var queryURL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
          var currentDeckId = deckId;

          $.ajax({
              url: queryURL,
              method: "GET"
          })
            .then(function(response) {
            // Following code fetches the response from the query
            deckId = response.deck_id;
          });
      };

        function reShuffleCards(){
            // Re-shuffle the cards
            var currentDeckId = deckId;
            var queryURL = "https://deckofcardsapi.com/api/deck/" + currentDeckId + "/shuffle/";

            $.ajax({
                url: queryURL,
                method: "GET"
            })
              .then(function(response) {
              // Following code fetches the response from the query
              deckId = response.deck_id;
            });
        };

        // Drawing 4 Cards randomly from the deck.
        function drawACard(){
            reShuffleCards();

            drawnCards = [];
            var currentDeckId = deckId;
            var countToDraw = countDraw;

            var queryURL = "https://deckofcardsapi.com/api/deck/" + currentDeckId + "/draw/?count=" + countDraw;

            $("imageCards").empty();
            $.ajax({
                url: queryURL,
                method: "GET"
                }).then(function(response) {
                var count = response.cards.length;
                var k = 1;
                $(".imagePCards").empty();
                for (var i= 0; i < response.cards.length; i++){
                    var itm = "itm" + k;
                    k++;
                    drawnCards.push(response.cards[i].code);
                    var imageDrawnCards = $("<div class='imgitm' id='" + itm + "'>");
                    $(".imageCards").append(imageDrawnCards);
                    //Create Image Tag dynamically
                    var cardImage = $("<img>");
    
                    //Setting Image Attributes
                    //cardImage.attr("src", response.cards[i].images.png);
                    cardImage.attr("src", response.cards[i].image);
                    //cardImage.attr({"class": "cardImg"});
                    cardImage.attr({"width": "150"});
                    cardImage.attr({"height": "200"});
                    //cardImage.attr({"float": "left"});
                    $(imageDrawnCards).append(cardImage);
                    //Flipping the player selected cards
                    var imgId = selectedCards[i];
                    var pURL = 'https://deckofcardsapi.com/static/img/' + imgId + '.png';
                    var imagePlayerCards = $("<div class='imgitm' id='" + itm + "'>");
                    $(".imagePCards").append(imagePlayerCards);
                    var cardPImage = $("<img>");
                    cardPImage.attr("src", pURL);
                    //cardPImage.attr({"class": "cardImg"});
                    cardPImage.attr({"width": "150"});
                    cardPImage.attr({"height": "200"});
                    $(imagePlayerCards).append(cardPImage);
                  };

                  document.getElementById("bttnDrawCard").disabled = true; 
                  $("#bttnDrawCard").attr("class", "btnStart btn-warning");
                  //drawnCards.sort();

                  drawnCards.length = 0;

                  var cardsMatchFound = true;
                  if (selectedCards.length !== drawnCards.length){
                    cardsMatchFound = false;
                  }
                  else{
                      for (var k = 0; k < drawnCards.length; k++){
                        if (selectedCards[k] !== drawnCards[k]){
                          cardsMatchFound = false;
                        }
                      }
                  }
                  if (cardsMatchFound === true){
                      $("#message").html("You Won!!!");
                  }
                  else{
                    $("#message").html("Sorry! No match this time. Try again!!!");
                  }
            });
        };

        // Game Start Function- This function does necessary house keeping before a fresh game. 
        // Also reshuffles the deck.
        function gameStart(){
          // First Step is to shuffle the card once more  
          $("#message").html("Choose Your choice of any four cards to Play.");
          valuePicked = false;
          suitePicked = false;
          selectCount = 0;
          drawCardNow = false;
          document.getElementById("bttnDrawCard").disabled = true;  
          $("#bttnDrawCard").attr("class", "btnStart btn-warning");
          selectedCards.length = 0;  
          drawnCards.length = 0;  
          $(".imageCards").empty();
          $(".imagePCards").empty();
          // Shuffle cards before start of the game
          reShuffleCards();
      };

    // Button click logic
    $("#bttnGameStart").on("click", gameStart);

    $("#bttnDrawCard").on("click", drawACard);

    $(".btn").click(function(){
        var bttnValue = this.id;
        bttnValue = bttnValue.substr(4);
        if (bttnValue === 'S' || bttnValue === 'H' || bttnValue === 'D' || bttnValue === 'C'){
            cardSuite = bttnValue;
            suitePicked = true;
        }
        else
        {
            valuePicked = true;
            if (bttnValue === '10'){
                cardValue = bttnValue.substring(1);
            }
            else{
                cardValue = bttnValue;
            }
        }
        // Checking if more than 4 cards are selected. If so It is time to Draw the Cards
        if (drawCardNow === false) {
            if (valuePicked && suitePicked){
                selectCount++;
                var itm = 0;
                if (selectCount === 1){
                    itm = "itm" + selectCount;
    
                    valuePicked = false;
                    suitePicked = false;
                    var imagePlayerCards = $("<div class='imgitm' id='" + itm + "'>");
                    $(".imagePCards").append(imagePlayerCards);
                    var cardPImage = $("<img>");
                    //cardPImage.attr("src", "assets/images/PlayingCard-front1.jpg");
                    cardPImage.attr("src", "assets/images/playing-cards-aviator-1.png");
                    cardPImage.attr({"class": "cardImg"});
                    cardPImage.attr({"width": "150"});
                    cardPImage.attr({"height": "200"});
                    $(imagePlayerCards).append(cardPImage);
                    selectedCards.push(cardValue + cardSuite);
                    $("#message").html("Choose three more cards to Play.");
                }
                if (selectCount === 2){
                    itm = "itm" + selectCount;
    
                    valuePicked = false;
                    suitePicked = false;
                    var imagePlayerCards = $("<div class='imgitm' id='" + itm + "'>");
                    $(".imagePCards").append(imagePlayerCards);
                    var cardPImage = $("<img>");
                    //cardPImage.attr("src", "assets/images/PlayingCard-front1.jpg");
                    cardPImage.attr("src", "assets/images/playing-cards-aviator-2.png");
                    cardPImage.attr({"class": "cardImg"});
                    cardPImage.attr({"width": "150"});
                    cardPImage.attr({"height": "200"});
                    $(imagePlayerCards).append(cardPImage);
                    selectedCards.push(cardValue + cardSuite);
                    $("#message").html("Choose two more cards to Play.");
                }
                if (selectCount === 3){
                    itm = "itm" + selectCount;
    
                    valuePicked = false;
                    suitePicked = false;
                    var imagePlayerCards = $("<div class='imgitm' id='" + itm + "'>");
                    $(".imagePCards").append(imagePlayerCards);
                    var cardPImage = $("<img>");
                    //cardPImage.attr("src", "assets/images/PlayingCard-front1.jpg");
                    cardPImage.attr("src", "assets/images/playing-cards-aristocrat-1.png");
                    cardPImage.attr({"class": "cardImg"});
                    cardPImage.attr({"width": "150"});
                    cardPImage.attr({"height": "200"});
                    $(imagePlayerCards).append(cardPImage);
                    selectedCards.push(cardValue + cardSuite);
                    $("#message").html("Choose one more card to Play.");
                }
                if (selectCount === 4){
                    itm = "itm" + selectCount;
    
                    valuePicked = false;
                    suitePicked = false;
                    selectCount = 0;
                    drawCardNow = true;
                    var imagePlayerCards = $("<div class='imgitm' id='" + itm + "'>");
                    $(".imagePCards").append(imagePlayerCards);
                    var cardPImage = $("<img>");
                    //cardPImage.attr("src", "assets/images/PlayingCard-front1.jpg");
                    cardPImage.attr("src", "assets/images/playing-cards-superior-classic-back-1.png");
                    cardPImage.attr({"class": "cardImg"});
                    cardPImage.attr({"width": "150"});
                    cardPImage.attr({"height": "200"});
                    $(imagePlayerCards).append(cardPImage);
                    selectedCards.push(cardValue + cardSuite);
                    document.getElementById("bttnDrawCard").disabled = false;  
                    $("#bttnDrawCard").attr("class", "btnStart btn-success");
                    $(this.id).css('color', 'red');
                    $("#message").html("Press Draw the Card Button now.");
                }
            }
        }

   });
//Game code ends
});











