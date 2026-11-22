/* Differential count trainer: a virtual microscope where the student classifies every
   nucleated cell on a blood film (100 or 200 cells) or a marrow aspirate (200 or 500 cells)
   with a lab-style tally counter, then compares the count with the answer key.
   Cells are the original drawings from cells.js, placed at true relative size.
   Depends on cells.js (drawCell, rng, blob, shade, f1) and app.js (cellById, esc, store, openCell). */

/* ---------- Counter keys ---------- */
const DC_KEYS = {
  pb: [
    { k: "neut", name: "Neutrophil", short: "N", hot: "1", ref: [2.0, 7.0], tip: "Segmented: two to five lobes joined by thin filaments. Hypersegmented, toxic, hypogranular and Pelger cells are all counted as neutrophils; note the change in the report." },
    { k: "lymph", name: "Lymphocyte", short: "L", hot: "2", ref: [1.0, 3.0], tip: "Round nucleus with dense, clumped chromatin and a thin rim of blue cytoplasm. Large granular lymphocytes and CLL cells are counted here." },
    { k: "mono", name: "Monocyte", short: "Mo", hot: "3", ref: [0.2, 1.0], tip: "The largest normal leucocyte: folded or kidney-shaped nucleus with lacy chromatin, grey-blue cytoplasm and often vacuoles." },
    { k: "eos", name: "Eosinophil", short: "E", hot: "4", ref: [0.02, 0.5], tip: "Usually two lobes, with large, regular orange-red granules filling the cytoplasm." },
    { k: "baso", name: "Basophil", short: "B", hot: "5", ref: [0.02, 0.1], tip: "Coarse dark purple-black granules that lie over and hide the nucleus." },
    { k: "band", name: "Band", short: "Bd", hot: "6", tip: "Curved, sausage-shaped nucleus of even width with no thin filament. If any part is narrower than a third of the widest part, call it segmented." },
    { k: "meta", name: "Metamyelocyte", short: "Mt", hot: "7", tip: "Kidney-shaped (indented) nucleus, the indent less than half the nuclear width, with pink neutrophilic cytoplasm." },
    { k: "myelo", name: "Myelocyte", short: "My", hot: "8", tip: "Round or oval eccentric nucleus with no nucleolus, a pale Golgi zone, and pink-lilac cytoplasm with specific granules." },
    { k: "pro", name: "Promyelocyte", short: "Pr", hot: "9", tip: "Larger than a blast, with a nucleolus, a clear Golgi zone (hof) and many coarse purple primary granules." },
    { k: "blast", name: "Blast", short: "Bl", hot: "0", tip: "High N:C ratio, fine open chromatin and one or more nucleoli. Auer rods prove the blast is myeloid." },
    { k: "react", name: "Reactive lymph", short: "RL", hot: "q", tip: "Large lymphocyte with abundant blue cytoplasm that hugs the neighbouring red cells, darker at the edge. A mixed, heterogeneous population." },
    { k: "plasma", name: "Plasma cell", short: "Pl", hot: "w", tip: "Eccentric nucleus with clock-face chromatin, deep blue cytoplasm and a pale perinuclear hof." },
    { k: "nrbc", name: "NRBC", short: "NR", hot: "e", extra: true, tip: "Nucleated red cell: a small round dense nucleus in red or grey-pink cytoplasm. Not part of the 100: counted per 100 white cells." },
    { k: "smudge", name: "Smudge cell", short: "Sm", hot: "r", extra: true, tip: "A crushed cell with bare smeared chromatin and no cytoplasm. Not part of the 100: report separately." }
  ],
  bm: [
    { k: "blast", name: "Blast", short: "Bl", hot: "1", my: true, ref: [0, 3], tip: "High N:C ratio, fine open chromatin and nucleoli. Auer rods prove the blast is myeloid; lymphoblasts and monoblasts are counted here too." },
    { k: "pro", name: "Promyelocyte", short: "Pr", hot: "2", my: true, ref: [2, 8], tip: "Larger than a blast, with a nucleolus, a clear Golgi zone (hof) and many coarse purple primary granules." },
    { k: "myelo", name: "Myelocyte", short: "My", hot: "3", my: true, ref: [10, 15], tip: "Round or oval eccentric nucleus with no nucleolus, a pale Golgi zone, and pink-lilac cytoplasm with specific granules." },
    { k: "meta", name: "Metamyelocyte", short: "Mt", hot: "4", my: true, ref: [10, 15], tip: "Kidney-shaped (indented) nucleus with pink neutrophilic cytoplasm." },
    { k: "neut", name: "Band / neutrophil", short: "N", hot: "5", my: true, ref: [25, 40], tip: "Band and segmented forms are counted together in the marrow. Pelger and hypersegmented cells belong here." },
    { k: "eos", name: "Eosinophil", short: "E", hot: "6", my: true, ref: [1, 6], tip: "Orange-red granules, at any stage of maturation." },
    { k: "baso", name: "Basophil", short: "B", hot: "7", my: true, ref: [0, 1], tip: "Coarse dark purple-black granules over the nucleus." },
    { k: "mono", name: "Monocyte", short: "Mo", hot: "8", ref: [0, 3], tip: "Folded nucleus with lacy chromatin and grey-blue cytoplasm. Not part of the M:E ratio." },
    { k: "lymph", name: "Lymphocyte", short: "L", hot: "9", ref: [5, 20], tip: "Small round cell with dense chromatin and scanty blue cytoplasm. Not part of the M:E ratio." },
    { k: "plasma", name: "Plasma cell", short: "Pl", hot: "0", ref: [0, 3], tip: "Eccentric nucleus, clock-face chromatin, deep blue cytoplasm and a perinuclear hof. Myeloma cells may be larger, with nucleoli." },
    { k: "eryE", name: "Early erythroblast", short: "Ee", hot: "q", ery: true, tip: "Proerythroblast and basophilic erythroblast: round central nucleus, deep blue cytoplasm, often a perinuclear halo. Megaloblasts have finer, open chromatin." },
    { k: "eryL", name: "Late erythroblast", short: "El", hot: "w", ery: true, tip: "Polychromatic and orthochromatic erythroblasts: small round dense nucleus in grey-blue to pink cytoplasm." },
    { k: "other", name: "Other", short: "O", hot: "e", ref: [0, 2], tip: "Macrophages, mast cells and other cells. Megakaryocytes are assessed separately, not in the differential." }
  ]
};
const DC_KEY_BY = { pb: Object.fromEntries(DC_KEYS.pb.map((x) => [x.k, x])), bm: Object.fromEntries(DC_KEYS.bm.map((x) => [x.k, x])) };

/* Which counter key each drawing belongs to. */
const DC_CLASS = {
  pb: {
    neutrophil: "neut", "m3-toxic": "neut", "m2-hyperseg": "neut", "m3-hypogran": "neut", "m3-pelger": "neut",
    band: "band", metamyelocyte: "meta", myelocyte: "myelo", promyelocyte: "pro",
    myeloblast: "blast", "m3-myeloblast-auer": "blast", "m3-lymphoblast": "blast", "m3-monoblast": "blast",
    "small-lymphocyte": "lymph", lgl: "lymph", "m3-cll": "lymph", "m3-reactive": "react", monocyte: "mono", eosinophil: "eos", basophil: "baso",
    "plasma-cell": "plasma", "orthochromatic-normoblast": "nrbc", "polychromatic-normoblast": "nrbc", "m3-smudge": "smudge"
  },
  bm: {
    myeloblast: "blast", "m3-myeloblast-auer": "blast", "m3-lymphoblast": "blast", "m3-monoblast": "blast",
    promyelocyte: "pro", myelocyte: "myelo", metamyelocyte: "meta",
    band: "neut", neutrophil: "neut", "m2-hyperseg": "neut", "m3-hypogran": "neut", "m3-pelger": "neut",
    eosinophil: "eos", basophil: "baso", monocyte: "mono", "small-lymphocyte": "lymph", "plasma-cell": "plasma", "m3-myeloma": "plasma",
    proerythroblast: "eryE", "basophilic-normoblast": "eryE", "m2-megaloblast": "eryE",
    "polychromatic-normoblast": "eryL", "orthochromatic-normoblast": "eryL", macrophage: "other", "mast-cell": "other"
  }
};

/* ---------- Cases ---------- */
const DC_CASES = [
  { id: "pb-normal", mode: "pb", tag: "Normal", title: "Routine check in a healthy adult",
    stem: "A 28-year-old woman has a pre-employment blood count. She is well.",
    fbc: [["WBC", "6.8 × 10⁹/L"], ["Hb", "132 g/L"], ["Platelets", "260 × 10⁹/L"]], wbc: 6.8,
    mix: [["neutrophil", 57], ["band", 2], ["small-lymphocyte", 30], ["lgl", 2], ["monocyte", 6], ["eosinophil", 2], ["basophil", 1]],
    q: { q: "How would you report this differential?", o: ["Normal differential count", "Neutrophilia with left shift", "Absolute lymphocytosis", "Eosinophilia"], c: 0,
      e: "Every absolute count is inside the adult reference interval. A few bands are normal; many laboratories now count them with neutrophils, as ICSH suggests." },
    points: ["Count in the monolayer, where red cells just touch, using a battlement track so that no cell is counted twice.", "Report absolute counts (WBC × %), not just percentages: a percentage alone can hide a neutropenia or a lymphocytosis."] },
  { id: "pb-sepsis", mode: "pb", tag: "Reactive", title: "Fever and pneumonia",
    stem: "A 54-year-old man has a temperature of 39.4 °C, a productive cough and consolidation on the chest film.",
    fbc: [["WBC", "21.5 × 10⁹/L"], ["Hb", "128 g/L"], ["Platelets", "190 × 10⁹/L"], ["CRP", "212 mg/L"]], wbc: 21.5,
    mix: [["neutrophil", 46], ["m3-toxic", 22], ["band", 12], ["metamyelocyte", 4], ["myelocyte", 2], ["small-lymphocyte", 9], ["monocyte", 5]],
    q: { q: "What best explains this film?", o: ["Reactive neutrophilia with left shift and toxic change (infection)", "Chronic myeloid leukaemia", "Acute myeloid leukaemia", "Leucoerythroblastic reaction from marrow infiltration"], c: 0,
      e: "Neutrophilia with bands, a few metamyelocytes and myelocytes, toxic granulation and Döhle bodies, in a febrile patient, is a reactive left shift. There is no myelocyte bulge, basophilia or eosinophilia to suggest CML, and no blasts." },
    points: ["In a left shift the later cells outnumber the earlier ones (neutrophils > bands > metamyelocytes > myelocytes). In CML myelocytes outnumber metamyelocytes (the myelocyte bulge).", "Toxic granulation, Döhle bodies and vacuolation support infection; vacuolated neutrophils raise the possibility of sepsis."] },
  { id: "pb-im", mode: "pb", tag: "Reactive", title: "Sore throat and enlarged nodes",
    stem: "A 19-year-old student has had fever and a sore throat for a week. He has tender cervical nodes and a palpable spleen.",
    fbc: [["WBC", "14.2 × 10⁹/L"], ["Hb", "141 g/L"], ["Platelets", "132 × 10⁹/L"], ["ALT", "96 U/L"]], wbc: 14.2,
    mix: [["neutrophil", 24], ["band", 1], ["small-lymphocyte", 38], ["m3-reactive", 30], ["monocyte", 6], ["eosinophil", 1]],
    q: { q: "Which test should come next?", o: ["Heterophile antibody or EBV serology", "Flow cytometry for a clonal B-cell population", "Bone marrow aspirate", "BCR::ABL1 RT-PCR"], c: 0,
      e: "Absolute lymphocytosis with many heterogeneous reactive lymphocytes in a young adult with pharyngitis, nodes and splenomegaly is infectious mononucleosis until proven otherwise. Confirm with a heterophile antibody test or EBV serology." },
    points: ["Reactive lymphocytes vary from cell to cell; a monotonous population of abnormal lymphoid cells points to a neoplasm instead.", "Some laboratories count reactive lymphocytes with lymphocytes and comment; others report them separately. Either way the absolute lymphocyte count is what matters."] },
  { id: "pb-cll", mode: "pb", tag: "Neoplastic", title: "Lymphocytosis in an older man",
    stem: "A 71-year-old man has a routine blood count. He has small, painless axillary nodes.",
    fbc: [["WBC", "48 × 10⁹/L"], ["Hb", "128 g/L"], ["Platelets", "165 × 10⁹/L"]], wbc: 48,
    mix: [["m3-cll", 82], ["neutrophil", 14], ["monocyte", 3], ["eosinophil", 1]], extras: [["m3-smudge", 20]],
    q: { q: "What is the next step?", o: ["Flow cytometry of the blood (CD5, CD23, CD200, light chains)", "Repeat the count in six weeks; this is reactive", "Bone marrow trephine biopsy first", "Heterophile antibody test"], c: 0,
      e: "Monotonous small lymphocytes with clumped chromatin and many smudge cells in an older adult suggest CLL. Flow cytometry of the blood confirms a clonal B-cell population (CD5+, CD23+, CD200+, weak surface light chain) and a count of 5 × 10⁹/L or more clonal B cells. A marrow is not needed for the diagnosis." },
    points: ["Smudge cells are not part of the 100: count and report them separately. An albumin-treated film preserves them so that they can be classified.", "Count CLL cells as lymphocytes, and report prolymphocytes separately if present."] },
  { id: "pb-cml", mode: "pb", tag: "Neoplastic", title: "Massive splenomegaly and a high white count",
    stem: "A 45-year-old man has lost 6 kg and has a spleen 12 cm below the costal margin.",
    fbc: [["WBC", "156 × 10⁹/L"], ["Hb", "104 g/L"], ["Platelets", "520 × 10⁹/L"]], wbc: 156,
    mix: [["neutrophil", 34], ["band", 8], ["metamyelocyte", 10], ["myelocyte", 22], ["promyelocyte", 4], ["myeloblast", 2], ["basophil", 8], ["eosinophil", 5], ["small-lymphocyte", 4], ["monocyte", 3]],
    q: { q: "Which test confirms the diagnosis?", o: ["BCR::ABL1 by RT-PCR or FISH (Philadelphia chromosome)", "JAK2 V617F", "Flow cytometry for blasts", "Leucocyte alkaline phosphatase score alone"], c: 0,
      e: "Neutrophilia with the myelocyte bulge, basophilia and eosinophilia, and few blasts, is chronic myeloid leukaemia in chronic phase. BCR::ABL1 must be shown by RT-PCR, FISH or karyotype." },
    points: ["Blasts under 10% fits chronic phase. WHO-HAEM5 no longer uses an accelerated phase (it flags high-risk features instead); ICC 2022 keeps accelerated phase at 10–19% blasts. Blasts of 20% or more is blast phase.", "Basophils of 20% or more is a high-risk feature (WHO-HAEM5) and defines accelerated phase in ICC 2022."] },
  { id: "pb-aml", mode: "pb", tag: "Neoplastic", title: "Bruising and fatigue",
    stem: "A 63-year-old woman has had three weeks of tiredness, gum bleeding and bruising.",
    fbc: [["WBC", "32 × 10⁹/L"], ["Hb", "78 g/L"], ["Platelets", "24 × 10⁹/L"]], wbc: 32,
    mix: [["m3-myeloblast-auer", 12], ["myeloblast", 40], ["neutrophil", 10], ["m3-hypogran", 8], ["monocyte", 5], ["small-lymphocyte", 25]], extras: [["orthochromatic-normoblast", 2]],
    q: { q: "What does this differential show?", o: ["Acute myeloid leukaemia: blasts of 20% or more, some with Auer rods", "Myelodysplastic neoplasm with increased blasts", "Leukaemoid reaction", "Chronic myelomonocytic leukaemia"], c: 0,
      e: "Over half the white cells are blasts and some contain Auer rods, which proves they are myeloid. Blasts of 20% or more in blood or marrow is AML; marrow, flow cytometry, cytogenetics and molecular tests (NPM1, FLT3, CEBPA, TP53 and others) follow urgently." },
    points: ["WHO-HAEM5 removes the 20% threshold for AML with defining genetic abnormalities (except BCR::ABL1 and CEBPA); ICC 2022 uses 10% for those entities.", "Hypogranular neutrophils are counted as neutrophils; mention dysplasia in the report."] },
  { id: "pb-leuco", mode: "pb", tag: "Marrow infiltration", title: "Back pain after breast cancer",
    stem: "A 58-year-old woman treated for breast cancer five years ago has new back pain. Teardrop red cells are seen.",
    fbc: [["WBC", "9.8 × 10⁹/L"], ["Hb", "92 g/L"], ["Platelets", "98 × 10⁹/L"]], wbc: 9.8,
    mix: [["neutrophil", 58], ["band", 6], ["metamyelocyte", 6], ["myelocyte", 5], ["promyelocyte", 1], ["myeloblast", 1], ["small-lymphocyte", 18], ["monocyte", 4], ["eosinophil", 1]],
    extras: [["orthochromatic-normoblast", 10], ["polychromatic-normoblast", 4]],
    q: { q: "What is the film picture and the next step?", o: ["Leucoerythroblastic film: look for marrow infiltration with a trephine biopsy", "Reactive left shift: treat the infection", "CML: send BCR::ABL1", "Haemolysis: send a direct antiglobulin test"], c: 0,
      e: "Myeloid precursors together with nucleated red cells (and teardrop cells) is a leucoerythroblastic picture. With a history of breast cancer and bone pain, metastatic infiltration of the marrow is likely; a trephine biopsy is needed." },
    points: ["NRBCs are counted per 100 white cells, not in the 100. If the analyser does not exclude them, correct the WBC: corrected WBC = WBC × 100 ÷ (100 + NRBC).", "Other causes of a leucoerythroblastic film: myelofibrosis, severe haemolysis or hypoxia, sepsis, and the neonate."] },
  { id: "pb-eos", mode: "pb", tag: "Reactive", title: "Itchy rash after travel",
    stem: "A 34-year-old farmer has an itchy rash and mild cough. He returned from the tropics two months ago.",
    fbc: [["WBC", "12.4 × 10⁹/L"], ["Hb", "136 g/L"], ["Platelets", "240 × 10⁹/L"]], wbc: 12.4,
    mix: [["neutrophil", 44], ["eosinophil", 28], ["small-lymphocyte", 22], ["monocyte", 5], ["basophil", 1]],
    q: { q: "What should be done first?", o: ["Look for parasites (Strongyloides serology, stool microscopy) and other reactive causes", "Start imatinib", "Bone marrow with PDGFRA FISH at once", "No action: eosinophilia this mild is normal"], c: 0,
      e: "The absolute eosinophil count is about 3.5 × 10⁹/L, above 1.5 × 10⁹/L (hypereosinophilia). Reactive causes are far more common than clonal ones: parasites (Strongyloides must be excluded before steroids), allergy and drugs. Look for organ damage. Clonal causes are tested for if no reactive cause is found." },
    points: ["Hypereosinophilia is 1.5 × 10⁹/L or more on two occasions; check heart, lungs, skin and nerves for damage.", "Myeloid or lymphoid neoplasms with eosinophilia and tyrosine kinase gene fusions (PDGFRA, PDGFRB, FGFR1, JAK2...) are rare but treatable."] },
  { id: "pb-megalo", mode: "pb", tag: "Red cell disorder", title: "Tiredness and numb feet",
    stem: "A 66-year-old woman has tiredness and tingling feet. The film shows oval macrocytes.",
    fbc: [["WBC", "3.6 × 10⁹/L"], ["Hb", "82 g/L"], ["MCV", "118 fL"], ["Platelets", "112 × 10⁹/L"]], wbc: 3.6,
    mix: [["neutrophil", 34], ["m2-hyperseg", 14], ["small-lymphocyte", 44], ["monocyte", 6], ["eosinophil", 2]],
    q: { q: "Which tests come next?", o: ["Serum B12 (or holotranscobalamin) and folate, with intrinsic factor antibodies", "Haemoglobin electrophoresis", "Bone marrow for MDS straight away", "Iron studies only"], c: 0,
      e: "Macrocytic anaemia with oval macrocytes and hypersegmented neutrophils, and neuropathy, points to B12 deficiency, often pernicious anaemia. The lymphocyte percentage is high only because the neutrophils are low." },
    points: ["Hypersegmented neutrophils are counted as neutrophils. Hypersegmentation means 5% or more of neutrophils with five lobes, or any with six.", "Always read the absolute counts: here neutrophils are about 1.7 × 10⁹/L (neutropenia) and lymphocytes 1.6 × 10⁹/L (normal), so the ‘lymphocytosis’ is only relative."] },

  { id: "bm-normal", mode: "bm", tag: "Normal", title: "Normal marrow aspirate",
    stem: "A 38-year-old man with a normal blood count has a marrow aspirate as part of lymphoma staging. The films are cellular with good particles.",
    fbc: [["WBC", "6.4 × 10⁹/L"], ["Hb", "146 g/L"], ["Platelets", "235 × 10⁹/L"]],
    mix: [["myeloblast", 1.5], ["promyelocyte", 4], ["myelocyte", 12], ["metamyelocyte", 12], ["band", 12], ["neutrophil", 16], ["eosinophil", 3], ["basophil", 0.5], ["monocyte", 1.5], ["small-lymphocyte", 13], ["plasma-cell", 1.5],
      ["proerythroblast", 1], ["basophilic-normoblast", 3], ["polychromatic-normoblast", 12], ["orthochromatic-normoblast", 6], ["macrophage", 1]],
    q: { q: "How would you report the differential?", o: ["Normal differential with a normal M:E ratio", "Myeloid hyperplasia", "Erythroid hyperplasia", "Increased blasts"], c: 0,
      e: "All lineages mature normally, blasts are under 3%, plasma cells under 3% and the M:E ratio is about 2.8:1, inside the usual 2:1 to 4:1." },
    points: ["Count at least 500 cells in the trails just behind the particles, on two or more films. Count in the thin areas where cells are spread out, not in the thick particle itself.", "M:E ratio = all granulocytic cells (blasts to neutrophils, with eosinophils and basophils) ÷ all erythroblasts. Monocytes, lymphocytes and plasma cells are left out; conventions differ, so say which you used."] },
  { id: "bm-aml", mode: "bm", tag: "Neoplastic", title: "Marrow in suspected acute leukaemia",
    stem: "The 63-year-old woman with bruising and blasts in the blood has a marrow aspirate. The marrow is packed.",
    fbc: [["WBC", "32 × 10⁹/L"], ["Hb", "78 g/L"], ["Platelets", "24 × 10⁹/L"]],
    mix: [["myeloblast", 45], ["m3-myeloblast-auer", 15], ["promyelocyte", 3], ["myelocyte", 4], ["metamyelocyte", 3], ["neutrophil", 4], ["m3-hypogran", 2], ["eosinophil", 1], ["monocyte", 3], ["small-lymphocyte", 10], ["plasma-cell", 1], ["polychromatic-normoblast", 6], ["orthochromatic-normoblast", 3]],
    q: { q: "What is the diagnosis on morphology?", o: ["Acute myeloid leukaemia (blasts 20% or more)", "MDS with increased blasts 2", "Acute lymphoblastic leukaemia", "Reactive marrow"], c: 0,
      e: "About 60% of nucleated cells are blasts and some have Auer rods: AML. The final WHO-HAEM5 or ICC type depends on genetics (NPM1, CEBPA, KMT2A and others), myelodysplasia-related changes and prior therapy." },
    points: ["WHO-HAEM5 counts blasts as a percentage of all nucleated marrow cells; the old non-erythroid count is no longer used.", "Promonocytes are blast equivalents in AML with monocytic differentiation and in CMML; count them with blasts."] },
  { id: "bm-mds", mode: "bm", tag: "Neoplastic", title: "Pancytopenia in an older man",
    stem: "A 72-year-old man has pancytopenia with macrocytosis. The aspirate shows dysgranulopoiesis and dyserythropoiesis.",
    fbc: [["WBC", "2.4 × 10⁹/L"], ["Hb", "86 g/L"], ["MCV", "104 fL"], ["Platelets", "61 × 10⁹/L"], ["Blood blasts", "1%"]],
    mix: [["myeloblast", 7], ["promyelocyte", 3], ["myelocyte", 8], ["metamyelocyte", 7], ["m3-hypogran", 10], ["m3-pelger", 5], ["neutrophil", 6], ["eosinophil", 1], ["monocyte", 3], ["small-lymphocyte", 11], ["plasma-cell", 2],
      ["proerythroblast", 2], ["basophilic-normoblast", 5], ["polychromatic-normoblast", 18], ["orthochromatic-normoblast", 12]],
    q: { q: "Using your blast count, which category fits?", o: ["MDS with increased blasts 1 (WHO-HAEM5); MDS with excess blasts (ICC)", "MDS with low blasts", "MDS with increased blasts 2; MDS/AML (ICC)", "Acute myeloid leukaemia"], c: 0,
      e: "Marrow blasts of 5–9% with blood blasts under 5% and no Auer rods is MDS-IB1 in WHO-HAEM5 and MDS with excess blasts in ICC 2022. At 10–19% it would be MDS-IB2 (WHO) or MDS/AML (ICC). A one-cell error near a cut-off changes the category, which is why 500 cells are counted." },
    points: ["Pelger-Huët (bilobed) and hypogranular neutrophils are counted with the neutrophils, not as bands; their percentage supports dysgranulopoiesis (10% or more of a lineage dysplastic).", "Cytogenetics (del(5q), −7, complex karyotype) and mutations (SF3B1, TP53) refine the WHO-HAEM5 and ICC type and the IPSS-M risk."] },
  { id: "bm-megalo", mode: "bm", tag: "Red cell disorder", title: "Megaloblastic marrow",
    stem: "A 59-year-old woman with Hb 74 g/L, MCV 121 fL and mild pancytopenia has a marrow before her B12 result returns.",
    fbc: [["WBC", "3.1 × 10⁹/L"], ["Hb", "74 g/L"], ["MCV", "121 fL"], ["Platelets", "96 × 10⁹/L"]],
    mix: [["m2-megaloblast", 8], ["proerythroblast", 3], ["basophilic-normoblast", 8], ["polychromatic-normoblast", 22], ["orthochromatic-normoblast", 12], ["myeloblast", 2], ["promyelocyte", 3], ["myelocyte", 8], ["metamyelocyte", 8], ["band", 4], ["m2-hyperseg", 4], ["neutrophil", 6], ["eosinophil", 1], ["monocyte", 1], ["small-lymphocyte", 9], ["plasma-cell", 1]],
    q: { q: "What does the M:E ratio show?", o: ["Reversed M:E ratio from erythroid hyperplasia (ineffective erythropoiesis)", "Myeloid hyperplasia", "A normal M:E ratio", "A diluted, blood-like aspirate"], c: 0,
      e: "Erythroblasts make up about half the cells and the M:E ratio is below 1:1. With megaloblasts (open, sieve-like chromatin in a mature cytoplasm) this is megaloblastic erythropoiesis; giant metamyelocytes are the granulocytic clue." },
    points: ["Megaloblastic change can mimic acute leukaemia or MDS on a quick look: always check B12 and folate before calling dysplasia.", "Ineffective erythropoiesis gives a hypercellular marrow with a low reticulocyte count, raised LDH and raised bilirubin."] },
  { id: "bm-myeloma", mode: "bm", tag: "Neoplastic", title: "Back pain and a paraprotein",
    stem: "A 67-year-old man has back pain, calcium 2.9 mmol/L, creatinine 180 µmol/L and an IgG kappa paraprotein of 42 g/L.",
    fbc: [["WBC", "5.2 × 10⁹/L"], ["Hb", "94 g/L"], ["Platelets", "182 × 10⁹/L"], ["Film", "Rouleaux"]],
    mix: [["m3-myeloma", 22], ["plasma-cell", 12], ["myeloblast", 1], ["promyelocyte", 3], ["myelocyte", 8], ["metamyelocyte", 8], ["band", 7], ["neutrophil", 11], ["eosinophil", 2], ["monocyte", 1], ["small-lymphocyte", 8], ["basophilic-normoblast", 2], ["polychromatic-normoblast", 10], ["orthochromatic-normoblast", 5]],
    q: { q: "What is the diagnosis?", o: ["Plasma cell myeloma: clonal plasma cells 10% or more with CRAB features", "MGUS", "Smouldering myeloma", "Reactive plasmacytosis"], c: 0,
      e: "About a third of the cells are plasma cells, many atypical, with hypercalcaemia, renal impairment and anaemia: symptomatic myeloma (IMWG). Confirm clonality (kappa restriction by flow or immunohistochemistry) and send FISH for high-risk lesions." },
    points: ["Plasma cells are patchy: the trephine with CD138 staining often gives a higher, more reliable percentage than the aspirate.", "Clonal plasma cells of 60% or more define myeloma even without CRAB features (SLiM criteria)."] },
  { id: "bm-all", mode: "bm", tag: "Neoplastic", title: "Bone pain and pallor in a child",
    stem: "A 6-year-old boy has two weeks of bone pain, pallor and petechiae. Blasts are seen in the blood.",
    fbc: [["WBC", "42 × 10⁹/L"], ["Hb", "71 g/L"], ["Platelets", "18 × 10⁹/L"]],
    mix: [["m3-lymphoblast", 82], ["small-lymphocyte", 5], ["neutrophil", 4], ["metamyelocyte", 2], ["myelocyte", 2], ["polychromatic-normoblast", 3], ["orthochromatic-normoblast", 2]],
    q: { q: "Which investigation defines the lineage?", o: ["Flow cytometry (CD19, CD10, CD22, cyCD79a, TdT, CD34; T-cell and myeloid markers)", "Perls stain", "Serum B12", "Trephine reticulin only"], c: 0,
      e: "A marrow replaced by small to medium blasts with scanty cytoplasm and no granules or Auer rods in a child suggests B-lymphoblastic leukaemia, but morphology cannot prove lineage. Flow cytometry does; cytogenetics and molecular tests then define the genetic type and risk group." },
    points: ["WHO-HAEM5 advises against diagnosing lymphoblastic leukaemia with under 20% marrow blasts; such cases need careful work-up.", "Hematogones (normal B-cell precursors) can be numerous in children recovering from chemotherapy; flow cytometry separates them from leukaemic blasts."] },
  { id: "bm-cml", mode: "bm", tag: "Neoplastic", title: "Marrow in chronic myeloid leukaemia",
    stem: "The 45-year-old man with massive splenomegaly has a marrow aspirate for staging. BCR::ABL1 is positive.",
    fbc: [["WBC", "156 × 10⁹/L"], ["Hb", "104 g/L"], ["Platelets", "520 × 10⁹/L"]],
    mix: [["myeloblast", 3], ["promyelocyte", 6], ["myelocyte", 24], ["metamyelocyte", 16], ["band", 14], ["neutrophil", 16], ["eosinophil", 5], ["basophil", 4], ["monocyte", 2], ["small-lymphocyte", 4], ["polychromatic-normoblast", 4], ["orthochromatic-normoblast", 2]],
    q: { q: "What phase is this?", o: ["Chronic phase: blasts under 10%", "Blast phase", "Accelerated phase by ICC 2022", "Cannot say without a trephine"], c: 0,
      e: "Marked granulocytic hyperplasia with a myelocyte peak and an M:E ratio around 15:1, but blasts well under 10%: chronic phase. The marrow blast count and karyotype (additional abnormalities) are the reasons to do a marrow in CML." },
    points: ["A very high M:E ratio is expected in CML and in reactive neutrophilia; the myelocyte peak, basophils and eosinophils favour CML.", "Small (dwarf) megakaryocytes and pseudo-Gaucher cells are other CML marrow clues."] }
];

/* ---------- Session state ---------- */
const DC_SIZES = { pb: [100, 200], bm: [200, 500] };
const dcStore = { get: (k, d) => store.get("dc:" + k, d), set: (k, v) => store.set("dc:" + k, v) };
let dc = null; // { caseId, n, seed, learn, labels: {}, field, finished, answer }; loaded on first view
let dcLoaded = false;
let dcSlide = null;                     // generated slide for dc (cells and fields), rebuilt from the seed
const dcFieldCache = {};
let dcSel = null;                        // selected cell index (active pointer)
let dcMode = "pb";
let dcView = "field";                    // "field" or "review" after finishing
let dcFlash = null;                      // learning-mode feedback for the last cell
let dcHistory = [];

const dcCase = () => DC_CASES.find((c) => c.id === dc.caseId);
const dcSave = () => dcStore.set("session", dc);

/* Largest-remainder split of n cells between the mix proportions. */
function dcSplit(mix, n) {
  const tot = mix.reduce((a, m) => a + m[1], 0);
  const raw = mix.map(([id, p]) => ({ id, x: (p / tot) * n }));
  raw.forEach((r) => (r.c = Math.floor(r.x)));
  let left = n - raw.reduce((a, r) => a + r.c, 0);
  raw.slice().sort((a, b) => (b.x - b.c) - (a.x - a.c)).forEach((r) => { if (left > 0) { r.c++; left--; } });
  return raw;
}

function dcBuildSlide() {
  const C = dcCase(), rand = rng(dc.seed);
  const ids = [];
  dcSplit(C.mix, dc.n).forEach((r) => { for (let i = 0; i < r.c; i++) ids.push(r.id); });
  (C.extras || []).forEach(([id, per100]) => { const k = Math.round((per100 * dc.n) / 100); for (let i = 0; i < k; i++) ids.push(id); });
  for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
  const bm = C.mode === "bm", P = bm ? 4 : 5;
  const cells = ids.map((id, i) => ({ i, id, key: DC_CLASS[C.mode][id], r: (cellById[id].sizeUm * P) / 2 }));
  // Fill fields one at a time, placing cells without overlap inside the eyepiece circle.
  const fields = [];
  let q = cells.slice();
  while (q.length) {
    const want = bm ? 8 + Math.floor(rand() * 5) : 2 + Math.floor(rand() * 4);
    const placed = [];
    const rest = [];
    for (const c of q) {
      if (placed.length >= want) { rest.push(c); continue; }
      let ok = false;
      for (let t = 0; t < 120 && !ok; t++) {
        const a = rand() * 6.283, d = Math.sqrt(rand()) * (176 - c.r);
        const x = 200 + Math.cos(a) * d, y = 200 + Math.sin(a) * d;
        if (placed.every((o) => Math.hypot(o.x - x, o.y - y) > o.r + c.r + (bm ? 4 : 14))) { c.x = x; c.y = y; c.rot = rand() * 360; ok = true; }
      }
      (ok ? placed : rest).push(c);
    }
    if (!placed.length) { const c = rest.shift(); c.x = 200; c.y = 200; c.rot = 0; placed.push(c); }
    placed.forEach((c) => (c.f = fields.length));
    fields.push(placed.map((c) => c.i));
    q = rest;
  }
  dcSlide = { cells, fields, P, bm };
  Object.keys(dcFieldCache).forEach((k) => delete dcFieldCache[k]);
}

/* ---------- Drawing ---------- */
let dcSeq = 0;
function dcRBCs(fi) {
  const { cells, fields, P, bm } = dcSlide;
  const rand = rng(dc.seed + ":rbc:" + fi);
  const R = 3.75 * P, here = fields[fi].map((i) => cells[i]);
  let s = "";
  const step = R * (bm ? 1.75 : 2.15);
  for (let gy = -R; gy < 400 + R; gy += step * 0.87) {
    for (let gx = -R + ((gy / step) % 2 ? step / 2 : 0); gx < 400 + R; gx += step) {
      if (rand() < (bm ? 0.1 : 0.16)) continue;
      const x = gx + (rand() - 0.5) * step * 0.55, y = gy + (rand() - 0.5) * step * 0.55;
      if (here.some((c) => Math.hypot(c.x - x, c.y - y) < c.r * 1.02 + R * 0.55)) continue;
      const rr = R * (0.92 + rand() * 0.14);
      s += `<path d="${blob({ cx: x, cy: y, r: rr, sx: 1 + (rand() - 0.5) * 0.08, wobble: 0.03 }, rand)}" fill="url(#dcrbc)"/>`;
    }
  }
  // Scattered platelets in blood films.
  if (!bm) for (let k = 0; k < 9; k++) {
    const x = 30 + rand() * 340, y = 30 + rand() * 340;
    if (here.some((c) => Math.hypot(c.x - x, c.y - y) < c.r + 6)) continue;
    s += `<path d="${blob({ cx: x, cy: y, r: 1.2 * P + rand() * 2, sx: 1.2, sy: 0.8, rot: rand() * 180, wobble: 0.15 }, rand)}" fill="#c4a3d2"/><circle cx="${f1(x)}" cy="${f1(y)}" r="1.4" fill="#6d2f78" opacity=".8"/>`;
  }
  return s;
}

function dcCellSVG(c) {
  const cell = cellById[c.id], d = cell.draw;
  const pxU = (K * 2 * (d.r || 3.8)) / cell.sizeUm;           // drawing units per µm inside drawCell
  const w = (200 / pxU) * dcSlide.P;                          // width of the 200-unit drawing in field units
  const cellR = (d.r || 3.8) * K * Math.max(d.sx || 1, d.sy || 1) * (1 + (d.irregular || 0) + (d.smudge ? 0.25 : 0));
  const a = Math.min(0.96, (cellR / 100) * 1.02), b = Math.min(1, (cellR / 100) * 1.14);
  const id = "dcm" + ++dcSeq;
  let inner = drawCell(cell, { seed: dc.seed + "#" + c.i, label: false })
    .replace(/^<svg[^>]*>/, `<svg x="${f1(c.x - w / 2)}" y="${f1(c.y - w / 2)}" width="${f1(w)}" height="${f1(w)}" viewBox="0 0 200 200">`)
    .replace(/<g class="scalebar">[\s\S]*?<\/g>/, "");
  return `<defs><radialGradient id="${id}g"><stop offset="${a.toFixed(3)}" stop-color="#fff"/><stop offset="${b.toFixed(3)}" stop-color="#000"/></radialGradient>
<mask id="${id}" maskUnits="userSpaceOnUse" x="${f1(c.x - w / 2)}" y="${f1(c.y - w / 2)}" width="${f1(w)}" height="${f1(w)}"><circle cx="${f1(c.x)}" cy="${f1(c.y)}" r="${f1(w / 2)}" fill="url(#${id}g)"/></mask></defs>
<g mask="url(#${id})"><g transform="rotate(${f1(c.rot)} ${f1(c.x)} ${f1(c.y)})">${inner}</g></g>`;
}

function dcFieldSVG(fi) {
  if (dcFieldCache[fi]) return dcFieldCache[fi];
  const here = dcSlide.fields[fi].map((i) => dcSlide.cells[i]);
  const s = `<svg viewBox="0 0 400 400" class="dc-base" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
<defs><radialGradient id="dcbg" cx=".5" cy=".45" r=".7"><stop offset="0" stop-color="#fbf5f4"/><stop offset=".75" stop-color="#f4e9ec"/><stop offset="1" stop-color="#eadbe2"/></radialGradient>
<radialGradient id="dcrbc"><stop offset="0" stop-color="${shade("#df949a", 0.62)}"/><stop offset=".38" stop-color="${shade("#df949a", 0.35)}"/><stop offset=".92" stop-color="#df949a"/><stop offset="1" stop-color="${shade("#df949a", -0.12)}"/></radialGradient>
<clipPath id="dceye"><circle cx="200" cy="200" r="198"/></clipPath>
<radialGradient id="dcvg" cx=".5" cy=".5" r=".5"><stop offset=".8" stop-color="#2a1830" stop-opacity="0"/><stop offset="1" stop-color="#2a1830" stop-opacity=".35"/></radialGradient></defs>
<rect width="400" height="400" fill="#17121b"/>
<g clip-path="url(#dceye)"><rect width="400" height="400" fill="url(#dcbg)"/><g opacity=".93">${dcRBCs(fi)}</g>${here.map(dcCellSVG).join("")}<rect width="400" height="400" fill="url(#dcvg)"/></g>
</svg>`;
  return (dcFieldCache[fi] = s.replace(/aria-label="[^"]*"/g, ""));
}

/* Interactive layer: hit areas, the pointer on the selected cell, and labels. */
function dcOverlaySVG(fi) {
  const C = dcCase(), keys = DC_KEY_BY[C.mode];
  const here = dcSlide.fields[fi].map((i) => dcSlide.cells[i]);
  const review = dcView === "review";
  let s = `<svg viewBox="0 0 400 400" class="dc-over" xmlns="http://www.w3.org/2000/svg">`;
  here.forEach((c) => {
    const lab = dc.labels[c.i];
    const right = lab && lab === c.key;
    const ring = c.r + 5;
    if (review) {
      const col = right ? "#23a46b" : "#d23c3c";
      s += `<circle cx="${f1(c.x)}" cy="${f1(c.y)}" r="${f1(ring)}" fill="none" stroke="${col}" stroke-width="3" ${c.i === dcSel ? 'stroke-dasharray="none"' : 'stroke-dasharray="6 4"'}/>`;
    } else if (c.i === dcSel) {
      s += `<circle cx="${f1(c.x)}" cy="${f1(c.y)}" r="${f1(ring)}" fill="none" stroke="#fff" stroke-width="5" opacity=".8"/><circle class="dc-ring" cx="${f1(c.x)}" cy="${f1(c.y)}" r="${f1(ring)}" fill="none" stroke="#4a3891" stroke-width="2.6" stroke-dasharray="7 5"/>`;
      s += `<path d="M${f1(c.x + ring * 0.7)},${f1(c.y - ring * 0.7)} l26,-26" stroke="#17121b" stroke-width="4" stroke-linecap="round"/>`;
    }
    if (lab) {
      const t = (review && !right ? keys[lab].short + "→" + keys[c.key].short : keys[lab].short);
      const wd = 10 + t.length * 7.4, lx = Math.min(392 - wd, Math.max(8, c.x + c.r * 0.55)), ly = Math.max(8, c.y - c.r - 2);
      const bg = review ? (right ? "#23a46b" : "#d23c3c") : dcFlash && dcFlash.i === c.i ? (dcFlash.ok ? "#23a46b" : "#d23c3c") : "#4a3891";
      s += `<g pointer-events="none"><rect x="${f1(lx)}" y="${f1(ly)}" width="${f1(wd)}" height="18" rx="9" fill="${bg}"/><text x="${f1(lx + wd / 2)}" y="${f1(ly + 13)}" text-anchor="middle" font-size="12" font-weight="700" font-family="sans-serif" fill="#fff">${esc(t)}</text></g>`;
    }
    s += `<circle data-dcc="${c.i}" cx="${f1(c.x)}" cy="${f1(c.y)}" r="${f1(c.r + 4)}" fill="transparent" style="cursor:pointer"><title>${review ? esc(cellById[c.id].name) : "Cell " + (c.i + 1)}</title></circle>`;
  });
  return s + "</svg>";
}

/* A small plan of the film with the battlement track, showing which field is in view. */
function dcTrackSVG(fi) {
  const n = dcSlide.fields.length, bm = dcSlide.bm;
  const cols = Math.ceil(n / 4), pts = [];
  for (let k = 0; k < n; k++) {
    const col = Math.floor(k / 4), r = k % 4, up = col % 2 === 0;
    pts.push([30 + (col * 200) / Math.max(1, cols - 1 || 1), up ? 18 + r * 9 : 45 - r * 9]);
  }
  const done = (k) => dcSlide.fields[k].every((i) => dc.labels[i]);
  return `<svg viewBox="0 0 250 64" class="dc-track" role="img" aria-label="Plan of the ${bm ? "aspirate film" : "blood film"} with the counting track, field ${fi + 1} of ${n}">
<path d="M6,8 H${bm ? 236 : 200} ${bm ? "Q250,32 236,56" : "Q248,32 200,56"} H6 Z" fill="#f4e5ea" stroke="#d9c3cc"/>
${bm ? `<ellipse cx="18" cy="32" rx="9" ry="7" fill="#b98aa6"/><text x="18" y="62" font-size="7" text-anchor="middle" fill="#8a7a90" font-family="sans-serif">particle</text>` : ""}
<polyline points="${pts.map((p) => p.map(f1).join(",")).join(" ")}" fill="none" stroke="#b9a7cf" stroke-width="1.2"/>
${pts.map((p, k) => `<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="${k === fi ? 4.2 : 2.4}" fill="${k === fi ? "#b93a60" : done(k) ? "#4a3891" : "#fff"}" stroke="#4a3891" stroke-width=".8"/>`).join("")}
</svg>`;
}

/* ---------- Counting ---------- */
const dcCountable = (C) => DC_KEYS[C.mode].filter((x) => !x.extra);
function dcTallies(useTruth) {
  const t = {};
  dcSlide.cells.forEach((c) => { const k = useTruth ? c.key : dc.labels[c.i]; if (k) t[k] = (t[k] || 0) + 1; });
  return t;
}
function dcTotal(t, C) { return dcCountable(C).reduce((a, x) => a + (t[x.k] || 0), 0); }
const dcAllDone = () => dcSlide.cells.every((c) => dc.labels[c.i]);

function dcNextUnlabelled(fromField) {
  const F = dcSlide.fields;
  for (let k = 0; k < F.length; k++) {
    const fi = (fromField + k) % F.length;
    const i = F[fi].find((x) => !dc.labels[x]);
    if (i != null) return { fi, i };
  }
  return null;
}

let dcBeepCtx = null;
function dcBeep(long) {
  if (!dcStore.get("sound", true)) return;
  try {
    dcBeepCtx ||= new (window.AudioContext || window.webkitAudioContext)();
    const o = dcBeepCtx.createOscillator(), g = dcBeepCtx.createGain();
    o.frequency.value = long ? 880 : 1400; g.gain.value = long ? 0.12 : 0.04;
    o.connect(g); g.connect(dcBeepCtx.destination); o.start(); o.stop(dcBeepCtx.currentTime + (long ? 0.45 : 0.03));
  } catch {}
}

function dcClassify(k) {
  if (dcSel == null || dcView === "review" || dc.finished) return;
  const C = dcCase(), c = dcSlide.cells[dcSel];
  const before = dcTotal(dcTallies(), C);
  dcHistory.push([dcSel, dc.labels[dcSel] || null]);
  dc.labels[dcSel] = k;
  dcFlash = dc.learn ? { i: dcSel, ok: k === c.key, k, truth: c.key, id: c.id } : null;
  const after = dcTotal(dcTallies(), C);
  if (before < dc.n && after >= dc.n) dcBeep(true); else dcBeep(false);
  const nx = dcNextUnlabelled(dc.field);
  if (nx && nx.fi === dc.field) dcSel = nx.i;
  else if (nx && !(dcFlash && !dcFlash.ok)) { dc.field = nx.fi; dcSel = nx.i; dcFlash = null; }
  else if (nx) { dcSel = null; dcPendingMove = nx; }
  else dcSel = null;
  dcSave();
  dcPaint();
}
let dcPendingMove = null;

function dcUndo() {
  const h = dcHistory.pop();
  if (!h) return;
  const [i, prev] = h;
  if (prev) dc.labels[i] = prev; else delete dc.labels[i];
  dc.field = dcSlide.cells[i].f; dcSel = i; dcFlash = null; dcPendingMove = null;
  dcSave(); dcPaint();
}

function dcGoField(fi) {
  const n = dcSlide.fields.length;
  dc.field = (fi + n) % n; dcFlash = null; dcPendingMove = null;
  dcSel = dcView === "review" ? null : dcSlide.fields[dc.field].find((x) => !dc.labels[x]) ?? null;
  dcSave(); dcPaint();
}

/* ---------- Views ---------- */
function dcStart(caseId, n, learn) {
  const C = DC_CASES.find((c) => c.id === caseId);
  dc = { caseId, n: n || DC_SIZES[C.mode][C.mode === "bm" ? 1 : 0], seed: Math.random().toString(36).slice(2, 9), learn: !!learn, labels: {}, field: 0, finished: false, answer: null };
  dcBuildSlide(); dcView = "field"; dcHistory = []; dcFlash = null; dcPendingMove = null;
  dcSel = dcSlide.fields[0][0];
  dcSave();
}

function viewCount() {
  if (!dcLoaded) { dcLoaded = true; dc = dcStore.get("session", null); dcMode = dcStore.get("mode", "pb"); }
  if (dc && !DC_CASES.some((c) => c.id === dc.caseId)) dc = null;
  if (dc && !dcSlide) { dcBuildSlide(); dcSel = dc.finished ? null : (dcSlide.fields[dc.field] || []).find((x) => !dc.labels[x]) ?? null; dcView = dc.finished ? "results" : "field"; }
  if (!dc || dcView === "pick") return dcPickHTML();
  if (dcView === "results") return dcResultsHTML();
  return `<div id="dcRoot">${dcWorkHTML()}</div>`;
}

function dcPickHTML() {
  const best = dcStore.get("best", {});
  const list = DC_CASES.filter((c) => c.mode === dcMode);
  return `<h1>Differential count trainer</h1>
<p class="muted" style="max-width:68ch">Count a film the way you do at the microscope. Each field shows the cells at their true relative size; the pointer marks the next cell, and you press the key on the tally counter for what you see. When the count is done, compare your differential with the answer key, review every cell you missed, and interpret the result. The drawings are original.</p>
<div class="seg" role="group" aria-label="Specimen" style="margin-top:12px">
  <button data-dcmode="pb" aria-pressed="${dcMode === "pb"}">Blood film · 100 cells</button>
  <button data-dcmode="bm" aria-pressed="${dcMode === "bm"}">Bone marrow · 500 cells</button>
</div>
${dc && !dc.finished ? `<div class="card dc-resume"><div><b>Count in progress:</b> ${esc(dcCase().title)} · ${dcTotal(dcTallies(), dcCase())} of ${dc.n} counted</div><button class="btn primary small" data-dcresume>Resume</button></div>` : ""}
<div class="dc-cases">${list.map((c) => {
  const b = best[c.id];
  return `<div class="card dc-case"><span class="row"><span class="tag">${esc(c.tag)}</span>${b != null ? `<span class="tag ok">Best ${b}%</span>` : ""}</span>
  <h3 style="margin:2px 0 0">${esc(c.title)}</h3><span class="muted">${esc(c.stem)}</span>
  <div class="row" style="margin-top:auto">${DC_SIZES[c.mode].map((n, j) => `<button class="btn small ${j === (c.mode === "bm" ? 1 : 0) ? "primary" : ""}" data-dcstart="${c.id}" data-dcn="${n}">Count ${n}</button>`).join("")}
  <button class="btn small" data-dcstart="${c.id}" data-dcn="${DC_SIZES[c.mode][0]}" data-dclearn="1" title="Tells you at once when a cell is wrong">Learning mode</button></div></div>`;
}).join("")}</div>
<div class="card" style="margin-top:18px"><h3 style="margin-top:0">How to count</h3><ul style="margin:0;padding-left:1.2em">
${dcMode === "pb" ? `<li>Choose the monolayer near the tail, where red cells just touch without overlapping, and move along a battlement track so no cell is counted twice.</li>
<li>Count 100 white cells (200 is better: ICSH advises it, and it halves the sampling error). Nucleated red cells and smudge cells are counted separately and do not add to the 100.</li>
<li>Report absolute counts: WBC × percentage ÷ 100.</li>` : `<li>Count in the cellular trails behind the particles, on more than one film, avoiding the particle itself and areas of diluting blood.</li>
<li>Count at least 500 nucleated cells (WHO-HAEM5 bases the blast percentage on a 500-cell count). Megakaryocytes are assessed separately.</li>
<li>M:E ratio = all granulocytic cells ÷ all erythroblasts.</li>`}
<li>Keyboard: the number and letter on each key, <kbd>Backspace</kbd> to undo, <kbd>←</kbd> <kbd>→</kbd> to change field.</li></ul></div>`;
}

function dcCounterHTML() {
  const C = dcCase(), t = dcTallies(), tot = dcTotal(t, C);
  const done = dcAllDone();
  return `<div class="dc-total"><span class="num">${tot}</span><span class="muted">/ ${dc.n} counted</span>${DC_KEYS[C.mode].filter((x) => x.extra).map((x) => `<span class="dc-extra">${x.name}: <b class="num">${t[x.k] || 0}</b></span>`).join("")}</div>
<div class="bar"><i style="width:${Math.min(100, (tot / dc.n) * 100)}%"></i></div>
<div class="dc-keys" role="group" aria-label="Tally counter">${DC_KEYS[C.mode].map((x) => `<button class="dc-key${x.extra ? " extra" : ""}" data-dck="${x.k}" ${dcSel == null || dcView === "review" ? "disabled" : ""}><kbd>${x.hot.toUpperCase()}</kbd><span>${x.name}</span><b class="num">${t[x.k] || 0}</b></button>`).join("")}</div>
<div class="row" style="margin-top:10px">
  <button class="btn small" data-dcundo ${dcHistory.length ? "" : "disabled"}>Undo</button>
  <button class="btn small ${done ? "primary" : ""}" data-dcfinish>${done ? "See results" : "Finish now"}</button>
  <label class="dc-opt"><input type="checkbox" data-dcsound ${dcStore.get("sound", true) ? "checked" : ""}> Sound</label>
  <label class="dc-opt"><input type="checkbox" data-dclearntoggle ${dc.learn ? "checked" : ""}> Learning mode</label>
</div>`;
}

function dcFlashHTML() {
  if (dcPendingMove && !(dcFlash && !dcFlash.ok)) return "";
  if (!dcFlash) return dcSel == null && !dcAllDone() && !dcPendingMove ? `<p class="muted">Tap a cell to put the pointer on it.</p>` : "";
  const C = dcCase(), keys = DC_KEY_BY[C.mode];
  if (dcFlash.ok) return `<div class="dc-flash ok"><b>Correct: ${esc(keys[dcFlash.k].name)}.</b></div>`;
  return `<div class="dc-flash bad"><b>That was ${esc(cellById[dcFlash.id].name.toLowerCase())}</b>, counted as <b>${esc(keys[dcFlash.truth].name)}</b>, not ${esc(keys[dcFlash.k].name)}.<br>${esc(keys[dcFlash.truth].tip)}
  <div class="row" style="margin-top:6px"><button class="btn small" data-cell="${dcFlash.id}">Open in atlas</button>${dcPendingMove ? `<button class="btn small primary" data-dcgo="${dcPendingMove.fi}">Next field</button>` : ""}</div></div>`;
}

function dcZoomHTML() {
  if (dcSel == null) return `<div class="dc-zoom empty"><span class="muted">${dcAllDone() ? "Every cell on this slide is counted." : "No cell selected"}</span></div>`;
  const c = dcSlide.cells[dcSel];
  const svg = drawCell(cellById[c.id], { seed: dc.seed + "#" + c.i, label: false }).replace(/aria-label="[^"]*"/, 'aria-label="Selected cell under oil immersion"');
  return `<div class="dc-zoom"><div class="figure">${svg}</div><span class="label">High power</span></div>`;
}

function dcWorkHTML() {
  const C = dcCase(), F = dcSlide.fields, review = dcView === "review";
  const fi = dc.field;
  return `<div class="row" style="justify-content:space-between;align-items:flex-start">
  <div><span class="label">${C.mode === "pb" ? "Blood film" : "Bone marrow aspirate"} · ${review ? "reviewing your count" : dc.learn ? "learning mode" : "count"}</span><h1 style="font-size:1.6rem">${esc(C.title)}</h1></div>
  <button class="btn small" data-dcback>All cases</button></div>
<div class="dc-stem"><span>${esc(C.stem)}</span><span class="row" style="gap:6px 14px">${C.fbc.map(([a, b]) => `<span><span class="muted">${esc(a)}</span> <b class="num">${esc(b)}</b></span>`).join("")}</span></div>
<div class="dc-work">
  <div class="dc-scope">
    <div class="dc-field" id="dcField">${dcFieldSVG(fi)}${dcOverlaySVG(fi)}</div>
    <div class="row dc-nav">
      <button class="btn small" data-dcgo="${fi - 1}" aria-label="Previous field">‹</button>
      <span class="num">Field ${fi + 1} of ${F.length}</span>
      <button class="btn small" data-dcgo="${fi + 1}" aria-label="Next field">›</button>
      ${review ? `<button class="btn small" data-dcnextwrong>Next mistake</button><button class="btn small primary" data-dcresults>Back to results</button>` : ""}
    </div>
  </div>
  <div class="dc-side">
    ${review ? dcReviewSideHTML() : `<div class="dc-top">${dcZoomHTML()}<div id="dcFlash" style="flex:1;min-width:0">${dcFlashHTML()}</div></div><div id="dcCounter">${dcCounterHTML()}</div>`}
  </div>
  <div class="dc-trackwrap">${dcTrackSVG(fi)}</div>
</div>`;
}

function dcReviewSideHTML() {
  const C = dcCase(), keys = DC_KEY_BY[C.mode];
  if (dcSel == null) return `<div class="card"><p style="margin-top:0">Green rings are cells you classified correctly; red rings are mistakes, labelled <b>your key → correct key</b>. Tap any cell to see what it is.</p></div>`;
  const c = dcSlide.cells[dcSel], lab = dc.labels[c.i], cell = cellById[c.id];
  const svg = drawCell(cell, { seed: dc.seed + "#" + c.i });
  return `<div class="card"><div class="figure" style="max-width:220px">${svg}</div>
<h3 style="margin:10px 0 4px">${esc(cell.name)}</h3>
<p style="margin:0">Counts as <b>${esc(keys[c.key].name)}</b>. You counted it as <b class="${lab === c.key ? "dc-ok" : "dc-bad"}">${lab ? esc(keys[lab].name) : "not counted"}</b>.</p>
<p class="muted">${esc(keys[c.key].tip)}</p><button class="btn small" data-cell="${c.id}">Open in atlas</button></div>`;
}

/* Wilson 95% interval for a proportion counted on n cells (the basis of Rümke's table). */
function dcWilson(p, n) {
  const z = 1.96, d = 1 + (z * z) / n, cen = (p + (z * z) / (2 * n)) / d, h = (z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))) / d;
  return [Math.max(0, cen - h) * 100, Math.min(1, cen + h) * 100];
}
const dcPct = (x, n) => (n ? (x / n) * 100 : 0);
const dcAbs = (v) => v.toFixed(v < 1 ? 2 : 1);
const dcFmt = (v) => (v >= 10 || v === 0 ? v.toFixed(0) : v.toFixed(1));

function dcResultsHTML() {
  const C = dcCase(), keys = DC_KEYS[C.mode], K2 = DC_KEY_BY[C.mode];
  const you = dcTallies(), truth = dcTallies(true);
  const nYou = dcTotal(you, C), nTrue = dcTotal(truth, C);
  const labelled = dcSlide.cells.filter((c) => dc.labels[c.i]);
  const right = labelled.filter((c) => dc.labels[c.i] === c.key).length;
  const acc = Math.round((right / dcSlide.cells.length) * 100);
  const conf = {};
  labelled.forEach((c) => { const l = dc.labels[c.i]; if (l !== c.key) { const k = c.key + ">" + l; conf[k] = (conf[k] || 0) + 1; } });
  const confList = Object.entries(conf).sort((a, b) => b[1] - a[1]);
  const pb = C.mode === "pb";
  const rows = keys.filter((x) => !x.extra && ((you[x.k] || 0) + (truth[x.k] || 0) > 0 || x.ref)).map((x) => {
    const yp = dcPct(you[x.k] || 0, nYou), tp = dcPct(truth[x.k] || 0, nTrue);
    const [lo, hi] = dcWilson(tp / 100, dc.n);
    const inside = yp >= lo - 0.05 && yp <= hi + 0.05;
    let ref = "", flag = "";
    if (pb) {
      const abs = (C.wbc * yp) / 100;
      ref = x.ref ? `${x.ref[0]}–${x.ref[1]}` : x.k === "band" ? "few" : "0";
      flag = x.ref ? (abs < x.ref[0] ? "low" : abs > x.ref[1] ? "high" : "") : abs > 0 && x.k !== "band" ? "abnormal" : "";
      return `<tr><td>${x.name}</td><td>${you[x.k] || 0}</td><td class="${inside ? "" : "dc-bad"}"><b>${dcFmt(yp)}</b></td><td>${dcFmt(tp)}</td><td class="${inside ? "" : "dc-bad"}">${dcFmt(lo)}–${dcFmt(hi)}</td><td>${dcAbs(abs)}${flag ? ` <span class="tag ${flag === "low" ? "az" : ""}">${flag}</span>` : ""}</td><td>${ref}</td></tr>`;
    }
    ref = x.ref ? `${x.ref[0]}–${x.ref[1]}` : x.ery ? "15–30 (all stages)" : "";
    flag = x.ref ? (yp < x.ref[0] ? "low" : yp > x.ref[1] ? "high" : "") : "";
    return `<tr><td>${x.name}</td><td>${you[x.k] || 0}</td><td><b>${dcFmt(yp)}</b>${flag ? ` <span class="tag ${flag === "low" ? "az" : ""}">${flag}</span>` : ""}</td><td>${dcFmt(tp)}</td><td class="${inside ? "" : "dc-bad"}">${dcFmt(lo)}–${dcFmt(hi)}</td><td>${ref}</td></tr>`;
  }).join("");
  const derived = pb ? dcDerivedPB(C, you, truth, nYou) : dcDerivedBM(C, you, truth, nYou, nTrue);
  const q = C.q, ans = dc.answer;
  return `<div class="row" style="justify-content:space-between;align-items:flex-start">
  <div><span class="label">${pb ? "Blood film" : "Bone marrow aspirate"} · results</span><h1 style="font-size:1.6rem">${esc(C.title)}</h1></div>
  <div class="row"><button class="btn small" data-dcreview>Review the slide</button><button class="btn small" data-dcstart="${C.id}" data-dcn="${dc.n}">New slide, same case</button><button class="btn small" data-dcback>All cases</button></div></div>
<div class="dc-score">
  <div class="card"><span class="label">Cells classified correctly</span><b class="num dc-big">${right} / ${dcSlide.cells.length}</b><span class="muted">${acc}% agreement with the answer key${labelled.length < dcSlide.cells.length ? ` · ${dcSlide.cells.length - labelled.length} not counted` : ""}</span></div>
  <div class="card"><span class="label">Your total</span><b class="num dc-big">${nYou}</b><span class="muted">${pb ? "white cells" : "nucleated cells"}${pb && (you.nrbc || you.smudge) ? ` + ${you.nrbc || 0} NRBC, ${you.smudge || 0} smudge` : ""}</span></div>
  <div class="card"><span class="label">Most frequent mix-up</span>${confList.length ? `<b>${esc(K2[confList[0][0].split(">")[0]].name)} → ${esc(K2[confList[0][0].split(">")[1]].name)}</b><span class="muted">${confList[0][1]} cell${confList[0][1] > 1 ? "s" : ""}</span>` : `<b>None</b><span class="muted">A clean count</span>`}</div>
</div>
<h2 style="margin-top:22px">Your differential against the key</h2>
<div class="tablewrap"><table class="t num"><thead><tr><th>Cell</th><th>Your count</th><th>Your %</th><th>Key %</th><th>95% range on ${dc.n} cells</th>${pb ? `<th>Absolute (×10⁹/L)</th><th>Adult ref. (×10⁹/L)</th>` : `<th>Adult ref. %</th>`}</tr></thead><tbody>${rows}</tbody></table></div>
<p class="muted" style="max-width:72ch">The 95% range is the spread you would expect from sampling alone if you counted ${dc.n} cells perfectly (binomial limits, as in Rümke's table). A percentage outside it, marked red, means a classification error rather than chance. ${dc.n < 200 ? "Counting 200 cells narrows every range." : ""}</p>
${confList.length ? `<h3>Where the count went wrong</h3><div class="dc-conf">${confList.map(([k, n]) => { const [a, b] = k.split(">"); return `<span class="chip">${esc(K2[a].name)} counted as ${esc(K2[b].name)} <b class="num">×${n}</b></span>`; }).join("")}</div>
<p class="muted">${esc(K2[confList[0][0].split(">")[0]].tip)}</p>` : ""}
<h2 style="margin-top:22px">Interpretation</h2>
${derived}
<div class="card" style="margin-top:14px"><b>${esc(q.q)}</b>
<div class="opts" style="margin-top:10px">${dcOrder(q.o.length).map((i, pos) => `<button class="opt ${ans != null ? (i === q.c ? "right" : i === ans ? "wrong" : "") : ""}" data-dcans="${i}" ${ans != null ? "disabled" : ""}><span class="letter">${"ABCD"[pos]}</span><span>${esc(q.o[i])}</span></button>`).join("")}</div>
${ans != null ? `<div class="explain">${esc(q.e)}</div>` : ""}</div>
<h3>Teaching points</h3><ul>${C.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>`;
}

/* Answer options in a fixed random order for this slide, so the key is not always first. */
function dcOrder(n) {
  const r = rng(dc.seed + ":q"), o = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [o[i], o[j]] = [o[j], o[i]]; }
  return o;
}

function dcDerivedPB(C, you, truth, n) {
  const abs = (k) => (C.wbc * (you[k] || 0)) / Math.max(1, n);
  const nr = n ? ((you.nrbc || 0) / n) * 100 : 0;
  const lines = [];
  lines.push(`Absolute neutrophils <b>${dcAbs(abs("neut"))}</b>, lymphocytes <b>${dcAbs(abs("lymph") + abs("react"))}</b>, monocytes <b>${dcAbs(abs("mono"))}</b>, eosinophils <b>${dcAbs(abs("eos"))}</b>, basophils <b>${dcAbs(abs("baso"))}</b> × 10⁹/L (WBC ${C.wbc} × your %).`);
  const imm = ["band", "meta", "myelo", "pro", "blast"].reduce((a, k) => a + (you[k] || 0), 0);
  if (imm) lines.push(`Left shift: bands and precursors <b>${dcFmt(dcPct(imm, n))}%</b>${(you.myelo || 0) > (you.meta || 0) ? "; myelocytes outnumber metamyelocytes (the myelocyte bulge of CML)" : ""}.`);
  if (you.blast) lines.push(`Blasts <b>${dcFmt(dcPct(you.blast, n))}%</b>${dcPct(you.blast, n) >= 20 ? ": 20% or more, diagnostic of acute leukaemia once lineage is confirmed" : ""}.`);
  if (you.nrbc) lines.push(`NRBC <b>${dcFmt(nr)}</b> per 100 WBC. If the analyser counted them as white cells, corrected WBC = ${C.wbc} × 100 ÷ (100 + ${dcFmt(nr)}) = <b>${((C.wbc * 100) / (100 + nr)).toFixed(1)} × 10⁹/L</b>.`);
  if (you.smudge) lines.push(`Smudge cells <b>${you.smudge}</b> (${dcFmt(dcPct(you.smudge, (you.lymph || 0) + you.smudge))}% of lymphocytes plus smudge cells), reported separately.`);
  return `<ul class="dc-derived">${lines.map((l) => `<li>${l}</li>`).join("")}</ul>`;
}

function dcDerivedBM(C, you, truth, n, nT) {
  const sum = (t, f) => DC_KEYS.bm.filter(f).reduce((a, x) => a + (t[x.k] || 0), 0);
  const me = (t) => { const e = sum(t, (x) => x.ery); return e ? sum(t, (x) => x.my) / e : Infinity; };
  const meY = me(you), meT = me(truth);
  const fmtME = (r) => (r === Infinity ? "no erythroblasts counted" : `${r.toFixed(r < 1 ? 2 : 1)}:1`);
  const bl = dcPct(you.blast || 0, n), blT = dcPct(truth.blast || 0, nT);
  const pl = dcPct(you.plasma || 0, n), ery = dcPct(sum(you, (x) => x.ery), n);
  const blastRead = bl >= 20 ? "20% or more: acute leukaemia (AML, or ALL if lymphoblasts)" : bl >= 10 ? "10–19%: MDS-IB2 (WHO-HAEM5) or MDS/AML (ICC 2022) if myeloid and dysplastic" : bl >= 5 ? "5–9%: MDS-IB1 (WHO-HAEM5) or MDS with excess blasts (ICC 2022), if a myeloid neoplasm" : bl > 3 ? "slightly raised (3–4%); recount and correlate" : "within normal (under 3–5%)";
  const meRead = meY === Infinity ? "" : bl >= 20 ? "not meaningful here, because the marrow is replaced by blasts (and lymphoblasts are not myeloid cells)" : meY < 1.5 ? "low: erythroid hyperplasia or reduced granulopoiesis" : meY > 5 ? "high: granulocytic hyperplasia (infection, CML) or erythroid hypoplasia" : "within the usual range (about 2:1 to 4:1)";
  return `<ul class="dc-derived">
<li>M:E ratio <b>${fmtME(meY)}</b> (key ${fmtME(meT)}): ${meRead}.</li>
<li>Blasts <b>${dcFmt(bl)}%</b> of all nucleated cells (key ${dcFmt(blT)}%): ${blastRead}.</li>
<li>Plasma cells <b>${dcFmt(pl)}%</b>${pl >= 10 ? ": 10% or more; clonal plasma cells at this level meet the marrow criterion for myeloma (with a myeloma-defining event)" : pl > 3 ? ": mildly raised; reactive plasmacytosis or a plasma cell neoplasm" : ""}.</li>
<li>Erythroblasts <b>${dcFmt(ery)}%</b> of all nucleated cells (usual 15–30%).</li></ul>`;
}

/* ---------- Painting and events ---------- */
function dcPaint() {
  if (location.hash !== "#count") return;
  const root = document.getElementById("dcRoot");
  if (!root || dcView === "results" || dcView === "pick") { render(true); return; }
  root.innerHTML = dcWorkHTML();
}

/* On phones, bring the field and the counter keys into view together. */
function dcScrollToField() {
  const f = document.getElementById("dcField");
  if (f && innerWidth <= 860) window.scrollTo(0, f.getBoundingClientRect().top + scrollY - 62);
}

function dcMount() { if (dc && dcSlide && dcView === "field" && dcSel == null && !dc.finished) { const nx = dcNextUnlabelled(dc.field); if (nx && nx.fi === dc.field) { dcSel = nx.i; dcPaint(); } } }

document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-dcc], [data-dck], [data-dcgo], [data-dcstart], [data-dcmode], [data-dcresume], [data-dcundo], [data-dcfinish], [data-dcback], [data-dcreview], [data-dcresults], [data-dcnextwrong], [data-dcans]");
  if (!t) return;
  const d = t.dataset;
  if (d.dcc != null) { dcSel = +d.dcc; dcFlash = null; dcPendingMove = null; dcPaint(); return; }
  if (d.dck) { dcClassify(d.dck); return; }
  if (d.dcgo != null) { dcGoField(+d.dcgo); return; }
  if (d.dcmode) { dcMode = d.dcmode; dcStore.set("mode", dcMode); render(true); return; }
  if (d.dcstart) { dcStart(d.dcstart, +d.dcn, !!d.dclearn); render(); dcScrollToField(); return; }
  if ("dcresume" in d) { dcView = "field"; render(); dcScrollToField(); return; }
  if ("dcundo" in d) { dcUndo(); return; }
  if ("dcfinish" in d) {
    if (!dcAllDone() && !confirm("Some cells are not counted yet. Finish and score the count now?")) return;
    dc.finished = true; dcSel = null; dcView = "results";
    const right = dcSlide.cells.filter((c) => dc.labels[c.i] === c.key).length;
    const best = dcStore.get("best", {}); best[dc.caseId] = Math.max(best[dc.caseId] || 0, Math.round((right / dcSlide.cells.length) * 100)); dcStore.set("best", best);
    dcSave(); render(); return;
  }
  if ("dcback" in d) { dcView = "pick"; dcMode = dc ? dcCase().mode : dcMode; render(); return; }
  if ("dcreview" in d) { dcView = "review"; dcSel = null; dc.field = 0; render(); return; }
  if ("dcresults" in d) { dcView = "results"; render(); return; }
  if ("dcnextwrong" in d) {
    const cells = dcSlide.cells, start = dcSel == null ? -1 : dcSel;
    const order = cells.slice().sort((a, b) => a.f - b.f || a.i - b.i);
    const pos = order.findIndex((c) => c.i === start);
    const nx = order.slice(pos + 1).concat(order.slice(0, pos + 1)).find((c) => dc.labels[c.i] !== c.key);
    if (nx) { dc.field = nx.f; dcSel = nx.i; dcPaint(); }
    return;
  }
  if (d.dcans != null) { dc.answer = +d.dcans; dcSave(); render(true); return; }
});
document.addEventListener("change", (e) => {
  if (e.target.matches("[data-dcsound]")) dcStore.set("sound", e.target.checked);
  if (e.target.matches("[data-dclearntoggle]")) { dc.learn = e.target.checked; dcFlash = null; dcSave(); dcPaint(); }
});
document.addEventListener("keydown", (e) => {
  if (location.hash !== "#count" || !dc || !dcSlide || dcView === "pick" || dcView === "results") return;
  if (e.target.matches("input, select, textarea") || document.querySelector(".drawer-bg") || e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key === "ArrowRight") { e.preventDefault(); dcGoField(dc.field + 1); return; }
  if (e.key === "ArrowLeft") { e.preventDefault(); dcGoField(dc.field - 1); return; }
  if (dcView !== "field") return;
  if (e.key === "Backspace") { e.preventDefault(); dcUndo(); return; }
  const k = DC_KEYS[dcCase().mode].find((x) => x.hot === e.key.toLowerCase());
  if (k) { e.preventDefault(); dcClassify(k.k); }
});
