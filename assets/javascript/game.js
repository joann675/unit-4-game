$(document).ready(function () {

    setHealth();

    $("#myButton").on("click", function () {
        if (!$(".defenderSection").children().length)
            console.log("Need to pick a defender first");
        else {
            var defender = $(".defenderSection").children();
            var myCharacter = $(".yourCharacterSection").children();
            // attack decreases defenders health and increases my attackPower
            console.log("health = " + defender.children(".health").text());
            console.log("attack = " + myCharacter.attr("attackPower"));
            var defHealth = defender.children(".health").text() -
                myCharacter.attr("attackPower");
            defender.children(".health").text(defHealth);
            var original = myCharacter.attr("originalPower");
            var current = myCharacter.attr("attackPower");
            myCharacter.attr("attackPower", parseInt(current) + parseInt(original));
            if (parseInt(defHealth) <= 0) {
                // This enemy has been defeatet, remove them from the game
                $(".defenderSection").empty();
                // Check if any more enemies are available to fight
                if (!$(".availableEnemiesSection").children().length) {
                    alert("You win");
                }

            }
            else {

                // counterAttack decreases my health
                var myHealth = myCharacter.children(".health").text() -
                    defender.attr("counterattackpower");
                myCharacter.children(".health").text(myHealth);
                if (parseInt(myHealth) <= 0) {
                    // You have been defeated
                    alert("You lose");
                }
            }
        }

    })

    $(".imgContainer").on("click", function () {
        console.log("In on click for availableCharacter class");
        var characterChosen = $(this);
        var myParent = $(this).parent();
        if (myParent.attr("class") === "availableSection") {

            console.log("Your character " + $(this).text());

            $(".yourCharacterSection").append(characterChosen);


            $(".availableSection").children(".imgContainer").each(function () {
                var characterToMove = $(this);
                $(".availableEnemiesSection").append(characterToMove);
            });
        }
        else {
            console.log("Your current enemy id " + $(this).text());
            var enemyChosen = $(this);


            $(".defenderSection").append(enemyChosen);
        }
    });

});

function setHealth() {
    console.log("Inside of setHealth")
    $(".availableSection").children(".imgContainer").each(function () {
        console.log("Generating health");
        var health = Math.floor(Math.random() * 150) + 51; // 51 - 200
        console.log("Health = " + health);
        var attack = Math.floor(Math.random() * 25) + 1; //  1 - 25
        console.log("attack = " + attack);
        var counter = Math.floor(Math.random() * 25) + 1; //  1 - 25
        console.log("counter = " + counter);
        var character = $(this);
        character.children(".health").text(health);


        character.attr("attackPower", attack);
        character.attr("originalPower", attack);
        character.attr("counterAttackPower", counter);



    })
}





