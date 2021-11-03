
////////////////////////////////////////////////////////////////////
/////                                                          /////
/////        Denne filen gjør nettsiden dynamisk.              /////
/////    Ingen server relatert logikk er implementert her.     /////
/////                                                          /////
////////////////////////////////////////////////////////////////////

// Ready funksjon
$(document).ready(function () {
    $.datepicker.setDefaults($.datepicker.regional['no']); // endrer dato språk
    enableRuteDatePicker();
    deaktiverInputs(reiseTypeInput ,fraDatoInput, tilDatoInput);
    
    // Viser loading gif når vi henter alle ruter fra db
    visLoader('Henter tilgjengelig ruter...');
    hentAlleRuter();
});

// Noen input felter må først velges før de andre

function deaktiverInputs(...params){
    for(let input of params) {
        input.attr('disabled', true);
    }
}
function aktiverInput(input){
    input.attr('disabled', false);
}

// Endrer meny ikonen på små enheter fra burger til X og omvendt.
$("#btn-toggle").click(function () {
    $("#btn-toggle").toggleClass("on");
});

// Viser kalender når dato input er klikket

function enableRuteDatePicker(){
    $('#fra-dato, #til-dato').datepicker({
        beforeShow: customRange,
        dateFormat: "D dd. M yy",
    });
}

function enableBirthDatePicker(){
    $('.fodselsdato').datepicker({
        changeYear: true,
        changeMonth: true,
        dateFormat: "D dd. M yy",
        yearRange: '1940:',
        defaultDate: 'man 01. Jan 1999'
    });
}

// Fjerner ugyldige datoer fra dato inputs
function customRange(input) {
    if (input.id === 'fra-dato') {
        let minDate = new Date();
        minDate.setDate(minDate.getDate())
        return { minDate: minDate };
    }
    if (input.id === 'til-dato') {
        let minDate = new Date($('#fra-dato').datepicker('getDate'));
        minDate.setDate(minDate.getDate() + 1)
        return { minDate: minDate };
    }
}

// Skjuler og viser de forskjellige trinnene for bestillingen

function tilbake(toHide, toShow, toHideBtns, toShowBtns){
    skjulOgVisTrinn(toHide, toShow, toHideBtns, toShowBtns);
    fjernMerke(toHide);
}

function skjulOgVisTrinn(toHide, toShow, toHideBtns, toShowBtns){
    $(toHide).addClass('d-none');
    $(toShow).removeClass('d-none');
    $(toHideBtns).addClass('d-none');
    $(toShowBtns).removeClass('d-none');
    // skroller til 'top': bedre ux for små enheter
    location.href = "#bestill";
}

function skjulTrinn(toHide, toHideBtns){
    $(toHide).addClass('d-none');
    $(toHideBtns).addClass('d-none');
    location.href = "#bestill";
}

function visTrinn(toShow,  toShowBtns){
    $(toShow).removeClass('d-none');
    $(toShowBtns).removeClass('d-none');
    location.href = "#bestill";
}

function skjulLoader(){
    $('.loader').addClass('d-none');
}

function visLoader(message){
    $('.loader-message').text(message);
    $('.loader').removeClass('d-none');
}

function merkerFerdig(ikon_id){
    $(ikon_id + '-ikon').removeClass('bi-dash-circle');
    $(ikon_id + '-ikon').addClass('bi-check-circle');
    $(ikon_id + '-ikon').css('color','lightseagreen');
}

function fjernMerke(ikon_id){
    $(ikon_id + '-ikon').addClass('bi-dash-circle');
    $(ikon_id + '-ikon').removeClass('bi-check-circle');
    $(ikon_id + '-ikon').css('color','lightgrey');
}

// Manipulerer css når rute radioboks verdier er endret
function merkerValgtRute() {
    let valgtRute = "";
    $("input[name=ruter]").on('change', function () {
        // Viser sjekk ikon
        valgtRute = $("input[name=ruter]:checked").val();
        $('#' + valgtRute + "-ikon").removeClass('d-none');
        $('#' + valgtRute + "-col").css('background-color','#ebf9ff');
        
        // Fjerner sjekk ikon
        let ikkeValgtRuter = $('input[type="radio"]:not(:checked)');
        ikkeValgtRuter.each((index, value) => {
            $('#' + value.id + "-ikon").addClass('d-none');
            $('#' + value.id + "-col").css('background-color', 'transparent');
        });
    });
}

function plussLugar() {
    let plussBtn = $('.pluss');
    let minusBtn = $('.minus');
    let label = $('.rom-antall-reservasjon');
    let value = Number(label.text());
    let maxValue = Number($('.rom-max-reservasjon').text());
    
    if(value < maxValue) {
        value++;
        label.text(value);
        plussBtn.removeClass('disabled');
        minusBtn.removeClass('disabled');
    } else {
        plussBtn.addClass('disabled');
    }
}

function minusLugar() {
    let plussBtn = $('.pluss');
    let minusBtn = $('.minus');
    let label = $('.rom-antall-reservasjon');
    let value = Number(label.text());

    if(value > 0) {
        value--;
        label.text(value);
        plussBtn.removeClass('disabled');
        minusBtn.removeClass('disabled');
    } else {
        minusBtn.addClass('disabled');
    }
}

// Generer lugar modal toggles (alle lugarer deler samme modal)
function genererLugarModalToggles(lugarer){
    let template = document.getElementById('lugar-toggle-template');
    let parent = $("#lugar-toggle-template-container");
    parent.empty();
    
    for(let i = 0; i < lugarer.length; i++) {
        let child = template.content.cloneNode(true);
        let lugar = lugarer[i];

        let el = child.querySelector('a');
        let navn = child.querySelector('.lugar-navn');
        let kapasitet = child.querySelector('.lugar-kapasitet');
        
        // TODO: Set background-image from db.
        el.setAttribute('id', lugar.lugarNummer);
        navn.innerText = lugarer[i].navn;
        kapasitet.innerText = lugar.kapasitet > 1 ? '1-' + lugar.kapasitet + ' Personer' : lugar.kapasitet + ' Person';
        
        parent.append(child);
    }
}

// Genererer lugar info fordi fra db
function genererLugarDetaljer(lugar) {
    let tittel = $('.rom-tittel');
    let beskrivelse = $('.rom-beskrivelse');
    let pris = $('.rom-pris');
    let kapasitet = $('.rom-kapasitet');
    let maxReservasjon = $('.rom-max-reservasjon');
    let antallReservasjon = $('.rom-antall-reservasjon');
    let bilde = $('.rom-bilde');
    let vindu = $('.rom-vindu');
    let span = $('.rom-span');

    $("#valgt-lugar").val(lugar.lugarNummer);
    tittel.text(lugar.navn);
    pris.text(lugar.pris);
    kapasitet.text(lugar.kapasitet > 1 ? '1-' + lugar.kapasitet : lugar.kapasitet);
    maxReservasjon.text(lugar.maxReservasjon);
    antallReservasjon.text('0');
    bilde.attr('src', 'assets/lugar/air-seat.jpg');
    vindu.text('Ja');
    span.text(lugar.type);
    beskrivelse.text(lugar.beskrivelse);
}

// Viser valgte lugarer på klient siden
function visValgteLugarer(){
    let template = document.getElementById('valgt-lugar-template');
    let parent = $('#valgt-lugar-template-container');
    parent.empty();

    for(let i = 0; i < lugarer.length; i++) {
        let clone = template.content.cloneNode(true);
        let lugar = lugarer[i];
        clone.querySelector('.antall').innerText = lugar.antall;
        clone.querySelector('.tittel').innerText = lugar.tittel;
        clone.querySelector('.rom-fjern-btn').name = lugar.id;
        parent.append(clone);
    }
}

// Fjerner lugar fra arrayet og på klient siden
function fjernLugar(button){
    let toRemove = button.name;
    lugarer.forEach(function (item, index) {
        if(item.id === toRemove) {
            lugarer.splice(index, 1);
            visValgteLugarer();
        }
    });
}

// Genererer måltid detaljer fra db
function genererMaaltidDetaljer(maaltider){
    let template = document.getElementById('malltid-liste-template');
    let parent = $('#maaltid-template-container');
    parent.empty();
    
    for(let i = 0; i < maaltider.length; i++) {
        let child = template.content.cloneNode(true);
        let m = maaltider[i];
        
        // Elementene vi trenger for å vise en måltid
        let row = child.querySelector('.maaltid-row');
        let info = child.querySelector('.maaltid-info');
        let checkbox = row.querySelector('input[type="checkbox"]');
        let img = row.querySelector('img'); // TODO: hente måltid bilde fra db
        let icon = row.querySelector('.cb-icon');
        let tittel = info.querySelector('.tittel');
        let beskrivelse = info.querySelector('.beskrivelse');
        let pris = info.querySelector('.pris');
        
        // Setter verdier fra db til elementene
        row.setAttribute('id', 'maaltid-' + m.maaltidId + '-row');
        info.setAttribute('id', 'maaltid-' + m.maaltidId + '-info');
        checkbox.setAttribute('id', 'maaltid-' + m.maaltidId);
        icon.setAttribute('id', 'maaltid-' + m.maaltidId + '-ikon');
        tittel.innerText = m.maaltid;
        beskrivelse.innerText = m.beskrivelse;
        pris.innerText = m.pris;
        
        parent.append(child);
    }
}

// Genererer rute detaljer fra db
function genererRuteDetaljer(ruter){
    let template = document.getElementById('rute-liste-template');
    let parent = $('#rute-liste-container');
    parent.empty();
    
    for(let i = 0; i < ruter.length; i++) {
        let child = template.content.cloneNode(true);
        let r = ruter[i];
        let rArr = r.tur.split('-');

        // Elementene vi trenger for å vise en måltid
        let col = child.querySelector('.rute-col');
        let ruteFra = col.querySelector('.rute-fra');
        let ruteTil = col.querySelector('.rute-til');
        let pris = col.querySelector('.pris');
        let input = col.querySelector('input');
        let label = col.querySelector('label');
        let ikon = col.querySelector('.ikon');
        
        // Setter verdier fra db til elementene
        col.setAttribute('id', 'rute-' + r.ruteID + '-col');
        input.setAttribute('id', 'rute-' + r.ruteID);
        input.setAttribute('value', 'rute-' + r.ruteID);
        label.setAttribute('for', 'rute-' + r.ruteID);
        ikon.setAttribute('id', 'rute-' + r.ruteID + '-ikon');
        pris.setAttribute('id', 'rute-' + r.ruteID + '-pris');
        ruteFra.innerText = rArr[0];
        ruteTil.innerText = rArr[1];
        label.innerText = 'Velg'
        pris.innerText = r.pris;
        
        parent.append(child);
    }
}

// Oppdaterer tekst verdier på 'Se Overbestilling trinn' basert på valgt verdier på de forskjellige trinnene

function oppdaterRuteTekst(){
    let fraStedTekst = $('.fra-sted-tekst');
    let tilStedTekst = $('.til-sted-tekst');
    let fraDatoTekst = $('.fra-dato-tekst');
    let tilDatoTekst = $('.til-dato-tekst');
    let rutePrisTekst = $('.rute-pris-tekst');
    
    fraStedTekst.text(rute.ruteFra);
    tilStedTekst.text(rute.ruteTil);
    fraDatoTekst.text($('#fra-dato').val());
    tilDatoTekst.text($('#til-dato').val());
    rutePrisTekst.text(rute.pris);
}

function oppdaterReisefolgerTekst(){
    let antallVoksenTekst = $('.antall-voksen-tekst');
    let antallBarnTekst = $('.antall-barn-tekst');
    let antallDyrTekst = $('.antall-dyr-tekst');
    let antallSykkelTekst = $('.antall-sykkel-tekst');
    
    antallVoksenTekst.text(antallVoksen);
    antallBarnTekst.text(antallBarn);
    antallDyrTekst.text(antallDyr);
    antallSykkelTekst.text(antallSykler);
}

function oppdaterLugarerTekst(){
    let template = document.getElementById('valgt-lugar-tekst-template');
    let parent = $("#lugar-tekst-template-tray");
    lugarTotalPris = 0;
    parent.empty();
    
    for(let i = 0; i < lugarer.length; i++) {
        let clone = template.content.cloneNode(true);
        let textElement = clone.querySelector('small');
        textElement.textContent = lugarer[i].antall + ' x ' + lugarer[i].tittel + ',';
        lugarTotalPris += lugarer[i].pris;
        parent.append(clone);
    }
    $('.lugar-totalpris-tekst').text(lugarTotalPris);
}

function oppdaterMaaltidTekst(){
    let template = document.getElementById('valgt-maaltid-tekst-template');
    let parent = $('#maaltid-tekst-template-tray');
    maaltidTotalPris = 0;
    
    if(maaltider.length > 0) {
        parent.empty();
        for(let i = 0; i < maaltider.length; i++) {
            let clone = template.content.cloneNode(true);
            let textElement = clone.querySelector('small');
            textElement.textContent = maaltider[i].navn + ', ';
            maaltidTotalPris += maaltider[i].pris;
            parent.append(clone);
        }
    } else {
        let clone = template.content.cloneNode(true);
        let textElement = clone.querySelector('small');
        textElement.textContent = 'Ingen';
        parent.append(clone);
    }
    let totalPris = antallVoksen * maaltidTotalPris;
    $('.maaltid-totalpris-tekst').text('Voksen ('+ maaltidTotalPris +' kr) x '+ antallVoksen + ' = ' + totalPris);
    maaltidTotalPris = totalPris;
}

function oppdaterPassasjererTekst(){
    let template = document.getElementById('passasjer-tekst-template');
    let parent = $("#passasjer-tekst-template-tray");
    parent.empty();
    for(let i = 0; i < passasjerer.length; i++) {
        let clone = template.content.cloneNode(true);
        let textElement = clone.querySelector('small');
        textElement.textContent = passasjerer[i].Fornavn + ' ' + passasjerer[i].Etternavn + ',';
        parent.append(clone);
    }
}

// form hvor alle passasjerer må gi navnet og fødselsdato
function oppdaterPassasjerForm(){
    let template = document.getElementById('template-passasjer-form');
    let parent = $('#passasjerer-form-template-tray');
    parent.empty();
    
    let antallVoksen = Number($('.antall-voksen').text());
    let antallBarn = Number($('.antall-barn').text());
    let antallPassasjerer = antallVoksen + antallBarn;
    
    for(let i = 0; i < antallPassasjerer; i++) {
        let clone = template.content.cloneNode(true);
        
        // Inputs
        let passasjerTittel = clone.querySelector('.passasjer-tittel');
        let passasjerFornavnInput = clone.querySelector('input[name=fornavn]');
        let passasjerEtterNavnInput = clone.querySelector('input[name=etternavn]');
        let passasjerFodselsDatoInput = clone.querySelector('input[name=fodselsdato]');
        
        // feil meldinger
        let fornavnInputFeilMelding = clone.querySelector('.fornavn-feil-melding');
        let etternavnInputFeilMelding = clone.querySelector('.etternavn-feil-melding');
        let fodselsdatoInputFeilMelding = clone.querySelector('.fodselsdato-feil-melding');

        // assign ids to input
        passasjerTittel.innerText = 'Person ' + (i + 1);
        passasjerFornavnInput.setAttribute('id','fornavn-' + i);
        passasjerEtterNavnInput.setAttribute('id','etternavn-' + i);
        passasjerFodselsDatoInput.setAttribute('id', 'fodselsdato-' + i);
        
        // assign ids to feil meldinger
        fornavnInputFeilMelding.setAttribute('id', 'fornavn-' + i + '-feil-melding');
        etternavnInputFeilMelding.setAttribute('id', 'etternavn-' + i + '-feil-melding');
        fodselsdatoInputFeilMelding.setAttribute('id', 'fodselsdato-' + i + '-feil-melding');

        // kobler input til feil melding elementer slik at den viser på riktig input
        passasjerFornavnInput.setAttribute('aria-describedby', 'fornavn-' + i + '-feil-melding');
        passasjerEtterNavnInput.setAttribute('aria-describedby', 'etternavn-' + i + '-feil-melding');
        passasjerFodselsDatoInput.setAttribute('aria-describedby', 'fodselsdato-' + i + '-feil-melding');

        parent.append(clone);
    }
    enableBirthDatePicker();
}