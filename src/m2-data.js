/* Module 2 content: Red cell disorders. Original text written from the reference books in
   the project library. Cut-offs follow common UK/international practice; check local ranges. */

Object.assign(SOURCES, {
  rbcd: "RBCs disorders (project library)",
  hoff7: "Hoffbrand et al., Postgraduate Haematology, 7th ed. (2015)",
  imh: "Immunohaematology (project library)"
});

const M2_LESSONS = [
{
  id: "anaemia-approach",
  title: "Approach to anaemia",
  minutes: 12,
  sources: ["dl", "hof", "psh"],
  video: "approach to anemia MCV reticulocyte classification",
  body: `
<p>Anaemia is a haemoglobin below the reference range for age, sex and pregnancy status. The WHO cut-offs are 130 g/L for men, 120 g/L for non-pregnant women and 110 g/L in pregnancy. Anaemia is a finding, not a diagnosis: the job is to find its cause.</p>
<h3>Two questions that classify almost every anaemia</h3>
<ol>
<li><b>Is the marrow responding?</b> The reticulocyte count separates <i>hypoproliferative</i> anaemias (low or inappropriately normal reticulocytes: deficiency, marrow failure, infiltration, renal disease, inflammation) from <i>hyperproliferative</i> ones (raised reticulocytes: bleeding or haemolysis).</li>
<li><b>What size are the red cells?</b> MCV sorts the hypoproliferative group into microcytic, normocytic and macrocytic.</li>
</ol>
<div class="tablewrap"><table class="t"><thead><tr><th>Microcytic (MCV under 83 fL)</th><th>Normocytic</th><th>Macrocytic (MCV over 101 fL)</th></tr></thead><tbody>
<tr><td>Iron deficiency</td><td>Anaemia of inflammation (early)</td><td>Megaloblastic: B12 or folate deficiency, drugs (methotrexate, hydroxycarbamide)</td></tr>
<tr><td>Thalassaemia trait</td><td>Chronic kidney disease</td><td>Alcohol, liver disease</td></tr>
<tr><td>Anaemia of inflammation (late)</td><td>Acute blood loss</td><td>Hypothyroidism</td></tr>
<tr><td>Sideroblastic anaemia (hereditary)</td><td>Marrow infiltration or failure</td><td>Myelodysplastic neoplasms, aplastic anaemia</td></tr>
<tr><td>Lead poisoning (rarely)</td><td>Mixed deficiency (micro plus macro, with a high RDW)</td><td>Reticulocytosis (haemolysis, recovery)</td></tr>
</tbody></table></div>
<h3>The blood film</h3>
<p>Always look at the film. A few patterns settle the diagnosis on their own: spherocytes (hereditary spherocytosis, warm AIHA), fragments (microangiopathy), sickle cells, target cells with microcytosis (haemoglobinopathy), oval macrocytes with hypersegmented neutrophils (megaloblastic), a leucoerythroblastic picture with teardrop cells (marrow infiltration or fibrosis), and rouleaux (paraprotein).</p>
<h3>The red cell distribution width</h3>
<p>RDW measures variation in red cell size. It rises early in iron deficiency and in mixed deficiencies, and is usually normal in uncomplicated thalassaemia trait. It is a useful supporting clue, never a diagnosis on its own.</p>
<h3>Correcting the reticulocyte count</h3>
<p>A reticulocyte percentage overstates marrow output in anaemia, because the denominator (red cells) is small and stressed reticulocytes circulate longer. Report the absolute count, or use the reticulocyte production index (RPI): an RPI below 2 in an anaemic patient means the marrow is not keeping up. The calculator in the workups section does this.</p>
`,
  points: [
    "Anaemia: Hb under 130 g/L (men), 120 g/L (women), 110 g/L (pregnancy)",
    "First the reticulocytes (response), then the MCV (size)",
    "Raised reticulocytes: bleeding or haemolysis",
    "Always review the film: spherocytes, fragments, sickle, target, oval macrocytes, teardrops",
    "High RDW suggests iron deficiency or mixed deficiency rather than thalassaemia trait",
    "RPI under 2 in anaemia means an inadequate marrow response"
  ]
},
{
  id: "iron",
  title: "Iron metabolism, iron deficiency and anaemia of inflammation",
  minutes: 15,
  sources: ["hof", "dl", "rbcd"],
  video: "iron metabolism hepcidin ferroportin iron deficiency anemia",
  body: `
<p>The body holds 3 to 4 g of iron, two thirds of it in haemoglobin. There is no regulated excretion route, so balance is controlled at absorption. Daily losses of about 1 mg (about 2 mg in menstruating women) are replaced from 1 to 2 mg absorbed from the diet.</p>
<h3>The iron cycle</h3>
<ul>
<li><b>Absorption:</b> in the duodenum. Ferric iron is reduced by duodenal cytochrome b (DCYTB) and enters the enterocyte through DMT1. Haem iron is absorbed separately and more efficiently.</li>
<li><b>Export:</b> ferroportin is the only known cellular iron exporter, on enterocytes, macrophages and hepatocytes. Hephaestin (gut) and ceruloplasmin (plasma) oxidise iron for loading onto transferrin.</li>
<li><b>Transport:</b> transferrin carries iron to transferrin receptor 1 on erythroblasts.</li>
<li><b>Recycling:</b> macrophages recover about 20 to 25 mg a day from senescent red cells, which is most of what the marrow uses.</li>
<li><b>Control:</b> hepcidin, made by the liver, binds ferroportin and causes its internalisation and breakdown. Hepcidin rises with iron loading and inflammation (IL-6), and falls with iron deficiency, hypoxia and active erythropoiesis (through erythroferrone).</li>
</ul>
<h3>Stages of iron deficiency</h3>
<ol>
<li><b>Depleted stores:</b> ferritin falls; haemoglobin is normal.</li>
<li><b>Iron-deficient erythropoiesis:</b> transferrin saturation falls, zinc protoporphyrin and soluble transferrin receptor rise, reticulocyte haemoglobin content falls.</li>
<li><b>Iron deficiency anaemia:</b> haemoglobin falls; microcytosis and hypochromia appear, with pencil cells and a raised RDW. Platelets are often raised.</li>
</ol>
<h3>Laboratory diagnosis</h3>
<p>A serum ferritin below 15 µg/L is diagnostic of absent stores; many guidelines use below 30 µg/L to improve sensitivity. Ferritin is an acute phase protein, so a normal value does not exclude iron deficiency in inflammation; in that setting a ferritin up to about 100 µg/L with a transferrin saturation below 20% is consistent with iron deficiency. Absent stainable iron in marrow particles remains the reference standard.</p>
<p>In adult men and postmenopausal women, unexplained iron deficiency needs gastrointestinal investigation for occult bleeding, including coeliac serology.</p>
<h3>Anaemia of inflammation (chronic disease)</h3>
<p>IL-6 raises hepcidin, which traps iron in macrophages and blocks absorption. Inflammation also blunts the EPO response and shortens red cell survival. The anaemia is usually mild and normocytic, becoming microcytic when long-standing.</p>
<div class="tablewrap"><table class="t"><thead><tr><th></th><th>Iron deficiency</th><th>Anaemia of inflammation</th><th>Thalassaemia trait</th><th>Sideroblastic</th></tr></thead><tbody>
<tr><td>MCV</td><td>Low</td><td>Normal or low</td><td>Very low for the Hb</td><td>Low (hereditary) or high (acquired)</td></tr>
<tr><td>RBC count</td><td>Low</td><td>Low</td><td>Normal or high</td><td>Low</td></tr>
<tr><td>RDW</td><td>High</td><td>Normal</td><td>Normal or mildly high</td><td>High (dimorphic film)</td></tr>
<tr><td>Ferritin</td><td>Low</td><td>Normal or high</td><td>Normal</td><td>High</td></tr>
<tr><td>Transferrin saturation</td><td>Low</td><td>Low</td><td>Normal</td><td>High</td></tr>
<tr><td>Soluble transferrin receptor</td><td>High</td><td>Normal</td><td>Normal or high</td><td>Normal or high</td></tr>
<tr><td>Marrow iron</td><td>Absent</td><td>Present in macrophages</td><td>Present</td><td>Ring sideroblasts</td></tr>
</tbody></table></div>
<p>Iron-refractory iron deficiency anaemia (IRIDA) is a rare recessive disorder caused by TMPRSS6 mutations: hepcidin is inappropriately high, so oral iron fails.</p>
`,
  points: [
    "Hepcidin degrades ferroportin: high in inflammation and iron overload, low in iron deficiency",
    "Ferritin under 15 µg/L is diagnostic; under 30 µg/L is commonly used",
    "In inflammation, ferritin up to about 100 µg/L with TSAT under 20% still fits iron deficiency",
    "Iron deficiency: low MCV, low RBC count, high RDW, often high platelets",
    "Unexplained iron deficiency in men and postmenopausal women: investigate the GI tract",
    "IRIDA: TMPRSS6 mutation, high hepcidin, no response to oral iron"
  ]
},
{
  id: "megaloblastic",
  title: "Macrocytic and megaloblastic anaemia",
  minutes: 13,
  sources: ["hof", "dl", "bmp"],
  video: "megaloblastic anemia vitamin B12 folate deficiency hypersegmented neutrophils",
  body: `
<p>Megaloblastic anaemia results from impaired DNA synthesis, usually from vitamin B<sub>12</sub> (cobalamin) or folate deficiency. Nuclear maturation lags behind cytoplasmic maturation in every dividing lineage, and many precursors die in the marrow (ineffective haematopoiesis).</p>
<h3>Physiology</h3>
<ul>
<li><b>B<sub>12</sub>:</b> released from food by acid and pepsin, bound by haptocorrin, transferred to intrinsic factor (from gastric parietal cells) in the duodenum, and absorbed in the terminal ileum through the cubam receptor. Transported in plasma by transcobalamin (holotranscobalamin is the active fraction). Stores of 2 to 3 mg last several years.</li>
<li><b>Folate:</b> absorbed in the proximal jejunum. Stores last only about 4 months.</li>
<li><b>Biochemistry:</b> B<sub>12</sub> is needed for methionine synthase (homocysteine to methionine, regenerating tetrahydrofolate) and for methylmalonyl-CoA mutase. So methylmalonic acid rises only in B<sub>12</sub> deficiency, while homocysteine rises in both.</li>
</ul>
<h3>Causes</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>B<sub>12</sub> deficiency</th><th>Folate deficiency</th></tr></thead><tbody>
<tr><td>Pernicious anaemia (autoimmune gastritis)</td><td>Poor diet, alcohol</td></tr>
<tr><td>Gastrectomy, bariatric surgery</td><td>Increased demand: pregnancy, haemolysis, exfoliative skin disease</td></tr>
<tr><td>Ileal resection or Crohn disease, bacterial overgrowth, fish tapeworm</td><td>Malabsorption: coeliac disease</td></tr>
<tr><td>Strict vegan diet</td><td>Drugs: methotrexate, trimethoprim, phenytoin</td></tr>
<tr><td>Drugs: metformin, proton pump inhibitors; nitrous oxide inactivates B<sub>12</sub></td><td>Dialysis losses</td></tr>
</tbody></table></div>
<h3>Laboratory features</h3>
<ul>
<li><b>Blood:</b> oval macrocytes (MCV often over 110 fL), anisopoikilocytosis with teardrops and fragments, Howell–Jolly bodies, hypersegmented neutrophils (5% or more with 5 lobes, or any with 6 or more), and in severe cases pancytopenia. Reticulocytes are low.</li>
<li><b>Chemistry:</b> raised LDH (often very high) and unconjugated bilirubin, from intramedullary haemolysis.</li>
<li><b>Marrow:</b> hypercellular with megaloblasts (large erythroblasts with open, sieve-like chromatin despite haemoglobinised cytoplasm), giant metamyelocytes and band forms, and hypersegmented megakaryocytes.</li>
</ul>
<h3>Diagnosing the cause</h3>
<p>Serum B<sub>12</sub> has poor sensitivity and specificity near the cut-off; holotranscobalamin and methylmalonic acid help in borderline cases. For pernicious anaemia, intrinsic factor antibodies are highly specific but positive in only about half of patients; parietal cell antibodies are sensitive but not specific. A raised gastrin and low pepsinogen support autoimmune gastritis.</p>
<p><b>Safety point:</b> in combined or uncertain deficiency, replace B<sub>12</sub> before or with folate. Folate alone can worsen B<sub>12</sub>-related neuropathy (subacute combined degeneration of the cord).</p>
<h3>Non-megaloblastic macrocytosis</h3>
<p>Alcohol, liver disease and hypothyroidism give round macrocytes with an MCV usually under 110 fL. Reticulocytosis raises the MCV because reticulocytes are larger. Myelodysplastic neoplasms cause macrocytosis with dysplasia, and are covered in Module 3.</p>
`,
  points: [
    "B12 needs intrinsic factor and is absorbed in the terminal ileum; folate in the jejunum",
    "MMA rises only with B12 deficiency; homocysteine rises with both",
    "Oval macrocytes plus hypersegmented neutrophils suggest megaloblastic anaemia",
    "High LDH and bilirubin come from ineffective (intramedullary) erythropoiesis",
    "Intrinsic factor antibodies: specific, about 50% sensitive",
    "Give B12 before or with folate"
  ]
},
{
  id: "haemolysis-membrane",
  title: "Haemolysis and red cell membrane disorders",
  minutes: 13,
  sources: ["dl", "hof", "rbcd"],
  video: "hereditary spherocytosis EMA binding test hemolysis",
  body: `
<p>Haemolysis means shortened red cell survival. The marrow can increase production 6 to 8 times, so anaemia appears only when destruction outpaces that. Haemolysis is extravascular (macrophages in spleen and liver, most cases) or intravascular (complement lysis, mechanical damage, toxins, some infections).</p>
<h3>Laboratory markers of haemolysis</h3>
<div class="tablewrap"><table class="t"><thead><tr><th>Marker</th><th>Finding</th><th>Comment</th></tr></thead><tbody>
<tr><td>Reticulocytes</td><td>Raised</td><td>May be low in a parvovirus crisis or with coexisting deficiency</td></tr>
<tr><td>Unconjugated bilirubin</td><td>Raised</td><td>Also raised in Gilbert syndrome</td></tr>
<tr><td>LDH</td><td>Raised</td><td>Highest in intravascular haemolysis</td></tr>
<tr><td>Haptoglobin</td><td>Low or absent</td><td>An acute phase protein; can be normal in inflammation</td></tr>
<tr><td>Plasma free haemoglobin, haemoglobinuria</td><td>Present</td><td>Intravascular haemolysis</td></tr>
<tr><td>Urine haemosiderin</td><td>Present</td><td>Chronic intravascular haemolysis (appears after about a week)</td></tr>
</tbody></table></div>
<p>Then look at the film and do a direct antiglobulin test (DAT). These two steps split most haemolytic anaemias into immune and non-immune causes. The haemolysis decision tree in the workups section follows this order.</p>
<h3>Hereditary spherocytosis</h3>
<p>The commonest inherited haemolytic anaemia in people of Northern European descent, mostly autosomal dominant. Defects in vertical membrane links (ankyrin most often, then band 3, spectrin and protein 4.2) cause loss of membrane, and the spheres are trapped in the spleen.</p>
<ul>
<li>Spherocytes, raised MCHC (often over 360 g/L) and raised reticulocytes, with a negative DAT.</li>
<li><b>EMA binding test:</b> flow cytometry of eosin-5-maleimide binding to band 3. Reduced fluorescence is the preferred screening test, with high sensitivity and specificity.</li>
<li>Osmotic fragility and the acidified glycerol lysis test are older alternatives.</li>
<li>Complications: gallstones, aplastic crisis with parvovirus B19, folate deficiency. Splenectomy is reserved for severe disease.</li>
</ul>
<h3>Other membrane disorders</h3>
<ul>
<li><b>Hereditary elliptocytosis:</b> horizontal spectrin defects; mostly no symptoms.</li>
<li><b>Southeast Asian ovalocytosis:</b> band 3 deletion; rigid stomatocytic ovalocytes; protective against malaria.</li>
<li><b>Hereditary pyropoikilocytosis:</b> severe, with fragments and microspherocytes; red cells break down at 45 to 46°C.</li>
<li><b>Hereditary stomatocytosis and xerocytosis:</b> cation leak disorders (PIEZO1 in xerocytosis). Splenectomy is contraindicated because of thrombosis risk.</li>
</ul>
`,
  points: [
    "Haemolysis markers: reticulocytes, unconjugated bilirubin, LDH up; haptoglobin down",
    "Intravascular: haemoglobinuria, then haemosiderinuria",
    "After the markers: film and DAT",
    "HS: spherocytes, high MCHC, DAT negative, reduced EMA binding",
    "Ankyrin is the most common HS defect; most cases are autosomal dominant",
    "Avoid splenectomy in hereditary stomatocytosis and xerocytosis"
  ]
},
{
  id: "enzymopathies",
  title: "Red cell enzymopathies",
  minutes: 9,
  sources: ["hof", "dl"],
  video: "G6PD deficiency bite cells Heinz bodies pyruvate kinase deficiency",
  body: `
<h3>G6PD deficiency</h3>
<p>The commonest red cell enzyme defect, affecting several hundred million people, especially in Africa, the Mediterranean, the Middle East and Asia. It is X-linked, so hemizygous males are affected and heterozygous females show variable expression through lyonisation.</p>
<ul>
<li><b>Clinical patterns:</b> neonatal jaundice; acute haemolysis after an oxidant stress; rarely, chronic non-spherocytic haemolytic anaemia.</li>
<li><b>Triggers:</b> fava beans (favism), infections, and drugs such as primaquine and tafenoquine, dapsone, rasburicase, sulfonamides, nitrofurantoin and methylene blue.</li>
<li><b>Film during a crisis:</b> bite cells and blister cells, irregularly contracted cells, and Heinz bodies on a supravital stain (denatured haemoglobin). The haemolysis is largely intravascular.</li>
<li><b>Testing:</b> the fluorescent spot test or a quantitative assay. Reticulocytes and young red cells have more enzyme, so a test done during or just after a crisis can be falsely normal. Repeat it about 3 months later if the result is normal but suspicion remains.</li>
</ul>
<h3>Pyruvate kinase deficiency</h3>
<p>The commonest glycolytic defect, autosomal recessive, causing chronic haemolysis from birth. The film shows few specific changes, apart from prickle cells (echinocytes), which are more obvious after splenectomy. 2,3-BPG accumulates, which right-shifts the oxygen curve, so patients tolerate their anaemia unusually well. Mitapivat, a PK activator, is now a treatment option.</p>
<h3>Pyrimidine 5'-nucleotidase deficiency</h3>
<p>Autosomal recessive. Prominent basophilic stippling is the clue. Lead poisoning inhibits the same enzyme and causes the same stippling.</p>
`,
  points: [
    "G6PD deficiency is X-linked; triggers are fava beans, infection and oxidant drugs",
    "Crisis film: bite and blister cells; supravital stain shows Heinz bodies",
    "G6PD assay may be falsely normal just after a crisis: repeat at about 3 months",
    "PK deficiency: autosomal recessive, high 2,3-BPG, echinocytes after splenectomy",
    "Basophilic stippling: P5'N deficiency, lead poisoning, thalassaemia"
  ]
},
{
  id: "haemoglobinopathies",
  title: "Thalassaemias and haemoglobin variants",
  minutes: 16,
  sources: ["hof", "dl", "rbcd"],
  video: "thalassemia hemoglobin electrophoresis HPLC HbA2 sickle cell",
  body: `
<p>Haemoglobin disorders are either <b>thalassaemias</b> (reduced synthesis of structurally normal globin chains) or <b>structural variants</b> (an altered chain, such as HbS, HbC or HbE). Some variants, such as HbE, are also synthesised at a reduced rate and behave like a mild thalassaemia.</p>
<h3>α-thalassaemia</h3>
<p>Usually caused by deletions of one or both of the paired α genes on chromosome 16 (αα/αα normally).</p>
<div class="tablewrap"><table class="t"><thead><tr><th>Genotype</th><th>Name</th><th>Picture</th></tr></thead><tbody>
<tr><td>−α/αα</td><td>Silent carrier</td><td>Normal or borderline indices</td></tr>
<tr><td>−−/αα or −α/−α</td><td>α-thalassaemia trait</td><td>Microcytosis, normal HbA<sub>2</sub>; diagnosed by DNA analysis. The cis form (−−/αα) is common in Southeast Asia and matters for the risk of hydrops in offspring</td></tr>
<tr><td>−−/−α</td><td>HbH disease</td><td>Moderate haemolytic anaemia; β<sub>4</sub> tetramers (HbH) seen as "golf ball" inclusions on brilliant cresyl blue staining</td></tr>
<tr><td>−−/−−</td><td>Hb Bart's hydrops fetalis</td><td>γ<sub>4</sub> tetramers; usually fatal in utero</td></tr>
</tbody></table></div>
<h3>β-thalassaemia</h3>
<p>Usually point mutations of the β gene on chromosome 11, reducing (β<sup>+</sup>) or abolishing (β<sup>0</sup>) output. Excess α chains precipitate in erythroblasts and cause ineffective erythropoiesis.</p>
<ul>
<li><b>Trait:</b> microcytosis with a normal or raised RBC count, mild or no anaemia, and HbA<sub>2</sub> above 3.5% (often 4% to 6%). HbF is normal or slightly raised.</li>
<li><b>Thalassaemia major:</b> transfusion-dependent from the first year of life; HbA absent (β<sup>0</sup>/β<sup>0</sup>) or very low, mostly HbF. Extramedullary haematopoiesis, bone deformity and iron overload.</li>
<li><b>Thalassaemia intermedia (non-transfusion-dependent):</b> a clinical label for milder genotypes.</li>
</ul>
<p><b>Pitfall:</b> coexisting iron deficiency lowers HbA<sub>2</sub> and can mask β-thalassaemia trait. Correct the iron and repeat if the result does not fit.</p>
<h3>Screening indices</h3>
<p>The Mentzer index (MCV ÷ RBC count) is below 13 in thalassaemia trait and above 13 in iron deficiency more often than not. It is a quick triage tool, not a diagnosis. The calculator in the workups section includes it.</p>
<h3>Sickle cell disease and other variants</h3>
<ul>
<li><b>HbS:</b> β6 glutamic acid to valine. Deoxygenated HbS polymerises and the cells sickle. Sickle cell anaemia (HbSS) and compound states (HbSC, HbS/β-thalassaemia) cause vaso-occlusion, haemolysis and hyposplenism. Sickle cell trait (HbAS) has about 35% to 40% HbS and is usually harmless.</li>
<li><b>HbC:</b> β6 glutamic acid to lysine. Target cells and intracellular crystals.</li>
<li><b>HbE:</b> common in Southeast Asia; microcytosis; HbE/β-thalassaemia can be severe.</li>
<li><b>Unstable haemoglobins and high-affinity variants:</b> Heinz body haemolysis and erythrocytosis respectively.</li>
</ul>
<h3>Laboratory methods</h3>
<ul>
<li><b>HPLC or capillary electrophoresis:</b> first-line, quantifying HbA<sub>2</sub>, HbF and most variants by retention time or migration.</li>
<li><b>Sickle solubility test:</b> detects HbS but cannot tell trait from disease. It is unreliable in infants under about 6 months because of high HbF.</li>
<li><b>Confirmation:</b> a second method (for example, electrophoresis at acid pH), family studies and DNA analysis, which is essential for α-thalassaemia and for prenatal diagnosis.</li>
</ul>
`,
  points: [
    "α genes: 4 (chromosome 16). HbH disease = 3 deleted; Bart's hydrops = 4 deleted",
    "β-thal trait: microcytosis, normal or high RBC, HbA2 over 3.5%",
    "Iron deficiency can mask β-thal trait by lowering HbA2",
    "Mentzer index under 13 suggests thalassaemia trait (screening only)",
    "HbS: β6 Glu→Val; HbC: β6 Glu→Lys",
    "HPLC or capillary electrophoresis first; DNA analysis for α-thalassaemia"
  ]
},
{
  id: "acquired-haemolysis",
  title: "Immune and acquired haemolytic anaemias",
  minutes: 15,
  sources: ["imh", "hof", "dl"],
  video: "autoimmune hemolytic anemia direct antiglobulin test warm cold PNH flow cytometry",
  body: `
<h3>The direct antiglobulin test (DAT)</h3>
<p>The DAT detects IgG or complement (C3d) already bound to the patient's red cells, using anti-human globulin. A monospecific DAT tells you which is present, and that points to the type of immune haemolysis. A positive DAT is not proof of haemolysis: it occurs in up to about 1 in 1000 healthy blood donors and in many hospital patients. Conversely, a few cases of AIHA are DAT-negative by standard methods.</p>
<h3>Warm autoimmune haemolytic anaemia</h3>
<p>IgG antibodies, active at 37°C, usually with broad specificity within the Rh system. DAT is positive for IgG, with or without C3d. Spherocytes are typical, with extravascular haemolysis in the spleen. Half of cases are secondary: CLL and other lymphomas, SLE and other autoimmune diseases, drugs, and immunodeficiency.</p>
<h3>Cold agglutinin disease</h3>
<p>IgM antibodies, usually anti-I, active below body temperature. They fix complement, so the DAT is positive for C3d only. Red cells agglutinate on the film and in the tube, which causes the spurious indices covered in Module 1. Primary cold agglutinin disease is a clonal B cell disorder; secondary cold agglutinins follow Mycoplasma pneumoniae (anti-I) or EBV infection (anti-i), or accompany lymphoma.</p>
<h3>Paroxysmal cold haemoglobinuria</h3>
<p>The Donath–Landsteiner antibody is a biphasic IgG with anti-P specificity: it binds in the cold and lyses with complement on warming. It is seen mainly in children after viral infections, with acute intravascular haemolysis.</p>
<h3>Alloimmune and drug-induced haemolysis</h3>
<p>Alloimmune causes are haemolytic transfusion reactions and haemolytic disease of the fetus and newborn. Drug-induced haemolysis occurs by drug adsorption (penicillin), immune complex formation (ceftriaxone) or true autoantibody induction (methyldopa).</p>
<h3>Microangiopathic haemolytic anaemia (MAHA)</h3>
<p>Red cell fragmentation (schistocytes) with thrombocytopenia. A fragment count above 1% is significant in adults (ICSH). Causes include:</p>
<ul>
<li><b>TTP:</b> ADAMTS13 activity below 10%, usually from an acquired autoantibody. A medical emergency; the PLASMIC score estimates the probability while the assay is pending.</li>
<li><b>Haemolytic uraemic syndrome:</b> Shiga toxin-producing E. coli; atypical HUS from complement dysregulation.</li>
<li><b>Other causes:</b> DIC, HELLP and pre-eclampsia, malignant hypertension, disseminated cancer, and certain drugs.</li>
</ul>
<p>Mechanical haemolysis without thrombocytopenia occurs with prosthetic heart valves and in march haemoglobinuria.</p>
<h3>Paroxysmal nocturnal haemoglobinuria (PNH)</h3>
<p>An acquired PIGA mutation in a haematopoietic stem cell stops GPI-anchor synthesis, so the complement regulators CD55 and CD59 are lost. The results are complement-mediated intravascular haemolysis, thrombosis in unusual sites (hepatic, cerebral and mesenteric veins), and an association with aplastic anaemia.</p>
<p>Diagnosis is by high-sensitivity flow cytometry: FLAER (which binds GPI anchors) with CD24 on neutrophils and CD14 on monocytes, and CD59 on red cells (type I, II and III cells). Measure the clone on white cells, because red cell clones are underestimated after haemolysis or transfusion.</p>
<h3>Other acquired causes</h3>
<p>Malaria, Clostridium perfringens sepsis, babesiosis, severe burns, snake venoms, Wilson disease, and spur cell anaemia in advanced liver disease.</p>
`,
  points: [
    "Warm AIHA: IgG, DAT IgG ± C3d, spherocytes; often secondary to CLL or SLE",
    "Cold agglutinin disease: IgM anti-I, DAT C3d only, agglutination",
    "PCH: biphasic IgG anti-P (Donath–Landsteiner), children after viral illness",
    "MAHA: schistocytes over 1% plus thrombocytopenia; check ADAMTS13 for TTP",
    "PNH: PIGA mutation, loss of CD55/CD59; diagnose with FLAER on neutrophils and monocytes",
    "A positive DAT alone does not prove haemolysis"
  ]
},
{
  id: "marrow-failure",
  title: "Marrow failure, sideroblastic and congenital anaemias",
  minutes: 12,
  sources: ["bmp", "hof", "bmd"],
  video: "aplastic anemia Camitta criteria pure red cell aplasia parvovirus sideroblastic anemia",
  body: `
<h3>Aplastic anaemia</h3>
<p>Pancytopenia with a hypocellular marrow, without infiltration or fibrosis. Most acquired cases are immune-mediated destruction of stem cells by T cells. Other causes include drugs (chloramphenicol, gold, anticonvulsants), benzene, viral hepatitis (seronegative), pregnancy and radiation.</p>
<p><b>Severity (Camitta criteria):</b> severe aplastic anaemia needs marrow cellularity below 25% (or 25% to 50% with under 30% residual haematopoietic cells) plus two of: neutrophils below 0.5 × 10<sup>9</sup>/L, platelets below 20 × 10<sup>9</sup>/L, and reticulocytes below 20 × 10<sup>9</sup>/L. Very severe disease has neutrophils below 0.2 × 10<sup>9</sup>/L.</p>
<p>The workup has three aims: exclude hypocellular MDS, look for small PNH clones (present in up to half of patients), and screen for inherited marrow failure.</p>
<h3>Inherited marrow failure syndromes</h3>
<ul>
<li><b>Fanconi anaemia:</b> DNA repair defect; short stature, radial ray and skin abnormalities; diagnosed by increased chromosome breakage with diepoxybutane (DEB) or mitomycin C. High risk of AML and squamous cancers.</li>
<li><b>Telomere biology disorders (dyskeratosis congenita):</b> nail dystrophy, leukoplakia, reticulate pigmentation; very short telomeres on flow-FISH.</li>
<li><b>Shwachman–Diamond syndrome:</b> neutropenia with exocrine pancreatic insufficiency.</li>
<li><b>Diamond–Blackfan anaemia:</b> isolated red cell aplasia in infancy, ribosomal protein genes, raised red cell adenosine deaminase, often macrocytosis and raised HbF.</li>
</ul>
<h3>Pure red cell aplasia</h3>
<p>Anaemia with reticulocytes near zero and absent erythroid precursors in an otherwise normal marrow. Parvovirus B19 infects erythroid progenitors through the P antigen: giant pronormoblasts with nuclear inclusions are characteristic, and in people with chronic haemolysis it causes an aplastic crisis. Other causes are thymoma, large granular lymphocyte leukaemia, autoimmune disease, drugs, and anti-EPO antibodies.</p>
<h3>Sideroblastic anaemias</h3>
<p>Defective haem synthesis leaves iron in erythroblast mitochondria, which appear as ring sideroblasts on a Perls stain.</p>
<ul>
<li><b>Hereditary:</b> X-linked ALAS2 mutations (often pyridoxine-responsive), SLC25A38 and others. Usually microcytic.</li>
<li><b>Acquired:</b> MDS with SF3B1 mutation (macrocytic; covered in Module 3), alcohol, isoniazid, lead, copper deficiency (often from excess zinc, or after bariatric surgery).</li>
</ul>
<p>The film is often dimorphic, with a mixed population of normal and hypochromic cells. Pappenheimer bodies may be seen.</p>
<h3>Congenital dyserythropoietic anaemias</h3>
<p>Rare inherited disorders of ineffective erythropoiesis with distinctive erythroblast morphology. The commonest, CDA II (SEC23B mutation), shows binucleate late erythroblasts; it was formerly called HEMPAS after its positive acidified serum test.</p>
<h3>Anaemia of chronic kidney disease</h3>
<p>Mainly inadequate EPO production, with a contribution from inflammation and hepcidin. Normocytic and normochromic, sometimes with echinocytes (burr cells).</p>
`,
  points: [
    "Severe AA: cellularity under 25% plus two of neutrophils under 0.5, platelets under 20, retics under 20 × 10⁹/L",
    "Always look for PNH clones and inherited marrow failure in aplastic anaemia",
    "Fanconi anaemia: DEB chromosome breakage test",
    "Parvovirus B19: giant pronormoblasts; aplastic crisis in chronic haemolysis",
    "Ring sideroblasts: ALAS2 (X-linked), alcohol, isoniazid, lead, copper deficiency, MDS-SF3B1",
    "CDA II: binucleate erythroblasts, SEC23B"
  ]
}
];

/* Red cell morphology atlas. Drawn by rbc.js; "kind" selects the drawing. */
const M2_CELLS = [
{ id:"m2-normal", name:"Normal red cells", group:"Size and colour", kind:"normal",
  what:"Biconcave discs about the size of a small lymphocyte nucleus, with central pallor about one third of the diameter.",
  seen:"Normal blood. Use as the reference for every other picture.", tip:"Judge films in the thin part, where cells just touch." },
{ id:"m2-microhypo", name:"Microcytic hypochromic cells", group:"Size and colour", kind:"microhypo",
  what:"Small cells with enlarged central pallor, more than one third of the diameter. Often with pencil cells.",
  seen:"Iron deficiency, thalassaemia trait, anaemia of inflammation (late), hereditary sideroblastic anaemia.", tip:"Pencil cells and a high platelet count favour iron deficiency." },
{ id:"m2-macro", name:"Oval macrocytes", group:"Size and colour", kind:"macro",
  what:"Large oval cells, well filled with haemoglobin.", seen:"Megaloblastic anaemia (B12 or folate deficiency), drugs that impair DNA synthesis, MDS.", tip:"Round macrocytes point instead to alcohol, liver disease or reticulocytosis." },
{ id:"m2-poly", name:"Polychromasia", group:"Size and colour", kind:"poly",
  what:"Larger blue-grey cells without central pallor: reticulocytes on a Romanowsky stain.", seen:"Haemolysis, bleeding, response to haematinics.", tip:"Confirm with a reticulocyte count." },
{ id:"m2-dimorphic", name:"Dimorphic film", group:"Size and colour", kind:"dimorphic",
  what:"Two populations: normal cells and hypochromic microcytes.", seen:"Sideroblastic anaemia, treated iron deficiency, recent transfusion.", tip:"The RDW is high and the histogram may show two peaks." },
{ id:"m2-sphero", name:"Spherocytes", group:"Shape", kind:"sphero",
  what:"Small, dense, round cells without central pallor.", seen:"Hereditary spherocytosis, warm AIHA, ABO haemolytic disease of the newborn, burns, Clostridium sepsis.", tip:"Look in the thin area; cells in thick areas lose their pallor artefactually." },
{ id:"m2-target", name:"Target cells (codocytes)", group:"Shape", kind:"target",
  what:"A central dense spot within the pallor, like a bull's-eye. Excess membrane relative to volume.", seen:"Liver disease, haemoglobinopathies (HbC, thalassaemia, HbE), hyposplenism, iron deficiency (few).", tip:"Can be produced artefactually by slow drying in humid conditions." },
{ id:"m2-ellipto", name:"Elliptocytes", group:"Shape", kind:"ellipto",
  what:"Elongated cells with parallel sides, the long axis more than twice the short.", seen:"Hereditary elliptocytosis (most cells), iron deficiency, megaloblastic anaemia, myelofibrosis (some).", tip:"Under 5% can be normal." },
{ id:"m2-schisto", name:"Schistocytes (fragments)", group:"Shape", kind:"schisto",
  what:"Fragments with sharp angles and straight edges: helmet cells, triangles, keratocytes and microspherocytes.", seen:"Microangiopathy (TTP, HUS, DIC), prosthetic valves, severe burns.", tip:"Over 1% in adults is significant (ICSH). Report it urgently with thrombocytopenia." },
{ id:"m2-sickle", name:"Sickle cells (drepanocytes)", group:"Shape", kind:"sickle",
  what:"Crescent-shaped cells with pointed ends; also boat-shaped forms.", seen:"Sickle cell disease (HbSS, HbSC, HbS/β-thalassaemia).", tip:"Not seen in sickle trait under normal conditions." },
{ id:"m2-tear", name:"Teardrop cells (dacrocytes)", group:"Shape", kind:"tear",
  what:"Cells with a single tapering tail.", seen:"Primary myelofibrosis, marrow infiltration, thalassaemia, megaloblastic anaemia.", tip:"With a leucoerythroblastic film, suspect marrow infiltration or fibrosis." },
{ id:"m2-acantho", name:"Acanthocytes", group:"Shape", kind:"acantho",
  what:"Dense cells with a few irregular spicules of unequal length.", seen:"Severe liver disease (spur cell anaemia), abetalipoproteinaemia, McLeod phenotype, after splenectomy.", tip:"Compare echinocytes, whose spicules are many and regular." },
{ id:"m2-echino", name:"Echinocytes (burr or crenated cells)", group:"Shape", kind:"echino",
  what:"Many short, regular projections around the whole cell.", seen:"Storage artefact (most often), renal failure, PK deficiency, after splenectomy.", tip:"Check sample age first." },
{ id:"m2-stomato", name:"Stomatocytes", group:"Shape", kind:"stomato",
  what:"Cells with a slit-like or mouth-shaped central pallor.", seen:"Alcohol, liver disease, hereditary stomatocytosis, Southeast Asian ovalocytosis (stomatocytic ovalocytes).", tip:"A few are common as an artefact in thick areas." },
{ id:"m2-bite", name:"Bite cells (keratocytes)", group:"Shape", kind:"bite",
  what:"Cells with a semicircular bite removed from the edge, where splenic macrophages took out Heinz bodies.", seen:"G6PD deficiency in crisis, unstable haemoglobins, oxidant drugs (dapsone).", tip:"Look also for blister cells and irregularly contracted cells." },
{ id:"m2-blister", name:"Blister cells", group:"Shape", kind:"blister",
  what:"Haemoglobin pushed to one side, leaving an empty blister bounded by membrane.", seen:"Acute oxidant haemolysis, especially G6PD deficiency.", tip:"Very suggestive of G6PD deficiency in the right setting." },
{ id:"m2-hj", name:"Howell–Jolly bodies", group:"Inclusions", kind:"hj",
  what:"A single small, round, dense purple nuclear remnant, usually at the edge of the cell.", seen:"Hyposplenism and splenectomy, megaloblastic anaemia.", tip:"In an adult without a known cause, think of coeliac disease or sickle cell disease (autosplenectomy)." },
{ id:"m2-stipple", name:"Basophilic stippling", group:"Inclusions", kind:"stipple",
  what:"Fine or coarse blue dots spread through the cell: aggregated ribosomes.", seen:"Thalassaemia, lead poisoning, P5'N deficiency, dyserythropoiesis, megaloblastic anaemia.", tip:"Coarse stippling in microcytic anaemia: think lead or thalassaemia." },
{ id:"m2-pappen", name:"Pappenheimer bodies", group:"Inclusions", kind:"pappen",
  what:"Small clusters of purple granules near the periphery. They contain iron, so they stain with Perls (siderocytes).", seen:"Hyposplenism, sideroblastic anaemia, thalassaemia, MDS.", tip:"Confirm with a Perls stain if needed." },
{ id:"m2-hbh", name:"HbH inclusions", group:"Supravital stains", kind:"hbh", stain:"Brilliant cresyl blue",
  what:"Many fine, evenly spaced blue-green dots: the 'golf ball' appearance of precipitated β4 tetramers after incubation.", seen:"HbH disease; occasional cells in α-thalassaemia trait.", tip:"Needs 1 to 2 hours' incubation with the stain." },
{ id:"m2-heinz", name:"Heinz bodies", group:"Supravital stains", kind:"heinz", stain:"Methyl violet",
  what:"One or more round bodies of denatured haemoglobin attached to the membrane. Invisible on a routine stain.", seen:"G6PD deficiency after oxidant stress, unstable haemoglobins, after splenectomy.", tip:"Order a supravital stain if bite cells are seen." },
{ id:"m2-rouleaux", name:"Rouleaux", group:"Arrangement", kind:"rouleaux",
  what:"Red cells stacked like piles of coins in the thin part of the film.", seen:"Raised plasma proteins: myeloma and other paraproteins, chronic inflammation, pregnancy.", tip:"Matches a raised ESR. Distinguish from agglutination, which forms irregular clumps." },
{ id:"m2-agglut", name:"Red cell agglutination", group:"Arrangement", kind:"agglut",
  what:"Irregular three-dimensional clumps of red cells.", seen:"Cold agglutinins (cold agglutinin disease, Mycoplasma, EBV), sometimes warm AIHA.", tip:"Causes a falsely low RBC count with high MCV and MCHC." },
{ id:"m2-malaria", name:"Plasmodium falciparum rings", group:"Parasites", kind:"malaria",
  what:"Small delicate rings with one or two chromatin dots; several per cell and appliqué forms at the edge. Infected cells are not enlarged.", seen:"Falciparum malaria. Count parasitaemia; over 2% in a non-immune patient is a warning sign.", tip:"Thick films for detection, thin films for species and parasitaemia." }
];

/* Drawn with Module 1's engine (drawCell), so they keep the same style. */
const M2_NUCLEATED = [
{ id:"m2-hyperseg", name:"Hypersegmented neutrophil", group:"White cell clues", sizeUm:15,
  what:"A neutrophil with 6 or more lobes, or 5% or more of neutrophils with 5 lobes.", seen:"Megaloblastic anaemia (early and specific clue), uraemia, iron deficiency (occasionally).", tip:"Count 100 neutrophils before calling it.",
  draw:{ r:7.4, cyto:"#f1d8e2", nuc:{type:"lobes", n:6, lr:1.35, spread:4.3}, chrom:"clumped", gran:{color:"#c79bbd", n:120, s:0.13} } },
{ id:"m2-megaloblast", name:"Megaloblast", group:"Marrow", sizeUm:20,
  what:"A large erythroblast whose nucleus has open, sieve-like chromatin while the cytoplasm is already haemoglobinised: nuclear–cytoplasmic asynchrony.", seen:"B12 or folate deficiency, drugs that impair DNA synthesis.", tip:"Look for giant metamyelocytes in the same marrow.",
  draw:{ r:9.6, cyto:"#a993bf", nuc:{type:"round", r:5.6}, chrom:"fine", nucleoli:0 } },
{ id:"m2-giant-pronorm", name:"Giant pronormoblast", group:"Marrow", sizeUm:30,
  what:"A very large proerythroblast with a glassy nuclear inclusion and deeply blue cytoplasm.", seen:"Parvovirus B19 infection (aplastic crisis, pure red cell aplasia).", tip:"Few other erythroid cells are present.",
  draw:{ r:12, cyto:"#3a50a6", nuc:{type:"round", r:8}, chrom:"smooth", nucleoli:1, blebs:true, halo:true } },
{ id:"m2-ringsidero", name:"Ring sideroblast (Perls stain)", group:"Marrow", sizeUm:12, perls:true,
  what:"An erythroblast with 5 or more blue iron granules covering at least one third of the nuclear rim.", seen:"Sideroblastic anaemias: ALAS2, alcohol, isoniazid, lead, copper deficiency, MDS-SF3B1.", tip:"Count at least 100 erythroblasts and report the percentage." }
];

const M2_LESSON_CELLS = {
  "anaemia-approach": ["m2-normal", "m2-microhypo", "m2-macro", "m2-poly", "m2-sphero", "m2-schisto"],
  iron: ["m2-microhypo", "m2-normal", "m2-target", "m2-dimorphic"],
  megaloblastic: ["m2-macro", "m2-hyperseg", "m2-megaloblast", "m2-hj"],
  "haemolysis-membrane": ["m2-sphero", "m2-ellipto", "m2-stomato", "m2-poly"],
  enzymopathies: ["m2-bite", "m2-blister", "m2-heinz", "m2-echino", "m2-stipple"],
  haemoglobinopathies: ["m2-target", "m2-sickle", "m2-microhypo", "m2-hbh", "m2-stipple"],
  "acquired-haemolysis": ["m2-sphero", "m2-agglut", "m2-schisto", "m2-malaria"],
  "marrow-failure": ["m2-giant-pronorm", "m2-ringsidero", "m2-dimorphic", "m2-pappen", "m2-tear"]
};

const M2_FACTS = [
  ["What are the WHO haemoglobin cut-offs for anaemia?", "Men 130 g/L, non-pregnant women 120 g/L, pregnancy 110 g/L."],
  ["What does hepcidin do?", "It binds ferroportin and causes its degradation, blocking iron export from enterocytes and macrophages."],
  ["Which cytokine raises hepcidin in inflammation?", "IL-6."],
  ["Which hormone from erythroblasts suppresses hepcidin?", "Erythroferrone."],
  ["What ferritin is diagnostic of iron deficiency?", "Below 15 µg/L; many guidelines use below 30 µg/L."],
  ["Which gene is mutated in IRIDA?", "TMPRSS6 (matriptase-2), giving inappropriately high hepcidin."],
  ["Where is vitamin B12 absorbed?", "In the terminal ileum, bound to intrinsic factor, through the cubam receptor."],
  ["Which metabolite rises in B12 but not folate deficiency?", "Methylmalonic acid."],
  ["Define neutrophil hypersegmentation.", "5% or more of neutrophils with 5 lobes, or any neutrophil with 6 or more lobes."],
  ["Why replace B12 before folate?", "Folate alone can correct the anaemia but worsen B12 neuropathy (subacute combined degeneration)."],
  ["Which antibody test is most specific for pernicious anaemia?", "Intrinsic factor antibody (about 50% sensitive)."],
  ["Name the haemolysis markers.", "Raised reticulocytes, unconjugated bilirubin and LDH; low haptoglobin."],
  ["What is the preferred screening test for hereditary spherocytosis?", "The EMA binding test by flow cytometry (reduced fluorescence)."],
  ["Which protein is most often defective in hereditary spherocytosis?", "Ankyrin."],
  ["In which membrane disorder is splenectomy contraindicated?", "Hereditary stomatocytosis and xerocytosis, because of thrombosis risk."],
  ["How is G6PD deficiency inherited?", "X-linked."],
  ["Why can a G6PD assay be falsely normal after a crisis?", "Young red cells and reticulocytes have higher enzyme activity. Repeat about 3 months later."],
  ["Name four drugs to avoid in G6PD deficiency.", "Primaquine (and tafenoquine), dapsone, rasburicase, nitrofurantoin; also sulfonamides and methylene blue."],
  ["Why do patients with PK deficiency tolerate anaemia well?", "2,3-BPG accumulates and right-shifts the oxygen dissociation curve."],
  ["What causes prominent basophilic stippling?", "Lead poisoning, P5'N deficiency, thalassaemia, dyserythropoiesis."],
  ["What α-globin genotype gives HbH disease?", "Three genes deleted: −−/−α."],
  ["What HbA2 level suggests β-thalassaemia trait?", "Above 3.5% (often 4% to 6%)."],
  ["What can mask β-thalassaemia trait?", "Coexisting iron deficiency, which lowers HbA2."],
  ["What is the Mentzer index?", "MCV ÷ RBC count. Under 13 suggests thalassaemia trait, over 13 iron deficiency (screening only)."],
  ["What is the mutation in HbS?", "β6 glutamic acid to valine."],
  ["What is the mutation in HbC?", "β6 glutamic acid to lysine."],
  ["What does the sickle solubility test miss?", "It cannot tell trait from disease, and is unreliable under about 6 months of age."],
  ["What is the DAT pattern in warm AIHA?", "IgG, with or without C3d."],
  ["What is the DAT pattern in cold agglutinin disease?", "C3d only."],
  ["What is the Donath–Landsteiner antibody?", "A biphasic IgG with anti-P specificity, causing paroxysmal cold haemoglobinuria."],
  ["What fragment count is significant in adults?", "Over 1% of red cells (ICSH)."],
  ["What ADAMTS13 level supports TTP?", "Below 10% activity."],
  ["What is the defect in PNH?", "An acquired PIGA mutation; no GPI anchors, so CD55 and CD59 are lost."],
  ["How is PNH best diagnosed?", "High-sensitivity flow cytometry with FLAER on neutrophils and monocytes."],
  ["What are the Camitta criteria for severe aplastic anaemia?", "Cellularity under 25% plus two of: neutrophils under 0.5, platelets under 20, reticulocytes under 20 × 10⁹/L."],
  ["Which test diagnoses Fanconi anaemia?", "Chromosome breakage with diepoxybutane (DEB) or mitomycin C."],
  ["What marrow cell suggests parvovirus B19?", "The giant pronormoblast."],
  ["Name causes of acquired sideroblastic anaemia.", "Alcohol, isoniazid, lead, copper deficiency (zinc excess), MDS with SF3B1 mutation."],
  ["Which gene causes X-linked sideroblastic anaemia?", "ALAS2."],
  ["Which CDA shows binucleate erythroblasts?", "CDA II (SEC23B), formerly HEMPAS."]
];

const M2_QUIZ = [
{ q:"A 34-year-old woman has Hb 98 g/L, MCV 68 fL, RBC 4.2 × 10¹²/L, RDW 18%, platelets 480 × 10⁹/L and ferritin 6 µg/L. What is the diagnosis?", a:["β-thalassaemia trait","Iron deficiency anaemia","Anaemia of inflammation","Sideroblastic anaemia"], c:1,
  e:"A very low ferritin is diagnostic. The high RDW, low RBC count and reactive thrombocytosis all fit." },
{ q:"Hb 128 g/L, MCV 62 fL, RBC 6.1 × 10¹²/L, RDW 13.5%, ferritin 85 µg/L. What is the most useful next test?", a:["Serum iron","Haemoglobin HPLC with HbA2 measurement","Bone marrow aspirate","Vitamin B12 level"], c:1,
  e:"Marked microcytosis with a high RBC count, normal RDW and normal ferritin suggest thalassaemia trait. The Mentzer index is about 10. HPLC quantifies HbA2." },
{ q:"Which result best distinguishes iron deficiency from anaemia of inflammation?", a:["Low serum iron","Low transferrin saturation","Raised soluble transferrin receptor","Microcytosis"], c:2,
  e:"Serum iron and transferrin saturation fall in both. Soluble transferrin receptor rises with iron-deficient erythropoiesis but stays normal in inflammation." },
{ q:"A patient with megaloblastic anaemia has a raised methylmalonic acid and raised homocysteine. What is the deficiency?", a:["Folate","Vitamin B12","Iron","Vitamin B6"], c:1,
  e:"Methylmalonic acid rises only in B12 deficiency, because B12 is the cofactor for methylmalonyl-CoA mutase. Homocysteine rises in both." },
{ q:"Which finding on the film is the earliest and most specific clue to megaloblastic anaemia?", a:["Target cells","Hypersegmented neutrophils","Spherocytes","Rouleaux"], c:1,
  e:"Hypersegmented neutrophils can appear before macrocytosis or anaemia." },
{ q:"A child has anaemia, splenomegaly, spherocytes, MCHC 368 g/L and a negative DAT. Which test is preferred to confirm the diagnosis?", a:["Osmotic fragility","EMA binding by flow cytometry","Haemoglobin electrophoresis","G6PD assay"], c:1,
  e:"EMA binding has high sensitivity and specificity for hereditary spherocytosis and is the preferred screening test. The negative DAT excludes immune spherocytosis." },
{ q:"Two days after starting primaquine, a man develops dark urine and anaemia. The film shows bite and blister cells. His G6PD assay is normal. What next?", a:["G6PD deficiency is excluded","Repeat the G6PD assay about 3 months after recovery","Request an EMA binding test","Start corticosteroids"], c:1,
  e:"After acute haemolysis, the surviving young red cells have more G6PD, which can give a falsely normal result." },
{ q:"Hb 92 g/L, MCV 64 fL, HbA2 2.4%, normal ferritin, and golf-ball inclusions on brilliant cresyl blue. What is the diagnosis?", a:["β-thalassaemia trait","HbH disease","Iron deficiency","Sickle cell trait"], c:1,
  e:"HbH inclusions (β4 tetramers) in a microcytic anaemia with normal or low HbA2 mean HbH disease: 3 of 4 α genes deleted." },
{ q:"A woman with iron deficiency anaemia has HbA2 3.2%. Her partner has β-thalassaemia trait. What is the best advice?", a:["She does not carry β-thalassaemia","Repeat HbA2 after iron is replaced","Request a bone marrow","No further testing needed"], c:1,
  e:"Iron deficiency lowers HbA2 and can mask β-thalassaemia trait. This matters for reproductive counselling." },
{ q:"A sickle solubility test is positive. Which statement is correct?", a:["The patient has sickle cell disease","The patient has sickle cell trait","HbS is present, but trait cannot be told from disease","The test is diagnostic in newborns"], c:2,
  e:"A positive solubility test means HbS is present. HPLC or electrophoresis quantifies it and separates trait (about 35–40% HbS) from disease." },
{ q:"Haemolytic anaemia with spherocytes and a DAT positive for IgG and C3d, in a 70-year-old with lymphocytosis. What is the most likely underlying cause?", a:["Mycoplasma infection","Chronic lymphocytic leukaemia","PNH","Hereditary spherocytosis"], c:1,
  e:"Warm AIHA is a well-known complication of CLL. Hereditary spherocytosis is DAT-negative." },
{ q:"A DAT positive for C3d only, red cell agglutination on the film and acrocyanosis in winter. What is the antibody?", a:["Warm IgG","IgM cold agglutinin, usually anti-I","Biphasic IgG anti-P","IgA"], c:1,
  e:"Cold agglutinins are IgM and fix complement, so only C3d stays on the cells at 37°C." },
{ q:"Thrombocytopenia 18 × 10⁹/L, schistocytes 4%, LDH 1900 U/L, mild confusion and normal clotting times. What is the urgent test?", a:["Bone marrow aspirate","ADAMTS13 activity, while starting plasma exchange","EMA binding","Coombs crossmatch only"], c:1,
  e:"This is suspected TTP. Treatment must not wait for the result. ADAMTS13 below 10% confirms it." },
{ q:"Which test is preferred to diagnose PNH?", a:["Ham's acidified serum test","Sucrose lysis test","Flow cytometry with FLAER on neutrophils and monocytes","CD59 on red cells only"], c:2,
  e:"High-sensitivity flow cytometry of white cells is the standard. Red cell clones are underestimated after haemolysis or transfusion." },
{ q:"A child with hereditary spherocytosis suddenly becomes very pale. Hb 45 g/L and reticulocytes 0.1%. What is the most likely cause?", a:["Hyperhaemolytic crisis","Parvovirus B19 aplastic crisis","Splenic sequestration","Folate excess"], c:1,
  e:"Parvovirus B19 halts erythropoiesis. With a shortened red cell lifespan, haemoglobin falls fast, and reticulocytes are absent." },
{ q:"Which marrow finding defines a ring sideroblast?", a:["Any erythroblast with iron granules","5 or more granules covering one third or more of the nuclear rim","Iron in macrophages","Granules covering the whole cytoplasm"], c:1,
  e:"This is the WHO and ICSH definition. Normal sideroblasts have a few scattered granules." },
{ q:"Pancytopenia, marrow cellularity 10%, neutrophils 0.15 × 10⁹/L, platelets 8 × 10⁹/L, reticulocytes 12 × 10⁹/L. How is it classified?", a:["Non-severe aplastic anaemia","Severe aplastic anaemia","Very severe aplastic anaemia","Hypocellular MDS by definition"], c:2,
  e:"Severe criteria are met, and neutrophils below 0.2 × 10⁹/L make it very severe." },
{ q:"A young man with microcytic anaemia, abdominal pain and coarse basophilic stippling works in battery recycling. What is the most likely diagnosis?", a:["Iron deficiency","Lead poisoning","β-thalassaemia trait","Hereditary spherocytosis"], c:1,
  e:"Lead inhibits ALA dehydratase, ferrochelatase and P5'N, giving stippling and sometimes ring sideroblasts." }
];

const M2_CASES = [
{
  id:"m2-micro", title:"Microcytosis in a pregnant woman", tag:"Microcytic anaemia",
  stem:"A 26-year-old woman at 12 weeks of pregnancy has a routine blood count. Her partner's family is from Cyprus.",
  data:[["Hb","104 g/L"],["MCV","66 fL"],["MCH","20 pg"],["RBC","5.4 × 10¹²/L"],["RDW","13.8%"],["Ferritin","64 µg/L"]],
  steps:[
    { q:"What is the most likely cause of the microcytosis?", opts:["Iron deficiency","Thalassaemia trait","Anaemia of inflammation","Lead poisoning"], c:1,
      fb:"Marked microcytosis with a high RBC count, normal RDW and normal ferritin points to thalassaemia trait. Mentzer index: 66 ÷ 5.4 ≈ 12." },
    { q:"HPLC shows HbA2 5.1% and HbF 1.2%. What does this mean?", opts:["α-thalassaemia trait","β-thalassaemia trait","Normal result","HbE trait"], c:1,
      fb:"HbA2 above 3.5% confirms β-thalassaemia trait." },
    { q:"What is the most important next step?", opts:["Start iron","Test the partner urgently","Transfuse","Repeat in 6 months"], c:1,
      fb:"If the partner is also a carrier, the fetus has a 1 in 4 risk of β-thalassaemia major. Offer prenatal diagnosis early." }
  ],
  teach:["Microcytosis with a normal ferritin needs haemoglobin studies","Antenatal screening is time-critical: test the partner straight away","Do not give iron empirically to thalassaemia carriers who are iron-replete"]
},
{
  id:"m2-macro", title:"Tired with tingling feet", tag:"Macrocytic anaemia",
  stem:"A 62-year-old woman has 4 months of fatigue and pins and needles in both feet. She has hypothyroidism.",
  data:[["Hb","78 g/L"],["MCV","121 fL"],["WBC","3.1 × 10⁹/L"],["Platelets","96 × 10⁹/L"],["Retics","22 × 10⁹/L"],["LDH","2400 U/L"]],
  steps:[
    { q:"Which film finding would you most expect?", opts:["Target cells","Oval macrocytes and hypersegmented neutrophils","Spherocytes","Teardrop cells and nucleated red cells only"], c:1,
      fb:"Megaloblastic anaemia gives oval macrocytes and hypersegmented neutrophils. Pancytopenia and a very high LDH reflect ineffective haematopoiesis." },
    { q:"Serum B12 is low. Which test best supports pernicious anaemia?", opts:["Parietal cell antibody","Intrinsic factor antibody","Schilling test","Gastrin alone"], c:1,
      fb:"Intrinsic factor antibodies are highly specific. Parietal cell antibodies are sensitive but found in many older people without the disease." },
    { q:"How should she be treated?", opts:["Oral folic acid alone","Intramuscular hydroxocobalamin, with folate only once B12 is started","Blood transfusion only","Iron"], c:1,
      fb:"She has neurological symptoms, so start IM hydroxocobalamin promptly. Never give folate alone. Watch potassium and iron as the marrow recovers." }
  ],
  teach:["Autoimmune thyroid disease is associated with pernicious anaemia","Neurological symptoms can occur without anaemia","Reticulocytes peak at about day 5 to 7 after B12 treatment"]
},
{
  id:"m2-g6pd", title:"Dark urine after a bean meal", tag:"Haemolysis",
  stem:"A 7-year-old boy from Egypt is brought in with pallor, jaundice and cola-coloured urine, 2 days after eating fresh fava beans.",
  data:[["Hb","68 g/L"],["Retics","9%"],["Bilirubin","62 µmol/L (unconj.)"],["LDH","1650 U/L"],["Haptoglobin","Undetectable"],["DAT","Negative"]],
  steps:[
    { q:"Which film finding supports the likely diagnosis?", opts:["Spherocytes and agglutination","Bite cells, blister cells and irregularly contracted cells","Sickle cells","Rouleaux"], c:1,
      fb:"Oxidant haemolysis in G6PD deficiency produces bite and blister cells. Supravital staining shows Heinz bodies." },
    { q:"A G6PD screening test now is normal. How do you interpret it?", opts:["G6PD deficiency is excluded","May be falsely normal because of reticulocytosis; repeat after about 3 months","The diagnosis is hereditary spherocytosis","The test was done wrongly"], c:1,
      fb:"Young red cells carry more enzyme. Either repeat later or compare the result with the reticulocyte count." },
    { q:"What is the key long-term advice?", opts:["Daily iron","Avoid fava beans and oxidant drugs; carry a list","Splenectomy","Lifelong folic acid only"], c:1,
      fb:"Avoiding triggers prevents most episodes. Give the family a written list of unsafe drugs." }
  ],
  teach:["Haemolysis plus a negative DAT plus bite cells: think G6PD","X-linked: boys are most affected","Rasburicase and primaquine need G6PD testing first"]
},
{
  id:"m2-aiha", title:"Spherocytes in an older man", tag:"Immune haemolysis",
  stem:"A 71-year-old man presents with breathlessness and jaundice. He was told of 'a high white count' two years ago.",
  data:[["Hb","64 g/L"],["WBC","48 × 10⁹/L"],["Lymphocytes","44 × 10⁹/L"],["Retics","310 × 10⁹/L"],["Bilirubin","48 µmol/L"],["Film","Spherocytes, smear cells"]],
  steps:[
    { q:"What test do you request next?", opts:["EMA binding","Direct antiglobulin test","Hb electrophoresis","G6PD assay"], c:1,
      fb:"Spherocytes with haemolysis in an older adult with lymphocytosis point to warm AIHA. The DAT is the key test." },
    { q:"DAT: IgG positive, C3d weakly positive. What is the most likely underlying disease?", opts:["Mycoplasma infection","Chronic lymphocytic leukaemia","PNH","Hereditary spherocytosis"], c:1,
      fb:"Smear cells and a mature lymphocytosis suggest CLL, confirmed by flow cytometry (Module 3). AIHA occurs in about 5% to 10% of CLL." },
    { q:"What should the transfusion laboratory be told?", opts:["Nothing special","Autoantibody present: it may mask alloantibodies, so extended testing is needed before transfusion","Give group O negative blood only","Transfusion is contraindicated"], c:1,
      fb:"Panreactive autoantibodies make crossmatching harder. Adsorption studies exclude underlying alloantibodies. Do not withhold life-saving transfusion." }
  ],
  teach:["Warm AIHA: IgG ± C3d, spherocytes","Look for an underlying cause: CLL, lymphoma, SLE, drugs","Communicate early with the blood bank"]
},
{
  id:"m2-ttp", title:"Confusion and low platelets", tag:"Microangiopathy",
  stem:"A 38-year-old woman has 3 days of headache, purpura and new confusion. Blood pressure is normal.",
  data:[["Hb","82 g/L"],["Platelets","14 × 10⁹/L"],["Schistocytes","5%"],["LDH","1800 U/L"],["PT / APTT","Normal"],["Creatinine","118 µmol/L"]],
  steps:[
    { q:"What is the most likely diagnosis?", opts:["DIC","Immune thrombocytopenia","Thrombotic thrombocytopenic purpura","Evans syndrome"], c:2,
      fb:"MAHA with severe thrombocytopenia, neurological signs and normal clotting points to TTP. DIC would prolong the clotting times." },
    { q:"What do you do now?", opts:["Wait for ADAMTS13","Start plasma exchange urgently, after taking a sample for ADAMTS13","Transfuse platelets","Bone marrow biopsy"], c:1,
      fb:"Untreated TTP is often fatal. Take the sample before plasma exchange, but do not delay treatment. Avoid platelet transfusion unless bleeding is life-threatening." },
    { q:"ADAMTS13 activity is under 5% with an inhibitor. What does this confirm?", opts:["Congenital TTP","Immune (acquired) TTP","HUS","HELLP"], c:1,
      fb:"An anti-ADAMTS13 autoantibody defines immune TTP. Treatment adds steroids, rituximab and caplacizumab to plasma exchange." }
  ],
  teach:["Count schistocytes when thrombocytopenia and haemolysis coexist","TTP is a haematological emergency","The PLASMIC score helps while ADAMTS13 is pending"]
}
];

const M2_TREES = [
{ id:"anaemia", title:"Anaemia algorithm", intro:"Start with any anaemia. Each step uses a result you would have on the first day.",
  nodes:{
  start:{ q:"Reticulocyte response: is the absolute reticulocyte count raised (RPI 2 or more)?", opts:[["Yes, raised","hyper"],["No, low or normal","mcv"]] },
  hyper:{ q:"Is there evidence of bleeding?", opts:[["Yes","bleed"],["No","haemol"]] },
  bleed:{ end:"Blood loss with an appropriate marrow response", detail:"Find and stop the source. Iron deficiency will follow if bleeding continues." },
  haemol:{ end:"Probable haemolysis", detail:"Confirm with bilirubin, LDH and haptoglobin, then follow the haemolysis tree." },
  mcv:{ q:"What is the MCV?", opts:[["Under 83 fL","micro"],["83 to 101 fL","normo"],["Over 101 fL","macro"]] },
  micro:{ q:"What is the ferritin?", opts:[["Low (under 15–30 µg/L)","ida"],["Normal or high","micro2"]] },
  ida:{ end:"Iron deficiency anaemia", detail:"Find the cause: menstrual loss, GI loss (investigate men and postmenopausal women), malabsorption (coeliac), diet." },
  micro2:{ q:"Is there evidence of inflammation (high CRP, chronic disease) and a low TSAT?", opts:[["Yes","acd"],["No","thal"]] },
  acd:{ end:"Anaemia of inflammation (± iron deficiency)", detail:"A ferritin up to about 100 µg/L with TSAT under 20% can still hide iron deficiency. Soluble transferrin receptor helps." },
  thal:{ end:"Consider thalassaemia trait or sideroblastic anaemia", detail:"High RBC count and normal RDW favour thalassaemia: do HPLC. A dimorphic film or high ferritin: do a marrow with Perls stain." },
  normo:{ q:"Are other lineages abnormal, or is the film leucoerythroblastic?", opts:[["Yes","marrow"],["No","normo2"]] },
  marrow:{ end:"Marrow failure or infiltration", detail:"Bone marrow aspirate and trephine: aplastic anaemia, leukaemia, myeloma, metastases, fibrosis." },
  normo2:{ q:"Is there chronic kidney disease, inflammation or endocrine disease?", opts:[["Yes","secondary"],["No","mixed"]] },
  secondary:{ end:"Anaemia of CKD, inflammation or endocrine disease", detail:"Check eGFR, CRP, thyroid function. In CKD the anaemia reflects inadequate EPO." },
  mixed:{ end:"Look for early or mixed deficiency", detail:"A high RDW suggests mixed iron and B12 or folate deficiency. Check haematinics and the film. Consider pure red cell aplasia if retics are near zero." },
  macro:{ q:"Does the film show oval macrocytes and hypersegmented neutrophils?", opts:[["Yes","mega"],["No","nonmega"]] },
  mega:{ end:"Megaloblastic anaemia", detail:"B12 and folate (± MMA, holoTC), intrinsic factor antibodies. Check drugs. Give B12 before or with folate." },
  nonmega:{ end:"Non-megaloblastic macrocytosis", detail:"Alcohol, liver disease, hypothyroidism, drugs, reticulocytosis. If cytopenias or dysplasia are present: marrow for MDS." }
  }},
{ id:"haemolysis", title:"Haemolysis workup", intro:"Use once haemolysis is confirmed (raised reticulocytes, bilirubin and LDH; low haptoglobin).",
  nodes:{
  start:{ q:"Direct antiglobulin test result?", opts:[["Positive","dat"],["Negative","film"]] },
  dat:{ q:"Monospecific DAT pattern?", opts:[["IgG ± C3d","warm"],["C3d only","cold"]] },
  warm:{ end:"Warm AIHA (or drug-induced, alloimmune)", detail:"Spherocytes. Look for CLL, lymphoma, SLE, drugs. Check recent transfusion or pregnancy for alloimmune causes." },
  cold:{ q:"Is there red cell agglutination, or a high-titre cold agglutinin?", opts:[["Yes","cad"],["No, acute haemoglobinuria in a child","pch"]] },
  cad:{ end:"Cold agglutinin disease or syndrome", detail:"Primary (clonal B cell) or secondary to Mycoplasma, EBV or lymphoma. Warm samples before counting." },
  pch:{ end:"Consider paroxysmal cold haemoglobinuria", detail:"Do the Donath–Landsteiner test. Note that the DAT can be positive for C3d only." },
  film:{ q:"What dominates the film?", opts:[["Fragments with low platelets","maha"],["Spherocytes","hs"],["Bite or blister cells","g6pd"],["Sickle or target cells","hb"],["Little to see","other"]] },
  maha:{ end:"Microangiopathic haemolytic anaemia", detail:"Urgent: clotting screen, ADAMTS13 (TTP), renal function and stool culture (HUS), BP and pregnancy status." },
  hs:{ end:"Hereditary spherocytosis (DAT-negative spherocytes)", detail:"EMA binding test, family history. Exclude DAT-negative AIHA and burns or Clostridium sepsis in the right setting." },
  g6pd:{ end:"Oxidant haemolysis: probable G6PD deficiency", detail:"G6PD assay (may be falsely normal just after a crisis). Supravital stain for Heinz bodies; consider unstable haemoglobin." },
  hb:{ end:"Haemoglobinopathy", detail:"HPLC or capillary electrophoresis, sickle solubility test, family studies." },
  other:{ q:"Is there intravascular haemolysis, thrombosis or cytopenia?", opts:[["Yes","pnh"],["No","enz"]] },
  pnh:{ end:"Consider PNH", detail:"High-sensitivity flow cytometry: FLAER on neutrophils and monocytes, CD59 on red cells." },
  enz:{ end:"Consider PK deficiency or another enzymopathy", detail:"Red cell enzyme panel (PK, P5'N), membrane studies, and an NGS gene panel if unresolved." }
  }}
];

const M2_CHECKLIST = { title:"Reporting a red cell film", intro:"A systematic order for describing red cells on a blood film. Tick each step as you go.", steps:[
  ["Choose the right area", "The thin area where red cells just touch. Thick areas hide pallor; the feathered edge distorts shapes."],
  ["Size", "Compare with a small lymphocyte nucleus. Normocytic, microcytic, macrocytic, or dimorphic (two populations)."],
  ["Colour", "Normochromic or hypochromic. Polychromasia (reticulocytes). Spherocytes have no pallor."],
  ["Shape (poikilocytes)", "Name each type present and grade it: spherocytes, target cells, elliptocytes, fragments, sickle cells, teardrops, acanthocytes, echinocytes, stomatocytes, bite and blister cells."],
  ["Inclusions", "Howell–Jolly bodies, basophilic stippling, Pappenheimer bodies, parasites, nucleated red cells."],
  ["Arrangement", "Rouleaux or agglutination."],
  ["White cells and platelets", "Hypersegmented neutrophils, blasts, leucoerythroblastic picture, platelet number and size."],
  ["Conclusion", "One sentence with the most likely cause, and the tests that would confirm it (for example, ferritin, HPLC, DAT, EMA, G6PD)."]
]};
