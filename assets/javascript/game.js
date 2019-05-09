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
        var charHP = $("<p>").text("HP: " + characters[i].HP);
        $(charDiv).append(charName).append(charPic).append(charHP);
        $("#character-choice").append(charDiv);
    }
}


function playGame() {
    $("#enemies").hide();
    $(".playing").hide();
    createCharacters();

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
                attackMessage: userName + " quickly attacked " + defenderName + " with " + attack + " damage. " + defenderName + " has " + defenderHP + " left.",
                counterMessage: defenderName + " fought back and caused " + counterAttack + " damage on " + userName + ". Leaving " + userName + " with " + userHP + " HP left."
            },
            {
                attackMessage: userName + " has launched an attack! " + defenderName + " has sustained " + attack + " damage and has " + defenderHP + " HP remaining.",
                counterMessage: defenderName + " quickly attacked back and caused " + counterAttack + " damage. " + userName + " has " + userHP + " remaining."
            }
        ]

        function randomAttack() {
            return messages[Math.floor(Math.random() * messages.length)].attackMessage;
        }

        function randomCounter() {
            return messages[Math.floor(Math.random() * messages.length)].counterMessage;
        }

        if (fightOver) return;

        $("#messages").empty();
        defenderHP -= attack;
        attack += 5;
        userHP -= counterAttack;
        attackText.text(randomAttack());
        counterText.text(randomCounter());
        roundText.append(attackText).append(counterText);
        $("#messages").append(roundText);

        if (userHP <= 0) {
            fightOver = true;
            var lostMessage = $("<p>").text("You lost. Try again?");
            var playAgain = $("<button>").text("Play Again")
            playAgain.on("click", function () {
                playGame();
            });
            $("#messages").append(lostMessage).append(playAgain);
        } else if (defenderHP <= 0) {
            fightOver = true;
            var winMessage = $("<p>").text("You Win! Choose your next opponent...");
            $("#messages").append(winMessage);
        }

    });
}


playGame();