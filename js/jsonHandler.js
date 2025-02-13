/**
 * 📁 JSON-Datei sicher verschlüsseln und speichern
 */
async function saveEncryptedJSON(jsonData) {
    try {
        const fileName = prompt("Geben Sie den Namen der JSON-Datei ein:", "gehaltspaket");
        if (!fileName) return; // Falls der Benutzer abbricht

        const password = prompt("Setzen Sie ein Passwort für die Datei:");
        if (!password) {
            alert("Speichern abgebrochen. Kein Passwort eingegeben.");
            return;
        }

        // JSON-Daten in String umwandeln und verschlüsseln
        const jsonString = JSON.stringify(jsonData);
        const encryptedData = CryptoJS.AES.encrypt(jsonString, password).toString();

        // Datei speichern
        const blob = new Blob([encryptedData], { type: "application/json" });
        saveAs(blob, `${fileName}.json`);

        alert("✅ Die Datei wurde sicher verschlüsselt gespeichert.");
    } catch (error) {
        console.error("❌ Fehler beim Speichern:", error);
        alert("Fehler beim Speichern der Datei.");
    }
}

/**
 * 📂 Datei hochladen, entschlüsseln und JSON-Daten an Blazor senden
 */
async function loadEncryptedJSON(event) {
    try {
        const file = event.target.files[0];
        if (!file) {
            alert("❌ Fehler: Keine Datei ausgewählt.");
            return;
        }

        // 🔒 Passwort vom Benutzer abfragen
        const password = prompt("🔑 Geben Sie das Passwort ein, um die Datei zu entschlüsseln:");
        if (!password) {
            alert("Laden abgebrochen. Kein Passwort eingegeben.");
            return;
        }

        const reader = new FileReader();
        reader.onload = async function () {
            try {
                const encryptedData = reader.result;

                // **Entschlüsselung mit AES**
                const bytes = CryptoJS.AES.decrypt(encryptedData, password);
                const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

                // Fehler abfangen, falls die Entschlüsselung fehlschlägt
                if (!decryptedData) {
                    throw new Error("❌ Falsches Passwort oder beschädigte Datei.");
                }

                // **JSON-Daten parsen**
                const parsedData = JSON.parse(decryptedData);
                
                // ✅ Blazor-Interop: Setzt die geladenen Daten in Blazor
                await DotNet.invokeMethodAsync("HRWebApp", "SetSalaryData", parsedData);

                alert("✅ Die Datei wurde erfolgreich geladen.");
            } catch (error) {
                alert("❌ Fehler beim Laden der Datei: Falsches Passwort oder beschädigte Datei.");
                console.error("Lade-Fehler:", error);
            }
        };

        reader.readAsText(file);
    } catch (error) {
        alert("❌ Fehler beim Laden der Datei.");
        console.error("Allgemeiner Fehler:", error);
    }
}
/**
 * 🔓 JSON-Entschlüsselung mit AES
 */
function decryptJSON(encryptedData, password) {
    try {
        if (!encryptedData || !password) {
            console.error("❌ Fehler: Keine Daten oder kein Passwort angegeben.");
            return null;
        }

        // **AES-Entschlüsselung**
        const bytes = CryptoJS.AES.decrypt(encryptedData, password);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedData) {
            throw new Error("❌ Falsches Passwort oder beschädigte Datei.");
        }

        return decryptedData;
    } catch (error) {
        console.error("❌ Fehler bei der Entschlüsselung:", error);
        return null;
    }
}
