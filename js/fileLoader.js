async function loadEncryptedJSON(event) {
    try {
        const file = event.target.files[0];
        if (!file) {
            alert("Fehler: Keine Datei ausgewählt.");
            return;
        }

        const reader = new FileReader();
        reader.onload = async function (e) {
            try {
                const encryptedData = e.target.result;

                // Passwort über Prompt abfragen
                const password = prompt("Geben Sie das Passwort ein, um die Datei zu entschlüsseln:");
                if (!password) {
                    alert("Laden abgebrochen. Kein Passwort eingegeben.");
                    return;
                }

                // Entschlüsselung mit AES
                const bytes = CryptoJS.AES.decrypt(encryptedData, password);
                const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

                // Fehlerhandling, falls die Entschlüsselung fehlschlägt
                if (!decryptedData) {
                    throw new Error("Falsches Passwort oder beschädigte Datei.");
                }

                const parsedData = JSON.parse(decryptedData);
                
                // Blazor-Methode aufrufen
                await DotNet.invokeMethodAsync("HRWebApp", "SetSalaryData", parsedData);
                
                alert("Die Datei wurde erfolgreich geladen.");
            } catch (error) {
                alert("Fehler beim Laden der Datei: Falsches Passwort oder beschädigte Datei.");
                console.error("Lade-Fehler:", error);
            }
        };

        reader.readAsText(file);
    } catch (error) {
        alert("Fehler beim Laden der Datei.");
        console.error("Allgemeiner Fehler:", error);
    }
}
