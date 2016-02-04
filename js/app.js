$(document).ready(function () {
    /*--- Function to generate secret number ---*/
    var secretNumber = secretNum(1, 100);
    console.log("The secret number is: " + secretNumber);
    /*--- Default bg color Grey ---*/
    document.body.style.backgroundColor = '#333';

    var oldGuess = 0;
    /*--- Set the maximum number of guesses ---*/
    var counter = 10;
    $('#count').text(counter);


    /*--- Function to Start a New Game ---*/
    function newGame() {
        document.location.reload(true);
    }
    /*--- Function to Generate the Random Number ---*/
    function secretNum(min, max) {
        var secretNumber = Math.floor(Math.random() * (max - min + 1) + min);
        return secretNumber;
    }

    /*--- Function to Validate User Input ---*/
    function validation(guessedNumber) {

        /*--- Check Guessed Number in Console Log---*/
        console.log("The Guessed Number is: " + guessedNumber);
        /*--- If a Number is Divisible by 1 it is an Integer ---*/
        if (guessedNumber % 1 !== 0) {
            alert('You must enter an integer value!');
            /*--- Reset Integer Value to 0 ---*/
            $('#userGuess').val('');
            //stop the loop
            return false;
        }
        /*--- If the Guessed Number is Smaller than 1 or Bigger than 100 ---*/
        else if (guessedNumber < 1 || guessedNumber > 100) {
            alert('Please guess a number between 1 and 100!');
            /*--- Reset Integer Value to 0 ---*/
            $('#userGuess').val('');
            //stop the loop
            return false;
        }
        /*--- Else the guessedNumber is Valid ---*/
        else {
            provideFeedback(secretNumber, guessedNumber);
            counter--;
            guessHistory();
            guessCounter(counter);
            $('#userGuess').val('');
        }
        /*--- # of Guesses < 0 ? GAME OVER MAN---*/
        if (counter <= 0) {
            $('#feedback').text('Game Over!');
            document.getElementById("userGuess").disabled = true;
            document.getElementById("guessButton").disabled = true;
            alert('The Secret number was ' + secretNumber + ' ! Better luck next time !');
        }
    }
    /*--- Provide Feedback to the User ---*/
    function provideFeedback(secretNumber, guessedNumber) {
        var difference = Math.abs(secretNumber - guessedNumber);
        if (difference >= 50) {
            $('#feedback').text('Ice Cold');
            $('body').css('background-image', 'url(styles/ice.gif)', 'opacity = 0.1');
        } else if (difference >= 30) {
            $('#feedback').text('Cold');
            $('body').css('background-image', 'url(styles/ice.gif)', 'opacity = 0.1');
        } else if (difference >= 20) {
            $('#feedback').text('Warm');
            $('body').css('background-image', 'url(styles/fire.gif)', 'opacity = 0.1');
        } else if (difference >= 10) {
            $('#feedback').text('Hot');
            $('body').css('background-image', 'url(styles/fire.gif)', 'opacity = 0.1');
        } else if (difference >= 1 && difference <= 9) {
            $('#feedback').text('Very Hot');
            $('body').css('background-image', 'url(styles/fire.gif)', 'opacity = 0.1');
        } else {
            $('#feedback').text("Congratulations, You've Won!!");
            $('body').css('background-image', 'url(styles/fire.gif)', 'opacity = 0.1');
            playCongrats();
            document.getElementById("userGuess").disabled = true;
            document.getElementById("guessButton").disabled = true;
        }
    }
    var congratsSound = false;

    function playCongrats() {
        congratsSound = !congratsSound;
        if (congratsSound) {
            $('#congrats')[0].volume = 0.5;
            $('#congrats')[0].load();
            $('#congrats')[0].play();
        }
    }


    /*--- Even more Feedback Bro ---*/
    function relativeFeedback(secretNumber, oldGuess, newGuess) {
        var oldDiff = Math.abs(parseInt(secretNumber) - parseInt(oldGuess));
        var newDiff = Math.abs(parseInt(secretNumber) - parseInt(newGuess));
        if (newDiff > oldDiff) {
            $('#relative-feedback').text('You are colder than the last guess!');
        } else if (newDiff === oldDiff) {
            $('#relative-feedback').text('You are the same range as the last guess!');
        } else {
            $('#relative-feedback').text('You are hotter than the last guess!');
        }
    }
    /*--- Function to Count the Number of Guesses ---*/
    function guessCounter(counter) {
        $('#count').text(counter);
    }
    /*--- Function to Show the History of Guesses ---*/
    function guessHistory() {
        $('#guessList').append('<li>' + parseInt($('#userGuess').val(), 10) + '</li>');
    }


    $('.new').on('click', newGame);

    $('#guessButton').on('click', function () {
        var guessedNumber = parseInt($('#userGuess').val(), 10);
        var newGuess = guessedNumber;

        //validate all the numbers
        validation(guessedNumber);

        //only if the user added more than one guess (there is a guess history)

        if (oldGuess !== 0 && guessedNumber >= 1 && guessedNumber <= 100) {
            relativeFeedback(secretNumber, oldGuess, newGuess);
        }
        //re-update the old guess with the the new value
        oldGuess = newGuess;
    });

    $('#userGuess').on('keypress', function (e) {
        //on enter
        if (e.which === 13) {
            e.preventDefault();
            var guessedNumber = parseInt($('#userGuess').val(), 10);
            var newGuess = guessedNumber;

            //validate all the numbers
            validation(guessedNumber);

            //only if the user added more than one guess (there is a guess history)

            if (oldGuess !== 0 && guessedNumber >= 1 && guessedNumber <= 100) {
                relativeFeedback(secretNumber, oldGuess, newGuess);
            }
            //re-update the old guess with the the new value
            oldGuess = newGuess;
        }
    });

    /*--- Display information modal box ---*/
    $(".what").click(function () {
        $(".overlay").fadeIn(1000);
    });
    /*--- Hide information modal box ---*/
    $("a.close").click(function () {
        $(".overlay").fadeOut(1000);
    });

});
