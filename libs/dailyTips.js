export const DAILY_TIPS = {
  menstrual: [
    { icon: "\u{1F4A4}", tip: "Tu cuerpo está renovándose. Prioriza el descanso y no te exijas demasiado hoy." },
    { icon: "\u{1FAD6}", tip: "Un té de jengibre puede ayudar con los calambres. El jengibre tiene efecto antiinflamatorio similar al ibuprofeno." },
    { icon: "\u{1F9D8}\u200D\u2640\uFE0F", tip: "Hoy es buen día para yoga suave o estiramientos. Movimientos lentos ayudan a aliviar la tensión pelvica." },
    { icon: "\u{1F36B}", tip: "Si tienes antojo de chocolate, tu cuerpo pide magnesio. Elige chocolate oscuro 70%+ para un doble beneficio." },
    { icon: "\u{2744}\uFE0F", tip: "Aplicar calor en el abdomen dilata los vasos sanguíneos y relaja los músculos, reduciendo los calambres." },
    { icon: "\u{1F4A7}", tip: "Mantente hidratada. La pérdida de sangre puede deshidratarte. Agrega limón al agua para mejorar la absorción de hierro." },
    { icon: "\u{1F34A}", tip: "Combina alimentos ricos en hierro con vitamina C. Unas gotas de limón sobre las espinacas triplican la absorción." },
  ],
  folicular: [
    { icon: "\u{1F31F}", tip: "Tu energía está subiendo con el estrógeno. Es un gran momento para comenzar proyectos nuevos o retomar metas." },
    { icon: "\u{1F3CB}\uFE0F\u200D\u2640\uFE0F", tip: "Tu cuerpo responde mejor al ejercicio intenso en esta fase. Aprovecha para entrenar fuerza o cardio." },
    { icon: "\u{1F9E0}", tip: "El estrogeno en ascenso mejora tu memoria y concentración. Ideal para estudiar o aprender algo nuevo." },
    { icon: "\u{1F966}", tip: "Las crucíferas como brócoli y coliflor ayudan a tu hígado a metabolizar el estrógeno que va en aumento." },
    { icon: "\u{1F91D}", tip: "Tu sociabilidad está en ascenso. Buen momento para reuniones, networking o reconectar con amistades." },
    { icon: "\u{1F331}", tip: "La linaza molida contiene lignanos que modulan el estrógeno naturalmente. Agrega una cucharada a tu smoothie." },
    { icon: "\u{26A1}", tip: "Tu tolerancia al dolor es mayor en esta fase. Si tienes citas médicas o procedimientos, este es un buen momento." },
  ],
  ovulatoria: [
    { icon: "\u{2728}", tip: "Estás en tu pico de energía y confianza. Tu comunicación es más fluida y tu presencia más magnética." },
    { icon: "\u{1F525}", tip: "Pico de testosterona y estrógeno. Tu fuerza física está en máximo. Ideal para records personales en el gym." },
    { icon: "\u{1F95A}", tip: "Los huevos son perfectos hoy: proteína completa, colina y vitamina D que apoyan la función reproductiva." },
    { icon: "\u{1F343}", tip: "El folato (B9) es especialmente importante ahora. Espárragos, espinacas y aguacate son excelentes fuentes." },
    { icon: "\u{1F5E3}\uFE0F", tip: "Tu habilidad verbal está en su punto más alto. Buen día para presentaciones, entrevistas o conversaciones importantes." },
    { icon: "\u{1F4A1}", tip: "Tu creatividad está al máximo. Aprovecha para brainstorming, escritura creativa o resolver problemas complejos." },
    { icon: "\u{1F95D}", tip: "Antioxidantes son clave hoy. Los berries y vegetales coloridos protegen las células del estrés oxidativo." },
  ],
  lutea: [
    { icon: "\u{1F360}", tip: "Tu metabolismo quema hasta 300 calorías extra. Es normal tener más hambre — honra esa señal de tu cuerpo." },
    { icon: "\u{1F9D8}\u200D\u2640\uFE0F", tip: "La progesterona alta puede generar ansiedad. La respiración profunda 4-7-8 (inhala 4s, retiene 7s, exhala 8s) ayuda." },
    { icon: "\u{1F360}", tip: "Los carbohidratos complejos como camote y avena elevan la serotonina. No son antojos — es tu cuerpo pidiendo lo que necesita." },
    { icon: "\u{1F30A}", tip: "La retención de líquidos es normal por la progesterona. Reduce el sodio y aumenta alimentos ricos en potasio." },
    { icon: "\u{1F9F2}", tip: "El magnesio reduce síntomas de PMS hasta un 35%. Chocolate oscuro, almendras y espinacas son tus aliados." },
    { icon: "\u{1F6CC}", tip: "La progesterona tiene efecto sedante natural. Si sientes más sueño, es tu cuerpo preparándose — no te resistas." },
    { icon: "\u{1F9D6}\u200D\u2640\uFE0F", tip: "Baja la intensidad del ejercicio. Pilates, caminatas o natación son perfectos para esta fase." },
    { icon: "\u{1F4D3}", tip: "Journaling puede ayudar a procesar emociones intensas de esta fase. Escribe 3 cosas por las que estés agradecida." },
  ],
};

export function getTipForDay(phaseName, dayInPhase) {
  const tips = DAILY_TIPS[phaseName];
  if (!tips || tips.length === 0) return { icon: "\u{1F33F}", tip: "Escucha a tu cuerpo y dale lo que necesita hoy." };
  return tips[Math.abs(dayInPhase) % tips.length];
}
