/* Module 1 content: Normal blood and marrow cells. Original text written from the
   reference books in the project library; values are the commonly quoted adult
   reference intervals and should be checked against the local laboratory's ranges. */

const SOURCES = {
  dl: "Dacie and Lewis Practical Haematology, 11th ed. (2011)",
  bc: "Bain, Blood Cells: A Practical Guide, 5th ed. (2015)",
  bmp: "Bain et al., Bone Marrow Pathology, 4th ed. (2010)",
  hof: "Hoffbrand et al., Postgraduate Haematology, 7th ed. (2015)",
  bmd: "Bain et al., Bone Marrow Diagnosis: An Illustrated Guide, 3rd ed. (2014)",
  bmm: "Bone Marrow: A Practical Manual (2011)",
  atlas: "Theml et al., Color Atlas of Hematology",
  lhp: "Laboratory Hematology Practice (2012)",
  hp: "Jaffe et al., Hematopathology, 2nd ed. (2017)",
  psh: "Problem Solving in Haematology (2010)"
};

const MODULES = [
  { id: "m1", n: 1, title: "Normal blood and marrow cells", sub: "Histology and physiology", ready: true },
  { id: "m2", n: 2, title: "Red cell disorders", sub: "Anaemia workup, morphology, haemolysis", ready: false },
  { id: "m3", n: 3, title: "White cell disorders and leukaemia", sub: "Immunophenotyping, WHO 5th edition and ICC 2022", ready: false },
  { id: "m4", n: 4, title: "Haemostasis", sub: "Platelets, coagulation, thrombosis workup", ready: false }
];

const LESSONS = [
{
  id: "haematopoiesis",
  title: "Haematopoiesis",
  minutes: 12,
  sources: ["hof", "bmp", "hp"],
  video: "haematopoiesis stem cell hierarchy lecture",
  body: `
<p>Haematopoiesis is the production of all blood cells from a small pool of self-renewing haematopoietic stem cells (HSCs). In an adult, the marrow makes roughly 2.5 × 10<sup>9</sup> red cells, 2.5 × 10<sup>9</sup> platelets and 1 × 10<sup>9</sup> granulocytes per kilogram per day, and it can raise this output several-fold under stress.</p>
<h3>Sites by age</h3>
<table class="t"><thead><tr><th>Stage</th><th>Main site</th><th>Notes</th></tr></thead><tbody>
<tr><td>Weeks 3 to 8</td><td>Yolk sac (mesoblastic phase)</td><td>Primitive, nucleated megaloblastic red cells making embryonic haemoglobins (Gower 1, Gower 2, Portland)</td></tr>
<tr><td>Week 6 to month 7</td><td>Liver, with a smaller contribution from the spleen (hepatic phase)</td><td>Definitive haematopoiesis seeded from the aorta–gonad–mesonephros (AGM) region; HbF predominates</td></tr>
<tr><td>Month 5 onwards</td><td>Bone marrow (medullary phase)</td><td>The only normal site after birth</td></tr>
<tr><td>Childhood</td><td>Almost all bones</td><td>Red marrow gradually replaced by fat in the long bones</td></tr>
<tr><td>Adult</td><td>Axial skeleton: vertebrae, ribs, sternum, skull, pelvis, proximal femur and humerus</td><td>Posterior iliac crest is the standard sampling site</td></tr>
</tbody></table>
<p>Extramedullary haematopoiesis in an adult (liver, spleen, paravertebral masses) is always abnormal. It is seen in severe chronic haemolysis, thalassaemia major and primary myelofibrosis.</p>
<h3>The stem cell hierarchy</h3>
<p>The classical model places the HSC at the top. It gives rise to multipotent progenitors (MPP), which split into a common myeloid progenitor (CMP) and a common lymphoid progenitor (CLP). The CMP produces the megakaryocyte–erythroid progenitor (MEP) and the granulocyte–monocyte progenitor (GMP). Single-cell studies now show this is closer to a continuum: some HSCs are already biased towards megakaryocytes, and lineage choice happens earlier than the tree suggests. The tree is still the most useful frame for interpreting immunophenotypes.</p>
<ul>
<li><b>HSC phenotype:</b> CD34+, CD38−, CD90+, CD45RA−, lineage-negative. CD34+ cells make up about 1% to 2% of normal marrow nucleated cells.</li>
<li><b>Colony assays:</b> CFU-GEMM (mixed), BFU-E and CFU-E (erythroid), CFU-GM, CFU-Meg.</li>
<li><b>Niche:</b> HSCs live close to sinusoidal endothelium and perivascular stromal cells that secrete CXCL12 (SDF-1) and stem cell factor. The CXCL12–CXCR4 axis holds them in the marrow; plerixafor blocks CXCR4 to mobilise stem cells for collection.</li>
</ul>
<h3>Growth factors</h3>
<table class="t"><thead><tr><th>Factor</th><th>Source</th><th>Main action</th></tr></thead><tbody>
<tr><td>Erythropoietin (EPO)</td><td>Peritubular interstitial cells of the kidney (about 90%), liver</td><td>Survival and proliferation of CFU-E and early erythroblasts; production rises with tissue hypoxia through HIF-2α</td></tr>
<tr><td>Thrombopoietin (TPO)</td><td>Liver, made at a constant rate</td><td>Binds MPL on platelets and megakaryocytes; free TPO level falls as platelet mass rises</td></tr>
<tr><td>G-CSF</td><td>Macrophages, endothelium, fibroblasts</td><td>Neutrophil production and release</td></tr>
<tr><td>GM-CSF, IL-3</td><td>T cells, macrophages</td><td>Early multilineage progenitors</td></tr>
<tr><td>M-CSF</td><td>Stromal cells</td><td>Monocyte and macrophage lineage</td></tr>
<tr><td>IL-5</td><td>T helper 2 cells</td><td>Eosinophils</td></tr>
<tr><td>SCF (KIT ligand), FLT3 ligand</td><td>Stromal cells</td><td>Early progenitors, mast cells (SCF)</td></tr>
<tr><td>IL-7</td><td>Stromal cells</td><td>Early B and T lymphopoiesis</td></tr>
</tbody></table>
<h3>Transcription factors to know</h3>
<p>GATA2 and RUNX1 maintain early progenitors. GATA1 with its cofactor FOG1, and KLF1, drive erythroid and megakaryocytic differentiation. PU.1 (SPI1) and C/EBPα drive myeloid differentiation; high PU.1 favours monocytes and lower PU.1 with C/EBPα favours granulocytes. PAX5 commits B cells, and Notch signalling with GATA3 commits T cells. Many of these genes are mutated in myeloid neoplasms (RUNX1, CEBPA, GATA2), which is why they matter later in Module 3.</p>
`,
  points: [
    "Yolk sac (weeks 3 to 8), then liver and spleen (week 6 to month 7), then marrow from month 5",
    "Adult red marrow is axial: vertebrae, pelvis, ribs, sternum, skull, proximal femur and humerus",
    "HSC: CD34+ CD38− CD90+ CD45RA−, lineage-negative",
    "CMP gives MEP and GMP; CLP gives B, T and NK cells",
    "EPO from the kidney responds to hypoxia via HIF; TPO from the liver is constant and cleared by platelet mass",
    "GATA1 and KLF1 for erythroid; PU.1 and C/EBPα for myeloid; PAX5 for B cells"
  ]
},
{
  id: "erythropoiesis",
  title: "Erythropoiesis and red cell physiology",
  minutes: 15,
  sources: ["dl", "hof", "bc"],
  video: "erythropoiesis red cell maturation normoblast",
  body: `
<p>Committed erythroid progenitors (BFU-E, then CFU-E) give rise to the first morphologically recognisable cell, the proerythroblast. Through about four divisions over 5 to 7 days, each proerythroblast yields around 16 red cells. Erythroblasts mature in erythroblastic islands around a central macrophage, which supplies iron and engulfs the extruded nuclei.</p>
<h3>Maturation sequence</h3>
<table class="t"><thead><tr><th>Stage</th><th>Size</th><th>Nucleus</th><th>Cytoplasm</th></tr></thead><tbody>
<tr><td>Proerythroblast</td><td>15–20 µm</td><td>Large, round, fine chromatin, 1–2 nucleoli</td><td>Deeply basophilic, often with a paler perinuclear zone; may show blebs</td></tr>
<tr><td>Basophilic (early) erythroblast</td><td>12–16 µm</td><td>Coarser chromatin, nucleoli not seen</td><td>Intensely blue, from abundant ribosomes</td></tr>
<tr><td>Polychromatic (intermediate) erythroblast</td><td>10–12 µm</td><td>Chequerboard chromatin clumping; last stage that divides</td><td>Grey-lilac as haemoglobin accumulates</td></tr>
<tr><td>Orthochromatic (late) erythroblast</td><td>8–10 µm</td><td>Small, dense, pyknotic, then extruded</td><td>Nearly the colour of a mature red cell</td></tr>
<tr><td>Reticulocyte</td><td>8–9 µm</td><td>None</td><td>Polychromatic on Romanowsky stain; residual RNA forms a reticulum with new methylene blue</td></tr>
<tr><td>Red cell</td><td>7.2–7.9 µm diameter</td><td>None</td><td>Biconcave disc with central pallor about one third of the diameter</td></tr>
</tbody></table>
<p>Reticulocytes spend about 1 to 2 days maturing in the marrow and about 1 day in the blood. Under strong EPO drive they are released early ("shift" or stress reticulocytes) and stay longer in the circulation, which is why the reticulocyte production index corrects for this.</p>
<h3>Haemoglobin</h3>
<p>Each haemoglobin molecule is a tetramer of two α-like and two β-like globin chains, each carrying one haem group (protoporphyrin IX with ferrous iron). The α-globin cluster is on chromosome 16 (two α genes per chromosome, so four in total) and the β-globin cluster is on chromosome 11.</p>
<table class="t"><thead><tr><th>Haemoglobin</th><th>Chains</th><th>Normal adult level</th></tr></thead><tbody>
<tr><td>HbA</td><td>α<sub>2</sub>β<sub>2</sub></td><td>About 97%</td></tr>
<tr><td>HbA<sub>2</sub></td><td>α<sub>2</sub>δ<sub>2</sub></td><td>2.2% to 3.5%</td></tr>
<tr><td>HbF</td><td>α<sub>2</sub>γ<sub>2</sub></td><td>Under 1%; 60% to 90% at birth, falling to adult levels by about 1 year</td></tr>
<tr><td>Gower 1, Gower 2, Portland</td><td>ζ<sub>2</sub>ε<sub>2</sub>, α<sub>2</sub>ε<sub>2</sub>, ζ<sub>2</sub>γ<sub>2</sub></td><td>Embryonic only</td></tr>
</tbody></table>
<h3>Oxygen delivery</h3>
<p>The oxygen dissociation curve is sigmoid because binding is cooperative. The P<sub>50</sub> (oxygen tension at 50% saturation) is about 26.6 mmHg (3.5 kPa) in adult blood. The curve shifts right, releasing more oxygen to tissues, with acidosis (the Bohr effect), raised CO<sub>2</sub>, fever and raised 2,3-bisphosphoglycerate (2,3-BPG). HbF binds 2,3-BPG poorly, so fetal blood has a left-shifted curve (P<sub>50</sub> about 19 mmHg), which favours oxygen transfer across the placenta. Try the interactive curve in the Animations section.</p>
<h3>Red cell metabolism</h3>
<ul>
<li><b>Glycolysis (Embden–Meyerhof pathway):</b> about 90% of glucose. Produces ATP for the cation pumps and membrane, and NADH for cytochrome b5 reductase, which keeps haem iron in the ferrous state. Pyruvate kinase deficiency is the commonest defect here.</li>
<li><b>Hexose monophosphate shunt:</b> about 10% of glucose. G6PD produces NADPH, which regenerates reduced glutathione to protect against oxidant damage.</li>
<li><b>Rapoport–Luebering shunt:</b> makes 2,3-BPG, which lowers oxygen affinity.</li>
</ul>
<h3>Membrane and lifespan</h3>
<p>The membrane skeleton is a spectrin lattice tied to the lipid bilayer vertically (via ankyrin, band 3 and protein 4.2) and horizontally (via protein 4.1, actin and adducin). Vertical defects cause hereditary spherocytosis; horizontal defects cause elliptocytosis. Red cells survive about 120 days and are removed mainly by splenic and hepatic macrophages. Haem is converted to biliverdin and then unconjugated bilirubin, and the iron is recycled through ferroportin under the control of hepcidin.</p>
`,
  points: [
    "Proerythroblast → basophilic → polychromatic → orthochromatic erythroblast → reticulocyte → red cell",
    "The polychromatic erythroblast is the last stage that divides",
    "One proerythroblast yields about 16 red cells over 5 to 7 days",
    "HbA about 97%, HbA2 2.2–3.5%, HbF under 1% in adults",
    "P50 about 26.6 mmHg; right shift with acidosis, CO2, fever and 2,3-BPG",
    "Glycolysis gives ATP and NADH; the HMP shunt gives NADPH via G6PD",
    "Red cell lifespan about 120 days"
  ]
},
{
  id: "granulopoiesis",
  title: "Granulocytes: neutrophils, eosinophils, basophils",
  minutes: 14,
  sources: ["bc", "dl", "hof"],
  video: "granulopoiesis neutrophil maturation myeloblast promyelocyte myelocyte",
  body: `
<p>Granulopoiesis moves from a mitotic pool (myeloblast, promyelocyte, myelocyte) to a maturation and storage pool (metamyelocyte, band, segmented neutrophil). The myelocyte is the last stage that divides. Transit from myeloblast to release takes about 10 to 14 days, and the marrow holds a reserve of neutrophils several times larger than the circulating pool.</p>
<h3>Neutrophil maturation</h3>
<table class="t"><thead><tr><th>Stage</th><th>Size</th><th>Key features</th></tr></thead><tbody>
<tr><td>Myeloblast</td><td>12–20 µm</td><td>High nuclear to cytoplasmic ratio, fine open chromatin, 2–5 nucleoli. Agranular or a few azurophilic granules (WHO counts both as blasts)</td></tr>
<tr><td>Promyelocyte</td><td>15–25 µm (the largest stage)</td><td>Many primary (azurophilic) granules, which contain MPO. Nucleus often eccentric with a visible nucleolus and a pale perinuclear Golgi zone (hof)</td></tr>
<tr><td>Myelocyte</td><td>10–18 µm</td><td>Secondary (specific) granules appear, giving a pinkish-lilac cytoplasm. Round or oval nucleus, condensed chromatin, no nucleoli</td></tr>
<tr><td>Metamyelocyte</td><td>10–15 µm</td><td>Nucleus indented, kidney-shaped, indentation less than half its width. No longer divides</td></tr>
<tr><td>Band (stab) form</td><td>10–14 µm</td><td>Nucleus U- or C-shaped with roughly parallel sides and no true filament</td></tr>
<tr><td>Segmented neutrophil</td><td>12–15 µm</td><td>2 to 5 lobes joined by thin chromatin filaments. More than 5 lobes, or over 5% of cells with 5 lobes, is hypersegmentation</td></tr>
</tbody></table>
<p>A female "drumstick" (the inactive X chromosome) is seen on a small proportion of neutrophils in women.</p>
<h3>Neutrophil granules</h3>
<ul>
<li><b>Primary (azurophilic):</b> myeloperoxidase, neutrophil elastase, cathepsin G, defensins, proteinase 3, lysozyme.</li>
<li><b>Secondary (specific):</b> lactoferrin, lysozyme, collagenase, haptocorrin (vitamin B<sub>12</sub> binding protein), cytochrome b<sub>558</sub>.</li>
<li><b>Tertiary:</b> gelatinase (MMP-9).</li>
<li><b>Secretory vesicles:</b> membrane receptors such as CD11b/CD18 that move to the surface on activation.</li>
</ul>
<h3>Neutrophil kinetics and function</h3>
<p>Released neutrophils split roughly equally between a circulating pool and a marginated pool along vessel walls; adrenaline and exercise shift marginated cells into the count within minutes. Blood half-life is about 6 to 7 hours, after which they enter tissues and die there within a day or two.</p>
<ol>
<li><b>Rolling:</b> selectins (L-selectin on the neutrophil, E- and P-selectin on endothelium).</li>
<li><b>Firm adhesion:</b> β2 integrins (CD11/CD18) bind ICAM-1. Absent in leucocyte adhesion deficiency type 1.</li>
<li><b>Chemotaxis:</b> towards C5a, IL-8 (CXCL8), leukotriene B<sub>4</sub> and bacterial formyl peptides.</li>
<li><b>Phagocytosis:</b> enhanced by opsonins, IgG (via Fc receptors) and C3b.</li>
<li><b>Killing:</b> NADPH oxidase generates superoxide and hydrogen peroxide (the respiratory burst), and MPO turns hydrogen peroxide into hypochlorous acid. NADPH oxidase is defective in chronic granulomatous disease. Neutrophils can also release extracellular traps (NETs).</li>
</ol>
<h3>Eosinophils</h3>
<p>12–17 µm, usually a bilobed nucleus, cytoplasm packed with large orange-red granules containing major basic protein, eosinophil cationic protein, eosinophil peroxidase and eosinophil-derived neurotoxin. Charcot–Leyden crystals are made of galectin-10. Production depends on IL-5. Counts are highest at night and fall after corticosteroids. They defend against helminths and drive allergic inflammation.</p>
<h3>Basophils</h3>
<p>10–14 µm, the least common blood leucocyte. Large dark purple-black granules often hide the nucleus. Granules contain histamine and heparin and are water-soluble, so they can wash out during staining and leave the cell looking empty. Basophils carry the high-affinity IgE receptor (FcεRI) and express CD123 and CD203c on flow cytometry, but not CD117, which separates them from mast cells. A raised basophil count is an important clue to chronic myeloid leukaemia.</p>
`,
  points: [
    "Myeloblast → promyelocyte → myelocyte → metamyelocyte → band → segmented neutrophil",
    "The myelocyte is the last dividing stage; secondary granules first appear here",
    "Primary granules: MPO, elastase. Secondary granules: lactoferrin, haptocorrin",
    "Neutrophil blood half-life about 6 to 7 hours; circulating and marginated pools are about equal",
    "NADPH oxidase defect = chronic granulomatous disease; CD18 defect = LAD type 1",
    "Eosinophils depend on IL-5; basophils are CD123+ CD203c+ and CD117−"
  ]
},
{
  id: "monocytes-lymphocytes",
  title: "Monocytes, macrophages and lymphocytes",
  minutes: 12,
  sources: ["bc", "hof", "hp"],
  video: "monocyte lymphocyte morphology peripheral blood smear",
  body: `
<h3>Monocytes and macrophages</h3>
<p>Monocytes are the largest normal leucocytes in blood at 15–20 µm. The nucleus is folded, lobulated or kidney-shaped with a lacy, delicate chromatin pattern. The cytoplasm is grey-blue with a ground-glass look, fine azurophilic granules and often vacuoles. They circulate for 1 to 3 days before entering tissues.</p>
<p>Immunophenotype: CD14, CD64, CD11b, CD33 (bright), CD36, HLA-DR. In tissue, monocyte-derived and resident macrophages include Kupffer cells (liver), alveolar macrophages, splenic red pulp macrophages, microglia and osteoclasts (formed by fusion). In the marrow, macrophages hold storage iron, which is graded on a Perls stain.</p>
<h3>Lymphocytes</h3>
<ul>
<li><b>Small lymphocyte:</b> 7–10 µm, round nucleus with dense clumped chromatin, thin rim of pale blue cytoplasm.</li>
<li><b>Large lymphocyte:</b> 12–16 µm, more abundant cytoplasm.</li>
<li><b>Large granular lymphocyte (LGL):</b> abundant pale cytoplasm with a few coarse azurophilic granules. These are NK cells or cytotoxic CD8+ T cells and make up 10% to 15% of blood lymphocytes.</li>
</ul>
<table class="t"><thead><tr><th>Subset</th><th>Share of blood lymphocytes</th><th>Markers</th></tr></thead><tbody>
<tr><td>T cells</td><td>About 60% to 80%</td><td>CD2, CD3, CD5, CD7; CD4 helper and CD8 cytotoxic (CD4:CD8 about 2:1)</td></tr>
<tr><td>B cells</td><td>About 10% to 20%</td><td>CD19, CD20, CD22, CD79a, surface immunoglobulin with κ or λ light chain</td></tr>
<tr><td>NK cells</td><td>About 10% to 15%</td><td>CD16, CD56, CD3 negative</td></tr>
</tbody></table>
<p>Young children have a higher lymphocyte count than adults, so a lymphocyte count that would be raised in an adult can be normal at age 2. Reactive lymphocytes (in viral infections) are larger, with abundant cytoplasm that is darker blue at the edge and scalloped around neighbouring red cells.</p>
<h3>Plasma cells</h3>
<p>The end stage of B cell differentiation. Oval cell with an eccentric nucleus, coarse "clock-face" chromatin, deeply basophilic cytoplasm and a pale perinuclear Golgi zone (hof). Normal marrow plasma cells are up to about 3% to 3.5% of nucleated cells, are polytypic and express CD38 (bright), CD138, CD19 and CD45, without CD56. Loss of CD19 and gain of CD56 point to a neoplastic population, which Module 3 covers.</p>
<h3>Hematogones</h3>
<p>Normal B cell precursors in the marrow. They look like small to medium blasts with scant cytoplasm and smooth chromatin, and are prominent in children, in regenerating marrow after chemotherapy and after transplant. On flow cytometry they show an orderly maturation pattern (CD34 and CD10 in early cells, then CD20 rising), unlike the arrested, uniform pattern of B lymphoblastic leukaemia.</p>
`,
  points: [
    "Monocyte: largest blood leucocyte, folded nucleus, lacy chromatin, grey-blue vacuolated cytoplasm; CD14 and CD64",
    "Blood lymphocytes: T 60–80%, B 10–20%, NK 10–15%; CD4:CD8 about 2:1",
    "LGLs are NK or cytotoxic T cells with azurophilic granules",
    "Plasma cells: eccentric nucleus, clock-face chromatin, hof; normal is CD19+ CD56−, up to about 3%",
    "Hematogones show orderly maturation on flow, unlike B-ALL"
  ]
},
{
  id: "megakaryopoiesis",
  title: "Megakaryocytes and platelets",
  minutes: 10,
  sources: ["bmp", "hof", "dl"],
  video: "megakaryopoiesis platelet production proplatelet",
  body: `
<p>Megakaryocytes develop from the MEP (or directly from megakaryocyte-biased stem cells) under the control of thrombopoietin through its receptor MPL. Instead of dividing, the cell replicates its DNA repeatedly without cytokinesis (endomitosis), reaching 8N to 64N, most often 16N. The result is the largest cell in the marrow, 50–100 µm or more, with a single lobulated nucleus.</p>
<h3>Stages</h3>
<ul>
<li><b>Megakaryoblast:</b> hard to recognise on morphology; may show cytoplasmic blebs. Identified by CD41, CD42b and CD61.</li>
<li><b>Promegakaryocyte:</b> larger, basophilic cytoplasm, nucleus beginning to lobulate.</li>
<li><b>Mature (granular) megakaryocyte:</b> abundant pink granular cytoplasm, highly lobulated nucleus. Fragments its cytoplasm into proplatelets that extend into marrow sinusoids.</li>
</ul>
<p>Each megakaryocyte releases about 1000 to 3000 platelets. Emperipolesis (other marrow cells passing through the megakaryocyte cytoplasm) is a normal finding. In a normal aspirate, megakaryocytes are not included in the differential count; instead they are assessed as present, reduced or increased, and their morphology is commented on. Small hypolobated or separated-lobe forms suggest dysplasia, which Module 3 covers.</p>
<h3>Platelets</h3>
<p>Platelets are anucleate discs about 1.5–3 µm across, surviving 7 to 10 days in the circulation. About one third of the platelet mass is pooled in the spleen, which is why splenomegaly lowers the count and splenectomy raises it.</p>
<table class="t"><thead><tr><th>Structure</th><th>Contents and role</th></tr></thead><tbody>
<tr><td>α granules</td><td>Fibrinogen, VWF, factor V, PF4, β-thromboglobulin, PDGF, P-selectin. Absent in grey platelet syndrome</td></tr>
<tr><td>Dense (δ) granules</td><td>ADP, ATP, serotonin, calcium. Reduced in storage pool disease, Hermansky–Pudlak and Chediak–Higashi syndromes</td></tr>
<tr><td>GPIb–IX–V</td><td>Binds VWF for adhesion at high shear. Defective in Bernard–Soulier syndrome</td></tr>
<tr><td>GPIIb/IIIa (αIIbβ3)</td><td>Binds fibrinogen for aggregation. Defective in Glanzmann thrombasthenia</td></tr>
<tr><td>GPVI and α2β1</td><td>Collagen receptors</td></tr>
<tr><td>Open canalicular and dense tubular systems</td><td>Surface-connected channels for secretion; calcium store</td></tr>
</tbody></table>
<p>Platelet function and the coagulation cascade are covered in full in Module 4.</p>
`,
  points: [
    "TPO acts via MPL; megakaryocytes undergo endomitosis to 8N–64N, usually 16N",
    "The largest marrow cell, 50–100 µm, with a single lobulated nucleus",
    "Each megakaryocyte releases about 1000–3000 platelets",
    "Platelets live 7–10 days; about one third are pooled in the spleen",
    "α granules: fibrinogen, VWF, PF4. Dense granules: ADP, serotonin, calcium",
    "GPIb defect = Bernard–Soulier; GPIIb/IIIa defect = Glanzmann"
  ]
},
{
  id: "bone-marrow",
  title: "Bone marrow structure and examination",
  minutes: 15,
  sources: ["bmp", "bmd", "bmm", "dl"],
  video: "bone marrow aspirate trephine biopsy procedure interpretation",
  body: `
<h3>Structure</h3>
<p>Haematopoietic tissue fills the spaces between bony trabeculae, supported by a stromal network of reticulin fibres, adipocytes, fibroblastic reticular cells, macrophages and a rich sinusoidal circulation. In a trephine section, the different lineages have typical locations:</p>
<ul>
<li><b>Granulocyte precursors</b> mature from the paratrabecular and perivascular regions towards the centre of the intertrabecular space.</li>
<li><b>Erythroid islands</b> sit centrally, often near sinusoids, around a macrophage.</li>
<li><b>Megakaryocytes</b> lie next to sinusoids, away from the bone surface. Paratrabecular megakaryocytes or tight clusters are abnormal.</li>
<li><b>Lymphoid aggregates</b> can be found in normal marrow, more often in older people. They are small, well-circumscribed and not paratrabecular.</li>
</ul>
<h3>Cellularity</h3>
<p>Cellularity is the proportion of the marrow space occupied by haematopoietic cells rather than fat. A rough guide is 100 minus the age in years: close to 100% at birth, about 50% to 70% in young adults and 30% to 40% or less in the elderly. Subcortical marrow is often hypocellular even in healthy people, so cellularity should be judged on intertrabecular spaces deeper in the core.</p>
<h3>Aspirate or trephine?</h3>
<table class="t"><thead><tr><th></th><th>Aspirate</th><th>Trephine biopsy</th></tr></thead><tbody>
<tr><td>Best for</td><td>Cell morphology, differential count, iron stores and ring sideroblasts, flow cytometry, cytogenetics, molecular tests</td><td>Cellularity, architecture, fibrosis, focal lesions (lymphoma, metastases, granulomas), immunohistochemistry</td></tr>
<tr><td>Limitations</td><td>Fails ("dry tap") with fibrosis or packed marrow; can be diluted with blood</td><td>Decalcification can damage DNA; results take days; cytology less fine</td></tr>
<tr><td>Quality check</td><td>Particles present on the films; count in the trails behind particles</td><td>Core at least 1.5–2 cm long (ICSH/BSH guidance), not just cortex and cartilage</td></tr>
</tbody></table>
<h3>Normal adult differential count</h3>
<p>Count at least 500 nucleated cells, ideally on two films. Typical adult ranges are below. Ranges differ between published series, so use your department's table where one exists.</p>
<table class="t num"><thead><tr><th>Cell</th><th>% of nucleated cells</th></tr></thead><tbody>
<tr><td>Blasts</td><td>0–3</td></tr>
<tr><td>Promyelocytes</td><td>2–8</td></tr>
<tr><td>Myelocytes</td><td>10–15</td></tr>
<tr><td>Metamyelocytes</td><td>10–15</td></tr>
<tr><td>Band and segmented neutrophils</td><td>25–40</td></tr>
<tr><td>Eosinophils and precursors</td><td>1–6</td></tr>
<tr><td>Basophils</td><td>0–1</td></tr>
<tr><td>Monocytes</td><td>0–3</td></tr>
<tr><td>Lymphocytes</td><td>5–20 (higher in children)</td></tr>
<tr><td>Plasma cells</td><td>0–3</td></tr>
<tr><td>Erythroblasts (all stages)</td><td>15–30</td></tr>
<tr><td>Myeloid to erythroid (M:E) ratio</td><td>About 2:1 to 4:1</td></tr>
</tbody></table>
<h3>Iron stain (Perls Prussian blue)</h3>
<p>Storage iron is assessed in macrophages within particles and graded (for example 0 to 6 in the Gale scale). Normal sideroblasts, with one to a few fine blue granules, make up about 20% to 50% of erythroblasts. A ring sideroblast has 5 or more granules covering at least one third of the nuclear circumference; ring sideroblasts are not seen in normal marrow.</p>
<h3>Reticulin</h3>
<p>Graded on a silver stain from MF-0 to MF-3 (European consensus, used by WHO). Normal marrow is MF-0 to MF-1: scattered linear reticulin without intersections, mainly around vessels.</p>
`,
  points: [
    "Cellularity rough guide: 100 minus age; ignore subcortical spaces",
    "Megakaryocytes near sinusoids; paratrabecular location or clusters are abnormal",
    "Aspirate: morphology, iron, flow, genetics. Trephine: cellularity, fibrosis, focal lesions",
    "Count at least 500 cells; M:E about 2:1 to 4:1; blasts 0–3%; plasma cells 0–3%",
    "Ring sideroblast: 5 or more granules covering one third of the nucleus or more",
    "Trephine core at least 1.5–2 cm; normal reticulin MF-0 to MF-1"
  ]
},
{
  id: "reference-values",
  title: "Reference values and physiological variation",
  minutes: 10,
  sources: ["dl", "lhp", "psh"],
  video: "complete blood count interpretation reference ranges",
  body: `
<p>Adult reference intervals for a full blood count (95% intervals, healthy adults; check your own laboratory's ranges, which depend on the analyser and population).</p>
<table class="t num"><thead><tr><th>Parameter</th><th>Men</th><th>Women</th></tr></thead><tbody>
<tr><td>Haemoglobin (g/L)</td><td>130–170</td><td>120–150</td></tr>
<tr><td>Red cell count (×10<sup>12</sup>/L)</td><td>4.5–5.5</td><td>3.8–4.8</td></tr>
<tr><td>Haematocrit (L/L)</td><td>0.40–0.50</td><td>0.36–0.46</td></tr>
<tr><td>MCV (fL)</td><td colspan="2">83–101</td></tr>
<tr><td>MCH (pg)</td><td colspan="2">27–32</td></tr>
<tr><td>MCHC (g/L)</td><td colspan="2">315–345</td></tr>
<tr><td>RDW-CV (%)</td><td colspan="2">11.6–14.0</td></tr>
<tr><td>Reticulocytes (×10<sup>9</sup>/L)</td><td colspan="2">50–100</td></tr>
<tr><td>White cells (×10<sup>9</sup>/L)</td><td colspan="2">4.0–10.0</td></tr>
<tr><td>Neutrophils (×10<sup>9</sup>/L)</td><td colspan="2">2.0–7.0</td></tr>
<tr><td>Lymphocytes (×10<sup>9</sup>/L)</td><td colspan="2">1.0–3.0</td></tr>
<tr><td>Monocytes (×10<sup>9</sup>/L)</td><td colspan="2">0.2–1.0</td></tr>
<tr><td>Eosinophils (×10<sup>9</sup>/L)</td><td colspan="2">0.02–0.5</td></tr>
<tr><td>Basophils (×10<sup>9</sup>/L)</td><td colspan="2">0.02–0.1</td></tr>
<tr><td>Platelets (×10<sup>9</sup>/L)</td><td colspan="2">150–410</td></tr>
</tbody></table>
<h3>Red cell indices</h3>
<p>MCV = Hct ÷ RBC; MCH = Hb ÷ RBC; MCHC = Hb ÷ Hct. An MCHC above about 365 g/L is rarely real outside hereditary spherocytosis and should make you look for a cold agglutinin, lipaemia or another artefact first. The workups section has a decision tree for this.</p>
<h3>Physiological variation</h3>
<ul>
<li><b>Newborn:</b> haemoglobin 140–220 g/L and MCV 100–120 fL at birth; white cells up to about 26 × 10<sup>9</sup>/L with neutrophilia and a few nucleated red cells in the first days.</li>
<li><b>Infancy:</b> physiological nadir of haemoglobin at about 8 to 12 weeks in term infants (about 95–110 g/L), earlier and lower in preterm infants. Lymphocytes predominate from about 2 weeks until 4 to 5 years.</li>
<li><b>Pregnancy:</b> plasma volume rises about 40% to 50% and red cell mass about 20% to 30%, so haemoglobin falls (anaemia is defined below 110 g/L). MCV rises slightly, neutrophils rise with a mild left shift, and gestational thrombocytopenia (usually above 70 × 10<sup>9</sup>/L) is common late in pregnancy.</li>
<li><b>Ethnicity:</b> people with the Duffy-null (ACKR1) genotype, common in people of African and Middle Eastern ancestry, often have neutrophil counts of 1.0–1.5 × 10<sup>9</sup>/L that are normal for them.</li>
<li><b>Altitude, smoking and exercise:</b> altitude and smoking raise haemoglobin; acute exercise and stress raise the neutrophil count by demargination.</li>
</ul>
<h3>Pre-analytical errors</h3>
<p>EDTA (K<sub>2</sub> or K<sub>3</sub>) is the anticoagulant for blood counts. Samples stored for more than about 24 hours at room temperature show red cell swelling (rising MCV and haematocrit), and films made after a few hours show storage artefacts such as crenated red cells and neutrophils with lobes that look separated. Clotted samples give falsely low platelets. These are tested in the case studies.</p>
`,
  points: [
    "Hb: men 130–170, women 120–150 g/L; MCV 83–101 fL; platelets 150–410 × 10⁹/L",
    "WBC 4.0–10.0; neutrophils 2.0–7.0; lymphocytes 1.0–3.0 × 10⁹/L",
    "MCHC above about 365 g/L: suspect cold agglutinin or lipaemia first",
    "Infant Hb nadir at 8–12 weeks; lymphocyte predominance until 4–5 years",
    "Pregnancy: plasma volume up 40–50%, anaemia if Hb under 110 g/L",
    "Duffy-null neutrophil counts of 1.0–1.5 × 10⁹/L can be normal"
  ]
}
];

/* Atlas: each cell has descriptive text plus parameters for the drawn illustration (cells.js). */
const CELLS = [
{ id:"proerythroblast", name:"Proerythroblast", lineage:"Erythroid", where:"Marrow", size:"15–20 µm", sizeUm:17,
  nucleus:"Large, round, fine chromatin, 1–2 nucleoli", cyto:"Deeply basophilic, may have a paler perinuclear zone and blebs", nc:"High",
  normal:"About 1% of marrow nucleated cells", mimic:"Myeloblast (less blue cytoplasm, no blebs); plasmablast",
  draw:{ r:8.5, cyto:"#3f56a6", nuc:{type:"round", r:6.3, dx:0.3}, chrom:"fine", nucleoli:2, blebs:true, halo:true } },
{ id:"basophilic-normoblast", name:"Basophilic erythroblast", lineage:"Erythroid", where:"Marrow", size:"12–16 µm", sizeUm:14,
  nucleus:"Round, coarser chromatin, no visible nucleolus", cyto:"Intense royal blue", nc:"High",
  normal:"1–4% of marrow cells", mimic:"Proerythroblast (has nucleoli); plasma cell (eccentric nucleus and hof)",
  draw:{ r:7, cyto:"#3a4fa0", nuc:{type:"round", r:4.9}, chrom:"coarse", halo:true } },
{ id:"polychromatic-normoblast", name:"Polychromatic erythroblast", lineage:"Erythroid", where:"Marrow", size:"10–12 µm", sizeUm:11,
  nucleus:"Round, chequerboard chromatin clumps", cyto:"Grey-lilac, haemoglobin mixing with RNA", nc:"Moderate",
  normal:"The most numerous erythroid stage, 10–20%", mimic:"Small lymphocyte (thin rim of sky-blue cytoplasm, no chequerboard)",
  draw:{ r:5.6, cyto:"#9f8db8", nuc:{type:"round", r:3.4}, chrom:"checker" } },
{ id:"orthochromatic-normoblast", name:"Orthochromatic erythroblast", lineage:"Erythroid", where:"Marrow; blood in neonates and stress", size:"8–10 µm", sizeUm:9,
  nucleus:"Small, dense, pyknotic, often eccentric", cyto:"Pink-orange, close to a mature red cell", nc:"Low",
  normal:"2–10% of marrow cells", mimic:"Lymphocyte; a red cell with a Howell–Jolly body",
  draw:{ r:4.6, cyto:"#d99aa0", nuc:{type:"round", r:2.1, dx:1.2, dy:-0.4}, chrom:"pyknotic" } },
{ id:"reticulocyte", name:"Reticulocyte (polychromatic red cell)", lineage:"Erythroid", where:"Blood and marrow", size:"8–9 µm", sizeUm:8.5,
  nucleus:"None", cyto:"Faintly blue-grey (polychromatic) on Romanowsky stain, no central pallor", nc:"None",
  normal:"0.5–2.5% of red cells; 50–100 × 10⁹/L", mimic:"Spherocyte (smaller, dense); target cell",
  draw:{ r:4.3, cyto:"#c39ab6", rbc:"poly" } },
{ id:"rbc", name:"Red cell (erythrocyte)", lineage:"Erythroid", where:"Blood", size:"7.2–7.9 µm", sizeUm:7.5,
  nucleus:"None", cyto:"Pink biconcave disc, central pallor about one third of the diameter", nc:"None",
  normal:"4.5–5.5 × 10¹²/L in men", mimic:"Use as a size ruler: a small lymphocyte is about the same size",
  draw:{ r:3.8, cyto:"#de8f95", rbc:"normal" } },
{ id:"myeloblast", name:"Myeloblast", lineage:"Granulocytic", where:"Marrow", size:"12–20 µm", sizeUm:15,
  nucleus:"Round or oval, fine open chromatin, 2–5 nucleoli", cyto:"Scant, moderately blue, agranular or a few azurophilic granules", nc:"Very high",
  normal:"0–3% of marrow cells; absent from blood", mimic:"Lymphoblast, hematogone, proerythroblast",
  draw:{ r:7.6, cyto:"#7d93cf", nuc:{type:"oval", r:5.9, sx:1.04, sy:0.96}, chrom:"fine", nucleoli:3, gran:{color:"#8e2c6e", n:4, s:0.25} } },
{ id:"promyelocyte", name:"Promyelocyte", lineage:"Granulocytic", where:"Marrow", size:"15–25 µm", sizeUm:20,
  nucleus:"Round or oval, eccentric, nucleolus often visible", cyto:"Basophilic with many coarse azurophilic (primary) granules and a pale Golgi zone", nc:"Moderate",
  normal:"2–8% of marrow cells", mimic:"Abnormal promyelocyte of APL (bilobed nucleus, Auer rods); myelocyte",
  draw:{ r:9.6, cyto:"#8a96cc", nuc:{type:"oval", r:5.6, dx:1.8, dy:0.4, sx:1.05, sy:0.92}, chrom:"fine", nucleoli:1, gran:{color:"#7b1f63", n:85, s:0.38, over:true}, hof:true } },
{ id:"myelocyte", name:"Neutrophil myelocyte", lineage:"Granulocytic", where:"Marrow", size:"10–18 µm", sizeUm:14,
  nucleus:"Round or oval, eccentric, condensed chromatin, no nucleolus", cyto:"Pinkish-lilac from specific granules; a pale Golgi zone", nc:"Moderate",
  normal:"10–15% of marrow cells", mimic:"Promyelocyte (nucleolus, coarse azurophilic granules)",
  draw:{ r:7.1, cyto:"#d9bfd6", nuc:{type:"oval", r:4.1, dx:1.6, dy:0.3, sx:1.1, sy:0.92}, chrom:"medium", gran:{color:"#b98cb4", n:140, s:0.16}, hof:true } },
{ id:"metamyelocyte", name:"Neutrophil metamyelocyte", lineage:"Granulocytic", where:"Marrow", size:"10–15 µm", sizeUm:12.5,
  nucleus:"Kidney-shaped, indentation less than half the nuclear width", cyto:"Pale pink with fine neutrophilic granules", nc:"Low to moderate",
  normal:"10–15% of marrow cells", mimic:"Monocyte (lacy chromatin, grey-blue cytoplasm); band form",
  draw:{ r:6.3, cyto:"#efd5df", nuc:{type:"kidney", r:3.7, indent:0.42, rot:-20}, chrom:"medium", gran:{color:"#c79bbd", n:120, s:0.14} } },
{ id:"band", name:"Band (stab) neutrophil", lineage:"Granulocytic", where:"Blood and marrow", size:"10–14 µm", sizeUm:12,
  nucleus:"U- or C-shaped, parallel sides, no filament", cyto:"Pale pink with fine granules", nc:"Low",
  normal:"Under 5% of blood leucocytes (labs differ in how they define bands)", mimic:"Segmented neutrophil with an overlapping lobe",
  draw:{ r:6.1, cyto:"#f0d6e0", nuc:{type:"band", w:1.6, arc:3.0}, chrom:"clumped", gran:{color:"#c79bbd", n:110, s:0.14} } },
{ id:"neutrophil", name:"Segmented neutrophil", lineage:"Granulocytic", where:"Blood", size:"12–15 µm", sizeUm:13,
  nucleus:"2–5 lobes joined by thin filaments, dense clumped chromatin", cyto:"Pale pink with fine lilac granules", nc:"Low",
  normal:"2.0–7.0 × 10⁹/L in blood (40–75% of leucocytes)", mimic:"Band form; hypersegmented neutrophil (6+ lobes)",
  draw:{ r:6.4, cyto:"#f1d8e2", nuc:{type:"lobes", n:3, lr:1.95, spread:2.7}, chrom:"clumped", gran:{color:"#c79bbd", n:120, s:0.13} } },
{ id:"eosinophil", name:"Eosinophil", lineage:"Granulocytic", where:"Blood and marrow", size:"12–17 µm", sizeUm:14,
  nucleus:"Usually bilobed", cyto:"Packed with large refractile orange-red granules", nc:"Low",
  normal:"0.02–0.5 × 10⁹/L in blood", mimic:"Neutrophil with toxic granulation (granules smaller, purple)",
  draw:{ r:7, cyto:"#f3cdb8", nuc:{type:"lobes", n:2, lr:1.9, spread:2.6}, chrom:"clumped", gran:{color:"#e46a3a", n:120, s:0.42} } },
{ id:"basophil", name:"Basophil", lineage:"Granulocytic", where:"Blood and marrow", size:"10–14 µm", sizeUm:12,
  nucleus:"Lobulated, often hidden by granules", cyto:"Large dark purple-black granules, overlying the nucleus", nc:"Low",
  normal:"0.02–0.1 × 10⁹/L in blood", mimic:"Mast cell (round nucleus, larger, CD117+); toxic neutrophil",
  draw:{ r:6.1, cyto:"#d8c3d9", nuc:{type:"lobes", n:2, lr:1.7, spread:2.0}, chrom:"clumped", gran:{color:"#2e1442", n:70, s:0.48, over:true} } },
{ id:"monocyte", name:"Monocyte", lineage:"Monocytic", where:"Blood", size:"15–20 µm", sizeUm:17,
  nucleus:"Folded, kidney-shaped or lobulated, lacy chromatin", cyto:"Grey-blue ground glass, fine azurophilic granules, vacuoles", nc:"Moderate",
  normal:"0.2–1.0 × 10⁹/L in blood", mimic:"Reactive lymphocyte; metamyelocyte; promonocyte",
  draw:{ r:8.4, cyto:"#b4b6d6", nuc:{type:"kidney", r:4.9, indent:0.5, rot:30, wobble:0.12}, chrom:"lacy", gran:{color:"#a35a92", n:60, s:0.1}, vac:4 } },
{ id:"macrophage", name:"Macrophage", lineage:"Monocytic", where:"Marrow and tissues", size:"20–30 µm or more", sizeUm:26,
  nucleus:"Oval or kidney, open chromatin", cyto:"Abundant, pale, with vacuoles and ingested debris; holds storage iron", nc:"Low",
  normal:"Scattered in particles; centre of erythroblastic islands", mimic:"Osteoclast; tumour cells",
  draw:{ r:12.5, cyto:"#c6c0d8", nuc:{type:"kidney", r:4.4, indent:0.3, dx:-3.5, dy:1, rot:60}, chrom:"lacy", vac:10, debris:6, irregular:0.1 } },
{ id:"small-lymphocyte", name:"Small lymphocyte", lineage:"Lymphoid", where:"Blood and marrow", size:"7–10 µm", sizeUm:8.5,
  nucleus:"Round, dense clumped chromatin, nucleolus not visible", cyto:"Thin rim of pale sky-blue cytoplasm", nc:"Very high",
  normal:"1.0–3.0 × 10⁹/L in adult blood", mimic:"Orthochromatic erythroblast; CLL cell (smear cells)",
  draw:{ r:4.4, cyto:"#8fb2e3", nuc:{type:"round", r:3.65, dx:0.3}, chrom:"clumped" } },
{ id:"lgl", name:"Large granular lymphocyte", lineage:"Lymphoid", where:"Blood", size:"12–16 µm", sizeUm:13,
  nucleus:"Round or slightly indented, condensed chromatin", cyto:"Abundant pale blue with a few coarse azurophilic granules", nc:"Low",
  normal:"10–15% of blood lymphocytes (NK and cytotoxic T cells)", mimic:"Monocyte; reactive lymphocyte",
  draw:{ r:6.6, cyto:"#a9c4e8", nuc:{type:"round", r:3.4, dx:-1.4, dy:0.5}, chrom:"clumped", gran:{color:"#8e2c6e", n:10, s:0.38} } },
{ id:"plasma-cell", name:"Plasma cell", lineage:"Lymphoid", where:"Marrow", size:"9–20 µm", sizeUm:13,
  nucleus:"Eccentric, round, coarse clock-face chromatin", cyto:"Deep blue with a pale perinuclear Golgi zone (hof)", nc:"Low",
  normal:"0–3% of marrow cells", mimic:"Osteoblast (larger, hof away from the nucleus); basophilic erythroblast",
  draw:{ r:6.4, sx:1.18, sy:0.88, cyto:"#2f4a9a", nuc:{type:"round", r:3.3, dx:3.3, dy:0.2}, chrom:"clockface", hof:true, hofStrong:true } },
{ id:"hematogone", name:"Hematogone (B cell precursor)", lineage:"Lymphoid", where:"Marrow", size:"10–20 µm", sizeUm:11,
  nucleus:"Round, smooth homogeneous chromatin, inconspicuous nucleolus", cyto:"Very scant, pale", nc:"Very high",
  normal:"Prominent in children and regenerating marrow", mimic:"Lymphoblast of B-ALL; flow cytometry separates them",
  draw:{ r:5.4, cyto:"#97afd9", nuc:{type:"round", r:4.75}, chrom:"smooth" } },
{ id:"megakaryocyte", name:"Megakaryocyte", lineage:"Megakaryocytic", where:"Marrow", size:"50–100 µm or more", sizeUm:70,
  nucleus:"Single, highly lobulated (polyploid)", cyto:"Abundant, pink-lilac, finely granular; budding platelets at the edge", nc:"Low",
  normal:"Several per particle at low power; not included in the differential", mimic:"Osteoclast (separate round nuclei)",
  draw:{ r:13.2, cyto:"#e1c3dc", nuc:{type:"mega", n:16, lr:2.6, spread:5.2}, chrom:"medium", gran:{color:"#a978a8", n:420, s:0.12}, plts:true, irregular:0.07, scale:0.18 } },
{ id:"platelet", name:"Platelets", lineage:"Megakaryocytic", where:"Blood", size:"1.5–3 µm", sizeUm:2.5,
  nucleus:"None", cyto:"Small lilac fragments with central purple granules (granulomere)", nc:"None",
  normal:"150–410 × 10⁹/L", mimic:"Platelet clumps (EDTA artefact); giant platelets; stain debris",
  draw:{ plateletField:true } },
{ id:"osteoblast", name:"Osteoblast", lineage:"Stromal", where:"Marrow, along bone; often in clusters", size:"20–50 µm", sizeUm:30,
  nucleus:"Eccentric, round, single nucleolus, partly extruded at times", cyto:"Abundant blue, pale zone separated from the nucleus", nc:"Low",
  normal:"Clusters in children's aspirates", mimic:"Plasma cell (smaller, hof next to nucleus); metastatic carcinoma",
  draw:{ r:12, sx:1.25, sy:0.82, cyto:"#5d73bd", nuc:{type:"round", r:4.4, dx:6.2}, chrom:"medium", nucleoli:1, hof:true, hofFar:true, scale:0.5 } },
{ id:"osteoclast", name:"Osteoclast", lineage:"Stromal", where:"Marrow, on bone surface", size:"Over 100 µm", sizeUm:110,
  nucleus:"Many separate round nuclei, each with a nucleolus", cyto:"Abundant, granular, pale pink-purple", nc:"Low",
  normal:"Rare in adult aspirates; more in children", mimic:"Megakaryocyte (one lobulated nucleus, not separate)",
  draw:{ r:13.6, cyto:"#d5b5d0", nuc:{type:"multi", n:10, r:1.9, spread:7.5}, chrom:"medium", nucleoli:1, gran:{color:"#a17aa8", n:300, s:0.12}, irregular:0.12, scale:0.12 } },
{ id:"mast-cell", name:"Mast cell", lineage:"Other", where:"Marrow, often near trabeculae or vessels", size:"15–25 µm", sizeUm:18,
  nucleus:"Round or oval, central, often hidden", cyto:"Densely packed purple-black granules; oval or spindle shape", nc:"Low",
  normal:"Occasional; increased in lymphoplasmacytic lymphoma and aplastic anaemia", mimic:"Basophil (lobulated nucleus, smaller); systemic mastocytosis (spindle, hypogranular)",
  draw:{ r:8.4, sx:1.2, sy:0.86, cyto:"#c9b4d4", nuc:{type:"oval", r:3.6}, chrom:"medium", gran:{color:"#3b1250", n:210, s:0.42, over:true} } }
];

/* Fact flashcards (the atlas also generates image cards). */
const FACTS = [
  ["Which globin genes are on chromosome 16?", "The α-globin cluster (ζ and two α genes per chromosome). The β cluster (ε, γ, δ, β) is on chromosome 11."],
  ["What is the last dividing stage of the erythroid lineage?", "The polychromatic (intermediate) erythroblast."],
  ["What is the last dividing stage of the neutrophil lineage?", "The myelocyte."],
  ["Where are secondary (specific) neutrophil granules first seen?", "In the myelocyte."],
  ["Name four contents of neutrophil primary granules.", "Myeloperoxidase, neutrophil elastase, cathepsin G, defensins (also proteinase 3 and lysozyme)."],
  ["What is the normal adult HbA2 level?", "2.2% to 3.5%."],
  ["What is the normal adult P50?", "About 26.6 mmHg (3.5 kPa)."],
  ["Name four causes of a right-shifted oxygen dissociation curve.", "Acidosis, raised CO2, fever, raised 2,3-BPG."],
  ["Why is the fetal dissociation curve left-shifted?", "HbF (α2γ2) binds 2,3-BPG poorly, so its oxygen affinity is higher; P50 about 19 mmHg."],
  ["Which enzyme makes NADPH in the red cell?", "Glucose-6-phosphate dehydrogenase, in the hexose monophosphate shunt."],
  ["Where is erythropoietin mainly produced?", "Peritubular interstitial cells of the renal cortex (about 90%); the rest in the liver."],
  ["How is thrombopoietin regulated?", "It is made at a constant rate by the liver and cleared by binding MPL on platelets and megakaryocytes, so the free level falls as platelet mass rises."],
  ["What is the phenotype of the haematopoietic stem cell?", "CD34+, CD38−, CD90+, CD45RA−, lineage-negative."],
  ["Which axis keeps stem cells in the marrow, and which drug blocks it?", "CXCL12 (SDF-1) binding CXCR4. Plerixafor blocks CXCR4 to mobilise stem cells."],
  ["What is the blood half-life of a neutrophil?", "About 6 to 7 hours."],
  ["Which defect causes chronic granulomatous disease?", "Defective NADPH oxidase, so no respiratory burst."],
  ["Which defect causes leucocyte adhesion deficiency type 1?", "Deficiency of CD18, the common β2 integrin chain."],
  ["Which cytokine drives eosinophil production?", "IL-5."],
  ["How do you tell a basophil from a mast cell by flow cytometry?", "Basophils are CD123+ CD203c+ and CD117−; mast cells are CD117 (bright)+ and tryptase+."],
  ["What is the CD4:CD8 ratio in normal blood?", "About 2:1."],
  ["What phenotype distinguishes normal plasma cells from myeloma cells?", "Normal plasma cells are CD19+ and CD56−. Myeloma cells are usually CD19− and often CD56+, and are light-chain restricted."],
  ["What is a ring sideroblast?", "An erythroblast with 5 or more siderotic granules covering at least one third of the nuclear circumference."],
  ["What proportion of normal erythroblasts are sideroblasts?", "About 20% to 50%."],
  ["What is the normal adult M:E ratio?", "About 2:1 to 4:1."],
  ["How many cells should a marrow differential count?", "At least 500 nucleated cells, ideally from two films."],
  ["What is the minimum adequate trephine length?", "At least 1.5–2 cm of marrow (ICSH and BSH guidance)."],
  ["Where do normal megakaryocytes lie in a trephine section?", "Next to sinusoids in the intertrabecular space, away from bone. Paratrabecular megakaryocytes or tight clusters are abnormal."],
  ["What ploidy do most megakaryocytes reach?", "16N (range 8N to 64N), by endomitosis."],
  ["How long do platelets survive?", "7 to 10 days."],
  ["What fraction of platelets is pooled in the spleen?", "About one third."],
  ["Which glycoprotein is defective in Glanzmann thrombasthenia?", "GPIIb/IIIa (αIIbβ3), the fibrinogen receptor."],
  ["Which glycoprotein is defective in Bernard–Soulier syndrome?", "GPIb–IX–V, the VWF receptor."],
  ["What do dense granules contain?", "ADP, ATP, serotonin and calcium."],
  ["What is the haemoglobin cut-off for anaemia in pregnancy?", "110 g/L (WHO)."],
  ["When is the physiological haemoglobin nadir in term infants?", "At about 8 to 12 weeks, around 95–110 g/L."],
  ["What neutrophil count can be normal in Duffy-null individuals?", "1.0–1.5 × 10⁹/L."],
  ["What is the formula for MCHC?", "MCHC = Hb ÷ Hct. Normal 315–345 g/L."],
  ["How do you correct a white cell count for nucleated red cells?", "Corrected WBC = measured WBC × 100 ÷ (100 + NRBC per 100 WBC). Most modern analysers do this automatically."],
  ["What causes EDTA-dependent pseudothrombocytopenia?", "Antibodies against a GPIIb/IIIa epitope exposed by calcium chelation, which clump platelets in vitro. Repeat in citrate or examine a film."],
  ["What is the reticulin grade of normal marrow?", "MF-0 to MF-1."]
];

const QUIZ = [
{ q:"A 30-year-old has a marrow aspirate with no particles, few myeloid precursors, many segmented neutrophils and an M:E ratio of 12:1. What is the most likely explanation?",
  a:["Chronic myeloid leukaemia","Haemodilution of the aspirate with peripheral blood","Pure red cell aplasia","Reactive neutrophilia"], c:1,
  e:"An aspirate without particles whose differential looks like blood (mature neutrophils and lymphocytes, few precursors) is haemodiluted. Interpret cellularity on the trephine and repeat the aspirate if needed." },
{ q:"Which stage of neutrophil maturation is the last one able to divide?", a:["Promyelocyte","Myelocyte","Metamyelocyte","Band form"], c:1,
  e:"Myeloblast, promyelocyte and myelocyte form the mitotic pool. From the metamyelocyte onwards, the cells only mature." },
{ q:"Which finding best distinguishes an osteoclast from a megakaryocyte on an aspirate?", a:["Cell size","Granular cytoplasm","Multiple separate nuclei rather than one lobulated nucleus","Presence of nucleoli"], c:2,
  e:"Both are giant cells with granular cytoplasm. The osteoclast has many separate round nuclei, each with a nucleolus; the megakaryocyte has one lobulated polyploid nucleus." },
{ q:"Which of the following shifts the oxygen dissociation curve to the left?", a:["Fever","Acidosis","Raised 2,3-BPG","High HbF"], c:3,
  e:"HbF binds 2,3-BPG poorly, which raises oxygen affinity and lowers P50 to about 19 mmHg. The other three shift the curve to the right." },
{ q:"In a normal adult, HbA2 accounts for about:", a:["Under 1%","2.2% to 3.5%","5% to 8%","10% to 15%"], c:1,
  e:"HbA2 (α2δ2) is 2.2% to 3.5%. A raised HbA2 is the key screening finding in β-thalassaemia trait, which Module 2 covers." },
{ q:"A ring sideroblast is defined as an erythroblast with:", a:["Any siderotic granule","At least 3 granules anywhere in the cytoplasm","At least 5 granules covering one third or more of the nuclear rim","Granules covering the entire nuclear rim"], c:2,
  e:"WHO and ICSH define a ring sideroblast as having 5 or more granules covering at least one third of the nuclear circumference." },
{ q:"Which immunophenotype describes a normal haematopoietic stem cell?", a:["CD34+ CD38+ CD45RA+","CD34+ CD38− CD90+ CD45RA−","CD34− CD117+ CD38+","CD34+ CD10+ CD19+"], c:1,
  e:"The most primitive cells are CD34+ CD38− CD90+ CD45RA− and lineage-negative. CD34+ CD10+ CD19+ describes an early B cell precursor (hematogone stage I)." },
{ q:"A healthy 2-year-old has a lymphocyte count of 6.5 × 10⁹/L and a normal film. What is the best interpretation?", a:["Chronic lymphocytic leukaemia","Acute lymphoblastic leukaemia until proven otherwise","Normal for age","Pertussis"], c:2,
  e:"Lymphocytes predominate in young children, and counts up to about 9–10 × 10⁹/L are within the reference range at age 2. Always use age-specific ranges." },
{ q:"Which marker pair best separates basophils from mast cells on flow cytometry?", a:["CD117 and tryptase are positive in basophils","CD123+ CD203c+ CD117− in basophils","CD34 is positive in mast cells","CD14 is positive in basophils"], c:1,
  e:"Basophils are CD123+ CD203c+ and CD117−. Mast cells are CD117 bright and tryptase positive." },
{ q:"Where are megakaryocytes normally located in a trephine biopsy?", a:["Paratrabecular, along the bone","In tight clusters","Next to sinusoids in the intertrabecular space","In lymphoid aggregates"], c:2,
  e:"Megakaryocytes release proplatelets into sinusoids, so they sit next to them. Paratrabecular megakaryocytes and tight clusters are features of myeloproliferative neoplasms." },
{ q:"Which enzyme deficiency leaves the red cell vulnerable to oxidant damage?", a:["Pyruvate kinase","Glucose-6-phosphate dehydrogenase","Cytochrome b5 reductase","Hexokinase"], c:1,
  e:"G6PD produces NADPH in the hexose monophosphate shunt, which keeps glutathione reduced. Cytochrome b5 reductase deficiency causes methaemoglobinaemia instead." },
{ q:"A count of 40 × 10⁹/L platelets is reported on an EDTA sample from a well patient with no bleeding. The analyser flags platelet clumps. What is the best next step?", a:["Platelet transfusion","Bone marrow aspirate","Examine the film and repeat the count on a citrate sample","Start corticosteroids"], c:2,
  e:"This suggests EDTA-dependent pseudothrombocytopenia. Confirm clumps on the film and recount in citrate (correcting for dilution) or from a fingerprick sample." },
{ q:"Which growth factor is made at a constant rate and regulated mainly by its clearance?", a:["Erythropoietin","G-CSF","Thrombopoietin","IL-5"], c:2,
  e:"The liver makes TPO constitutively. Platelets and megakaryocytes bind and remove it through MPL, so free TPO falls as platelet mass rises." },
{ q:"What is the main cause of the fall in haemoglobin during normal pregnancy?", a:["Iron deficiency","Plasma volume expanding more than red cell mass","Haemolysis","Marrow suppression"], c:1,
  e:"Plasma volume rises by 40–50% and red cell mass by only 20–30%, giving a dilutional fall. Iron deficiency is common too, but it is not the physiological mechanism." },
{ q:"An analyser reports MCHC 390 g/L, MCV 112 fL and a low red cell count, and the sample was taken on a cold morning. What should you do first?", a:["Report hereditary spherocytosis","Warm the sample to 37°C and repeat","Request vitamin B12 and folate","Request haemoglobin electrophoresis"], c:1,
  e:"Red cell agglutinates are counted as single large cells, so the red cell count falls and MCV and MCHC rise falsely. Warming disperses a cold agglutinin." },
{ q:"Which feature of the plasma cell is described as 'clock-face'?", a:["The pattern of cytoplasmic granules","The chromatin arranged in coarse clumps around the nucleus","The shape of the Golgi zone","The arrangement of nucleoli"], c:1,
  e:"Clumps of heterochromatin around the nuclear rim resemble the numbers on a clock face." },
{ q:"Normal marrow cellularity in a 70-year-old is closest to:", a:["10%","30%","60%","90%"], c:1,
  e:"Using 100 minus age as a rough guide gives about 30%. Ignore the subcortical spaces, which are often hypocellular." },
{ q:"Which of these is a normal finding in a bone marrow aspirate?", a:["Ring sideroblasts in 10% of erythroblasts","Emperipolesis in megakaryocytes","Auer rods in promyelocytes","Paratrabecular lymphoid aggregates"], c:1,
  e:"Emperipolesis, where marrow cells pass through megakaryocyte cytoplasm, is normal. It can be increased in some myeloproliferative neoplasms." }
];

const CASES = [
{
  id:"pseudo-plt",
  title:"The surprising platelet count",
  tag:"Pre-analytical",
  stem:"A 46-year-old woman attends for a routine pre-operative check before a hernia repair. She has no bleeding history and no bruising. Her full blood count is otherwise normal.",
  data:[["Hb","134 g/L"],["WBC","6.8 × 10⁹/L"],["Platelets","38 × 10⁹/L"],["MPV","Not reported"],["Analyser flag","PLT clumps?"]],
  steps:[
    { q:"What is your first step?", opts:["Postpone surgery and refer to haematology","Examine the blood film from the same EDTA sample","Transfuse platelets before surgery","Request a bone marrow aspirate"], c:1,
      fb:"A low platelet count in a well patient with no bleeding history and a clump flag should be checked on the film before anything else." },
    { q:"The film shows large platelet clumps at the feathered edge, and some neutrophils ringed by platelets. What is the most likely explanation?", opts:["Immune thrombocytopenia","EDTA-dependent pseudothrombocytopenia with platelet satellitism","Disseminated intravascular coagulation","Bernard–Soulier syndrome"], c:1,
      fb:"EDTA exposes a cryptic GPIIb/IIIa epitope that some people's antibodies (about 0.1% of the population) recognise. Platelets clump in the tube and may stick to neutrophils (satellitism)." },
    { q:"How do you get a reliable count?", opts:["Repeat in another EDTA tube","Repeat on a sodium citrate sample, analysed promptly and corrected for dilution","Use a serum sample","Count reticulated platelets"], c:1,
      fb:"Citrate prevents the clumping in most cases. Multiply the count by about 1.1 to correct for the liquid anticoagulant. A fingerprick film or a sample kept at 37°C are alternatives." }
  ],
  teach:["Always look at the film before reporting an unexpected thrombocytopenia","EDTA pseudothrombocytopenia has no clinical significance, but missing it leads to needless transfusion or cancelled surgery","Record the finding in the patient's file so future counts are interpreted correctly"]
},
{
  id:"cold-agg",
  title:"The impossible MCHC",
  tag:"Analyser artefact",
  stem:"A 72-year-old man is seen with tiredness. His sample was taken in a cold clinic in winter and arrived in the laboratory two hours later.",
  data:[["Hb","118 g/L"],["RBC","2.10 × 10¹²/L"],["Hct","0.24 L/L"],["MCV","114 fL"],["MCH","56 pg"],["MCHC","492 g/L"]],
  steps:[
    { q:"Which value is physiologically impossible?", opts:["Hb 118 g/L","MCV 114 fL","MCHC 492 g/L","RBC 2.10 × 10¹²/L"], c:2,
      fb:"An MCHC above about 370 g/L cannot occur in intact red cells, because haemoglobin would crystallise. It points to an artefact in the red cell count or haematocrit." },
    { q:"How does a cold agglutinin produce this pattern?", opts:["It lyses red cells in the tube","Agglutinated red cells are counted as single large cells, so RBC and Hct fall while Hb, measured after lysis, is correct","It interferes with haemoglobin measurement","It shrinks red cells"], c:1,
      fb:"Haemoglobin is measured after lysis, so it stays correct. The red cell count and haematocrit fall, which makes MCH and MCHC rise falsely, and doublets raise the MCV." },
    { q:"What is the correct action?", opts:["Report the results with a comment","Warm the sample to 37°C for 15 to 30 minutes and rerun it at once","Request a new EDTA sample at room temperature","Dilute the sample with saline"], c:1,
      fb:"Warming disperses the agglutinates. If the problem persists, take a new sample kept at 37°C. The film shows red cell agglutinates. Then think about the cause (Module 2 covers cold agglutinin disease)." }
  ],
  teach:["MCHC is the best internal quality check on red cell indices","Raised MCHC: cold agglutinin, lipaemia, icterus and hereditary spherocytosis (rarely above 370 g/L)","Lipaemia falsely raises Hb; it is corrected by plasma replacement"]
},
{
  id:"dilute-bm",
  title:"An aspirate that looks like blood",
  tag:"Marrow interpretation",
  stem:"A 58-year-old man has a bone marrow aspirate and trephine to investigate mild pancytopenia. The operator reports that aspiration was difficult. The trephine report is pending.",
  data:[["Particles","None seen"],["Blasts","1%"],["Myelocytes and metamyelocytes","6%"],["Segmented neutrophils","52%"],["Lymphocytes","28%"],["Erythroblasts","5%"],["M:E ratio","about 12:1"]],
  steps:[
    { q:"What best explains this differential count?", opts:["Pure red cell aplasia","Chronic myeloid leukaemia","Haemodilution of the aspirate with peripheral blood","Lymphoproliferative disorder"], c:2,
      fb:"No particles, very few precursors and a differential count resembling blood means the aspirate is mostly peripheral blood. The M:E ratio cannot be interpreted." },
    { q:"Why might the aspiration have been difficult?", opts:["Operator technique only","Marrow fibrosis or very cellular, packed marrow","Low platelet count","Anticoagulation"], c:1,
      fb:"A dry or blood-only tap can come from technique, but it raises the possibility of fibrosis, infiltration (for example hairy cell leukaemia or metastases) or a packed marrow. The trephine is essential." },
    { q:"What should the report say?", opts:["Normal marrow","Hypocellular marrow","Aspirate haemodiluted and not representative; interpret together with the trephine, which may need imprints","Reactive marrow"], c:2,
      fb:"State that the aspirate is not representative. Trephine touch imprints give cytology when aspiration fails, and the reticulin stain assesses fibrosis." }
  ],
  teach:["Assess particles before interpreting any aspirate count","Never call a marrow hypocellular from a haemodiluted aspirate","A dry tap is a clue to fibrosis or infiltration until proven otherwise"]
},
{
  id:"pregnancy",
  title:"Blood count at 34 weeks",
  tag:"Physiological variation",
  stem:"A 29-year-old woman at 34 weeks of an uncomplicated pregnancy has a routine blood count. She feels well and has no bleeding.",
  data:[["Hb","106 g/L"],["MCV","92 fL"],["WBC","13.2 × 10⁹/L"],["Neutrophils","10.1 × 10⁹/L"],["Film","Occasional myelocytes"],["Platelets","118 × 10⁹/L"]],
  steps:[
    { q:"How should the haemoglobin be interpreted?", opts:["Normal for pregnancy","Anaemia by WHO criteria; check iron status","Severe anaemia needing transfusion","Spurious result"], c:1,
      fb:"Haemoglobin below 110 g/L is anaemia in pregnancy (below 105 g/L in the second trimester by UK guidance). Iron deficiency is the commonest cause, so check ferritin even with a normal MCV, since MCV rises a little in pregnancy." },
    { q:"How should the white count be interpreted?", opts:["Leukaemoid reaction","Normal pregnancy neutrophilia with a mild left shift","Infection, start antibiotics","Chronic myeloid leukaemia"], c:1,
      fb:"Neutrophilia with occasional myelocytes is normal in pregnancy. Clinical signs, not the count alone, decide whether infection is present." },
    { q:"What is the most likely cause of the platelet count?", opts:["Immune thrombocytopenia","Gestational thrombocytopenia","HELLP syndrome","Thrombotic thrombocytopenic purpura"], c:1,
      fb:"A mild fall late in pregnancy in a well woman with a normal blood pressure and a platelet count above 70 × 10⁹/L is most often gestational. Check blood pressure and liver tests to exclude pre-eclampsia and HELLP." }
  ],
  teach:["Use pregnancy-specific ranges","Plasma volume expands more than red cell mass","Neutrophilia with left shift and mild thrombocytopenia are expected in the third trimester"]
}
];

/* Decision tree: unexpected or implausible full blood count results. */
const TREE = {
  start: { q:"Which result looks wrong?", opts:[["Platelets unexpectedly low","plt"],["MCHC above 365 g/L","mchc"],["White count raised, film shows nucleated red cells","nrbc"],["MCV and Hct rising, sample is old","old"]] },
  plt: { q:"Is the patient well, with no bleeding, and is there a clump flag?", opts:[["Yes","plt2"],["No: bleeding or unwell","pltreal"]] },
  plt2: { q:"Does the film show platelet clumps or satellitism?", opts:[["Yes","pltedta"],["No","pltclot"]] },
  pltedta: { end:"EDTA-dependent pseudothrombocytopenia", detail:"Recount on a citrate sample (multiply by about 1.1) or a fingerprick film. Add a comment to the report and the patient record." },
  pltclot: { q:"Is there a visible clot or fibrin strands in the tube?", opts:[["Yes","pltclot2"],["No","pltreal"]] },
  pltclot2: { end:"Partially clotted sample", detail:"Reject the sample and request a new one with a clean venepuncture and prompt mixing." },
  pltreal: { end:"Probable true thrombocytopenia", detail:"Confirm on the film, review platelet size and other cell lines, and investigate the cause (Module 4)." },
  mchc: { q:"Is the plasma milky (lipaemic) or deeply icteric?", opts:[["Yes","lip"],["No","cold"]] },
  lip: { end:"Interference with haemoglobin measurement", detail:"Turbidity raises Hb, so MCH and MCHC rise. Replace the plasma with an equal volume of diluent and rerun, or measure Hb by another method." },
  cold: { q:"Does the film or the tube show red cell agglutinates?", opts:[["Yes","coldagg"],["No","hs"]] },
  coldagg: { end:"Cold agglutinin artefact", detail:"Warm to 37°C and rerun at once. Then look for the cause: cold agglutinin disease, Mycoplasma, EBV or lymphoma." },
  hs: { end:"Consider hereditary spherocytosis, or a sample artefact", detail:"Look for spherocytes on the film. True MCHC rarely exceeds 370 g/L. Recheck the instrument and quality control." },
  nrbc: { q:"Does your analyser count nucleated red cells separately?", opts:[["Yes","nrbcauto"],["No","nrbccalc"]] },
  nrbcauto: { end:"Use the analyser's corrected white count", detail:"Check that the reported WBC is the corrected value. Then interpret the NRBCs: neonate, haemolysis, hypoxia, marrow infiltration (leucoerythroblastic film)." },
  nrbccalc: { end:"Correct the white count manually", detail:"Corrected WBC = WBC × 100 ÷ (100 + NRBC per 100 WBC). Use the calculator below." },
  old: { q:"Was the sample stored at room temperature for more than about 24 hours?", opts:[["Yes","oldyes"],["No","oldno"]] },
  oldyes: { end:"Storage artefact", detail:"Red cells swell, so MCV and Hct rise while MCHC falls. Films show crenation and degenerating neutrophils. Request a fresh sample." },
  oldno: { end:"Probably a real macrocytosis", detail:"Check the film for oval macrocytes and hypersegmented neutrophils and investigate (Module 2)." }
};

const MARROW_STEPS = [
  ["Check the request", "Read the clinical question and the blood count taken within 24 hours of the marrow. Write down what you need to answer."],
  ["Low power: is it adequate?", "Look for particles and their cellularity. If there are no particles, say the aspirate may be haemodiluted."],
  ["Low power: megakaryocytes", "Present, reduced or increased? Note size, lobulation and any clustering."],
  ["Low power: abnormal cells", "Scan for clumps of non-haematopoietic cells (metastases), giant cells and granulomas."],
  ["High power: differential", "Count at least 500 cells in the trails behind particles. Calculate the M:E ratio."],
  ["Each lineage in turn", "Erythroid: maturation, megaloblastic or dysplastic change. Myeloid: blast %, maturation, granulation, Auer rods. Lymphoid and plasma cells: proportion and morphology."],
  ["Iron stain", "Grade storage iron in particles, count sideroblasts and look for ring sideroblasts."],
  ["Correlate", "Compare with the trephine (cellularity, fibrosis, focal lesions), flow cytometry and genetics."],
  ["Write the conclusion", "Answer the clinical question in the first line. List the key findings and any recommended further tests."]
];
