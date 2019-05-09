var isCharacterChosen = false;
var isDefenderChosen = false;
var opponents = [];
var characters = [
    {
        name: "Finn",
        src: "assets/images/finn.png",
        chosen: false, //not chosen yet
        attack: 8, //changes
        HP: 100,
        counterAttack: 6 //never changes
    },
    {
        name: "Princess Bubblegum",
        src: "assets/images/bubblegum.png",
        chosen: false,
        attack: 6,
        HP: 90,
        counterAttack: 4
    },
    {
        name: "Jake",
        src: "assets/images/jake.png",
        chosen: false,
        attack: 10,
        HP: 120,
        counterAttack: 8
    },
    {
        name: "Marceline the Vampire Queen",
        src: "assets/images/marceline.png",
        chosen: false,
        attack: 12,
        HP: 130,
        counterAttack: 12
    }
];



// create characters to go on the screen
function createCharacters() {
    for (var i = 0; i < characters.length; i++) {
        var charDiv = $("<div>").addClass("character").attr("id", characters[i].name);
        charDiv.attr("data-attack", characters[i].attack).attr("data-hp", characters[i].HP).attr("data-counterattack", characters[i].counterAttack);
        var charPic = $("<img>").attr("src", characters[i].src);
        var charName = $("<h3>").text(characters[i].name);
        var charHP = $("<p>").text("HP: " + characters[i].HP).attr("id", "current-hp");
        $(charDiv).append(charName).append(charPic).append(charHP);
        $("#character-choice").append(charDiv);
    }
}


function choseCharacters() {
    // When a character is clicked, then we will chose it to play
    $(".character").on("click", function () {
        if (isCharacterChosen && isDefenderChosen) return;

        if (isCharacterChosen) {
            isDefenderChosen = true;
            this.chosen = true;
            $(this).addClass("selected defender");
            $("#defender-display").append(this);
        } else {
            this.chosen = true;
            isCharacterChosen = true;
            $(this).addClass("selected user");
            $("#user-display").append(this);
        }
        
        if (isCharacterChosen && isDefenderChosen) {
            $(".character").not(".selected").appendTo("#enemies");
            $("#enemies").show();
            $(".playing").show();
            fight();
        }
    });
}

function playGame() {
    isCharacterChosen = false;
    isDefenderChosen = false;
    $("#messages, #user-display, #defender-display, #character-choice").empty();
    $("#enemies").hide();
    $(".playing").hide();
    createCharacters();
    choseCharacters();
}


function fight() {
    // values needed in order to play
    var userName = $(".user").attr("id");
    var defenderName = $(".defender").attr("id");
    var userHP = parseInt($(".user").attr("data-hp"));
    var attack = parseInt($(".user").attr("data-attack"));
    var defenderHP = parseInt($(".defender").attr("data-hp"));
    var counterAttack = parseInt($(".defender").attr("data-counterattack"));
    var fightOver = false;
    var roundText = $("<div>").addClass("round-text");
    var attackText = $("<p>").addClass("attack-text");
    var counterText = $("<p>").addClass("counter-text");

    $("#attack").on("click", function () {

         var messages = [
            {
                attackMessage: userName + " quickly attacked " + defenderName + " with " + attack + " damage. ",
                counterMessage: defenderName + " fought back and caused " + counterAttack + " damage."
            },
            {
                attackMessage: userName + " has launched an attack! " + defenderName + " has sustained " + attack + " damage.",
                counterMessage: defenderName + " quickly attacked back and caused " + counterAttack + " damage. "
            }
        ]

        function randomAttack() { 
            return messages[Math.floor(Math.random() * messages.length)].attackMessage;
        }

        function randomCounter() {
            return messages[Math.floor(Math.random() * messages.length)].counterMessage;
        }

        if (fightOver) return;


        if (userHP <= 0) {
            fightOver = true;
            $("#messages").empty();
            var lostMessage = $("<p>").text("You lost. Try again?");
            var playAgain = $("<button>").text("Play Again")
            playAgain.on("click", function () {
                playGame();
            });
            $("#messages").append(lostMessage).append(playAgain);
        } else if (defenderHP <= 0) {
            fightOver = true;
            $("#messages").empty();
            var winMessage = $("<p>").text("You Win! Choose your next opponent...");
            var nextOpponent = $("<button>").text("Let's Do This!!");
            nextOpponent.on("click", function() {
                chooseNextOpponent();
            });
            $("#messages").append(winMessage).append(nextOpponent);
        } else {
            $("#messages").empty();
            defenderHP -= attack;
            userHP -= counterAttack;
            attackText.text(randomAttack());
            counterText.text(randomCounter());
            roundText.append(attackText).append(counterText);
            $("#messages").append(roundText);
        }

        $(".user #current-hp").empty().text(userHP);
        $(".defender #current-hp").empty().text(defenderHP);
    });

}

function chooseNextOpponent() {
    isDefenderChosen = false;
    $("#defender-display, #messages").empty();
    $("#attack").hide();
    var instructions = $("<h2>").text("Click your next opponent to enter the arena. Good luck!");
    $("#messages").append(instructions);
    choseCharacters();

    
}

playGame();