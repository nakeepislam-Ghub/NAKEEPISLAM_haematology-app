/* Module 5 content: Practical laboratory haematology, following the chapters of Dacie and Lewis
   Practical Haematology, 11th ed. (2011). Original teaching text; no text or figures are copied from the book.
   Methods follow ICSH, CLSI and BSH recommendations as summarised there; check local SOPs before use. */

Object.assign(SOURCES, {
  dl1: "Dacie and Lewis, chapter 1: Collection and handling of blood",
  dl2: "Dacie and Lewis, chapter 2: Reference ranges and normal values",
  dl3: "Dacie and Lewis, chapter 3: Basic haematological techniques",
  dl4: "Dacie and Lewis, chapter 4: Preparation and staining methods for blood and bone marrow films",
  dl5: "Dacie and Lewis, chapter 5: Blood cell morphology in health and disease",
  dl6: "Dacie and Lewis, chapter 6: Supplementary techniques including blood parasite diagnosis",
  dl9: "Dacie and Lewis, chapter 9: Iron deficiency anaemia and iron overload",
  dl11: "Dacie and Lewis, chapters 11 to 13: Haemolytic anaemias (laboratory methods, hereditary and acquired)",
  dl14: "Dacie and Lewis, chapter 14: Investigation of abnormal haemoglobins and thalassaemia",
  dl15: "Dacie and Lewis, chapter 15: Erythrocyte and leucocyte cytochemistry",
  dl18: "Dacie and Lewis, chapters 18 and 20: Investigation of haemostasis; laboratory control of anticoagulant therapy",
  dl22: "Dacie and Lewis, chapter 22: Laboratory aspects of blood transfusion",
  dl25: "Dacie and Lewis, chapter 25: Quality assurance",
  dl26: "Dacie and Lewis, chapter 26: Haematology in under-resourced laboratories"
});

const M5_LESSONS = [
{
  id: "m5-collection",
  title: "Collecting and handling blood samples",
  minutes: 12,
  sources: ["dl1", "dl", "lhp"],
  video: "venepuncture order of draw EDTA citrate sample handling haematology",
  body: `
<p>Most wrong results in haematology start before the sample reaches the analyser. The pre-analytical phase covers the request, patient identification, collection, the tube, transport and storage. Chapter 1 of Dacie and Lewis sets out how to get each step right.</p>
<h3>Venous, capillary and arterial samples</h3>
<ul>
<li><b>Venous blood</b> is the standard. Use a tourniquet for less than 1 minute: longer stasis concentrates cells and proteins and raises Hb, PCV and the cell counts.</li>
<li><b>Capillary (skin-prick) blood</b> gives slightly higher Hb, PCV and white cell counts, and lower, more variable platelet counts because platelets stick at the puncture site. Wipe away the first drop and do not squeeze hard, which dilutes the sample with tissue fluid.</li>
<li>Collect at rest and note the time. Exercise, posture and the time of day change counts (see the reference range lesson).</li>
</ul>
<h3>Anticoagulants</h3>
<table>
<tr><th>Tube</th><th>Use</th><th>Key point</th></tr>
<tr><td>K<sub>2</sub>EDTA (1.5–2.2 mg/mL blood)</td><td>Blood count, film, retics, HbA2, HPLC</td><td>Chelates calcium. Excess EDTA (an underfilled tube) shrinks red cells, lowering the spun PCV and raising the MCHC.</td></tr>
<tr><td>Trisodium citrate 3.2% (109 mmol/L), 9 + 1</td><td>Coagulation</td><td>The 9:1 ratio is critical; fill to at least 90%.</td></tr>
<tr><td>Citrate 1 + 4</td><td>Westergren ESR</td><td>Or dilute EDTA blood 4 + 1 with citrate just before the test.</td></tr>
<tr><td>Heparin</td><td>Osmotic fragility, some red cell enzymes</td><td>Unsuitable for films: it gives a blue background and clumps white cells.</td></tr>
</table>
<p>A widely used <b>order of draw</b> avoids carry-over of additives: blood cultures, citrate, serum tubes, heparin, EDTA, then fluoride. EDTA carried into a serum tube gives falsely high potassium and low calcium.</p>
<h3>Storage changes in EDTA blood</h3>
<ul>
<li><b>Counts:</b> Hb, RBC and WBC are stable for about 24 h at room temperature, longer at 4 °C. Platelets are stable for most of a day.</li>
<li><b>Red cells swell</b> after 6–24 h at room temperature: MCV and PCV rise and MCHC falls. Keeping the sample at 4 °C slows this.</li>
<li><b>Morphology changes within hours:</b> neutrophils develop vacuoles and irregular, fragmented nuclear lobes; lymphocytes look budded; red cells crenate. Make films within about 3 hours of collection.</li>
<li>Automated differentials degrade with time as cells lose their light-scatter signature.</li>
</ul>
<h3>Safety</h3>
<p>Treat every sample as infectious. Use closed evacuated systems, never recap needles, discard sharps directly into a sharps bin, and keep the work surfaces clean with a hypochlorite-based disinfectant.</p>
`,
  points: [
    "Tourniquet under 1 minute: stasis raises Hb, PCV and counts",
    "Capillary samples: higher Hb and WBC, lower and more variable platelets",
    "EDTA for counts and films; citrate 9:1 for coagulation; citrate 4:1 for ESR",
    "Underfilled EDTA tube: shrunken cells, low spun PCV, high MCHC",
    "Stored EDTA blood: MCV rises after 6–24 h; make films within about 3 h",
    "Order of draw: cultures, citrate, serum, heparin, EDTA, fluoride"
  ]
},
{
  id: "m5-reference",
  title: "Reference ranges and what changes them",
  minutes: 10,
  sources: ["dl2", "dl"],
  video: "how to establish reference intervals laboratory nonparametric 95 percent",
  body: `
<p>A reference range describes results in a defined healthy population. It is not the same as a "normal" or a treatment threshold: by definition 1 healthy person in 20 lies outside a 95% range.</p>
<h3>Establishing a range</h3>
<ol>
<li>Define the population: age, sex, ethnicity, altitude, pregnancy, and exclusion criteria (illness, iron deficiency, smoking, drugs).</li>
<li>Collect samples under the same conditions as patient samples, on the same analyser and method.</li>
<li>Use at least 120 subjects per group for a non-parametric range: the 2.5th and 97.5th percentiles. With normally distributed data, mean ± 2 SD gives about the same limits; many analytes (WBC, platelets, ferritin) are skewed and need log transformation.</li>
<li>A laboratory may <b>transfer</b> a published range after checking about 20 local healthy subjects: if no more than 2 fall outside, the range can be adopted.</li>
</ol>
<h3>Physiological variation</h3>
<ul>
<li><b>Sex:</b> after puberty men have higher Hb, PCV and RBC, driven by androgens.</li>
<li><b>Age:</b> newborns have high Hb (about 140–220 g/L) and MCV; the physiological nadir is at 2–3 months. Children have higher lymphocyte counts.</li>
<li><b>Pregnancy:</b> plasma volume expands more than red cell mass, so Hb falls; neutrophils, ESR and fibrinogen rise; platelets may fall slightly.</li>
<li><b>Ethnicity:</b> people of African and Middle Eastern ancestry often have lower neutrophil counts (Duffy-null associated neutrophil count) without infection risk.</li>
<li><b>Altitude, smoking, exercise and time of day:</b> altitude and smoking raise Hb; exercise and the afternoon raise neutrophils; eosinophils are lowest in the morning.</li>
</ul>
<h3>Using ranges well</h3>
<p>Compare a result with the patient's own previous values (a <b>delta check</b>) as well as the range. For many tests the change between results tells you more than the result itself.</p>
`,
  points: [
    "Reference range = central 95% of a defined healthy group",
    "Non-parametric: at least 120 subjects, 2.5th to 97.5th percentiles",
    "Transfer a published range by checking about 20 local subjects",
    "Sex, age, pregnancy, ethnicity, altitude and smoking all shift ranges",
    "Duffy-null associated neutrophil count is a normal variant",
    "Delta checks compare with the patient's own earlier results"
  ]
},
{
  id: "m5-basic",
  title: "Basic techniques: Hb, PCV, manual counts and analysers",
  minutes: 16,
  sources: ["dl3", "dl26", "dl"],
  video: "improved Neubauer haemocytometer counting white cells manual method",
  body: `
<p>Automated analysers produce nearly all blood counts, but the manual methods remain the reference, the fallback when an analyser fails, and the way to check an implausible result.</p>
<h3>Haemoglobin</h3>
<ul>
<li><b>Haemiglobincyanide (HiCN) method</b> is the ICSH reference method. Blood is diluted 1 in 251 in Drabkin-type reagent (ferricyanide and cyanide); all forms of Hb except sulphaemoglobin are converted to HiCN and read at 540 nm against a certified standard.</li>
<li>Analysers mostly use cyanide-free methods such as sodium lauryl sulphate (SLS) Hb.</li>
<li>Turbidity raises the reading: lipaemia, very high WBC, paraproteins and unlysed red cells (HbS, HbC, target cells) give falsely high Hb.</li>
<li>In under-resourced settings the WHO haemoglobin colour scale or a portable haemoglobinometer gives a usable estimate (chapter 26).</li>
</ul>
<h3>Packed cell volume (microhaematocrit)</h3>
<p>Centrifuge a capillary tube at about 12 000 g for 5 minutes and read the red cell column against the total. A little plasma is trapped between the cells; more in sickle cells, spherocytes and hypochromic cells, which pack poorly.</p>
<h3>Manual cell counts with a haemocytometer</h3>
<p>The Improved Neubauer chamber has nine 1 mm × 1 mm squares, each holding 0.1 µL when the special thick coverglass is in place (depth 0.1 mm).</p>
<table>
<tr><th>Count</th><th>Diluent and dilution</th><th>Area counted</th></tr>
<tr><td>White cells</td><td>2% acetic acid with gentian violet, 1 in 20</td><td>4 large corner squares (0.4 µL), or all 9 for low counts</td></tr>
<tr><td>Platelets</td><td>1% ammonium oxalate (lyses red cells), 1 in 20</td><td>Central square, after settling 20 min in a moist chamber; phase contrast helps</td></tr>
<tr><td>Red cells</td><td>Isotonic diluent, 1 in 200</td><td>5 small groups of 16 in the central square (0.02 µL)</td></tr>
</table>
<p><b>Count = cells counted × dilution ÷ volume counted (µL).</b> Count cells touching the top and left lines of a square and ignore those touching the bottom and right, so no cell is counted twice. The error of a count is about ±2√n: counting 100 cells gives a 95% range of about ±20%, 400 cells about ±10%. Reject the chamber if it overflows into the moat, is underfilled, or has air bubbles or debris.</p>
<h3>Red cell indices</h3>
<ul>
<li><b>MCV (fL)</b> = PCV (L/L) ÷ RBC (×10¹²/L) × 1000</li>
<li><b>MCH (pg)</b> = Hb (g/L) ÷ RBC (×10¹²/L)</li>
<li><b>MCHC (g/L)</b> = Hb (g/L) ÷ PCV (L/L)</li>
</ul>
<p>Analysers measure MCV directly and calculate the haematocrit (RBC × MCV). The MCHC is very stable (about 320–360 g/L), so it is the best internal check: an MCHC over 370 g/L almost always means an artefact.</p>
<h3>How analysers count</h3>
<ul>
<li><b>Impedance (Coulter principle):</b> cells pass through an aperture and each one changes the electrical resistance in proportion to its volume. This gives the RBC, MCV, platelets and a size histogram (RDW).</li>
<li><b>Optical light scatter and fluorescence:</b> forward scatter (size), side scatter (granularity and nuclear complexity) and nucleic acid dyes separate the white cell types, reticulocytes and nucleated red cells.</li>
<li><b>Flags</b> warn of blasts, atypical lymphocytes, nucleated red cells, platelet clumps and abnormal distributions. A flag means: look at a film.</li>
</ul>
<h3>Spurious results to recognise</h3>
<table>
<tr><th>Cause</th><th>Effect</th><th>Fix</th></tr>
<tr><td>Cold agglutinin</td><td>Low RBC, high MCV and MCHC</td><td>Warm to 37 °C and rerun</td></tr>
<tr><td>Lipaemia, very high WBC, paraprotein</td><td>High Hb, MCH and MCHC</td><td>Plasma replacement or manual Hb with blank</td></tr>
<tr><td>Platelet clumps, satellitism</td><td>Low platelets, sometimes high WBC</td><td>Film; repeat in citrate</td></tr>
<tr><td>Nucleated red cells</td><td>High WBC on some analysers</td><td>Correct the WBC for NRBC</td></tr>
<tr><td>Red cell fragments, microcytes</td><td>High platelets (counted as platelets)</td><td>Optical or immunological platelet count, film</td></tr>
<tr><td>Cryoglobulin</td><td>High WBC and platelets</td><td>Rerun at 37 °C</td></tr>
</table>
`,
  points: [
    "HiCN at 540 nm is the reference Hb method; turbidity gives falsely high Hb",
    "Improved Neubauer: each 1 mm² square holds 0.1 µL",
    "Count = cells × dilution ÷ volume (µL); count top and left lines only",
    "Counting error ≈ ±2√n: count at least 100, ideally 400 cells",
    "MCHC over 370 g/L almost always means an artefact",
    "Impedance measures volume; optics and dyes separate white cell types"
  ]
},
{
  id: "m5-films",
  title: "Blood and marrow films: making and staining them",
  minutes: 12,
  sources: ["dl4", "dl5", "bc"],
  video: "how to make a wedge blood film spreader angle May Grunwald Giemsa staining",
  body: `
<p>A good film is the cheapest diagnostic test in haematology, and a bad one hides the diagnosis. Chapter 4 covers the methods; chapter 5 covers what to see on them.</p>
<h3>The wedge (spread) film</h3>
<ol>
<li>Place a drop of well-mixed EDTA blood (about 2–3 mm across) near one end of a clean, grease-free slide.</li>
<li>Put the spreader in front of the drop at about 30–45°, draw it back to touch the drop, and let the blood run along its edge.</li>
<li>Push the spreader forward in one smooth movement. The film should be about 3 cm long, with a head, a body and a thin <b>feathered tail</b> that stops before the end of the slide.</li>
<li>Dry it quickly in air (wave it, or use a fan in humid weather), label it in pencil on the frosted end, and fix it in absolute methanol within an hour.</li>
</ol>
<p>A larger drop, a steeper angle or a faster push gives a thicker film; anaemic blood needs a steeper angle and polycythaemic blood a flatter one. Read the morphology where the red cells just touch without overlapping.</p>
<h3>Romanowsky stains</h3>
<p>All Romanowsky stains combine an acidic dye (eosin Y) with basic dyes (azure B, from oxidised methylene blue). Azure B binds DNA and RNA (purple nuclei, blue cytoplasm); eosin binds haemoglobin and eosinophil granules (pink-orange). The <b>Romanowsky effect</b>, purple chromatin and neutrophil granules, needs both dyes and the correct pH.</p>
<ul>
<li><b>May–Grünwald–Giemsa (MGG)</b> and <b>Wright–Giemsa</b> are the common methods; Leishman is used for quick manual staining.</li>
<li>Use buffer at <b>pH 6.8</b> for routine films; pH 7.2 for malaria parasites to show Schüffner's dots.</li>
</ul>
<table>
<tr><th>Problem</th><th>Likely cause</th></tr>
<tr><td>Everything too blue, red cells grey-green</td><td>Buffer too alkaline, film too thick, staining too long, poor washing</td></tr>
<tr><td>Everything too pink, nuclei pale</td><td>Buffer too acidic, over-washing, old stain</td></tr>
<tr><td>Stain deposit (precipitate)</td><td>Unfiltered stain or stain allowed to dry on the slide</td></tr>
<tr><td>Water artefact (refractile holes in red cells)</td><td>Water in the methanol, or humid air before fixation</td></tr>
<tr><td>Cells clumped at the tail, lymphocytes smudged</td><td>Film too thin, uneven spreading or a chipped spreader</td></tr>
</table>
<h3>Marrow aspirate films and touch preparations</h3>
<p>Spread marrow from the fragments quickly before it clots, and make several films. Good fragments ("particles") at the tail let you judge cellularity and megakaryocytes and are needed for Perls' stain. A trephine touch imprint gives cytology when the aspirate is a dry tap.</p>
<h3>Other film types</h3>
<ul>
<li><b>Thick films</b> for malaria: lysed, unfixed, stained with Giemsa (see supplementary techniques).</li>
<li><b>Buffy coat films</b> concentrate white cells when the count is very low, or to find rare abnormal cells and parasites.</li>
<li><b>Automated slide makers and stainers</b> standardise films but still need daily quality checks.</li>
</ul>
`,
  points: [
    "Wedge film: 30–45° spreader angle, one smooth push, a feathered tail",
    "Dry fast, fix in methanol within an hour",
    "Romanowsky effect: azure B plus eosin at the correct pH (6.8 routine, 7.2 malaria)",
    "Too blue: alkaline or thick; too pink: acidic or over-washed",
    "Read morphology where red cells just touch",
    "Marrow films: spread fragments fast; particles are needed for iron"
  ]
},
{
  id: "m5-supp",
  title: "Supplementary tests: ESR, reticulocytes, inclusions and malaria",
  minutes: 15,
  sources: ["dl6", "dl"],
  video: "Westergren ESR method reticulocyte count new methylene blue malaria thick thin film",
  body: `
<p>Chapter 6 collects the simple tests that every laboratory still performs by hand at least some of the time.</p>
<h3>Erythrocyte sedimentation rate (ESR)</h3>
<p>The ICSH reference method is Westergren's: a glass or rigid plastic tube 30 cm long, bore at least 2.55 mm, filled to the 200 mm mark with blood diluted 4 + 1 with citrate. Stand it exactly vertical at 18–25 °C, free from vibration and sunlight, for exactly 60 minutes, then read the clear plasma above the red cell column in mm.</p>
<ul>
<li><b>Raised by</b> fibrinogen and globulins (they promote rouleaux), anaemia, pregnancy, a tilted tube and a warm room.</li>
<li><b>Lowered by</b> polycythaemia, sickle cells, spherocytes and acanthocytes (they cannot form rouleaux), very high white cell counts, and a sample left too long or refrigerated and not rewarmed.</li>
<li>Test within 4 h (6 h at 4 °C). The upper limit rises with age; a rough guide is age ÷ 2 for men and (age + 10) ÷ 2 for women.</li>
<li>Closed automated systems use shorter, sloped or centrifuged tubes and convert to a Westergren equivalent.</li>
</ul>
<h3>Reticulocyte count</h3>
<p>Mix equal volumes of blood and new methylene blue (a supravital stain), incubate at 37 °C for 15–20 minutes, make films and count reticulocytes among at least 1000 red cells (a Miller ocular graticule makes this faster). Reticulocytes contain a blue-staining network of precipitated ribosomal RNA. Analysers stain RNA with fluorescent dyes and also give the immature reticulocyte fraction.</p>
<p>Normal adult values: about 0.5–2.5%, or 50–100 × 10⁹/L. Report the absolute count; percentages mislead in anaemia.</p>
<h3>Red cell inclusions</h3>
<ul>
<li><b>Heinz bodies</b> (denatured Hb): supravital methyl violet; seen in G6PD deficiency during oxidant stress, unstable haemoglobins and after splenectomy.</li>
<li><b>HbH inclusions</b>: incubate with brilliant cresyl blue at 37 °C for up to 2 h; many fine dots give a "golf-ball" look. Found in HbH disease and, rarely, α-thalassaemia trait.</li>
<li><b>Siderocytes and Pappenheimer bodies</b>: Perls' stain on a blood film shows iron granules.</li>
</ul>
<h3>Malaria and other blood parasites</h3>
<ul>
<li><b>Thick film</b> (lysed, not fixed) for detection: it concentrates parasites about 20–40 times. Examine at least 100 oil-immersion fields before reporting negative, and repeat at 12–24 h intervals up to three times if malaria is suspected.</li>
<li><b>Thin film</b> (methanol-fixed) for the species and the parasitaemia: percentage of infected red cells, or parasites per µL from the thick film (parasites per 200 WBC × WBC count).</li>
<li>Giemsa at pH 7.2. <i>P. falciparum</i> shows only small rings and crescentic gametocytes in blood, with multiple rings per cell and no enlargement; over 2% parasitaemia, or schizonts in the blood, signals severe disease.</li>
<li>Rapid antigen tests (HRP-2, pLDH) help but do not replace microscopy for species and density.</li>
</ul>
`,
  points: [
    "Westergren: 200 mm, citrate 4 + 1, vertical, 18–25 °C, read at 60 min",
    "Fibrinogen, globulins and anaemia raise the ESR; sickle cells and spherocytes lower it",
    "Retics: new methylene blue, count 1000 cells; report absolute 50–100 × 10⁹/L",
    "Heinz bodies: methyl violet; HbH: brilliant cresyl blue golf balls",
    "Malaria: thick film to detect, thin film to speciate; Giemsa pH 7.2",
    "Repeat negative malaria films up to three times over 24–48 h"
  ]
},
{
  id: "m5-haemolysis",
  title: "Laboratory investigation of haemolysis",
  minutes: 15,
  sources: ["dl11", "dl22", "dl"],
  video: "osmotic fragility test EMA binding G6PD fluorescent spot direct antiglobulin test",
  body: `
<p>Chapters 11 to 13 of Dacie and Lewis set out a stepwise approach: show that haemolysis is happening, decide whether it is intravascular or extravascular, then find the cause.</p>
<h3>Is there haemolysis?</h3>
<ul>
<li>Raised reticulocytes, unconjugated bilirubin and LDH; low or absent haptoglobin.</li>
<li><b>Intravascular</b> haemolysis adds haemoglobinaemia, haemoglobinuria and, after a few days, urinary haemosiderin (Perls' stain on urine sediment).</li>
<li>The film often points to the cause: spherocytes, fragments, bite cells, sickle cells, agglutination.</li>
</ul>
<h3>Immune haemolysis</h3>
<ul>
<li><b>Direct antiglobulin test (DAT):</b> polyspecific anti-human globulin, then monospecific anti-IgG and anti-C3d. Warm AIHA: IgG with or without C3d. Cold haemagglutinin disease: C3d only.</li>
<li><b>Cold agglutinin titre</b> at 4 °C and thermal amplitude (activity at 30–37 °C matters clinically). Keep the sample at 37 °C from collection.</li>
<li><b>Donath–Landsteiner test</b> (biphasic IgG haemolysin) for paroxysmal cold haemoglobinuria, mostly in children after a viral illness.</li>
<li>A positive DAT without haemolysis is common in hospital patients; a negative DAT does not exclude AIHA if the antibody density is low.</li>
</ul>
<h3>Membrane disorders</h3>
<ul>
<li><b>Osmotic fragility:</b> red cells in a series of saline concentrations (0.1–0.9 g/dL NaCl). Spherocytes lyse at higher concentrations. Incubating the blood at 37 °C for 24 h first makes the test more sensitive. Abnormal in any spherocytosis, including immune.</li>
<li><b>Eosin-5′-maleimide (EMA) binding</b> by flow cytometry: reduced fluorescence in hereditary spherocytosis (band 3 and related proteins). Sensitive, specific and quick; the recommended screening test.</li>
<li>Cryohaemolysis test, and SDS-PAGE or ektacytometry in reference laboratories.</li>
</ul>
<h3>Enzyme disorders</h3>
<ul>
<li><b>G6PD fluorescent spot test:</b> normal cells reduce NADP to NADPH, which fluoresces under UV light. Quantitative assay confirms and is needed for heterozygous women.</li>
<li><b>Pitfall:</b> during or just after a haemolytic episode, the old enzyme-deficient cells have gone and young reticulocytes have more enzyme, so the result can be falsely normal. Repeat at 3 months, or compare with a reticulocyte-matched control.</li>
<li>Pyruvate kinase and other enzymes: quantitative assays in reference laboratories, interpreted against the retic count.</li>
</ul>
<h3>PNH</h3>
<p>Flow cytometry for GPI-anchored proteins is the test of choice: FLAER with CD24 (neutrophils) and CD14 (monocytes) for the clone size, and CD59 on red cells to show type II and III cells. The Ham's acid-serum test is historical.</p>
`,
  points: [
    "Haemolysis: retics, unconjugated bilirubin, LDH up; haptoglobin down",
    "DAT: warm AIHA IgG ± C3d; CHAD C3d only",
    "Osmotic fragility detects any spherocytes; EMA binding is the HS screen",
    "G6PD can be falsely normal after haemolysis: repeat at 3 months",
    "PNH: flow cytometry with FLAER, CD24, CD14 and red cell CD59",
    "Urinary haemosiderin marks chronic intravascular haemolysis"
  ]
},
{
  id: "m5-hb",
  title: "Haemoglobinopathies and thalassaemia: laboratory methods",
  minutes: 15,
  sources: ["dl14", "dl22", "bc"],
  video: "haemoglobin HPLC chromatogram HbA2 sickle solubility test Kleihauer acid elution",
  body: `
<p>Chapter 14 describes a screening strategy that uses two independent methods, so that no single variant is missed or misidentified.</p>
<h3>Start with the blood count and film</h3>
<p>Thalassaemia trait gives a low MCV and MCH with a normal or high RBC; iron deficiency gives a high RDW and a low RBC. Indices are a guide only: iron status and HbA2 decide.</p>
<h3>Main methods</h3>
<ul>
<li><b>Cation-exchange HPLC:</b> the first-line method in most laboratories. It quantifies HbA2 and HbF and gives a retention time for variants (S, C, D-Punjab, E, O-Arab). HbE co-elutes with HbA2 on many systems.</li>
<li><b>Capillary electrophoresis:</b> separates by charge in a buffer at alkaline pH, also quantitative; it separates HbE from HbA2.</li>
<li><b>Alkaline (pH 8.4–8.6) and acid (pH 6.0–6.2) gel electrophoresis:</b> the classical pair. At alkaline pH, S, D and G run together, and C, E and O run together; acid agar separates S from D and G, and C from E and O.</li>
<li><b>Sickle solubility test:</b> reducing agent (dithionite) makes HbS insoluble and the solution turbid. It cannot tell trait from disease, can be falsely negative in infants under 6 months and at very low Hb, and falsely positive with paraproteins or lipaemia. Confirm with HPLC or electrophoresis.</li>
</ul>
<h3>Interpreting HbA2 and HbF</h3>
<ul>
<li><b>HbA2 over 3.5%</b> with microcytosis: β-thalassaemia trait. Severe iron deficiency lowers HbA2 and can mask it; recheck after iron.</li>
<li>Normal HbA2 with microcytosis and normal ferritin: suspect α-thalassaemia (needs DNA analysis) or δβ-thalassaemia (HbF raised).</li>
<li><b>HbF:</b> alkali denaturation for higher levels; HPLC; the distribution among cells (flow cytometry or Kleihauer) separates hereditary persistence (pancellular) from δβ-thalassaemia and acquired causes (heterocellular).</li>
</ul>
<h3>Unstable haemoglobins and others</h3>
<p>Heat (50 °C) or isopropanol stability tests, Heinz body preparation, and oxygen affinity (P50) for high-affinity variants that cause erythrocytosis. Mass spectrometry or DNA sequencing identifies the variant.</p>
<h3>Fetomaternal haemorrhage</h3>
<p>The <b>Kleihauer (acid elution) test</b> uses the resistance of HbF to acid: fetal cells stay pink, adult cells become ghosts. Mollison's formula estimates the bleed: fetal red cells (mL) = 1800 × (fetal ÷ adult cells) × 1.22 × 1.09, about 2400 × the ratio. Anti-D: 125 IU intramuscularly covers 1 mL of fetal red cells. Flow cytometry with anti-HbF or anti-D is more precise for large bleeds.</p>
`,
  points: [
    "Use two independent methods: HPLC plus electrophoresis or a second technique",
    "HbA2 over 3.5% with microcytosis: β-thalassaemia trait",
    "Iron deficiency lowers HbA2 and can mask β-thal trait",
    "Sickle solubility cannot separate trait from disease",
    "Acid agar separates S from D/G and C from E/O",
    "Kleihauer: FMH (mL fetal cells) ≈ 2400 × fetal/adult ratio; 125 IU anti-D per mL"
  ]
},
{
  id: "m5-cyto",
  title: "Cytochemistry and iron stains",
  minutes: 12,
  sources: ["dl15", "dl9", "bmd"],
  video: "myeloperoxidase Sudan black non specific esterase PAS Perls stain bone marrow",
  body: `
<p>Flow cytometry has replaced most cytochemistry in leukaemia diagnosis, but a few stains remain quick, cheap and decisive, especially where flow is not available. Perls' stain for iron is still essential on every marrow aspirate.</p>
<h3>The main stains</h3>
<table>
<tr><th>Stain</th><th>Positive in</th><th>Use</th></tr>
<tr><td>Myeloperoxidase (MPO)</td><td>Neutrophil lineage from late myeloblasts on, eosinophils, weakly monocytes; Auer rods</td><td>3% or more of blasts positive proves myeloid lineage</td></tr>
<tr><td>Sudan black B (SBB)</td><td>Same pattern as MPO (lipid in granules)</td><td>Works on older films; occasionally positive in ALL</td></tr>
<tr><td>Non-specific esterase (α-naphthyl acetate or butyrate)</td><td>Monocytes and monoblasts, strongly and diffusely; inhibited by sodium fluoride</td><td>Identifies monocytic leukaemia; megakaryoblasts are positive but fluoride-resistant</td></tr>
<tr><td>Chloroacetate esterase</td><td>Neutrophil lineage and mast cells</td><td>Works on trephine sections</td></tr>
<tr><td>Periodic acid–Schiff (PAS)</td><td>Glycogen: block positivity in lymphoblasts, coarse granules in abnormal erythroblasts</td><td>Supportive only</td></tr>
<tr><td>Acid phosphatase</td><td>T lymphoblasts (focal, paranuclear)</td><td>Largely historical</td></tr>
<tr><td>Toluidine blue</td><td>Basophils and mast cells (metachromatic)</td><td>Basophilia, mast cell disease</td></tr>
</table>
<h3>Perls' (Prussian blue) stain</h3>
<ul>
<li>Acid ferrocyanide reacts with ferric iron (haemosiderin) to form blue-green Prussian blue.</li>
<li><b>Storage iron:</b> grade the iron in macrophages within fragments (0 to 6, or absent, reduced, normal, increased). Absent iron in good fragments is the gold standard for iron deficiency. Iron is not reliably assessed on a trephine after decalcification.</li>
<li><b>Sideroblasts:</b> normal sideroblasts have a few fine granules. A <b>ring sideroblast</b> has 5 or more granules covering at least a third of the nuclear rim.</li>
<li>Ring sideroblasts 15% or more of erythroblasts (or 5% or more with an SF3B1 mutation) support MDS with ring sideroblasts (in WHO-HAEM5, MDS with low blasts and SF3B1 mutation). Exclude alcohol, copper deficiency, zinc excess, isoniazid and congenital sideroblastic anaemia.</li>
</ul>
<h3>Practical points</h3>
<p>Use fresh films where possible (MPO fades within weeks), run a positive control slide with every batch, and check iron-free glassware and reagents for Perls'.</p>
`,
  points: [
    "MPO or SBB in 3% or more of blasts proves myeloid lineage",
    "Non-specific esterase: monocytic, inhibited by fluoride",
    "PAS block positivity suggests lymphoblasts",
    "Perls' on marrow fragments: absent iron confirms iron deficiency",
    "Ring sideroblast: 5 or more granules around a third of the nucleus",
    "Always run a positive control slide"
  ]
},
{
  id: "m5-coag",
  title: "Coagulation methods: PT, APTT, fibrinogen and factor assays",
  minutes: 16,
  sources: ["dl18", "labhaem", "dl"],
  video: "prothrombin time INR ISI calculation APTT Clauss fibrinogen factor assay parallel line",
  body: `
<p>Chapters 18 and 20 describe how each clotting test works, so you can see why each one picks up the defects it does, and where its pitfalls are. The clinical interpretation is in Module 4.</p>
<h3>Platelet-poor plasma</h3>
<p>Centrifuge citrated blood at about 2000 g for 15 minutes to give plasma with platelets under 10 × 10⁹/L. Centrifuge twice before freezing plasma for lupus anticoagulant tests, because residual platelets neutralise the antibodies. Test within 4 h for the APTT, or 24 h for the PT.</p>
<h3>The screening tests</h3>
<ul>
<li><b>Prothrombin time (PT):</b> plasma + thromboplastin (tissue factor with phospholipid) + calcium. Tests VII, X, V, II and fibrinogen.</li>
<li><b>APTT:</b> plasma + contact activator (kaolin, silica or ellagic acid) + phospholipid, incubated, then calcium. Tests XII, XI, IX, VIII, X, V, II and fibrinogen. Reagents differ greatly in sensitivity to heparin, lupus anticoagulant and factor deficiencies.</li>
<li><b>Thrombin time (TT):</b> plasma + dilute thrombin. Prolonged by heparin, dabigatran, low or abnormal fibrinogen and FDPs.</li>
<li><b>Clauss fibrinogen:</b> diluted plasma + a high concentration of thrombin, so the clotting time depends only on the fibrinogen; read from a calibration curve. PT-derived fibrinogen overestimates it in DIC and dysfibrinogenaemia.</li>
</ul>
<h3>The INR</h3>
<p>Thromboplastins vary in sensitivity, so the PT on warfarin is converted to an international normalised ratio: <b>INR = (patient PT ÷ mean normal PT)<sup>ISI</sup></b>. The mean normal PT (MNPT) is the geometric mean from at least 20 healthy adults on the same reagent and instrument. The ISI (international sensitivity index) compares the reagent with the WHO reference thromboplastin; an ISI close to 1.0 gives the most precise INR. The INR is valid only for patients stable on vitamin K antagonists.</p>
<h3>Mixing studies</h3>
<p>Mix patient plasma 1:1 with normal pooled plasma. Correction suggests a deficiency (50% of any factor is enough for a normal test); failure to correct suggests an inhibitor. Test again after 1–2 h at 37 °C, because acquired FVIII inhibitors are time- and temperature-dependent. Module 4 has a Rosner index calculator.</p>
<h3>Factor assays</h3>
<ul>
<li><b>One-stage assay:</b> the APTT (for VIII, IX, XI, XII) or PT (for II, V, VII, X) of the patient's plasma, diluted into plasma deficient in that factor, compared with a calibrated reference plasma.</li>
<li>Test at least three dilutions and plot a <b>parallel-line</b> analysis. Non-parallel lines mean an inhibitor, such as lupus anticoagulant or a specific factor inhibitor, and the result is invalid.</li>
<li><b>Chromogenic FVIII assays</b> are needed for some modified FVIII products and emicizumab, and they detect some mild haemophilia variants that one-stage assays miss.</li>
<li><b>Bethesda assay:</b> 1 Bethesda unit is the inhibitor that destroys half the FVIII in a 1:1 mix with normal plasma after 2 h at 37 °C.</li>
</ul>
<h3>Monitoring other anticoagulants</h3>
<p>Unfractionated heparin: APTT ratio against a locally derived therapeutic range, or anti-Xa 0.3–0.7 IU/mL. LMWH and the direct Xa inhibitors: drug-calibrated anti-Xa. Dabigatran: diluted thrombin time or ecarin-based tests.</p>
`,
  points: [
    "Platelet-poor plasma under 10 × 10⁹/L; double-spin for LA testing",
    "PT: VII, X, V, II, I; APTT: XII, XI, IX, VIII, X, V, II, I",
    "Clauss fibrinogen uses excess thrombin on diluted plasma",
    "INR = (PT ÷ MNPT)^ISI; MNPT from at least 20 healthy adults",
    "Factor assays need three dilutions and parallel lines",
    "Bethesda unit: inhibitor destroying 50% of FVIII in 2 h at 37 °C"
  ]
},
{
  id: "m5-qa",
  title: "Quality assurance: IQC, Westgard rules and EQA",
  minutes: 14,
  sources: ["dl25", "dl24q", "dl"],
  video: "Levey Jennings chart Westgard rules internal quality control haematology",
  body: `
<p>Quality assurance covers everything that makes a result reliable: the right test, a good sample, correct analysis, and a report the clinician can act on. Chapter 25 divides the analytical part into internal quality control (IQC) and external quality assessment (EQA).</p>
<h3>Precision and accuracy</h3>
<ul>
<li><b>Precision</b> is reproducibility: how close repeated results are to each other, expressed as the SD or coefficient of variation (CV = SD ÷ mean × 100).</li>
<li><b>Accuracy</b> is closeness to the true value. A precise method can still be wrong if it is biased (a calibration fault).</li>
<li><b>Random error</b> widens the scatter; <b>systematic error</b> (bias) shifts all results in one direction.</li>
</ul>
<h3>Internal quality control</h3>
<ul>
<li>Run control material at two or three levels (low, normal, high) with every batch, at the start of each shift, and at intervals during a long run (at least once per 50 patient samples).</li>
<li>Establish the lab's own mean and SD for each new lot of control from about 20 runs.</li>
<li>Plot each result on a <b>Levey–Jennings chart</b> with lines at the mean ± 1, 2 and 3 SD.</li>
<li>Also use patient data: duplicate tests on a few patient samples, the moving average of MCV, MCH and MCHC across patients (Bull's algorithm), delta checks, and correlation checks (does the film fit the count?).</li>
</ul>
<h3>Westgard rules</h3>
<table>
<tr><th>Rule</th><th>Meaning</th><th>Error type</th></tr>
<tr><td>1<sub>2s</sub></td><td>One result beyond 2 SD</td><td>Warning only: check the other rules</td></tr>
<tr><td>1<sub>3s</sub></td><td>One result beyond 3 SD</td><td>Reject: random error or a blunder</td></tr>
<tr><td>2<sub>2s</sub></td><td>Two consecutive results beyond 2 SD on the same side</td><td>Reject: systematic error</td></tr>
<tr><td>R<sub>4s</sub></td><td>One result beyond +2 SD and the next beyond −2 SD (range over 4 SD)</td><td>Reject: random error</td></tr>
<tr><td>4<sub>1s</sub></td><td>Four consecutive results beyond 1 SD on the same side</td><td>Reject: systematic error</td></tr>
<tr><td>10<sub>x̄</sub></td><td>Ten consecutive results on the same side of the mean</td><td>Reject: systematic error (shift)</td></tr>
</table>
<p>When a rule rejects a run, hold the patient results, find the cause (reagent lot, calibration, a blocked aperture, the control itself, a transcription error), correct it, rerun the controls and the affected patients, and record what you did. Do not simply rerun the control until it passes.</p>
<h3>External quality assessment</h3>
<p>EQA schemes (for example UK NEQAS, or national schemes) send the same samples to many laboratories. Your result is compared with the consensus or reference value, often as a deviation index or z-score. EQA detects bias that IQC cannot, and it covers films and interpretation as well as numbers. Poor performance in successive surveys needs a documented investigation.</p>
<h3>Beyond the analyser</h3>
<p>Quality also depends on staff training and competency, equipment maintenance and calibration (pipettes too), standard operating procedures, turnaround times, critical result phoning, and accreditation to ISO 15189.</p>
`,
  points: [
    "Precision = reproducibility (CV); accuracy = closeness to the true value",
    "Run controls at two or three levels with every batch",
    "1-2s is a warning; 1-3s and R-4s reject for random error",
    "2-2s, 4-1s and 10x reject for systematic error",
    "Never just rerun a failed control until it passes",
    "EQA detects bias that IQC cannot"
  ]
}
];

SOURCES.dl24q = "Dacie and Lewis, chapter 24: Laboratory organization and management";

/* Atlas: lab-method views of cells shared with earlier modules. [id, source cell, group, name, what, seen, tip] */
const M5_CELL_SPECS = [
["m5-retic", "reticulocyte", "Supravital stains", "Reticulocyte (new methylene blue)",
  "A young red cell whose residual ribosomal RNA precipitates as a blue network or dots after supravital staining.", "Count among 1000 red cells; raised in haemolysis, bleeding and recovery from deficiency.", "Report the absolute count. Do not confuse with Heinz or HbH bodies, which need other stains and incubation times."],
["m5-heinz", "m2-heinz", "Supravital stains", "Heinz bodies (methyl violet)",
  "Denatured, precipitated haemoglobin that stains purple with methyl violet and lies against the membrane.", "G6PD deficiency under oxidant stress, unstable haemoglobins, after splenectomy.", "Invisible on a Romanowsky film; bite and blister cells are the clue to ask for the stain."],
["m5-hbh", "m2-hbh", "Supravital stains", "HbH inclusions (brilliant cresyl blue)",
  "Many fine, evenly spaced blue dots after incubation with brilliant cresyl blue: the golf-ball cell.", "HbH disease (three α-gene deletion); occasionally α-thalassaemia trait.", "Incubate up to 2 h at 37 °C and scan many fields; a negative test does not exclude α-thalassaemia trait."],
["m5-ringsidero", "m2-ringsidero", "Iron stains", "Ring sideroblast (Perls')",
  "An erythroblast with 5 or more iron granules covering at least a third of the nuclear rim.", "MDS with SF3B1 mutation, congenital sideroblastic anaemia, alcohol, copper deficiency, isoniazid.", "Count among 100 erythroblasts and report the percentage; always grade the storage iron in fragments too."],
["m5-pappen", "m2-pappen", "Iron stains", "Pappenheimer bodies (siderocytes)",
  "Small basophilic granules on Romanowsky stain that are confirmed as iron by Perls' stain.", "After splenectomy, sideroblastic anaemia, thalassaemia, lead poisoning.", "Perls' positivity separates them from basophilic stippling (RNA) and Howell–Jolly bodies (DNA)."],
["m5-auer", "m3-myeloblast-auer", "Cytochemistry", "Auer rod (MPO positive)",
  "A rod of fused primary granules that stains strongly with myeloperoxidase and Sudan black B.", "AML, especially with maturation and APL; high-risk MDS.", "One Auer rod proves myeloid lineage; MPO highlights rods too faint to see on MGG."],
["m5-malaria", "m2-malaria", "Parasites", "Malaria ring forms (thin film)",
  "Small rings with a chromatin dot inside red cells on a methanol-fixed, Giemsa-stained thin film.", "P. falciparum and other Plasmodium species.", "Use the thick film to detect and the thin film for species and parasitaemia; Giemsa at pH 7.2."],
["m5-sickle", "m2-sickle", "Haemoglobin tests", "Sickle cells (confirm by HPLC)",
  "Elongated, crescent-shaped red cells formed when deoxygenated HbS polymerises.", "Sickle cell disease (HbSS, HbSC, HbS/β-thalassaemia); not seen in trait.", "Solubility test only screens; HPLC or electrophoresis quantifies HbS and separates trait from disease."],
["m5-sphero", "m2-sphero", "Haemolysis tests", "Spherocytes (EMA and osmotic fragility)",
  "Small, dense red cells without central pallor, from loss of membrane surface.", "Hereditary spherocytosis, warm AIHA, burns, transfusion reaction.", "Do a DAT first. EMA binding is reduced in HS; osmotic fragility is raised in any spherocytosis."],
["m5-agglut", "m2-agglut", "Analyser artefacts", "Red cell agglutination (cold agglutinin)",
  "Irregular clumps of red cells on the film, from IgM antibodies active at room temperature.", "Cold haemagglutinin disease, Mycoplasma, EBV, lymphoproliferative disorders.", "Low RBC, high MCV and MCHC on the analyser: warm the sample to 37 °C and rerun."],
["m5-rouleaux", "m2-rouleaux", "Analyser artefacts", "Rouleaux (high ESR)",
  "Red cells stacked like coins, caused by raised fibrinogen or globulins.", "Myeloma, other paraproteins, chronic inflammation, pregnancy.", "Rouleaux at the thin part of the film suggest a high ESR; check serum protein electrophoresis."],
["m5-echino", "m2-echino", "Storage artefacts", "Crenated cells (storage artefact)",
  "Red cells with regular short spicules, which form in stored EDTA blood or on slow-drying films.", "Delayed samples, excess EDTA; true echinocytes in uraemia and pyruvate kinase deficiency.", "If many cells are crenated, check the sample age and make a fresh film from a new sample."],
["m5-clump", "m4-plt-clump", "Analyser artefacts", "Platelet clump (pseudothrombocytopenia)",
  "A large aggregate of platelets, often at the feathered tail.", "EDTA-dependent antibodies, partly clotted samples.", "Always check the tail of the film before reporting a low platelet count; repeat in citrate (× 1.1)."],
["m5-satellite", "m4-satellite", "Analyser artefacts", "Platelet satellitism",
  "Platelets ringed around neutrophils in EDTA blood.", "EDTA-dependent IgG antibodies; no clinical significance.", "Gives a falsely low platelet count; report the citrate count."],
["m5-smudge", "m3-smudge", "Storage artefacts", "Smudge cells",
  "Lymphocytes crushed during spreading, leaving bare nuclear material.", "CLL, especially; also in old samples.", "Adding one drop of 22% albumin to four drops of blood before spreading preserves the cells for an accurate differential."]
];

const M5_LESSON_CELLS = {
  "m5-collection": ["m5-echino", "m5-clump", "m5-satellite"],
  "m5-reference": [],
  "m5-basic": ["m5-agglut", "m5-clump", "m5-rouleaux"],
  "m5-films": ["m5-smudge", "m5-echino"],
  "m5-supp": ["m5-retic", "m5-heinz", "m5-hbh", "m5-malaria", "m5-rouleaux"],
  "m5-haemolysis": ["m5-sphero", "m5-heinz", "m5-agglut"],
  "m5-hb": ["m5-sickle", "m5-hbh"],
  "m5-cyto": ["m5-auer", "m5-ringsidero", "m5-pappen"],
  "m5-coag": ["m5-clump"],
  "m5-qa": []
};

const M5_FACTS = [
  ["How long should a tourniquet stay on?", "Less than 1 minute; longer stasis raises Hb, PCV and counts."],
  ["What is the correct EDTA concentration?", "K₂EDTA 1.5–2.2 mg per mL of blood."],
  ["What does an underfilled EDTA tube do?", "Shrinks red cells: low spun PCV, high MCHC."],
  ["What happens to MCV in EDTA blood left at room temperature overnight?", "It rises as red cells swell; MCHC falls."],
  ["When should a blood film be made?", "Within about 3 hours of collection."],
  ["What is the order of draw?", "Blood cultures, citrate, serum, heparin, EDTA, fluoride."],
  ["How many subjects are needed for a non-parametric reference range?", "At least 120 per group."],
  ["How do you transfer a published reference range?", "Test about 20 local healthy subjects; accept if no more than 2 fall outside."],
  ["What is the reference method for haemoglobin?", "Haemiglobincyanide (HiCN), read at 540 nm."],
  ["Which form of haemoglobin is not measured by HiCN?", "Sulphaemoglobin."],
  ["What volume does one large square of an Improved Neubauer chamber hold?", "0.1 µL (1 mm × 1 mm × 0.1 mm)."],
  ["What is the dilution for a manual WBC count?", "1 in 20 in 2% acetic acid with gentian violet."],
  ["Which diluent is used for a manual platelet count?", "1% ammonium oxalate, 1 in 20."],
  ["Which lines of a square do you count cells on?", "Top and left; ignore cells touching the bottom and right."],
  ["What is the counting error of a manual count?", "About ±2√n; 100 cells gives about ±20%."],
  ["What MCHC suggests an artefact?", "Over 370 g/L."],
  ["What does a cold agglutinin do to the blood count?", "Low RBC, high MCV and very high MCHC; corrects at 37 °C."],
  ["What spreader angle makes a wedge film?", "About 30–45°."],
  ["What buffer pH is used for routine Romanowsky staining?", "pH 6.8 (pH 7.2 for malaria)."],
  ["What makes a film stain too blue?", "Alkaline buffer, thick film, overstaining or poor washing."],
  ["What are the dimensions of a Westergren tube?", "30 cm long, bore at least 2.55 mm, filled to 200 mm."],
  ["What dilution is used for the Westergren ESR?", "4 volumes of blood to 1 of 3.2% citrate."],
  ["Name red cell changes that lower the ESR.", "Sickle cells, spherocytes, acanthocytes, polycythaemia."],
  ["How is a manual reticulocyte count done?", "New methylene blue 15–20 min at 37 °C; count among 1000 red cells."],
  ["Which stain shows Heinz bodies?", "Methyl violet (supravital)."],
  ["Which stain shows HbH inclusions?", "Brilliant cresyl blue, incubated at 37 °C."],
  ["How many thick-film fields before calling malaria negative?", "At least 100 oil-immersion fields; repeat films up to three times."],
  ["What is the screening test for hereditary spherocytosis?", "EMA binding by flow cytometry."],
  ["Why can a G6PD test be falsely normal?", "After haemolysis, reticulocytes have more enzyme; repeat at 3 months."],
  ["What is the test of choice for PNH?", "Flow cytometry: FLAER, CD24, CD14 and red cell CD59."],
  ["What HbA2 level suggests β-thalassaemia trait?", "Over 3.5%."],
  ["What does acid agar electrophoresis separate?", "HbS from D and G; HbC from E and O."],
  ["What is Mollison's formula for FMH?", "Fetal cells (mL) = 1800 × F/A × 1.22 × 1.09 (about 2400 × F/A)."],
  ["How much anti-D covers 1 mL of fetal red cells?", "125 IU intramuscularly."],
  ["What makes a blast MPO positive for lineage?", "3% or more of blasts positive proves myeloid lineage."],
  ["Which esterase is inhibited by fluoride?", "Non-specific (α-naphthyl) esterase in monocytes."],
  ["Define a ring sideroblast.", "Erythroblast with 5 or more iron granules around at least a third of the nucleus."],
  ["What is the formula for the INR?", "(Patient PT ÷ mean normal PT) raised to the power ISI."],
  ["What is platelet-poor plasma?", "Plasma with platelets under 10 × 10⁹/L."],
  ["How is a factor assay checked for an inhibitor?", "Three dilutions: lines must be parallel to the standard."],
  ["Define the Bethesda unit.", "The inhibitor that destroys 50% of FVIII in a 1:1 mix after 2 h at 37 °C."],
  ["Which Westgard rules detect random error?", "1-3s and R-4s."],
  ["Which Westgard rules detect systematic error?", "2-2s, 4-1s and 10x."],
  ["What is Bull's algorithm?", "A moving average of patients' MCV, MCH and MCHC to detect drift."],
  ["What does EQA detect that IQC does not?", "Bias against other laboratories or the true value."]
];

const M5_QUIZ = [
{ q:"An EDTA sample collected at 9 pm is analysed at 11 am the next day after a night at room temperature. Which change do you expect?", a:["MCV falls and MCHC rises","MCV rises and MCHC falls","Hb falls by 20%","Platelets double"], c:1,
  e:"Red cells swell in stored EDTA blood, so the MCV and haematocrit rise and the MCHC falls. Hb is stable." },
{ q:"Which result most strongly suggests an analyser artefact rather than disease?", a:["MCV 62 fL","MCHC 395 g/L","RDW 19%","Platelets 520 × 10⁹/L"], c:1,
  e:"MCHC is tightly controlled; above about 370 g/L suggests a cold agglutinin, lipaemia or another artefact. Only spherocytes cause a modest rise." },
{ q:"A manual WBC count: 1 in 20 dilution, 92 cells counted in the 4 large corner squares. What is the WBC?", a:["4.6 × 10⁹/L","9.2 × 10⁹/L","18.4 × 10⁹/L","46 × 10⁹/L"], c:0,
  e:"Four squares hold 0.4 µL. 92 × 20 ÷ 0.4 = 4600 per µL = 4.6 × 10⁹/L." },
{ q:"You count 100 cells in a haemocytometer. What is the approximate 95% uncertainty of that count?", a:["±2%","±5%","±20%","±50%"], c:2,
  e:"The SD of a Poisson count is √n = 10; ±2 SD = ±20 cells, or ±20%. Counting 400 cells halves it." },
{ q:"Cold agglutinin is suspected from the blood count. What should the laboratory do first?", a:["Report the results with a comment","Warm the sample to 37 °C and rerun","Request a marrow","Repeat in citrate"], c:1,
  e:"Warming dissociates the agglutinates and usually corrects RBC, MCV and MCHC. Ideally the next sample is kept at 37 °C from collection." },
{ q:"A whole film stains too blue, with grey-green red cells. Which is the most likely cause?", a:["Buffer pH too acidic","Buffer pH too alkaline","Fixation in methanol","Film too thin"], c:1,
  e:"Alkaline buffer, a thick film, overstaining and poor washing all make films too blue. Acidic buffer makes them too pink." },
{ q:"Which finding lowers the Westergren ESR?", a:["Anaemia","Raised fibrinogen","Sickle cells","Tube tilted 10°"], c:2,
  e:"Abnormally shaped cells (sickle cells, spherocytes, acanthocytes) cannot form rouleaux. Anaemia, fibrinogen and tilt all increase the ESR." },
{ q:"A man of African ancestry has acute haemolysis after primaquine. His G6PD screen on day 3 is normal. What now?", a:["G6PD deficiency is excluded","Repeat G6PD after about 3 months, or quantify against retic count","Do osmotic fragility","Start steroids"], c:1,
  e:"Old, deficient cells are destroyed first; young cells have more enzyme. In the common African variant (A−) the screen may be normal during recovery." },
{ q:"Which test is now recommended to screen for hereditary spherocytosis?", a:["Unincubated osmotic fragility","Eosin-5′-maleimide (EMA) binding","Ham's test","Sickle solubility"], c:1,
  e:"EMA binding by flow cytometry is quick, sensitive and specific. Osmotic fragility is abnormal in any spherocytosis, including immune." },
{ q:"Microcytosis (MCV 64 fL), ferritin 6 µg/L and HbA2 3.2% on HPLC. What is the best interpretation?", a:["β-thalassaemia trait is excluded","Iron deficiency; recheck HbA2 after iron if β-thal trait is still suspected","α-thalassaemia is confirmed","HbE trait"], c:1,
  e:"Severe iron deficiency lowers HbA2 and can mask β-thalassaemia trait. Treat the iron deficiency and repeat." },
{ q:"Kleihauer test: 30 fetal cells per 10 000 adult cells. Using 2400 × ratio, what is the FMH?", a:["0.7 mL","7.2 mL","72 mL","0.07 mL"], c:1,
  e:"2400 × 30 ÷ 10 000 = 7.2 mL fetal red cells. At 125 IU per mL this needs about 900 IU anti-D, rounded up to the vial sizes." },
{ q:"Which stain is fluoride-sensitive and identifies monocytic blasts?", a:["Myeloperoxidase","Chloroacetate esterase","Non-specific (α-naphthyl butyrate) esterase","PAS"], c:2,
  e:"Monocytes stain diffusely with non-specific esterase and the staining is inhibited by sodium fluoride." },
{ q:"Patient PT 30 s, mean normal PT 12 s, thromboplastin ISI 1.1. What is the INR?", a:["2.3","2.5","2.7","3.3"], c:2,
  e:"(30 ÷ 12)^1.1 = 2.5^1.1 ≈ 2.74, reported as 2.7. With an ISI above 1.0 the INR is higher than the simple PT ratio." },
{ q:"Which feature invalidates a one-stage factor VIII assay?", a:["Three dilutions tested","Non-parallel dose–response lines","Use of FVIII-deficient plasma","A calibrated reference plasma"], c:1,
  e:"Non-parallelism shows an inhibitor (such as lupus anticoagulant). The result cannot be read from the curve." },
{ q:"A haemoglobin control reads +2.3 SD today and +2.4 SD on the previous run. Which rule is broken?", a:["1-2s only (warning)","2-2s: systematic error, reject","R-4s: random error","None"], c:1,
  e:"Two consecutive results beyond 2 SD on the same side break 2-2s, which points to a systematic error such as calibration drift." },
{ q:"Which Westgard rule points to random error?", a:["10x","4-1s","R-4s","2-2s"], c:2,
  e:"R-4s (range of more than 4 SD between consecutive controls) and 1-3s detect random error." },
{ q:"Platelet-poor plasma for lupus anticoagulant testing should be:", a:["Spun once at 500 g","Double-centrifuged to platelets under 10 × 10⁹/L","Taken from a heparin tube","Stored at 4 °C for 48 h"], c:1,
  e:"Residual platelets supply phospholipid that neutralises LA, especially after freezing and thawing." }
];
const M5_CASES = [
{
  id:"m5-cold", title:"A very high MCHC", tag:"Analyser artefact",
  stem:"A 72-year-old man with tiredness. The sample arrived by courier on a cold winter morning.",
  data:[["Hb","112 g/L"],["RBC","1.92 × 10¹²/L"],["MCV","118 fL"],["MCH","58 pg"],["MCHC","430 g/L"],["WBC","7.1 × 10⁹/L"]],
  steps:[
    { q:"Which index tells you at once that this result is wrong?", opts:["MCV","MCH and MCHC far above any physiological value","WBC","Hb"], c:1,
      fb:"An MCHC of 430 g/L is impossible for intact cells. Agglutinated doublets and triplets are counted as single large cells, lowering RBC and raising MCV, MCH and MCHC. The Hb, measured after lysis, is correct." },
    { q:"What do you do next?", opts:["Report with a comment","Warm the sample to 37 °C for 15–30 min and rerun","Request B12 and folate","Repeat on a new sample at room temperature"], c:1,
      fb:"After warming, the indices usually fall to normal. If they do not fully correct, replace the plasma with warm saline or use a sample kept at 37 °C from collection." },
    { q:"The warmed rerun gives RBC 3.55, MCV 92 fL, MCHC 335 g/L. The film shows agglutinates at room temperature. What tests follow?", opts:["DAT (C3d positive?) and cold agglutinin titre","Osmotic fragility","Haemoglobin electrophoresis","Bone marrow"], c:0,
      fb:"A C3d-only DAT and a high cold agglutinin titre suggest cold agglutinin disease; look for haemolysis and a B-cell clone." }
  ],
  teach:["MCHC over 370 g/L almost always means an artefact","Cold agglutinin: low RBC, high MCV and MCHC; Hb correct","Warm to 37 °C and rerun","Then DAT, cold agglutinin titre and haemolysis screen"]
},
{
  id:"m5-plt", title:"Low platelets before surgery", tag:"Pseudothrombocytopenia",
  stem:"A healthy 45-year-old woman has a pre-operative blood count. She has no bleeding history.",
  data:[["Hb","134 g/L"],["WBC","6.8 × 10⁹/L"],["Platelets","38 × 10⁹/L (flag: PLT clumps)"],["MPV","Not reported"]],
  steps:[
    { q:"What is the first thing to do?", opts:["Cancel surgery","Look at the blood film, including the feathered tail","Platelet transfusion","Start steroids"], c:1,
      fb:"The film shows large platelet aggregates at the tail. This is EDTA-dependent pseudothrombocytopenia until proven otherwise." },
    { q:"How do you get a true count?", opts:["Repeat in EDTA","Collect a citrate sample, analyse promptly and multiply by 1.1","Count on a heparin sample next day","Manual count on the same EDTA sample"], c:1,
      fb:"Citrate (9 + 1) dilutes the sample by 10%, so the count is multiplied by 1.1. The citrate count here is 246 × 10⁹/L." },
    { q:"What else should the report say?", opts:["Nothing more","That the low EDTA count is an in vitro artefact, and future counts should use citrate","Refer to haematology urgently","Advise ITP treatment"], c:1,
      fb:"The antibody is harmless but lifelong; a comment prevents repeated unnecessary investigation and cancelled operations." }
  ],
  teach:["Check the film before accepting a low platelet count","EDTA-dependent clumping and satellitism are harmless","Citrate count × 1.1","Record it so future samples use citrate"]
},
{
  id:"m5-coag-tube", title:"A long APTT on a short draw", tag:"Pre-analytical error",
  stem:"A 60-year-old man with polycythaemia vera (Hct 0.62) before a dental extraction. The citrate tube is 70% full.",
  data:[["PT","16.8 s (ref 11–14)"],["APTT","44 s (ref 26–36)"],["Fibrinogen","1.4 g/L"],["Platelets","540 × 10⁹/L"]],
  steps:[
    { q:"Why might these results be falsely abnormal?", opts:["Heparin contamination only","The underfilled tube and high haematocrit both leave too much citrate for the plasma volume","Lipaemia","Factor deficiency"], c:1,
      fb:"With little plasma, excess citrate binds the calcium added in the test and prolongs clotting times. Underfilling makes it worse." },
    { q:"What should the laboratory do?", opts:["Report with a comment","Reject and ask for a full tube with citrate adjusted for the haematocrit","Add calcium to the sample","Repeat on the same sample"], c:1,
      fb:"Citrate (mL) = 0.00185 × blood volume (mL) × (100 − Hct%). For 4.5 mL blood with Hct 62: 0.00185 × 4.5 × 38 ≈ 0.32 mL instead of 0.5 mL." },
    { q:"The repeat with adjusted citrate gives PT 13.1 s, APTT 31 s, fibrinogen 2.8 g/L. What do you conclude?", opts:["Acquired factor deficiency","The first results were a pre-analytical artefact","DIC","Lupus anticoagulant"], c:1,
      fb:"Normal results on a correct sample. Note that very high platelet counts in PV can also cause acquired von Willebrand syndrome; check VWF if he bleeds." }
  ],
  teach:["Citrate tubes must be at least 90% full","Adjust citrate when Hct is over 0.55","Reject, do not 'correct', a bad sample","Think of acquired VWD in very high platelet counts"]
},
{
  id:"m5-qc", title:"The control that kept drifting", tag:"Quality control",
  stem:"Monday morning IQC on the analyser. The normal-level Hb control has a target mean of 125 g/L with SD 2 g/L.",
  data:[["Thursday","127 g/L"],["Friday","128 g/L"],["Saturday","127.5 g/L"],["Monday","129.5 g/L"]],
  steps:[
    { q:"Convert to SD units and apply the Westgard rules. Which rule fails?", opts:["1-3s","R-4s","4-1s: four consecutive results beyond +1 SD","None"], c:2,
      fb:"+1.0, +1.5, +1.25 and +2.25 SD: four in a row beyond +1 SD on the same side. Monday's +2.25 also gives a 1-2s warning. 4-1s means systematic error." },
    { q:"What is the most likely cause?", opts:["A random blunder","A systematic shift: calibration drift, a new reagent or control lot, or a deteriorating lamp","A haemolysed patient sample","Nothing; it is within 3 SD"], c:1,
      fb:"Systematic errors move results consistently in one direction. Check calibration, reagent and control lot changes and the maintenance log." },
    { q:"After recalibration the control reads 125.4 g/L. What else must be done?", opts:["Nothing","Review and if needed rerun patient samples analysed since the shift began, and record the event","Change the target mean to 128","Delete the failed control points"], c:1,
      fb:"Patients' results released during the shift may be biased. Never adjust the target to fit a drifting control, and never delete QC data." }
  ],
  teach:["Convert every result to SD units","4-1s, 2-2s and 10x flag systematic error","1-3s and R-4s flag random error","Hold, fix, rerun controls and affected patients, document"]
},
{
  id:"m5-kleihauer", title:"A difficult delivery in a D-negative mother", tag:"Fetomaternal haemorrhage",
  stem:"A D-negative woman delivers a D-positive baby after a placental abruption. A Kleihauer test is requested 2 h after delivery.",
  data:[["Fetal cells","48"],["Adult cells counted","10 000"],["Mother's group","O D-negative, no anti-D"]],
  steps:[
    { q:"Using about 2400 × (fetal ÷ adult), what is the estimated bleed?", opts:["0.5 mL","1.2 mL","11.5 mL","115 mL"], c:2,
      fb:"2400 × 48 ÷ 10 000 = 11.5 mL fetal red cells. Mollison's full formula: 1800 × ratio × 1.22 × 1.09." },
    { q:"How much intramuscular anti-D is needed?", opts:["500 IU","About 1500 IU (125 IU per mL), rounded up to vial sizes","250 IU","None"], c:1,
      fb:"11.5 × 125 = 1440 IU; give 1500 IU. Large bleeds are better confirmed by flow cytometry, and intravenous anti-D may be used." },
    { q:"What follow-up test is needed?", opts:["None","Repeat Kleihauer or flow at 72 h (48 h after IV anti-D) to check clearance of fetal cells","DAT on the mother at 6 months","Bone marrow"], c:1,
      fb:"If fetal cells remain, more anti-D is needed. Free anti-D in the mother's plasma also shows the dose was enough." }
  ],
  teach:["Kleihauer relies on acid-resistant HbF","FMH ≈ 2400 × fetal/adult ratio","125 IU IM anti-D per mL fetal cells","Check clearance at 72 h; use flow for large bleeds"]
},
{
  id:"m5-hplc", title:"Microcytosis in a pregnant woman", tag:"Haemoglobinopathy screening",
  stem:"A 26-year-old woman at 10 weeks of pregnancy, family from Cyprus. Antenatal screening.",
  data:[["Hb","104 g/L"],["MCV","63 fL"],["MCH","20 pg"],["RBC","5.3 × 10¹²/L"],["Ferritin","45 µg/L"],["HPLC HbA2","5.4%"],["HbF","1.2%"]],
  steps:[
    { q:"What is the interpretation?", opts:["Iron deficiency","β-thalassaemia trait","HbH disease","Normal pregnancy"], c:1,
      fb:"Microcytosis with a high RBC, normal ferritin and HbA2 over 3.5% is β-thalassaemia trait." },
    { q:"What must happen next?", opts:["Iron supplements only","Test the baby's father urgently","Repeat in 6 months","Bone marrow"], c:1,
      fb:"If he also carries β-thalassaemia, HbS, HbE, HbD-Punjab, HbO-Arab or HbLepore, the fetus is at risk of a serious disorder; offer counselling and prenatal diagnosis." },
    { q:"Why do laboratories confirm a variant with a second method?", opts:["Cost","HPLC windows contain several variants (for example HbE with HbA2), so a second independent method avoids misidentification","To measure ferritin","It is not needed"], c:1,
      fb:"Capillary or gel electrophoresis, or DNA analysis, confirms what HPLC suggests." }
  ],
  teach:["High RBC, low MCV, normal ferritin: think thalassaemia trait","HbA2 over 3.5% = β-thal trait","Antenatal: test the partner quickly","Confirm variants by a second method"]
}
];

const M5_TREES = [
{ id:"spurious", title:"Spurious blood count", intro:"Use when a blood count does not fit the patient or the other indices. Start from the parameter that looks wrong.",
  nodes:{
  start:{ q:"Which result looks wrong?", opts:[["MCHC over 370 g/L","mchc"],["Platelets unexpectedly low","plt"],["WBC unexpectedly high","wbc"],["MCV high in an old sample","mcv"],["Hb high for the RBC and PCV","hb"]] },
  mchc:{ q:"Do agglutinates show on the film, and does warming to 37 °C correct it?", opts:[["Yes","cold"],["No, the plasma is milky or the WBC is very high","lip"],["No, the film shows many spherocytes","sph"]] },
  cold:{ end:"Cold agglutinin artefact", detail:"Report the warmed results. Then DAT, cold agglutinin titre and haemolysis screen." },
  lip:{ end:"Turbidity artefact (lipaemia, leucocytosis, paraprotein)", detail:"Hb is falsely high: plasma replacement with saline, or manual Hb with a sample blank. Recalculate MCH and MCHC." },
  sph:{ end:"True raised MCHC from spherocytes (usually only to about 370 g/L)", detail:"DAT, then EMA binding. Higher values still suggest an artefact." },
  plt:{ q:"Does the film show clumps or satellitism?", opts:[["Yes","pseudo"],["No, but giant platelets","giant"],["No, and the sample has a clot","clot"],["No","truelow"]] },
  pseudo:{ end:"Pseudothrombocytopenia", detail:"Repeat in citrate (× 1.1) and add a report comment." },
  giant:{ end:"Giant platelets counted as red cells", detail:"Manual count, optical or immunological platelet count. Consider inherited macrothrombocytopenia." },
  clot:{ end:"Partly clotted sample", detail:"Reject and request a new sample. Fibrinogen and platelets are consumed in the clot." },
  truelow:{ end:"Probably true thrombocytopenia", detail:"Go to the Module 4 thrombocytopenia workup." },
  wbc:{ q:"What does the film show?", opts:[["Nucleated red cells","nrbc"],["Platelet clumps","pclump"],["Crystals or precipitate; patient has cryoglobulin","cryo"],["Real leucocytosis","truewbc"]] },
  nrbc:{ end:"WBC includes nucleated red cells", detail:"Corrected WBC = WBC × 100 ÷ (100 + NRBC per 100 WBC). Modern analysers usually correct this automatically." },
  pclump:{ end:"Platelet clumps counted as white cells", detail:"Citrate sample; read the differential from the film." },
  cryo:{ end:"Cryoglobulin or cryofibrinogen artefact", detail:"Warm to 37 °C and rerun; WBC and platelets may both be falsely high." },
  truewbc:{ end:"True leucocytosis", detail:"Differential and film review; go to the Module 3 workups." },
  mcv:{ q:"Was the sample more than 6–24 h old at room temperature?", opts:[["Yes","storage"],["No","truemcv"]] },
  storage:{ end:"Storage artefact: swollen red cells", detail:"MCV and PCV rise, MCHC falls. Ask for a fresh sample; keep samples at 4 °C if analysis is delayed." },
  truemcv:{ end:"Probably true macrocytosis", detail:"Check retics, B12, folate, liver, thyroid, alcohol and drugs (Module 2)." },
  hb:{ q:"Is the plasma lipaemic, or is there a very high WBC or paraprotein?", opts:[["Yes","lip"],["No","hbcheck"]] },
  hbcheck:{ end:"Recheck with the analyser QC and a manual HiCN Hb", detail:"Consider unlysed resistant red cells (HbS, HbC, target cells); extend lysis time if your analyser allows." }
  }},
{ id:"westgard", title:"Westgard QC decision", intro:"Use with each control run. Express every result in SD units from the target mean.",
  nodes:{
  start:{ q:"Is any control beyond ±2 SD?", opts:[["No","accept"],["Yes","s3"]] },
  accept:{ end:"Accept the run", detail:"Unless 4-1s or 10x applies over recent runs: also check for four results beyond 1 SD, or ten on one side." },
  s3:{ q:"Is any control beyond ±3 SD?", opts:[["Yes","r13"],["No","s22"]] },
  r13:{ end:"Reject: 1-3s (random error or a blunder)", detail:"Check sample mixing, a blocked aperture, bubbles, pipetting, the wrong control vial or a transcription error." },
  s22:{ q:"Is the previous result (or the other level in this run) also beyond 2 SD on the same side?", opts:[["Yes","r22"],["No, but one is beyond +2 SD and the other beyond −2 SD","r4"],["No","s41"]] },
  r22:{ end:"Reject: 2-2s (systematic error)", detail:"Check calibration, reagent and control lot changes, temperature and lamp. Recalibrate if needed." },
  r4:{ end:"Reject: R-4s (random error)", detail:"Imprecision: check mixing, pipetting, aperture and fluidics." },
  s41:{ q:"Are the last four results beyond 1 SD on the same side, or the last ten on the same side of the mean?", opts:[["Yes","r41"],["No","warn"]] },
  r41:{ end:"Reject: 4-1s or 10x (systematic error)", detail:"A gradual shift or drift. Investigate calibration and reagents; review patients since the shift began." },
  warn:{ end:"1-2s warning only: accept the run", detail:"Watch the next runs closely; record the warning." }
  }}
];

const M5_CHECKLIST = { title:"Making a good blood film", intro:"The steps of a wedge film and Romanowsky stain, with the commonest faults. Tick each step as you go.", steps:[
  ["Fresh, well-mixed sample", "EDTA blood less than 3 hours old, mixed by gentle inversion. Older samples give storage artefacts."],
  ["Clean slides", "Grease-free slides and a spreader with a smooth, unchipped edge, narrower than the slide."],
  ["Right drop size", "2–3 mm across, about 1 cm from the frosted end."],
  ["Spread at 30–45°", "Let the blood run along the spreader's edge, then push in one smooth movement. Steeper for anaemic blood, flatter for polycythaemic blood."],
  ["Check the shape", "About 3 cm long, with head, body and a feathered tail that ends before the slide edge."],
  ["Dry fast and label", "Air-dry quickly; label in pencil on the frosted end."],
  ["Fix in methanol", "Absolute methanol, free of water, within an hour."],
  ["Stain at the right pH", "MGG or Wright–Giemsa with buffer at pH 6.8 (7.2 for malaria). Filter the stain."],
  ["Check the stain", "Pink-orange red cells, purple nuclei, lilac neutrophil granules, orange eosinophil granules. Too blue or too pink: check the buffer."],
  ["Read in the right place", "Morphology where red cells just touch; scan the tail for clumps and large cells."]
]};

/* Westgard trainer scenarios: control values in SD units from the target mean. */
const QC_SCENARIOS = [
  { id:"ok", name:"Run A", note:"Hb control, target 125 g/L, SD 2 g/L.", z:[0.3,-0.6,1.1,-0.2,0.7,-1.3,0.4,-0.1,0.9,-0.8,0.2,-0.5,1.4,-0.9,0.1,0.6,-0.4,1.0,-0.7,0.3] },
  { id:"r13", name:"Run B", note:"Platelet control, target 250 × 10⁹/L, SD 10.", z:[0.2,-0.7,0.6,-0.3,1.0,-0.9,0.4,0.1,-0.4,0.8,-0.2,0.5,-1.1,3.4,0.3,-0.6,0.2,0.7,-0.3,0.1] },
  { id:"r22", name:"Run C", note:"MCV control, target 88 fL, SD 0.8 fL.", z:[0.1,-0.5,0.8,-0.2,0.4,-0.9,0.6,0.3,-0.4,1.2,0.7,1.6,2.3,2.6,1.9,2.2,1.7,2.4,1.8,2.1] },
  { id:"r4s", name:"Run D", note:"WBC control, target 7.5 × 10⁹/L, SD 0.2.", z:[0.4,-0.3,0.9,-1.1,0.2,0.6,-0.8,1.4,-1.5,2.4,-2.2,0.5,-0.4,1.1,-0.6,0.3,-1.0,0.8,-0.2,0.6] },
  { id:"r41", name:"Run E", note:"Hb control, target 125 g/L, SD 2 g/L.", z:[0.2,-0.4,0.7,-0.9,0.3,0.5,-0.2,0.6,-0.7,0.1,1.3,1.6,1.2,1.8,1.5,1.9,1.4,1.7,1.6,1.3] },
  { id:"r10x", name:"Run F", note:"MCHC control, target 335 g/L, SD 3 g/L.", z:[-0.6,0.4,-0.9,0.2,-0.3,0.5,0.4,0.6,0.3,0.8,0.5,0.2,0.7,0.4,0.9,0.6,0.3,0.5,0.8,0.4] }
];
const QC_RULES = [["none", "No rule broken"], ["1-3s", "1-3s"], ["2-2s", "2-2s"], ["R-4s", "R-4s"], ["4-1s", "4-1s"], ["10x", "10x"]];
