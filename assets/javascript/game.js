//A  Simple Card Game
$(document).ready(function(){

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

        initialLoad();
        var i=0;

        // Initial Load function creates buttons from the array.
        initialLoad();
        keyboardReset("E");
        newDeckCards();

        function initialLoad(){
            $("#imgrow1col1").css('background-image', 'url("assets/images/PlayingCard-front2.jpg")');
            $("#imgrow1col2 img").css('background-image', 'url("assets/images/PlayingCard-front2.jpg")');
            $("#imgrow2col1 img").css('background-image', 'url("assets/images/PlayingCard-front2.jpg")');
            $("#imgrow2col2 img").css('background-image', 'url("assets/images/PlayingCard-front2.jpg")');
            document.getElementById("bttnGameStart").disabled = false;  
            document.getElementById("bttnDrawCard").disabled = true;  
            $("#bttnDrawCard").attr("class", "btnStart btn-warning");
            $("#message").html("Choose you choice of any four cards. Once done, press Draw Cards!");
        };
        
        // Initial Button Reset
        function keyboardReset(btnRst){
            var bttnreset = "";
            for (var i =0; i < 27; i++){
                var j= i;
                if (i===0){j = "A"};
                if (i===1){j = "10"};
                if (i===10){j = "K"};
                if (i===11){j = "Q"};
                if (i===12){j = "J"};

                bttnreset = "bttn" + j;
                if (btnRst === "E"){
 
                }
                else{
    
                }
            }
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

        function gameStart(){
            // First Step is to shuffle the card once more  
            $("#message").html("Choose you choice of any four cards. Once done, press Draw Cards!");
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
            shuffleCards();
        };

        function shuffleCards(){
            // shuffle the cards
            var queryURL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

            $.ajax({
                url: queryURL,
                method: "GET"
            })
              .then(function(response) {
              // Following code fetches the response from the query
              deckId = response.deck_id;
            });
        };

        function drawACard(){

            // Drawing a card randomly
            //https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2

            // Sorting existing selected Cards array
            selectedCards.sort();  
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
                // Create CODE HERE to Log the queryURL

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
                  drawnCards.sort();
                  if (selectedCards === drawnCards){
                      $("#message").html("You Won!!!");
                  }
                  else{
                    $("#message").html("Sorry!. Try again!!!");
                  }
            });
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
                }
            }
        }

   });
});











