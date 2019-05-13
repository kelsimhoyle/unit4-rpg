var isCharacterChosen = false;
var isDefenderChosen = false;
var enemiesDefeated = 0;
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
        var charDiv = $("<div>").addClass("character col-md-6").attr("id", characters[i].name);
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
        $(this).removeClass("col-md-3");

        if (isCharacterChosen) {
            isDefenderChosen = true;
            $(this).chosen = true;
            $(this).addClass("selected defender");
            $("#defender-display").append(this);
        } else {
            $(this).chosen = true;
            isCharacterChosen = true;
            $(this).addClass("selected user");
            $("#user-display").append(this);
        }

        if (isCharacterChosen && isDefenderChosen) {
            $(".character").not(".selected").addClass("not-selected").appendTo("#enemies");
            $("#enemies").show();
            $(".playing").show();
            fight();
        }
    });
}

function playGame() {
    isCharacterChosen = false;
    isDefenderChosen = false;
    enemiesDefeated = 0;
    $(".characters, .defender, .user, .not-selected").remove();
    $("#fighting-messages").empty();
    $("#messages").empty().html("<h2>Are you up for an Adventure Time duelling challenge??</h2><p>First, choose the character that you would like to begin your journey with. Then, chose the character that you would like to challenge to a fight first. Good luck!</p>");
    $(".enemies-div, .playing").hide();
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

    $("#messages").empty().html("<h2>Good Luck!</h2>");
    $("#attack").show();

    $("#attack").on("click", function () {
        var attackMessage = [`${userName} quickly attacked ${defenderName} with ${attack} damage.`,
        `${userName} has launched an attack! ${defenderName} has sustained ${attack} damage.`,
        `${defenderName} has suffered ${attack} damage. Hooray!!!`,
        `${userName} brought the heat and caused ${attack} damage. ${defenderName} isn't looking so great!`
        ]
        var counterMessage = [`${defenderName} fought back and caused ${counterAttack} damage.`,
        `${defenderName} quickly attacked back and caused ${counterAttack} damage.`,
        `${defenderName} launched a counter attack and caused ${counterAttack} damage to ${userName}. Oh no!!`,
        `${userName} has suffered ${counterAttack} damage. Oh no!!!`
        ]

        var playAgain = $("<button>").text("Play Again").addClass("btn-primary btn-block");
        playAgain.on("click", function () {
            playGame();
        });

        function randomAttack() {
            return attackMessage[Math.floor(Math.random() * attackMessage.length)];
        }

        function randomCounter() {
            return counterMessage[Math.floor(Math.random() * counterMessage.length)];
        }

        if (fightOver) return;

        if (fightOver === false) {
            $("#fighting-messages").empty();
            defenderHP -= attack;
            userHP -= counterAttack;
            attackText.text(randomAttack());
            counterText.text(randomCounter());
            $("#fighting-messages").append(attackText).append(counterText);
            attack *= 1.5;
        }

        if (userHP <= 0) {
            fightOver = true;
            $("#fighting-messages").empty();
            $("#attack").hide();
            var lostMessage = $("<p>").text("You lost. Try again?");
            $("#fighting-messages").append(lostMessage).append(playAgain);
        } else if (defenderHP <= 0) {
            fightOver = true;
            enemiesDefeated++;
            $(".user").attr("data-hp", userHP);
            $("#fighting-messages").empty();
            $("#attack").hide();
            var nextOpponent = $("<button>").text("Let's Do This!!").addClass("btn-primary btn-block");
            nextOpponent.on("click", function () {
                chooseNextOpponent();
            });
            if (enemiesDefeated == 3) {
                $("#fighting-messages").html("<p>Congratulations! You defeated all of your enemies!!</p>").append(playAgain);
            } else {
                $("#fighting-messages").html("<p>You Win! Choose your next opponent...</p>").append(nextOpponent);
            }
        }
        $(".user #current-hp").text("HP: " + userHP);
        $(".defender #current-hp").text("HP: " + defenderHP);
    });

}

function chooseNextOpponent() {
    isDefenderChosen = false;
    $("#fighting-messages, #messages").empty();
    $(".defender").remove();
    $("#attack").hide();
    $("#messages").html("<h2> Click your next opponent to enter the arena. Good luck!</h2>");
    $(".character").on("click", function () {
        if ($(this).hasClass("user"))  return;
    

    
            isDefenderChosen = true;
            this.chosen = true;
            $(this).addClass("selected defender");
            $("#defender-display").append(this);
            fight();
    
    });
}

playGame();