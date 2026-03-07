export const PHASE_COLORS = {
  menstrual: "#C97B6B",
  folicular: "#7DB87D",
  ovulatoria: "#5CAD5C",
  lutea: "#C4A882",
};

export const PHASES = {
  menstrual: {
    name: "Menstrual",
    emoji: "🌙",
    color: PHASE_COLORS.menstrual,
    description:
      "Estrogeno y progesterona en su punto mas bajo. Tu cuerpo necesita recuperar hierro y reducir inflamacion.",
    foods: [
      {
        name: "Salmon",
        reason:
          "Omega-3 (EPA/DHA) reduce calambres al disminuir prostaglandinas inflamatorias que causan contracciones uterinas.",
      },
      {
        name: "Espinacas y kale",
        reason:
          "Ricas en hierro y magnesio. Reponen el hierro perdido durante la menstruacion y relajan la musculatura uterina.",
      },
      {
        name: "Chocolate oscuro 70%+",
        reason:
          "64mg de magnesio por onza. Estimula serotonina y endorfinas, mejorando el animo cuando el estrogeno esta bajo.",
      },
      {
        name: "Jengibre",
        reason:
          "Estudios clinicos muestran que reduce el dolor menstrual con eficacia similar al ibuprofeno. Modula la percepcion del dolor.",
      },
      {
        name: "Lentejas",
        reason:
          "Fuente vegetal de hierro y vitaminas B. Previenen caidas de azucar en sangre que empeoran los cambios de humor.",
      },
      {
        name: "Platanos",
        reason:
          "Vitamina B6 es cofactor en la produccion de serotonina, el neurotransmisor del bienestar que baja con el estrogeno.",
      },
      {
        name: "Curcuma",
        reason:
          "La curcumina modula las vias inflamatorias NF-kB que contribuyen al dolor menstrual. Mejor con pimienta negra.",
      },
      {
        name: "Naranjas y berries",
        reason:
          "Vitamina C aumenta significativamente la absorcion de hierro no-hemo, critico durante el sangrado menstrual.",
      },
    ],
  },

  folicular: {
    name: "Folicular",
    emoji: "🌱",
    color: PHASE_COLORS.folicular,
    description:
      "El estrogeno sube progresivamente. Tu energia crece, tu metabolismo es eficiente y tu cuerpo responde bien al ejercicio intenso.",
    foods: [
      {
        name: "Brocoli y coliflor",
        reason:
          "Contienen indol-3-carbinol (I3C) y DIM que apoyan al higado en metabolizar el estrogeno que va en aumento.",
      },
      {
        name: "Linaza molida",
        reason:
          "Alta en lignanos (fitoestrogenos) que modulan la actividad del estrogeno, ayudando a mantener el balance hormonal.",
      },
      {
        name: "Semillas de calabaza",
        reason:
          "Ricas en zinc, mineral critico para la sintesis de FSH y LH, apoyando el desarrollo saludable del foliculo.",
      },
      {
        name: "Proteinas magras (pollo, tofu)",
        reason:
          "El estrogeno en ascenso favorece la sintesis de proteina muscular. Aprovecha esta ventana anabolica natural.",
      },
      {
        name: "Quinoa y avena",
        reason:
          "Carbohidratos complejos que dan energia sostenida para entrenamientos mas intensos que esta fase permite.",
      },
      {
        name: "Aguacate",
        reason:
          "Grasas monoinsaturadas esenciales para la produccion hormonal. Todas las hormonas esteroideas se construyen desde el colesterol.",
      },
      {
        name: "Kimchi y yogurt",
        reason:
          "Apoyan el estroboloma (microbioma intestinal que metaboliza estrogeno), asegurando una excrecion saludable.",
      },
      {
        name: "Berries (arandanos, fresas)",
        reason:
          "Antioxidantes que protegen la actividad celular del desarrollo folicular. Bajos en azucar, altos en fibra.",
      },
    ],
  },

  ovulatoria: {
    name: "Ovulatoria",
    emoji: "✨",
    color: PHASE_COLORS.ovulatoria,
    description:
      "Pico de estrogeno y testosterona. Maxima energia, claridad mental y fuerza fisica. Tu cuerpo esta en su punto mas alto.",
    foods: [
      {
        name: "Cruciferas (col, brocoli)",
        reason:
          "Aun mas importantes ahora: el higado procesa el pico maximo de estrogeno. I3C y DIM facilitan la conversion segura.",
      },
      {
        name: "Esparragos y espinacas",
        reason:
          "Ricos en folato (B9), vital para la division celular y sintesis de ADN durante la liberacion del ovulo.",
      },
      {
        name: "Huevos",
        reason:
          "Proteina completa con colina (integridad de membranas celulares), vitamina D y B12. El colesterol apoya la produccion hormonal.",
      },
      {
        name: "Vegetales coloridos",
        reason:
          "Antocianos y vitamina C protegen las celulas reproductivas del estres oxidativo durante la ovulacion.",
      },
      {
        name: "Almendras y semillas de girasol",
        reason:
          "Vitamina E protege la funcion ovarica. El selenio de las semillas apoya la tiroides, ligada al balance reproductivo.",
      },
      {
        name: "Pescado y carne magra",
        reason:
          "Vitaminas B6 y B12 regulan estrogeno y progesterona. B6 apoya la formacion del cuerpo luteo post-ovulacion.",
      },
      {
        name: "Granos integrales",
        reason:
          "Fibra que ayuda al higado a procesar el pico de estrogeno. Vitaminas B para el metabolismo energetico en su punto mas alto.",
      },
      {
        name: "Aguacate y aceite de oliva",
        reason:
          "Grasas saludables esenciales para que el cuerpo luteo produzca progesterona en la transicion a la fase lutea.",
      },
    ],
  },

  lutea: {
    name: "Lutea",
    emoji: "🍂",
    color: PHASE_COLORS.lutea,
    description:
      "La progesterona sube y domina. Tu metabolismo aumenta ~300 cal/dia. Es normal tener mas hambre y antojos, tu cuerpo lo necesita.",
    foods: [
      {
        name: "Chocolate oscuro",
        reason:
          "El magnesio reduce sintomas de PMS en 33-35% segun estudios doble ciego. Ademas eleva serotonina que esta bajando.",
      },
      {
        name: "Camote / batata",
        reason:
          "Carbohidratos complejos que elevan serotonina via triptofano sin picos de azucar. Vitamina A apoya la piel contra el acne hormonal.",
      },
      {
        name: "Salmon",
        reason:
          "Omega-3 reduce prostaglandinas pre-menstruales. Vitamina D + calcio juntos reducen significativamente hinchazon y dolor.",
      },
      {
        name: "Yogurt griego",
        reason:
          "Calcio (1000-1200mg/dia) reduce la severidad general del PMS segun evidencia clinica. Probioticos apoyan la digestion lenta.",
      },
      {
        name: "Semillas de calabaza y almendras",
        reason:
          "Entre las fuentes mas altas de magnesio alimentario. Reduce retencion de liquidos, sensibilidad mamaria e hinchazon.",
      },
      {
        name: "Avena y granos integrales",
        reason:
          "Tu metabolismo quema hasta 300 calorias extra. Los carbohidratos complejos dan combustible real y estabilizan el azucar.",
      },
      {
        name: "Garbanzos y lentejas",
        reason:
          "Vitamina B6 apoya la produccion de progesterona y puede aumentar serotonina. Fibra contrarresta el estrenimiento por progesterona.",
      },
      {
        name: "Platanos y espinacas",
        reason:
          "Potasio reduce retencion de agua. Magnesio y hierro preparan reservas para la menstruacion que viene.",
      },
    ],
  },
};
