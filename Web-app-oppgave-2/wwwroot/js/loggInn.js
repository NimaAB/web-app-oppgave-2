function loggInn() {
    const okBrukernavn = validerBrukernavn($("#brukernavn").val());
    const okPassord = validerPassord($("#passord").val());

    if (okBrukernavn && okPassord) {
        const bruker = {
            brukernavn: $("#brukernavn").val(),
            passord: $("#passord").val()
        };
        
        console.log(bruker);
        
        $.post("api/login", bruker, function (OK) {
            if (OK) {
                window.location.href = '#';
            }
            else {
                $("#feil").html("Feil brukernavn eller passord");
            }
        })
        .fail(function (feil) {
            let errorMessage = jQuery.parseJSON(feil.responseText);
            $("#feil").html(errorMessage.error);
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

    
