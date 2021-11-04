function loggInn() {
    const okBrukernavn = validerBrukernavn($("#brukernavn").val());
    const okPassord = validerPassord($("#passord").val());

    if (okBrukernavn && okPassord) {
        visLoader('Please wait...');
        
        const bruker = {
            brukernavn: $("#brukernavn").val(),
            passord: $("#passord").val()
        };
        
        $.post({url: "api/login", data: JSON.stringify(bruker), contentType: 'application/json; charset=utf-8'})
        .done(function (ok) {
            window.location.href = "/ruter";
        })
        .fail(function (feil) {
            let errorMessage = jQuery.parseJSON(feil.responseText);
            $("#feil").html(errorMessage.error);
            skjulLoader();
        });
    }
}

function validerBrukernavn(brukernavn) {
    const regexp = /^[a-zA-ZæøåÆØÅ\.\ \-]{2,20}$/;
    const ok = regexp.test(brukernavn);

    if (!ok) {
        $("#feilBrukernavn").html("Brukernavn må bestå av 2 til 20 bokstaver");
        return false;
    }
    else {
        $("#feilBrukernavn").html("");
        return true;
    }
}
function validerPassord(passord) {
    const regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const ok = regexp.test(passord);
    if (!ok) {
        $("#feilPassord").html("Passordet må bestå minimum 6 tegn, minst en bokstav og et tall");
        return false;
    }
    else {
        $("#feilPassord").html("");
        return true;
    }
}

function skjulLoader(){
    $('.loader').addClass('d-none');
}

function visLoader(message){
    $('.loader-message').text(message);
    $('.loader').removeClass('d-none');
}
