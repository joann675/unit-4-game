$(document).ready(function () {

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





