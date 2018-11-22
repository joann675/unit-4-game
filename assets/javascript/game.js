$(document).ready(function () {

    
    $('.availableSection').data('old-state', $('.availableSection').html());


    setHealth(); 

    $("#myButton").on("click", function () {
        if (!$(".defenderSection").children().length)
            console.log("Need to pick a defender first");
        else {
            var defender = $(".defenderSection").children();
            var defenderName = defender.text();
            var myCharacter = $(".yourCharacterSection").children();
            // attack decreases defenders health and increases my attackPower
            console.log("health = " + defender.children(".health").text());
            console.log("attack = " + myCharacter.attr("attackPower"));
            var defHealth = defender.children(".health").text() -
                myCharacter.attr("attackPower");
            $("#line1").text("You attacked " + defenderName + " for " + myCharacter.attr("attackPower") + " damage");
            $("#line2").text(defenderName + " attacked you back for " + defender.attr("counterattackpower") + " damage");
    
            defender.children(".health").text(defHealth);
            var original = myCharacter.attr("originalPower");
            var current = myCharacter.attr("attackPower");
            myCharacter.attr("attackPower", parseInt(current) + parseInt(original));
            

            if (parseInt(defHealth) <= 0) {
                // This enemy has been defeated, remove them from the game
                $(".defenderSection").empty();
                
                // Check if any more enemies are available to fight
                if (!$(".availableEnemiesSection").children().length) {
                    $("#line1").text("You won. GAME OVER!!!" );
                    $("#line2").empty();
                    drawRestartButton();
                }
                else {
                    $("#line1").text("You defeated " + defenderName + ". You can choose to fight another enemy.");
                    $("#line2").empty();
                }

            }
            else {

                // counterAttack decreases my health
                var myHealth = myCharacter.children(".health").text() -
                    defender.attr("counterattackpower");
                myCharacter.children(".health").text(myHealth);
                if (parseInt(myHealth) <= 0) {
                    // You have been defeated
                    $("#line1").text("You have been defeated... GAME OVER!!!");
                    $("#line2").text("");
                    drawRestartButton();
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
              
                $(this).css("background-color", "red");
                $(".availableEnemiesSection").append(characterToMove);
            });
        }
        else {
            console.log("Your current enemy id " + $(this).text());
            var enemyChosen = $(this);
            $(this).css("background-color", "black");
            $(this).css("color", "white");
            $("#line1").empty();


            $(".defenderSection").append(enemyChosen);
        }
    });

});

$("#Restart").on("click", function () {
    removeRestartButton();
    $("#line1").empty();
    $(".yourCharacterSection").empty();
    $(".availableEnemiesSection").empty();
    $(".defenderSection").empty();
    $('.availableSection').html($('.availableSection').data('old-state'));
   
    setHealth();


})

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

function drawRestartButton() {
    console.log("Inside of drawRestartButton")
    $("#Restart").text("Restart");
    $("#Restart").css("background-color", "white");
    $("#Restart").css("color", "black");
    $("#Restart").css("height","20px");
    $("#Restart").css("width", "60px");

}

function removeRestartButton() {
    console.log("Inside of removeRestartButton")
    $("#Restart").empty();
    $("#Restart").css("background-color", "");
    $("#Restart").css("color", "");
    $("#Restart").css("height","");
    $("#Restart").css("width", "");

}





