async function generatePDF(brutto, steuerklasse, urlaub, arbeitszeit, firmenwagen, jobrad, nettoJahr, nettoMonat) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // 📌 Firmenlogo sicher laden (async)
    const logo = new Image();
    logo.src = "/images/logo.png"; // Nutze eine lokale Datei


    logo.onload = function () {
        doc.addImage(logo, "PNG", 150, 10, 40, 15);
        generatePDFContent(doc, brutto, steuerklasse, urlaub, arbeitszeit, firmenwagen, jobrad, nettoJahr, nettoMonat);
    };

    logo.onerror = function () {
        console.warn("⚠️ Logo nicht gefunden. PDF wird ohne Logo erstellt.");
        generatePDFContent(doc, brutto, steuerklasse, urlaub, arbeitszeit, firmenwagen, jobrad, nettoJahr, nettoMonat);
    };
}

function generatePDFContent(doc, brutto, steuerklasse, urlaub, arbeitszeit, firmenwagen, jobrad, nettoJahr, nettoMonat) {
    // 🏛 Titel
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("HR Gehaltsrechner - Ergebnis", 10, 20);

    // 🔹 Abschnitts-Trennung
    doc.setLineWidth(0.5);
    doc.line(10, 25, 200, 25);

    // 📋 Informationen formatieren
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Eingaben:", 10, 35);

    doc.setFont("helvetica", "normal");
    doc.text(` Brutto-Gehalt: ${brutto} €`, 10, 45);
    doc.text(` Steuerklasse: ${steuerklasse}`, 10, 55);
    doc.text(` Urlaubstage: ${urlaub}`, 10, 65);
    doc.text(` Arbeitszeit: ${arbeitszeit} Std./Woche`, 10, 75);
    doc.text(` Firmenwagen: ${firmenwagen}`, 10, 85);

    if (jobrad === "Ja") {
        doc.text(` JobRad genutzt: Ja`, 10, 95);
    }

    // 🔹 Abschnitts-Trennung
    doc.setLineWidth(0.5);
    doc.line(10, 105, 200, 105);

    // 📊 Netto-Gehalt
    doc.setFont("helvetica", "bold");
    doc.text("Ergebnis:", 10, 115);

    doc.setFont("helvetica", "normal");
    doc.text(` Netto-Jahresgehalt: ${nettoJahr} €`, 10, 125);
    doc.text(` Netto-Monatsgehalt: ${nettoMonat} €`, 10, 135);

    // 🔻 Abschlusslinie
    doc.setLineWidth(0.5);
    doc.line(10, 145, 200, 145);

    // 📅 Datum
    doc.setFontSize(10);
    doc.text(`Erstellt am: ${new Date().toLocaleDateString("de-DE")}`, 10, 155);

    // 📂 PDF speichern
    doc.save("Gehaltsberechnung.pdf");
}
