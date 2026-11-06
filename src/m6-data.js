/* Module 6 content: Practical haemostasis laboratory. Original teaching text written for this app;
   no text or figures are copied from the books. Methods follow CLSI, ICSH, ISTH SSC and BSH guidance as
   summarised in Kitchen et al., Laboratory Hemostasis: A Practical Guide (2015), Dacie and Lewis (chapters 18
   to 20) and Marder et al., Hemostasis and Thrombosis (6th ed.). Reference values are illustrative: every
   laboratory must use its own. */

Object.assign(SOURCES, {
  lh2: "Kitchen et al., Laboratory Hemostasis (2015), chapter 2: Collection of coagulation specimens",
  lh3: "Kitchen et al., Laboratory Hemostasis (2015), chapters 3 and 4: Instrumentation; validation of assays, analysers and reagents",
  lh5: "Kitchen et al., Laboratory Hemostasis (2015), chapter 5: Hemostasis screening assays",
  lh6: "Kitchen et al., Laboratory Hemostasis (2015), chapter 6: Testing for inherited bleeding disorders",
  lh7: "Kitchen et al., Laboratory Hemostasis (2015), chapter 7: Testing for acquired platelet disorders",
  lh8: "Kitchen et al., Laboratory Hemostasis (2015), chapter 8: Acquired coagulation disorders and TTP",
  lh9: "Kitchen et al., Laboratory Hemostasis (2015), chapter 9: Testing for inherited and acquired thrombotic disorders",
  lh10: "Kitchen et al., Laboratory Hemostasis (2015), chapters 10 and 12: Monitoring anticoagulant therapy; coagulation testing and transfusion",
  isthla: "Devreese et al., ISTH SSC guidance on lupus anticoagulant detection (J Thromb Haemost 2020)",
  vwd21: "ASH ISTH NHF WFH 2021 guidelines on the diagnosis of von Willebrand disease (Blood Adv 2021)",
  isthlta: "Cattaneo et al., ISTH SSC recommendations for light transmission aggregometry (J Thromb Haemost 2013)",
  ph: "Perry DJ, Practical-Haemostasis.com: a free online guide to haemostasis laboratory tests (Cambridge, UK)",
  coagnotes2: "Coagulation lecture notes (project library): evaluation of haemostasis, platelet and factor disorders, thrombophilia"
});

const M6_LESSONS = [
{
  id: "m6-pre",
  title: "The coagulation sample: collection, processing and storage",
  minutes: 14,
  sources: ["lh2", "dl18", "coagnotes2"],
  video: "coagulation specimen collection citrate tube fill platelet poor plasma double centrifugation",
  body: `
<p>Most unexpected coagulation results are made before the sample reaches the analyser. The haemostasis laboratory checks the tube before it trusts the number.</p>
<h3>Collection</h3>
<ul>
<li><b>Anticoagulant:</b> 3.2% (109 mmol/L) trisodium citrate, 9 volumes of blood to 1 of citrate. 3.8% citrate gives longer times with sensitive reagents; a laboratory uses one strength only.</li>
<li><b>Fill:</b> at least 90% of the nominal volume. Under-filling leaves excess citrate, which binds the calcium added in the test and prolongs the PT and APTT.</li>
<li><b>Haematocrit over 0.55:</b> less plasma means relatively too much citrate. Adjust the citrate: volume (mL) = 0.00185 × blood volume (mL) × (100 − Hct%).</li>
<li><b>Order of draw:</b> blood culture, then citrate, then serum, heparin, EDTA, fluoride. Carry-over of EDTA or clot activator ruins a coagulation sample.</li>
<li><b>Butterfly needles:</b> draw a discard tube first so the air in the tubing does not under-fill the citrate tube.</li>
<li><b>Lines:</b> avoid heparinised lines. If unavoidable, flush with saline and discard 5 mL or six dead-space volumes first.</li>
<li>Short tourniquet (under 1 minute), clean venepuncture, gentle mixing by 3 to 4 inversions. Traumatic draws activate platelets and factors.</li>
</ul>
<h3>Processing</h3>
<ul>
<li><b>Platelet-poor plasma (PPP):</b> centrifuge so the plasma has fewer than 10 × 10⁹/L platelets, for example 1500 g for 15 minutes at room temperature.</li>
<li><b>Double centrifugation</b> before freezing, and always for lupus anticoagulant tests: residual platelets break when frozen and release phospholipid, which neutralises the antibody.</li>
<li><b>Platelet-rich plasma (PRP)</b> for aggregometry: a gentle spin (about 200 g for 10 minutes) with no brake.</li>
<li>Remove plasma with a plastic pipette, well above the buffy coat.</li>
</ul>
<h3>Stability (typical, uncentrifuged or centrifuged and capped, room temperature)</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>Test</th><th>Test within</th><th>Note</th></tr></thead><tbody>
<tr><td>PT and INR</td><td>24 h</td><td>Do not refrigerate whole blood: cold activates factor VII</td></tr>
<tr><td>APTT (no heparin)</td><td>4 h</td><td>FVIII and FV fall with time</td></tr>
<tr><td>APTT or anti-Xa on unfractionated heparin</td><td>Centrifuge within 1 h</td><td>Platelets release PF4, which neutralises heparin</td></tr>
<tr><td>FVIII, VWF, other factors</td><td>4 h</td><td>Keep whole blood at room temperature; cold lowers VWF and FVIII</td></tr>
<tr><td>Frozen PPP</td><td>2 weeks at −20 °C; months at −70 °C</td><td>Thaw quickly at 37 °C and mix before testing</td></tr>
</tbody></table></div>
<h3>Interferences</h3>
<ul>
<li><b>Clotted sample:</b> consumes fibrinogen and factors and can shorten or lengthen times. Check every tube for clots; reject, never "correct".</li>
<li><b>Haemolysis:</b> releases phospholipid and tissue factor-like material and interferes with optical endpoints. Most guidelines say reject grossly haemolysed samples.</li>
<li><b>Lipaemia and icterus:</b> interfere with optical (photometric) clot detection and chromogenic assays. A mechanical (viscosity-based) instrument is unaffected.</li>
<li><b>Heparin contamination:</b> very long APTT and TT, normal reptilase time. Repeat from a clean venepuncture.</li>
</ul>
`,
  points: [
    "3.2% citrate, 9:1, fill at least 90%",
    "Hct over 0.55: citrate (mL) = 0.00185 × blood (mL) × (100 − Hct%)",
    "Platelet-poor plasma: under 10 × 10⁹/L; double-spin before freezing and for LA",
    "PT 24 h, APTT 4 h; heparin samples centrifuged within 1 h",
    "Never refrigerate whole blood for PT (FVII activation) or VWF (cold loss)",
    "Reject clotted, under-filled and contaminated samples"
  ]
},
{
  id: "m6-screen",
  title: "The screening tests at the bench: PT, APTT, TT, reptilase and fibrinogen",
  minutes: 18,
  sources: ["lh5", "lh3", "dl18"],
  video: "PT APTT thrombin time reptilase time Clauss fibrinogen principle coagulometer",
  body: `
<p>Every clotting time measures how long recalcified plasma takes to form fibrin after a reagent starts the reaction at 37 °C. The reagent decides which factors the test sees.</p>
<div class="tablewrap"><table class="t"><thead><tr><th>Test</th><th>Reagent</th><th>Factors tested</th><th>Prolonged by</th></tr></thead><tbody>
<tr><td>Prothrombin time (PT)</td><td>Thromboplastin (tissue factor + phospholipid) and calcium</td><td>VII, X, V, II, fibrinogen</td><td>VKAs, vitamin K deficiency, liver disease, DIC, rivaroxaban (reagent-dependent)</td></tr>
<tr><td>Activated partial thromboplastin time (APTT)</td><td>Contact activator (silica, kaolin or ellagic acid) and phospholipid, incubated; then calcium</td><td>XII, XI, IX, VIII, X, V, II, fibrinogen, prekallikrein, HMWK</td><td>Haemophilia, VWD, heparin, lupus anticoagulant, dabigatran, FXII deficiency</td></tr>
<tr><td>Thrombin time (TT)</td><td>Low-concentration thrombin</td><td>Fibrinogen to fibrin</td><td>Heparin, dabigatran, low or abnormal fibrinogen, FDPs, paraprotein</td></tr>
<tr><td>Reptilase time</td><td>Batroxobin (snake venom); not inhibited by antithrombin</td><td>Fibrinogen to fibrin</td><td>Low or abnormal fibrinogen, FDPs; <b>not</b> heparin or dabigatran</td></tr>
<tr><td>Clauss fibrinogen</td><td>Diluted plasma (usually 1 in 10) + high-concentration thrombin</td><td>Functional fibrinogen</td><td>Read from a calibration curve; high doses of heparin or dabigatran can lower it</td></tr>
</tbody></table></div>
<h3>Clot detection</h3>
<ul>
<li><b>Mechanical</b> (a steel ball whose movement changes as the clot forms): unaffected by lipaemia, bilirubin or haemolysis.</li>
<li><b>Optical</b> (change in light scatter or absorbance): also gives the clot waveform, but colour and turbidity interfere.</li>
<li><b>Chromogenic</b> (a synthetic substrate releases a coloured product): used for anti-Xa, antithrombin, protein C and chromogenic FVIII.</li>
</ul>
<h3>Reading TT and reptilase together</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>TT</th><th>Reptilase</th><th>Most likely</th></tr></thead><tbody>
<tr><td>Long</td><td>Normal</td><td>Heparin (including line contamination) or a direct thrombin inhibitor such as dabigatran</td></tr>
<tr><td>Long</td><td>Long</td><td>Hypofibrinogenaemia, dysfibrinogenaemia, FDPs (DIC, thrombolysis), paraprotein</td></tr>
<tr><td>Normal</td><td>Normal</td><td>Fibrinogen conversion is normal</td></tr>
</tbody></table></div>
<h3>What the laboratory must set up locally</h3>
<ul>
<li><b>Reference ranges</b> for each reagent and instrument (at least 20 healthy adults to verify, 120 to establish).</li>
<li><b>The INR:</b> a mean normal PT (MNPT), the geometric mean of at least 20 healthy adults, with every new reagent lot; and an ISI checked with certified plasmas. INR = (PT ÷ MNPT)<sup>ISI</sup>.</li>
<li><b>The APTT heparin therapeutic range</b> for unfractionated heparin: plot APTT against anti-Xa in samples from patients on heparin and take the APTT range that matches anti-Xa 0.3–0.7 IU/mL. A fixed ratio such as 1.5–2.5 is not transferable between reagents. Repeat with each new reagent lot.</li>
<li><b>Reagent sensitivity:</b> know how your APTT reagent responds to FVIII, FIX and FXI deficiency, heparin and lupus anticoagulant. Many labs keep an LA-insensitive APTT for routine use and an LA-sensitive one for LA testing.</li>
</ul>
<h3>Fibrinogen methods</h3>
<p>The Clauss method is the reference. <b>PT-derived fibrinogen</b> (from the change in optical density during the PT) is cheap but overestimates fibrinogen in DIC, liver disease, dysfibrinogenaemia and on thrombolytics. A fibrinogen <b>antigen</b> (immunological) assay is needed to diagnose dysfibrinogenaemia: functional to antigen ratio under about 0.7.</p>
<h3>Short clotting times</h3>
<p>A short APTT usually reflects high FVIII (acute phase, pregnancy) or a sample activated during a difficult draw. It is not a reliable marker of thrombotic risk.</p>
`,
  points: [
    "PT: VII, X, V, II, I · APTT: XII, XI, IX, VIII, X, V, II, I",
    "Long TT with normal reptilase = heparin or dabigatran",
    "Long TT and reptilase = fibrinogen problem or FDPs",
    "INR needs a local MNPT (≥20 normals) and a verified ISI",
    "UFH APTT range = APTT matching anti-Xa 0.3–0.7 IU/mL, per reagent lot",
    "Clauss is the reference fibrinogen; antigen needed for dysfibrinogenaemia"
  ]
},
{
  id: "m6-mix",
  title: "Mixing studies and inhibitor assays (Bethesda and Nijmegen)",
  minutes: 18,
  sources: ["lh6", "lh8", "labhaem"],
  video: "mixing study incubated APTT acquired haemophilia Bethesda assay Nijmegen modification",
  body: `
<p>When the PT or APTT is long and heparin is excluded, the mixing study asks one question: is something missing, or is something blocking?</p>
<h3>Method</h3>
<ol>
<li>Mix patient plasma 1 + 1 with normal pooled plasma (NPP, about 100% of every factor).</li>
<li>Test the mix at once (<b>immediate mix</b>).</li>
<li>For a long APTT, also incubate the mix for 1 to 2 hours at 37 °C. Incubate patient plasma and NPP <b>separately</b> alongside, and mix them at the end as a control (<b>incubated controls</b>), because labile factors fall during incubation.</li>
</ol>
<h3>Interpretation</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>Immediate mix</th><th>Incubated mix</th><th>Interpretation</th></tr></thead><tbody>
<tr><td>Corrects</td><td>Corrects</td><td>Factor deficiency (50% of any factor gives a normal time)</td></tr>
<tr><td>Does not correct</td><td>Does not correct</td><td>Immediate-acting inhibitor: lupus anticoagulant, heparin, DOAC, high-titre factor inhibitor</td></tr>
<tr><td>Corrects</td><td>Prolongs again</td><td>Time-dependent inhibitor: typical of acquired FVIII inhibitors</td></tr>
</tbody></table></div>
<p>"Corrects" needs a definition agreed in advance. Common ones: the mix falls within the reference range; the Rosner index, (mix − NPP) ÷ patient × 100, is under the local cut-off (often 11–15); or the mix is within 10–15% of the NPP time. A mild deficiency (factor 20–40%) may not prolong the time enough to judge correction: a mixing study is most useful when the clotting time is clearly long.</p>
<h3>Pitfalls</h3>
<ul>
<li>Exclude heparin first: TT, reptilase, anti-Xa or heparinase-treated repeat.</li>
<li>Weak lupus anticoagulants can be diluted out and appear to correct.</li>
<li>Combined deficiencies (liver disease, DIC) correct.</li>
<li>Use a well-characterised NPP with all factors near 100%; commercial pools vary.</li>
</ul>
<h3>The Bethesda assay (for FVIII inhibitors)</h3>
<ol>
<li>Mix dilutions of patient plasma with an equal volume of NPP. The control is NPP mixed with buffer.</li>
<li>Incubate both for 2 hours at 37 °C.</li>
<li>Measure FVIII in each and calculate the <b>residual activity</b> (RA) = FVIII in test ÷ FVIII in control × 100%.</li>
<li>One Bethesda unit (BU) is the amount of inhibitor that destroys 50% of FVIII in 2 hours. Use the dilution whose RA is nearest 50% (between 25% and 75%): <b>BU = (2 − log₁₀ RA%) ÷ 0.301 × dilution</b>.</li>
</ol>
<p><b>Nijmegen modification:</b> buffer the NPP with imidazole (pH 7.4) and use FVIII-deficient plasma instead of buffer in the control. This keeps the pH and protein content equal and removes false-positive low titres. A titre of 0.6 BU or more is usually taken as positive; 5 BU or more is a high titre.</p>
<h3>Practical points</h3>
<ul>
<li>Patients recently given FVIII: heat the plasma to 56 °C for 30 minutes to destroy residual FVIII before the assay.</li>
<li><b>Acquired haemophilia A</b> autoantibodies follow complex (type 2) kinetics: some FVIII remains measurable and the titre underestimates the severity. Bleeding does not correlate with FVIII or BU.</li>
<li><b>Emicizumab</b> (a bispecific antibody that mimics FVIIIa) shortens the APTT to normal and makes one-stage FVIII and clot-based Bethesda assays meaningless. Use a chromogenic FVIII assay with bovine reagents for FVIII and inhibitor testing.</li>
<li>FIX inhibitors are measured the same way with FIX assays.</li>
</ul>
`,
  points: [
    "Mix 1:1 with NPP; test immediately and after 1–2 h at 37 °C",
    "Corrects = deficiency; no correction = inhibitor (LA, heparin, DOAC, factor inhibitor)",
    "FVIII autoantibodies are time-dependent: correct at once, prolong after incubation",
    "1 BU destroys 50% of FVIII in 2 h; BU = (2 − log RA%) ÷ 0.301 × dilution",
    "Nijmegen: buffered NPP, FVIII-deficient plasma in the control; ≥0.6 BU positive",
    "Emicizumab: use bovine chromogenic FVIII and Bethesda assays"
  ]
},
{
  id: "m6-factors",
  title: "Factor assays: one-stage, chromogenic, FXIII and fibrinogen variants",
  minutes: 15,
  sources: ["lh6", "dl18", "colman"],
  video: "one stage factor VIII assay parallel line chromogenic factor VIII discrepancy factor XIII assay",
  body: `
<h3>One-stage clotting assays</h3>
<p>Patient plasma is diluted (for example 1 in 10, 1 in 20 and 1 in 40) into plasma that lacks only the factor being measured. The APTT (VIII, IX, XI, XII) or PT (II, V, VII, X) of each dilution is compared with a calibration curve made from a reference plasma traceable to a WHO standard.</p>
<ul>
<li><b>Parallelism:</b> the patient's dose–response line must run parallel to the calibration line. If apparent activity <b>rises with dilution</b>, an inhibitor (lupus anticoagulant, a factor inhibitor, heparin, DOAC) is being diluted out. Report the highest plateau result only with a comment, or use a chromogenic method.</li>
<li>Several intrinsic factors may appear low together when LA is present: a classic clue.</li>
<li>Low levels (under 1–2%) need an extended calibration curve.</li>
</ul>
<h3>Chromogenic assays</h3>
<p>FVIII (or FIX) in the patient's plasma acts as a cofactor in a purified system that generates FXa, which is measured with a coloured substrate. Chromogenic assays are less affected by lupus anticoagulant and heparin.</p>
<ul>
<li><b>Assay discrepancy in mild haemophilia A:</b> in about a third of patients the one-stage and chromogenic results differ by more than twofold. Some have a normal one-stage result and a low chromogenic one, so a normal one-stage FVIII does not exclude mild haemophilia. Measure both when the history suggests it.</li>
<li><b>Replacement products:</b> some modified (extended half-life) FVIII and FIX products are under- or over-estimated by certain APTT reagents. Use a method validated for the product, often chromogenic or product-specific.</li>
<li><b>Emicizumab:</b> bovine-reagent chromogenic FVIII only; the drug level itself is measured with a modified one-stage assay calibrated for emicizumab.</li>
</ul>
<h3>Factor XIII</h3>
<p>FXIII deficiency gives a <b>normal PT, APTT, TT and fibrinogen</b>, with umbilical stump bleeding, delayed bleeding and poor wound healing. The old clot solubility test (5 M urea or 1% monochloroacetic acid) detects only very severe deficiency (under about 1–5%). Use a quantitative FXIII activity assay (ammonia-release or amine incorporation, with a plasma blank), then FXIII-A and FXIII-B antigens to classify.</p>
<h3>Fibrinogen disorders</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>Disorder</th><th>Clauss</th><th>Antigen</th><th>TT and reptilase</th></tr></thead><tbody>
<tr><td>Afibrinogenaemia</td><td>Unmeasurable</td><td>Unmeasurable</td><td>Unclottable</td></tr>
<tr><td>Hypofibrinogenaemia</td><td>Low</td><td>Low (ratio about 1)</td><td>Long</td></tr>
<tr><td>Dysfibrinogenaemia</td><td>Low</td><td>Normal (ratio under 0.7)</td><td>Long (reptilase often longer)</td></tr>
<tr><td>Hypodysfibrinogenaemia</td><td>Low</td><td>Low, but more than Clauss</td><td>Long</td></tr>
</tbody></table></div>
<p>Dysfibrinogenaemia may be asymptomatic, cause bleeding, or cause thrombosis. Acquired forms occur in liver disease. The PT-derived fibrinogen is often falsely normal.</p>
<h3>Reporting</h3>
<ul>
<li>Report factor levels in IU/dL (or %) against a WHO-traceable calibrator.</li>
<li>Severity of haemophilia: severe under 1, moderate 1–5, mild over 5 to under 40 IU/dL.</li>
<li>Repeat a low result on a new sample before a lifelong diagnosis.</li>
</ul>
`,
  points: [
    "One-stage: three dilutions; non-parallel lines mean an inhibitor",
    "Activity rising with dilution = LA or other inhibitor",
    "Mild haemophilia A: one-stage and chromogenic can disagree; measure both",
    "FXIII deficiency: normal screen; clot solubility misses all but severe cases",
    "Dysfibrinogenaemia: Clauss low, antigen normal, ratio under 0.7",
    "Haemophilia: severe <1, moderate 1–5, mild >5–<40 IU/dL"
  ]
},
{
  id: "m6-la",
  title: "Lupus anticoagulant testing (ISTH 2020)",
  minutes: 18,
  sources: ["isthla", "lh9", "labhaem"],
  video: "lupus anticoagulant testing dRVVT screen mix confirm normalised ratio ISTH 2020",
  body: `
<p>Lupus anticoagulants (LA) are antiphospholipid antibodies that prolong phospholipid-dependent clotting tests in vitro, yet predispose to thrombosis and pregnancy loss. Testing is a three-step, two-test process.</p>
<h3>Whom and when to test</h3>
<ul>
<li>Test only when the probability of antiphospholipid syndrome (APS) is significant: unprovoked or unusual-site thrombosis in younger patients, arterial thrombosis in the young, recurrent pregnancy loss or late pregnancy complications, an unexplained long APTT.</li>
<li>Ideally test away from the acute event and before anticoagulation. In the acute phase high FVIII and CRP can mask or mimic LA; interpret with care.</li>
<li>A positive result must be <b>persistent</b>: repeat after at least 12 weeks.</li>
</ul>
<h3>Two tests based on different principles</h3>
<ul>
<li><b>Dilute Russell viper venom time (dRVVT):</b> the venom activates factor X directly, so the test bypasses the contact factors and FVIII, IX and XI.</li>
<li><b>LA-sensitive APTT</b>: silica activator with low phospholipid.</li>
<li>LA is present if <b>either</b> test is positive. Do not use more than two tests: false positives rise.</li>
</ul>
<h3>Screen, mix, confirm</h3>
<ol>
<li><b>Screen:</b> low phospholipid. Express as a ratio to NPP (patient ÷ NPP clotting time).</li>
<li><b>Mix:</b> patient + NPP 1:1, not incubated. A long mix shows an inhibitor. Interpret against a mixing cut-off or with the index of circulating anticoagulant (ICA).</li>
<li><b>Confirm:</b> high phospholipid, which swamps the antibody and shortens the time. Calculate the <b>normalised ratio</b> (screen ratio ÷ confirm ratio) or the <b>percent correction</b> ((screen ratio − confirm ratio) ÷ screen ratio × 100).</li>
</ol>
<p>Cut-offs are the 99th percentile of at least 120 healthy donors for each reagent (or a verified transferred cut-off). A typical dRVVT normalised ratio cut-off is about 1.2, but each laboratory sets its own.</p>
<h3>Anticoagulants and LA</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>Drug</th><th>Effect</th><th>Practical advice</th></tr></thead><tbody>
<tr><td>Unfractionated heparin or LMWH</td><td>Prolong APTT and dRVVT</td><td>Most dRVVT reagents contain a heparin neutraliser up to about 0.8–1 IU/mL; check the anti-Xa and the reagent's limit</td></tr>
<tr><td>Vitamin K antagonists</td><td>Prolong screen and confirm; false positives and negatives</td><td>Test when the INR is under 1.5, or test a 1:1 mix with NPP; or use Taipan venom time with ecarin time as confirm</td></tr>
<tr><td>DOACs (rivaroxaban, apixaban, edoxaban, dabigatran)</td><td>False-positive dRVVT, especially rivaroxaban</td><td>Do not test; if unavoidable, remove the drug with an adsorbent (activated charcoal) product and report with a comment</td></tr>
</tbody></table></div>
<h3>Reporting and APS</h3>
<ul>
<li>Report LA as present or absent, with a comment on drugs and timing. Do not give a "weak" result as definite.</li>
<li>Always test with anticardiolipin and anti-β2-glycoprotein I antibodies (IgG and IgM). <b>Triple positivity</b> (LA, aCL and anti-β2GPI) carries the highest thrombotic risk.</li>
<li>APS classification (2023 ACR/EULAR criteria) needs a clinical event and persistent laboratory positivity at least 12 weeks apart.</li>
<li>In thrombotic APS, especially triple-positive, warfarin is preferred over DOACs.</li>
</ul>
`,
  points: [
    "Two tests: dRVVT and silica LA-sensitive APTT; positive if either is",
    "Screen (low PL) → mix (1:1, no incubation) → confirm (high PL)",
    "Normalised ratio = screen ratio ÷ confirm ratio; cut-off = local 99th percentile",
    "Double-centrifuged plasma; residual platelets cause false negatives",
    "DOACs cause false positives; VKA: test at INR <1.5 or a 1:1 mix",
    "Persistent ≥12 weeks; test with aCL and anti-β2GPI"
  ]
},
{
  id: "m6-vwf",
  title: "Von Willebrand factor tests and typing VWD",
  minutes: 18,
  sources: ["vwd21", "lh6", "vwdg"],
  video: "von Willebrand factor activity antigen ratio multimers RIPA type 2B 2N diagnosis",
  body: `
<p>No single test diagnoses von Willebrand disease (VWD). The laboratory measures how much VWF there is, how well it works, and what its multimers look like.</p>
<h3>The first-line panel</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>Test</th><th>What it measures</th></tr></thead><tbody>
<tr><td>VWF:Ag</td><td>Amount of VWF protein (immunoassay)</td></tr>
<tr><td>VWF platelet-binding activity: VWF:RCo, VWF:GPIbR or VWF:GPIbM</td><td>Binding to platelet GPIb. Newer GPIbM and GPIbR assays are more precise; VWF:RCo is falsely low with the common p.D1472H variant</td></tr>
<tr><td>FVIII:C</td><td>FVIII carried and protected by VWF</td></tr>
<tr><td>VWF:CB (collagen binding)</td><td>Depends on high-molecular-weight multimers; helps separate 2A and 2B from 2M</td></tr>
</tbody></table></div>
<h3>Diagnostic levels (ASH ISTH NHF WFH 2021)</h3>
<ul>
<li>VWF under 0.30 IU/mL: VWD, whatever the bleeding history.</li>
<li>VWF 0.30–0.50 IU/mL with abnormal bleeding: type 1 VWD.</li>
<li>Activity to antigen ratio under 0.7: suspect type 2; go to multimers and specialist tests.</li>
</ul>
<h3>Typing</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>Type</th><th>Pattern</th><th>Key test</th></tr></thead><tbody>
<tr><td>1</td><td>Proportionate fall in Ag, activity and FVIII; ratios over 0.7</td><td>Normal multimers</td></tr>
<tr><td>1C</td><td>Type 1 with fast clearance</td><td>High VWF propeptide to VWF:Ag ratio; short response to desmopressin</td></tr>
<tr><td>2A</td><td>Activity/Ag under 0.7; CB/Ag low</td><td>Loss of high and intermediate multimers</td></tr>
<tr><td>2B</td><td>Activity/Ag under 0.7; often thrombocytopenia</td><td>Enhanced aggregation to <b>low-dose ristocetin</b> (RIPA, 0.5–0.6 mg/mL); loss of HMW multimers. Gene test to separate from platelet-type VWD</td></tr>
<tr><td>2M</td><td>Activity/Ag under 0.7; CB/Ag often normal</td><td>Normal multimer pattern</td></tr>
<tr><td>2N</td><td>FVIII low relative to VWF:Ag; looks like mild haemophilia A</td><td>VWF:FVIII binding assay; gene test. Suspect in women and with autosomal inheritance</td></tr>
<tr><td>3</td><td>VWF undetectable; FVIII 1–10%</td><td>Absent multimers; risk of alloantibodies</td></tr>
</tbody></table></div>
<h3>Things that change VWF</h3>
<ul>
<li><b>Blood group O:</b> about 25–35% lower VWF than other groups. The 2021 guideline does not use group-specific ranges for diagnosis.</li>
<li><b>Raised by</b> stress, a crying child, exercise, pregnancy, oestrogen, inflammation, age, and hard venepuncture. A single normal result does not exclude VWD: repeat if the suspicion is high.</li>
<li><b>Pre-analytical:</b> keep whole blood at room temperature and process within 4 hours; refrigeration lowers VWF and FVIII.</li>
</ul>
<h3>Acquired von Willebrand syndrome</h3>
<p>Seen with aortic stenosis and LVADs (shear loss of HMW multimers), MPN with very high platelet counts, monoclonal gammopathy, lymphoproliferative disease and hypothyroidism. Test pattern resembles type 2A; a high propeptide ratio suggests fast clearance.</p>
`,
  points: [
    "Panel: VWF:Ag, platelet-binding activity, FVIII:C (± VWF:CB)",
    "VWF <0.30 = VWD; 0.30–0.50 with bleeding = type 1",
    "Activity/Ag <0.7 = type 2: multimers, RIPA, CB",
    "2B: enhanced low-dose RIPA and thrombocytopenia",
    "2N: low FVIII, normal VWF; VWF:FVIIIB assay",
    "Stress, pregnancy, oestrogen raise VWF; group O lowers it; repeat if in doubt"
  ]
},
{
  id: "m6-plt",
  title: "Platelet function testing: PFA, aggregometry and flow cytometry",
  minutes: 20,
  sources: ["isthlta", "lh7", "lh3"],
  video: "light transmission aggregometry patterns Glanzmann Bernard Soulier aspirin PFA-100",
  body: `
<p>Platelet function testing is for patients with mucocutaneous bleeding when VWD has been looked for. It is labour-intensive and has many pre-analytical traps.</p>
<h3>Before the test</h3>
<ul>
<li>No aspirin or NSAIDs for 7–10 days; record SSRIs, antibiotics, and foods such as garlic and fish oil. Avoid caffeine and smoking on the day.</li>
<li>Platelet count first: LTA is unreliable with a PRP platelet count under about 150 × 10⁹/L. Look at the film for platelet size and granularity.</li>
<li>Citrate tubes at room temperature, never cooled or sent by pneumatic tube. Prepare PRP by a gentle spin, rest 15–30 minutes, and finish testing within 4 hours of collection.</li>
<li>ISTH advice: do not adjust the PRP platelet count with PPP.</li>
</ul>
<h3>PFA-100 (closure time)</h3>
<p>Whole blood is drawn at high shear through an aperture in a membrane coated with collagen and either epinephrine (CEPI) or ADP (CADP). It is sensitive to moderate VWD and severe platelet defects. Aspirin prolongs CEPI only. It is affected by platelets under 100 × 10⁹/L and haematocrit under 0.30, and a normal result does not exclude mild VWD or a storage pool disorder.</p>
<h3>Light transmission aggregometry (LTA)</h3>
<p>PRP is stirred at 37 °C in a cuvette. When an agonist makes platelets aggregate, the plasma clears and more light passes. PRP is set as 0% and the patient's PPP as 100% transmission. Normal tracings show a small dip as platelets change shape, then aggregation; weak agonists (low-dose ADP, epinephrine) give two waves, the second from released ADP and thromboxane.</p>
<p>A standard panel: ADP (2 and 5–10 µM), collagen (2 µg/mL), arachidonic acid (1 mM), epinephrine (5 µM), ristocetin 1.2 mg/mL and low-dose ristocetin 0.5–0.6 mg/mL. Add TRAP-6 or U46619 when needed.</p>
<div class="tablewrap"><table class="t"><thead><tr><th>Condition</th><th>ADP</th><th>Collagen</th><th>AA</th><th>Epi</th><th>Ristocetin 1.2</th><th>Low-dose risto</th></tr></thead><tbody>
<tr><td>Glanzmann thrombasthenia</td><td>Absent</td><td>Absent</td><td>Absent</td><td>Absent</td><td>Normal (agglutination)</td><td>Absent</td></tr>
<tr><td>Bernard–Soulier syndrome</td><td>Normal</td><td>Normal</td><td>Normal</td><td>Normal</td><td>Absent; not corrected by normal plasma</td><td>Absent</td></tr>
<tr><td>Severe VWD (type 3)</td><td>Normal</td><td>Normal</td><td>Normal</td><td>Normal</td><td>Absent; corrected by normal plasma</td><td>Absent</td></tr>
<tr><td>Type 2B VWD or platelet-type VWD</td><td>Normal</td><td>Normal</td><td>Normal</td><td>Normal</td><td>Normal</td><td><b>Enhanced</b></td></tr>
<tr><td>Aspirin or COX-1 defect</td><td>Primary wave only</td><td>Reduced</td><td><b>Absent</b></td><td>No second wave</td><td>Normal</td><td>Absent</td></tr>
<tr><td>P2Y12 defect or clopidogrel</td><td>Reduced, reversible</td><td>Mildly reduced</td><td>Mildly reduced</td><td>Reduced</td><td>Normal</td><td>Absent</td></tr>
<tr><td>Storage pool or secretion defect</td><td>No second wave</td><td>Reduced</td><td>Normal or reduced</td><td>No second wave</td><td>Normal</td><td>Absent</td></tr>
<tr><td>MPN (acquired)</td><td>Normal or reduced</td><td>Normal</td><td>Normal</td><td><b>Absent</b></td><td>Normal</td><td>Absent</td></tr>
</tbody></table></div>
<p>Ristocetin causes <b>agglutination</b>, not aggregation: it needs VWF and GPIb, not GPIIb/IIIa or platelet metabolism. That is why it is preserved in Glanzmann thrombasthenia.</p>
<h3>Further tests</h3>
<ul>
<li><b>Lumiaggregometry:</b> ATP release with luciferin–luciferase shows secretion and dense granule defects.</li>
<li><b>Flow cytometry:</b> absent CD41/CD61 (GPIIb/IIIa) in Glanzmann, absent CD42b (GPIb) in Bernard–Soulier; mepacrine uptake and release for dense granules; CD62P for activation.</li>
<li><b>Electron microscopy:</b> dense granule count (whole-mount) and α-granules (grey platelet syndrome).</li>
<li><b>Genetic panels</b> are now often used to confirm inherited platelet disorders.</li>
<li>Use a bleeding assessment tool (ISTH-BAT) to decide who needs testing.</li>
</ul>
`,
  points: [
    "No aspirin or NSAIDs for 7–10 days; room temperature; test within 4 h",
    "PFA: CEPI prolonged by aspirin; CEPI and CADP by VWD and severe defects",
    "Glanzmann: absent to all agonists except ristocetin",
    "Bernard–Soulier: absent ristocetin, giant platelets, not corrected by plasma",
    "Type 2B / PT-VWD: enhanced low-dose ristocetin",
    "Aspirin: absent AA; storage pool: absent second waves"
  ]
},
{
  id: "m6-anticoag",
  title: "Measuring anticoagulants: anti-Xa, DOAC levels and heparin monitoring",
  minutes: 16,
  sources: ["lh10", "dl18", "isth"],
  video: "anti-Xa assay principle LMWH monitoring DOAC level measurement dilute thrombin time",
  body: `
<h3>How the anti-Xa assay works</h3>
<p>Patient plasma is mixed with a known excess of factor Xa (and, in some kits, antithrombin). Drug in the plasma inhibits part of the Xa. The Xa left over cleaves a chromogenic substrate, so <b>the less colour, the more drug</b>. The result is read from a calibration curve made with the same drug.</p>
<div class="tablewrap"><table class="t"><thead><tr><th>Drug</th><th>Calibrator</th><th>Units and typical targets</th><th>Timing</th></tr></thead><tbody>
<tr><td>Unfractionated heparin</td><td>UFH</td><td>0.3–0.7 IU/mL (therapeutic)</td><td>6 h after a dose change; centrifuge within 1 h</td></tr>
<tr><td>LMWH, twice daily</td><td>LMWH (or hybrid)</td><td>Peak about 0.5–1.0 IU/mL</td><td>Peak 3–4 h after the dose, after the third or fourth dose</td></tr>
<tr><td>LMWH, once daily</td><td>LMWH</td><td>Peak about 1.0–2.0 IU/mL</td><td>Peak 3–4 h</td></tr>
<tr><td>LMWH prophylaxis</td><td>LMWH</td><td>Peak about 0.2–0.5 IU/mL</td><td>Peak 3–4 h</td></tr>
<tr><td>Rivaroxaban, apixaban, edoxaban</td><td>Drug-specific</td><td>ng/mL</td><td>Note the time of the last dose; trough or peak as asked</td></tr>
</tbody></table></div>
<p>Monitor LMWH only when the dose is uncertain: renal impairment, weight under 40 or over 150 kg, pregnancy, children, unexpected bleeding or thrombosis. Targets vary between guidelines.</p>
<h3>Practical points</h3>
<ul>
<li><b>Interferences:</b> haemolysis, bilirubin and lipaemia (optical method). Very low antithrombin can give falsely low results with kits that do not add AT.</li>
<li><b>Cross-reactivity:</b> a heparin-calibrated anti-Xa is strongly positive with Xa-inhibitor DOACs. A patient switched from apixaban to heparin may look "over-heparinised": use the APTT or wait.</li>
<li><b>UFH APTT versus anti-Xa:</b> the APTT is affected by high FVIII and fibrinogen (acute phase) and by low factors (liver disease, DIC). Anti-Xa avoids this, so it suits apparent "heparin resistance".</li>
</ul>
<h3>DOACs</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>Drug</th><th>Quantitative test</th><th>Effect on routine tests</th></tr></thead><tbody>
<tr><td>Dabigatran</td><td>Diluted thrombin time (calibrated), ecarin clotting time or chromogenic ecarin assay</td><td>TT very sensitive: a normal TT excludes relevant drug. APTT prolonged but not linear. PT little affected</td></tr>
<tr><td>Rivaroxaban</td><td>Drug-calibrated anti-Xa</td><td>PT prolonged, depending on the reagent. A normal PT does not exclude a relevant level</td></tr>
<tr><td>Apixaban</td><td>Drug-calibrated anti-Xa</td><td>PT and APTT often normal even at therapeutic levels</td></tr>
<tr><td>Edoxaban</td><td>Drug-calibrated anti-Xa</td><td>PT moderately prolonged</td></tr>
</tbody></table></div>
<p>In emergencies, levels under about 30–50 ng/mL are usually considered safe for urgent surgery or thrombolysis; over 50 ng/mL in a bleeding patient supports a reversal agent. Follow local protocols.</p>
<h3>Other drug-related tests</h3>
<ul>
<li><b>Argatroban and bivalirudin:</b> APTT, or a diluted thrombin time for better linearity.</li>
<li><b>HIT:</b> anti-PF4 immunoassay (high negative predictive value), then a functional assay (serotonin release or heparin-induced platelet activation) when positive.</li>
<li><b>Antiplatelet drugs:</b> point-of-care assays (VerifyNow, Multiplate) are used mainly in cardiology research and cardiac surgery.</li>
</ul>
`,
  points: [
    "Anti-Xa: residual Xa cleaves a chromogenic substrate; less colour = more drug",
    "UFH 0.3–0.7 IU/mL; LMWH peak 3–4 h after dose",
    "Use a calibrator matched to the drug; Xa-DOACs read high in a heparin anti-Xa",
    "Dabigatran: dTT or ecarin; normal TT excludes significant drug",
    "Apixaban: PT and APTT can be normal at therapeutic levels",
    "Under ~30–50 ng/mL: usually safe for urgent surgery"
  ]
},
{
  id: "m6-fib",
  title: "Fibrinolysis, D-dimer and viscoelastic testing",
  minutes: 16,
  sources: ["lh10", "lh8", "colman"],
  video: "D-dimer FEU DDU age adjusted cut off ROTEM TEG interpretation FIBTEM",
  body: `
<h3>D-dimer</h3>
<p>D-dimer is a breakdown product of <b>cross-linked</b> fibrin: it shows that thrombin made fibrin, FXIII cross-linked it, and plasmin broke it down. FDPs also include breakdown products of fibrinogen.</p>
<ul>
<li><b>Assays are not standardised.</b> Results are reported in fibrinogen equivalent units (FEU) or D-dimer units (DDU); 1 DDU ≈ 2 FEU. Use the cut-off validated for your assay and always state the unit.</li>
<li><b>Use:</b> to exclude VTE in patients with a low or intermediate pre-test probability (Wells score). A negative quantitative D-dimer makes VTE unlikely; a positive one proves nothing.</li>
<li><b>Age-adjusted cut-off</b> for patients over 50: age × 10 µg/L FEU (for example 720 µg/L at age 72), which reduces unnecessary imaging.</li>
<li><b>Raised without VTE:</b> age, pregnancy, cancer, infection, surgery, trauma, DIC, liver disease, sickle crisis, aortic dissection.</li>
<li><b>False negatives:</b> small distal clots, symptoms for more than a week, anticoagulant treatment.</li>
<li>In DIC, a strongly raised D-dimer contributes to the ISTH score.</li>
</ul>
<h3>Other fibrinolysis tests</h3>
<p>Euglobulin lysis time (rarely used), α2-antiplasmin, plasminogen and PAI-1 activity are used for rare bleeding with a normal screen, such as α2-antiplasmin or PAI-1 deficiency.</p>
<h3>Viscoelastic tests (TEG and ROTEM)</h3>
<p>A whole-blood sample in a cup is rotated against a pin. As the clot forms the movement is transmitted, and the amplitude trace gives the whole life of the clot: start, build-up, strength and lysis. Results come in 10–20 minutes, at the bedside, during major bleeding.</p>
<div class="tablewrap"><table class="t"><thead><tr><th>ROTEM (TEG)</th><th>Meaning</th><th>Abnormal suggests</th></tr></thead><tbody>
<tr><td>CT, clotting time (R)</td><td>Time to start of clot</td><td>Long: factor deficiency, anticoagulant (heparin if INTEM long and HEPTEM normal)</td></tr>
<tr><td>CFT and α angle (K, α)</td><td>Speed of clot build-up</td><td>Slow: low fibrinogen or platelets</td></tr>
<tr><td>A5, A10, MCF (MA)</td><td>Clot firmness</td><td>Low EXTEM with low FIBTEM: fibrinogen. Low EXTEM with normal FIBTEM: platelets</td></tr>
<tr><td>ML (LY30)</td><td>Maximum lysis</td><td>ML over 15% (LY30 over 3%): hyperfibrinolysis, corrected in APTEM</td></tr>
</tbody></table></div>
<p>ROTEM channels: <b>EXTEM</b> (tissue factor), <b>INTEM</b> (contact activation), <b>FIBTEM</b> (platelets blocked with cytochalasin D: the fibrin contribution alone), <b>APTEM</b> (with an antifibrinolytic) and <b>HEPTEM</b> (with heparinase).</p>
<p>A typical algorithm: low FIBTEM A5 (under about 8–10 mm) → fibrinogen concentrate or cryoprecipitate; low EXTEM A5 with normal FIBTEM → platelets; long EXTEM CT with adequate firmness → plasma or PCC; hyperfibrinolysis → tranexamic acid. Thresholds are device- and protocol-specific.</p>
<p>Viscoelastic tests do not detect aspirin or P2Y12 inhibitors, VWD, or (in standard channels) DOACs reliably, and they are run at 37 °C so they miss the effect of hypothermia.</p>
`,
  points: [
    "D-dimer = cross-linked fibrin breakdown; units FEU or DDU (≈ ½ FEU)",
    "Negative D-dimer excludes VTE only with low or intermediate probability",
    "Age-adjusted cut-off over 50: age × 10 µg/L FEU",
    "ROTEM: CT = factors; MCF = platelets + fibrinogen; ML = lysis",
    "Low FIBTEM → fibrinogen; low EXTEM with normal FIBTEM → platelets",
    "Viscoelastic tests miss antiplatelet drugs, VWD and hypothermia"
  ]
},
{
  id: "m6-thrombo",
  title: "Thrombophilia testing in practice",
  minutes: 14,
  sources: ["lh9", "colman", "coagnotes2"],
  video: "thrombophilia testing antithrombin protein C protein S APC resistance factor V Leiden timing interference",
  body: `
<p>Thrombophilia tests rarely change management. Test only when a result will change a decision (for example, duration of anticoagulation, or family counselling), and at a time when the result can be trusted.</p>
<h3>The panel and methods</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>Test</th><th>Preferred method</th><th>Note</th></tr></thead><tbody>
<tr><td>Antithrombin</td><td>Functional (chromogenic, Xa- or IIa-based) activity; antigen if low</td><td>Type I (low activity and antigen) or type II (low activity, normal antigen)</td></tr>
<tr><td>Protein C</td><td>Chromogenic activity (Protac venom activator)</td><td>Clot-based assays are affected by FVIII, LA and FV Leiden</td></tr>
<tr><td>Protein S</td><td>Free protein S antigen</td><td>Activity assays are affected by FV Leiden and high FVIII</td></tr>
<tr><td>APC resistance</td><td>Modified APTT-based ratio, patient diluted in FV-deficient plasma</td><td>The modification makes it specific for FV Leiden; confirm by DNA test</td></tr>
<tr><td>F5 Leiden and F2 G20210A</td><td>DNA (PCR)</td><td>Not affected by anticoagulants or acute thrombosis</td></tr>
<tr><td>Antiphospholipid tests</td><td>LA, aCL, anti-β2GPI</td><td>See the LA lesson</td></tr>
</tbody></table></div>
<h3>Things that make results wrong</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>Condition</th><th>AT</th><th>PC</th><th>Free PS</th><th>APCR (clot-based)</th></tr></thead><tbody>
<tr><td>Acute thrombosis</td><td>Low</td><td>Low</td><td>Low</td><td>Variable</td></tr>
<tr><td>Heparin</td><td>Low (by 10–20%)</td><td>Normal</td><td>Normal</td><td>Affected unless neutralised</td></tr>
<tr><td>Vitamin K antagonist</td><td>Normal or high</td><td><b>Low</b></td><td><b>Low</b></td><td>Modified test usually reliable</td></tr>
<tr><td>Dabigatran</td><td>Falsely high (IIa-based)</td><td>Normal (chromogenic)</td><td>Normal</td><td>Falsely normal or high ratio</td></tr>
<tr><td>Rivaroxaban, apixaban</td><td>Falsely high (Xa-based)</td><td>Normal (chromogenic)</td><td>Normal</td><td>Falsely normal ratio</td></tr>
<tr><td>Pregnancy, oral oestrogen</td><td>Normal or slightly low</td><td>Normal</td><td><b>Low</b></td><td>Lower ratio</td></tr>
<tr><td>Liver disease, DIC, nephrotic syndrome</td><td>Low</td><td>Low</td><td>Low</td><td>Variable</td></tr>
</tbody></table></div>
<h3>Practical rules</h3>
<ul>
<li>Wait at least 3 months after the event for functional tests.</li>
<li>Stop a VKA for at least 2 weeks before protein C and S (with bridging if needed), or test relatives instead. Stop DOACs for at least 48 hours, or use DNA tests and drug-insensitive methods.</li>
<li>Repeat any low result on a new sample before labelling a patient. Check age-specific ranges in neonates and children, whose PC, PS and AT are physiologically low.</li>
<li>Look at the family: a known familial defect can be tested directly in relatives.</li>
</ul>
`,
  points: [
    "Test only if the result will change management",
    "Functional tests ≥3 months after the event and off interfering drugs",
    "VKA lowers PC and PS; heparin lowers AT; pregnancy and oestrogen lower free PS",
    "DOACs falsely raise AT (method-dependent) and normalise APCR",
    "Free PS antigen and chromogenic PC are the preferred methods",
    "FV Leiden and prothrombin G20210A by DNA test: unaffected by drugs"
  ]
},
{
  id: "m6-qa",
  title: "Quality in the coagulation laboratory and critical results",
  minutes: 12,
  sources: ["lh3", "lh2", "dl25"],
  video: "coagulation laboratory quality control EQA reagent lot change validation critical values",
  body: `
<h3>Internal quality control</h3>
<ul>
<li>Run a normal and an abnormal control at the start of each shift, after every reagent change, calibration or maintenance, and at least every 8 hours for PT and APTT.</li>
<li>Apply Westgard rules (Module 5); set targets from the laboratory's own runs of each control lot.</li>
<li>Watch the <b>patient moving average</b> of PT and APTT results: a quiet drift in reagent performance shows here before it shows in controls.</li>
</ul>
<h3>New reagent lots</h3>
<ul>
<li>Compare at least 20 patient samples on the old and new lot, spanning normal and abnormal results.</li>
<li>Recalculate the MNPT and verify the ISI for the PT; recheck the APTT reference range and heparin therapeutic range.</li>
<li>Check the factor assay calibration curve and reference plasma assignment.</li>
</ul>
<h3>External quality assessment</h3>
<p>Take part in a scheme (for example UK NEQAS, ECAT, CAP) for every test reported. Reagent group comparisons show whether a bias is the reagent or the laboratory. Unsatisfactory results need a documented investigation.</p>
<h3>Reflex testing and comments</h3>
<ul>
<li>Long APTT with no clinical details: TT, reptilase, heparin check, then mixing study.</li>
<li>Low fibrinogen: repeat on a new sample if unexpected; add a comment on the method.</li>
<li>Always comment on drugs (VKA, heparin, DOAC, emicizumab) and pre-analytical problems.</li>
</ul>
<h3>Critical (alert) results to phone</h3>
<p>Each laboratory sets its own list; typical items are an INR over 5, an unexpected APTT over 100 s or unclottable sample, fibrinogen under 1.0 g/L, a new factor level under 5 IU/dL, a positive anti-PF4 assay, and suspected TTP or DIC.</p>
`,
  points: [
    "Two levels of control each shift and after any change",
    "Patient moving averages pick up reagent drift",
    "New lot: ≥20 patient comparisons; recalc MNPT, check ISI and heparin range",
    "EQA for every test; investigate unsatisfactory results",
    "Comment on drugs and pre-analytical problems",
    "Phone critical results promptly and document the call"
  ]
}
];

/* Free online further reading (link only; content stays on the author's site). */
const PH_BASE = "https://practical-haemostasis.com/";
const M6_LINKS = {
  "m6-pre": [["Pre-analytical variables", "Quality%20Assurance/pre_analytical_variables.html"]],
  "m6-screen": [["Prothrombin time", "Screening%20Tests/pt.html"], ["APTT", "Screening%20Tests/aptt.html"], ["Thrombin time", "Screening%20Tests/thrombin_time.html"], ["Reptilase time", "Miscellaneous/reptilase_time.html"], ["Fibrinogen", "Screening%20Tests/fibrinogen.html"], ["ISI and INR", "Miscellaneous/isi_and_inr.html"]],
  "m6-mix": [["Inhibitor assays (mixing, Bethesda)", "Inhibitor%20Assays/inhibitor_assays.html"]],
  "m6-factors": [["Factor assays: introduction", "Factor%20Assays/factor_assays_introduction.html"], ["One-stage APTT-based assays", "Factor%20Assays/1_stage_aptt_factor_assay.html"], ["Chromogenic factor assays", "Factor%20Assays/chromogenic_factor_assays.html"], ["Factor XIII assays", "Factor%20Assays/factor_XIII_assays.html"], ["EHL products and novel agents", "Factor%20Assays/EHL_products_novel_agents.html"]],
  "m6-la": [["Antiphospholipid antibodies", "Thromobophilia/APS/apl_introduction.html"], ["dRVVT", "Thromobophilia/APS/drvvt.html"], ["Taipan venom time", "Thromobophilia/APS/taipan_venom_time.html"], ["aCL and anti-β2GPI", "Thromobophilia/APS/acl_b2gp.html"]],
  "m6-vwf": [["VWF assays: introduction", "Factor%20Assays/vwf/vwf_assays_introduction.html"], ["VWF:RCo", "Factor%20Assays/vwf/VWF%20Functional%20Assays/vwf_rco_assay.html"], ["RIPA", "Factor%20Assays/vwf/VWF%20Functional%20Assays/ripa_test.html"], ["VWF multimers", "Factor%20Assays/vwf/vwf_multimer_assays.html"], ["FVIII binding assay (2N)", "Factor%20Assays/vwf/factor_viii_binding_assay.html"], ["VWF propeptide", "Factor%20Assays/vwf/vwfpp_assays.html"]],
  "m6-plt": [["Platelet function testing", "Platelets/platelet_function_testing_introduction.html"], ["Light transmission aggregometry", "Platelets/platelet_function_testing_lta.html"], ["PFA-100", "Platelets/pfa.html"], ["Flow cytometry", "Platelets/platelet_function_testing_flow_cytometry.html"]],
  "m6-anticoag": [["Anti-Xa assays", "Miscellaneous/anti_xa_assays.html"], ["DOACs", "Useful%20information/doacs.html"], ["Ecarin clotting time", "Miscellaneous/ecarin_ct.html"], ["HIT assays", "Miscellaneous/hit_assays.html"]],
  "m6-fib": [["Fibrinolysis", "Fibrinolysis/fibrinolysis_introduction.html"], ["D-dimers", "Fibrinolysis/d_dimers.html"], ["TEG and ROTEM", "Miscellaneous/Global%20Assays/teg_rotem.html"]],
  "m6-thrombo": [["Thrombophilia testing", "Thromobophilia/thrombophilia_testing_introduction.html"], ["Antithrombin", "Thromobophilia/at_assays.html"], ["Protein C", "Thromobophilia/pc_assays.html"], ["Protein S", "Thromobophilia/ps_assays.html"], ["APC resistance", "Thromobophilia/apcr_assays.html"], ["Factor V Leiden", "Genetics/fv_leiden.html"]],
  "m6-qa": [["Quality assurance", "Quality%20Assurance/introduction_to_quality_assurance.html"]]
};
M6_LESSONS.forEach((l) => { if (M6_LINKS[l.id]) l.links = M6_LINKS[l.id].map(([t, u]) => [t, PH_BASE + u]); });

/* Atlas: the film findings the coagulation laboratory checks, re-using the platelet and red cell drawings. */
const M6_CELL_SPECS = [
["m6-clump", "m4-plt-clump", "Pre-analytical", "Platelet clumps in a coagulation workup",
  "Aggregates of platelets on the film, often at the feathered edge.", "EDTA-dependent antibodies, slow or traumatic venepuncture, partly clotted samples.", "A clot in the citrate tube also consumes fibrinogen and factors. Check the tube before releasing an abnormal clotting screen."],
["m6-satellite", "m4-satellite", "Pre-analytical", "Platelet satellitism",
  "Platelets ringed round neutrophils in EDTA blood.", "EDTA-dependent IgG; harmless.", "Gives a falsely low count: do not cancel platelet function tests or surgery on this result. Recount in citrate."],
["m6-normal", "m4-plt-normal", "Before function testing", "Normal platelet number and size",
  "About 8–20 platelets per oil-immersion field, 1.5–3 µm, evenly granular.", "Check this on every patient sent for aggregometry.", "LTA is unreliable when the PRP count is under about 150 × 10⁹/L, so confirm the count and size first."],
["m6-low", "m4-plt-low", "Before function testing", "Thrombocytopenia",
  "Few platelets per field.", "ITP, marrow failure, consumption, inherited thrombocytopenias.", "PFA closure time is prolonged below about 100 × 10⁹/L and cannot be interpreted. Flow cytometry works with low counts."],
["m6-giant", "m4-plt-giant", "Inherited platelet disorders", "Giant platelets (Bernard–Soulier pattern)",
  "Platelets as big as or bigger than red cells.", "Bernard–Soulier syndrome, MYH9 disorders, platelet-type and 2B VWD, some ITP.", "Analysers may count giant platelets as red cells. In Bernard–Soulier, ristocetin agglutination is absent and CD42b is low by flow cytometry."],
["m6-large", "m4-plt-large", "Inherited platelet disorders", "Large platelets",
  "Platelets bigger than normal but smaller than red cells; high MPV.", "Young platelets in ITP, MPN, type 2B VWD.", "In 2B VWD the count may fall further with stress or pregnancy; low-dose RIPA is enhanced."],
["m6-grey", "m4-plt-grey", "Inherited platelet disorders", "Grey (agranular) platelets",
  "Pale, grey-blue platelets without purple granules.", "Grey platelet syndrome (α-granule deficiency, NBEAL2), and artefact from EDTA storage or MDS.", "Aggregation is often reduced with collagen and thrombin. Confirm by electron microscopy or flow; marrow fibrosis may develop."],
["m6-myh9", "m4-myh9", "Inherited platelet disorders", "Döhle-like bodies with giant platelets",
  "Pale blue inclusions in neutrophils, with giant platelets.", "MYH9-related disorders (May–Hegglin and related).", "Platelet function is usually near normal; the risk is from low counts. Check renal function, hearing and eyes."],
["m6-schisto", "m2-schisto", "Microangiopathy", "Schistocytes",
  "Red cell fragments: helmets, triangles and microspherocytes.", "TTP, HUS, DIC, mechanical valves, HELLP.", "With normal PT, APTT and fibrinogen think TTP (send ADAMTS13 before plasma); with consumption think DIC."],
["m6-mk", "megakaryocyte", "Marrow", "Megakaryocyte",
  "The large polyploid platelet-forming cell of the marrow.", "Increased in consumptive or immune thrombocytopenia; reduced in marrow failure.", "Marrow examination is needed only when the blood film or other counts suggest marrow disease."]
];

const M6_LESSON_CELLS = {
  "m6-pre": ["m6-clump", "m6-satellite"],
  "m6-screen": ["m6-schisto"],
  "m6-mix": [],
  "m6-factors": ["m6-normal"],
  "m6-la": [],
  "m6-vwf": ["m6-large", "m6-giant"],
  "m6-plt": ["m6-normal", "m6-low", "m6-giant", "m6-grey", "m6-myh9"],
  "m6-anticoag": [],
  "m6-fib": ["m6-schisto"],
  "m6-thrombo": [],
  "m6-qa": ["m6-clump"]
};

const M6_FACTS = [
  ["What citrate concentration is recommended for coagulation tests?", "3.2% (109 mmol/L) trisodium citrate, 9 parts blood to 1 part citrate."],
  ["How full must a citrate tube be?", "At least 90% of its nominal volume."],
  ["What is the citrate adjustment formula for a high haematocrit?", "Citrate (mL) = 0.00185 × blood volume (mL) × (100 − Hct%), used when Hct is over 0.55."],
  ["Why draw a discard tube with a butterfly needle?", "Air in the tubing would under-fill the citrate tube."],
  ["What platelet count defines platelet-poor plasma?", "Under 10 × 10⁹/L."],
  ["Why double-centrifuge plasma for LA testing?", "Residual platelets release phospholipid when frozen and neutralise the LA (false negative)."],
  ["How soon must a sample on unfractionated heparin be centrifuged?", "Within 1 hour: platelets release PF4, which neutralises heparin."],
  ["Why not refrigerate whole blood for PT?", "Cold activates factor VII and shortens the PT; it also lowers VWF and FVIII."],
  ["Which test is long with heparin but normal reptilase?", "Thrombin time. Reptilase (batroxobin) is not inhibited by antithrombin–heparin."],
  ["What does a long TT and long reptilase time suggest?", "Low or abnormal fibrinogen, or FDPs."],
  ["What is the Clauss fibrinogen principle?", "Diluted plasma clotted with excess thrombin; the time depends only on fibrinogen."],
  ["When does PT-derived fibrinogen mislead?", "It overestimates in DIC, liver disease, dysfibrinogenaemia and thrombolysis."],
  ["How is the APTT therapeutic range for UFH set?", "APTT range matching anti-Xa 0.3–0.7 IU/mL in patient samples, for each reagent lot."],
  ["How is the MNPT derived?", "Geometric mean PT of at least 20 healthy adults on the same reagent lot and instrument."],
  ["What does 1 Bethesda unit mean?", "The inhibitor that destroys 50% of FVIII in a 1:1 mix with normal plasma over 2 h at 37 °C."],
  ["What is the Bethesda formula?", "BU = (2 − log₁₀ residual activity%) ÷ 0.301 × dilution; use the dilution with RA nearest 50%."],
  ["What does the Nijmegen modification change?", "Imidazole-buffered NPP, and FVIII-deficient plasma instead of buffer in the control."],
  ["What titre is a positive Nijmegen–Bethesda assay?", "0.6 BU or more; 5 BU or more is a high titre."],
  ["Why heat plasma at 56 °C before a Bethesda assay?", "To destroy residual FVIII from treatment, which would mask the inhibitor."],
  ["How does emicizumab affect tests?", "Normalises the APTT and invalidates one-stage FVIII and clot-based Bethesda; use bovine chromogenic assays."],
  ["What does rising factor activity with dilution mean?", "Non-parallelism: an inhibitor such as LA is being diluted out."],
  ["Can a normal one-stage FVIII exclude mild haemophilia A?", "No; some have assay discrepancy with a low chromogenic FVIII."],
  ["What clotting screen does FXIII deficiency give?", "Normal PT, APTT, TT and fibrinogen."],
  ["What fibrinogen ratio suggests dysfibrinogenaemia?", "Clauss (functional) ÷ antigen under about 0.7."],
  ["Which two tests are used for LA?", "dRVVT and an LA-sensitive (silica, low phospholipid) APTT."],
  ["What are the three steps of LA testing?", "Screen (low phospholipid), mix (1:1 with NPP), confirm (high phospholipid)."],
  ["How is the LA normalised ratio calculated?", "Screen ratio ÷ confirm ratio, each ratio being patient ÷ NPP time."],
  ["How are LA cut-offs set?", "99th percentile of at least 120 healthy donors for each reagent."],
  ["How do DOACs affect LA tests?", "They cause false-positive dRVVT; do not test, or remove the drug first."],
  ["How long apart must antiphospholipid tests be positive?", "At least 12 weeks."],
  ["What VWF level is diagnostic of VWD regardless of bleeding?", "Under 0.30 IU/mL."],
  ["Which VWF ratio suggests type 2 VWD?", "Platelet-binding activity ÷ VWF:Ag under 0.7."],
  ["Which test identifies type 2B VWD?", "Enhanced aggregation with low-dose ristocetin (RIPA 0.5–0.6 mg/mL)."],
  ["How is type 2N VWD confirmed?", "VWF:FVIII binding assay or genetic testing."],
  ["Which blood group has the lowest VWF?", "Group O (about 25–35% lower)."],
  ["What LTA pattern does Glanzmann thrombasthenia show?", "Absent aggregation to all agonists except ristocetin."],
  ["How do you separate Bernard–Soulier from type 3 VWD on LTA?", "Adding normal plasma corrects ristocetin agglutination in VWD but not in Bernard–Soulier."],
  ["Which LTA response is absent after aspirin?", "Arachidonic acid (and the second wave to epinephrine and ADP)."],
  ["Which agonist response is typically lost in MPN?", "Epinephrine."],
  ["Which PFA cartridge does aspirin prolong?", "Collagen/epinephrine (CEPI) only."],
  ["How long should aspirin be stopped before LTA?", "7–10 days."],
  ["What is the LMWH anti-Xa peak time?", "3–4 hours after a subcutaneous dose."],
  ["What is the therapeutic anti-Xa range for UFH?", "0.3–0.7 IU/mL."],
  ["What excludes a significant dabigatran level?", "A normal thrombin time."],
  ["Which DOAC most often leaves PT and APTT normal?", "Apixaban."],
  ["What is the age-adjusted D-dimer cut-off?", "Age × 10 µg/L FEU, for patients over 50."],
  ["What is 1 DDU in FEU?", "About 2 FEU (D-dimer units are about half the FEU value)."],
  ["What does FIBTEM measure?", "Clot firmness from fibrin alone, with platelets blocked by cytochalasin D."],
  ["What ROTEM finding means hyperfibrinolysis?", "Maximum lysis over 15%, corrected in APTEM."],
  ["Which method is preferred for protein S?", "Free protein S antigen."],
  ["How does warfarin affect thrombophilia tests?", "Lowers protein C and protein S."],
  ["How do DOACs affect antithrombin assays?", "Falsely raise AT: dabigatran with IIa-based, Xa inhibitors with Xa-based assays."]
];

const M6_QUIZ = [
{ q:"A citrate tube is 60% full. What happens to the PT and APTT?", a:["Both shorten","Both prolong from excess citrate","Only the TT prolongs","No change"], c:1,
  e:"The citrate binds calcium in the reagent. Tubes must be at least 90% full." },
{ q:"A 4.5 mL draw for a patient with Hct 0.65. What citrate volume is needed?", a:["0.50 mL","0.29 mL","0.42 mL","0.15 mL"], c:1,
  e:"0.00185 × 4.5 × (100 − 65) = 0.29 mL instead of the usual 0.5 mL." },
{ q:"APTT 120 s, TT over 150 s, reptilase time 18 s (normal). What is most likely?", a:["Afibrinogenaemia","Heparin contamination","Dysfibrinogenaemia","DIC"], c:1,
  e:"Reptilase is not inhibited by heparin. A fibrinogen problem would prolong both." },
{ q:"Clauss fibrinogen 0.7 g/L, fibrinogen antigen 2.9 g/L, TT and reptilase long. The diagnosis is:", a:["Hypofibrinogenaemia","Dysfibrinogenaemia","Heparin","FXIII deficiency"], c:1,
  e:"Functional to antigen ratio 0.24 (under 0.7) means an abnormal molecule." },
{ q:"Mixing study: APTT 68 s; immediate mix 33 s (normal); mix after 2 h at 37 °C 52 s; incubated controls 34 s. Interpretation?", a:["Factor VIII deficiency","Lupus anticoagulant","Time-dependent inhibitor, probably acquired FVIII inhibitor","Heparin"], c:2,
  e:"Correction at once with prolongation after incubation is typical of FVIII autoantibodies. Measure FVIII and the Bethesda titre urgently." },
{ q:"Bethesda assay: at a 1 in 4 dilution the residual FVIII activity is 50%. What is the titre?", a:["0.5 BU","2 BU","4 BU","8 BU"], c:2,
  e:"RA 50% = 1 BU in the tested plasma, multiplied by the dilution (4) = 4 BU." },
{ q:"Why is FVIII-deficient plasma used in the control mix in the Nijmegen assay?", a:["To raise FVIII","To match the protein content and pH of the test mix","To neutralise heparin","To remove LA"], c:1,
  e:"Buffer alone lets FVIII decay faster in the control, falsely suggesting low-titre inhibitors." },
{ q:"A boy on emicizumab has APTT 27 s and one-stage FVIII 180%. What is correct?", a:["He is cured","Use a bovine chromogenic FVIII assay; the one-stage results are artefacts","His inhibitor has gone","Stop emicizumab"], c:1,
  e:"Emicizumab shortens all APTT-based tests. Bovine-component chromogenic assays are unaffected." },
{ q:"A one-stage FIX assay gives 22% at 1 in 10, 35% at 1 in 20 and 51% at 1 in 40. What does this mean?", a:["Mild FIX deficiency","An inhibitor (non-parallelism), for example lupus anticoagulant","Normal FIX","Assay drift"], c:1,
  e:"Activity rising with dilution means something inhibitory is being diluted out." },
{ q:"Which pair is recommended for LA detection (ISTH 2020)?", a:["PT and TT","dRVVT and an LA-sensitive APTT","Kaolin clotting time and TT","APTT and fibrinogen"], c:1,
  e:"Two tests with different principles; LA is positive if either is positive." },
{ q:"dRVVT screen ratio 1.62, confirm ratio 1.08. Local NR cut-off 1.20. What is the normalised ratio?", a:["1.08","1.50, LA detected if the mix is also prolonged","0.67","2.70"], c:1,
  e:"1.62 ÷ 1.08 = 1.50, above the cut-off." },
{ q:"A patient on rivaroxaban has a positive dRVVT. What is the best next step?", a:["Diagnose APS","Repeat off the drug, or after a DOAC-removal step","Start warfarin","Report as weak positive"], c:1,
  e:"Xa inhibitors prolong the dRVVT screen more than the confirm, giving false positives." },
{ q:"VWF:Ag 0.62, VWF:GPIbM 0.24, FVIII 0.55 IU/mL, low-dose RIPA enhanced, platelets 95. Most likely type?", a:["Type 1","Type 2A","Type 2B","Type 2N"], c:2,
  e:"Ratio 0.39, enhanced low-dose RIPA and thrombocytopenia. Genetic testing separates 2B from platelet-type VWD." },
{ q:"FVIII 0.18 IU/mL, VWF:Ag 0.85, VWF activity 0.80 in a woman with bleeding. Which test next?", a:["Multimers","VWF:FVIII binding assay or F8/VWF genetics","RIPA","PFA-100"], c:1,
  e:"Low FVIII with normal VWF in a woman suggests type 2N VWD (or haemophilia A carrier)." },
{ q:"LTA: absent with ADP, collagen, AA and epinephrine; normal with ristocetin. Diagnosis?", a:["Bernard–Soulier","Glanzmann thrombasthenia","Aspirin","Type 2B VWD"], c:1,
  e:"GPIIb/IIIa is needed for aggregation with all agonists except ristocetin agglutination." },
{ q:"LTA: absent aggregation with AA, primary wave only with epinephrine, normal ristocetin. Most likely?", a:["Aspirin effect","Glanzmann","MPN","Storage pool disease only"], c:0,
  e:"No thromboxane A2 is made. Ask about aspirin and NSAIDs and repeat after 10 days off them." },
{ q:"Which is a true statement about the PFA-100?", a:["It detects all mild platelet defects","Aspirin prolongs the collagen/epinephrine closure time","It is unaffected by anaemia","It monitors warfarin"], c:1,
  e:"A low haematocrit or platelet count prolongs closure times; a normal result does not exclude mild disorders." },
{ q:"LMWH therapeutic twice daily: anti-Xa 0.4 IU/mL taken 10 hours after the dose. What is wrong?", a:["The dose is too low","The sample is not a peak sample; repeat 3–4 h after a dose","Use a UFH calibrator","Nothing"], c:1,
  e:"Peak targets apply only to samples taken 3–4 h after the dose." },
{ q:"A bleeding patient on apixaban has normal PT and APTT. What do you conclude?", a:["No drug present","A relevant level is still possible; measure a drug-calibrated anti-Xa","Give vitamin K","Use the TT"], c:1,
  e:"Apixaban has little effect on routine tests even at therapeutic levels." },
{ q:"D-dimer of 640 µg/L FEU in a 75-year-old with low pre-test probability for PE. With an age-adjusted cut-off:", a:["Positive: CT pulmonary angiogram","Negative: PE can be excluded","Repeat in 6 months","Measure fibrinogen"], c:1,
  e:"Cut-off = 75 × 10 = 750 µg/L FEU, so 640 is negative." },
{ q:"ROTEM in a bleeding patient: EXTEM CT normal, EXTEM A5 low, FIBTEM A5 4 mm. Best product?", a:["Platelets","Fibrinogen concentrate or cryoprecipitate","Tranexamic acid alone","Protamine"], c:1,
  e:"Low FIBTEM firmness shows fibrinogen deficiency." },
{ q:"Protein S free antigen 38% in a woman 6 weeks after a DVT, on warfarin and the oral contraceptive pill. Interpretation?", a:["Inherited PS deficiency","Unreliable: warfarin, oestrogen and the acute event all lower PS","Normal","FV Leiden"], c:1,
  e:"Repeat off warfarin and oestrogen, at least 3 months after the event, or test relatives." },
{ q:"Antithrombin by a Xa-based chromogenic assay is 135% in a patient on rivaroxaban. The result is:", a:["Reliable","Falsely high from the drug","Showing AT deficiency","Caused by heparin"], c:1,
  e:"Xa inhibitors inhibit the reagent Xa, mimicking extra antithrombin. Use a IIa-based assay or test off the drug." }
];

const M6_CASES = [
{
  id:"m6-ahA", title:"Bruises in an elderly man", tag:"Acquired haemophilia A",
  stem:"A 78-year-old man has large spontaneous bruises over his arms and flank and a falling Hb. No previous bleeding; no anticoagulants.",
  data:[["PT","12.9 s (ref 11–14)"],["APTT","74 s (ref 26–36)"],["TT","16 s"],["Fibrinogen","4.1 g/L"],["Platelets","260 × 10⁹/L"]],
  steps:[
    { q:"Heparin is excluded (normal TT). Which test comes next?", opts:["Factor IX assay","Mixing study, immediate and after 2 h at 37 °C","PFA-100","D-dimer"], c:1,
      fb:"An isolated long APTT in an elderly man with new bleeding is acquired haemophilia until proven otherwise. The mixing study tells deficiency from inhibitor." },
    { q:"Immediate mix 34 s; 2-hour incubated mix 55 s; incubated controls 35 s. What does this show?", opts:["FVIII deficiency","Lupus anticoagulant","A time-dependent inhibitor","Heparin"], c:2,
      fb:"FVIII autoantibodies act slowly at 37 °C. LA usually acts at once." },
    { q:"FVIII is 3 IU/dL. Nijmegen–Bethesda: residual activity 40% at a 1 in 8 dilution. What is the titre?", opts:["About 1.3 BU","About 10.6 BU","40 BU","0.4 BU"], c:1,
      fb:"(2 − log₁₀ 40) ÷ 0.301 = 1.32 BU × 8 = 10.6 BU: high titre. Treat bleeding with bypassing agents (rFVIIa, aPCC) or recombinant porcine FVIII, and start immunosuppression." },
    { q:"What other investigations are needed?", opts:["None","Look for an underlying cause: malignancy, autoimmune disease, drugs, recent pregnancy","Bone marrow only","FV Leiden"], c:1,
      fb:"About half are idiopathic; the rest are linked to cancer, autoimmune disease, pregnancy or drugs. Avoid intramuscular injections and arterial lines." }
  ],
  teach:["New bleeding + isolated long APTT in the elderly: think acquired haemophilia","Incubated mixing study shows the time-dependent inhibitor","Nijmegen–Bethesda titre; bleeding does not follow the titre","Bypassing agents and immunosuppression; look for the cause"]
},
{
  id:"m6-line", title:"An APTT from the ICU", tag:"Heparin contamination",
  stem:"A post-operative patient in intensive care, not prescribed heparin. Bloods were taken from the arterial line at 06:00.",
  data:[["PT","13.5 s"],["APTT","over 180 s"],["TT","unclottable"],["Fibrinogen (Clauss)","2.2 g/L"],["Platelets","180 × 10⁹/L"]],
  steps:[
    { q:"Which single test best explains this pattern?", opts:["Reptilase time","Factor VIII assay","D-dimer","dRVVT"], c:0,
      fb:"A normal reptilase time with an unclottable TT shows that fibrinogen is fine and something is inhibiting thrombin." },
    { q:"Reptilase time 17 s (normal). Anti-Xa (UFH) 1.6 IU/mL. What happened?", opts:["DIC","Heparin from the line flush contaminated the sample","Acquired haemophilia","Dysfibrinogenaemia"], c:1,
      fb:"Arterial lines are kept open with heparinised saline. The PT is spared because most thromboplastins contain a heparin neutraliser." },
    { q:"What do you do?", opts:["Report the results","Phone the ward; request a clean venepuncture or a line sample after a proper discard","Give protamine","Add heparinase and report"], c:1,
      fb:"Heparinase treatment can confirm heparin, but the right result comes from a correct sample." }
  ],
  teach:["Line samples: flush, discard 5 mL or six dead-space volumes","Long TT, normal reptilase = heparin or dabigatran","Most PT reagents neutralise heparin up to about 1 IU/mL","Correct the sample, do not correct the result"]
},
{
  id:"m6-la", title:"A long APTT before surgery", tag:"Lupus anticoagulant",
  stem:"A 32-year-old woman with two miscarriages at 10 and 12 weeks and a DVT at 28. Pre-operative screen before laparoscopy. Not anticoagulated now.",
  data:[["PT","12.6 s"],["APTT (LA-sensitive)","52 s (ref 26–36)"],["TT","16 s"],["Platelets","135 × 10⁹/L"]],
  steps:[
    { q:"Immediate 1:1 mix APTT is 45 s. What does this suggest?", opts:["Factor deficiency","An immediate-acting inhibitor","Normal result","Heparin"], c:1,
      fb:"No correction, with normal TT (no heparin), points to an inhibitor, most likely LA." },
    { q:"dRVVT: screen ratio 1.85, mix ratio 1.52, confirm ratio 1.15. Local cut-offs: screen 1.15, mix 1.13, NR 1.20. Result?", opts:["LA not detected","LA detected: NR 1.61","Inconclusive","FVIII deficiency"], c:1,
      fb:"Screen, mix and NR (1.85 ÷ 1.15 = 1.61) are all above the cut-offs." },
    { q:"Is she bleeding-prone for the operation?", opts:["Yes, give plasma","No: LA is prothrombotic; give appropriate thromboprophylaxis","Yes, give FVIII","Cancel surgery"], c:1,
      fb:"LA does not cause bleeding unless there is also thrombocytopenia or hypoprothrombinaemia (LA-hypoprothrombinaemia syndrome)." },
    { q:"What completes the workup?", opts:["Nothing","aCL and anti-β2GPI IgG and IgM, and repeat all tests after at least 12 weeks","Bone marrow","Protein C"], c:1,
      fb:"Persistent positivity, with a clinical event, supports APS. Triple positivity carries the highest risk." }
  ],
  teach:["LA prolongs the APTT but causes thrombosis, not bleeding","dRVVT: screen, mix, confirm; NR = screen ÷ confirm ratio","Repeat at 12 weeks with aCL and anti-β2GPI","Triple positive APS: warfarin, not DOAC"]
},
{
  id:"m6-2b", title:"Nosebleeds and a low platelet count", tag:"Type 2B VWD",
  stem:"A 19-year-old man with lifelong nosebleeds and bleeding after tooth extraction. His mother has heavy periods. He was told he has 'ITP' and was given steroids without effect.",
  data:[["Platelets","88 × 10⁹/L, large platelets, some clumps"],["PT","12.4 s"],["APTT","37 s"],["PFA CEPI / CADP","both prolonged"]],
  steps:[
    { q:"Which panel is most useful next?", opts:["Bone marrow","VWF:Ag, VWF activity, FVIII","Anti-platelet antibodies","Factor XIII"], c:1,
      fb:"Mucocutaneous bleeding, family history and prolonged PFA point to VWD. Thrombocytopenia should make you think of type 2B." },
    { q:"VWF:Ag 0.54, VWF:GPIbM 0.20, FVIII 0.48 IU/mL. What does the ratio tell you?", opts:["Type 1","Type 2 (ratio 0.37)","Type 3","Normal"], c:1,
      fb:"An activity to antigen ratio under 0.7 means a qualitative defect. Now type it with multimers and RIPA." },
    { q:"Low-dose ristocetin (0.5 mg/mL) gives 65% aggregation (normal under 10%). Multimers show loss of HMW forms. Diagnosis?", opts:["2A","2B or platelet-type VWD","2M","2N"], c:1,
      fb:"Gain-of-function VWF binds GPIb spontaneously, clears HMW multimers and platelets. Genetic testing (VWF exon 28 versus GP1BA) separates 2B from platelet-type VWD." },
    { q:"Which treatment should be avoided?", opts:["Tranexamic acid","Desmopressin (DDAVP)","VWF-containing concentrate","Local measures"], c:1,
      fb:"Desmopressin releases the abnormal VWF and can worsen the thrombocytopenia. Use VWF concentrate for surgery." }
  ],
  teach:["Thrombocytopenia with mucocutaneous bleeding: think 2B VWD before ITP","Activity/Ag under 0.7 → multimers and low-dose RIPA","Genetics separates 2B from platelet-type VWD","Avoid desmopressin in 2B"]
},
{
  id:"m6-gt", title:"A girl who bleeds from the gums", tag:"Glanzmann thrombasthenia",
  stem:"A 7-year-old girl of consanguineous parents with gum bleeding, nosebleeds needing packing, and easy bruising since infancy.",
  data:[["Platelets","290 × 10⁹/L, normal size and film"],["PT / APTT","normal"],["VWF:Ag / activity","1.05 / 0.98 IU/mL"],["PFA","both closure times over 300 s"]],
  steps:[
    { q:"VWD is excluded. What test comes next?", opts:["Bone marrow","Light transmission aggregometry","D-dimer","FXIII"], c:1,
      fb:"Normal count and VWF with very abnormal PFA suggest a severe platelet function disorder." },
    { q:"LTA: no aggregation with ADP, collagen, AA or epinephrine; normal ristocetin agglutination. Diagnosis?", opts:["Bernard–Soulier","Glanzmann thrombasthenia","Aspirin","Storage pool disease"], c:1,
      fb:"Absent GPIIb/IIIa (integrin αIIbβ3) stops fibrinogen bridging between platelets; ristocetin agglutination needs only VWF and GPIb." },
    { q:"How is it confirmed?", opts:["Flow cytometry: absent CD41/CD61, then ITGA2B/ITGB3 genetics","Bleeding time","Platelet antibodies","Electron microscopy"], c:0,
      fb:"Flow cytometry shows the amount of GPIIb/IIIa; genetics confirms it and allows family counselling." },
    { q:"Why should platelet transfusions be used carefully?", opts:["They do not work","Patients can form anti-GPIIb/IIIa or HLA antibodies that make later transfusions fail","They cause thrombosis","They spread infection"], c:1,
      fb:"Use HLA-matched platelets when possible; recombinant FVIIa is licensed for refractory cases. Tranexamic acid helps mucosal bleeding." }
  ],
  teach:["Normal count + absent aggregation except ristocetin = Glanzmann","Flow: CD41/CD61 absent","Autosomal recessive; consanguinity common","Beware platelet refractoriness; rFVIIa for refractory bleeding"]
},
{
  id:"m6-doac", title:"A stroke on an anticoagulant", tag:"DOAC measurement",
  stem:"An 81-year-old woman on apixaban 5 mg twice daily for AF arrives with an acute ischaemic stroke, 2 h after onset. Thrombolysis is being considered. She is unsure when she took her last tablet.",
  data:[["PT","13.8 s (ref 11–14)"],["APTT","34 s (ref 26–36)"],["Creatinine","148 µmol/L"],["Platelets","210 × 10⁹/L"]],
  steps:[
    { q:"Do the normal PT and APTT exclude a relevant apixaban level?", opts:["Yes","No: apixaban has little effect on PT and APTT","Only the PT matters","Only the APTT matters"], c:1,
      fb:"Even therapeutic apixaban levels can leave both tests normal, especially with insensitive reagents." },
    { q:"Which test answers the question?", opts:["TT","Apixaban-calibrated anti-Xa","Heparin-calibrated anti-Xa read as IU/mL","dRVVT"], c:1,
      fb:"A drug-calibrated anti-Xa gives ng/mL within an hour. A heparin-calibrated anti-Xa shows presence but cannot give a level." },
    { q:"Apixaban level 135 ng/mL. What does this mean for thrombolysis?", opts:["Safe to thrombolyse","A clinically relevant level (above about 30–50 ng/mL): thrombolysis is generally not given; consider thrombectomy","Give andexanet first, then always lyse","Repeat in a week"], c:1,
      fb:"Local stroke protocols differ, but levels above about 30–50 ng/mL are a common threshold. Mechanical thrombectomy may still be possible." }
  ],
  teach:["Normal PT and APTT do not exclude apixaban","Drug-calibrated anti-Xa gives ng/mL","Thresholds of about 30–50 ng/mL guide urgent procedures","Dabigatran: use dTT; normal TT excludes it"]
},
{
  id:"m6-f13", title:"Bleeding from the umbilical stump", tag:"Factor XIII deficiency",
  stem:"A 9-day-old baby boy has oozing from the umbilical stump and a large bruise after a heel prick. Parents are first cousins.",
  data:[["PT","13 s (age-appropriate)"],["APTT","38 s (age-appropriate)"],["Fibrinogen","2.4 g/L"],["Platelets","310 × 10⁹/L"],["Vitamin K","given at birth"]],
  steps:[
    { q:"The screen is normal. Which disorder fits best?", opts:["Haemophilia A","Factor XIII deficiency","Vitamin K deficiency","FVII deficiency"], c:1,
      fb:"FXIII cross-links fibrin after the clotting end-point, so all clotting times are normal. Umbilical bleeding is classic." },
    { q:"The clot solubility test (5 M urea) is normal. Does this exclude FXIII deficiency?", opts:["Yes","No: it only detects very severe deficiency; use a quantitative FXIII activity assay","Yes, if repeated","Only in adults"], c:1,
      fb:"Clot solubility can be normal with FXIII levels above about 1–5%. The quantitative assay, with a blank, gives the level." },
    { q:"FXIII activity is under 2%. What is the management?", opts:["No treatment","Regular FXIII concentrate prophylaxis (every 4–6 weeks)","Desmopressin","Vitamin K"], c:1,
      fb:"Severe FXIII deficiency carries a high risk of intracranial bleeding; the long half-life allows monthly prophylaxis. Test relatives and check FXIII-A and FXIII-B subunits." }
  ],
  teach:["Normal screen + umbilical or delayed bleeding: think FXIII","Clot solubility misses all but severe deficiency","Use a quantitative FXIII activity assay","Monthly concentrate prophylaxis"]
}
];

const M6_TREES = [
{ id:"la", title:"Lupus anticoagulant testing", intro:"Follow ISTH 2020: two tests (dRVVT and LA-sensitive APTT), each with screen, mix and confirm. Run on double-centrifuged plasma.",
  nodes:{
  start:{ q:"Is the patient on an anticoagulant?", opts:[["No","screen"],["Vitamin K antagonist","vka"],["DOAC","doac"],["Heparin","hep"]] },
  vka:{ end:"Test when the INR is under 1.5, or test a 1:1 mix with normal plasma", detail:"Or use Taipan venom time with ecarin time as confirm, which are insensitive to VKA. Comment on the drug in the report." },
  doac:{ end:"Do not test on a DOAC", detail:"DOACs (especially rivaroxaban) give false-positive dRVVT. Test off the drug, or after an activated-charcoal DOAC-removal step with a comment." },
  hep:{ q:"Is the anti-Xa within the reagent's heparin-neutraliser limit (often up to 0.8–1 IU/mL)?", opts:[["Yes","screen"],["No","heptoo"]] },
  heptoo:{ end:"Postpone testing", detail:"Repeat when the heparin level is within the neutraliser capacity, or on a different anticoagulant plan." },
  screen:{ q:"Is either screen ratio (dRVVT or LA-APTT) above its cut-off?", opts:[["Yes","mix"],["No","neg"]] },
  neg:{ end:"LA not detected", detail:"Still test aCL and anti-β2GPI. A negative LA in the acute phase (high FVIII) may need repeating." },
  mix:{ q:"Is the 1:1 mix (not incubated) above its cut-off, or is the ICA positive?", opts:[["Yes","conf"],["No, it corrects","defic"]] },
  defic:{ q:"Is the confirm step still clearly positive (normalised ratio above cut-off)?", opts:[["Yes","laweak"],["No","factor"]] },
  laweak:{ end:"LA detected (a weak LA can correct on mixing)", detail:"ISTH 2020 accepts LA when screen and confirm are positive even if the mix corrects, but interpret with care and repeat at 12 weeks." },
  factor:{ end:"Probable factor deficiency, not LA", detail:"Measure factors: FVIII, IX, XI, XII for APTT; X, V, II for dRVVT. Check for a VKA or liver disease." },
  conf:{ q:"Is the normalised ratio (screen ratio ÷ confirm ratio) or percent correction above the cut-off?", opts:[["Yes","pos"],["No","inh"]] },
  pos:{ end:"LA detected", detail:"Report with drugs and timing. Test aCL and anti-β2GPI; repeat everything after at least 12 weeks before diagnosing APS." },
  inh:{ end:"Inhibitor present, LA not confirmed", detail:"Think heparin above the neutraliser limit, a DOAC, or a specific factor inhibitor. Check the TT and anti-Xa; do factor assays at several dilutions." }
  }},
{ id:"vwf", title:"Interpreting VWF results", intro:"Use VWF:Ag, a platelet-binding activity (GPIbM, GPIbR or RCo) and FVIII:C, on a sample kept at room temperature and tested within 4 hours.",
  nodes:{
  start:{ q:"Is VWF:Ag or VWF activity under 0.05 IU/mL (undetectable)?", opts:[["Yes","t3"],["No","lev"]] },
  t3:{ end:"Type 3 VWD", detail:"FVIII usually 1–10%. Confirm with absent multimers and genetics; test both parents (often type 1 carriers). Watch for alloantibodies." },
  lev:{ q:"What is the activity to antigen ratio?", opts:[["0.7 or more","t1q"],["Under 0.7","t2"]] },
  t1q:{ q:"What is the lowest VWF level (Ag or activity)?", opts:[["Under 0.30 IU/mL","t1"],["0.30–0.50 IU/mL","bleed"],["Over 0.50 IU/mL","fviii"]] },
  t1:{ end:"Type 1 VWD", detail:"Check VWF propeptide (type 1C if high) and desmopressin response." },
  bleed:{ q:"Is there an abnormal bleeding score (ISTH-BAT)?", opts:[["Yes","t1b"],["No","low"]] },
  t1b:{ end:"Type 1 VWD (2021 guideline)", detail:"Treat as VWD. Consider the effect of blood group O, but do not use group-specific ranges for diagnosis." },
  low:{ end:"Low VWF without bleeding", detail:"Not VWD. Repeat if the sample may have been raised by stress or oestrogen, and give advice for surgery." },
  fviii:{ q:"Is FVIII:C low relative to VWF:Ag (FVIII/VWF:Ag under about 0.6)?", opts:[["Yes","t2n"],["No","normal"]] },
  t2n:{ end:"Consider type 2N VWD or haemophilia A carrier", detail:"VWF:FVIII binding assay and F8 and VWF genetics." },
  normal:{ end:"VWD unlikely on this sample", detail:"If bleeding is convincing, repeat VWF (levels fluctuate) and go on to platelet function tests." },
  t2:{ q:"What does low-dose ristocetin (RIPA 0.5–0.6 mg/mL) show?", opts:[["Enhanced aggregation","t2b"],["No response","mult"]] },
  t2b:{ end:"Type 2B or platelet-type VWD", detail:"Often thrombocytopenia and loss of HMW multimers. Genetics (VWF exon 28 versus GP1BA) separates them. Avoid desmopressin." },
  mult:{ q:"What do the multimers show?", opts:[["Loss of HMW and intermediate multimers","t2a"],["Normal multimer pattern","t2m"]] },
  t2a:{ end:"Type 2A VWD", detail:"VWF:CB/Ag is also low. Exclude acquired VWS: aortic stenosis, LVAD, MPN, monoclonal gammopathy." },
  t2m:{ end:"Type 2M VWD", detail:"Low GPIb binding with normal multimers; VWF:CB may be normal or low (collagen-binding 2M)." }
  }},
{ id:"bleedscreen", title:"Bleeding with a normal clotting screen", intro:"For a patient with a convincing bleeding history (ISTH-BAT) whose PT, APTT, fibrinogen and platelet count are normal.",
  nodes:{
  start:{ q:"Is the bleeding mainly mucocutaneous (nose, gums, menorrhagia, bruising)?", opts:[["Yes","vwf"],["No: delayed, umbilical or wound-healing bleeding","f13"]] },
  f13:{ end:"Test factor XIII (quantitative) and fibrinolysis", detail:"FXIII activity; α2-antiplasmin and PAI-1 for rare fibrinolytic defects. Mild FVIII, IX or XI deficiency can still hide behind a normal APTT." },
  vwf:{ q:"Are VWF:Ag, VWF activity and FVIII normal on two occasions?", opts:[["Yes","drugs"],["No","vwd"]] },
  vwd:{ end:"Go to the VWF interpretation workup", detail:"Use the VWF tree to type the disorder." },
  drugs:{ q:"Has the patient taken aspirin, NSAIDs, SSRIs or other antiplatelet drugs in the last 10 days?", opts:[["Yes","stop"],["No","film"]] },
  stop:{ end:"Repeat after stopping the drugs for 7–10 days", detail:"Drug effects are the commonest cause of abnormal aggregation." },
  film:{ q:"What does the film show?", opts:[["Giant platelets","giant"],["Grey, agranular platelets","grey"],["Normal-looking platelets","lta"]] },
  giant:{ end:"Consider Bernard–Soulier, MYH9 disorder or 2B / platelet-type VWD", detail:"Ristocetin agglutination, flow cytometry for CD42b, neutrophil inclusions, genetics." },
  grey:{ end:"Consider grey platelet syndrome", detail:"Exclude EDTA storage artefact on a fresh film; electron microscopy, NBEAL2 genetics." },
  lta:{ q:"What does LTA show?", opts:[["Absent with all agonists except ristocetin","gt"],["Absent AA response","cox"],["Absent second waves, reduced collagen","spd"],["Reduced, reversible ADP only","p2y"],["Normal","norm"]] },
  gt:{ end:"Glanzmann thrombasthenia", detail:"Flow cytometry for CD41/CD61; ITGA2B and ITGB3 genetics." },
  cox:{ end:"Aspirin-like (COX-1 or thromboxane synthase) defect", detail:"Recheck drug history. U46619 response separates a thromboxane receptor defect (absent) from a synthesis defect (normal)." },
  spd:{ end:"Storage pool or secretion defect", detail:"Lumiaggregometry (ATP release), mepacrine flow, whole-mount EM for dense granules. Consider Hermansky–Pudlak (albinism) or Chediak–Higashi." },
  p2y:{ end:"P2Y12 receptor defect (or clopidogrel, ticagrelor, prasugrel)", detail:"Confirm the drug history; P2RY12 genetics." },
  norm:{ end:"No defect found with current tests", detail:"Consider mild VWD (repeat), mild factor deficiency, connective tissue disorders (Ehlers–Danlos), or bleeding of undefined cause. Genetic panels may help." }
  }},
{ id:"tt", title:"Long thrombin time", intro:"Use when the thrombin time is longer than the local reference range.",
  nodes:{
  start:{ q:"Is the reptilase time also long?", opts:[["No, normal","inhib"],["Yes","fib"]] },
  inhib:{ q:"Is the patient on dabigatran, argatroban or bivalirudin?", opts:[["Yes","dti"],["No","hep"]] },
  dti:{ end:"Direct thrombin inhibitor effect", detail:"Measure with a calibrated diluted thrombin time or ecarin assay." },
  hep:{ end:"Heparin (treatment or contamination)", detail:"Confirm with anti-Xa or a heparinase-treated repeat. If it was a line sample, ask for a clean venepuncture." },
  fib:{ q:"What is the Clauss fibrinogen?", opts:[["Low, antigen proportionately low","hypo"],["Low, antigen normal (ratio under 0.7)","dys"],["Normal or high","fdp"]] },
  hypo:{ q:"Is there evidence of consumption (low platelets, high D-dimer, long PT)?", opts:[["Yes","dic"],["No","hypoi"]] },
  dic:{ end:"DIC or massive bleeding with consumption", detail:"Calculate the ISTH DIC score; give fibrinogen if under 1.5 g/L with bleeding." },
  hypoi:{ end:"Hypofibrinogenaemia (inherited or from liver disease, asparaginase, thrombolysis)", detail:"Repeat with a fresh sample; family studies and FGA/FGB/FGG genetics if inherited." },
  dys:{ end:"Dysfibrinogenaemia", detail:"Inherited (genetics) or acquired (liver disease, hepatoma). Ask about bleeding and thrombosis in the family." },
  fdp:{ end:"FDPs, paraprotein or high fibrinogen interfering", detail:"Check D-dimer, serum protein electrophoresis. Very high fibrinogen can slightly prolong the TT." }
  }}
];

const M6_CHECKLIST = { title:"Running light transmission aggregometry", intro:"The practical steps of an LTA study, following the ISTH 2013 recommendations. Tick each step as you go.", steps:[
  ["Check the patient", "No aspirin or NSAIDs for 7–10 days; record all drugs and supplements. Rested, ideally fasting or after a light non-fatty meal."],
  ["Check the count and film", "Platelet count, size and granularity. Below about 150 × 10⁹/L in PRP, interpret with caution."],
  ["Collect correctly", "21-gauge needle, light tourniquet, discard the first few mL, 3.2% citrate. Keep at room temperature; no pneumatic tube."],
  ["Prepare PRP", "Centrifuge at about 200 g for 10 minutes at room temperature, no brake. Take PRP with a plastic pipette."],
  ["Prepare PPP", "Spin the remaining blood at 1500 g or more for 15 minutes; use it as the 100% transmission blank."],
  ["Rest and time", "Let PRP rest 15–30 minutes; finish all testing within 4 hours of collection."],
  ["Set the baseline", "Calibrate each channel: PRP = 0%, the patient's own PPP = 100%. Stir bar at 1000–1200 rpm, 37 °C."],
  ["Run the agonist panel", "ADP 2 and 5–10 µM, collagen 2 µg/mL, arachidonic acid 1 mM, epinephrine 5 µM, ristocetin 1.2 and 0.5–0.6 mg/mL. Run a healthy control the same day."],
  ["Read the tracings", "Shape change, lag phase, slope, maximum and final aggregation, second waves, reversal. Compare with your reference intervals."],
  ["Follow up abnormal results", "Repeat on a new sample; add lumiaggregometry, flow cytometry, electron microscopy or genetics as indicated."]
]};
