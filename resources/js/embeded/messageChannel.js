export default function initMessageChannel(){
    window.addEventListener("message", (event) => {
        if (typeof(event.data) === "string") {
            if (event.data.toLowerCase() == "retrieve-shoppingcart") {
                let response = '{"geschaeftsprozessID":"2fab08cd-6c31-44dc-9dc6-64c8b6169e8e","befoerderte":[{"ermaessigungen":["Kinder-Mitfahrkarte","BahnCard 25"],"altersGruppe":[],"klassen":[]},{"ermaessigungen":["keine Ermässigung"],"altersGruppe":[],"klassen":[]},{"ermaessigungen":["GA 1. Klasse"],"altersGruppe":[],"klassen":[]}],"bausteine":[{"von":"Basel SBB","nach":"Paris-Est","klasse":"erste Klasse","preis":"65.00 CHF","typ":"Beförderung","zonenNummern":[]},{"von":"Sion","nach":"Basel SBB","klasse":"erste Klasse","preis":"152.10 CHF","typ":"Beförderung","zonenNummern":[]},{"von":"Basel SBB","nach":"Paris-Est","klasse":"erste Klasse","preis":"65.00 CHF","typ":"Beförderung","zonenNummern":[]},{"von":"Strasbourg","nach":"Paris-Est","klasse":"erste Klasse","preis":"0.00 CHF","typ":"Platzreservierung","zonenNummern":[]},{"von":"Sion","nach":"Basel SBB","klasse":"erste Klasse","preis":"0.00 CHF","typ":"Beförderung","zonenNummern":[]},{"von":"Strasbourg","nach":"Paris-Est","klasse":"erste Klasse","preis":"0.00 CHF","typ":"Platzreservierung","zonenNummern":[]},{"von":"Sion","nach":"Basel SBB","klasse":"erste Klasse","preis":"0.00 CHF","typ":"Beförderung","zonenNummern":[]},{"von":"Strasbourg","nach":"Paris-Est","klasse":"erste Klasse","preis":"0.00 CHF","typ":"Platzreservierung","zonenNummern":[]},{"von":"Basel SBB","nach":"Paris-Est","klasse":"erste Klasse","preis":"33.00 CHF","typ":"Beförderung","zonenNummern":[]}],"gesamtbetrag":"315.10 CHF"}'
               event.source.postMessage(response, event.origin);
            } else {
                console.log("received unknown request", event.data, event);
            }
        }
    }, false);
}

