// Copy en español. Adaptación natural del inglés (no traducción literal), tuteo, neutro
// latinoamericano. Mismas claves que en.mjs: el build falla si falta alguna.
// Marcadores que rellena build.mjs desde src/config.json:
//   {price} {bump} {pages} {buyers} {refunds} {product} {bumpName}
// Afirmaciones científicas: solo las formulaciones aprobadas (ver docs/COPY.md).

export default {
  lang: 'es',
  htmlLang: 'es',
  base: '/',
  bridge: '/es/go/blueprint/',
  product: 'El Manual del Físico de Dios Griego',
  bumpName: 'El Manual de la Testosterona',
  author: 'Aesthetic Engineer',
  mockup: { src: 'assets/carousel/mockup-es.webp?v=2', src720: 'assets/carousel/mockup-es-720.webp?v=2', alt: 'El Manual del Físico de Dios Griego, portada de la guía en PDF' },
  insideMockup: { src: 'assets/aesthetic-blueprint-mockup-es.webp', width: 640, height: 1008, alt: 'Portada del Manual del Físico de Dios Griego, guía en PDF' },

  meta: {
    title: 'Sal del skinny fat en el orden correcto | El Manual del Físico de Dios Griego',
    description: 'Primero baja la grasa hasta una base, luego gana músculo sin volver a engordar. El sistema de fases para el skinny fat, con tus primeros 30 días ya trazados. {price}.',
    ogTitle: 'El Manual del Físico de Dios Griego',
    ogDescription: 'Sal del skinny fat en el orden correcto: primero defines, luego construyes sin volver a engordar. {price}.',
    ogImage: 'https://aesthetic-engineer.com/assets/og-image-es.jpeg?v=3',
    ogLocale: 'es_LA',
    ogLocaleAlt: 'en_US',
    canonical: 'https://aesthetic-engineer.com/es/',
  },

  cta: 'Quiero el Manual',
  ctaNote: '{price} · pago único · PDF al instante',
  skip: 'Saltar al contenido',

  sticky: { note: 'PDF al instante · Pago único de {price}' },

  langSwitch: { label: 'Idioma' },

  carousel: {
    label: 'Vista previa del producto',
    prev: 'Diapositiva anterior',
    next: 'Diapositiva siguiente',
    goTo: 'Ir a la diapositiva',
    of: 'de',
    author: {
      label: 'El autor, el primero en aplicar el sistema',
      before: 'Antes',
      after: 'Después',
      altBefore: 'El autor antes del sistema: blando, con cerca de 30% de grasa',
      altAfter: 'El autor después de corregir el orden: definido, con abdomen marcado',
    },
    objection: {
      big: 'Sin volumen sucio.<br />Sin pasar hambre.',
      sub: 'Primero quitas la capa blanda. Luego ganas músculo sin volver a engordar.',
    },
    types: {
      title: 'Hecho para donde <em>estás hoy.</em>',
      rows: [
        ['Skinny fat', 'Pierde la barriga. Conserva el músculo.'],
        ['Flaco', 'Gana tamaño sin la grasa del volumen sucio.'],
        ['Estancado', 'Sabe qué cambiar cuando el progreso se frena.'],
      ],
    },
    compare: {
      title: 'El sistema vs. <em>consejos sueltos</em>',
      left: 'Consejos sueltos',
      right: 'El Manual',
      rows: [
        ['Adivinas por dónde empezar', 'Un árbol de decisión te lo dice'],
        ['"Come mucho" o "come limpio"', 'Calorías calculadas para tu fase'],
        ['Series que paras antes de tiempo', 'Series duras, cerca del fallo'],
        ['Te guías por el espejo', 'Un registro semanal'],
        ['Cambias de fase por intuición', 'Reglas claras para cambiar'],
      ],
    },
    guarantee: {
      title: 'Pruébalo <em>7 días.</em>',
      body: 'Léelo. Aplícalo. Si no es para ti, escríbeme y te devuelvo cada centavo.',
      badge: 'Días de garantía',
    },
  },

  proof: '{buyers}+ ya tienen el sistema · {refunds}&nbsp;reembolsos',

  hero: {
    badge: 'Ciencia · Natural · Sin relleno',
    h1: 'Sal del skinny fat en el <em>orden correcto</em>, con tus primeros 30 días ya trazados.',
    sub: 'Primero bajas la grasa hasta una base, luego ganas músculo sin volver a engordar. Sin otro volumen sucio, sin horas de cardio y sin una dieta que dejas en la segunda semana.',
    benefits: [
      'Sabes si te toca definir o ganar músculo primero. Se acabó adivinar.',
      'Pierdes la barriga blanda sin que se te encojan los brazos y el pecho.',
      'Construyes hombros más anchos y brazos más grandes sin que vuelva la grasa.',
      'Creces con pocas series de verdad duras, incluso en una semana ocupada.',
    ],
  },

  offer: {
    includes: 'Manual de {pages} páginas · plan de 30 días · 2 herramientas de regalo',
    oneTime: 'pago único',
    trust: ['PDF al instante', 'Garantía de reembolso de 7 días', 'Pago seguro con Hotmart'],
    bump: 'Opcional al pagar: {bumpName}, +{bump}.',
    popular: 'El más elegido',
    tierCta: 'Elegir',
    miniFaq: [
      ['¿Flaco o skinny fat: me sirve a mí?', 'Sí. El árbol de decisión te dice en qué fase empezar según tu grasa corporal y tus años entrenando. No tienes que adivinar.'],
      ['¿Necesito suplementos o TRT?', 'No. Está hecho para quien entrena natural. Con un gimnasio básico y comida normal basta.'],
      ['¿Cómo lo recibo?', 'Justo después de pagar. El PDF y las dos hojas de Google, en tu celular o tu computadora.'],
    ],
  },

  trap: {
    eyebrow: 'La trampa',
    h2: 'No tienes mala genética. <em>Tienes un mal mapa.</em>',
    lead: 'Casi todos los que están atrapados entre volumen y definición caen en la misma trampa. No es el esfuerzo. Es el orden.',
    mechanism: [
      'Si defines sin una base, terminas <span class="text-cream font-semibold">más pequeño.</span>',
      'Si haces volumen sin una base, terminas <span class="text-cream font-semibold">más blando.</span>',
    ],
    cards: [
      ['La trampa de "solo haz volumen"', 'Comiste de todo para crecer. Quedaste más blando, no más grande.'],
      ['La definición eterna', 'Hiciste dieta por meses y perdiste tamaño, no la barriga. Ahora te da miedo comer.'],
      ['Series que paras antes de tiempo', 'Muchas series, pero pocas duras. El crecimiento aumenta cuanto más cerca del fallo llevas la serie.'],
      ['Consejos que se contradicen', 'Cada video dice lo contrario del anterior. Y terminas creyendo que es tu genética.'],
    ],
    close: 'Corrige el orden y el mismo esfuerzo <em>empieza a notarse.</em>',
  },

  story: {
    eyebrow: 'Mi historia',
    h2: 'Perdí 4 años haciéndolo mal <em>para que tú no tengas que hacerlo.</em>',
    paragraphs: [
      'Empecé pesando <span class="text-cream font-semibold">51 kg</span>. Flaco, e invisible con camiseta. Así que hice lo que decía internet: <span class="text-cream">volumen sucio</span>.',
      'Salió mal. Llegué a cerca de <span class="text-cream font-semibold">30% de grasa</span>, perdí toda la definición y me salió <span class="text-cream">ginecomastia</span>. No me veía musculoso. Me veía blando.',
      'Entonces dejé de adivinar y me puse a leer la investigación: cómo se construye el músculo, por qué importa tanto definir primero y qué hace que una serie cuente.',
    ],
    strong: 'Corregí el orden. Primero bajé la grasa, luego construí. Estoy orgulloso del cambio, y sigo trabajando en él. Este manual es ese sistema, sin los cuatro años que yo perdí.',
    caption: 'El autor, el primero en aplicar el sistema.',
    prevBefore: 'Foto de antes anterior', nextBefore: 'Foto de antes siguiente', goBefore: 'Ir a la foto de antes',
    prevAfter: 'Foto de después anterior', nextAfter: 'Foto de después siguiente', goAfter: 'Ir a la foto de después',
    altBefore: 'El autor antes, foto', altAfter: 'El autor después, foto',
  },

  how: {
    eyebrow: 'Cómo funciona',
    h2: 'Tres fases, <em>en el orden correcto.</em>',
    lead: 'No haces volumen para siempre ni definición para siempre. Haces la fase que tu cuerpo necesita ahora, y luego la siguiente.',
    phases: [
      ['Fase 1', 'Baja a una base magra', 'Quitas la capa blanda y conservas tu músculo, para que lo que construyas después se note.'],
      ['Fase 2', 'Construye sin engordar', 'Un superávit pequeño y series duras. Ganas músculo sin que la grasa vuelva a colarse.'],
      ['Fase 3', 'Cambia de fase sin retroceder', 'Señales claras de cuándo seguir construyendo y cuándo recortar. Conservas lo que ganaste.'],
    ],
    tree: {
      title: '¿No sabes por dónde empezar? <em>El manual te lo dice.</em>',
      body: 'El árbol de decisión mira dos cosas, tu grasa corporal y tus años entrenando, y te ubica en una fase con un plan para el primer día.',
      inputs: ['Tu grasa corporal', 'Tus años entrenando'],
      output: 'Tu fase de inicio + tu plan del primer día',
    },
  },

  why: {
    eyebrow: 'Por qué funciona',
    h2: 'Basado en investigación, <em>no en mitos de gimnasio.</em>',
    lead: 'Cada regla del manual tiene una razón detrás. Estas son las principales, en palabras simples.',
    cards: [
      { title: 'Las series duras <em>te hacen crecer</em>', body: 'La hipertrofia (el crecimiento muscular) aumenta a medida que las series se acercan al fallo. Por eso el manual hace que cada serie cuente.', ref: 1 },
      { title: '¿Poco tiempo? <em>Igual funciona.</em>', body: 'Más series por semana todavía tienden a construir más músculo. Pero cuando el tiempo es poco, unas cuantas series de verdad duras por músculo funcionan bien.', ref: 2 },
      { title: 'Entrena <em>el estiramiento</em>', body: 'Entrenar el músculo en posiciones largas (la parte estirada de la repetición) probablemente produce un poco más de crecimiento. Los ejercicios se eligieron pensando en eso.', ref: 3 },
      { title: 'Proteína, <em>sin complicarte</em>', body: '30-40 g de proteína por comida es un mínimo práctico. No hay un techo rígido.', ref: 4 },
      { title: 'Estar magro <em>es la base</em>', body: 'Más grasa corporal se asocia con menos testosterona. Es una razón más para que el plan te lleve primero a una base magra.', ref: 5 },
      { title: 'Dormir <em>también es entrenar</em>', body: 'Una semana durmiendo poco puede bajar la testosterona entre 10 y 15%. La recuperación es parte del plan, no un extra.', ref: 6 },
      { title: 'Una meta <em>natural</em>', body: 'Un FFMI (músculo para tu estatura) de 22-23 con 10-12% de grasa es una meta atlética y natural. Quien entrena natural rara vez pasa de 25. Ese es el físico al que apunta el plan. Sin TRT.', ref: 7 },
      { title: 'Los hombros <em>dan la forma</em>', body: 'Hombros anchos y cintura estrecha es lo que se ve "fuerte" con camiseta. Por eso el plan entrena el deltoides lateral con frecuencia.', ref: null },
    ],
    refsTitle: 'Referencias',
    refsNote: 'Los estudios detrás de las afirmaciones de esta página (títulos en su inglés original).',
    refShort: ['Robinson et al., 2024', 'Schoenfeld et al., 2017', 'Wolf et al., 2023', 'Trommelen et al., 2023', 'Corona et al., 2013', 'Leproult y Van Cauter, 2011', 'Kouri et al., 1995', 'Kerksick et al., 2017'],
  },

  inside: {
    h2: 'Lo que hay <em>adentro.</em>',
    lead: '8 capítulos. Cada uno elimina una razón por la que sigues estancado.',
    mockupNote: '{pages} páginas. Cero relleno.',
    mockupNoteStrong: 'Un sistema completo, no una lista de tips.',
    chapters: [
      ['Entrena para el espejo', 'Entrena los músculos que forman la V: hombros anchos, espalda ancha y cintura estrecha.'],
      ['Come para construir', 'La lista corta de alimentos que hacen el trabajo. Los carbohidratos van alrededor del entrenamiento, donde ayudan a rendir.'],
      ['Define bien', 'Pierde grasa y marca definición mientras conservas el músculo que construiste.'],
      ['Volumen limpio, sin la grasa', 'Las cuentas del superávit que construyen músculo y te mantienen magro. Lo contrario al volumen sucio.'],
      ['Cambia de fase', 'Cuándo construir, cuándo definir y cómo cambiar sin perder lo que avanzaste.'],
      ['Mueve las palancas hormonales', 'Los hábitos naturales que mantienen sana tu testosterona: grasa corporal, sueño, comida y entrenamiento.'],
      ['Recupérate, o nada cuenta', 'Sueño, estrés y cómo espacias las sesiones duras. Aquí es donde el entrenamiento se convierte en músculo.'],
      ['El sistema completo y tus primeros 30 días', 'Todas las piezas en un solo plan, más el árbol de decisión, plantillas diarias y un checklist semanal.'],
    ],
    giftsLabel: 'Más dos herramientas de regalo con tu compra',
    sheet: 'Hoja de Google',
    gifts: [
      ['La Calculadora Metabólica de Calorías', 'Se acabó el "no sé cuántas calorías comer". Pones tus datos y en segundos tienes tus calorías de mantenimiento, de definición y de volumen.'],
      ['El Registro de Cambios del Físico', 'Se acabó el "no sé si voy bien". Anotas tu peso y tus medidas. Te muestra el promedio de 7 días y una estimación de tu grasa, semana a semana.'],
    ],
  },

  results: {
    eyebrow: 'Resultados',
    h2: 'Resultados, <em>compartidos con permiso.</em>',
    lead: 'Personas reales, fotos reales.',
    authorLabel: 'El autor, el primero en aplicar el sistema',
    customerResult: 'Resultado de un cliente',
    readMore: 'Lee su historia completa',
    translated: 'Traducido del inglés',
    disclaimer: 'Los resultados varían según la constancia y el punto de partida.',
    guaranteeLine: 'Con garantía de reembolso de 7 días',
    before: 'Antes', after: 'Después',
    photoPending: 'Foto pendiente',
  },

  fit: {
    h2: '¿Esto es <em>para ti?</em>',
    yesTitle: 'Es para ti si…',
    yes: [
      'Con camiseta te ves flaco, y sin ella te ves blando.',
      'Estás atrapado entre volumen y definición, con miedo a engordar o a quedarte más pequeño.',
      'Quieres el porqué, no solo un "confía en mí".',
      'Quieres un físico estético, de forma natural. Sin TRT y sin una pila de suplementos.',
    ],
    noTitle: 'No es para ti si…',
    no: [
      'Buscas una pastilla mágica o un truco de un día para otro.',
      'No vas a cambiar nada de lo que haces hoy.',
      'Prefieres seguir juntando tips sueltos antes que seguir un sistema.',
      'Buscas un protocolo de esteroides o de TRT.',
    ],
  },

  value: {
    h2: '¿Cuánto vale dejar de <em>perder años?</em>',
    lead: 'Lo que la mayoría gasta en este problema:',
    rows: [
      { label: 'Un coach que te manda un plan genérico', money: 200, suffix: '+/mes' },
      { label: 'Un curso en línea inflado', money: 97, suffix: '+' },
      { label: 'Otro volumen sucio fallido', text: 'meses que no recuperas' },
      { label: 'Cuatro años de prueba y error', text: 'lo que me costó a mí' },
    ],
    close: 'El sistema completo cuesta {price}. <span class="text-muted">Menos que una comida a domicilio.</span>',
  },

  addon: {
    badge: 'Extra opcional, al pagar',
    h2: 'Y el lado hormonal, <em>completo.</em>',
    paragraphs: [
      'El capítulo 6 del Manual cubre las palancas hormonales naturales más importantes, y ahí se detiene. El panorama completo necesita su propio libro.',
      '{bumpName} es ese libro. 22 capítulos. Testosterona libre y SHBG, y cómo leer tus análisis. La DHT, el andrógeno que pocos explican. Comida, grasas, el hígado, el intestino, el sol y el sueño. Los químicos de uso diario en casa. Qué análisis de sangre pedir. Y la lista corta de suplementos con evidencia real detrás.',
    ],
    strong: 'Te aparece como extra opcional cuando pagas. Un clic, {bump}. No está incluido en los {price}.',
    bullets: [
      '22 capítulos, hormona por hormona',
      'Qué analizarte y cómo leer los resultados',
      'Los pocos suplementos con evidencia real, y lo que dejé fuera',
      'Una mirada honesta a la TRT',
    ],
  },

  final: {
    h2: 'Otro año estancado, <em>o el plan que lo termina.</em>',
    outcomes: [
      'Sabes en qué fase empezar desde el primer día',
      'Quitas la capa blanda y conservas tu músculo',
      'Construyes sin que vuelva la grasa',
      'Sigues un plan para tus primeros 30 días',
    ],
    youGet: 'Todo lo que recibes',
    stack: [
      'El Manual del Físico de Dios Griego ({pages} páginas)',
      'Tus primeros 30 días, por escrito',
      'La Calculadora Metabólica de Calorías (regalo)',
      'El Registro de Cambios del Físico (regalo)',
    ],
    today: 'Hoy, pago único',
    risk: '{price} es una apuesta pequeña frente a otro año sin cambios.',
    guaranteeTitle: 'Garantía de reembolso de 7 días',
    guaranteeBadge: 'Días de garantía',
    guaranteeBody: 'Léelo y aplícalo durante <span class="text-cream font-semibold">7 días completos</span>. Si no te da un plan claro que puedas seguir, escríbeme y te devuelvo cada centavo. <span class="text-cream font-semibold">Sin preguntas.</span>',
    guaranteeSmall: 'Lo único que arriesgas es quedarte igual.',
    bumpNote: '{bumpName} se ofrece al pagar por {bump} más, si lo quieres.',
  },

  faq: {
    h2: 'Preguntas, <em>respondidas.</em>',
    items: [
      ['¿Soy skinny fat o solo flaco?', 'El árbol de decisión te lo responde. Usa tu grasa corporal y tus años entrenando para decirte si primero te toca bajar grasa o empezar a construir.'],
      ['¿Me va a funcionar a mí?', 'Si entrenas natural y lo aplicas, el sistema te da un plan claro para tu cuerpo. Los resultados varían según la constancia y el punto de partida, y por eso hay una garantía de 7 días.'],
      ['Soy principiante total. ¿Es muy avanzado?', 'No. Los principiantes son los que más ganan, porque se saltan años de errores. Empieza por lo básico y te da un plan para el primer día.'],
      ['Llevo años entrenando y estoy estancado. ¿Voy a aprender algo?', 'Probablemente. Los estancamientos largos suelen venir de pocos huecos: series que paras antes de tiempo, la fase equivocada o no tener cómo medir tu progreso. El manual te ayuda a encontrarlos y corregirlos.'],
      ['Estoy en definición y no veo cambios. ¿Sigo?', 'El manual te da señales claras de cuándo seguir definiendo, cuándo parar y cuándo pasar a construir. Se acabó dar vueltas sin avanzar.'],
      ['¿Cuánto tiempo necesito?', 'Menos de lo que crees, si tus series son de verdad duras. Cuando el tiempo es poco, unas cuantas series duras por músculo funcionan bien. Más series por semana todavía tienden a construir más, así que el manual te muestra las dos opciones.'],
      ['¿Necesito un gimnasio caro o suplementos?', 'No. Con un gimnasio básico, mancuernas y unas cuantas máquinas basta. Sin TRT y sin suplementos caros.'],
      ['¿No es más de lo mismo, mitos de gimnasio?', 'No. Cada regla se apoya en investigación, y los estudios principales están en esta página. Está escrito en palabras simples que puedes aplicar.'],
      ['¿Cómo lo recibo después de comprar?', 'Al instante. Después de pagar recibes el PDF y las dos hojas de Google, en tu celular, tablet o computadora.'],
      ['¿{bumpName} está incluido?', 'No. Es un extra opcional de {bump} al pagar. Los {price} cubren el Manual, el plan de 30 días y las dos herramientas.'],
      ['¿Y si no es para mí?', 'Tienes una garantía de reembolso de 7 días. Escríbeme dentro de los 7 días y te devuelvo cada centavo. Sin preguntas.'],
    ],
    closing: '¿Listo para corregir el orden?',
  },

  footer: {
    by: 'por Aesthetic Engineer',
    privacy: 'Política de privacidad', terms: 'Términos', contact: 'Contacto',
    privacyHref: '/privacy.html', termsHref: '/terms.html',
    disclaimer: 'Los resultados varían según la constancia y el punto de partida. Este manual es educativo. No es consejo médico. Consulta a un médico antes de empezar cualquier programa de entrenamiento o nutrición.',
    rights: 'El Manual del Físico de Dios Griego. Todos los derechos reservados.',
  },
};
