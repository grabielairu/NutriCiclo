export const DAILY_TIPS = {
  menstrual: [
    { icon: "\u{1F4A4}", tip: "Tu cuerpo esta renovandose. Prioriza el descanso y no te exijas demasiado hoy." },
    { icon: "\u{1FAD6}", tip: "Un te de jengibre puede ayudar con los calambres. El jengibre tiene efecto antiinflamatorio similar al ibuprofeno." },
    { icon: "\u{1F9D8}\u200D\u2640\uFE0F", tip: "Hoy es buen dia para yoga suave o estiramientos. Movimientos lentos ayudan a aliviar la tension pelvica." },
    { icon: "\u{1F36B}", tip: "Si tienes antojo de chocolate, tu cuerpo pide magnesio. Elige chocolate oscuro 70%+ para un doble beneficio." },
    { icon: "\u{2744}\uFE0F", tip: "Aplicar calor en el abdomen dilata los vasos sanguineos y relaja los musculos, reduciendo los calambres." },
    { icon: "\u{1F4A7}", tip: "Mantente hidratada. La perdida de sangre puede deshidratarte. Agrega limon al agua para mejorar la absorcion de hierro." },
    { icon: "\u{1F34A}", tip: "Combina alimentos ricos en hierro con vitamina C. Unas gotas de limon sobre las espinacas triplican la absorcion." },
  ],
  folicular: [
    { icon: "\u{1F31F}", tip: "Tu energia esta subiendo con el estrogeno. Es un gran momento para comenzar proyectos nuevos o retomar metas." },
    { icon: "\u{1F3CB}\uFE0F\u200D\u2640\uFE0F", tip: "Tu cuerpo responde mejor al ejercicio intenso en esta fase. Aprovecha para entrenar fuerza o cardio." },
    { icon: "\u{1F9E0}", tip: "El estrogeno en ascenso mejora tu memoria y concentracion. Ideal para estudiar o aprender algo nuevo." },
    { icon: "\u{1F966}", tip: "Las cruciferas como brocoli y coliflor ayudan a tu higado a metabolizar el estrogeno que va en aumento." },
    { icon: "\u{1F91D}", tip: "Tu sociabilidad esta en ascenso. Buen momento para reuniones, networking o reconectar con amistades." },
    { icon: "\u{1F331}", tip: "La linaza molida contiene lignanos que modulan el estrogeno naturalmente. Agrega una cucharada a tu smoothie." },
    { icon: "\u{26A1}", tip: "Tu tolerancia al dolor es mayor en esta fase. Si tienes citas medicas o procedimientos, este es un buen momento." },
  ],
  ovulatoria: [
    { icon: "\u{2728}", tip: "Estas en tu pico de energia y confianza. Tu comunicacion es mas fluida y tu presencia mas magnetica." },
    { icon: "\u{1F525}", tip: "Pico de testosterona y estrogeno. Tu fuerza fisica esta en maximo. Ideal para records personales en el gym." },
    { icon: "\u{1F95A}", tip: "Los huevos son perfectos hoy: proteina completa, colina y vitamina D que apoyan la funcion reproductiva." },
    { icon: "\u{1F343}", tip: "El folato (B9) es especialmente importante ahora. Esparragos, espinacas y aguacate son excelentes fuentes." },
    { icon: "\u{1F5E3}\uFE0F", tip: "Tu habilidad verbal esta en su punto mas alto. Buen dia para presentaciones, entrevistas o conversaciones importantes." },
    { icon: "\u{1F4A1}", tip: "Tu creatividad esta al maximo. Aprovecha para brainstorming, escritura creativa o resolver problemas complejos." },
    { icon: "\u{1F95D}", tip: "Antioxidantes son clave hoy. Los berries y vegetales coloridos protegen las celulas del estres oxidativo." },
  ],
  lutea: [
    { icon: "\u{1F360}", tip: "Tu metabolismo quema hasta 300 calorias extra. Es normal tener mas hambre — honra esa senal de tu cuerpo." },
    { icon: "\u{1F9D8}\u200D\u2640\uFE0F", tip: "La progesterona alta puede generar ansiedad. La respiracion profunda 4-7-8 (inhala 4s, retiene 7s, exhala 8s) ayuda." },
    { icon: "\u{1F360}", tip: "Los carbohidratos complejos como camote y avena elevan la serotonina. No son antojos — es tu cuerpo pidiendo lo que necesita." },
    { icon: "\u{1F30A}", tip: "La retencion de liquidos es normal por la progesterona. Reduce el sodio y aumenta alimentos ricos en potasio." },
    { icon: "\u{1F9F2}", tip: "El magnesio reduce sintomas de PMS hasta un 35%. Chocolate oscuro, almendras y espinacas son tus aliados." },
    { icon: "\u{1F6CC}", tip: "La progesterona tiene efecto sedante natural. Si sientes mas sueno, es tu cuerpo preparandose — no te resistas." },
    { icon: "\u{1F9D6}\u200D\u2640\uFE0F", tip: "Baja la intensidad del ejercicio. Pilates, caminatas o natacion son perfectos para esta fase." },
    { icon: "\u{1F4D3}", tip: "Journaling puede ayudar a procesar emociones intensas de esta fase. Escribe 3 cosas por las que estes agradecida." },
  ],
};

export function getTipForDay(phaseName, dayInPhase) {
  const tips = DAILY_TIPS[phaseName];
  if (!tips || tips.length === 0) return { icon: "\u{1F33F}", tip: "Escucha a tu cuerpo y dale lo que necesita hoy." };
  return tips[Math.abs(dayInPhase) % tips.length];
}
