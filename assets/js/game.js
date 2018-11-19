$(document).ready(function () {
    console.log("ready!");

    var StartFresh = function () {
        // variabbles ////////////////////////////////////////////////////////////////////////////////////////////
        // Character List//////
        var x = document.getElementById("myAudio");
        var startAudio = document.getElementById("startAudio");
        var punch = document.getElementById("punchOne");
        var punchTwo = document.getElementById("punchTwo");
        var fightAudio = document.getElementById("fightAudio");
        var youWinAudio = document.getElementById("youWinAudio");
        var youLooseAudio = document.getElementById("youLooseAudio");
        var char1 = {

            Health: 100,
            Stregth: 15,
            type: "water",
            isDead: false,

            picture: "./images/p1/p1-pic.jpg",
            idol: "./images/p1/p1_idol.gif",
            attack: "./images/p1/p1_attack.gif",
            hit: "./images/p1/p1-hit.gif",
            ko: "./images/p1/p1_KO.gif",

        };
        var char2 = {

            Health: 100,
            Stregth: 15,
            type: "fire",
            isDead: false,

            picture: "./images/p2/pr2=-pic.jpg",
            idol: "./images/p2/p2-idol.gif",
            attack: "./images/p2/pr2-attack.gif",
            hit: "./images/p2/p2-hit.gif",
            ko: "./images/p2/pr2-ko.gif",


        };
        var char3 = {

            Health: 100,
            Stregth: 15,
            type: "grass",
            isDead: false,

            picture: "./images/p3/p3-pic.jpg",
            idol: "./images/p3/ps3-idol.gif",
            attack: "./images/p3/p3-attack.gif",
            hit: "./images/p3/p3-hit.gif",
            ko: "./images/p3/pr3-ko.gif",


        };
        var char4 = {

            Health: 100,
            Stregth: 15,
            type: "wind",
            isDead: false,

            picture: "./images/p4/p4-pic.jpg",
            idol: "./images/p4/p4-idol.gif",
            attack: "./images/p4/p4-punch.gif",
            hit: "./images/p4/p4-hit.gif",
            ko: "./images/p4/p4-ko.gif",

        };
        //   Character List End ///////
        var charChosen = "";
        var oppChosen = "";
        var opponents = [];
        var eleminations = 0;
        var enemiesLeft = 3;
        var powerUpLevel = 0;

        // variabbles End ///////////////////////////////////////////////////////////////////////////////////


        // functions /////////////////////////////////////////////////////////////////////////////////////////

        var chooseAnother = function () {

            if (enemiesLeft > 1) {
                enemiesLeft--;
                console.log("enemies Lefts: " + enemiesLeft);
                $('#opponentPage').removeClass("hide");
                $('#battlePage').addClass("hide");

                // power up after every elimination
                if (eleminations < 2) {
                    eleminations++;
                    console.log("PowerUP");
                    console.log(eleminations);
                    charChosen.Health += 20;
                    charChosen.Stregth += 20;
                    $('#charHealth').css('width', charChosen.Health + '%');
                    $('#charHealthB').css('width', charChosen.Health + '%');
                    $('#charHealth').text(' Health:' + charChosen.Health);
                    $('#charHealthB').text(' Health:' + charChosen.Health);
                }


                for (i = 0; i < opponents.length; i++) {
                    if (!opponents[i].isDead) {
                        $("#opponent" + i).attr("src", opponents[i].picture);
                    } else if (opponents[i].isDead) {
                        $('#opponent' + i).addClass("hide");
                    }

                }
            } else {
                // You win The Game 
                console.log("You Win!");
                gameWon();
            }

        }

        var gameLost = function () {
            youLooseAudio.play();
            $('#charImgB').attr('src', charChosen.ko);
            $("#fightContainer").addClass("hide");
            $('#resultContainer').removeClass("hide");
            $('#result').text("! You Loose !");

        }

        var gameWon = function () {
            youWinAudio.play()
            $('#oppImgB').attr('src', oppChosen.ko);
            $("#fightContainer").addClass("hide");
            $('#resultContainer').removeClass("hide");
            $('#result').text("! You Win !");

        }


        var updateStats = function () {

            if (charChosen.Health < 0) {
                charChosen.Health = 0;
                $('#charImgB').attr('src', charChosen.ko);
                setTimeout(gameLost, 500);

                // Game Lost 
            }
            if (oppChosen.Health < 0) {
                oppChosen.Health = 0;
                oppChosen.isDead = true;

                $('#oppImgB').attr('src', oppChosen.ko);
                setTimeout(chooseAnother, 500);

            }
            // if (charChosen.Health > 0 && oppChosen.Health > 0){

            $('#charHealth').css('width', charChosen.Health + '%');
            $('#charHealthB').css('width', charChosen.Health + '%');
            $('#oppHealthB').css('width', oppChosen.Health + '%');
            $('#charHealth').text(' Health:' + charChosen.Health);
            $('#charHealthB').text(' Health:' + charChosen.Health);
            $('#oppHealthB').text(' Health:' + oppChosen.Health);


            // }
        }
        var showUp = function () {
            $('#fight').removeClass("hide");
            $('#powerUP').removeClass("hide");
        }
        var updatSkin = function () {
            $('#charImg').attr('src', charChosen.idol);
            $('#charImgB').attr('src', charChosen.idol);
            $('#oppImgB').attr('src', oppChosen.idol);
        }

        var dealDamagechar = function () {

            $('#charImgB').attr('src', charChosen.attack);
            $('#oppImgB').attr('src', oppChosen.hit);
            punch.play();
            if ((oppChosen.isDead == false) && (charChosen.isDead == false)) {
                setTimeout(updatSkin, 300);
            }


            if ((charChosen.type == "water") && (oppChosen.type == "fire")) {

                oppChosen.Health -= charChosen.Stregth + (charChosen.Stregth * .50);




            } else if ((charChosen.type == "water") && (oppChosen.type == "wind")) {
                oppChosen.Health -= charChosen.Stregth - (charChosen.Stregth * .50);


            } else if ((charChosen.type == "fire") && (oppChosen.type == "grass")) {

                oppChosen.Health -= charChosen.Stregth + (charChosen.Stregth * .50);



            } else if ((charChosen.type == "fire") && (oppChosen.type == "water")) {
                oppChosen.Health -= charChosen.Stregth - (charChosen.Stregth * .50);


            } else if ((charChosen.type == "grass") && (oppChosen.type == "wind")) {

                oppChosen.Health -= charChosen.Stregth + (charChosen.Stregth * .50);



            } else if ((charChosen.type == "grass") && (oppChosen.type == "fire")) {
                oppChosen.Health -= charChosen.Stregth - (charChosen.Stregth * .50);


            }
            else if ((charChosen.type == "wind") && (oppChosen.type == "water")) {

                oppChosen.Health -= charChosen.Stregth + (charChosen.Stregth * .50);



            } else if ((charChosen.type == "wind") && (oppChosen.type == "grass")) {
                oppChosen.Health -= charChosen.Stregth - (charChosen.Stregth * .50);


            } else {
                oppChosen.Health -= charChosen.Stregth;


            }

            updateStats();
        }
        var dealDamageOpp = function () {


            if ((oppChosen.isDead == false) && (charChosen.isDead == false)) {
                setTimeout(updatSkin, 300);
            }


            if (!oppChosen.isDead) {
                $('#charImgB').attr('src', charChosen.hit);
                $('#oppImgB').attr('src', oppChosen.attack);
                punchTwo.play();

                if ((charChosen.type == "water") && (oppChosen.type == "fire")) {


                    charChosen.Health -= oppChosen.Stregth - (oppChosen.Stregth * .50);



                } else if ((charChosen.type == "water") && (oppChosen.type == "wind")) {

                    charChosen.Health -= oppChosen.Stregth + (oppChosen.Stregth * .50);

                } else if ((charChosen.type == "fire") && (oppChosen.type == "grass")) {


                    charChosen.Health -= oppChosen.Stregth - (oppChosen.Stregth * .50);


                } else if ((charChosen.type == "fire") && (oppChosen.type == "water")) {

                    charChosen.Health -= oppChosen.Stregth + (oppChosen.Stregth * .50);

                } else if ((charChosen.type == "grass") && (oppChosen.type == "wind")) {


                    charChosen.Health -= oppChosen.Stregth - (oppChosen.Stregth * .50);


                } else if ((charChosen.type == "grass") && (oppChosen.type == "fire")) {

                    charChosen.Health -= oppChosen.Stregth + (oppChosen.Stregth * .50);

                }
                else if ((charChosen.type == "wind") && (oppChosen.type == "water")) {


                    charChosen.Health -= oppChosen.Stregth - (oppChosen.Stregth * .50);


                } else if ((charChosen.type == "wind") && (oppChosen.type == "grass")) {

                    charChosen.Health -= oppChosen.Stregth + (oppChosen.Stregth * .50);

                } else {

                    charChosen.Health -= oppChosen.Stregth;

                }
            }
            updateStats();
        }

        var goToOppenent = function () {


            x.play();
            x.volume = 0.05;
            startAudio.play();
            $('#start').addClass("hide");
            $('#opponentPage').removeClass("hide");

            for (i = 0; i < opponents.length; i++) {

                $("#opponent" + i).attr("src", opponents[i].picture);

            }
            updateStats();
            updatSkin();
        }



        var goToBattle = function () {
            startAudio.currentTime = 0;
            startAudio.play();
            setTimeout(fightA, 1000);
            console.log('opponent: ' + charChosen)
            $('#opponentPage').addClass("hide");
            $('#battlePage').removeClass("hide");
            updateStats();
            updatSkin();

        }
        var fightA = function () {
            fightAudio.play();
        }

        // Functions End//////////////////////////////////////////////////////////////////////////////////////

        // Clicks ////////////////////////////////////////////////////////////////////////////////////////

        $('#c1').click(function () {
            charChosen = char1;
            opponents = [char2, char3, char4];
            goToOppenent();
        });

        $('#c2').click(function () {
            charChosen = char2;
            opponents = [char1, char3, char4];
            goToOppenent();
        });

        $('#c3').click(function () {
            charChosen = char3;
            opponents = [char1, char2, char4];
            goToOppenent();
        });

        $('#c4').click(function () {
            charChosen = char4;
            opponents = [char1, char2, char3,];
            goToOppenent();
        });
        /////////////////////////////////////
        $('#opponent0').click(function () {
            oppChosen = opponents[0];
            goToBattle();
        });

        $('#opponent1').click(function () {
            oppChosen = opponents[1];
            goToBattle();
        });

        $('#opponent2').click(function () {
            oppChosen = opponents[2];
            goToBattle();
        });
        ////////////////////////////////////
        $('#fight').click(function () {
            $('#fight').addClass("hide");
            $('#powerUP').addClass("hide");
            dealDamagechar();
            setTimeout(dealDamageOpp, 1000)
            setTimeout(showUp, 1500);
        });

        $('#powerUP').click(function () {

            console.log("Clicked");
            if (powerUpLevel < 2) {
                if (powerUpLevel == 0) {
                    charChosen.picture = charChosen.pLevel2;
                }
                if (powerUpLevel == 1) {
                    charChosen.picture = charChosen.pLevel3;
                }
                powerUpLevel++;
                charChosen.Health += 15;
                charChosen.Stregth += 15;

                dealDamageOpp();
            } else {
                $('#powerUpText').text("Max Level Reached");
            }

        });

        $('#newGame').click(function () {
            x.pause();
            $("#fightContainer").removeClass("hide");
            $('#resultContainer').addClass("hide");
            $('#opponentPage').addClass("hide");
            $('#battlePage').addClass("hide");
            $('#start').removeClass("hide");
            $('#opponent0').removeClass("hide");
            $('#opponent1').removeClass("hide");
            $('#opponent2').removeClass("hide");
            $('#powerUpText').text(" Power Up");

            charChosen = "";
            oppChosen = "";
            opponents = [];
            eleminations = 0;
            enemiesLeft = 3;
            powerUpLevel = 0;

            charChosen.picture = charChosen.pLevel1;

            char1 = {

                Health: 100,
                Stregth: 15,
                type: "water",
                isDead: false,

                picture: "./assets/images/sprites/0253.png",
                pLevel1: "./assets/images/sprites/0253.png",
                pLevel2: "./assets/images/sprites/0254.png",
                pLevel3: "./assets/images/sprites/0255.png",

            };
            char2 = {

                Health: 100,
                Stregth: 15,
                type: "fire",
                isDead: false,

                picture: "./assets/images/sprites/0356.png",
                pLevel1: "./assets/images/sprites/0356.png",
                pLevel2: "./assets/images/sprites/0357.png",
                pLevel3: "./assets/images/sprites/0358.png",

            };
            char3 = {

                Health: 100,
                Stregth: 15,
                type: "grass",
                isDead: false,

                picture: "./assets/images/sprites/0250.png",
                pLevel1: "./assets/images/sprites/0250.png",
                pLevel2: "./assets/images/sprites/0251.png",
                pLevel3: "./assets/images/sprites/0252.png",

            };
            char4 = {

                Health: 100,
                Stregth: 15,
                type: "wind",
                isDead: false,

                picture: "./assets/images/sprites/0247.png",
                pLevel1: "./assets/images/sprites/0247.png",
                pLevel2: "./assets/images/sprites/0248.png",
                pLevel3: "./assets/images/sprites/0249.png",

            };
            StartFresh();
        });

        //Clicks End//////////////////////////////////////////////////////////////////////////////////////////
    };
    StartFresh();

});



