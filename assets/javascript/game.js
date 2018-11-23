$(document).ready(function () {

    // Save off original html of the availableSection for restore purposes
    $('.availableSection').data('old-state', $('.availableSection').html());

    // Generate health and attack values for each character
    setHealth();

    $("#myButton").on("click", function () {
        if (!$(".defenderSection").children().length) {
            $("#line1").text("No enemy here.");
            $("#line2").empty();
        }
        else {
            var defender = $(".defenderSection").children();
            var defenderName = defender.attr("charname");
            var myCharacter = $(".yourCharacterSection").children();
            // attack decreases defenders health and increases my attackPower
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
                    $("#line1").text("You won!!!! GAME OVER!!!");
                    $("#line2").empty();
                    drawRestartButton();
                    // This enemy has been defeated, remove them from the game
                    $(".defenderSection").empty();
                }
                else {
                    $("#line1").text("You defeated " + defenderName + ". You can choose to fight another enemy.");
                    $("#line2").empty();
                    // This enemy has been defeated, remove them from the game
                    $(".defenderSection").empty();
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

    });

    // When a character is first picked, move this character to your character
    // Move all other characters to available enemies section and change the background to red
    $(".availableSection").on("click", ".imgContainer", function () {
        console.log("In on click for availableSection");
        var characterChosen = $(this);
        console.log("Your character " + $(this).attr("charname"));

        $(".yourCharacterSection").append(characterChosen);


        $(".availableSection").children(".imgContainer").each(function () {
            var characterToMove = $(this);

            $(this).css("background-color", "red");
            $(".availableEnemiesSection").append(characterToMove);
        });

    });


    // When an enemy is picked, move this character to the defender section and change background to black
    $(".availableEnemiesSection").on("click", ".imgContainer", function () {
        console.log("In on click for availableEnemiesSection");
        console.log("Your current enemy id " + $(this).attr("charname"));
        var enemyChosen = $(this);
        $(this).css("background-color", "black");
        $(this).css("color", "white");
        $("#line1").empty();
        $(".defenderSection").append(enemyChosen);

    });


    // Restart button is clicked, reset game to original state and assign new health values
    $("#Restart").on("click", function () {
        console.log("In onClick for restart button")
        removeRestartButton();
        $("#line1").empty();
        $(".yourCharacterSection").empty();
        $(".availableEnemiesSection").empty();
        $(".defenderSection").empty();
        $('.availableSection').html($('.availableSection').data('old-state'));

        setHealth();


    });

    function setHealth() {
        // Generate unique health, attack and counterAttack numbers for each character
        // Health ranges from 50 to 200
        var healthArray = [];
        while (healthArray.length < 4) {
            var r = Math.floor(Math.random() * 150) + 50;
            if (healthArray.indexOf(r) === -1) healthArray.push(r);
        }

        // Attack ranges from 1 to 15
        var attackArray = [];
        while (attackArray.length < 4) {
            var r = Math.floor(Math.random() * 14) + 1;
            if (attackArray.indexOf(r) === -1) attackArray.push(r);
        }
        // Counter attack ranges from 5 to 25       
        var counterArray = [];
        while (counterArray.length < 4) {
            var r = Math.floor(Math.random() * 20) + 5;
            if (counterArray.indexOf(r) === -1) counterArray.push(r);
        }
        // Assign these values to each character
        var index = 0;
        $(".availableSection").children(".imgContainer").each(function () {

            var character = $(this);
            character.children(".health").text(healthArray[index]);
            character.attr("attackPower", attackArray[index]);
            character.attr("originalPower", attackArray[index]);
            character.attr("counterAttackPower", counterArray[index]);
            index++;
        });
    };

    function drawRestartButton() {
        // Game is over. Display restart button
        $("#Restart").text("Restart");
        $("#Restart").css("background-color", "white");
        $("#Restart").css("color", "black");
        $("#Restart").css("height", "20px");
        $("#Restart").css("width", "60px");

    };

    function removeRestartButton() {
        // New game will begin. Remove restart button
        $("#Restart").empty();
        $("#Restart").css("background-color", "");
        $("#Restart").css("color", "");
        $("#Restart").css("height", "");
        $("#Restart").css("width", "");

    };


});


