/* OUTBREAK: CÓDIGO GENÉTICO — Game Data v3 */

window.CODON_TABLE = {
  AUG:"Met(inicio)",UUU:"Phe",UUC:"Phe",UUA:"Leu",UUG:"Leu",
  CUU:"Leu",CUC:"Leu",CUA:"Leu",CUG:"Leu",AUU:"Ile",AUC:"Ile",AUA:"Ile",
  GUU:"Val",GUC:"Val",GUA:"Val",GUG:"Val",UCU:"Ser",UCC:"Ser",UCA:"Ser",UCG:"Ser",
  CCU:"Pro",CCC:"Pro",CCA:"Pro",CCG:"Pro",ACU:"Thr",ACC:"Thr",ACA:"Thr",ACG:"Thr",
  GCU:"Ala",GCC:"Ala",GCA:"Ala",GCG:"Ala",UAU:"Tyr",UAC:"Tyr",
  CAU:"His",CAC:"His",CAA:"Gln",CAG:"Gln",AAU:"Asn",AAC:"Asn",AAA:"Lys",AAG:"Lys",
  GAU:"Asp",GAC:"Asp",GAA:"Glu",GAG:"Glu",UGU:"Cys",UGC:"Cys",UGG:"Trp",
  CGU:"Arg",CGC:"Arg",CGA:"Arg",CGG:"Arg",AGU:"Ser",AGC:"Ser",AGA:"Arg",AGG:"Arg",
  GGU:"Gly",GGC:"Gly",GGA:"Gly",GGG:"Gly",UAA:"STOP",UAG:"STOP",UGA:"STOP",
};

window.MG1_DATA = {
  title:"// BLAST — ALINEAMIENTO DE SECUENCIAS",
  subtitle:"Encuentra el hit más significativo para la secuencia mutante desconocida",
  lives_warning:"⚠ Una selección incorrecta = 1 vida perdida",
  query:{ label:"SECUENCIA QUERY — Agente Desconocido CG-001", seq:"ATGCAGTTACGATCAGCATGCATGCATGCTTACGGATCAGCAAGCATGC" },
  hits:[
    { id:"A", organism:"Pseudomonas aeruginosa (cepa PAO1)", evalue:"2e-18", identity:"94%", score:210,
      ref:"ATGCAGTTACGATCAGCATGCATGCATGCTTACGGATCAGCATGCATGC",
      query:"ATGCAGTTACGATCAGCATGCATGCATGCTTACGGATCAGCAAGCATGC",
      correct:true,
      explanation:"94% identidad, E-value 2e-18 (casi imposible por azar). Posición 42: T→A es un SNP clásico que altera la proteína de adhesión." },
    { id:"B", organism:"Bacillus subtilis (cepa 168)", evalue:"5e-4", identity:"61%", score:88,
      ref:"ATGCAGTTACGATCAGCATGCA--CATGCTTACGGATCAGCATGCATGC",
      query:"ATGCAGTTACGATCAGCATGCATGCATGCTTACGGATCAGCAAGCATGC",
      correct:false,
      explanation:"E-value 5e-4 ocurre frecuentemente por azar. 61% identidad es bajo. Los gaps indican distancia evolutiva real." },
    { id:"C", organism:"Escherichia coli K-12", evalue:"1e-9", identity:"78%", score:140,
      ref:"ATGCAGTTACGATCAGCATGCATGCATGCTTACGGATCAGCATGCATGC",
      query:"ATGCAGTTACGATCAGCATGCATGCATGCTTACGGATCAG-AAGCATGC",
      correct:false,
      explanation:"78% identidad y una deleción en posición 41 indican que no es el match más cercano, aunque E. coli sea bien conocida." }
  ],
  mutTypeQ:{
    question:"¿Qué tipo de mutación presenta el mejor hit en la posición 42?",
    options:["SNP (sustitución puntual)","Inserción","Deleción","Frameshift"],
    correct:0,
    explanation:"Posición 42: T→A. Un único nucleótido cambia sin insertar ni eliminar bases. Eso es un SNP. Un frameshift requiere inserción/deleción que no sea múltiplo de 3."
  }
};

window.MG2_DATA = {
  title:"// TRADUCCIÓN — ANÁLISIS DE CODONES",
  subtitle:"El gen de adhesión mutante tiene un codón de stop prematuro. Identifícalo.",
  lives_warning:"⚠ Dos preguntas — cada error = 1 vida perdida",
  original_mrna:"AUG CAG UUC GAU CAG CAA GCA UGC",
  mutant_mrna:"AUG CAG UAG GAU CAG CAA GCA UGC",
  question1:{
    text:"Identifica el codón de STOP prematuro en la secuencia mutante:",
    codons:["AUG","CAG","UAG","GAU","CAG","CAA","GCA","UGC"],
    correct_idx:2,
    explanation:"UAG es codón de stop (nonsense). La mutación UUC→UAG cambia Phe por una señal de terminación, truncando la proteína en solo 2 aminoácidos funcionales."
  },
  question2:{
    text:"¿Cómo se clasifica este tipo de mutación puntual?",
    options:["Mutación sinónima (silent) — no cambia el aminoácido","Mutación missense — cambia un aminoácido por otro","Mutación nonsense — convierte un codón en señal de stop","Mutación frameshift — desplaza el marco de lectura"],
    correct:2,
    explanation:"Una mutación nonsense convierte un codón de aminoácido en codón de stop, truncando la proteína. Distinta del missense (cambia AA) y del frameshift (desplaza toda la lectura)."
  }
};

window.MG3_DATA = {
  title:"// FILOGENIA — ÁRBOL FILOGENÉTICO",
  subtitle:"Ubica el agente CG-001 en el árbol usando la matriz de distancias genómicas",
  lives_warning:"⚠ Dos preguntas — cada error = 1 vida perdida",
  organisms:["Bacteria_Ref","Archaea_Ref","Eukarya_Ref","Virus_Ref","AGENTE_CG001"],
  matrix:[
    [0.00,0.72,0.85,0.91,0.18],
    [0.72,0.00,0.68,0.93,0.74],
    [0.85,0.68,0.00,0.88,0.83],
    [0.91,0.93,0.88,0.00,0.94],
    [0.18,0.74,0.83,0.94,0.00],
  ],
  tree_nodes:[
    {id:"root",x:250,y:30,label:"LUCA",selectable:false},
    {id:"bact",x:80,y:130,label:"Bacteria",selectable:false},
    {id:"arch",x:200,y:130,label:"Archaea",selectable:false},
    {id:"euk",x:320,y:130,label:"Eukarya",selectable:false},
    {id:"virus",x:420,y:130,label:"Virus",selectable:false},
    {id:"pos_A",x:60,y:220,label:"Posición A",selectable:true,hint:"Dentro de Bacteria"},
    {id:"pos_B",x:175,y:220,label:"Posición B",selectable:true,hint:"Dentro de Archaea"},
    {id:"pos_C",x:380,y:220,label:"Posición C",selectable:true,hint:"Dentro de Eukarya"},
  ],
  branches:[["root","bact"],["root","arch"],["root","euk"],["root","virus"],["bact","pos_A"],["arch","pos_B"],["euk","pos_C"]],
  correct_pos:"pos_A",
  explanation_correct:"✓ Correcto. Distancia CG001–Bacteria = 0.18 (mínimo de la fila). El agente es de linaje bacteriano con genes horizontalmente transferidos de Archaea.",
  explanation_wrong:"✗ Revisa la fila AGENTE_CG001. El valor mínimo es 0.18 con Bacteria_Ref. Menor distancia = mayor cercanía evolutiva.",
  question2:{
    text:"La distancia CG001–Archaea es 0.74. ¿Qué podría explicar ese valor siendo CG001 bacteriano?",
    options:["Error en la secuenciación — los datos no son fiables","Transferencia horizontal de genes (HGT) desde Archaea hacia la línea bacteriana de CG001","CG001 es un híbrido Bacteria-Archaea no clasificable","Distancias menores a 0.80 siempre indican el mismo dominio"],
    correct:1,
    explanation:"La HGT permite que organismos de distintos dominios compartan genes funcionales. CG001 es bacteriano pero incorporó módulos génicos arqueales, lo que explica su distancia inusualmente baja con Archaea y sus capacidades atípicas."
  }
};

window.MG4_DATA = {
  title:"// CLASIFICACIÓN — MUTACIONES CLAVE",
  subtitle:"Clasifica las 4 mutaciones del patógeno. Necesitas 3/4 correctas para continuar.",
  lives_warning:"⚠ Cada error = 1 vida perdida — 120 segundos",
  pass_threshold:3,
  pairs:[
    { id:1, gene:"GEN A — Proteína de adhesión",
      context:"Afecta la unión receptor-ligando en células epiteliales",
      ref:"ATGCAGTTCGAT", mut:"ATGCAGTTCAAT",
      correct:1,
      options:["SNP sinónimo (silent)","SNP missense","Inserción in-frame","Deleción frameshift"],
      explanation:"Posición 10: C→A. Cambia GAT(Asp) por AAT(Asn) — diferente aminoácido, diferente carga. SNP missense que altera la afinidad de unión al receptor." },
    { id:2, gene:"GEN B — Factor de resistencia",
      context:"Confiere resistencia a antibióticos betalactámicos",
      ref:"ATGCCATTCGATCAG", mut:"ATGCCATTCGATCAG",
      correct:0,
      options:["Sin mutación (secuencias idénticas)","SNP missense","Inserción in-frame","Deleción frameshift"],
      explanation:"Las secuencias son idénticas: no hay mutación. El fenotipo de resistencia se mantiene porque la secuencia original ya codifica una betalactamasa funcional." },
    { id:3, gene:"GEN C — Evasión inmune",
      context:"Altera el reconocimiento por linfocitos T citotóxicos",
      ref:"ATGCAGTTTGATCAGCAA", mut:"ATGCAGTTTGATCAGCAAGGC",
      correct:1,
      options:["SNP sinónimo (silent)","Inserción in-frame (+3 bases)","Inserción frameshift (+1 base)","Deleción frameshift"],
      explanation:"Se insertan 3 bases (GGC=Gly). 3 es múltiplo de 3 → NO hay frameshift. Es una inserción in-frame que añade un aminoácido extra sin desplazar el marco de lectura." },
    { id:4, gene:"GEN D — Regulador metabólico",
      context:"Controla la síntesis de la cápsula protectora — IRREVERSIBLE",
      ref:"ATGCAGTTCGATCAG", mut:"ATGCAGTTGATCAG",
      correct:2,
      options:["SNP sinónimo (silent)","Inserción in-frame","Deleción frameshift (−1 base)","SNP missense"],
      explanation:"Se elimina 1 base (C en posición 9). 1 no es múltiplo de 3 → FRAMESHIFT. Todos los codones posteriores cambian. Esta mutación es irreversible con CRISPR estándar." }
  ]
};
