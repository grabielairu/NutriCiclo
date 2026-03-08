import { jsPDF } from "jspdf";
import { calculatePhases } from "@/libs/cycle";
import { PHASE_COLORS } from "@/libs/constants";

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [0, 0, 0];
}

function drawCycleDonut(doc, cx, cy, radius, phases, currentDay, cycleLength) {
  const lineWidth = 6;
  const segments = 120;

  // Draw phase arcs using small line segments
  phases.forEach((phase) => {
    const color = hexToRgb(PHASE_COLORS[phase.name]);
    doc.setDrawColor(...color);
    doc.setLineWidth(lineWidth);

    const startAngle = ((phase.startDay - 1) / cycleLength) * 2 * Math.PI - Math.PI / 2;
    const endAngle = (phase.endDay / cycleLength) * 2 * Math.PI - Math.PI / 2;
    const phaseSegments = Math.max(Math.ceil(((endAngle - startAngle) / (2 * Math.PI)) * segments), 2);

    for (let i = 0; i < phaseSegments; i++) {
      const a1 = startAngle + (i / phaseSegments) * (endAngle - startAngle);
      const a2 = startAngle + ((i + 1) / phaseSegments) * (endAngle - startAngle);
      const x1 = cx + radius * Math.cos(a1);
      const y1 = cy + radius * Math.sin(a1);
      const x2 = cx + radius * Math.cos(a2);
      const y2 = cy + radius * Math.sin(a2);
      doc.line(x1, y1, x2, y2);
    }
  });

  // Current day marker
  const dayAngle = ((currentDay - 1) / cycleLength) * 2 * Math.PI - Math.PI / 2;
  const markerX = cx + radius * Math.cos(dayAngle);
  const markerY = cy + radius * Math.sin(dayAngle);
  doc.setFillColor(45, 59, 45);
  doc.circle(markerX, markerY, 3, "F");
  doc.setFillColor(255, 255, 255);
  doc.circle(markerX, markerY, 1.5, "F");

  // Center text
  doc.setTextColor(45, 59, 45);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(`${currentDay}`, cx, cy - 2, { align: "center" });
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120, 120, 120);
  doc.text(`de ${cycleLength} dias`, cx, cy + 5, { align: "center" });

  // Reset line width
  doc.setLineWidth(0.2);
}

export function generateCyclePDF({
  name,
  cycleLength,
  periodDuration,
  currentDay,
  phaseName,
  phaseData,
  daysLeft,
  nextPeriod,
  foods,
  tip,
  alerts,
  regionLabel,
  dietLabel,
  ovulationDay,
}) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  const phaseColor = hexToRgb(phaseData.color);
  const phases = calculatePhases(cycleLength, periodDuration, ovulationDay);

  // Header bar
  doc.setFillColor(...phaseColor);
  doc.rect(0, 0, pageWidth, 35, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("NutriCiclo", margin, 18);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Resumen de ${name}`, margin, 28);
  const dateStr = new Date().toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  doc.text(dateStr, pageWidth - margin, 28, { align: "right" });

  y = 45;

  // Donut chart + Phase info side by side
  const donutCx = margin + 25;
  const donutCy = y + 25;
  const donutRadius = 18;

  drawCycleDonut(doc, donutCx, donutCy, donutRadius, phases, currentDay, cycleLength);

  // Phase info to the right of the donut
  const infoX = donutCx + donutRadius + 15;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.text(`Fase ${phaseData.name}`, infoX, y + 8);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  doc.text(`Dia ${currentDay} de ${cycleLength}`, infoX, y + 16);
  const statusText = daysLeft === 0 ? "Ultimo dia de esta fase" : `${daysLeft} dias restantes`;
  doc.text(statusText, infoX, y + 23);
  doc.text(
    `Proximo periodo: ${nextPeriod.toLocaleDateString("es-MX", { day: "numeric", month: "long" })}`,
    infoX,
    y + 30
  );
  let infoY = y + 37;
  if (regionLabel && regionLabel !== "General") {
    doc.text(`Region: ${regionLabel}`, infoX, infoY);
    infoY += 7;
  }
  if (dietLabel && dietLabel !== "General") {
    doc.text(`Dieta: ${dietLabel}`, infoX, infoY);
  }

  y = donutCy + donutRadius + 15;

  // Phase description
  doc.setFillColor(...phaseColor);
  doc.rect(margin, y, 3, 14, "F");
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  const descLines = doc.splitTextToSize(phaseData.description, contentWidth - 10);
  doc.text(descLines, margin + 8, y + 5);
  y += descLines.length * 5 + 10;

  // Tip del dia
  if (tip) {
    const tipText = tip.tip;
    const tipLines = doc.splitTextToSize(tipText, contentWidth - 18);
    const tipHeight = tipLines.length * 4.5 + 14;

    doc.setFillColor(245, 245, 235);
    doc.roundedRect(margin, y, contentWidth, tipHeight, 3, 3, "F");
    doc.setFillColor(...phaseColor);
    doc.rect(margin, y, 3, tipHeight, "F");

    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...phaseColor);
    doc.text("TIP DEL DIA", margin + 8, y + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text(tipLines, margin + 8, y + 12);
    y += tipHeight + 5;
  }

  y += 3;

  // Foods section
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Alimentos recomendados", margin, y);
  y += 8;

  doc.setFontSize(10);
  foods.forEach((food) => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    doc.setFillColor(...phaseColor);
    doc.circle(margin + 2, y + 2, 1.5, "F");

    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text(food.name, margin + 7, y + 3);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    const reasonLines = doc.splitTextToSize(food.reason, contentWidth - 10);
    doc.text(reasonLines, margin + 7, y + 1);
    y += reasonLines.length * 4 + 4;
    doc.setFontSize(10);
  });

  // Alerts section
  if (alerts && alerts.length > 0) {
    y += 5;
    if (y > 240) {
      doc.addPage();
      y = 20;
    }

    // Calculate dynamic height
    let alertContentHeight = 10;
    const alertLineArrays = alerts.map((alert) => {
      const lines = doc.splitTextToSize(alert, contentWidth - 18);
      alertContentHeight += lines.length * 4 + 3;
      return lines;
    });

    doc.setFillColor(255, 243, 224);
    doc.roundedRect(margin, y, contentWidth, alertContentHeight, 3, 3, "F");
    doc.setFillColor(245, 158, 11);
    doc.rect(margin, y, 3, alertContentHeight, "F");

    y += 8;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(120, 53, 15);
    doc.text("Consulta con un profesional", margin + 8, y);
    y += 7;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(146, 64, 14);
    alertLineArrays.forEach((lines) => {
      doc.text(lines, margin + 8, y);
      y += lines.length * 4 + 3;
    });

    y += 5;
  }

  // Footer disclaimer
  if (y > 270) {
    doc.addPage();
    y = 20;
  }
  y += 5;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "Esta informacion es educativa y no reemplaza el consejo medico profesional. Siempre consulta con un especialista.",
    pageWidth / 2,
    y,
    { align: "center" }
  );
  y += 4;
  doc.text("Generado con NutriCiclo - nutriciclo.com", pageWidth / 2, y, { align: "center" });

  // Save
  doc.save("NutriCiclo-resumen.pdf");
}

export function openWhatsAppShare({ phaseName, currentDay, cycleLength }) {
  const message = encodeURIComponent(
    `Hola! Te comparto mi resumen de ciclo de NutriCiclo.\n\nEstoy en la fase ${phaseName}, dia ${currentDay} de ${cycleLength}.\n\nDescubre mas en nutriciclo.com`
  );
  window.open(`https://wa.me/?text=${message}`, "_blank");
}
