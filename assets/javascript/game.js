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
        name: "Jake",
        src: "assets/images/jake.png",
        chosen: false,
        attack: 10,
        HP: 120,
        counterAttack: 8
    },
    {
        name: "Lumpy Space Princess",
        src: "assets/images/lsp.png",
        chosen: false,
        attack: 6,
        HP: 90,
        counterAttack: 4
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
        var charDiv = $("<div>").attr("id", characters[i].name).addClass("character");
        var charPic = $("<img>").attr("src", characters[i].src);
        var charName = $("<h3>").text(characters[i].name);
        var charHP = $("<p>").text("HP: " + characters[i].HP);
        $(charDiv).append(charName).append(charPic).append(charHP);
        $("#character-choice").append(charDiv);
    }
}

createCharacters();

// When a character is clicked, then we will chose it to play
$(".character").on("click", function () {
    if (isCharacterChosen && isDefenderChosen) return;

    if (isCharacterChosen) {
        isDefenderChosen = true;
        $("#defender").append(this);
    } else {
        this.chosen = true;
        isCharacterChosen = true;
        $("#user-character").append(this);
    }
});