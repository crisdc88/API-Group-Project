var gameBox = $("#gameInfoBox")
var minPlayers = "";
var maxPlayers = "";
var maxPrice = "&lt_msrp=" + 1000;

var mechanicID = "fBOTEBUAmV";
var categoryID = "ODWOjWAJj3";

function searchGames(){
    event.preventDefault();

    var name = "name=" + $("#nameInput").val().trim();
    var exactName = false;

    if(exactName === true){
        name = name + "&exact=true";
        console.log(name);
    }

    addMinPlayers();
    addMaxPlayers();
    addMaxPrice();
    addMechanic();
    
    var queryURL = "https://www.boardgameatlas.com/api/search?" + name + minPlayers + maxPlayers + maxPrice + "&client_id=NHfcsxreTb";
    console.log(queryURL);
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        gameBox.empty();
        console.log(response);

            for( var i = 0; i<response.games.length; i++){
                if(checkCategory(response.games[i], categoryID) === true && checkMechanics(response.games[i], mechanicID) === true){
                        console.log("worker Placement");
                        var header = $("<h3>");
                        header.text(response.games[i].name);
                        var img = $("<img>");
                        img.attr("src", response.games[i].images.small)
                        $("#gameInfoBox").append(header, img);
                }
            }    
        
        })
}

$("#searchGames").on("click", searchGames);

function addMinPlayers(){
    var number = parseInt($("#minPlayersInput").val().trim());
    minPlayers = "&gt_min_players=" + (number - 1);
    $("#minPlayersDisplay").text("Minimum Players: " + number);
    console.log(minPlayers);
}

function addMaxPlayers(){
    var number = parseInt($("#maxPlayersInput").val().trim());
    maxPlayers = "&lt_max_players=" + (number + 1);
    $("#maxPlayersDisplay").text("Maximum Players: " + number)
    console.log(maxPlayers);
}

function addMaxPrice(){
    event.preventDefault();
    if($("#maxPriceInput").val()){
        var number = parseInt($("#maxPriceInput").val().trim());
        maxPrice = "&lt_msrp=" + (number + 0.01);
        $("#maxPriceDisplay").text("Maximum Price (MSRP): $" + number);
    }
    console.log(maxPrice);
}

function addMechanic(){
    event.preventDefault();
    var mechanic = $("#mechanicInput").val().trim();
    
    $("#mechanicDisplay").text("Mechanic: " + mechanic);
    console.log(mechanic);
}

function checkMechanics(game, mechID){
    var array = game.mechanics;
    for(var j = 0; j < array.length; j++){
        if(array[j].id === mechID){
            return true;
        }
    }
}

function checkCategory(game, catID){
    var array = game.categories;
    for(var i=0; i<array.length; i++){
        if (array[i].id === catID){
            return true;
        }
    }
}

function clearSearch(){
    gameBox.empty
}