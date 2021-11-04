
////////////////////////////////////////////////////////////////////
/////                                                          /////
/////         Server relatert logikk er implementert her.      /////   
/////                                                          /////
////////////////////////////////////////////////////////////////////

// Trinn 1: Rute
let rute = {}; // aksessere rutene med ruteFra, ruteTil og rutePris keys
let reiseType = ""; // kun 2 verdier: En-vei og Tur-retur
let avreiseDato = ""; // string: DD/MM/YYYY
let returDato = ""; // string: DD/MM/YYYY

// Trinn 2: Antall reisefølger
let antallVoksen = 1; // minst 1 voksen må være tilstedet
let antallBarn = 0;
let antallDyr = 0;
let antallSykler = 0;

// Trinn 3: Lugarer
let lugarer = []; // array av lugar objekter: har id, tittel, antall og pris keys
let lugarTotalPris = 0;

// Trinn 4: Måltid
let maaltider = [] // array av måltid objekter: har navn og pris keys
let maaltidTotalPris = 0;

// Trinn 5: Passasjerer
let passasjerer = []; // array av passasjer objekter: har fornavn, etternavn og fodselsdato keys

// Trinn 7: Kundeinformasjon
let kunde = {};
let bestillingTotalPris = 0;

function lagreRute(){
    validerTrinn1();
    oppdaterRuteTekst();
}

function lagreAntallPassasjerer(){
    validerTrinn2();
    oppdaterReisefolgerTekst();
    oppdaterPassasjerForm();
    
    // Viser loading gif når vi henter alle lugarer fra db
    visLoader('Henter tilgjengelig lugarer...');
    hentAlleLugarer();
}

function lagreLugar(){
    if(validerTrinn3()) {
        oppdaterLugarerTekst();
        
        // Viser loading gif når vi henter alle måltider fra db
        visLoader('Henter tilgjengelig måltider...');
        hentAlleMaaltider();
    }
}

function lagreMaaltider(){
    validerTrinn4();
    oppdaterMaaltidTekst();
}

function lagrePassasjerInfo(){
    validerTrinn5();
    oppdaterPassasjererTekst();
}

function bekreft(){
    validerTrinn6()
    $('.bestilling-totalpris-tekst').text(bestillingTotalPris);
}

function hentAlleRuter(){
    let url = '/api/rute/hentAlle';
    $.get(url, response => {
        genererRuteDetaljer(response);
    })
        .done(function () {
            visTrinn('#trinn-2', '#trinn-2-btns');
            skjulLoader();
        })
        .fail(function () {
            console.log('Something went wrong.');
        });
}

function hentAlleLugarer(){
    let url = '/api/lugar/hentAlle';
    $.get(url, response => {
        genererLugarModalToggles(response); 
    })
        .done(function () {
            visTrinn('#trinn-3', '#trinn-3-btns');
            skjulLoader();
        })
        .fail(function () {
            console.log('Something went wrong.');        
        });
}

function hentEnLugar(id){
    let url = '/api/lugar/hentAlle' + id;
    $.get(url, response => {
       genererLugarDetaljer(response);
    });
}

function hentAlleMaaltider(){
    let url = '/api/maaltid/hentAlle';
    $.get(url, response => {
        genererMaaltidDetaljer(response);
    })
        .done(function () {
            visTrinn('#trinn-4', '#trinn-4-btns');
            skjulLoader();
        })
        .fail(function () {
            console.log('Something went wrong.');
        });
}

function lagreBestilling(){
    validerTrinn7();
    let Billetter = [];
    let Maaltider = [];
    let Lugarer = [];
    let Passasjer = [];

    // Reformatter slik at de har samme attributtene som i db tabellen.
    
    maaltider.forEach(function (item) {
        let maaltid = { Maaltid: item.navn, Pris: item.pris };
        Maaltider.push(maaltid);
    });

    lugarer.forEach(function (item) {
        let lugar = { Type: item.type, Pris: item.pris };
        Lugarer.push(lugar);
    });

    // Oppretter en billett objekt for hver passasjer
    passasjerer.forEach(function (item) {
        let tur = {
            tur: rute.ruteFra + "-" + rute.ruteTil,
            pris: rute.pris
        };

        let billett = {
            Type: reiseType,
            Utreise: avreiseDato,
            Ankomst: returDato,
            AntallSykler: antallSykler,
            Kjæledyr: antallDyr,
            Passasjer: item,
            Tur: tur,
        };
        
        if (reiseType !== "En-vei") {
            billett['Retur'] = {
                tur: rute.ruteTil + "-" + rute.ruteFra,
                pris: rute.pris
            };
        }
        Billetter.push(billett);
    });
    
    // Oppretter en bestilling objekt
    let bestilling = {
        Kunde: {
            Fornavn: kunde.fornavn,
            Etternavn: kunde.etternavn,
            Tlfnummer: kunde.tlf,
            Epost: kunde.epost,
            Adresse: kunde.adresse,
            Postnummer: {
                Postnr: kunde.postnr,
                Poststed: kunde.poststed
            }
        },
        Billetter: Billetter,
        Lugarer: Lugarer,
        Maaltider: Maaltider,
        TotalPris: bestillingTotalPris
    };
    console.log(bestilling);
    const url = "Bestilling/Lagre";
    $.post(url, bestilling, (saved) => {
        console.log(bestilling);
        console.log(saved);
        if(saved){
            location.href = '../kvittering.html';
        }
    });
}