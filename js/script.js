function toggleTooltip(event) {
    // Suche das nächste Element mit der Klasse "tooltip-text"
    let tooltipText = event.target.closest(".info-container").querySelector(".tooltip-text");

    if (!tooltipText) {
        console.error("❌ Tooltip-Element nicht gefunden!");
        return;
    }

    // Sichtbarkeit umschalten
    if (tooltipText.style.visibility === "visible") {
        tooltipText.style.visibility = "hidden";
        tooltipText.style.opacity = "0";
        tooltipText.style.transform = "translateY(-5px)"; // Nach oben ausblenden
    } else {
        tooltipText.style.visibility = "visible";
        tooltipText.style.opacity = "1";
        tooltipText.style.transform = "translateY(0)"; // Einblenden
    }
}
