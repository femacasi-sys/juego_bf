
window.SCENES = {

  INTRO:{ type:"sequence", steps:[
    { speaker:null, speakerClass:"char-narrator",
      text:"NEGRO TOTAL.\n\nRespiraciones contenidas. Un monitor cardiaco. Ruido blanco digital.\n\nDatos genomicos flotan en la oscuridad como estrellas que se apagan." },
    { speaker:"VOZ EN OFF — IA DEL SISTEMA", speakerClass:"char-sistema",
      text:"Año 2035.\n\nLa humanidad secuencia mas datos biologicos en un dia que en toda la primera decada del siglo XXI.\n\nCada segundo: 40 millones de lecturas genomicas. Cada hora: 2 terabytes de secuencias nuevas.\n\nPero seguimos sin entender completamente lo que vemos.",
      alert:{ type:"info", msg:"ℹ SISTEMA DE BIOANÁLISIS GLOBAL v7.4 — INICIALIZANDO PROTOCOLO DE CRISIS" } },
    { speaker:null, speakerClass:"char-narrator",
      text:"Pantalla de alerta:\n\n  BROTES DESCONOCIDOS — 17 PAÍSES\n  SECUENCIAS NO CLASIFICADAS — AUMENTO EXPONENCIAL\n  SIMILITUD CON BD CONOCIDAS — 0%\n\nCorte a: Centro de Datos Genomicos. Tres de la madrugada.\nPantallas gigantes. Equipos cientificos trabajando en silencio tenso.",
      alert:{ type:"danger", msg:"⚠ ALERTA BIOLÓGICA GLOBAL — NIVEL 4 — 17 JURISDICCIONES AFECTADAS" } },
  ], next:"SCENE2" },

  SCENE2:{ type:"sequence", steps:[
    { speaker:null, speakerClass:"char-narrator",
      text:"INTERIOR — CENTRO GLOBAL DE BIOANÁLISIS — PASILLO PRINCIPAL\n\nLa Dra. Elena Vargas camina rapido. Tu casi no puedes seguirle el paso.\nLos fluorescentes parpadean." },
    { speaker:"MENTORA — Dra. Elena Vargas", speakerClass:"char-mentora",
      text:"Primera vez en un centro de crisis biologica real?" },
    { speaker:"TU", speakerClass:"char-player",
      text:"(pausa)\n\nQue significa 'real' en este contexto?",
      choices:[
        { label:"Si. Nunca habia visto esto fuera de simulacros.", next:"SCENE2B", safe:true },
        { label:"No exactamente. Pero nunca a esta escala.", next:"SCENE2B", safe:true },
        { label:"No entiendo por que me llamaron a mi para esto.", next:"SCENE2B", safe:false,
          penalty:{ reason:"Expresaste incertidumbre sobre tu rol en un momento critico.",
            lesson:"En bioanálisis de crisis, la confianza en el proceso importa tanto como el conocimiento tecnico. Los sistemas de analisis son colaborativos: cada analista tiene un rol especifico e irremplazable." } },
      ] },
  ], next:"SCENE2B" },

  SCENE2B:{ type:"sequence", steps:[
    { speaker:"MENTORA — Dra. Elena Vargas", speakerClass:"char-mentora",
      text:"Los sistemas automaticos fallaron hace seis horas. Los algoritmos de clasificacion estandar devuelven null. Las bases de datos globales dicen que esto no existe.\n\n(Se detiene. Te mira directo.)\n\nPor eso te llamamos a ti." },
    { speaker:"ANALISTA — Ing. Tomas Reyes", speakerClass:"char-analista",
      text:"El paciente indice llego hace 72 horas desde la Amazonia. Fiebre 41.3C, colapso inmune progresivo, microbioma destruido en 48 horas.",
      alert:{ type:"warn", msg:"◆ PACIENTE #001 — FIEBRE 41.3°C — FALLA INMUNE PROGRESIVA — ORIGEN: AMAZONAS, BR" } },
    { speaker:"MENTORA — Dra. Elena Vargas", speakerClass:"char-mentora",
      text:"Pensamosque era contaminacion de muestra. Error de secuenciacion. Artefacto.\n\n(pausa larga)\n\nHasta que llego el segundo caso. Desde Nigeria. Con la misma firma genetica exacta.",
      choices:[
        { label:"Cuantos casos hay ahora?", next:"SCENE3", safe:true },
        { label:"Podria ser coincidencia — secuencias similares aparecen naturalmente.", next:"SCENE3", safe:false,
          penalty:{ reason:"Descartaste una senal epidemiologica significativa como coincidencia.",
            lesson:"En epidemiologia genomica, dos casos con firma identica en continentes distintos en 72 horas tiene probabilidad de coincidencia cercana a cero. El escepticismo prematuro sin analisis cuantitativo es tan peligroso como el panico." } },
        { label:"Y el analisis de secuencia — que muestra?", next:"SCENE3", safe:true },
      ] },
  ], next:"SCENE3" },

  SCENE3:{ type:"sequence", steps:[
    { speaker:"MENTORA — Dra. Elena Vargas", speakerClass:"char-mentora",
      text:"Cuarenta y siete casos confirmados en doce paises. Todos con la misma firma genetica. Todos en las ultimas 96 horas.\n\nY la secuencia esta cambiando. Pero no al azar.",
      alert:{ type:"danger", msg:"⚠ 47 CASOS — 12 PAÍSES — ÚLTIMA ACTUALIZACIÓN: HACE 4 MINUTOS" } },
    { speaker:"ANALISTA — Ing. Tomas Reyes", speakerClass:"char-analista",
      text:"El BLAST esta cargado. Tres hits candidatos. Ninguno es exactamente lo que esperamos.\n\nNecesitamos saber con que estamos tratando antes de cualquier protocolo." },
    { speaker:"MENTORA — Dra. Elena Vargas", speakerClass:"char-mentora",
      text:"(Te senala la pantalla.)\n\nTu haces el analisis." },
  ], next:"MG1" },

  MG1:{ type:"minigame", game:"blast", next:"SCENE4" },

  SCENE4:{ type:"sequence", steps:[
    { speaker:"SISTEMA IA", speakerClass:"char-sistema",
      text:"Analisis completado. CG-001 es de linaje Pseudomonas con SNP en posicion 42.\nAfecta directamente el gen de adhesion.",
      alert:{ type:"success", msg:"✓ MATCH: Pseudomonas-like — SNP posición 42 — Identidad 94% — E-value 2e-18" } },
    { speaker:"ANALISTA — Ing. Tomas Reyes", speakerClass:"char-analista",
      text:"Pseudomonas con un SNP en la proteina de adhesion. Eso deberia hacerlo menos efectivo, no mas.\n\nComo esta propagandose asi?" },
    { speaker:"MENTORA — Dra. Elena Vargas", speakerClass:"char-mentora",
      text:"Por eso necesitamos el analisis de mRNA. Si hay un codon de stop prematuro, la proteina queda truncada.\nPero algunos fragmentos truncados son mas activos que la proteina completa.",
      choices:[
        { label:"Tiene sentido — un dominio funcional puede quedar expuesto en la forma truncada.", next:"SCENE5", safe:true },
        { label:"Eso no tiene sentido — una proteina truncada siempre pierde funcion.", next:"SCENE5", safe:false,
          penalty:{ reason:"Afirmaste incorrectamente que las proteinas truncadas siempre son inactivas.",
            lesson:"Las proteinas tienen dominios funcionales independientes. Una truncacion puede eliminar un dominio regulatorio inhibidor, dejando el dominio activo mas libre. Muchas oncoproteinas son versiones truncadas hiperfuncionales de proteinas normales." } },
        { label:"Analicemos el mRNA antes de sacar conclusiones.", next:"SCENE5", safe:true },
      ] },
  ], next:"SCENE5" },

  SCENE5:{ type:"sequence", steps:[
    { speaker:null, speakerClass:"char-narrator",
      text:"La pantalla muestra el mRNA del gen de adhesion mutante. Ocho codones.\nAlgo en el tercero no encaja.",
      alert:{ type:"warn", msg:"◆ mRNA CG-001 GEN-ADHESIÓN — CARGADO — ANALIZAR CODONES" } },
    { speaker:"ANALISTA — Ing. Tomas Reyes", speakerClass:"char-analista",
      text:"Si hay un stop en posicion 3, la proteina tiene dos aminoacidos funcionales.\nComo puede algo tan pequeno ser tan efectivo?" },
    { speaker:"MENTORA — Dra. Elena Vargas", speakerClass:"char-mentora",
      text:"Los peptidos cortos pueden tener afinidades extraordinarias.\nEl veneno de algunas serpientes son peptidos de 8 aminoacidos.\n\nIdentifica el stop. Clasifica la mutacion." },
  ], next:"MG2" },

  MG2:{ type:"minigame", game:"codon", next:"SCENE6" },

  SCENE6:{ type:"sequence", steps:[
    { speaker:"SISTEMA IA", speakerClass:"char-sistema",
      text:"Mutacion nonsense confirmada. UAG en posicion 3.\nProteina truncada: Met-Gln-[STOP].",
      alert:{ type:"info", msg:"ℹ PÉPTIDO ACTIVO: Met–Gln (2aa) — AFINIDAD RECEPTOR EPITELIAL TIPO III: CONFIRMADA" } },
    { speaker:"ANALISTA — Ing. Tomas Reyes", speakerClass:"char-analista",
      text:"Dos aminoacidos. Increible." },
    { speaker:"MENTORA — Dra. Elena Vargas", speakerClass:"char-mentora",
      text:"No es increible. Es diseno. O algo que se parece mucho al diseno.\n\nAhora necesitamos saber donde encaja esto en el arbol de la vida.\nSi tiene genes de multiples dominios, los tratamientos estandar no van a funcionar.",
      alert:{ type:"danger", msg:"⚠ BROTE ACTIVO: 127 CASOS — 19 PAÍSES — CADENAS ALIMENTARIAS COMPROMETIDAS" } },
  ], next:"SCENE7" },
