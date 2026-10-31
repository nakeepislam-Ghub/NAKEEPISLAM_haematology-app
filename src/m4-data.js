/* Module 4 content: Haemostasis and thrombosis. Original teaching text written from the project library
   (Colman's Hemostasis and Thrombosis; Laboratory Hemostasis) and current ISTH, ASH and BSH guidance.
   Cut-offs follow common international practice; check local reference ranges and methods. */

Object.assign(SOURCES, {
  colman: "Marder et al., Hemostasis and Thrombosis: Basic Principles and Clinical Practice, 6th ed. (2013)",
  labhaem: "Kitchen et al. (eds), Laboratory Hemostasis: A Practical Guide for Pathologists (Springer, 2015)",
  coagnotes: "Coagulation lecture notes (project library)",
  isth: "ISTH Scientific and Standardization Committee guidance (DIC score; lupus anticoagulant testing, Devreese et al. 2020)",
  vwdg: "James et al., ASH/ISTH/NHF/WFH 2021 guidelines on the diagnosis of von Willebrand disease. Blood Adv 2021;5:280–300"
});

const M4_LESSONS = [
{
  id: "normal-haemostasis",
  title: "Normal haemostasis: platelets, coagulation and fibrinolysis",
  minutes: 15,
  sources: ["colman", "hof", "coagnotes"],
  video: "cell based model of coagulation platelet adhesion aggregation fibrinolysis",
  body: `
<p>Haemostasis stops bleeding at a site of injury while keeping blood fluid everywhere else. Four systems work together: the vessel wall, platelets, the coagulation proteins and fibrinolysis, each balanced by natural inhibitors.</p>
<h3>Primary haemostasis: the platelet plug</h3>
<ul>
<li><b>Adhesion:</b> at high shear, von Willebrand factor (VWF) binds exposed collagen and captures platelets through glycoprotein (GP) Ib–IX–V. GPVI and integrin α2β1 bind collagen directly.</li>
<li><b>Activation:</b> platelets change shape, release ADP and thromboxane A2 (TXA2), and expose phosphatidylserine. Thrombin is the most potent activator, through PAR-1 and PAR-4.</li>
<li><b>Aggregation:</b> activated GPIIb/IIIa (integrin αIIbβ3) binds fibrinogen and VWF, bridging platelets together.</li>
</ul>
<p>Drugs act on these steps: aspirin blocks TXA2 synthesis (COX-1), clopidogrel and ticagrelor block the ADP receptor P2Y12, and abciximab-type drugs block GPIIb/IIIa.</p>
<h3>Secondary haemostasis: the cell-based model</h3>
<ol>
<li><b>Initiation:</b> tissue factor (TF) on cells outside the vessel binds factor VIIa. TF–VIIa activates small amounts of factor X and IX. Xa with Va makes a little thrombin.</li>
<li><b>Amplification:</b> this thrombin activates platelets and factors V, VIII and XI.</li>
<li><b>Propagation:</b> on the activated platelet surface, the tenase complex (IXa–VIIIa) makes large amounts of Xa, and prothrombinase (Xa–Va) produces a burst of thrombin. Thrombin converts fibrinogen to fibrin, and factor XIIIa cross-links it.</li>
</ol>
<p>The classical "intrinsic" and "extrinsic" cascade does not describe what happens in the body, but it explains the laboratory tests perfectly: the PT tests the extrinsic and common pathways, the APTT the intrinsic and common pathways. Factor XII starts the APTT in a tube but is not needed for haemostasis.</p>
<h3>Natural anticoagulants</h3>
<ul>
<li><b>Antithrombin</b> inactivates thrombin and Xa; heparin accelerates it about 1000-fold.</li>
<li><b>Protein C</b>, activated by thrombin bound to thrombomodulin, with its cofactor <b>protein S</b>, inactivates Va and VIIIa. Factor V Leiden resists this.</li>
<li><b>Tissue factor pathway inhibitor</b> (TFPI) switches off TF–VIIa–Xa.</li>
</ul>
<h3>Fibrinolysis</h3>
<p>Tissue plasminogen activator (tPA) converts plasminogen to plasmin on the fibrin surface. Plasmin digests fibrin into degradation products, including D-dimer (from cross-linked fibrin). Plasminogen activator inhibitor-1 (PAI-1), α2-antiplasmin and TAFI restrain it. Tranexamic acid blocks plasminogen binding to fibrin.</p>
<h3>Vitamin K</h3>
<p>Factors II, VII, IX and X, and proteins C and S, need vitamin K-dependent γ-carboxylation to bind calcium and phospholipid. Warfarin blocks vitamin K epoxide reductase (VKORC1). Factor VII has the shortest half-life (about 6 hours), so the PT rises first.</p>
`,
  points: [
    "Adhesion: VWF bridges collagen to platelet GPIb; aggregation: fibrinogen bridges GPIIb/IIIa",
    "Cell-based model: initiation (TF–VIIa), amplification, propagation on platelets",
    "PT tests VII, X, V, II, fibrinogen; APTT tests XII, XI, IX, VIII, X, V, II, fibrinogen",
    "Natural anticoagulants: antithrombin, protein C and S, TFPI",
    "D-dimer comes from plasmin digestion of cross-linked fibrin",
    "Vitamin K-dependent: II, VII, IX, X, protein C and protein S"
  ]
},
{
  id: "coag-tests",
  title: "Coagulation tests and the pre-analytical phase",
  minutes: 15,
  sources: ["labhaem", "dl", "coagnotes"],
  video: "PT APTT mixing study interpretation coagulation laboratory",
  body: `
<p>Most wrong coagulation results are caused before the sample reaches the analyser. Check the sample first.</p>
<h3>The sample</h3>
<ul>
<li>3.2% (0.109 M) sodium citrate, blood to citrate 9:1. Fill the tube to at least 90% of its nominal volume.</li>
<li>If the haematocrit is above 0.55, reduce the citrate: citrate volume (mL) = 0.00185 × blood volume (mL) × (100 − Hct%).</li>
<li>Avoid heparin contamination from lines, clotted or haemolysed samples, and delays. Test PT within 24 hours and APTT within 4 hours (unfrozen).</li>
<li>EDTA or serum tubes filled first and then "topped up" into citrate cause falsely long times.</li>
</ul>
<h3>The basic tests</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>Test</th><th>What it measures</th><th>Main uses</th></tr></thead><tbody>
<tr><td>Prothrombin time (PT) and INR</td><td>VII, X, V, II, fibrinogen</td><td>Warfarin monitoring (INR), liver disease, vitamin K deficiency, DIC</td></tr>
<tr><td>Activated partial thromboplastin time (APTT)</td><td>XII, XI, IX, VIII, X, V, II, fibrinogen (also prekallikrein, HMWK)</td><td>Haemophilia, VWD (low VIII), heparin, lupus anticoagulant</td></tr>
<tr><td>Thrombin time (TT)</td><td>Conversion of fibrinogen to fibrin</td><td>Heparin, dabigatran, low or abnormal fibrinogen, FDPs</td></tr>
<tr><td>Clauss fibrinogen</td><td>Functional fibrinogen</td><td>DIC, massive bleeding, liver disease</td></tr>
<tr><td>D-dimer</td><td>Cross-linked fibrin breakdown</td><td>Excluding VTE (low pre-test probability), DIC</td></tr>
</tbody></table></div>
<p>The INR corrects the PT for the sensitivity of the thromboplastin (ISI): INR = (patient PT ÷ mean normal PT)<sup>ISI</sup>. It is validated for vitamin K antagonists only.</p>
<h3>Patterns</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>PT</th><th>APTT</th><th>Think of</th></tr></thead><tbody>
<tr><td>Long</td><td>Normal</td><td>Factor VII deficiency, early warfarin, early vitamin K deficiency or liver disease</td></tr>
<tr><td>Normal</td><td>Long</td><td>VIII, IX, XI or XII deficiency, VWD, heparin, lupus anticoagulant, acquired haemophilia</td></tr>
<tr><td>Long</td><td>Long</td><td>X, V, II or fibrinogen deficiency, DIC, liver disease, warfarin, vitamin K deficiency, high-dose heparin, DOACs</td></tr>
<tr><td>Normal</td><td>Normal, but bleeding</td><td>VWD, platelet function disorder, factor XIII deficiency, mild factor deficiency, vascular disorder, hyperfibrinolysis</td></tr>
</tbody></table></div>
<h3>The mixing study</h3>
<p>Mix patient plasma 1:1 with normal pooled plasma and repeat the test. Correction suggests a factor deficiency (50% of any factor is enough for a normal time). No correction suggests an inhibitor: lupus anticoagulant, heparin, or a specific factor inhibitor. Acquired factor VIII inhibitors are time-dependent: the mix may correct immediately and prolong again after 1 to 2 hours at 37 °C. The Rosner index helps: (APTT of mix − APTT of normal plasma) ÷ APTT of patient × 100; above about 15 suggests an inhibitor (each laboratory sets its own cut-off).</p>
<h3>Further tests</h3>
<ul>
<li><b>Factor assays</b> (one-stage clotting or chromogenic), and the Bethesda assay to measure inhibitor titre.</li>
<li><b>VWF tests:</b> VWF antigen, VWF activity (GPIbM or ristocetin cofactor), FVIII, multimers, RIPA.</li>
<li><b>Platelet function:</b> PFA-100 closure time (sensitive to VWD and aspirin), light transmission aggregometry, flow cytometry for GPIb and GPIIb/IIIa.</li>
<li><b>Viscoelastic tests</b> (TEG, ROTEM): guide transfusion in trauma, cardiac surgery and obstetric bleeding.</li>
<li><b>Anti-Xa assays:</b> heparin, LMWH and DOAC levels with the right calibrator.</li>
</ul>
`,
  points: [
    "3.2% citrate, 9:1, fill at least 90%; adjust citrate when Hct is over 0.55",
    "PT: VII, X, V, II, fibrinogen; APTT adds XII, XI, IX, VIII",
    "Isolated long PT: factor VII deficiency or early vitamin K deficiency",
    "Mixing study: correction means deficiency; no correction means inhibitor",
    "FVIII inhibitors are time-dependent: incubate the mix for 1–2 hours",
    "Normal screen with bleeding: VWD, platelet function, factor XIII"
  ]
},
{
  id: "thrombocytopenia",
  title: "Thrombocytopenia: ITP, TTP, HUS, HIT and inherited causes",
  minutes: 18,
  sources: ["colman", "hof", "bc"],
  video: "thrombocytopenia approach ITP TTP HIT 4Ts PLASMIC",
  body: `
<p>A platelet count below 150 × 10⁹/L. Spontaneous bleeding is unusual above 20 × 10⁹/L if platelet function is normal. The first step is always to exclude a false result and to look at the film.</p>
<h3>Pseudothrombocytopenia</h3>
<p>EDTA-dependent antibodies cause platelet clumps or platelet satellitism around neutrophils, and a falsely low count. Look at the film (and the analyser flags); repeat in a citrate tube and correct the count for dilution (multiply by 1.1). A clotted sample does the same.</p>
<h3>Mechanisms</h3>
<ul>
<li><b>Reduced production:</b> marrow failure or infiltration, B12 or folate deficiency, alcohol, drugs, viral infection, inherited disorders.</li>
<li><b>Increased destruction or consumption:</b> ITP, drug-induced immune thrombocytopenia, HIT, DIC, TTP, HUS, HELLP, sepsis, mechanical valves.</li>
<li><b>Sequestration and dilution:</b> hypersplenism, massive transfusion, pregnancy (gestational thrombocytopenia, usually over 70 × 10⁹/L).</li>
</ul>
<h3>Immune thrombocytopenia (ITP)</h3>
<p>Isolated thrombocytopenia below 100 × 10⁹/L with otherwise normal counts and film, and no other cause: a diagnosis of exclusion. Platelets are often large; the marrow (not routinely needed) has normal or increased megakaryocytes. Test for HIV, hepatitis C and H. pylori in adults. Treat bleeding or very low counts with steroids or IVIG; second-line options include thrombopoietin receptor agonists, rituximab and fostamatinib.</p>
<h3>Thrombotic microangiopathies: an emergency</h3>
<p>Microangiopathic haemolytic anaemia (schistocytes, raised LDH, low haptoglobin, negative DAT) with thrombocytopenia.</p>
<ul>
<li><b>TTP:</b> severe ADAMTS13 deficiency (below 10%), usually from autoantibodies; ultra-large VWF multimers form platelet thrombi. Fever, neurological signs and renal impairment may or may not be present. Start plasma exchange urgently once suspected; add steroids, caplacizumab and rituximab. The PLASMIC score estimates the likelihood while ADAMTS13 is pending.</li>
<li><b>HUS:</b> Shiga toxin-producing <i>E. coli</i> (mostly children, bloody diarrhoea), or complement-mediated (atypical) HUS treated with eculizumab or ravulizumab.</li>
<li>Also: DIC, malignant hypertension, HELLP, drugs (quinine, gemcitabine, calcineurin inhibitors), transplant-associated TMA.</li>
</ul>
<h3>Heparin-induced thrombocytopenia (HIT)</h3>
<p>IgG antibodies against platelet factor 4 (PF4)–heparin complexes activate platelets through FcγRIIa. The count falls by more than 50%, typically 5 to 10 days after starting heparin (earlier if heparin was given in the last 100 days), and the nadir is rarely below 20 × 10⁹/L. Thrombosis, not bleeding, is the risk. Use the 4Ts score: with a low score, HIT is very unlikely. With an intermediate or high score, stop all heparin, start a non-heparin anticoagulant (argatroban, fondaparinux, bivalirudin or a DOAC), and send an anti-PF4 immunoassay, followed by a functional assay (SRA or HIPA) if positive. Do not give platelet transfusions or warfarin in the acute phase. Vaccine-induced immune thrombocytopenia and thrombosis (VITT) is a related anti-PF4 disorder.</p>
<h3>Inherited thrombocytopenias</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>Disorder</th><th>Platelet size</th><th>Clue</th></tr></thead><tbody>
<tr><td>Bernard–Soulier syndrome (GPIb–IX–V)</td><td>Giant</td><td>Absent ristocetin agglutination, not corrected by normal plasma; normal aggregation with other agonists</td></tr>
<tr><td><i>MYH9</i>-related disorders (May–Hegglin)</td><td>Giant</td><td>Döhle-like inclusions in neutrophils; deafness, nephritis, cataracts</td></tr>
<tr><td>Grey platelet syndrome (<i>NBEAL2</i>)</td><td>Large, pale grey</td><td>Absent α-granules; myelofibrosis</td></tr>
<tr><td>Wiskott–Aldrich syndrome (<i>WAS</i>)</td><td>Small</td><td>Boys with eczema and immunodeficiency</td></tr>
<tr><td><i>RUNX1</i>, <i>ETV6</i>, <i>ANKRD26</i> familial thrombocytopenia</td><td>Normal</td><td>Predisposition to myeloid neoplasms</td></tr>
</tbody></table></div>
`,
  points: [
    "Always look at the film: clumps and satellitism mean pseudothrombocytopenia",
    "ITP is a diagnosis of exclusion: isolated platelets under 100 × 10⁹/L",
    "Schistocytes with thrombocytopenia: think TTP and start plasma exchange urgently",
    "TTP: ADAMTS13 under 10%; PLASMIC score estimates probability",
    "HIT: 4Ts score; stop heparin, give a non-heparin anticoagulant, no platelet transfusion",
    "Giant platelets: Bernard–Soulier, MYH9 disorders; small platelets: Wiskott–Aldrich"
  ]
},
{
  id: "vwd-platelets",
  title: "Von Willebrand disease and platelet function disorders",
  minutes: 16,
  sources: ["vwdg", "labhaem", "colman"],
  video: "von Willebrand disease types diagnosis multimers RIPA",
  body: `
<p>Von Willebrand disease (VWD) is the most common inherited bleeding disorder. It causes mucocutaneous bleeding: easy bruising, nosebleeds, heavy menstrual bleeding, and bleeding after dental work or surgery. Use a structured bleeding assessment tool (ISTH-BAT) to grade the history.</p>
<h3>VWF has two jobs</h3>
<p>It binds platelets to damaged vessel walls (adhesion, through GPIb and collagen), and it carries factor VIII, protecting it from breakdown. Low VWF therefore can also lower FVIII and prolong the APTT.</p>
<h3>Types</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>Type</th><th>Defect</th><th>Laboratory pattern</th></tr></thead><tbody>
<tr><td>1</td><td>Partial quantitative deficiency</td><td>VWF:Ag and activity reduced in proportion (activity/Ag ratio over 0.7); normal multimers</td></tr>
<tr><td>2A</td><td>Loss of high-molecular-weight (HMW) multimers</td><td>Activity/Ag ratio under 0.7; absent HMW multimers</td></tr>
<tr><td>2B</td><td>Gain of function: VWF binds GPIb too strongly</td><td>Ratio under 0.7; loss of HMW multimers; enhanced RIPA at low ristocetin; often thrombocytopenia</td></tr>
<tr><td>2M</td><td>Reduced binding to platelets or collagen with normal multimers</td><td>Ratio under 0.7; normal multimers</td></tr>
<tr><td>2N</td><td>Reduced binding to FVIII</td><td>Low FVIII with normal or near-normal VWF; FVIII/VWF:Ag ratio under 0.7; confirm with VWF:FVIII binding assay. Mimics mild haemophilia A</td></tr>
<tr><td>3</td><td>Virtually absent VWF</td><td>VWF under 3 IU/dL, FVIII 1–10 IU/dL; recessive; severe bleeding</td></tr>
</tbody></table></div>
<p><b>2021 ASH/ISTH guideline:</b> VWF below 30 IU/dL confirms type 1 VWD regardless of bleeding; 30 to 50 IU/dL confirms it in a patient with abnormal bleeding. Levels rise with stress, exercise, inflammation, pregnancy and oestrogens, and are about 25% lower in blood group O, so repeat borderline results.</p>
<p>Treatment: desmopressin (DDAVP) releases stored VWF and FVIII in most type 1 patients (do a trial; avoid in 2B because it worsens thrombocytopenia); VWF-containing concentrates for type 3 and surgery; tranexamic acid for mucosal bleeding.</p>
<h3>Acquired von Willebrand syndrome</h3>
<p>Aortic stenosis and ventricular assist devices (shear destroys HMW multimers: Heyde syndrome), lymphoproliferative disorders and MGUS (antibodies), hypothyroidism, and high platelet counts in ET (adsorption of multimers).</p>
<h3>Platelet function disorders</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>Disorder</th><th>Defect</th><th>Aggregation pattern</th></tr></thead><tbody>
<tr><td>Glanzmann thrombasthenia</td><td>GPIIb/IIIa absent or defective</td><td>Absent aggregation with all agonists except ristocetin; normal count and size</td></tr>
<tr><td>Bernard–Soulier syndrome</td><td>GPIb–IX–V absent</td><td>Absent ristocetin agglutination; normal with other agonists; giant platelets, low count</td></tr>
<tr><td>Storage pool and release defects</td><td>Dense granule deficiency (Hermansky–Pudlak), signalling defects</td><td>Reduced secondary wave with ADP and adrenaline; reduced collagen response</td></tr>
<tr><td>Aspirin effect</td><td>COX-1 blocked</td><td>Absent arachidonic acid response; reduced collagen and secondary waves</td></tr>
</tbody></table></div>
<p>Uraemia, myeloproliferative neoplasms, paraproteins, cardiopulmonary bypass and many drugs (SSRIs, NSAIDs, P2Y12 inhibitors) also impair platelet function.</p>
`,
  points: [
    "VWD: mucocutaneous bleeding; use the ISTH-BAT",
    "VWF under 30 IU/dL is VWD; 30–50 with abnormal bleeding is type 1 (ASH/ISTH 2021)",
    "Activity/antigen ratio under 0.7 suggests type 2; FVIII/VWF:Ag under 0.7 suggests 2N",
    "2B: enhanced RIPA at low ristocetin, thrombocytopenia; avoid DDAVP",
    "Glanzmann: no aggregation except with ristocetin; Bernard–Soulier: the reverse, with giant platelets",
    "Blood group O lowers VWF by about 25%"
  ]
},
{
  id: "haemophilia",
  title: "Haemophilia and other coagulation factor deficiencies",
  minutes: 16,
  sources: ["colman", "labhaem", "hof"],
  video: "hemophilia A B severity inhibitors Bethesda emicizumab laboratory",
  body: `
<p>Haemophilia A (factor VIII deficiency, about 1 in 5000 males) and haemophilia B (factor IX deficiency, about 1 in 30 000 males) are X-linked recessive. One third of cases arise from new mutations. Female carriers can have low levels and bleed. Joint and muscle bleeds are typical; the APTT is prolonged, the PT and platelets are normal.</p>
<h3>Severity predicts bleeding</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>Severity</th><th>Factor level</th><th>Bleeding</th></tr></thead><tbody>
<tr><td>Severe</td><td>Below 1 IU/dL (under 1%)</td><td>Spontaneous joint and muscle bleeds from infancy</td></tr>
<tr><td>Moderate</td><td>1–5 IU/dL</td><td>Bleeding after minor trauma; occasional spontaneous bleeds</td></tr>
<tr><td>Mild</td><td>Over 5 to under 40 IU/dL</td><td>Bleeding after surgery or major trauma; may be diagnosed late</td></tr>
</tbody></table></div>
<p>The intron 22 inversion of <i>F8</i> causes about 45% of severe haemophilia A. Mild haemophilia A can show a discrepancy between one-stage and chromogenic FVIII assays; test both.</p>
<h3>Inhibitors</h3>
<p>Alloantibodies against infused factor develop in about 30% of severely affected haemophilia A patients, usually in the first 50 exposure days. Measure them with the Bethesda assay (Nijmegen modification): one Bethesda unit (BU) neutralises 50% of FVIII in normal plasma. Above 5 BU is high-titre. Treat bleeding with bypassing agents (recombinant VIIa or aPCC), and eradicate with immune tolerance induction.</p>
<h3>Modern treatment and the laboratory</h3>
<p>Extended half-life factor concentrates, emicizumab (a bispecific antibody that mimics FVIIIa by bridging IXa and X), rebalancing agents (fitusiran, concizumab, marstacimab) and gene therapy have changed care. <b>Emicizumab shortens the APTT to normal</b> and makes one-stage FVIII assays and Bethesda assays invalid; use a chromogenic assay with bovine reagents to measure FVIII or inhibitors.</p>
<h3>Acquired haemophilia A</h3>
<p>Autoantibodies against FVIII in older adults, postpartum women, and patients with autoimmune disease or cancer. Sudden extensive skin and muscle bleeding with an isolated long APTT that does not correct after incubation. Treat with bypassing agents or recombinant porcine FVIII, and immunosuppression.</p>
<h3>Other factor deficiencies</h3>
<ul>
<li><b>Factor XI deficiency:</b> common in Ashkenazi Jews; bleeding does not match the level; trauma and surgery of tissues with high fibrinolysis (mouth, nose, urinary tract).</li>
<li><b>Factor XII, prekallikrein, HMWK deficiency:</b> long APTT but no bleeding.</li>
<li><b>Factor VII deficiency:</b> isolated long PT.</li>
<li><b>Factor XIII deficiency:</b> normal PT and APTT; umbilical stump bleeding, intracranial bleeding, poor wound healing, miscarriage. Needs a specific FXIII assay.</li>
<li><b>Fibrinogen disorders:</b> afibrinogenaemia, hypofibrinogenaemia, dysfibrinogenaemia (low Clauss activity with normal antigen; bleeding or thrombosis).</li>
<li><b>Vitamin K deficiency:</b> newborns (prevented by vitamin K at birth), malabsorption, antibiotics, cholestasis.</li>
<li><b>Liver disease:</b> low pro- and anticoagulant factors (except VIII and VWF, which rise); a "rebalanced" state where a long INR does not predict bleeding well.</li>
</ul>
`,
  points: [
    "Haemophilia A (FVIII) and B (FIX): X-linked; long APTT, normal PT",
    "Severe under 1 IU/dL, moderate 1–5, mild over 5 to under 40",
    "Inhibitors in about 30% of severe haemophilia A: Bethesda assay; over 5 BU is high-titre",
    "Emicizumab normalises the APTT; use chromogenic bovine assays",
    "Acquired haemophilia A: older adults or postpartum, time-dependent inhibitor",
    "Factor XIII deficiency bleeds with a normal PT and APTT"
  ]
},
{
  id: "dic",
  title: "DIC and acquired coagulopathy of bleeding",
  minutes: 12,
  sources: ["isth", "colman", "labhaem"],
  video: "disseminated intravascular coagulation ISTH score massive transfusion",
  body: `
<p>Disseminated intravascular coagulation (DIC) is systemic activation of coagulation that consumes platelets and factors, forms microthrombi, and in its overt form causes bleeding. It is always secondary: treat the cause.</p>
<h3>Causes</h3>
<ul>
<li>Sepsis (the most common), major trauma and burns, obstetric emergencies (placental abruption, amniotic fluid embolism, pre-eclampsia), malignancy (APL, mucin-secreting adenocarcinoma), severe pancreatitis, snake bites, ABO-incompatible transfusion, giant haemangioma.</li>
<li>Sepsis-associated DIC is usually <i>thrombotic</i> with organ failure and suppressed fibrinolysis; APL and some cancers cause <i>hyperfibrinolytic</i> bleeding.</li>
</ul>
<h3>Laboratory picture</h3>
<p>Falling or low platelets, prolonged PT (and APTT), low or falling fibrinogen, very high D-dimer, and sometimes schistocytes. Fibrinogen is an acute-phase protein, so a "normal" fibrinogen can still be falling. Serial testing matters more than a single result.</p>
<h3>The ISTH overt DIC score</h3>
<p>Use only when an underlying cause is present. Platelets: over 100 = 0, 50–100 = 1, under 50 = 2. Fibrin marker (D-dimer): no increase = 0, moderate = 2, strong = 3. PT prolongation: under 3 s = 0, 3–6 s = 1, over 6 s = 2. Fibrinogen: over 1 g/L = 0, under 1 g/L = 1. A total of 5 or more is compatible with overt DIC; repeat daily. The calculator is in the workups section. The ISTH sepsis-induced coagulopathy (SIC) score identifies earlier stages in sepsis.</p>
<h3>Management</h3>
<ul>
<li>Treat the cause.</li>
<li>Transfuse only for bleeding or before procedures: platelets to keep over 50 × 10⁹/L in bleeding, fibrinogen concentrate or cryoprecipitate to keep fibrinogen over 1.5 g/L, plasma if PT and APTT are prolonged.</li>
<li>Prophylactic heparin for thrombotic DIC without bleeding; therapeutic heparin for overt thrombosis.</li>
<li>Avoid tranexamic acid in thrombotic DIC; it is useful in hyperfibrinolytic states (trauma within 3 hours, postpartum haemorrhage).</li>
</ul>
<h3>Massive bleeding</h3>
<p>Trauma-induced coagulopathy develops early from tissue injury, shock and hyperfibrinolysis, and worsens with hypothermia, acidosis and dilution. Use a major haemorrhage protocol with balanced red cell to plasma ratios, early tranexamic acid, and fibrinogen replacement guided by Clauss fibrinogen or viscoelastic testing. Postpartum haemorrhage with fibrinogen under 2 g/L predicts severe bleeding.</p>
`,
  points: [
    "DIC is always secondary: treat the cause",
    "Low or falling platelets, long PT, low fibrinogen, very high D-dimer",
    "ISTH overt DIC score of 5 or more; repeat daily",
    "Transfuse for bleeding or procedures, not for numbers alone",
    "Sepsis DIC is thrombotic; APL DIC is hyperfibrinolytic",
    "Postpartum fibrinogen under 2 g/L predicts severe bleeding"
  ]
},
{
  id: "thrombophilia",
  title: "Venous thrombosis, thrombophilia and antiphospholipid syndrome",
  minutes: 16,
  sources: ["colman", "isth", "labhaem"],
  video: "thrombophilia testing factor V Leiden antiphospholipid syndrome lupus anticoagulant",
  body: `
<p>Venous thromboembolism (VTE) arises from Virchow's triad: stasis, endothelial injury and hypercoagulability. Most VTE is provoked by surgery, immobility, cancer, pregnancy or oestrogens.</p>
<h3>Diagnosing VTE</h3>
<p>Estimate clinical probability first (Wells score). With a low or unlikely probability, a negative D-dimer excludes VTE. Use an age-adjusted cut-off over 50 years (age × 10 µg/L FEU). D-dimer is not useful when probability is high, or in hospital patients, pregnancy and cancer, where it is often raised; go straight to imaging.</p>
<h3>Inherited thrombophilia</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>Defect</th><th>Mechanism</th><th>Testing notes</th></tr></thead><tbody>
<tr><td>Factor V Leiden (F5 R506Q)</td><td>Resistance to activated protein C</td><td>APC resistance test or genotyping; 3–8% of Europeans carry it</td></tr>
<tr><td>Prothrombin G20210A</td><td>High prothrombin level</td><td>Genotyping</td></tr>
<tr><td>Antithrombin deficiency</td><td>Loss of thrombin and Xa inhibition</td><td>Functional assay; heparin lowers it; highest risk</td></tr>
<tr><td>Protein C deficiency</td><td>Loss of Va and VIIIa inactivation</td><td>Low on warfarin and in liver disease; warfarin skin necrosis</td></tr>
<tr><td>Protein S deficiency</td><td>Loss of APC cofactor</td><td>Free protein S antigen; low in pregnancy, oestrogens, warfarin, acute illness</td></tr>
</tbody></table></div>
<p>Testing rarely changes management. Do not test during acute thrombosis, on anticoagulants (except genetic tests), or after provoked VTE. Consider it in selected cases: young patients with unprovoked VTE and strong family history, unusual sites, or before oestrogen use in a relative of a known carrier.</p>
<h3>Antiphospholipid syndrome (APS)</h3>
<p>Thrombosis (venous, arterial or microvascular) or pregnancy morbidity with persistent antiphospholipid antibodies, positive on two occasions at least 12 weeks apart:</p>
<ul>
<li><b>Lupus anticoagulant (LA):</b> two tests based on different principles, usually the dilute Russell viper venom time (dRVVT) and an LA-sensitive APTT, each with screen, mix and confirm steps (ISTH 2020). LA prolongs clotting tests in vitro but causes thrombosis in vivo.</li>
<li><b>Anticardiolipin</b> and <b>anti-β2-glycoprotein I</b> antibodies (IgG or IgM) at moderate to high titre.</li>
</ul>
<p>Triple positivity carries the highest risk. Test LA off anticoagulants where possible: heparin, VKAs and DOACs all cause false positives (DOAC removers can help). The 2023 ACR/EULAR classification criteria weight clinical and laboratory domains for research use. Warfarin, not a DOAC, is recommended for high-risk (especially triple-positive or arterial) APS.</p>
<h3>Other acquired risks</h3>
<p>Cancer (consider cancer-associated thrombosis treatment with LMWH or a DOAC), myeloproliferative neoplasms (<i>JAK2</i>, especially splanchnic vein thrombosis), PNH, nephrotic syndrome, HIT, and COVID-19 or VITT.</p>
`,
  points: [
    "Low probability plus negative D-dimer excludes VTE; age-adjust over 50",
    "Factor V Leiden: APC resistance; prothrombin G20210A: high prothrombin",
    "Do not test AT, PC, PS during acute VTE or on anticoagulants",
    "APS: clinical event plus persistent LA, aCL or anti-β2GPI 12 weeks apart",
    "LA: dRVVT and LA-sensitive APTT, screen–mix–confirm",
    "Splanchnic vein thrombosis: test JAK2 and PNH"
  ]
},
{
  id: "anticoagulants",
  title: "Anticoagulant drugs: monitoring and reversal",
  minutes: 14,
  sources: ["labhaem", "colman", "isth"],
  video: "anticoagulant monitoring anti-Xa DOAC reversal INR heparin",
  body: `
<p>The laboratory monitors some anticoagulants, measures others when needed, and must recognise their effects on every coagulation test.</p>
<div class="tablewrap"><table class="t"><thead><tr><th>Drug</th><th>Target</th><th>Monitoring</th><th>Reversal</th></tr></thead><tbody>
<tr><td>Unfractionated heparin</td><td>Antithrombin (IIa and Xa)</td><td>APTT ratio or anti-Xa (0.3–0.7 IU/mL)</td><td>Protamine</td></tr>
<tr><td>Low-molecular-weight heparin</td><td>Antithrombin (mainly Xa)</td><td>Not routinely; anti-Xa 3–4 h after dose in renal failure, obesity, pregnancy, children</td><td>Protamine (partial)</td></tr>
<tr><td>Fondaparinux</td><td>Antithrombin (Xa only)</td><td>Drug-calibrated anti-Xa</td><td>None specific</td></tr>
<tr><td>Warfarin (VKA)</td><td>Vitamin K-dependent factors</td><td>INR (target usually 2–3; 2.5–3.5 for some mechanical valves)</td><td>Vitamin K, four-factor prothrombin complex concentrate (PCC)</td></tr>
<tr><td>Dabigatran</td><td>Thrombin</td><td>Diluted thrombin time or ecarin time; a normal TT excludes significant drug</td><td>Idarucizumab</td></tr>
<tr><td>Rivaroxaban, apixaban, edoxaban</td><td>Xa</td><td>Drug-calibrated anti-Xa; PT and APTT are unreliable</td><td>Andexanet alfa, or PCC</td></tr>
<tr><td>Argatroban, bivalirudin</td><td>Thrombin</td><td>APTT (or dTT)</td><td>None; short half-life</td></tr>
</tbody></table></div>
<h3>Effects on tests</h3>
<ul>
<li>Heparin prolongs the APTT and TT strongly; most PT reagents contain a heparin neutraliser. Heparin from an arterial line is a common cause of an unexpected very long APTT and TT.</li>
<li>VKAs lower protein C and S and cause false-positive LA tests.</li>
<li>DOACs cause false-positive LA tests, low clot-based factor assays and falsely high or low thrombophilia results (APC resistance, AT by Xa-based methods).</li>
</ul>
<h3>Over-anticoagulation with warfarin</h3>
<ul>
<li>Major bleeding: stop warfarin, give IV vitamin K 5–10 mg and four-factor PCC (25–50 units/kg); check INR after PCC.</li>
<li>INR above 8 without bleeding: stop warfarin and give oral vitamin K 1–5 mg.</li>
<li>INR 5–8 without bleeding: withhold 1–2 doses; consider low-dose oral vitamin K if bleeding risk is high.</li>
</ul>
<p>Follow your local guideline; doses and thresholds differ slightly between the BSH, ACCP and ASH documents.</p>
<h3>Heparin resistance</h3>
<p>A high heparin requirement with a short APTT may reflect antithrombin deficiency or high FVIII and fibrinogen (acute phase). Anti-Xa monitoring avoids the second problem.</p>
`,
  points: [
    "UFH: APTT ratio or anti-Xa 0.3–0.7 IU/mL; reverse with protamine",
    "LMWH: anti-Xa only in renal failure, extremes of weight, pregnancy, children",
    "Warfarin: INR; reverse major bleeding with IV vitamin K and four-factor PCC",
    "Dabigatran: normal TT excludes significant drug; reverse with idarucizumab",
    "Xa inhibitors: drug-calibrated anti-Xa; PT and APTT unreliable",
    "Anticoagulants cause false-positive LA and thrombophilia results"
  ]
}
];

/* Atlas: platelet fields (plt), drawn nucleated cells (draw), and two cells shared with earlier modules. */
const M4_CELLS = [
{ id:"m4-plt-normal", name:"Normal platelets", group:"Platelets", plt:"normal",
  what:"Small anucleate fragments 1.5–3 µm across with fine purple granules, about 8 to 20 per oil-immersion field.", seen:"Normal blood. Count 150–400 × 10⁹/L.", tip:"Each platelet per oil field (×100) corresponds to roughly 15–20 × 10⁹/L; use it to check analyser counts." },
{ id:"m4-plt-low", name:"Thrombocytopenia on the film", group:"Platelets", plt:"low",
  what:"Very few platelets across many fields, with no clumps.", seen:"ITP, marrow failure, DIC, TTP, HIT, hypersplenism.", tip:"Scan the feathered edge and the whole film for clumps before accepting a low count." },
{ id:"m4-plt-clump", name:"Platelet clump", group:"Platelets", plt:"clump",
  what:"A large aggregate of platelets lying together, often at the feathered edge.", seen:"EDTA-dependent pseudothrombocytopenia, partly clotted samples, difficult venepuncture.", tip:"Repeat the count in citrate (multiply by 1.1 for dilution) or a warmed sample." },
{ id:"m4-satellite", name:"Platelet satellitism", group:"Platelets", sizeUm:12,
  what:"Platelets arranged in a ring around neutrophils.", seen:"EDTA-dependent antibodies; causes a falsely low platelet count.", tip:"Has no clinical significance in itself; report the citrate count.",
  draw:{ r:6.4, cyto:"#f1d8e2", nuc:{type:"lobes", n:3, lr:1.95, spread:2.7}, chrom:"clumped", gran:{color:"#c79bbd", n:120, s:0.13}, satellites:7 } },
{ id:"m4-plt-large", name:"Large platelets", group:"Platelets", plt:"large",
  what:"Platelets 4–6 µm across, larger than usual but smaller than a red cell.", seen:"Young platelets in ITP and other consumptive states, MPN, inherited macrothrombocytopenias.", tip:"A high mean platelet volume with a low count favours peripheral destruction over marrow failure." },
{ id:"m4-plt-giant", name:"Giant platelets", group:"Platelets", plt:"giant",
  what:"Platelets as large as or larger than a red cell.", seen:"Bernard–Soulier syndrome, MYH9-related disorders, MPN and MDS.", tip:"Analysers may count them as red cells, giving a falsely low platelet count; count manually or by immunological method." },
{ id:"m4-plt-grey", name:"Grey (agranular) platelets", group:"Platelets", plt:"grey",
  what:"Large, pale grey platelets lacking purple α-granules.", seen:"Grey platelet syndrome (NBEAL2), MDS, cardiopulmonary bypass (degranulation).", tip:"Confirm absent α-granules by electron microscopy or flow; look for marrow fibrosis." },
{ id:"m4-myh9", name:"Döhle-like inclusion (MYH9 disorder)", group:"Inherited", sizeUm:12,
  what:"A neutrophil with a pale blue, spindle-shaped cytoplasmic inclusion of aggregated non-muscle myosin heavy chain IIA.", seen:"MYH9-related disorders (May–Hegglin anomaly) with giant platelets and thrombocytopenia.", tip:"Unlike reactive Döhle bodies, inclusions are present in every neutrophil and there is no toxic granulation.",
  draw:{ r:6.4, cyto:"#f1d8e2", nuc:{type:"lobes", n:3, lr:1.95, spread:2.7}, chrom:"clumped", gran:{color:"#c79bbd", n:110, s:0.13}, dohle:1 } },
{ id:"m4-et-mk", name:"Large hyperlobated megakaryocyte (ET)", group:"Marrow", sizeUm:90,
  what:"A very large, mature megakaryocyte with a deeply folded, hyperlobated ('staghorn') nucleus and abundant granular cytoplasm.", seen:"Essential thrombocythaemia; also reactive states (smaller, normally lobated).", tip:"In ET they are large and scattered or loosely clustered; atypical, dense clusters suggest prefibrotic PMF.",
  draw:{ r:14, cyto:"#e1c3dc", nuc:{type:"mega", n:22, lr:2.7, spread:6.4}, chrom:"medium", gran:{color:"#a978a8", n:480, s:0.12}, plts:true, irregular:0.07 } }
];
const M4_SHARED = ["megakaryocyte", "m2-schisto"];

const M4_LESSON_CELLS = {
  "normal-haemostasis": ["m4-plt-normal", "megakaryocyte"],
  "coag-tests": ["m4-plt-clump", "m4-satellite"],
  thrombocytopenia: ["m4-plt-low", "m4-plt-clump", "m4-satellite", "m4-plt-large", "m2-schisto", "m4-plt-giant", "m4-myh9"],
  "vwd-platelets": ["m4-plt-giant", "m4-plt-grey", "m4-plt-normal"],
  haemophilia: ["m4-plt-normal"],
  dic: ["m2-schisto", "m4-plt-low"],
  thrombophilia: ["m4-et-mk"],
  anticoagulants: ["m4-plt-low"]
};

const M4_FACTS = [
  ["Which receptor binds VWF during platelet adhesion?", "GPIb–IX–V."],
  ["Which receptor mediates platelet aggregation?", "GPIIb/IIIa (integrin αIIbβ3), binding fibrinogen and VWF."],
  ["What does aspirin inhibit?", "COX-1, blocking thromboxane A2 synthesis for the platelet's lifetime."],
  ["What are the three phases of the cell-based model?", "Initiation, amplification and propagation."],
  ["Which factors does the PT test?", "VII, X, V, II and fibrinogen."],
  ["Which factors does the APTT test?", "XII, XI, IX, VIII, X, V, II and fibrinogen (and prekallikrein, HMWK)."],
  ["Which factor deficiency prolongs the APTT without bleeding?", "Factor XII (also prekallikrein and HMWK)."],
  ["Which vitamin K-dependent factor has the shortest half-life?", "Factor VII (about 6 hours)."],
  ["What is the correct citrate tube and ratio?", "3.2% sodium citrate, 9 parts blood to 1 part citrate, filled at least 90%."],
  ["How is citrate adjusted for a high haematocrit?", "Citrate (mL) = 0.00185 × blood volume (mL) × (100 − Hct%), when Hct is over 0.55."],
  ["What does a mixing study that corrects suggest?", "A factor deficiency."],
  ["Why incubate an APTT mix for 1–2 hours?", "Acquired FVIII inhibitors are time- and temperature-dependent."],
  ["How is the INR calculated?", "(Patient PT ÷ mean normal PT) raised to the power of the ISI."],
  ["What causes pseudothrombocytopenia?", "EDTA-dependent antiplatelet antibodies causing clumps or satellitism."],
  ["What ADAMTS13 level supports TTP?", "Below 10%."],
  ["What is the first treatment for suspected TTP?", "Urgent plasma exchange (with steroids; caplacizumab and rituximab)."],
  ["What does the PLASMIC score include?", "Platelets under 30, haemolysis, no active cancer, no transplant, MCV under 90 fL, INR under 1.5, creatinine under 2 mg/dL."],
  ["What are the 4Ts?", "Thrombocytopenia, Timing, Thrombosis, oTher causes."],
  ["When does HIT usually start?", "5–10 days after starting heparin (within a day if heparin was given in the previous 100 days)."],
  ["Why avoid warfarin in acute HIT?", "It lowers protein C and can cause venous limb gangrene and skin necrosis."],
  ["Which inherited thrombocytopenia has small platelets?", "Wiskott–Aldrich syndrome."],
  ["Which disorder has giant platelets and Döhle-like inclusions?", "MYH9-related disorders (May–Hegglin anomaly)."],
  ["What VWF level confirms VWD regardless of bleeding?", "Below 30 IU/dL (ASH/ISTH 2021)."],
  ["What ratio suggests type 2 VWD?", "VWF activity to antigen ratio under 0.7."],
  ["Which VWD type mimics mild haemophilia A?", "Type 2N (defective FVIII binding)."],
  ["Which VWD type shows enhanced RIPA at low ristocetin?", "Type 2B (and platelet-type pseudo-VWD)."],
  ["Why avoid DDAVP in type 2B VWD?", "It releases abnormal VWF and worsens thrombocytopenia."],
  ["Which blood group has lower VWF?", "Group O, about 25% lower."],
  ["What is Heyde syndrome?", "Aortic stenosis with GI bleeding from angiodysplasia and acquired VWD (loss of HMW multimers)."],
  ["Which platelet disorder fails to aggregate with all agonists except ristocetin?", "Glanzmann thrombasthenia (GPIIb/IIIa defect)."],
  ["What defines severe haemophilia?", "Factor level below 1 IU/dL."],
  ["What is a Bethesda unit?", "The amount of inhibitor that neutralises 50% of the factor in normal plasma."],
  ["How does emicizumab affect the APTT?", "It shortens the APTT to normal; one-stage FVIII and Bethesda assays become invalid."],
  ["Which deficiency bleeds with normal PT and APTT?", "Factor XIII (also VWD, platelet disorders, mild factor deficiencies)."],
  ["What is the ISTH overt DIC score threshold?", "5 or more."],
  ["What is the commonest cause of DIC?", "Sepsis."],
  ["What fibrinogen level predicts severe postpartum haemorrhage?", "Below 2 g/L."],
  ["How is the D-dimer cut-off age-adjusted?", "Age × 10 µg/L FEU for patients over 50."],
  ["What does factor V Leiden cause?", "Resistance to activated protein C."],
  ["Which natural anticoagulant deficiency carries the highest VTE risk?", "Antithrombin deficiency."],
  ["When should protein C and S not be tested?", "During acute thrombosis, on warfarin, in pregnancy (PS) or liver disease."],
  ["What laboratory criteria define APS?", "Persistent LA, aCL or anti-β2GPI on two occasions at least 12 weeks apart."],
  ["Which two tests are used for lupus anticoagulant?", "dRVVT and an LA-sensitive APTT, each with screen, mix and confirm."],
  ["What is the UFH anti-Xa target?", "0.3–0.7 IU/mL."],
  ["When is LMWH anti-Xa measured?", "3–4 hours after a dose."],
  ["What reverses dabigatran?", "Idarucizumab."],
  ["What reverses warfarin in major bleeding?", "IV vitamin K and four-factor prothrombin complex concentrate."],
  ["What does a normal thrombin time tell you about dabigatran?", "Clinically significant dabigatran is unlikely."]
];

const M4_QUIZ = [
{ q:"A patient has PT 11 s (normal), APTT 62 s (long). The 1:1 mix corrects immediately and after 2 hours of incubation. Which is most likely?", a:["Lupus anticoagulant","Acquired haemophilia A","Factor IX deficiency","Heparin contamination"], c:2,
  e:"Correction immediately and after incubation suggests a deficiency of an intrinsic factor. LA and heparin do not correct; acquired FVIII inhibitors fail to correct after incubation." },
{ q:"Which result pattern fits factor VII deficiency?", a:["Long PT, normal APTT","Normal PT, long APTT","Both long","Both normal"], c:0,
  e:"Factor VII is tested only by the PT." },
{ q:"A sample has haematocrit 0.65. What happens if the standard citrate tube is used?", a:["Falsely short PT and APTT","Falsely long PT and APTT","No effect","Falsely high fibrinogen"], c:1,
  e:"Less plasma means relatively too much citrate, which binds the calcium added in the test and prolongs clotting times." },
{ q:"Platelets 32 × 10⁹/L on an analyser; the film shows large platelet aggregates at the feathered edge. What is the next step?", a:["Platelet transfusion","Repeat the count on a citrate sample","Bone marrow aspirate","Start prednisolone"], c:1,
  e:"Clumps suggest EDTA-dependent pseudothrombocytopenia. Repeat in citrate and correct for dilution." },
{ q:"A 35-year-old woman has confusion, Hb 78 g/L, platelets 14 × 10⁹/L, many schistocytes, LDH 1800 U/L, normal PT, and negative DAT. What is the immediate management?", a:["Platelet transfusion","Urgent plasma exchange","Wait for ADAMTS13","IVIG"], c:1,
  e:"This is probable TTP. Start plasma exchange without waiting for ADAMTS13; platelet transfusion is avoided unless there is life-threatening bleeding." },
{ q:"Day 7 after hip surgery on prophylactic heparin, platelets fall from 280 to 95 × 10⁹/L and a DVT is found. No other cause. What is the 4Ts score?", a:["4","5","6","8"], c:3,
  e:"Fall over 50% with nadir 20 or more (2), day 5–10 onset (2), new thrombosis (2), no other cause (2): 8, high probability." },
{ q:"In suspected HIT with an intermediate 4Ts score, what should be done?", a:["Continue heparin and wait for the antibody test","Switch heparin to warfarin","Stop heparin and start a non-heparin anticoagulant","Transfuse platelets"], c:2,
  e:"Stop all heparin, start argatroban, fondaparinux, bivalirudin or a DOAC, and send the anti-PF4 immunoassay." },
{ q:"VWF:Ag 52 IU/dL, VWF activity (GPIbM) 18 IU/dL, FVIII 48 IU/dL, absent high-molecular-weight multimers, normal RIPA at low ristocetin. Which type?", a:["Type 1","Type 2A","Type 2B","Type 2N"], c:1,
  e:"Activity/antigen ratio 0.35 with loss of HMW multimers and no enhanced RIPA indicates type 2A." },
{ q:"Which finding most suggests type 2B VWD?", a:["Isolated low FVIII","Enhanced agglutination at low-dose ristocetin with thrombocytopenia","Absent VWF","Normal multimers with low activity"], c:1,
  e:"Gain-of-function VWF binds GPIb spontaneously, clearing platelets and HMW multimers." },
{ q:"Platelet aggregation is absent with ADP, collagen, adrenaline and arachidonic acid, but normal with ristocetin. Count and size are normal. Diagnosis?", a:["Bernard–Soulier syndrome","Glanzmann thrombasthenia","Aspirin effect","Type 3 VWD"], c:1,
  e:"Glanzmann thrombasthenia lacks GPIIb/IIIa, so fibrinogen-dependent aggregation fails; ristocetin agglutination needs only VWF and GPIb." },
{ q:"A boy has FVIII 0.6 IU/dL. How is his haemophilia classified?", a:["Mild","Moderate","Severe","Carrier level"], c:2,
  e:"Below 1 IU/dL is severe haemophilia." },
{ q:"A haemophilia A patient on emicizumab has an APTT of 28 s (normal). What does this mean?", a:["He is cured","Emicizumab has normalised the APTT; it does not reflect haemostatic protection","His inhibitor has disappeared","The sample is clotted"], c:1,
  e:"Emicizumab shortens APTT-based tests; use chromogenic assays with bovine reagents for FVIII or inhibitors." },
{ q:"A 78-year-old woman has large spontaneous bruises, Hb 84 g/L, normal PT and platelets, APTT 74 s that corrects immediately but prolongs after 2 hours of incubation. Diagnosis?", a:["Haemophilia A","Acquired haemophilia A","Lupus anticoagulant","Vitamin K deficiency"], c:1,
  e:"A time-dependent inhibitor in an older adult with extensive bleeding is acquired haemophilia A. Measure FVIII and the Bethesda titre." },
{ q:"Which deficiency causes umbilical stump bleeding with normal PT and APTT?", a:["Factor VII","Factor XII","Factor XIII","Factor XI"], c:2,
  e:"Factor XIII cross-links fibrin and is not tested by routine clotting screens." },
{ q:"A septic patient has platelets 42 × 10⁹/L, PT prolonged by 5 s, fibrinogen 0.9 g/L and a strongly raised D-dimer. What is the ISTH DIC score?", a:["5","6","7","8"], c:2,
  e:"Platelets under 50 (2), strong D-dimer rise (3), PT 3–6 s (1), fibrinogen under 1 (1): 7, overt DIC." },
{ q:"Which test is unreliable for diagnosing VTE in a hospitalised patient with high clinical probability?", a:["Compression ultrasound","CT pulmonary angiography","D-dimer","V/Q scan"], c:2,
  e:"D-dimer is only useful to exclude VTE when probability is low; it is often raised in inpatients." },
{ q:"Which thrombophilia test is valid during warfarin therapy?", a:["Protein C activity","Protein S free antigen","Factor V Leiden genotyping","Lupus anticoagulant dRVVT"], c:2,
  e:"Genetic tests are unaffected by anticoagulants. Warfarin lowers protein C and S and interferes with LA testing." },
{ q:"Which combination confirms the laboratory criteria for antiphospholipid syndrome?", a:["One positive LA during acute thrombosis","LA positive twice, 12 weeks apart","Low-titre aCL IgM once","Positive ANA"], c:1,
  e:"Antibodies must persist on two occasions at least 12 weeks apart, ideally tested off anticoagulation." },
{ q:"A patient on apixaban needs urgent surgery. Which test best measures the drug level?", a:["INR","APTT","Anti-Xa calibrated for apixaban","Thrombin time"], c:2,
  e:"PT and APTT are insensitive to apixaban; use a drug-calibrated anti-Xa assay." },
{ q:"Warfarin patient, INR 9.2, intracranial bleed. What is the correct reversal?", a:["Oral vitamin K only","Fresh frozen plasma only","IV vitamin K and four-factor PCC","Protamine"], c:2,
  e:"Major bleeding needs immediate PCC plus IV vitamin K to sustain the effect." }
];

const M4_CASES = [
{
  id:"m4-ttp", title:"Confusion and purpura", tag:"Thrombotic microangiopathy",
  stem:"A 38-year-old woman has 2 days of headache, confusion and bruising. Temperature 37.9 °C.",
  data:[["Hb","72 g/L"],["Platelets","11 × 10⁹/L"],["Retics","8%"],["LDH","2100 U/L"],["Creatinine","118 µmol/L"],["PT / APTT","Normal"]],
  steps:[
    { q:"The film shows many schistocytes. Which test best supports the haemolysis being microangiopathic rather than immune?", opts:["Direct antiglobulin test (negative)","Ferritin","Bone marrow","Haemoglobin electrophoresis"], c:0,
      fb:"A negative DAT with schistocytes and thrombocytopenia defines MAHA. Normal clotting tests argue against DIC." },
    { q:"Her PLASMIC score is 7. What should happen now?", opts:["Platelet transfusion","Urgent plasma exchange and steroids, before ADAMTS13 returns","Await ADAMTS13 result","Start eculizumab"], c:1,
      fb:"A high PLASMIC score means a high probability of severe ADAMTS13 deficiency. Delay in plasma exchange increases mortality." },
    { q:"ADAMTS13 activity is under 5% with an inhibitor. What else is now standard therapy?", opts:["Caplacizumab and rituximab","Warfarin","Splenectomy","Aspirin alone"], c:0,
      fb:"Caplacizumab blocks VWF–GPIb binding and shortens time to platelet recovery; rituximab reduces relapse." }
  ],
  teach:["MAHA plus thrombocytopenia is TTP until proven otherwise","Do not wait for ADAMTS13 before plasma exchange","Avoid platelet transfusion unless life-threatening bleeding","Monitor ADAMTS13 in remission to predict relapse"]
},
{
  id:"m4-hit", title:"Falling platelets after surgery", tag:"Heparin-induced thrombocytopenia",
  stem:"A 66-year-old man had a knee replacement 8 days ago and is on prophylactic LMWH. His calf is swollen today.",
  data:[["Platelets (day 0)","265 × 10⁹/L"],["Platelets (day 8)","84 × 10⁹/L"],["Ultrasound","Proximal DVT"],["Other causes","None found"]],
  steps:[
    { q:"What is his 4Ts score?", opts:["3 (low)","5 (intermediate)","8 (high)","2 (low)"], c:2,
      fb:"Fall of 68% with nadir 84 (2), onset day 8 (2), new thrombosis (2), no other cause (2): 8." },
    { q:"What is the immediate management?", opts:["Increase LMWH to treatment dose","Stop LMWH and start argatroban or fondaparinux","Start warfarin","Transfuse platelets"], c:1,
      fb:"Stop all heparin, including flushes, and give a non-heparin anticoagulant at therapeutic dose." },
    { q:"The anti-PF4 immunoassay is strongly positive. What confirms clinically important antibodies?", opts:["Repeat immunoassay","A functional assay such as SRA or HIPA","Platelet aggregation with ristocetin","D-dimer"], c:1,
      fb:"Functional assays show that the antibodies activate platelets; a high immunoassay optical density also raises the likelihood." }
  ],
  teach:["HIT causes thrombosis, not bleeding","Use the 4Ts before testing","Warfarin only after platelet recovery, overlapping with a non-heparin agent","Record heparin allergy prominently"]
},
{
  id:"m4-vwd", title:"Heavy periods since menarche", tag:"Von Willebrand disease",
  stem:"A 19-year-old woman has heavy menstrual bleeding, frequent nosebleeds and prolonged bleeding after a tooth extraction. Her mother bruises easily.",
  data:[["Platelets","256 × 10⁹/L"],["PT","12 s"],["APTT","38 s (ref 26–36)"],["Blood group","O"],["ISTH-BAT score","9"]],
  steps:[
    { q:"Which tests are the best first step?", opts:["Factor IX and XI","VWF antigen, VWF activity and FVIII","Platelet aggregation only","Lupus anticoagulant"], c:1,
      fb:"Mucocutaneous bleeding with a mildly long APTT suggests VWD; measure VWF:Ag, activity and FVIII together." },
    { q:"VWF:Ag 26 IU/dL, activity 24 IU/dL, FVIII 34 IU/dL, normal multimers. What is the diagnosis?", opts:["Type 2A VWD","Type 1 VWD","Type 2N VWD","Normal for blood group O"], c:1,
      fb:"Proportionate reduction below 30 IU/dL with normal multimers is type 1 VWD; blood group O does not explain levels this low." },
    { q:"What is the best plan for future dental extraction?", opts:["Avoid all treatment","DDAVP trial now; then DDAVP plus tranexamic acid for procedures","Prophylactic platelet transfusion","Warfarin reversal"], c:1,
      fb:"Most type 1 patients respond to desmopressin; confirm the response with a trial. Tranexamic acid helps mucosal bleeding." }
  ],
  teach:["Use a bleeding assessment tool","Repeat borderline VWF levels; stress and oestrogens raise them","Test VWF activity/antigen ratio to look for type 2","Heavy menstrual bleeding is often the main symptom"]
},
{
  id:"m4-haem", title:"A swollen knee in a toddler", tag:"Haemophilia",
  stem:"A 14-month-old boy, just walking, has a hot swollen knee after a minor fall. His maternal uncle had 'bleeding problems'.",
  data:[["Platelets","310 × 10⁹/L"],["PT","12 s"],["APTT","88 s"],["Fibrinogen","2.8 g/L"]],
  steps:[
    { q:"What is the most likely diagnosis?", opts:["VWD type 1","Haemophilia A or B","Factor VII deficiency","Non-accidental injury only"], c:1,
      fb:"Haemarthrosis in a boy with an isolated very long APTT and a maternal family history points to haemophilia." },
    { q:"FVIII is under 1 IU/dL. After 20 exposures to recombinant FVIII, bleeds stop responding. What should be tested?", opts:["FIX level","Bethesda assay for an FVIII inhibitor","D-dimer","Platelet function"], c:1,
      fb:"Inhibitors usually develop in the first 50 exposure days. Measure the titre with the Nijmegen–Bethesda assay." },
    { q:"He is started on emicizumab. His APTT is now 27 s. How should FVIII be measured in future?", opts:["One-stage APTT-based assay","Chromogenic assay with bovine reagents","PT","It cannot be measured"], c:1,
      fb:"Emicizumab interferes with APTT-based assays; bovine chromogenic assays are not affected." }
  ],
  teach:["Haemophilia is X-linked; test female carriers","Severity is set by the factor level","Inhibitors: Bethesda assay; bypassing agents or emicizumab","Know which assays emicizumab invalidates"]
},
{
  id:"m4-dic", title:"Bleeding after delivery", tag:"DIC",
  stem:"A 31-year-old woman has a placental abruption with intrauterine death and is now bleeding from venepuncture sites.",
  data:[["Hb","68 g/L"],["Platelets","48 × 10⁹/L"],["PT","19 s (ref 11–14)"],["APTT","52 s"],["Fibrinogen","0.8 g/L"],["D-dimer","Very high"]],
  steps:[
    { q:"What is her ISTH overt DIC score?", opts:["4","5","7","8"], c:3,
      fb:"Platelets under 50 (2), strong D-dimer (3), PT over 6 s prolonged (2), fibrinogen under 1 g/L (1): 8." },
    { q:"Which blood component is the priority?", opts:["Platelets alone","Fibrinogen concentrate or cryoprecipitate to raise fibrinogen above 2 g/L","Vitamin K","Albumin"], c:1,
      fb:"Low fibrinogen is the strongest predictor of severe postpartum bleeding; replace early along with red cells, plasma and platelets." },
    { q:"What else should be given early in obstetric haemorrhage?", opts:["Heparin","Tranexamic acid 1 g IV","Warfarin","Aspirin"], c:1,
      fb:"Tranexamic acid within 3 hours reduces death from postpartum haemorrhage (WOMAN trial)." }
  ],
  teach:["DIC is always secondary; deliver and treat the cause","Fibrinogen falls early in obstetric DIC","Use serial counts and fibrinogen to guide replacement","Viscoelastic testing can guide transfusion"]
}
];

const M4_TREES = [
{ id:"clotting", title:"Abnormal clotting screen", intro:"Start with a PT and APTT from a correctly filled citrate sample, with no heparin contamination.",
  nodes:{
  start:{ q:"Which test is prolonged?", opts:[["PT only","pt"],["APTT only","aptt"],["Both PT and APTT","both"],["Neither, but the patient bleeds","none"]] },
  pt:{ q:"Is the patient on warfarin, malnourished, on antibiotics, or jaundiced?", opts:[["Yes","vitk"],["No","f7"]] },
  vitk:{ end:"Early warfarin effect, vitamin K deficiency or liver disease", detail:"Factor VII falls first. Give vitamin K if deficient; check liver function." },
  f7:{ end:"Probable factor VII deficiency", detail:"Assay factor VII. Mild deficiency is common and often asymptomatic." },
  aptt:{ q:"Is heparin possible (line sample, treatment)? Is the TT long?", opts:[["Yes, TT long","hep"],["No","mix"]] },
  hep:{ end:"Heparin effect", detail:"Repeat from a fresh venepuncture, or neutralise heparin (heparinase) and repeat." },
  mix:{ q:"1:1 mixing study: does it correct, immediately and after 2 hours at 37 °C?", opts:[["Corrects both times","deficiency"],["Corrects immediately, prolongs after incubation","acqh"],["Does not correct","la"]] },
  deficiency:{ q:"Does the patient have a bleeding history?", opts:[["Yes","factors"],["No","f12"]] },
  factors:{ end:"Factor VIII, IX or XI deficiency, or VWD", detail:"Assay FVIII, FIX, FXI and VWF (antigen and activity). In a male child with joint bleeds, think haemophilia." },
  f12:{ end:"Probable factor XII (or prekallikrein, HMWK) deficiency", detail:"Assay FXII. No bleeding risk; procedures can go ahead." },
  acqh:{ end:"Acquired haemophilia A (time-dependent FVIII inhibitor)", detail:"Urgent: low FVIII, Bethesda titre. Bypassing agents for bleeding; immunosuppression." },
  la:{ q:"Is the dRVVT or LA-sensitive APTT confirm step positive?", opts:[["Yes","laa"],["No","inh"]] },
  laa:{ end:"Lupus anticoagulant", detail:"Thrombotic, not haemorrhagic. Repeat after 12 weeks with aCL and anti-β2GPI." },
  inh:{ end:"Specific factor inhibitor (rare)", detail:"Assay factors at several dilutions; Bethesda assay for the affected factor." },
  both:{ q:"Are platelets low and D-dimer high, with low fibrinogen?", opts:[["Yes","dic"],["No","both2"]] },
  dic:{ end:"Probable DIC", detail:"Calculate the ISTH score; treat the cause; replace for bleeding." },
  both2:{ q:"Is the patient on warfarin or a DOAC, or has liver disease or vitamin K deficiency?", opts:[["Yes","drug"],["No","common"]] },
  drug:{ end:"Drug effect, liver disease or vitamin K deficiency", detail:"Check INR, drug levels (anti-Xa, dTT) and liver tests. Factor V is normal in vitamin K deficiency and low in liver disease." },
  common:{ end:"Common pathway deficiency (X, V, II) or fibrinogen disorder", detail:"Assay factors X, V and II and Clauss fibrinogen (with antigen for dysfibrinogenaemia). Consider amyloidosis (acquired factor X deficiency)." },
  none:{ q:"Is the bleeding mucocutaneous (nose, gums, menstrual, bruising)?", opts:[["Yes","muco"],["No, deep or delayed bleeding","deep"]] },
  muco:{ end:"Investigate VWD and platelet function", detail:"VWF:Ag, activity, FVIII; film and platelet size; PFA-100 and aggregometry. Check drugs (aspirin, SSRIs)." },
  deep:{ end:"Check factor XIII and mild factor deficiencies", detail:"FXIII assay, FVIII, FIX, FXI, fibrinogen; consider hyperfibrinolysis (α2-antiplasmin, PAI-1)." }
  }},
{ id:"lowplt", title:"Thrombocytopenia", intro:"Use for a platelet count under 150 × 10⁹/L.",
  nodes:{
  start:{ q:"Does the film show platelet clumps or satellitism?", opts:[["Yes","pseudo"],["No","maha"]] },
  pseudo:{ end:"Pseudothrombocytopenia", detail:"Repeat in citrate (× 1.1) and report the corrected count." },
  maha:{ q:"Are there schistocytes with haemolysis (high LDH, low haptoglobin)?", opts:[["Yes","tma"],["No","hep"]] },
  tma:{ q:"Are PT, APTT and fibrinogen normal?", opts:[["Yes","ttp"],["No, abnormal","dic"]] },
  ttp:{ end:"Thrombotic microangiopathy: TTP until proven otherwise", detail:"PLASMIC score, ADAMTS13, urgent plasma exchange. Stool for STEC in diarrhoea (HUS)." },
  dic:{ end:"DIC", detail:"ISTH score; treat the cause." },
  hep:{ q:"Has the patient received heparin in the last 100 days?", opts:[["Yes","hit"],["No","other"]] },
  hit:{ end:"Assess HIT with the 4Ts score", detail:"Intermediate or high: stop heparin, non-heparin anticoagulant, anti-PF4 assay." },
  other:{ q:"Are the other blood counts or the film abnormal (blasts, dysplasia, leucoerythroblastic)?", opts:[["Yes","marrow"],["No","iso"]] },
  marrow:{ end:"Marrow disorder", detail:"Bone marrow aspirate and trephine: leukaemia, MDS, aplasia, infiltration, megaloblastic anaemia." },
  iso:{ q:"Is there splenomegaly, liver disease or pregnancy?", opts:[["Splenomegaly or liver disease","spleen"],["Pregnancy","preg"],["None","itp"]] },
  spleen:{ end:"Hypersplenism", detail:"Usually moderate thrombocytopenia; check portal hypertension." },
  preg:{ end:"Gestational thrombocytopenia, pre-eclampsia/HELLP or ITP", detail:"Gestational: over 70 × 10⁹/L in late pregnancy. Check BP, liver enzymes, LDH." },
  itp:{ q:"Are platelets large, or the family affected from childhood?", opts:[["Lifelong with family history","inh"],["Acquired","itp2"]] },
  inh:{ end:"Consider an inherited thrombocytopenia", detail:"Platelet size, neutrophil inclusions (MYH9), flow for GPIb/GPIIb-IIIa, gene panel." },
  itp2:{ end:"Immune thrombocytopenia (diagnosis of exclusion)", detail:"Check drugs, HIV, HCV, H. pylori, thyroid; DAT; treat if bleeding or very low." }
  }}
];

const M4_CHECKLIST = { title:"Coagulation sample checks", intro:"Check these before releasing an abnormal coagulation result. Tick each step as you go.", steps:[
  ["Right tube and fill", "3.2% citrate, 9:1, filled at least 90%. Underfilling prolongs results."],
  ["Haematocrit", "If Hct is over 0.55, request a new sample with adjusted citrate."],
  ["Clots and haemolysis", "A clotted sample shortens or prolongs results and lowers fibrinogen and platelets. Reject it."],
  ["Heparin contamination", "Line samples, a very long APTT and TT. Repeat from a clean venepuncture."],
  ["Timing and storage", "PT within 24 h, APTT within 4 h; freeze plasma for specialist tests (double-centrifuged, platelet-poor)."],
  ["Anticoagulant history", "Warfarin, heparin, DOACs, emicizumab: record the drug, dose and time of last dose."],
  ["Interpret the pattern", "PT, APTT, TT, fibrinogen and platelets together; decide on mixing study or factor assays."],
  ["Phone critical results", "Fibrinogen under 1 g/L, INR over 5 (or local limit), unexpected very long APTT, platelets under 20 × 10⁹/L, suspected TTP or HIT."]
]};

/* Coagulation cascade animation: classical laboratory model. */
const CASCADE = {
  nodes: [
    { id: "XII", x: 70, y: 40, p: "aptt" }, { id: "XI", x: 70, y: 100, p: "aptt" }, { id: "IX", x: 70, y: 160, p: "aptt" }, { id: "VIII", x: 150, y: 160, p: "aptt", co: true },
    { id: "VII", x: 390, y: 100, p: "pt" }, { id: "TF", x: 470, y: 100, p: "pt", co: true },
    { id: "X", x: 240, y: 230, p: "common" }, { id: "V", x: 320, y: 230, p: "common", co: true },
    { id: "II", x: 240, y: 300, p: "common" }, { id: "I", x: 240, y: 370, p: "common", label: "Fibrinogen" }, { id: "XIII", x: 360, y: 370, p: "none" }
  ],
  edges: [["XII", "XI"], ["XI", "IX"], ["IX", "X"], ["VIII", "X"], ["VII", "X"], ["TF", "VII"], ["X", "II"], ["V", "II"], ["II", "I"], ["XIII", "I"]],
  presets: [
    ["Normal", []], ["Haemophilia A", ["VIII"]], ["Haemophilia B", ["IX"]], ["FXII deficiency", ["XII"]], ["FVII deficiency", ["VII"]],
    ["Warfarin", ["II", "VII", "IX", "X"]], ["Liver disease", ["II", "V", "VII", "IX", "X", "XI", "I"]], ["Low fibrinogen", ["I"]], ["FXIII deficiency", ["XIII"]]
  ],
  notes: {
    XII: "Factor XII deficiency prolongs the APTT but causes no bleeding.", XI: "FXI deficiency: variable bleeding, especially after oral or urological surgery.",
    IX: "Haemophilia B (Christmas disease), X-linked.", VIII: "Haemophilia A, X-linked; also low in VWD.", VII: "Isolated long PT; shortest half-life of the vitamin K factors.",
    X: "Common pathway: prolongs PT and APTT. Acquired deficiency in amyloidosis.", V: "Common pathway; low in liver disease but not in vitamin K deficiency.",
    II: "Prothrombin, the common pathway; G20210A raises it.", I: "Low fibrinogen prolongs PT, APTT and TT.", XIII: "Cross-links fibrin; routine tests are normal.", TF: "Tissue factor is the PT reagent itself."
  }
};
