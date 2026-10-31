/* Module 3 content: White cell disorders and leukaemia immunophenotyping.
   Classification follows the WHO Classification of Haematolymphoid Tumours, 5th edition (WHO-HAEM5, 2022)
   and the International Consensus Classification (ICC, 2022). Where they differ, both are given.
   Original teaching text written from the project library and the primary classification papers. */

Object.assign(SOURCES, {
  who5m: "Khoury et al., The 5th edition of the WHO Classification of Haematolymphoid Tumours: Myeloid and Histiocytic/Dendritic Neoplasms. Leukemia 2022;36:1703–19",
  who5l: "Alaggio et al., The 5th edition of the WHO Classification of Haematolymphoid Tumours: Lymphoid Neoplasms. Leukemia 2022;36:1720–48",
  iccm: "Arber et al., International Consensus Classification of Myeloid Neoplasms and Acute Leukemias. Blood 2022;140:1200–28",
  iccl: "Campo et al., The International Consensus Classification of Mature Lymphoid Neoplasms. Blood 2022;140:1229–53",
  eln: "Döhner et al., Diagnosis and management of AML in adults: 2022 ELN recommendations. Blood 2022;140:1345–77",
  imwg: "Rajkumar et al., IMWG updated criteria for the diagnosis of multiple myeloma. Lancet Oncol 2014;15:e538–48",
  fcm: "Flow cytometry and immunophenotyping (project library)"
});

const M3_LESSONS = [
{
  id: "reactive",
  title: "Reactive white cell changes and the leukaemoid reaction",
  minutes: 12,
  sources: ["bc", "dl", "psh"],
  video: "toxic granulation dohle bodies reactive lymphocytes leukemoid reaction",
  body: `
<p>Most abnormal white counts are reactive. Before thinking of a neoplasm, ask whether infection, inflammation, drugs, pregnancy, stress or recovery from marrow suppression explain the picture. The film usually answers the question.</p>
<h3>Neutrophilia</h3>
<p>A neutrophil count above about 7.5 × 10⁹/L in adults. Common causes are bacterial infection, inflammation, tissue necrosis, corticosteroids, smoking, pregnancy, haemorrhage and G-CSF therapy. Reactive features on the film:</p>
<ul>
<li><b>Left shift:</b> more band forms, with a few metamyelocytes and myelocytes.</li>
<li><b>Toxic granulation:</b> coarse, dark primary-like granules.</li>
<li><b>Döhle bodies:</b> pale blue patches of rough endoplasmic reticulum at the cell edge.</li>
<li><b>Cytoplasmic vacuoles:</b> suggest sepsis, especially with bacteria inside the cell.</li>
</ul>
<h3>The leukaemoid reaction</h3>
<p>A reactive white count above about 50 × 10⁹/L, with a left shift that can mimic chronic myeloid leukaemia (CML). Severe infection, tuberculosis, metastatic cancer and G-CSF are typical causes. Points that favour a reaction rather than CML:</p>
<div class="tablewrap"><table class="t"><thead><tr><th>Feature</th><th>Leukaemoid reaction</th><th>CML</th></tr></thead><tbody>
<tr><td>Myelocyte and neutrophil peaks</td><td>Neutrophils and bands dominate</td><td>Two peaks: myelocytes and segmented neutrophils</td></tr>
<tr><td>Basophils and eosinophils</td><td>Not increased</td><td>Basophilia is almost constant</td></tr>
<tr><td>Toxic changes</td><td>Common</td><td>Absent</td></tr>
<tr><td>Spleen</td><td>Usually normal</td><td>Often enlarged</td></tr>
<tr><td>BCR::ABL1</td><td>Negative</td><td>Positive (diagnostic)</td></tr>
</tbody></table></div>
<p>A <b>leucoerythroblastic</b> film (myelocytes plus nucleated red cells, often with teardrop cells) points instead to marrow infiltration, fibrosis or severe stress.</p>
<h3>Lymphocytosis</h3>
<p>Reactive lymphocytes are large, with abundant pale blue cytoplasm that darkens at the edges and indents around neighbouring red cells. They form a <i>heterogeneous</i> population. EBV, CMV, toxoplasma, HIV seroconversion, hepatitis and drugs are the usual causes. A <i>monotonous</i> population of small lymphocytes with smudge cells in an older adult suggests chronic lymphocytic leukaemia instead, and needs flow cytometry.</p>
<h3>Eosinophilia, monocytosis and basophilia</h3>
<ul>
<li><b>Eosinophilia</b> (over 0.5 × 10⁹/L): allergy, parasites, drugs, vasculitis, Hodgkin lymphoma. Persistent eosinophilia above 1.5 × 10⁹/L is hypereosinophilia and, if unexplained, needs testing for <i>PDGFRA</i>, <i>PDGFRB</i>, <i>FGFR1</i>, <i>JAK2</i>, <i>FLT3</i> and <i>ETV6::ABL1</i> rearrangements, and a T-cell clone.</li>
<li><b>Monocytosis</b> (over 1.0 × 10⁹/L): chronic infection (TB, endocarditis), recovery from neutropenia, inflammatory bowel disease. Persistent monocytosis above 0.5 × 10⁹/L and over 10% of white cells raises the possibility of CMML.</li>
<li><b>Basophilia</b> is rarely reactive. Think of a myeloproliferative neoplasm, especially CML.</li>
</ul>
<h3>Inherited white cell anomalies</h3>
<p>Pelger–Huët anomaly gives bilobed neutrophils with coarse chromatin ("pince-nez"); the same appearance arising in a patient is a <i>pseudo-Pelger</i> change of myelodysplasia. May–Hegglin anomaly (<i>MYH9</i>) gives Döhle-like inclusions with giant platelets. Chediak–Higashi syndrome gives giant granules. Alder–Reilly anomaly gives dense granules in mucopolysaccharidoses.</p>
`,
  points: [
    "Most abnormal white counts are reactive: look for toxic granulation, Döhle bodies and vacuoles",
    "Leukaemoid reaction: WBC over 50 × 10⁹/L, no basophilia, toxic changes, BCR::ABL1 negative",
    "Leucoerythroblastic film: marrow infiltration or fibrosis until proven otherwise",
    "Reactive lymphocytes are heterogeneous; a monotonous population needs flow cytometry",
    "Unexplained eosinophilia over 1.5 × 10⁹/L: test for PDGFRA, PDGFRB, FGFR1, JAK2 and FLT3 rearrangements",
    "Basophilia is a clue to a myeloproliferative neoplasm"
  ]
},
{
  id: "flow",
  title: "Flow cytometry and lineage assignment",
  minutes: 16,
  sources: ["fcm", "who5m", "hp"],
  video: "flow cytometry CD45 side scatter gating leukemia immunophenotyping",
  body: `
<p>Flow cytometry measures light scatter and fluorescence of single cells as they pass a laser. Forward scatter (FSC) reflects size, side scatter (SSC) reflects internal complexity (granules), and each fluorochrome-labelled antibody reports one antigen. Modern instruments measure 8 to 12 or more colours at once.</p>
<h3>The CD45 versus side scatter plot</h3>
<p>Almost every leukaemia panel starts here. CD45 is present on all white cells, brightest on lymphocytes, and absent from red cells and their precursors. Each population falls into its own area:</p>
<div class="tablewrap"><table class="t"><thead><tr><th>Population</th><th>CD45</th><th>SSC</th></tr></thead><tbody>
<tr><td>Lymphocytes</td><td>Bright</td><td>Low</td></tr>
<tr><td>Monocytes</td><td>Bright</td><td>Intermediate</td></tr>
<tr><td>Granulocytes</td><td>Moderate</td><td>High</td></tr>
<tr><td>Blasts</td><td>Dim</td><td>Low to intermediate</td></tr>
<tr><td>Erythroid precursors</td><td>Negative</td><td>Low</td></tr>
<tr><td>Plasma cells</td><td>Dim to negative</td><td>Low to intermediate</td></tr>
</tbody></table></div>
<p>The animation section lets you see how AML, ALL, CLL, APL and myeloma change this plot.</p>
<h3>Antigens to know</h3>
<ul>
<li><b>Immaturity:</b> CD34, CD117 (myeloid), TdT (lymphoid), HLA-DR, CD38.</li>
<li><b>Myeloid:</b> MPO (cytoplasmic), CD13, CD33, CD15, CD11b, CD65. <b>Monocytic:</b> CD14, CD64, CD11c, CD36, CD4 (dim), lysozyme.</li>
<li><b>Erythroid:</b> CD71, CD235a (glycophorin A), CD36. <b>Megakaryocytic:</b> CD41, CD61, CD42b.</li>
<li><b>B cell:</b> CD19, cytoplasmic CD79a, cytoplasmic CD22, CD10, CD20, surface κ or λ light chain.</li>
<li><b>T cell:</b> cytoplasmic CD3 (cCD3, the lineage-defining marker), CD2, CD5, CD7, CD1a, CD4, CD8.</li>
<li><b>NK cell:</b> CD56, CD16, CD94, with CD3 negative on the surface.</li>
<li><b>Plasma cell:</b> CD38 bright, CD138, cytoplasmic light chain; abnormal ones are often CD19−, CD45−, CD56+, CD27− or CD81−.</li>
</ul>
<h3>Clonality</h3>
<p>Mature B cells express a single light chain. A κ:λ ratio above about 3:1 or below about 1:2 within a gated B-cell population, or a population with no surface light chain, suggests a clone. For T cells, use TRBC1 staining or the Vβ repertoire, or molecular TCR gene rearrangement studies.</p>
<h3>Lineage assignment for mixed-phenotype acute leukaemia</h3>
<p>WHO-HAEM5 and ICC 2022 keep strict markers to assign more than one lineage:</p>
<ul>
<li><b>Myeloid:</b> MPO positivity (WHO-HAEM5: intensity over 50% of mature neutrophils), or monocytic differentiation with at least two of nonspecific esterase, CD11c, CD14, CD64 and lysozyme.</li>
<li><b>T lineage:</b> cytoplasmic or surface CD3 with intensity over 50% of mature T cells.</li>
<li><b>B lineage:</b> strong CD19 (over 50% of normal B cells) with at least one of CD79a, cytoplasmic CD22 or CD10; or weak CD19 with at least two of these markers.</li>
</ul>
<p>Use the lineage tree in the workups section to practise. Always exclude a defining genetic abnormality (for example <i>BCR::ABL1</i> or <i>KMT2A</i> rearrangement), which takes priority in naming.</p>
<h3>Measurable residual disease</h3>
<p>After treatment, flow cytometry can find 1 leukaemic cell in 10⁴ to 10⁵ normal cells using a "leukaemia-associated immunophenotype" or "different from normal" approach. Molecular MRD (for example <i>NPM1</i> transcripts, <i>BCR::ABL1</i> by RT-qPCR) is more sensitive where a target exists.</p>
`,
  points: [
    "Start every panel with CD45 versus SSC: blasts are CD45 dim, SSC low",
    "Immaturity markers: CD34, CD117, TdT, HLA-DR",
    "Lineage-defining markers: MPO (myeloid), cytoplasmic CD3 (T), CD19 with CD79a, cCD22 or CD10 (B)",
    "Light chain restriction indicates a clonal B-cell population",
    "Defining genetic abnormalities take priority over a mixed phenotype",
    "Flow MRD reaches 10⁻⁴ to 10⁻⁵; molecular MRD is more sensitive when a target exists"
  ]
},
{
  id: "aml",
  title: "Acute myeloid leukaemia (WHO-HAEM5 and ICC 2022)",
  minutes: 20,
  sources: ["who5m", "iccm", "eln", "bmd"],
  video: "acute myeloid leukemia WHO 2022 ICC classification",
  body: `
<p>Acute myeloid leukaemia (AML) is a clonal proliferation of myeloid blasts that blocks normal haematopoiesis. Patients present with cytopenias, infection, bleeding and sometimes leucostasis, gum infiltration (monocytic types) or disseminated intravascular coagulation (APL).</p>
<h3>What counts as a blast</h3>
<p>Myeloblasts, monoblasts and megakaryoblasts count as blasts. <b>Promonocytes</b> count as blast equivalents. In APL the abnormal promyelocytes count as blast equivalents. Count at least 200 cells on the blood film and 500 on the marrow aspirate.</p>
<h3>The two classifications in 2022</h3>
<p>WHO-HAEM5 and ICC agree on the main idea, classification by genetics first, but differ in blast thresholds.</p>
<div class="tablewrap"><table class="t"><thead><tr><th>Question</th><th>WHO-HAEM5</th><th>ICC 2022</th></tr></thead><tbody>
<tr><td>Blasts needed for AML with a defining genetic abnormality</td><td>No minimum (except <i>BCR::ABL1</i> and <i>CEBPA</i>, which need 20% or more)</td><td>10% or more (except <i>BCR::ABL1</i>, which needs 20%)</td></tr>
<tr><td>AML without a defining abnormality</td><td>20% or more</td><td>20% or more</td></tr>
<tr><td>10 to 19% blasts, no defining abnormality</td><td>MDS with increased blasts 2</td><td>MDS/AML</td></tr>
<tr><td>Myelodysplasia-related AML</td><td>AML-MR, defined by MR cytogenetics or MR gene mutations; morphology alone no longer qualifies</td><td>AML with MR gene mutations, or with MR cytogenetic abnormalities</td></tr>
<tr><td><i>TP53</i></td><td>Not a separate AML type</td><td>AML with mutated <i>TP53</i> (VAF 10% or more) is its own category</td></tr>
</tbody></table></div>
<h3>AML with defining genetic abnormalities (WHO-HAEM5)</h3>
<ul>
<li>Acute promyelocytic leukaemia with <i>PML::RARA</i></li>
<li>AML with <i>RUNX1::RUNX1T1</i> [t(8;21)] and AML with <i>CBFB::MYH11</i> [inv(16)]: the "core binding factor" leukaemias, with a good prognosis</li>
<li>AML with <i>DEK::NUP214</i>, <i>RBM15::MRTFA</i>, <i>BCR::ABL1</i></li>
<li>AML with <i>KMT2A</i>, <i>MECOM</i> or <i>NUP98</i> rearrangement</li>
<li>AML with <i>NPM1</i> mutation (the most common type in adults; cuplike nuclei)</li>
<li>AML with <i>CEBPA</i> mutation (biallelic, or a single in-frame bZIP mutation)</li>
<li>AML, myelodysplasia-related: cytogenetics such as complex karyotype, −7, del(5q), del(17p), or mutations in <i>ASXL1, BCOR, EZH2, SF3B1, SRSF2, STAG2, U2AF1, ZRSR2</i></li>
</ul>
<p>Cases without any of these are classified by differentiation: minimal differentiation, without or with maturation, acute basophilic, myelomonocytic, monocytic, erythroid and megakaryoblastic leukaemia. Prior therapy or a germline predisposition is added as a qualifier, for example "post cytotoxic therapy".</p>
<h3>Acute promyelocytic leukaemia: a medical emergency</h3>
<p>Hypergranular promyelocytes with bilobed nuclei, bundles of Auer rods ("faggot cells") and DIC with low fibrinogen. The microgranular variant has a high white count and few visible granules. Phenotype: CD34 negative, HLA-DR negative, CD33 bright, CD117 positive, CD11b negative. Start all-trans retinoic acid (ATRA) as soon as APL is suspected, before genetic confirmation, and support fibrinogen and platelets. ATRA with arsenic trioxide cures most patients.</p>
<h3>Risk stratification: ELN 2022</h3>
<ul>
<li><b>Favourable:</b> t(8;21), inv(16), <i>NPM1</i> mutated without <i>FLT3</i>-ITD, in-frame bZIP <i>CEBPA</i>.</li>
<li><b>Intermediate:</b> <i>NPM1</i> with <i>FLT3</i>-ITD, wild-type <i>NPM1</i> with <i>FLT3</i>-ITD, t(9;11), other abnormalities not classed elsewhere.</li>
<li><b>Adverse:</b> complex or monosomal karyotype, −5/del(5q), −7, −17/abn(17p), <i>KMT2A</i> rearrangement (other than t(9;11)), inv(3)/t(3;3), t(6;9), <i>BCR::ABL1</i>, mutated <i>TP53</i>, and MR gene mutations.</li>
</ul>
<p><i>FLT3</i> status no longer depends on the allelic ratio in ELN 2022. Test <i>FLT3</i>, <i>NPM1</i>, <i>IDH1</i> and <i>IDH2</i> quickly, because targeted drugs (midostaurin, gilteritinib, quizartinib, ivosidenib, enasidenib) change treatment.</p>
`,
  points: [
    "Blasts include myeloblasts, monoblasts, megakaryoblasts; promonocytes and APL promyelocytes are blast equivalents",
    "WHO-HAEM5: defining genetic abnormalities need no blast minimum, except BCR::ABL1 and CEBPA (20%)",
    "ICC: 10% blasts for recurrent genetic AML; 10–19% without them is MDS/AML",
    "AML-MR is now defined by cytogenetics or MR gene mutations, not morphology",
    "Suspected APL: start ATRA immediately and treat the DIC",
    "ELN 2022 adverse group includes TP53, complex karyotype and MR gene mutations"
  ]
},
{
  id: "all",
  title: "Precursor lymphoid neoplasms: B-ALL and T-ALL",
  minutes: 15,
  sources: ["who5l", "iccm", "hp", "fcm"],
  video: "acute lymphoblastic leukemia immunophenotype genetic subtypes 2022",
  body: `
<p>Acute lymphoblastic leukaemia (ALL) is the most common childhood cancer, with a peak at 2 to 5 years, and a second rise in older adults. Bone pain, cytopenias, lymphadenopathy, hepatosplenomegaly and, in T-ALL, a mediastinal mass are typical.</p>
<h3>Morphology</h3>
<p>Lymphoblasts vary from small cells with scant cytoplasm to larger cells with more cytoplasm and visible nucleoli. They have no granules and no Auer rods, and are MPO negative. The old FAB L1/L2/L3 labels are no longer used. Morphology cannot separate B from T: flow cytometry is required. A minimum blast percentage is not strictly defined, but the diagnosis should generally be avoided with fewer than 20% blasts.</p>
<h3>B-lymphoblastic leukaemia/lymphoma: phenotype</h3>
<p>CD19, CD79a, cytoplasmic CD22, usually CD10, TdT and CD34, with dim CD45. Normal B-cell precursors (hematogones) share these antigens but show an orderly maturation pattern; leukaemic blasts show a frozen or aberrant pattern, often with aberrant CD13, CD33 or CD66c. <i>KMT2A</i>-rearranged infant B-ALL is typically CD10 negative.</p>
<h3>B-ALL genetic subtypes (WHO-HAEM5 and ICC)</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>Subtype</th><th>Typical age</th><th>Outlook</th></tr></thead><tbody>
<tr><td>High hyperdiploidy (51–65 chromosomes)</td><td>Children</td><td>Favourable</td></tr>
<tr><td><i>ETV6::RUNX1</i> [t(12;21)]</td><td>Children</td><td>Favourable</td></tr>
<tr><td><i>DUX4</i> rearranged (ICC), often with <i>ERG</i> deletion</td><td>Adolescents</td><td>Favourable</td></tr>
<tr><td><i>TCF3::PBX1</i> [t(1;19)]</td><td>Children</td><td>Intermediate</td></tr>
<tr><td><i>BCR::ABL1</i> [t(9;22)]</td><td>Adults (25% or more)</td><td>Improved by tyrosine kinase inhibitors</td></tr>
<tr><td><i>BCR::ABL1</i>-like (Ph-like)</td><td>Adolescents and young adults</td><td>Poor; often kinase-targetable</td></tr>
<tr><td><i>KMT2A</i> rearranged</td><td>Infants</td><td>Poor</td></tr>
<tr><td>Hypodiploidy (fewer than 44)</td><td>Any; low hypodiploid linked to germline <i>TP53</i></td><td>Poor</td></tr>
<tr><td>iAMP21</td><td>Older children</td><td>Poor with standard therapy</td></tr>
<tr><td><i>TCF3::HLF</i></td><td>Children</td><td>Very poor</td></tr>
</tbody></table></div>
<p>Note that WHO-HAEM5 recognises <i>BCR::ABL1</i>-positive B-ALL as lymphoid-only or multilineage; the multilineage form behaves more like CML in lymphoid blast phase.</p>
<h3>T-lymphoblastic leukaemia/lymphoma</h3>
<p>Cytoplasmic CD3 is the lineage-defining marker, with CD7, TdT, and variable CD1a, CD2, CD4, CD5 and CD8. It is more common in adolescent boys and often presents with a mediastinal mass and a high white count.</p>
<p><b>Early T-precursor ALL (ETP-ALL)</b> lacks CD1a and CD8, has weak CD5 (under 75% of blasts), and expresses at least one stem cell or myeloid marker (CD34, CD117, HLA-DR, CD13, CD33, CD11b or CD65). ICC also lists near-ETP ALL as a provisional entity.</p>
<h3>Mixed-phenotype acute leukaemia (MPAL)</h3>
<p>Blasts that meet the lineage criteria for more than one lineage (see the flow cytometry lesson). Name it by any defining genetic lesion first: MPAL with <i>BCR::ABL1</i> or with <i>KMT2A</i> rearrangement. WHO-HAEM5 adds MPAL with <i>ZNF384</i> rearrangement and with <i>BCL11B</i> rearrangement.</p>
<h3>Treatment monitoring</h3>
<p>MRD at the end of induction is the strongest prognostic factor in ALL. Blinatumomab (CD19 × CD3), inotuzumab (CD22) and CAR-T cells (CD19) can select for antigen-negative relapse, so report antigen intensity carefully.</p>
`,
  points: [
    "Morphology cannot separate B-ALL from T-ALL; flow cytometry is essential",
    "B-ALL: CD19, CD79a, cCD22, CD10, TdT, CD34; KMT2A infant B-ALL is often CD10 negative",
    "Favourable B-ALL: high hyperdiploidy, ETV6::RUNX1; poor: KMT2A, hypodiploidy, Ph-like, TCF3::HLF",
    "T-ALL: cytoplasmic CD3 defines lineage; mediastinal mass is common",
    "ETP-ALL: CD1a−, CD8−, CD5 weak, plus stem or myeloid markers",
    "End-of-induction MRD is the strongest predictor of outcome"
  ]
},
{
  id: "mpn",
  title: "Myeloproliferative neoplasms: CML, PV, ET and PMF",
  minutes: 18,
  sources: ["who5m", "iccm", "bmd", "hof"],
  video: "myeloproliferative neoplasms JAK2 CALR MPL CML WHO 2022",
  body: `
<p>Myeloproliferative neoplasms (MPN) are clonal stem cell disorders with effective production of one or more mature myeloid lineages. They carry a risk of thrombosis, fibrotic progression and transformation to AML.</p>
<h3>Chronic myeloid leukaemia, <i>BCR::ABL1</i>-positive</h3>
<p>Caused by t(9;22)(q34;q11), the Philadelphia chromosome, which creates the <i>BCR::ABL1</i> fusion tyrosine kinase. The film shows neutrophilia with a "two-peak" left shift (myelocytes and neutrophils), basophilia, eosinophilia and often thrombocytosis. The marrow is packed with granulocytes and small "dwarf" megakaryocytes.</p>
<ul>
<li><b>WHO-HAEM5</b> recognises only chronic phase and blast phase. The accelerated phase was dropped, because tyrosine kinase inhibitors (TKIs) changed its meaning; instead, high-risk features in chronic phase are reported.</li>
<li><b>ICC 2022</b> keeps the accelerated phase (10 to 19% blasts, basophils 20% or more, or additional high-risk chromosomal abnormalities).</li>
<li><b>Blast phase:</b> 20% or more blasts in blood or marrow, an extramedullary blast proliferation, or (WHO-HAEM5) any increase in lymphoblasts. About a quarter are lymphoid.</li>
</ul>
<p>Monitor response by RT-qPCR on the International Scale: a major molecular response is <i>BCR::ABL1</i> 0.1% IS or less.</p>
<h3>The three driver mutations of Ph-negative MPN</h3>
<ul>
<li><b><i>JAK2</i> V617F:</b> about 95% of PV, 50 to 60% of ET and PMF. <i>JAK2</i> exon 12 mutations account for most of the rest of PV.</li>
<li><b><i>CALR</i> exon 9:</b> 20 to 25% of ET and 25 to 30% of PMF. Type 1 (52 bp deletion) mutations favour a fibrotic course.</li>
<li><b><i>MPL</i> W515:</b> about 5% of ET and PMF.</li>
<li>"Triple-negative" cases need another clonal marker (for example <i>ASXL1</i>, <i>TET2</i>) or careful exclusion of reactive causes.</li>
</ul>
<h3>Diagnostic criteria (WHO-HAEM5, close to ICC)</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>Entity</th><th>Major criteria</th><th>Minor criteria</th></tr></thead><tbody>
<tr><td>Polycythaemia vera</td><td>1. Hb over 165 g/L (men) or 160 g/L (women), or Hct over 49% / 48%<br>2. Marrow panmyelosis with pleomorphic mature megakaryocytes<br>3. <i>JAK2</i> V617F or exon 12</td><td>Subnormal serum erythropoietin. Diagnosis: all 3 major, or major 1 and 2 plus the minor.</td></tr>
<tr><td>Essential thrombocythaemia</td><td>1. Platelets 450 × 10⁹/L or more<br>2. Increased large, hyperlobulated megakaryocytes, no significant left shift of granulopoiesis or erythropoiesis<br>3. Not meeting criteria for other myeloid neoplasms<br>4. <i>JAK2</i>, <i>CALR</i> or <i>MPL</i></td><td>Another clonal marker, or no evidence of reactive thrombocytosis. Diagnosis: all 4 major, or the first 3 plus the minor.</td></tr>
<tr><td>Primary myelofibrosis (overt)</td><td>1. Megakaryocyte proliferation and atypia with reticulin or collagen fibrosis grade 2 or 3<br>2. Not meeting criteria for other myeloid neoplasms<br>3. Driver mutation, another clonal marker, or no reactive fibrosis</td><td>Anaemia, WBC 11 × 10⁹/L or more, palpable splenomegaly, raised LDH, leucoerythroblastosis. Need at least one, confirmed twice.</td></tr>
</tbody></table></div>
<p><b>Prefibrotic PMF</b> has grade 0 or 1 fibrosis but the same atypical, clustered megakaryocytes with hypercellularity. It can look like ET clinically; the trephine is what separates them, and the distinction matters for prognosis.</p>
<h3>Other MPN</h3>
<p>Chronic neutrophilic leukaemia (<i>CSF3R</i> mutation, mature neutrophilia of 25 × 10⁹/L or more), chronic eosinophilic leukaemia (WHO-HAEM5 dropped "not otherwise specified"), juvenile myelomonocytic leukaemia (now classed as an MPN in WHO-HAEM5) and MPN, not otherwise specified. Myeloid/lymphoid neoplasms with eosinophilia and tyrosine kinase gene fusions (<i>PDGFRA</i>, <i>PDGFRB</i>, <i>FGFR1</i>, <i>JAK2</i>, <i>FLT3</i>, <i>ETV6::ABL1</i>) are a separate group, important because several respond to imatinib.</p>
`,
  points: [
    "CML: t(9;22) BCR::ABL1; basophilia and a myelocyte peak on the film",
    "WHO-HAEM5 dropped CML accelerated phase; ICC keeps it",
    "JAK2 V617F in about 95% of PV; CALR and MPL in JAK2-negative ET and PMF",
    "PV major criteria: Hb over 165/160 g/L, panmyelosis, JAK2; minor: low EPO",
    "Prefibrotic PMF is separated from ET by megakaryocyte morphology on the trephine",
    "Eosinophilia with PDGFRA/B fusions responds to imatinib"
  ]
},
{
  id: "mds",
  title: "Myelodysplastic neoplasms, CMML and MDS/MPN",
  minutes: 18,
  sources: ["who5m", "iccm", "bmd", "bmp"],
  video: "myelodysplastic syndrome WHO 2022 ICC dysplasia SF3B1 TP53",
  body: `
<p>Myelodysplastic neoplasms (MDS) are clonal disorders with cytopenia, dysplasia and ineffective haematopoiesis. WHO-HAEM5 renamed "syndromes" as "neoplasms" but kept the abbreviation MDS.</p>
<h3>Dysplasia</h3>
<p>Count dysplasia in 10% or more of cells of a lineage. Key features:</p>
<ul>
<li><b>Erythroid:</b> nuclear budding, internuclear bridging, multinuclearity, megaloblastoid change, ring sideroblasts.</li>
<li><b>Granulocytic:</b> hypogranular neutrophils, pseudo-Pelger nuclei, abnormal nuclear shapes.</li>
<li><b>Megakaryocytic:</b> micromegakaryocytes (the most reliable), small hypolobated or widely separated nuclei.</li>
</ul>
<p>Always exclude B12, folate or copper deficiency, alcohol, drugs, HIV and recent chemotherapy, which can all cause dysplasia.</p>
<h3>WHO-HAEM5 classification of MDS</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>Type</th><th>Defining features</th></tr></thead><tbody>
<tr><td>MDS with low blasts and isolated del(5q) (MDS-5q)</td><td>del(5q) alone or with one other abnormality other than −7/del(7q); blasts under 5% marrow and under 2% blood</td></tr>
<tr><td>MDS with low blasts and <i>SF3B1</i> mutation (MDS-SF3B1)</td><td><i>SF3B1</i> VAF 5% or more (or ring sideroblasts 15% or more), no del(5q), −7 or complex karyotype, blasts as above</td></tr>
<tr><td>MDS with biallelic <i>TP53</i> inactivation (MDS-biTP53)</td><td>Two or more <i>TP53</i> hits; blasts under 20%</td></tr>
<tr><td>MDS with low blasts (MDS-LB)</td><td>Blasts under 5% marrow and under 2% blood</td></tr>
<tr><td>Hypoplastic MDS (MDS-h)</td><td>Marrow cellularity 25% or less (age-adjusted)</td></tr>
<tr><td>MDS with increased blasts 1 (MDS-IB1)</td><td>5–9% marrow or 2–4% blood</td></tr>
<tr><td>MDS with increased blasts 2 (MDS-IB2)</td><td>10–19% marrow, 5–19% blood, or Auer rods</td></tr>
<tr><td>MDS with fibrosis (MDS-f)</td><td>5–19% marrow blasts with grade 2 or 3 fibrosis</td></tr>
</tbody></table></div>
<h3>How ICC 2022 differs</h3>
<p>ICC uses MDS with mutated <i>SF3B1</i>, MDS with del(5q), MDS not otherwise specified (with single or multilineage dysplasia), MDS with excess blasts (5–9% marrow or 2–9% blood) and MDS/AML (10–19%). <i>TP53</i>-mutated myeloid neoplasms form their own group across MDS, MDS/AML and AML. ICC does not use Auer rods to upgrade the category.</p>
<h3>Precursor states</h3>
<p><b>CHIP</b> (clonal haematopoiesis of indeterminate potential) is a somatic myeloid mutation with VAF 2% or more and normal counts. <b>CCUS</b> is the same with unexplained cytopenia but without diagnostic dysplasia. Both are now named in the classifications.</p>
<h3>Chronic myelomonocytic leukaemia (CMML)</h3>
<p>WHO-HAEM5 criteria: persistent monocytosis of 0.5 × 10⁹/L or more and 10% or more of white cells; blasts and promonocytes under 20%; not meeting criteria for CML or another MPN. If monocytes are 0.5 to 0.9 × 10⁹/L, clonality and dysplasia are needed. Abnormal partitioning of monocyte subsets on flow (classical CD14+ CD16− monocytes over 94%) supports the diagnosis.</p>
<ul>
<li><b>Myelodysplastic type</b> (MD-CMML): WBC under 13 × 10⁹/L. <b>Myeloproliferative type</b> (MP-CMML): WBC 13 × 10⁹/L or more.</li>
<li><b>CMML-1:</b> blasts under 5% blood and under 10% marrow. <b>CMML-2:</b> 5–19% blood or 10–19% marrow.</li>
</ul>
<p>Other MDS/MPN: MDS/MPN with neutrophilia (formerly atypical CML, <i>SETBP1</i>, <i>ASXL1</i>), MDS/MPN with <i>SF3B1</i> mutation and thrombocytosis, and MDS/MPN not otherwise specified.</p>
<h3>Prognosis</h3>
<p>IPSS-R uses karyotype, blasts, Hb, platelets and neutrophils. The molecular IPSS-M adds 31 genes and is now preferred where sequencing is available.</p>
`,
  points: [
    "Dysplasia must be in 10% or more of a lineage; exclude B12, folate, copper, alcohol and drugs",
    "WHO-HAEM5 genetic MDS types: MDS-5q, MDS-SF3B1, MDS-biTP53",
    "MDS-IB1: 5–9% marrow or 2–4% blood blasts; MDS-IB2: 10–19% marrow, 5–19% blood, or Auer rods",
    "ICC: MDS-EB 5–9%, MDS/AML 10–19%",
    "CMML: monocytes 0.5 × 10⁹/L or more and 10% or more; MP type if WBC 13 or more",
    "CHIP and CCUS are clonal precursor states without diagnostic dysplasia"
  ]
},
{
  id: "bcell",
  title: "Mature B-cell neoplasms in blood and marrow",
  minutes: 18,
  sources: ["who5l", "iccl", "fcm", "bc"],
  video: "CLL mantle cell hairy cell leukemia flow cytometry Matutes score",
  body: `
<p>Mature B-cell neoplasms are the lymphomas and leukaemias of antigen-exposed B cells. In the haematology laboratory they usually present as a lymphocytosis, cytopenias or an abnormal film. Flow cytometry first proves clonality (light chain restriction), then the phenotype points to the entity.</p>
<h3>Chronic lymphocytic leukaemia and monoclonal B-cell lymphocytosis</h3>
<p>Small lymphocytes with dense, "cracked" chromatin and smudge cells on the film. CLL needs 5 × 10⁹/L or more clonal B cells with the CLL phenotype for at least 3 months. Under that number, without lymphadenopathy, organomegaly or cytopenias, the diagnosis is monoclonal B-cell lymphocytosis (MBL). SLL is the same disease mainly in lymph nodes.</p>
<p>Phenotype: CD19, CD5, CD23, CD200 positive; weak CD20, CD79b and surface light chain; FMC7 negative; CD43 and ROR1 positive. The <b>Matutes score</b> gives 1 point each for CD5 positive, CD23 positive, FMC7 negative, weak surface immunoglobulin and weak CD22 or CD79b. A score of 4 or 5 supports CLL; 0 to 2 makes CLL unlikely. A calculator is in the workups.</p>
<p>Prognostic testing before treatment: <i>TP53</i> mutation and del(17p) by FISH, <i>IGHV</i> mutation status, and complex karyotype. WHO-HAEM5 removed B-prolymphocytic leukaemia as an entity; CLL with over 15% prolymphocytes is called "prolymphocytic progression of CLL".</p>
<h3>Phenotypes of the main entities</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>Entity</th><th>CD5</th><th>CD10</th><th>CD23</th><th>Other clues</th><th>Genetics</th></tr></thead><tbody>
<tr><td>CLL/SLL</td><td>+</td><td>−</td><td>+</td><td>CD200+, weak CD20 and sIg</td><td>del(13q), +12, del(11q), del(17p)</td></tr>
<tr><td>Mantle cell lymphoma</td><td>+</td><td>−</td><td>− (usually)</td><td>CD200 −, cyclin D1+, SOX11+, bright sIg</td><td>t(11;14) <i>CCND1::IGH</i></td></tr>
<tr><td>Follicular lymphoma</td><td>−</td><td>+</td><td>±</td><td>BCL2+, BCL6+, "buttock" cleaved cells</td><td>t(14;18) <i>IGH::BCL2</i></td></tr>
<tr><td>Splenic marginal zone lymphoma</td><td>− (some +)</td><td>−</td><td>−</td><td>Villous lymphocytes</td><td>del(7q), <i>KLF2</i>, <i>NOTCH2</i></td></tr>
<tr><td>Hairy cell leukaemia</td><td>−</td><td>− (some +)</td><td>−</td><td>CD11c, CD25, CD103, CD123 bright, annexin A1</td><td><i>BRAF</i> V600E</td></tr>
<tr><td>Lymphoplasmacytic lymphoma</td><td>−</td><td>−</td><td>−</td><td>Plasmacytoid cells, IgM paraprotein</td><td><i>MYD88</i> L265P (over 90%)</td></tr>
<tr><td>Burkitt lymphoma</td><td>−</td><td>+</td><td>−</td><td>BCL2 −, Ki-67 near 100%, vacuolated blue cells</td><td><i>MYC</i> rearrangement</td></tr>
</tbody></table></div>
<h3>Hairy cell leukaemia</h3>
<p>Middle-aged men with pancytopenia, monocytopenia and splenomegaly, and a "dry tap" marrow. The cells have oval or bean-shaped nuclei and pale cytoplasm with fine hair-like projections. <i>BRAF</i> V600E is present in nearly all cases. WHO-HAEM5 renamed hairy cell leukaemia variant and the CD5-negative "B-PLL" cases as <b>splenic B-cell lymphoma/leukaemia with prominent nucleoli</b>; these are CD25 negative and <i>BRAF</i> wild type.</p>
<h3>Mantle cell lymphoma in the blood</h3>
<p>Medium-sized cells with irregular nuclei. CD5 positive but CD23 negative or weak, and CD200 negative: a CLL score of 3 or lower with CD5 positivity should always trigger cyclin D1 or t(11;14) FISH. A leukaemic non-nodal form (SOX11 negative) is more indolent.</p>
<h3>Diffuse large B-cell lymphoma and high-grade lymphoma</h3>
<p>WHO-HAEM5 renamed "double-hit" lymphoma as <i>DLBCL/high-grade B-cell lymphoma with MYC and BCL2 rearrangements</i>; cases with <i>MYC</i> and <i>BCL6</i> only now go back to DLBCL or HGBL, NOS. ICC keeps both double-hit groups.</p>
`,
  points: [
    "Clonality first (light chain restriction), then the phenotype",
    "CLL: 5 × 10⁹/L clonal B cells; CD5+ CD23+ CD200+ with weak CD20 and sIg; Matutes score 4–5",
    "CD5+ CD23− CD200− B cells: test cyclin D1/t(11;14) for mantle cell lymphoma",
    "Hairy cell leukaemia: CD11c, CD25, CD103, CD123, annexin A1 and BRAF V600E",
    "Lymphoplasmacytic lymphoma: IgM paraprotein and MYD88 L265P",
    "WHO-HAEM5 removed B-PLL and HCL variant as entities"
  ]
},
{
  id: "plasma-t",
  title: "Plasma cell neoplasms and mature T- and NK-cell neoplasms",
  minutes: 16,
  sources: ["imwg", "who5l", "iccl", "bmd"],
  video: "multiple myeloma IMWG criteria plasma cell flow cytometry Sezary ATLL",
  body: `
<h3>Plasma cell neoplasms</h3>
<p>Monoclonal plasma cells secrete a paraprotein (M protein) and can damage bone, kidney and marrow. The film may show rouleaux and a raised background stain; the ESR is high.</p>
<div class="tablewrap"><table class="t"><thead><tr><th>Entity</th><th>Criteria (IMWG)</th></tr></thead><tbody>
<tr><td>Non-IgM MGUS</td><td>M protein under 30 g/L, clonal marrow plasma cells under 10%, no myeloma-defining event or amyloidosis</td></tr>
<tr><td>Smouldering myeloma</td><td>M protein 30 g/L or more (or urinary 500 mg/24 h or more) and/or clonal plasma cells 10–59%, with no myeloma-defining event</td></tr>
<tr><td>Multiple myeloma</td><td>Clonal marrow plasma cells 10% or more, or a biopsy-proven plasmacytoma, plus at least one myeloma-defining event</td></tr>
</tbody></table></div>
<p><b>Myeloma-defining events</b> are CRAB features (Calcium over 2.75 mmol/L; Renal impairment with creatinine over 177 µmol/L or clearance under 40 mL/min; Anaemia with Hb under 100 g/L or 20 g/L below normal; Bone lytic lesions on imaging) or SLiM biomarkers (Sixty percent or more clonal plasma cells; serum free Light chain ratio 100 or more with the involved chain at least 100 mg/L; more than one focal lesion 5 mm or larger on MRI).</p>
<p>Flow cytometry: normal plasma cells are CD38 bright, CD138+, CD19+, CD45+, CD56−. Myeloma cells are typically CD19− and CD45 dim or negative, often CD56+, CD27− or CD81−, with CD117 or CD28 aberrancy and a single cytoplasmic light chain. Aspirate plasma cell percentages are often lower than the trephine because of haemodilution; report the higher figure and use CD138 immunohistochemistry.</p>
<p>High-risk cytogenetics (FISH on CD138-selected cells): t(4;14), t(14;16), t(14;20), del(17p) or <i>TP53</i> mutation, gain or amplification of 1q, and del(1p). t(11;14) is standard risk and predicts response to venetoclax.</p>
<p>Plasma cell leukaemia is now defined by 5% or more circulating plasma cells (previously 20%). WHO-HAEM5 also groups monoclonal gammopathy of renal significance and AL amyloidosis with the plasma cell neoplasms.</p>
<h3>Mature T- and NK-cell neoplasms in the blood</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>Entity</th><th>Cells</th><th>Phenotype</th><th>Clue</th></tr></thead><tbody>
<tr><td>T-prolymphocytic leukaemia</td><td>Medium cells, nucleolus, cytoplasmic blebs</td><td>CD4+ (or CD4+ CD8+), CD7 bright, TCL1+</td><td>inv(14)/t(14;14) <i>TCL1A</i>; very high WBC; ataxia telangiectasia</td></tr>
<tr><td>T-large granular lymphocytic leukaemia</td><td>LGLs with azurophil granules</td><td>CD3+ CD8+ CD57+ CD16+</td><td>Neutropenia, rheumatoid arthritis; <i>STAT3</i> mutation</td></tr>
<tr><td>Sézary syndrome</td><td>Cerebriform nuclei</td><td>CD4+, often CD7− and CD26−</td><td>Erythroderma, lymphadenopathy; 1 × 10⁹/L or more Sézary cells</td></tr>
<tr><td>Adult T-cell leukaemia/lymphoma</td><td>"Flower" cells with lobulated nuclei</td><td>CD4+ CD25 bright, CD7−</td><td>HTLV-1 (Japan, Caribbean); hypercalcaemia</td></tr>
<tr><td>Aggressive NK-cell leukaemia</td><td>Large granular cells</td><td>CD56+, surface CD3−</td><td>EBV positive; fulminant course</td></tr>
</tbody></table></div>
<p>Loss of a pan-T antigen (often CD7 or CD5) or a CD4:CD8 imbalance raises suspicion of a T-cell neoplasm; confirm clonality with TRBC1 flow or TCR gene rearrangement studies. Anaplastic large cell lymphoma (CD30+, with or without ALK) can occasionally appear in the blood as atypical "hallmark" cells.</p>
<h3>Hodgkin lymphoma and the marrow</h3>
<p>Classic Hodgkin lymphoma involves the marrow in about 5 to 10% of cases, as fibrosis with scattered CD30+ CD15+ Reed–Sternberg cells. WHO-HAEM5 renamed nodular lymphocyte-predominant Hodgkin lymphoma as nodular lymphocyte-predominant B-cell lymphoma in ICC; WHO-HAEM5 kept the old name.</p>
`,
  points: [
    "Myeloma: 10% or more clonal plasma cells (or plasmacytoma) plus a CRAB or SLiM event",
    "SLiM: 60% plasma cells, FLC ratio 100 or more, more than one MRI focal lesion",
    "Myeloma cells are CD38+ CD138+ and usually CD19− CD45− CD56+",
    "High-risk myeloma FISH: t(4;14), t(14;16), t(14;20), del(17p), 1q gain",
    "Plasma cell leukaemia: 5% or more circulating plasma cells",
    "T-cell clues: lost CD7 or CD5, CD4:CD8 imbalance; confirm with TRBC1 or TCR studies"
  ]
}
];

/* Atlas: drawn with drawCell. Fields: what, seen, tip; draw parameters as in data.js. */
const M3_CELLS = [
{ id:"m3-toxic", name:"Toxic granulation and Döhle bodies", group:"Reactive", sizeUm:13,
  what:"A neutrophil with coarse, dark granules and pale blue patches of rough endoplasmic reticulum at the cell edge.", seen:"Bacterial infection, sepsis, burns, G-CSF therapy, pregnancy.", tip:"Compare granule darkness with a normal neutrophil on the same film; thick films exaggerate it.",
  draw:{ r:6.6, cyto:"#efd3dd", nuc:{type:"lobes", n:3, lr:1.95, spread:2.7}, chrom:"clumped", gran:{color:"#5a1a5e", n:150, s:0.2}, dohle:2 } },
{ id:"m3-reactive", name:"Reactive lymphocyte", group:"Reactive", sizeUm:18,
  what:"A large lymphocyte with abundant pale blue cytoplasm that darkens at the edge where it touches red cells.", seen:"Infectious mononucleosis (EBV), CMV, toxoplasma, HIV seroconversion, hepatitis, drugs.", tip:"Reactive lymphocytes vary from cell to cell; a uniform population suggests a neoplasm.",
  draw:{ r:9.6, cyto:"#a7c3ea", nuc:{type:"oval", r:4.2, dx:-1.6, dy:-0.6, sx:1.1, sy:0.92}, chrom:"medium", irregular:0.09, halo:false } },
{ id:"m3-pelger", name:"Pelger–Huët neutrophil", group:"Reactive", sizeUm:12,
  what:"A neutrophil with two round lobes joined by a thin strand ('pince-nez') and coarse chromatin.", seen:"Inherited Pelger–Huët anomaly (LBR gene), or acquired pseudo-Pelger change in MDS and AML, and with some drugs.", tip:"Acquired forms are usually also hypogranular; inherited forms affect almost every neutrophil.",
  draw:{ r:6.2, cyto:"#efdbe3", nuc:{type:"lobes", n:2, lr:2.0, spread:2.3}, chrom:"clumped", gran:{color:"#c79bbd", n:60, s:0.13} } },
{ id:"m3-hypogran", name:"Hypogranular dysplastic neutrophil", group:"Dysplasia", sizeUm:12,
  what:"A neutrophil with pale, almost agranular cytoplasm and an abnormal, hypolobated nucleus.", seen:"Myelodysplastic neoplasms, AML-MR, CMML.", tip:"Count dysplasia in 10% or more of neutrophils; poorly stained films mimic it.",
  draw:{ r:6.2, cyto:"#efe5ea", nuc:{type:"kidney", r:3.2, indent:0.35, rot:40}, chrom:"clumped", gran:{color:"#d6b6cc", n:12, s:0.12} } },
{ id:"m3-micromeg", name:"Micromegakaryocyte", group:"Dysplasia", sizeUm:12,
  what:"A small megakaryocyte, the size of a promyelocyte or smaller, with a single round or bilobed nucleus and pink granular cytoplasm.", seen:"MDS (most reliable dysplastic feature), CML, MDS/MPN.", tip:"Look for budding platelets at the edge to confirm its lineage; CD61 helps on the trephine.",
  draw:{ r:6, cyto:"#dfc3da", nuc:{type:"round", r:3.0, dx:-0.6}, chrom:"clumped", gran:{color:"#a978a8", n:90, s:0.12}, plts:true, irregular:0.06 } },
{ id:"m3-myeloblast-auer", name:"Myeloblast with an Auer rod", group:"Acute myeloid", sizeUm:16,
  what:"A blast with fine chromatin, nucleoli and a rod-shaped, pink-red crystal of fused primary granules in the cytoplasm.", seen:"AML and MDS-IB2 (WHO). Auer rods prove myeloid lineage.", tip:"Auer rods are MPO positive; never seen in lymphoblasts.",
  draw:{ r:7.8, cyto:"#7d93cf", nuc:{type:"round", r:5.5, dx:-0.6}, chrom:"fine", nucleoli:2, gran:{color:"#8e2c6e", n:5, s:0.22}, auer:{n:1} } },
{ id:"m3-apl", name:"Hypergranular promyelocyte (APL)", group:"Acute myeloid", sizeUm:20,
  what:"An abnormal promyelocyte with a bilobed or folded nucleus, packed with dense red-purple granules that may hide the nucleus.", seen:"Acute promyelocytic leukaemia with PML::RARA.", tip:"Report as an emergency: check fibrinogen and clotting and advise immediate ATRA.",
  draw:{ r:9.8, cyto:"#a99ad0", nuc:{type:"lobes", n:2, lr:3.0, spread:2.0}, chrom:"fine", nucleoli:0, gran:{color:"#6d1356", n:240, s:0.36, over:true} } },
{ id:"m3-faggot", name:"Faggot cell", group:"Acute myeloid", sizeUm:20,
  what:"An APL promyelocyte containing bundles of many Auer rods, like a bundle of sticks.", seen:"Acute promyelocytic leukaemia (hypergranular and some microgranular forms).", tip:"Even one faggot cell should prompt urgent PML::RARA testing.",
  draw:{ r:9.6, cyto:"#a69ad0", nuc:{type:"lobes", n:2, lr:2.8, spread:2.2}, chrom:"fine", gran:{color:"#6d1356", n:70, s:0.3}, auer:{faggot:true} } },
{ id:"m3-cuplike", name:"Cuplike blast", group:"Acute myeloid", sizeUm:15,
  what:"A myeloblast with an invagination of the nucleus (a 'cup') that occupies a quarter or more of the nuclear diameter.", seen:"AML with NPM1 mutation, often with FLT3-ITD; usually CD34 negative.", tip:"A clue, not a diagnosis: confirm with NPM1 testing.",
  draw:{ r:7.5, cyto:"#8a9bd2", nuc:{type:"kidney", r:5.2, indent:0.55, rot:-90}, chrom:"fine", nucleoli:1 } },
{ id:"m3-monoblast", name:"Monoblast", group:"Acute myeloid", sizeUm:20,
  what:"A large blast with a round nucleus, lacy chromatin, one or more prominent nucleoli and abundant grey-blue cytoplasm with occasional vacuoles.", seen:"Acute monocytic and myelomonocytic leukaemia; KMT2A-rearranged AML.", tip:"Nonspecific esterase positive, MPO weak or negative. Look for gum infiltration and skin lesions.",
  draw:{ r:10, cyto:"#9aa3c8", nuc:{type:"round", r:6, dx:-0.8}, chrom:"lacy", nucleoli:1, vac:3, gran:{color:"#a35a92", n:12, s:0.1} } },
{ id:"m3-promono", name:"Promonocyte", group:"Acute myeloid", sizeUm:18,
  what:"A monocytic precursor with a delicately folded or grooved nucleus, fine chromatin and grey-blue cytoplasm with fine granules.", seen:"Acute monocytic leukaemia, CMML. Counts as a blast equivalent.", tip:"Separating promonocytes from abnormal monocytes is the hardest call in CMML; count them with blasts.",
  draw:{ r:9.2, cyto:"#a7abcf", nuc:{type:"kidney", r:5.3, indent:0.3, rot:20, wobble:0.12}, chrom:"lacy", grooves:2, gran:{color:"#a35a92", n:40, s:0.1} } },
{ id:"m3-megakaryoblast", name:"Megakaryoblast", group:"Acute myeloid", sizeUm:15,
  what:"A blast with deeply basophilic, agranular cytoplasm and cytoplasmic blebs or budding.", seen:"Acute megakaryoblastic leukaemia (Down syndrome-associated, RBM15::MRTFA in infants), CML blast phase.", tip:"Needs CD41 or CD61 to confirm; marrow fibrosis often gives a dry tap.",
  draw:{ r:7.4, cyto:"#4e65b0", nuc:{type:"round", r:5, dx:-0.4}, chrom:"fine", nucleoli:1, blebs:true, irregular:0.06 } },
{ id:"m3-lymphoblast", name:"Lymphoblast", group:"Acute lymphoid", sizeUm:12,
  what:"A small to medium blast with a high N:C ratio, fine chromatin, inconspicuous nucleoli and a thin rim of blue cytoplasm without granules.", seen:"B- and T-lymphoblastic leukaemia/lymphoma, CML lymphoid blast phase.", tip:"Morphology cannot tell B from T: flow cytometry is required.",
  draw:{ r:6, cyto:"#7f9fd8", nuc:{type:"round", r:5.1, dx:0.2}, chrom:"fine", nucleoli:1 } },
{ id:"m3-burkitt", name:"Burkitt lymphoma cell", group:"Mature B-cell", sizeUm:15,
  what:"A medium-sized cell with deeply basophilic cytoplasm containing sharply punched-out vacuoles.", seen:"Burkitt lymphoma/leukaemia (MYC rearrangement); formerly 'FAB L3'.", tip:"It is a mature B-cell neoplasm (sIg+, TdT−), not ALL; treat urgently and watch for tumour lysis.",
  draw:{ r:7.6, cyto:"#2f4fa3", nuc:{type:"round", r:4.8, dx:-0.5}, chrom:"medium", nucleoli:2, vac:9 } },
{ id:"m3-cll", name:"CLL lymphocyte", group:"Mature B-cell", sizeUm:9,
  what:"A small mature lymphocyte with a thin rim of cytoplasm and coarse, block-like chromatin ('soccer ball').", seen:"Chronic lymphocytic leukaemia and monoclonal B-cell lymphocytosis.", tip:"A monotonous population with smudge cells; prove it by flow (Matutes score).",
  draw:{ r:4.6, cyto:"#97b6e3", nuc:{type:"round", r:3.9, dx:0.2}, chrom:"checker" } },
{ id:"m3-smudge", name:"Smudge cell", group:"Mature B-cell", sizeUm:12,
  what:"A lymphocyte crushed while the film was spread, leaving bare, smeared nuclear chromatin.", seen:"Chronic lymphocytic leukaemia (CLL cells are fragile); occasionally other lymphocytoses.", tip:"Adding a drop of albumin before spreading preserves the cells for an accurate differential.",
  draw:{ r:6, cyto:"#a98cc2", nuc:{type:"round", r:4}, smudge:true } },
{ id:"m3-prolymph", name:"Prolymphocyte", group:"Mature B-cell", sizeUm:12,
  what:"A medium-sized lymphocyte with moderately condensed chromatin and a single prominent central nucleolus.", seen:"Prolymphocytic progression of CLL (over 15%), T-PLL, splenic B-cell lymphoma with prominent nucleoli.", tip:"Its nucleolus stands out against mature chromatin, unlike a blast.",
  draw:{ r:6.2, cyto:"#98b4e2", nuc:{type:"round", r:4.3, dx:-0.3}, chrom:"medium", nucleoli:1 } },
{ id:"m3-hairy", name:"Hairy cell", group:"Mature B-cell", sizeUm:14,
  what:"A lymphoid cell with an oval or bean-shaped nucleus and pale grey-blue cytoplasm with fine, irregular hair-like projections.", seen:"Hairy cell leukaemia (BRAF V600E).", tip:"Few in the blood; pancytopenia with monocytopenia is the clue. Confirm with CD11c, CD25, CD103, CD123.",
  draw:{ r:7.3, cyto:"#b7c2dd", nuc:{type:"kidney", r:3.6, indent:0.25, dx:-0.4, rot:15}, chrom:"medium", hairs:22, irregular:0.12 } },
{ id:"m3-villous", name:"Villous lymphocyte", group:"Mature B-cell", sizeUm:12,
  what:"A lymphocyte with short villi concentrated at one or both poles of the cell.", seen:"Splenic marginal zone lymphoma.", tip:"Villi are polar and short, unlike the circumferential 'hairs' of hairy cell leukaemia.",
  draw:{ r:6.2, cyto:"#9fb8e0", nuc:{type:"round", r:3.6, dx:-0.6}, chrom:"clumped", villi:7 } },
{ id:"m3-cleaved", name:"Cleaved follicular lymphoma cell", group:"Mature B-cell", sizeUm:9,
  what:"A small lymphocyte with scanty cytoplasm and a deep nuclear cleft ('buttock cell').", seen:"Follicular lymphoma (CD10+, BCL2+, t(14;18)).", tip:"Cleaved cells alone are not diagnostic; correlate with phenotype.",
  draw:{ r:4.6, cyto:"#9fb8e2", nuc:{type:"oval", r:3.9, sx:1.1, sy:0.9}, chrom:"medium", grooves:1 } },
{ id:"m3-myeloma", name:"Myeloma plasma cells", group:"Plasma and T-cell", sizeUm:20,
  what:"A binucleate plasma cell with immature chromatin and a nucleolus, deep blue cytoplasm and a perinuclear clear zone.", seen:"Plasma cell myeloma, plasma cell leukaemia.", tip:"Aspirate percentages underestimate disease; correlate with CD138 on the trephine.",
  draw:{ r:10, sx:1.2, sy:0.88, cyto:"#2f4a9a", nuc:{type:"multi", n:2, r:3.5, spread:2.4, dx:2.4}, chrom:"medium", nucleoli:1 } },
{ id:"m3-sezary", name:"Sézary cell", group:"Plasma and T-cell", sizeUm:12,
  what:"A lymphocyte with a convoluted, 'cerebriform' nucleus folded like a brain, and scanty cytoplasm.", seen:"Sézary syndrome and mycosis fungoides with blood involvement.", tip:"Small numbers occur in reactive skin disease; diagnosis needs a clone and the right clinical picture.",
  draw:{ r:6.2, cyto:"#a8bde2", nuc:{type:"oval", r:4.9, sx:1.08, sy:0.95, wobble:0.12}, chrom:"medium", grooves:5 } },
{ id:"m3-flower", name:"Flower cell", group:"Plasma and T-cell", sizeUm:13,
  what:"A lymphocyte with a polylobated nucleus, the lobes arranged like the petals of a flower.", seen:"Adult T-cell leukaemia/lymphoma (HTLV-1).", tip:"Check HTLV-1 serology and calcium.",
  draw:{ r:6.6, cyto:"#a9bfe3", nuc:{type:"flower", n:6, lr:1.6, spread:2.5}, chrom:"clumped" } },
{ id:"m3-lgl", name:"Large granular lymphocyte (T-LGL)", group:"Plasma and T-cell", sizeUm:15,
  what:"A large lymphocyte with abundant pale cytoplasm containing a few coarse azurophilic granules.", seen:"T-cell large granular lymphocytic leukaemia (clonal, often over 2 × 10⁹/L), and reactive LGL expansions.", tip:"Clonality needs TRBC1 flow or TCR studies; ask about neutropenia and rheumatoid arthritis.",
  draw:{ r:7.6, cyto:"#b0c8ea", nuc:{type:"round", r:3.5, dx:-1.8, dy:0.6}, chrom:"clumped", gran:{color:"#8e2c6e", n:14, s:0.36} } }
];

const M3_LESSON_CELLS = {
  reactive: ["m3-toxic", "m3-reactive", "m3-pelger", "m3-lgl"],
  flow: ["m3-myeloblast-auer", "m3-lymphoblast", "m3-cll", "m3-myeloma"],
  aml: ["m3-myeloblast-auer", "m3-apl", "m3-faggot", "m3-cuplike", "m3-monoblast", "m3-promono", "m3-megakaryoblast"],
  all: ["m3-lymphoblast", "m3-burkitt", "m3-myeloblast-auer"],
  mpn: ["m3-micromeg", "m3-toxic", "m3-promono"],
  mds: ["m3-hypogran", "m3-pelger", "m3-micromeg", "m3-promono"],
  bcell: ["m3-cll", "m3-smudge", "m3-prolymph", "m3-hairy", "m3-villous", "m3-cleaved", "m3-burkitt"],
  "plasma-t": ["m3-myeloma", "m3-sezary", "m3-flower", "m3-lgl"]
};

const M3_FACTS = [
  ["Which features favour a leukaemoid reaction over CML?", "Toxic granulation, no basophilia, neutrophils and bands dominating, normal spleen, BCR::ABL1 negative."],
  ["What is a Döhle body?", "A pale blue patch of rough endoplasmic reticulum at the edge of a neutrophil; seen in infection and May–Hegglin anomaly."],
  ["What does a leucoerythroblastic film suggest?", "Marrow infiltration or fibrosis (also severe stress or haemorrhage)."],
  ["Which antigen is brightest on lymphocytes and absent from red cell precursors?", "CD45."],
  ["Where do blasts fall on a CD45/SSC plot?", "CD45 dim, low to intermediate side scatter."],
  ["What is the lineage-defining marker for T lineage?", "Cytoplasmic (or surface) CD3."],
  ["What defines myeloid lineage in MPAL?", "MPO positivity, or monocytic differentiation with two or more of NSE, CD11c, CD14, CD64 and lysozyme."],
  ["What κ:λ ratio suggests a clonal B-cell population?", "Above about 3:1 or below about 1:2 (or absent surface light chain)."],
  ["Which cells count as blast equivalents in AML?", "Promonocytes, and abnormal promyelocytes in APL."],
  ["In WHO-HAEM5, which AML genetic types still need 20% blasts?", "AML with BCR::ABL1 and AML with CEBPA mutation."],
  ["What blast threshold does ICC use for AML with recurrent genetic abnormalities?", "10% (20% for BCR::ABL1)."],
  ["What is MDS/AML in ICC 2022?", "A myeloid neoplasm with 10–19% blasts and no AML-defining genetic abnormality."],
  ["How is AML-MR defined in WHO-HAEM5?", "20% or more blasts with myelodysplasia-related cytogenetics or mutations in ASXL1, BCOR, EZH2, SF3B1, SRSF2, STAG2, U2AF1 or ZRSR2."],
  ["What is the typical phenotype of APL?", "CD34−, HLA-DR−, CD33 bright, CD117+, CD11b−, MPO strong."],
  ["What is the first treatment step when APL is suspected?", "Start ATRA immediately and correct the coagulopathy (fibrinogen, platelets)."],
  ["What nuclear shape suggests NPM1-mutated AML?", "Cuplike nuclei (an invagination of a quarter or more of the nucleus)."],
  ["Which ELN 2022 group includes TP53 mutation?", "Adverse risk."],
  ["Which gene fusions define core binding factor AML?", "RUNX1::RUNX1T1 [t(8;21)] and CBFB::MYH11 [inv(16)]."],
  ["Which childhood B-ALL subtypes are favourable?", "High hyperdiploidy and ETV6::RUNX1."],
  ["What is typical of infant KMT2A-rearranged B-ALL phenotype?", "CD10 negative (pro-B), often CD15 positive."],
  ["Define ETP-ALL.", "T-ALL with CD1a−, CD8−, weak CD5 and at least one stem or myeloid marker (CD34, CD117, HLA-DR, CD13, CD33, CD11b, CD65)."],
  ["What is the strongest prognostic factor in ALL?", "MRD at the end of induction."],
  ["Which CML phases does WHO-HAEM5 recognise?", "Chronic phase and blast phase (accelerated phase dropped)."],
  ["What defines CML blast phase?", "20% or more blasts in blood or marrow, extramedullary blast proliferation, or increased lymphoblasts (WHO-HAEM5)."],
  ["What is a major molecular response in CML?", "BCR::ABL1 0.1% or less on the International Scale."],
  ["What proportion of PV carries JAK2 V617F?", "About 95%; most of the rest have JAK2 exon 12 mutations."],
  ["Which driver is present in 20–25% of ET?", "CALR exon 9 mutation."],
  ["What is the minor criterion for PV?", "Subnormal serum erythropoietin."],
  ["What separates prefibrotic PMF from ET?", "Trephine morphology: clustered, atypical megakaryocytes with hypercellularity and granulocytic proliferation in PMF."],
  ["Which fusion gene in hypereosinophilia responds to imatinib?", "FIP1L1::PDGFRA (and PDGFRB rearrangements)."],
  ["Which dysplastic feature is most reliable for MDS?", "Micromegakaryocytes."],
  ["What blast ranges define MDS-IB1 and MDS-IB2?", "IB1: 5–9% marrow or 2–4% blood. IB2: 10–19% marrow, 5–19% blood, or Auer rods."],
  ["What defines MDS-SF3B1 in WHO-HAEM5?", "SF3B1 VAF 5% or more (or 15% ring sideroblasts), low blasts, no del(5q), −7 or complex karyotype."],
  ["What is CHIP?", "A somatic myeloid mutation at VAF 2% or more with normal blood counts and no haematological neoplasm."],
  ["What monocyte count does WHO-HAEM5 need for CMML?", "0.5 × 10⁹/L or more and 10% or more of white cells, persistent."],
  ["What separates MD-CMML from MP-CMML?", "WBC under 13 × 10⁹/L is myelodysplastic; 13 or more is myeloproliferative."],
  ["What count separates CLL from MBL?", "5 × 10⁹/L clonal B cells with the CLL phenotype."],
  ["What does the Matutes score include?", "CD5+, CD23+, FMC7−, weak sIg, weak CD22 or CD79b: one point each."],
  ["Which test is essential before treating CLL?", "TP53 mutation and del(17p) (plus IGHV status)."],
  ["What phenotype suggests mantle cell lymphoma?", "CD5+, CD23− or weak, CD200−, bright sIg; confirm cyclin D1/SOX11 or t(11;14)."],
  ["Which antigens define hairy cell leukaemia?", "CD11c, CD25, CD103, CD123 and annexin A1; BRAF V600E."],
  ["Which mutation is found in over 90% of lymphoplasmacytic lymphoma?", "MYD88 L265P."],
  ["What are the SLiM criteria in myeloma?", "60% or more clonal plasma cells, FLC ratio 100 or more (involved FLC 100 mg/L or more), more than one MRI focal lesion."],
  ["What phenotype separates myeloma from normal plasma cells?", "Myeloma: CD19−, CD45− or dim, CD56+, CD27−/CD81−; normal: CD19+, CD45+, CD56−."],
  ["Which myeloma translocation predicts venetoclax response?", "t(11;14)."],
  ["What defines plasma cell leukaemia now?", "5% or more circulating plasma cells."],
  ["What phenotype is typical of adult T-cell leukaemia/lymphoma?", "CD4+, CD25 bright, CD7−, HTLV-1 positive."],
  ["What phenotype is typical of T-LGL leukaemia?", "CD3+, CD8+, CD57+, CD16+, often with STAT3 mutation."]
];

const M3_QUIZ = [
{ q:"A 45-year-old man with pneumonia has WBC 62 × 10⁹/L with neutrophils, bands and a few myelocytes, toxic granulation and Döhle bodies. Basophils are 0.1 × 10⁹/L. What is the most likely diagnosis?", a:["Chronic myeloid leukaemia","Leukaemoid reaction","Chronic neutrophilic leukaemia","CMML"], c:1,
  e:"Toxic changes, no basophilia and an infective cause point to a leukaemoid reaction. If doubt remains, test BCR::ABL1." },
{ q:"On a CD45/SSC plot, where do myeloblasts usually fall?", a:["CD45 bright, SSC low","CD45 dim, SSC low to intermediate","CD45 negative, SSC low","CD45 moderate, SSC high"], c:1,
  e:"Blasts are CD45 dim with low side scatter: the 'blast gate'. CD45 bright and SSC low is lymphocytes; CD45 negative is erythroid." },
{ q:"Which marker defines T lineage in a mixed-phenotype acute leukaemia?", a:["CD7","CD5","Cytoplasmic CD3","CD2"], c:2,
  e:"CD7, CD5 and CD2 are not lineage-specific; strong cytoplasmic or surface CD3 is required." },
{ q:"A marrow has 12% myeloblasts and the karyotype shows inv(16)(p13.1q22). How is it classified?", a:["MDS-IB2 in both systems","AML with CBFB::MYH11 in both WHO-HAEM5 and ICC","MDS/AML (ICC) only","AML, NOS"], c:1,
  e:"WHO-HAEM5 needs no blast minimum for CBFB::MYH11 and ICC needs 10% or more, so both classify it as AML." },
{ q:"A marrow has 14% blasts, no defining genetic abnormality and an ASXL1 mutation. How does ICC 2022 classify it?", a:["AML-MR","MDS with excess blasts","MDS/AML with mutated ASXL1 (MR gene mutation)","CMML-2"], c:2,
  e:"ICC classifies 10–19% blasts without AML-defining genetics as MDS/AML, qualified by the MR gene mutation. WHO-HAEM5 would call it MDS-IB2." },
{ q:"A 30-year-old woman has bruising, WBC 2.1 × 10⁹/L, fibrinogen 0.8 g/L and blasts with bilobed nuclei and heavy granules. What should happen first?", a:["Wait for PML::RARA confirmation","Start ATRA immediately and replace fibrinogen and platelets","Bone marrow trephine","Start hydroxycarbamide"], c:1,
  e:"Suspected APL is an emergency: early death is from haemorrhage. Start ATRA on morphological suspicion." },
{ q:"Which phenotype is most typical of APL?", a:["CD34+ HLA-DR+ CD11b+","CD34− HLA-DR− CD33 bright CD117+","CD14+ CD64+ CD11b+","CD19+ CD10+ TdT+"], c:1,
  e:"APL blasts are characteristically CD34 and HLA-DR negative with bright CD33. Microgranular APL can be CD34 and CD2 positive." },
{ q:"Which B-ALL genetic subtype carries the poorest prognosis?", a:["High hyperdiploidy","ETV6::RUNX1","TCF3::HLF","DUX4-rearranged"], c:2,
  e:"TCF3::HLF B-ALL has a very poor outcome. High hyperdiploidy, ETV6::RUNX1 and DUX4 are favourable." },
{ q:"A T-ALL is CD1a−, CD8−, CD5 weak in 40% of blasts, CD34+ and CD117+. What is it?", a:["Cortical T-ALL","Early T-precursor ALL","MPAL T/myeloid","Mature T-cell lymphoma"], c:1,
  e:"These are the ETP-ALL criteria. It is not MPAL because MPO is not mentioned and CD117 alone does not assign myeloid lineage." },
{ q:"A JAK2 V617F-positive patient has platelets 720 × 10⁹/L, Hb 138 g/L and a trephine with clustered, atypical, hyperchromatic megakaryocytes and grade 1 reticulin. What is the best diagnosis?", a:["Essential thrombocythaemia","Prefibrotic primary myelofibrosis","Polycythaemia vera","CML"], c:1,
  e:"Atypical, clustered megakaryocytes with grade 0–1 fibrosis define prefibrotic PMF. ET megakaryocytes are large and hyperlobulated, with no atypia." },
{ q:"In WHO-HAEM5, a CML patient with 12% blasts in the blood is in which phase?", a:["Accelerated phase","Chronic phase with high-risk features","Blast phase","MDS/MPN"], c:1,
  e:"WHO-HAEM5 removed accelerated phase; blast phase needs 20% blasts. ICC would call this accelerated phase." },
{ q:"A marrow shows 7% blasts, multilineage dysplasia and a normal karyotype. Blood blasts are 1%. What is the WHO-HAEM5 diagnosis?", a:["MDS-LB","MDS-IB1","MDS-IB2","AML"], c:1,
  e:"5–9% marrow blasts is MDS-IB1. ICC would call this MDS with excess blasts." },
{ q:"Which is the most reliable dysplastic feature for MDS?", a:["Giant platelets","Micromegakaryocytes","Megaloblastoid erythroblasts","Toxic granulation"], c:1,
  e:"Micromegakaryocytes are rarely seen outside myeloid neoplasms. Megaloblastoid change also occurs in B12 deficiency." },
{ q:"WBC 15 × 10⁹/L with monocytes 3.2 × 10⁹/L (21%), 2% blood blasts, 6% marrow blasts and no BCR::ABL1. What is the diagnosis?", a:["MD-CMML-1","MP-CMML-1","MP-CMML-2","AML with monocytic differentiation"], c:1,
  e:"WBC 13 or more makes it myeloproliferative; blasts under 5% blood and under 10% marrow make it CMML-1." },
{ q:"A 68-year-old has lymphocytes 18 × 10⁹/L, CD5+, CD23+, FMC7−, weak sIgλ and weak CD79b. What is the Matutes score?", a:["3","4","5","2"], c:2,
  e:"All five features score: CD5+, CD23+, FMC7−, weak sIg and weak CD79b. A score of 5 supports CLL." },
{ q:"Clonal B cells are CD5+, CD23−, CD200−, FMC7+ with bright sIg. What test is essential next?", a:["BRAF V600E","Cyclin D1 or t(11;14) FISH","MYD88 L265P","JAK2 V617F"], c:1,
  e:"A CD5-positive B-cell neoplasm with a low CLL score must be tested for mantle cell lymphoma." },
{ q:"Pancytopenia, monocytopenia, splenomegaly and a dry tap. Flow shows CD11c+, CD25+, CD103+, CD123 bright B cells. Which mutation is expected?", a:["MYD88 L265P","BRAF V600E","NOTCH1","SF3B1"], c:1,
  e:"Classic hairy cell leukaemia carries BRAF V600E in nearly all cases." },
{ q:"A patient has 35% clonal marrow plasma cells, M protein 28 g/L, normal calcium, creatinine and Hb, no bone lesions, and an FLC ratio of 140 (involved 600 mg/L). What is the diagnosis?", a:["MGUS","Smouldering myeloma","Multiple myeloma","Plasma cell leukaemia"], c:2,
  e:"An FLC ratio of 100 or more with involved FLC 100 mg/L or more is a SLiM myeloma-defining event, so this is myeloma even without CRAB." },
{ q:"Which phenotype is typical of myeloma plasma cells?", a:["CD19+ CD45+ CD56−","CD19− CD45− CD56+","CD19+ CD5+ CD23+","CD3+ CD4+"], c:1,
  e:"Neoplastic plasma cells typically lose CD19 and CD45 and gain CD56." },
{ q:"A Caribbean-born man has hypercalcaemia, skin lesions and lymphocytes with polylobated 'flower' nuclei that are CD4+ CD25 bright CD7−. What is the diagnosis?", a:["Sézary syndrome","Adult T-cell leukaemia/lymphoma","T-PLL","T-LGL leukaemia"], c:1,
  e:"Flower cells, hypercalcaemia and a CD25-bright CD4 phenotype point to HTLV-1-associated ATLL." }
];

const M3_CASES = [
{
  id:"m3-apl", title:"Bruising and bleeding gums", tag:"Acute myeloid leukaemia",
  stem:"A 34-year-old man has 5 days of bruising and bleeding gums. He looks pale.",
  data:[["Hb","82 g/L"],["WBC","1.8 × 10⁹/L"],["Platelets","22 × 10⁹/L"],["PT","19 s"],["Fibrinogen","0.7 g/L"],["D-dimer","Markedly raised"]],
  steps:[
    { q:"The film shows a few large cells with bilobed nuclei, heavy granules and one cell with many Auer rods. What is the most likely diagnosis?", opts:["AML with maturation","Acute promyelocytic leukaemia","Acute monocytic leukaemia","Severe sepsis with DIC"], c:1,
      fb:"Hypergranular abnormal promyelocytes, a faggot cell and DIC with low fibrinogen are classic for APL." },
    { q:"What is the most urgent action?", opts:["Await PML::RARA RT-PCR","Start ATRA now and give cryoprecipitate and platelets","Insert a central line for chemotherapy","Perform a lumbar puncture"], c:1,
      fb:"Early haemorrhagic death is the main risk. Start ATRA on suspicion, keep fibrinogen above 1.5 g/L and platelets above 30–50 × 10⁹/L, and avoid invasive procedures." },
    { q:"Flow cytometry is most likely to show:", opts:["CD34+ HLA-DR+ CD11b+","CD34− HLA-DR− CD33 bright CD117+ MPO strong","CD14+ CD64+ CD36+","CD19+ CD10+ TdT+"], c:1,
      fb:"This is the typical APL phenotype. Confirmation is by PML::RARA (FISH or RT-PCR), which also gives a baseline for molecular MRD." },
    { q:"Day 10 of ATRA plus arsenic: he becomes breathless with fever, weight gain and lung infiltrates. What is this?", opts:["Pneumocystis pneumonia","Differentiation syndrome","Transfusion reaction","Leukostasis from AML relapse"], c:1,
      fb:"Differentiation syndrome. Start dexamethasone promptly and consider pausing ATRA or arsenic if severe." }
  ],
  teach:["APL is an emergency because of coagulopathy, not because of the blast count","Start ATRA on morphology; confirm PML::RARA later","ATRA plus arsenic trioxide cures most low and intermediate-risk patients","Watch for differentiation syndrome and QT prolongation with arsenic"]
},
{
  id:"m3-cll", title:"Lymphocytosis at a routine check", tag:"Mature B-cell neoplasm",
  stem:"A 71-year-old woman has a routine blood count. She feels well and has no lymphadenopathy or splenomegaly.",
  data:[["Hb","128 g/L"],["WBC","24 × 10⁹/L"],["Lymphocytes","19 × 10⁹/L"],["Platelets","210 × 10⁹/L"]],
  steps:[
    { q:"The film shows small, uniform lymphocytes with coarse chromatin and many smudge cells. What is the next test?", opts:["Bone marrow aspirate","Peripheral blood flow cytometry","CT scan","EBV serology"], c:1,
      fb:"Peripheral blood flow cytometry is the diagnostic test. A marrow is not needed to diagnose CLL." },
    { q:"Flow shows a κ-restricted B-cell clone that is CD5+, CD23+, CD200+, FMC7−, with weak CD20 and CD79b. What is the diagnosis?", opts:["Mantle cell lymphoma","CLL (Matutes score 5)","Marginal zone lymphoma","Monoclonal B-cell lymphocytosis"], c:1,
      fb:"Clonal B cells well above 5 × 10⁹/L with a classic phenotype make this CLL. Stage: Binet A / Rai 0." },
    { q:"What is the right management now?", opts:["Start ibrutinib","Watch and wait with regular monitoring","FCR chemotherapy","Allogeneic transplant"], c:1,
      fb:"Early asymptomatic CLL is monitored. Treat only for active disease (iwCLL criteria): progressive marrow failure, bulky or symptomatic nodes or spleen, rapid doubling time, B symptoms or autoimmune cytopenias not responding to steroids." },
    { q:"Two years later she needs treatment. Which test must be done before choosing therapy?", opts:["CD38","TP53 mutation and del(17p) FISH, plus IGHV status","JAK2","Cyclin D1"], c:1,
      fb:"TP53 aberrations predict chemotherapy failure and steer treatment to BTK or BCL2 inhibitors. IGHV status also guides treatment." }
  ],
  teach:["CLL is diagnosed on blood flow cytometry","Under 5 × 10⁹/L clonal B cells without other features is MBL","Most early CLL needs no treatment","Repeat TP53 testing before every new line of therapy"]
},
{
  id:"m3-cml", title:"Left upper quadrant fullness", tag:"Myeloproliferative neoplasm",
  stem:"A 48-year-old man has weight loss and fullness under the left ribs. His spleen is 10 cm below the costal margin.",
  data:[["Hb","112 g/L"],["WBC","186 × 10⁹/L"],["Basophils","7 × 10⁹/L"],["Platelets","640 × 10⁹/L"],["Blood blasts","3%"]],
  steps:[
    { q:"The film shows neutrophils and myelocytes in two peaks, basophilia and eosinophilia. What is the key diagnostic test?", opts:["JAK2 V617F","BCR::ABL1 by FISH or RT-PCR (and karyotype)","Flow cytometry","CALR"], c:1,
      fb:"This is the film of CML. Karyotype shows t(9;22) and any additional abnormalities; RT-PCR identifies the transcript type (e13a2/e14a2) for monitoring." },
    { q:"How does WHO-HAEM5 classify his phase?", opts:["Accelerated phase","Chronic phase","Blast phase","Cannot be decided without a marrow"], c:1,
      fb:"Blasts are under 20% with no extramedullary blast disease or lymphoblasts, so this is chronic phase. Note the large spleen and basophilia as high-risk features." },
    { q:"After 12 months of imatinib, BCR::ABL1 is 0.05% IS. What does this mean?", opts:["Treatment failure","Major molecular response","Complete cytogenetic response only","Relapse"], c:1,
      fb:"0.1% IS or lower is a major molecular response, an optimal response at 12 months (ELN)." }
  ],
  teach:["Basophilia and a myelocyte peak point to CML rather than a reaction","WHO-HAEM5 has only chronic and blast phases","Monitor by RT-qPCR on the International Scale","Rising BCR::ABL1: check adherence and ABL1 kinase domain mutations"]
},
{
  id:"m3-ball", title:"A child with bone pain", tag:"Acute lymphoblastic leukaemia",
  stem:"A 4-year-old boy has 3 weeks of leg pain, pallor and fever. He has a few enlarged neck nodes and a palpable liver and spleen.",
  data:[["Hb","68 g/L"],["WBC","32 × 10⁹/L"],["Platelets","18 × 10⁹/L"],["Blasts (film)","74%"],["LDH","1100 U/L"]],
  steps:[
    { q:"The blasts are small with scant cytoplasm, no granules and no Auer rods. What is the key next test?", opts:["Cytochemistry for MPO only","Flow cytometry immunophenotyping","Lymph node biopsy","Bone scan"], c:1,
      fb:"Flow cytometry confirms lineage and gives the leukaemia-associated phenotype used later for MRD." },
    { q:"Blasts are CD19+, CD79a+, cCD22+, CD10+, TdT+, CD34+, MPO−, cCD3−. What is the diagnosis?", opts:["T-ALL","B-lymphoblastic leukaemia","MPAL B/myeloid","Burkitt leukaemia"], c:1,
      fb:"This is a common (CD10-positive) precursor B-ALL. Burkitt cells are TdT negative with surface light chain." },
    { q:"Which genetic finding would most favour a good prognosis?", opts:["KMT2A::AFF1","ETV6::RUNX1","Low hypodiploidy","iAMP21"], c:1,
      fb:"ETV6::RUNX1 and high hyperdiploidy are the favourable childhood subtypes." },
    { q:"What is the single most important predictor of outcome after induction?", opts:["Initial WBC","MRD at the end of induction","Age","Sex"], c:1,
      fb:"End-of-induction MRD (flow or IG/TR PCR) guides treatment intensity in modern protocols." }
  ],
  teach:["Morphology cannot distinguish B-ALL from T-ALL","Hematogones share the B-precursor phenotype but mature in an orderly way","Genetics and MRD together set risk group","Watch for tumour lysis syndrome at diagnosis"]
},
{
  id:"m3-myeloma", title:"Back pain and kidney failure", tag:"Plasma cell neoplasm",
  stem:"A 66-year-old man has 3 months of back pain and tiredness. His GP found kidney impairment.",
  data:[["Hb","92 g/L"],["Calcium (adj.)","2.9 mmol/L"],["Creatinine","240 µmol/L"],["Total protein","98 g/L"],["ESR","110 mm/h"]],
  steps:[
    { q:"The blood film shows marked rouleaux. Which tests best confirm a paraprotein?", opts:["Serum protein electrophoresis with immunofixation and serum free light chains","Coombs test","Bone scan","Urine dipstick for protein"], c:0,
      fb:"SPEP, immunofixation and serum FLC together detect nearly all myelomas. A urine dipstick misses free light chains." },
    { q:"IgG κ paraprotein 46 g/L, κ:λ FLC ratio 85, marrow 38% plasma cells, lytic lesions on whole-body low-dose CT. Does he meet criteria for myeloma?", opts:["No, this is smouldering myeloma","Yes: clonal plasma cells 10% or more plus CRAB features","No, he needs a plasmacytoma biopsy","Only if the FLC ratio is over 100"], c:1,
      fb:"He has hypercalcaemia, renal impairment, anaemia and bone lesions, any one of which is a myeloma-defining event." },
    { q:"Which flow phenotype supports neoplastic plasma cells?", opts:["CD38+ CD138+ CD19+ CD45+ CD56−","CD38+ CD138+ CD19− CD45− CD56+","CD5+ CD23+","CD34+ CD117+"], c:1,
      fb:"Loss of CD19 and CD45 with CD56 gain is typical of myeloma, with a single cytoplasmic light chain." },
    { q:"Which FISH result is high-risk?", opts:["t(11;14)","Hyperdiploidy","t(4;14) or del(17p)","del(13q) alone"], c:2,
      fb:"t(4;14), t(14;16), t(14;20), del(17p) and 1q gain are high-risk. t(11;14) is standard risk but predicts venetoclax response." }
  ],
  teach:["Rouleaux and a high ESR with renal failure: think myeloma","Use SPEP, immunofixation and serum FLC together","Aspirate plasma cell counts underestimate disease; check CD138 on the trephine","Treat hypercalcaemia and renal impairment urgently"]
}
];

const M3_TREES = [
{ id:"lineage", title:"Acute leukaemia lineage", intro:"Use once blasts are confirmed. Each question uses flow cytometry or cytochemistry results.",
  nodes:{
  start:{ q:"Is there a defining genetic abnormality (e.g. PML::RARA, RUNX1::RUNX1T1, CBFB::MYH11, NPM1, KMT2A, BCR::ABL1)?", opts:[["Yes","gen"],["No or not yet known","mpo"]] },
  gen:{ end:"Name by the genetic abnormality", detail:"Genetics take priority, for example 'AML with NPM1 mutation' or 'MPAL with BCR::ABL1'. Check the blast threshold for each system (WHO-HAEM5 or ICC)." },
  mpo:{ q:"Is MPO positive (cytochemistry or flow), or are Auer rods present?", opts:[["Yes","mpo2"],["No","mono"]] },
  mpo2:{ q:"Do the blasts also meet T criteria (strong cCD3) or B criteria (strong CD19 with CD79a, cCD22 or CD10)?", opts:[["Yes","mpal"],["No","aml"]] },
  mpal:{ end:"Mixed-phenotype acute leukaemia", detail:"MPAL B/myeloid or T/myeloid. Exclude AML with a defining genetic lesion and CML in blast phase first." },
  aml:{ end:"Acute myeloid leukaemia", detail:"Classify by genetics (karyotype, FISH, NGS: NPM1, FLT3, CEBPA, TP53, MR genes), otherwise by differentiation." },
  mono:{ q:"Monocytic markers: two or more of NSE, CD11c, CD14, CD64, lysozyme?", opts:[["Yes","monoaml"],["No","cd3"]] },
  monoaml:{ end:"AML with monocytic differentiation", detail:"Acute monocytic or myelomonocytic leukaemia. Count promonocytes as blasts. Check KMT2A and NPM1." },
  cd3:{ q:"Is cytoplasmic CD3 strongly positive?", opts:[["Yes","tall"],["No","cd19"]] },
  tall:{ q:"Is it CD1a−, CD8−, CD5 weak, with CD34, CD117, HLA-DR, CD13, CD33, CD11b or CD65?", opts:[["Yes","etp"],["No","tall2"]] },
  etp:{ end:"Early T-precursor lymphoblastic leukaemia", detail:"ETP-ALL. Often has myeloid-type mutations (FLT3, RAS, DNMT3A). Watch MRD closely." },
  tall2:{ end:"T-lymphoblastic leukaemia/lymphoma", detail:"Stage by CD1a, surface CD3, CD4 and CD8. Image the mediastinum." },
  cd19:{ q:"Is CD19 positive with CD79a, cCD22 or CD10?", opts:[["Yes","ball"],["No","other"]] },
  ball:{ q:"Is TdT or CD34 positive, with no surface light chain?", opts:[["Yes","ball2"],["No: TdT− with surface light chain","burkitt"]] },
  ball2:{ end:"B-lymphoblastic leukaemia/lymphoma", detail:"Send karyotype, FISH (BCR::ABL1, KMT2A, ETV6::RUNX1, iAMP21) and ploidy. Exclude hematogones by maturation pattern." },
  burkitt:{ end:"Mature B-cell neoplasm (e.g. Burkitt leukaemia)", detail:"Check MYC rearrangement, Ki-67, BCL2. Not ALL: treat as Burkitt lymphoma." },
  other:{ q:"Do the blasts express CD41/CD61 or CD71/CD235a?", opts:[["CD41 or CD61","mk"],["CD71 or CD235a, bright","ery"],["Neither","aul"]] },
  mk:{ end:"Acute megakaryoblastic leukaemia", detail:"Consider Down syndrome, RBM15::MRTFA (infants) and CML blast phase. A trephine may be needed (fibrosis)." },
  ery:{ end:"Acute erythroid leukaemia (pure erythroid)", detail:"WHO-HAEM5: erythroid cells 80% or more with 30% or more proerythroblasts. Usually TP53 mutated, very poor prognosis." },
  aul:{ end:"Acute undifferentiated leukaemia", detail:"No lineage-specific markers. Exclude rare entities (blastic plasmacytoid dendritic cell neoplasm: CD123, CD4, CD56, TCF4)." }
  }},
{ id:"bcell", title:"Mature B-cell phenotype", intro:"Use for a clonal (light chain-restricted) B-cell population in blood or marrow.",
  nodes:{
  start:{ q:"Is the clone CD5 positive?", opts:[["Yes","cd5"],["No","cd10"]] },
  cd5:{ q:"Matutes score (CD5+, CD23+, FMC7−, weak sIg, weak CD79b/CD22)?", opts:[["4 or 5","cll"],["3 or less","mcl"]] },
  cll:{ q:"Are clonal B cells 5 × 10⁹/L or more, or are there nodes, organomegaly or cytopenias?", opts:[["Yes","cll2"],["No","mbl"]] },
  cll2:{ end:"CLL/SLL", detail:"Stage (Binet or Rai). Before treatment: TP53 mutation, del(17p), IGHV status." },
  mbl:{ end:"Monoclonal B-cell lymphocytosis (CLL type)", detail:"Low-count (under 0.5 × 10⁹/L) or CLL-type MBL. Repeat counts; progression to CLL is about 1–2% a year." },
  mcl:{ end:"Probable mantle cell lymphoma: test cyclin D1/SOX11 or t(11;14)", detail:"CD200 negative and bright sIg support MCL. If cyclin D1 negative, consider atypical CLL or CD5+ marginal zone lymphoma." },
  cd10:{ q:"Is the clone CD10 positive?", opts:[["Yes","gcb"],["No","hcl"]] },
  gcb:{ q:"Very high proliferation, vacuolated blue cells, BCL2 negative?", opts:[["Yes","bl"],["No","fl"]] },
  bl:{ end:"Burkitt lymphoma/leukaemia", detail:"Confirm MYC rearrangement without BCL2. An emergency: tumour lysis risk." },
  fl:{ end:"Follicular lymphoma (or another germinal centre lymphoma)", detail:"Cleaved cells; BCL2+, BCL6+. FISH for IGH::BCL2. Exclude DLBCL in the leukaemic phase." },
  hcl:{ q:"Are CD11c, CD25, CD103 and CD123 all positive?", opts:[["Yes","hcl2"],["No","mzl"]] },
  hcl2:{ end:"Hairy cell leukaemia", detail:"Confirm BRAF V600E and annexin A1 on the trephine. Monocytopenia is typical." },
  mzl:{ q:"IgM paraprotein with plasmacytoid lymphocytes?", opts:[["Yes","lpl"],["No","mzl2"]] },
  lpl:{ end:"Lymphoplasmacytic lymphoma / Waldenström macroglobulinaemia", detail:"Test MYD88 L265P and CXCR4. Watch for hyperviscosity." },
  mzl2:{ end:"Marginal zone lymphoma (splenic) or other small B-cell lymphoma", detail:"Villous lymphocytes and splenomegaly favour splenic MZL. Prominent nucleoli and CD25−, BRAF wild type: splenic B-cell lymphoma/leukaemia with prominent nucleoli." }
  }}
];

const M3_CHECKLIST = { title:"Reporting a suspected leukaemia", intro:"A systematic order for the first day of a suspected haematological neoplasm. Tick each step as you go.", steps:[
  ["Confirm the count and the film", "Repeat the count if needed, check for platelet clumps and smudge cells, and do a 200-cell differential."],
  ["Count blasts and blast equivalents", "Include promonocytes, and abnormal promyelocytes in APL. Note Auer rods."],
  ["Look for an emergency", "APL features or DIC, hyperleucocytosis (leucostasis), tumour lysis, hypercalcaemia. Phone the clinical team."],
  ["Describe dysplasia and lineage clues", "Hypogranular or pseudo-Pelger neutrophils, micromegakaryocytes, monocytic features, basophilia."],
  ["Send flow cytometry", "Blood is often enough; use marrow if blasts are few. Ask for a lineage panel or a B/T lymphoproliferative panel."],
  ["Bone marrow aspirate and trephine", "500-cell differential, Perls stain, reticulin; send samples for karyotype, FISH and molecular testing in the right media."],
  ["Genetics", "Karyotype; FISH or RT-PCR for urgent fusions (PML::RARA, BCR::ABL1); NGS myeloid or lymphoid panel (NPM1, FLT3, CEBPA, TP53, MR genes)."],
  ["Integrated report", "Name the entity in WHO-HAEM5 and ICC terms, note blast percentage, phenotype, genetics pending, and any qualifiers (post-cytotoxic therapy, germline)."]
]};

/* Flow cytometry simulator: populations on a CD45 (x, log-like 0–100) by SSC (y, 0–100) plot. */
const FLOW_POPS = {
  lymph: { name: "Lymphocytes", x: 82, y: 12, sx: 5, sy: 4, color: "#2f6fb0" },
  mono: { name: "Monocytes", x: 75, y: 40, sx: 5, sy: 6, color: "#7f84b6" },
  gran: { name: "Granulocytes", x: 58, y: 70, sx: 6, sy: 10, color: "#c28aa8" },
  blast: { name: "Blasts", x: 42, y: 20, sx: 6, sy: 6, color: "#b93a60" },
  ery: { name: "Erythroid precursors", x: 8, y: 10, sx: 5, sy: 4, color: "#d06a78" },
  apl: { name: "Abnormal promyelocytes", x: 48, y: 58, sx: 6, sy: 9, color: "#9a2b6b" },
  plasma: { name: "Plasma cells", x: 28, y: 26, sx: 7, sy: 6, color: "#4a3891" }
};
const FLOW_CASES = [
  { id: "pb", name: "Normal blood", mix: { lymph: 30, mono: 7, gran: 63 }, note: "Three clusters: lymphocytes (CD45 bright, SSC low), monocytes (CD45 bright, SSC intermediate) and granulocytes (CD45 moderate, SSC high). No blasts." },
  { id: "bm", name: "Normal marrow", mix: { lymph: 12, mono: 4, gran: 58, blast: 2, ery: 24 }, note: "The marrow adds erythroid precursors (CD45 negative) and a small CD45-dim blast population (normally under 5%, mostly CD34+ myeloblasts and B-cell precursors)." },
  { id: "aml", name: "AML", mix: { lymph: 8, mono: 3, gran: 12, blast: 72, ery: 5 }, note: "A dominant CD45-dim, SSC-low population in the blast gate. Next: CD34, CD117, HLA-DR, CD13, CD33, MPO and monocytic markers." },
  { id: "apl", name: "APL", mix: { lymph: 10, mono: 2, gran: 8, apl: 75, ery: 5 }, note: "Abnormal promyelocytes have high side scatter (granules) and dim CD45, filling the gap between blasts and granulocytes. They are CD34−, HLA-DR−, CD33 bright." },
  { id: "ball", name: "B-ALL", mix: { lymph: 6, gran: 10, blast: 80, ery: 4 }, note: "Blasts sit lower and further left (CD45 dim to negative) than myeloblasts. Gate them and look for CD19, CD10, CD34 and TdT." },
  { id: "cll", name: "CLL", mix: { lymph: 88, mono: 2, gran: 10 }, note: "A huge CD45-bright, SSC-low cluster. CD45/SSC alone cannot tell CLL from reactive lymphocytes: gate CD19 and check light chains, CD5, CD23 and CD200." },
  { id: "pcm", name: "Myeloma marrow", mix: { lymph: 8, mono: 3, gran: 46, ery: 15, plasma: 28 }, note: "Plasma cells are CD45 dim to negative with low to intermediate SSC. Gate on CD38 bright and CD138, then check CD19, CD45, CD56 and cytoplasmic light chains." }
];
