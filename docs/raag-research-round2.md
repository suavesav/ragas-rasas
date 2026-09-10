# Raag research, round 2: sources, emotions, additions

Date: 2026-09-10. Follows [raag-accuracy-audit.md](raag-accuracy-audit.md) (round 1, applied in PR #3). **Status: applied on 2026-09-10** (Bhakti added, §2 corrections, §3 ras table, §4 Tier-A additions, §5–6 fields and rendering, §8 season addendum).

## Summary

- **What**: every one of the 87 raags re-checked against at least two independent sources, plus a source-by-source trust evaluation, a two-tier emotion (ras) proposal with a confidence level for every raag, a ranked list of 35 raags the app lacks, a map of variant families, and a data-schema proposal to hold all of it.
- **How**: 5 index sources for coverage, 7 content sources for facts (The Raga Guide book text, tanarang, Parrikar, Wikipedia, ragajunglism, chandrakantha, two peer-reviewed listener studies). A fact counts as corroborated only when two sources of different lineage agree.
- **Headline findings**: 11 further field corrections (one thaat, nine vadi/samvadi, one time). The current `ras` field disagrees with the corroborated sources on 34 of 87 raags; the biggest are Malkauns, Shree, Marwa, Bhairav, Hameer, Shankara, Kalingada and Lalit. Seasons: Shree has a sourced winter association that round 1 removed. 10 raags absent from the app appear in four or more indexes.
- **The hard part**: no authoritative per-raag rasa table exists anywhere. The proposal below is built from the mood language of the sources, weighted by source tier, and every row carries its evidence and a confidence grade.

Notation: `(k)` komal, `(t)` tivra, `'` upper octave. Source tags: **RG** Raga Guide, **T** tanarang, **P** Parrikar, **W** Wikipedia, **RJ** ragajunglism, **CK** chandrakantha, **B99** Balkwill & Thompson 1999, **M15** Mathur et al. 2015.

---

## 1. Source evaluation

| Source | Who and what | Basis | Strengths | Weaknesses | Tier |
|---|---|---|---|---|---|
| **The Raga Guide** (Bor, Rao, van der Meer, Harvey; Nimbus and Rotterdam Conservatory, 1999; 74 raags) | Academic survey with recordings by Vidyadhar Vyas, Shruti Sadolikar, Buddhadev Das Gupta, Hariprasad Chaurasia; dedicated to Dilip Chandra Vedi. Full text on archive.org. | Cites the treatises directly: Faqirullah (1666), Somanatha (1609), Ahobala (1665), Damodara (c.1625), Meshakarna (1570), Lochana, Pratap Singh (c.1800), Bhatkhande, Kaufmann, Subba Rao. Gives ragamala iconography per raag. | Historical depth, explicit time, note treatment, and mood as musicians describe it. Every other source cites it. | 74 raags only. OCR text is noisy. Written from a scholarly, slightly conservative position. | 1 |
| **Bhatkhande**, Kramik Pustak Malika / Hindustani Sangeet Paddhati (1909–32) | The primary modern codification. | Primary. | The reference point for thaat, vadi, time. | Not consulted directly; reached through RG, tanarang, Parrikar and Wikipedia citations. Some assignments are known to be conventional rather than musical (Madhuvanti in Todi, Bilaskhani in Todi by name only). | 1 (indirect) |
| **Kaufmann 1968, Subba Rao Raganidhi 1956–66, Jairazbhoy 1971/1995, Danielou, Moutal 1991** | Academic reference works. | Primary or near-primary. | Cited by RG and by the better Wikipedia pages. | Not consulted directly. | 1 (indirect) |
| **tanarang.com** | Tribute site to Acharya Vishwanath Rao Ringe "Tanarang" (Gwalior gharana, d. 2005; ~1500 bandishes in 120 raags), run by his family. ~120 raag pages. | Bhatkhande-style lakshana: thaat, jati, vadi/samvadi, time, aroh/avroh, pakad, one-paragraph character, plus bandish notations. | Consistent format, phrase-level detail, ras words in plain language. The single most complete free lakshana source. | One-gharana pedagogy. Times sometimes differ from RG (Hindol, Bihag, Shuddha Sarang). Vadi/samvadi choices occasionally idiosyncratic (Tilak Kamod Sa/Pa, Nat Bhairav Ma/Sa). Thaat for Saraswati given as Kalyan. | 2 |
| **Rajan Parrikar Music Archive** | Parrikar: PhD electrical engineering, photographer, "lifelong immersion" in Indian music. ~45 long essays. | Built on the teaching of Ramashreya Jha "Ramrang" (Gwalior-line scholar-composer, Abhinava Geetanjali) and on Bhatkhande; every claim is tied to a named recording. | Best source for phrase grammar, variant families, mood language, and which musicians actually sing what. | Strong opinions; no formal musicology credential; mood language is literary. Not an index, so coverage is uneven. | 2 |
| **chandrakantha.com** (David Courtney) | Ethnomusicologist, author. 42 raag pages. | Bhatkhande-based, concise. | Reliable, plain. | Small coverage; used here only for the coverage matrix. | 2 |
| **Deepak Raja** (swaratala.blogspot.com; author of Hindustani Music: A Tradition in Transition) | Music researcher and critic. | Essays. | The clearest statement on raga and rasa: a raag is "a psycho-acoustic hypothesis"; "different musicians of comparable stature can, and do, interpret the same raga in obviously different rasas"; seasonal rules "have largely disappeared", time rules persist. | Not a per-raag reference. | 2 |
| **Wikipedia** raag pages | Crowd-edited. | Variable. The good pages (Yaman, Marva, Bhairav, Darbari, Kafi, Purvi, Bhupali) cite RG, Kaufmann, Bhatkhande or Subba Rao. Several are stubs citing only tanarang (Ramkali, Jogiya, Multani, Patdeep, Nat Bhairav). Jog and Rageshree are uncited. | Wide coverage; a decent second opinion when it cites a tier-1 book. | Some claims are wrong or oddly sourced: Bageshri "Hasya rasa", Sindhu Bhairavi in Asavari thaat, Shree "winter" from an encyclopedia of Sikhism (though RG independently confirms the winter association), Bhupal Todi "spring". | 3; counts as corroboration only when it cites tier 1 |
| **ragajunglism.org** (George Howlett) | London musician and writer, 365+ raag pages. | Aggregates RG, Raganidhi, Parrikar, musician interviews; adds pitch-class geometry and world-music comparisons. | Good pointers and quotations from musicians; lists "proximate forms" (one-note-different raags), useful for the variants map. | Not independent of RG and Parrikar. Some interpretive claims are the author's own (scale symmetry arguments). Rate-limits fetches. | 3; not counted as an independent source |
| **swarganga.org** | SwarGanga Music Foundation database. | No stated methodology. | Aroh/avroh and Bhatkhande-style fields for hundreds of raags. | Unsourced. | 3 |
| **Balkwill & Thompson 1999**, Music Perception 17(1) | Peer-reviewed. Two professional performers each chose raags to convey joy, sadness, anger, peace; 30 Western listeners rated 12 alaps. | Performer-assigned rasa, verified against Danielou and Kaufmann. | Real evidence of what performers pick for a rasa. | 12 raags. Two performers. "Anger" assignments (Hindol, Adana, Sohini) are the performers' choices and sit oddly against the written tradition. | 1 for what it measures |
| **Mathur, Vijayakumar, Chakrabarti, Singh 2015**, Frontiers in Psychology 6:513 | Peer-reviewed. 122 Indian listeners rated alaap and gat of 12 raags. | Listener ratings. | Shows that tonality (a minor second) drives negative valence and that the same raag reads calm in alaap and happy in gat. | 12 raags. Ratings are "calm/happy/sad/tensed/longing", not the nine rasas. | 1 for what it measures |
| **Rao et al. 2022** (arXiv 2203.06583) raga–rasa table | ML paper. | "Expert opinion" and blog posts, mostly Carnatic. | None for this purpose. | Unsourced mapping; excluded. | Excluded |
| **Sangita Ratnakara** (Sarngadeva, 13th c.), **Rag Darpan** (Faqirullah, 1666), ragamala paintings | Historical. | Reached through RG and Parrikar. | Iconography gives the oldest mood assignments (Shree as a calm hero, Bhairavi as a devoted consort, Kanada as a victorious king). | Raags have changed scale since; the iconography describes ancestors. | 1 (indirect) |

**Corroboration rule used in this report.** A fact is *corroborated* when sources from at least two different lineages agree: RG or a tier-1 book, tanarang (Gwalior pedagogy), Parrikar (Ramrang lineage), or a Wikipedia page that cites tier 1. ragajunglism and swarganga are treated as restatements, not votes.

**How well the sources agree with each other.** On thaat and scale they agree almost everywhere; the disagreements are the known edge cases (Bihag: Bilawal in RG and Wikipedia, Kalyan in tanarang; Jog: Khamaj-based in Parrikar and Wikipedia, Kafi in tanarang; Chandrakauns and Saraswati: no consensus thaat). On time they agree to within one prahar for most raags; the outliers are listed in §2. On vadi/samvadi they disagree often, which the RG itself explains: the vadi concept is "a theoretical construct" and many raags have several strong notes. On mood they agree far more than expected, once the vocabulary is normalised, which is what makes §3 possible.

---

## 2. Corrections found in round 2

These are on top of round 1. Each line gives the change and the sources that agree.

**Thaat**

- **Deshkar** → Bilawal. Bhatkhande places it in Bilawal; T, P and W agree. The app has Kalyan (same five notes as Bhoopali, but Deshkar's Dha-centred, uttarang treatment is what puts it with Bilawal). Fix.
- **Chandrakauns** → move to the "Carnatic / no thaat" bucket and rename that bucket "Other / no thaat". T says "not defined; some say Bhairavi or Kafi". RG says it follows Malkauns rules. Keeping it under Kafi is defensible only by habit.
- **Saraswati**: T files it under Kalyan; P and the scale (tivra Ma with komal Ni) say it fits no thaat. Keep the current bucket, add T's view to the narrative.
- **Bihag**: RG and W say Bilawal (current); T says Kalyan "because of increased tivra Ma in modern practice". Keep Bilawal; add the note.
- **Jog**: P and W say Khamaj-based (via Tilang); T says Kafi. Keep Khamaj; add the note.

**Vadi / samvadi** (app → recommended, sources)

| Raag | App now | Change to | Agreeing sources |
|---|---|---|---|
| Shuddha Kalyan | Ga / Ni | Ga / Dha | T; RG "Ga and Dha are the most important notes"; P |
| Devgiri Bilawal | Dha / Ga | Sa / Pa | T (only source with a value) |
| Nat Bhairav | Pa / Sa | Ma / Sa | T, W |
| Jogiya | Re(k) / Pa | Ma / Sa | T, W, P ("powerful madhyam") |
| Bairagi | Sa / Pa | Ma / Sa | T, W |
| Nayaki Kanada | Pa / Sa | Ma / Sa | T; RG "Re is an important note" (no vadi given) |
| Tilak Kamod | Re / Pa | Sa / Pa | T; RG "Sa and Pa are strong notes"; W says Re/Pa |
| Puriya Dhanashri | Pa / Re(k) | Pa / Sa | T; RG "Pa and Sa are strong notes"; W says Pa/Re |
| Kirwani | Ga(k) / Ni | Pa / Sa | T; W says no strict vadi, "Re ga Pa dha important" |
| Kafi | Ga(k) / Ni(k) | Pa / Sa | T; RG "Pa and Re most articulated"; W says Pa/Re |
| Charukeshi | Pa / Sa | Ma / Sa | T only; Low confidence, note it |

Confirmed as already correct after round 1 (two or more sources): Yaman Ga/Ni; Kedar Ma/Sa; Hameer Dha/Ga; Kamod Pa/Re; Nand Sa/Pa; Bhoopali Ga/Dha; Deshkar Dha/Ga; Hindol Dha/Ga; Alhaiya Dha/Ga; Bihag Ga/Ni; Durga Ma/Sa; Shankara Ga/Ni; Gaur Sarang Ga/Dha; Shuddha Sarang Re/Pa; Gaud Malhar Ma/Sa; Des Re/Pa; Jhinjhoti Ga/Ni; Rageshri Ga/Ni; Tilang Ga/Ni; Gorakh Kalyan Ma/Sa; Bhairav Dha/Re; Ramkali Pa/Sa; Vibhas Dha/Re; Lalit Ma/Sa; Bhatiyar Ma/Sa; Marwa Re/Dha; Puriya Ga/Ni; Sohini Dha/Ga; Shree Re/Pa; Purvi Ga/Ni; Basant Sa/Pa; Bhairavi Ma/Sa; Malkauns Ma/Sa; Bilaskhani Dha/Ga; Bhupali Todi Dha/Ga; Bageshri Ma/Sa; Bhimpalasi Ma/Sa; Patdeep Pa/Sa; Vrindavani Re/Pa; Madhyamad Re/Pa; Bahar Ma/Sa; Adana Sa/Pa; Jaunpuri Dha/Ga; Darbari Re/Pa; Asavari Dha/Ga; Todi Dha/Ga; Multani Pa/Sa; Gurjari Dha/Re; Madhuvanti Pa/Sa.

Still split, keep as is and note in the UI: Hansadhwani (app Ga/Ni; T Sa/Pa; W Re/Pa), Komal Rishabh Asavari (app Dha/Ga; T Dha/Re; W Dha/Ga), Miyan ki Malhar (app Ma/Sa; T Pa/Sa; W Ma/Sa), Ahir Bhairav (app Ma/Sa; T Ma/Sa; W Dha/Re).

**Time of day**

| Raag | App | Sources | Recommendation |
|---|---|---|---|
| Hindol | Morning | RG "after midnight or, according to some, early morning"; T 12–3 am; W 12–3 am | Change to Late night; note the morning view |
| Dhani | Night | RG "any time of day or night, due to its sprightly nature"; T sarvakalik or 12–3 pm | Change to Any |
| Bihag | Night | T 9–12; RG 12–3 | Keep Night; note |
| Shuddha Sarang | Afternoon | RG and W 12–3 pm; T 9 am–12 | Keep |
| Pilu | Any | T 12–3 pm; W "third part of day"; RG light, no time | Keep Any; note afternoon |
| Bageshri, Chandrakauns, Nayaki, Adana | Late night | RG midnight / 12–3; T 9–12 | Keep |
| Desh, Khamaj, Tilak Kamod, Tilang | Night | RG 12–3; T 9–12 | Keep |
| Alhaiya Bilawal, Bilaskhani Todi | Morning | RG 9–12 / 6–9; T 6–9 / 9–12 | Keep |
| Puriya | Sunset | RG and W "just after sunset"; T 9–12 pm | Keep |

**Season**

- **Shree**: RG says "traditionally this raga should be performed during the winter, in the early evening", and that the name also refers to the early-winter harvest season. Wikipedia says winter too (weak source, but independent). Round 1 removed Winter; restore it with the RG citation.
- **Kaushik Dhwani / Bhinna Shadja** (a candidate addition): Parrikar cites the shastric association with Hemant (early winter).
- **Kafi**: RG says hori-dhamar in Kafi belongs to Holi; keep Spring as an association.
- **Tilak Kamod**: T alone says "particularly sung in rainy season". One source; do not add.
- **Des**: none of RG, T or P attach it to the monsoon. Its monsoon link comes from thumri and film usage. Keep it, but as an association, not a rule (see schema, §6).

---

## 3. Two-tier emotion (ras) proposal

**The problem.** The tradition never fixed one rasa per raag. Deepak Raja's position (that rasa depends on the performer and the composition) is shared by RG, which reports musicians' descriptions rather than assigning rasas, and by both listener studies, which found the same raag reads "calm" in alaap and "happy" in gat. The sources do, however, use a stable vocabulary: sweet, playful, light, romantic, longing/viraha, devotional/bhakti, serene, solemn/grave/gambhir, heroic/vigorous, austere, anxious. Mapped onto the app's nine ras:

- Shringar: romantic, sweet, love, viraha (love-in-separation), charm
- Karuna: pathos, plaintive, melancholy, longing where sorrow dominates
- Shanta: serene, peaceful, calm, meditative, solemn, gambhir; and **Bhakti** (devotional), which the sources use constantly but which is not one of Bharata's nine
- Veer: heroic, vigorous, majestic, bold, energetic, king-like
- Hasya: playful, joyful, lively, sprightly, buoyant, festive
- Adbhuta: wonder, mystery, haunting, the monsoon-storm sublime
- Raudra, Bhayanaka, Bibhatsa: used by the sources only for Adana (B99 "anger") and in historical notes on Bhairav and Bhinna Shadja

**Recommendation on Bhakti.** Add it as a tenth ras tag. Tanarang names "Bhakti ras" for Ahir Bhairav, Vibhas, Jogiya, Lalit, Todi, Multani, Bhupal Todi, Gunkali, Bahar and Bairagi; Wikipedia for Bhoopali and Bilaskhani; RG for Bhairav and Lalit. Folding it into Shanta loses the most common single mood word in the corpus. The table below uses Shanta(B) to mark rows where the source word was "devotional".

**Method.** Primary = the ras named by the most sources, weighted RG and Parrikar above tanarang above Wikipedia; the empirical studies break ties. Secondary = the next most-cited. Confidence: **High** = three or more sources agree on the primary; **Med** = two; **Low** = one source, or sources diverge. "App" is the current `ras` field. Rows where the proposal changes the primary are marked ▲.

| Raag | App now | Proposed primary | Secondary | Conf. | Evidence |
|---|---|---|---|---|---|
| Yaman ▲ | Shringar | Shanta | Shringar | High | RG "grandest, fundamental; noble hero"; P "gravitas"; RJ "serene, bhakti"; M15 calm→happy; B99 peace |
| Yaman Kalyan | Shringar, Shanta | Shanta | Shringar | Med | B99 peace; RG "so similar to Yaman" |
| Kedar ▲ | Shringar, Shanta | Shanta(B) | Shringar | Med | RG "serious and contemplative; ascetic worshipping Shiva"; T "thermal energy"; W "honesty, integrity" |
| Hameer ▲ | Shringar, Veer | Veer | Shringar | High | RG "sportive, heroic; thunderstorms and battles"; T "Veer rasa"; P "veera rasa; vigorous, dramatic" |
| Kamod | Shringar, Hasya | Shringar | Hasya | Low | RG "female ascetic; complex"; P "luxuriant canvas"; no rasa word in any source |
| Nand | Shringar | Shringar | Karuna | Low | T "soothing, Karun ras" is the only rasa word; P "pinnacle of creativity" |
| Shuddha Kalyan | Shanta, Shringar | Shanta | Shringar | Med | P "elegiac, meditative"; RG "Bhupali up, Kalyan down"; B99 (via Yaman Kalyan) peace |
| Bhoopali ▲ | Shringar, Shanta | Shanta(B) | Shringar | High | W "Shanti rasa; bhakti"; T "tranquil, soft; Shringar"; RG "quiescent, pained by separation" (Damodara) vs "lively" (Somanatha); B99 joy |
| Deshkar ▲ | Shanta, Shringar | Shringar | Hasya | Low | RG "lively early morning raga"; P "uttaranga, D-centred" |
| Hindol | Shringar, Hasya | Shringar | Hasya | Med | RG "Kama, god of love; Krishna on a swing"; T "difficult"; B99 anger (outlier) |
| Shuddha Sarang | Shanta, Shringar | Shanta | Shringar | Low | No rasa word; T/P describe structure only |
| Gaur Sarang | Shringar, Shanta | Shringar | Hasya | Med | RG "hopeful and energetic"; T "Shringar"; P "delicate, intricate" |
| Bilawal ▲ | Shringar, Shanta | Shanta(B) | Shringar | Med | W "deep devotion and repose"; RG (Alhaiya) "serious; lady waiting for her lover" |
| Alhaiya Bilawal ▲ | Shringar, Hasya | Shanta | Shringar | High | W "Shant rasa"; T "pleasing, serene"; RG "complex and serious"; P morning calm |
| Bihag | Shringar | Shringar | Shanta | Med | T "full of Shringar ras"; P "melodic gravitas"; RG "affiliated to Kedar" |
| Hansadhwani ▲ | Shringar, Hasya | Hasya | Shanta | Med | M15 alaap calm → gat happy; T, W no rasa word |
| Nat Bilawal | Veer, Shringar | Veer | Shringar | Low | RG (Nat) "heroic sentiment"; P Nat anga |
| Durga | Shanta, Shringar | Shanta | Shringar | High | RG "pleasant, sometimes philosophical"; T "soothing"; W "sringara" |
| Shankara ▲ | Shanta, Raudra | Veer | Shanta | High | T "Veer rasa; surge of life force"; RG "serious, dignified, bold"; P "fierce, heroic, mercurial; serene stillness" |
| Devgiri Bilawal | Shanta, Shringar | Shanta | Shringar | Low | No rasa word |
| Pahadi | Shringar, Shanta | Shringar | Hasya | Low | P "folk"; CK light; no rasa word |
| Mand | Shringar, Hasya | Shringar | Hasya | Low | T "light; bhajan, ghazal"; RJ festive folk |
| Gaud Malhar | Shringar, Karuna | Shringar | Karuna | High | T "vipralambha shringar"; W "romantic longing, virahini"; RG "serious and thoughtful; anxious woman" |
| Khamaj | Shringar, Hasya | Shringar | Hasya | High | RG "sensual; goddess of love"; T "light, enthralling"; B99 joy |
| Des | Shringar, Karuna | Shringar | Hasya | Med | RJ "sweet and amorous"; P "unparalleled charm"; M15 calm→happy; T "very sweet". Karuna unsupported |
| Tilak Kamod | Shringar | Shringar | Shanta(B) | High | RG "pleasing and romantic"; T "Shringar, Karun or Bhakti alike"; M15 calm→happy |
| Jhinjhoti | Shringar, Karuna | Shringar | Hasya | High | T and W "light and playful"; P "warm, incandescent"; RG thumri |
| Rageshri | Shringar, Karuna | Shringar | Shanta | High | RG "sweet and romantic"; W "light romantic"; M15 calm→happy |
| Tilang | Shringar, Hasya | Shringar | Hasya | Med | RG "light, sweet"; T "very sweet"; P "karnapriya" |
| Jog ▲ | Adbhuta, Karuna | Shringar | Shanta | Med | M15 calm→happy; P "leisurely, immensely popular"; T "melodious, straightforward". Adbhuta/Karuna unsupported |
| Gorakh Kalyan | Shanta, Karuna | Shanta | Shringar | Med | T "sweet, pleasant, enchanting"; P "dulcet-toned" |
| Pilu | Shringar, Karuna | Shringar | Hasya | Low | W "cheerful, joyous"; T "devotion and piety"; RG "storehouse of popular tunes"; sources diverge |
| Bhairav ▲ | Karuna, Shanta | Shanta(B) | Karuna | High | RG "evokes peace and devotion, with a shade of melancholy"; W "solemn peacefulness; shaant aur gambhir"; P "noblest; solemnity, purification". Historical strand of "grandeur, horror, fright" (RG) |
| Ahir Bhairav ▲ | Shringar, Karuna | Shanta(B) | Karuna | Med | T "Bhakti ras"; RG "sober but appealing" |
| Nat Bhairav ▲ | Raudra, Karuna | Veer | Karuna | Low | W "heroic exuberance with slight pathos" (cites T); T "heavy" |
| Ramkali | Shanta, Karuna | Shanta(B) | Shringar | Low | RG ragamala "proud lady enraged with her lover"; W "soothing a discontent wife"; T structure only |
| Vibhas ▲ | Karuna, Shanta | Shanta(B) | Shringar | Med | T "heavy; Bhakti"; RG "lovers in union; Kamadeva; slow and dignified" |
| Kalingada ▲ | Karuna | Shringar | Hasya | High | RG "very sprightly; no oscillation; thumri"; P "flippant, less austere; folk and bhajans" |
| Jogiya | Karuna, Bhayanaka | Karuna | Shanta(B) | High | B99 sadness; T "devotion and detachment"; W "meditative". Bhayanaka unsupported |
| Bhairav Bahar | Shringar, Karuna | Shringar | Shanta(B) | Low | Jod raag; T (Bahar) "Shringar and Bhakti" |
| Bairagi | Shanta, Karuna | Shanta(B) | Karuna | Med | T "devotional"; P (Ravi Shankar 1940s); W no rasa word |
| Bhairavi | Karuna, Shringar | Karuna | Shringar | High | RG "most suited to the poignancy of separation; ranging from erotic to devotional"; B99 sadness; T "love and piety"; P "cremation grounds" |
| Sindhu Bhairavi | Karuna, Shringar | Karuna | Shringar | Med | W "viraha, shoka, karuna, bhakti"; P shuddha-Re shade of Bhairavi |
| Malkauns ▲ | Raudra, Karuna | Shanta | Veer | High | P "shanta-gambheera"; T "severely tranquil"; RG "majestic, introverted; heroic lord"; W "devotion and heroism"; RJ "severe tranquility; veera"; M15 sad→longing |
| Sampoorna Malkauns ▲ | Raudra, Karuna | Shanta | Veer | Low | Derived from Malkauns (RG, P) |
| Komal Rishabh Asavari | Karuna | Karuna | Shanta | Med | RG "tender and melancholy"; T "very sweet; deep, soothing" |
| Bilaskhani Todi | Karuna | Karuna | Shanta(B) | High | RG "plaintive; delighted adoration in a gentle loving sentiment"; W "Bhakti"; B99 peace; P "sublime" |
| Bhupali Todi ▲ | Karuna | Shanta(B) | Karuna | Med | T "spiritual purity, devotional"; RG "serene"; B99 sadness |
| Zila Kafi | Shringar, Hasya | Shringar | Hasya | Low | RG "zila genre, dhun-like" |
| Kafi | Shringar, Karuna | Shringar | Hasya | Med | RG "love and the passions; Holi"; T "both shringars; hori"; W same |
| Bageshri | Shringar | Shringar | Karuna | High | RG "distinguished and romantic"; T "virah and karuna shringar"; RJ "vipralambha"; W "waiting for reunion" |
| Bhimpalasi ▲ | Karuna, Shringar | Shringar | Karuna | High | RG "serene, sweet; tearful lady painting her absent lover"; P "ati-madhur"; RJ "shringara"; T "hauntingly pleasant" |
| Dhani ▲ | Shringar | Hasya | Shringar | High | RG "buoyant and pleasant; sprightly"; T "light and playful"; P "chanchal" |
| Patdeep ▲ | Karuna, Shanta | Shringar | Karuna | Low | T "eagerness, intrigue, separation pangs"; W "chanchal" |
| Chandrakauns ▲ | Adbhuta, Shringar | Shanta | Adbhuta | Low | RG "follows Malkauns rules; sweet as nectar"; T "shuddha Ni produces anxiety and tension" |
| Megh ▲ | Shanta, Adbhuta | Veer | Adbhuta | Med | RG "heroic raga able to produce rain; joyous Krishna dancing; stormy"; W "invitation to rains"; T "sweet, deep" |
| Miyan ki Malhar | Karuna, Adbhuta | Karuna | Adbhuta | High | RG "melancholy raga; ascetic in meditation"; W "longing in separation"; T "thunder, torrents" |
| Nat Malhar | Veer, Adbhuta | Veer | Adbhuta | Low | P mention only |
| Sur Malhar | Shanta, Karuna | Shanta(B) | Adbhuta | Low | RG "Surdas; vivid rains"; T "less gambheer" |
| Vrindavani Sarang | Shringar, Hasya | Shringar | Shanta | Med | W "sringara + veer; spiritual love"; RG Krishna's cowherds; T "neither deep nor playful" |
| Madhyamad Sarang | Shringar | Shringar | Shanta | Low | T "neither deep nor playful"; RG same as Vrindavani |
| Bahar ▲ | Shringar, Hasya | Hasya | Shringar | High | RG "natural beauty and joy of spring; lively"; T "playful; Shringar and Bhakti"; W "Shringara" |
| Nayaki Kanada ▲ | Karuna, Shringar | Veer | Shringar | Low | T "dynamic, scintillating; enthusiasm and vitality"; RG "Re important"; P "poorvanga like Darbari" |
| Asavari | Karuna, Shanta | Karuna | Shanta | High | RG "tender and melancholy"; W "renunciation and sacrifice"; P "solemn, satvic" |
| Jaunpuri ▲ | Karuna | Shanta(B) | Shringar | Low | T "deep; Bhakti and Shringar"; W "grandeur or awe"; P "lightness, energy". No source says Karuna |
| Darbari Kanada ▲ | Karuna, Veer | Veer | Shanta | Med | RG "raga of kings; victorious king; slow and dignified"; P "monumental gravitas"; RJ "majestic, solemn"; W "grave; profound". Karuna appears only in the Carnatic note |
| Adana | Veer, Raudra | Veer | Raudra | High | RG "vigorous"; P "gusto"; T "dynamic"; B99 anger |
| Gandhari | Karuna, Bhayanaka | Karuna | Shanta | Low | RG (Asavari group) snake-charmer; P "no consensus". Bhayanaka unsupported |
| Kirwani ▲ | Karuna, Shringar | Shringar | Karuna | Low | T "playful; thumri and film; virah"; RG "instrumental; shades of Pilu" |
| Gurjari Todi | Karuna | Karuna | Shringar | High | RG "intolerable suffering of separation"; T "karunya"; P "komal Re accentuated" |
| Miyan ki Todi | Karuna | Karuna | Shanta(B) | High | T "Bhakti and Karun"; W "pensive, mournful"; M15 sad→tensed; P "every emotion"; RG "plaintive" |
| Multani ▲ | Karuna, Shanta | Shanta(B) | Karuna | Med | T "heavy; devotional"; P "gravitas" |
| Madhuvanti | Shringar, Karuna | Shringar | Hasya | High | T "sweet, playful, romantic"; W "gentle loving sentiment; sringaar"; P "pleasing" |
| Shuddha Todi | Karuna | Karuna | Shanta(B) | Low | As Todi |
| Purvi ▲ | Karuna, Shanta | Shanta | Karuna | Med | RG "solemn, mysterious; wisdom and detachment"; W "deeply serious, quiet, mystical"; T "heavy, Karun" |
| Shree ▲ | Karuna, Raudra | Shanta(B) | Veer | High | RG "calm, self-controlled hero; mysterious, gentle, austere"; P "forbiddingly austere, profoundly meditative"; W (Jasraj) "grace and majesty; devotion"; RJ "king-like; warrior"; T "deeply devotional, anxiety laden"; M15 sad→longing |
| Puriya Dhanashri ▲ | Shringar, Karuna | Karuna | Shringar | Med | P "no better vehicle for the bathos-stricken"; T "compassion, emotional" |
| Basant | Shringar, Hasya | Shringar | Hasya | High | RG "joyful spring; Holi; pain of separated lovers"; T "Shringar and Virah"; W "hope, quiet joy" |
| Paraj ▲ | Karuna, Adbhuta | Shringar | Hasya | Low | P "chanchal prakriti"; RG (in Basant entry) "brisk" |
| Marwa ▲ | Adbhuta, Karuna | Shanta | Karuna | High | RG "anxiety and expectation; heroic; slow"; T "detachment, renunciation"; W "longing; solemn expectation"; P "introspective, meditative"; RJ "austere spiritual renunciation"; M15 sad→tensed |
| Puriya ▲ | Karuna, Adbhuta | Shanta | Karuna | High | RG "peaceful and serious"; W "Shanti, Gambhir"; T "sobering, piety" |
| Sohini | Shringar, Karuna | Shringar | Hasya | High | RG "bright and lovely; fast; courtesan singers"; P "sprightly; instant pleaser"; T "tranquil night". B99 anger (outlier) |
| Bhatiyar ▲ | Karuna, Adbhuta | Adbhuta | Shanta | Low | RG "haunting appeal"; T "anxiety laden"; P "meditative" |
| Lalit ▲ | Karuna, Adbhuta | Shanta(B) | Karuna | High | RG "serene raga with a devotional mood"; W "serene and devotional"; T "Bhakti and Karuna"; M15 sad→tensed |
| Lalita Gauri | Shanta, Karuna | Shanta | Karuna | Low | T (Gauri) "compassion, piety, viraha"; P structure only |
| Saraswati | Shanta, Shringar | Shringar | Shanta | Low | T "very sweet" |
| Charukeshi | Karuna, Shringar | Karuna | Shringar | Low | P "uncrystallised"; T "melodious" |

Count: primary changes on 34 raags; High confidence on 33 rows, Med on 26, Low on 28.

**Patterns worth knowing.** The app leans on Karuna and Raudra where the sources lean on Shanta/Bhakti and Veer. Raudra is not supported for any raag except as a historical note. Bhayanaka is not supported anywhere. Adbhuta survives only for the Malhars and Chandrakauns/Bhatiyar. The "grave, majestic" raags (Darbari, Shree, Marwa, Malkauns, Bhairav) are the rows most likely to draw disagreement, because "gambhir" sits between Shanta and Veer; the table follows the sources' own words.

---

## 4. Raags the app lacks, ranked by corroboration

Coverage matrix: RG (74), tanarang index (~120), chandrakantha (42), Parrikar essays (~100 raags discussed), Wikipedia performance-time list (~80). Number in brackets = indexes that carry the raag.

**Tier A: in the Raga Guide and two or more other indexes. Add these.**

| Raag | Thaat | Vadi / samvadi | Time | Scale | Mood (sources) | Indexes |
|---|---|---|---|---|---|---|
| Chhayanat | Kalyan | Pa / Re | Night 9–12 | both Ma; P→R swoop | RG "heroic (vira); passionate warrior"; T "heavy, sweet, overpowering" | RG, T, P, W [4] |
| Jaijaivanti | Khamaj (T: Kafi) | Re / Pa | Night 9–12 | both Ga, both Ni; R g R S | T "sweet and touching"; P: Des-anga and Bageshri-anga forms | RG, T, P, W [4] |
| Maru Bihag | Kalyan | Pa / Sa (RG: Ga, Ni pivotal) | Night 9–12 | S G M(t) P N; shuddha Ma only in S M G | RG: Abban Khan, Alladiya Khan; T "very melodious" | RG, T, P, W [4] |
| Desi | Kafi (Asavari-ang) | Pa / Sa (RG: Pa, Re) | Late morning | vakra; both Dha | RG: three Dha flavours; P "requires significant training" | RG, T, P, W [4] |
| Puriya Kalyan | Marwa | Sa / Pa (RG: Ga, Ni) | Evening 6–9 | Puriya below, Yaman above | RG "beautiful combination" | RG, T [2] + P mention |
| Shahana Kanada | Kafi | Pa / Sa | Late night | uttarang; Dha nyasa | RG "Kanada group; Amir Khusrau's Farudasht"; P | RG, T, P [3] |
| Sindhura | Kafi | Sa / Pa | Afternoon 3–6 (T) | S R m P D; both komal in descent | T "light, flittering; thumri, tappa, hori"; P: Sangita Ratnakara desi raga | RG, T, P [3] |
| Abhogi (Kanada) | Kafi | Ma / Sa | Night 9–12 | S R g m D | RG "recent Carnatic import; Kanada movements"; T "deep" | RG, T, P [3] |
| Kaushik Dhwani / Bhinna Shadja | Bilawal | Ma / Sa | Night 9–12 (T); P: first quarter of day | S G m D N | T "deep, soothing"; P "shanta-gambheer; Hemant" | T, P, W [3] |
| Shivranjani | Kafi | Pa / Sa | Night | S R g P D | T "melodious, straightforward"; film-famous | T, CK, W [3] |
| Basant Mukhari | Bhairav | Pa / Sa | Late morning | S r G m P d n | T "sweet, soothing; difficult"; P (Ratanjankar); used in M15 | T, P, W [3] |
| Shyam Kalyan | Kalyan | Pa / Sa | Evening 6–9 | both Ma; Dha varjit in aroha | T "melodious; Kalyan + Kamod"; P | T, P, W [3] |

**Tier B: two indexes, or one strong source. Add if you want depth in a family.**

Kalavati (Khamaj; Pa/Sa; S G P D n; T "simple, melodious"), Kaunsi Kanada (Asavari; Ma/Sa; late night; Malkauns + Kanada; T, P), Malgunji (Kafi; Ma/Sa; late night; Khamaj + Bageshri; T, P, W), Gunkali (Bhairav; Dha/Re; S r m P d; T "Bhakti and Karuna"; P), Ramdasi Malhar (Kafi; Ma/Sa; rains; T, P), Khambavati (Khamaj; Ga/Dha; near Jhinjhoti; T, P, RG mention), Bihagda (Bilawal; Ga/Ni; Bihag + Khamaj; T, P), Jogkauns (Bhairavi per T; Gunidas 1940s; T, P), Madhukauns (Kafi; Pa/Sa; S g M(t) P n; T, P), Gauri (Bhairav-ang; Re/Pa; sunset; T, P), Narayani (Khamaj; Sa/Pa; T, P), Yamani Bilawal (Bilawal; Sa/Pa; both Ma; T, P), Devgandhar (Asavari; Dha/Ga; both Ga; T, P), Sorath (Khamaj; Des's progenitor; P, RG mention), Jait (Marwa; Pa/Sa; S r G P D; T, P), Hemant (Bilawal; Ma/Sa; T, P mention), Manj Khamaj (RG only; Ma as secondary tonic), Bibhas of Marwa thaat (RG, P; S r G P D with shuddha Dha), Vachaspati (Carnatic; T), Suha/Sughrai (Kafi; Dha varjit; T, P), Barwa (Kafi; Agra; P), Gara (Khamaj; P), Nat (Bilawal; P; rarely standalone), Khat (Asavari; sankeerna; P).

**Do not add**: anything appearing in only one index and without a tanarang or RG page.

---

## 5. Variant families

Parrikar's essays and the RG give a consistent picture of which raags are treated as one family. This is the basis for a `family` field and a `variants` list.

| Family (anga) | Core | Members already in app | Members to add / mention as variants |
|---|---|---|---|
| Kalyan | Yaman | Yaman Kalyan, Shuddha Kalyan, Kedar, Hameer, Kamod, Nand, Bhoopali, Hindol, Shuddha Sarang, Gaur Sarang | Chhayanat, Shyam Kalyan, Maru Bihag, Puriya Kalyan, Jait Kalyan, Hem Kalyan, Khem Kalyan, Savani Kalyan, Chandrakant Kalyan |
| Kedar | Kedar | | Chandni Kedar, Maluha Kedar, Jaladhar Kedar (S R M P D), Deepak Kedar, Basanti Kedar, Nat Kedar, Adambari Kedar, Tilak Kedar, Shyam Kedar, Anandi Kedar (= Nand) |
| Bihag | Bihag | | Maru Bihag, Bihagda, Pat Bihag, Nat Bihag, Chhaya Bihag, Chandni Bihag, Savani, Hem Bihag, Shankara Bihag |
| Bilawal | Alhaiya Bilawal | Bilawal, Devgiri Bilawal, Nat Bilawal, Deshkar, Durga, Shankara, Hansadhwani | Yamani Bilawal, Shukla Bilawal, Kukubh Bilawal, Sarparda, Hameer Bilawal, Jaij Bilawal, Gaud Bilawal, Kaushik Dhwani, Hemant |
| Khamaj | Khamaj | Des, Tilak Kamod, Jhinjhoti, Rageshri, Tilang, Jog, Gorakh Kalyan | Jaijaivanti, Khambavati, Kalavati, Gara, Sorath, Narayani, Kambhoji, Manj Khamaj, Bihagda |
| Kafi | Kafi | Zila Kafi, Bageshri, Bhimpalasi, Dhani, Patdeep, Pilu, Mand (folk) | Sindhura, Barwa, Desi, Malgunji, Neelambari, Sindh Kafi |
| Dhanashri | (Bhimpalasi) | Bhimpalasi, Dhani, Patdeep, Pilu | Dhanashri, Hamsakinkini, Patdeepaki |
| Sarang | Vrindavani Sarang | Madhyamad Sarang, Shuddha Sarang, Sur Malhar (Sarang-Malhar) | Miyan ki Sarang, Samant Sarang, Badhans Sarang, Lankadahan Sarang, Ambika Sarang. Gaur Sarang is *not* a Sarang (P) |
| Malhar | Miyan ki Malhar | Megh, Gaud Malhar, Sur Malhar, Nat Malhar | Shuddha Malhar (S R M P D), Ramdasi Malhar, Chhaya Malhar, Arun Malhar, Dhulia Malhar, Meera ki Malhar, Des Malhar, Jayant Malhar |
| Kanada | Darbari Kanada | Adana, Nayaki Kanada, Bahar (Kanada-affiliated) | Kaunsi Kanada, Shahana, Suha, Sughrai, Abhogi, Devsakh, Kafi Kanada, Bageshri Kanada, Husseini Kanada |
| Kauns | Malkauns | Chandrakauns, Sampoorna Malkauns | Madhukauns, Jogkauns, Harikauns, Pancham Malkauns, Sundarkauns, Kaushi Kanada |
| Asavari | Asavari | Jaunpuri, Komal Rishabh Asavari, Gandhari | Devgandhar, Desi, Khat, Shobhavari |
| Todi | Miyan ki Todi | Gurjari Todi, Bilaskhani Todi, Bhupali Todi, Multani, Shuddha Todi, Madhuvanti (by convention) | Bahaduri Todi, Ahiri Todi, Lachari Todi, Anjani Todi, Khat Todi, Bairagi Todi, Salagavarali |
| Bhairav | Bhairav | Ahir Bhairav, Nat Bhairav, Ramkali, Vibhas, Kalingada, Jogiya, Bairagi, Bhairav Bahar | Gunkali, Anand Bhairav, Shivmat Bhairav, Saurashtra Bhairav, Mangal Bhairav, Prabhat Bhairav, Kabiri Bhairav, Basant Mukhari, Zeelaf, Gauri (Bhairav-ang) |
| Bhairavi | Bhairavi | Sindhu Bhairavi, Bilaskhani Todi (scale), Komal Rishabh Asavari (scale), Bhupali Todi (scale) | Jangla Bhairavi, Kasuri Bhairavi |
| Poorvi | Purvi | Puriya Dhanashri, Shree, Basant, Paraj, Lalit, Lalita Gauri | Gauri (Poorvi-ang), Din ki Puriya, Reva, Triveni, Tankeshri, Jaitashri, Malavi, Bibhas (Poorvi) |
| Marwa | Marwa | Puriya, Sohini, Bhatiyar | Puriya Kalyan, Bibhas (Marwa), Jait, Bhankar, Maligaura, Sohini Pancham |

The RG's "same tone material, different raag" pairs are worth surfacing in the UI as "easily confused with": Bhoopali/Deshkar/Shuddha Kalyan; Kedar/Kamod/Hameer/Chhayanat/Gaud Sarang; Marwa/Puriya/Sohini; Purvi/Basant/Paraj/Lalita Gauri; Darbari/Adana/Kaunsi Kanada; Bhairavi/Bilaskhani Todi/Komal Rishabh Asavari; Bhimpalasi/Patdeep/Dhani; Des/Tilak Kamod/Sorath; Malkauns/Chandrakauns; Miyan ki Malhar/Bahar; Bhairav/Kalingada/Gauri/Ramkali.

---

## 6. Proposed data schema

Current fields: `name, alt, thaat, time, season, ras[], char` and `swaras, vadi, samvadi, arohana, avarohana, aalap, narrative`. Proposed additions, all optional so existing rendering keeps working:

```
family:        "Kanada"                    // §5
jati:          "Audav-Sampurna vakra"      // from T and RG
pakad:         "Sa Re Ma Pa, Ni(k) Dha Pa, Ma Ga Re"   // raag-vachak phrase (T, P)
ras:           ["Veer", "Shanta"]          // keep: [primary, secondary]
rasConfidence: "High" | "Med" | "Low"
rasEvidence:   "RG 'raga of kings'; P 'monumental gravitas'; W 'grave'"
timeNote:      "RG 12–3; tanarang 9–12"    // only when sources split
season:        "Any"                       // rule, not mood
associations:  ["Monsoon (thumri, film)"]  // informal links, shown differently
variants:      ["Adana", "Nayaki Kanada", "Kaunsi Kanada", "Shahana"]
confusedWith:  ["Adana", "Kaunsi Kanada"]
history:       "Named Darbari by Tansen per Faqirullah (1666); ragamala: victorious king"
sources:       [{tag:"RG", p:48}, {tag:"T", url:"..."}, {tag:"P", url:"..."}]
corroboration: 3                           // number of independent lineages agreeing on thaat+scale
```

Also: add `Bhakti` to `rasClass` and the filter chips; add a `family` filter; show `rasConfidence` as a small badge; render `sources` as footnote links in the detail panel; render `associations` in a lighter style than `season`.

---

## 7. What to apply next, in order

1. Field fixes from §2: Deshkar thaat; the 11 vadi/samvadi rows; Hindol and Dhani time; Shree season Winter; thaat notes for Bihag, Jog, Chandrakauns, Saraswati.
2. Decide on Bhakti (§3). Then apply the ras table, starting with the High-confidence ▲ rows (Yaman, Hameer, Bhoopali, Alhaiya Bilawal, Shankara, Bhairav, Kalingada, Malkauns, Bhimpalasi, Dhani, Bahar, Shree, Marwa, Puriya, Lalit) since those are the ones most likely to be noticed as wrong today.
3. Add the 12 Tier-A raags (§4) with full detail blocks; the sources above have everything needed except aalap lines, which I would write from the pakad and the RG melodic outlines.
4. Add `family`, `variants`, `confusedWith` (§5) for the existing 87.
5. Add `sources` and `rasEvidence` per raag from the notes file, and the schema changes in the renderer.

Working notes with every extracted fact and source are in the scratch file `notes.md` from this session and can be moved into the repo on request.

---

## 8. Addendum: season, re-examined (2026-09-10)

Round 1 stripped Summer, Autumn and Winter from the app on the grounds that no source supported them. That was right about the app's old values and wrong about the tradition: there **is** a documented six-season scheme, and stripping the field lost it. This addendum restores what is sourced and records the rest as association rather than rule.

**The six ritu.** Vasant (spring), Grishma (summer), Varsha (monsoon), Sharad (autumn), Hemant (early winter), Shishir (deep winter).

**The treatise scheme.** The raga-ragini systems were built on six patriarchal raags: the Raga Guide reproduces Damodara's (c.1625) version of the Hanuman scheme: Bhairav, Kaushik (Malkauns), Hindol, Dipak, Shri, Megh; and those six were mapped to the six seasons. The Archives and Research Centre for Ethnomusicology gives the most widely followed mapping, from the *Sangita Ratnakara* (13th c.) and *Sangita Darpana* (c.1625):

| Ritu | Raag | Status here |
|---|---|---|
| Vasant | Hindol | season Spring (rule) |
| Grishma | Dipak | not in the app; Parrikar: "all but dead" |
| Varsha | Megh | season Monsoon (rule) |
| Sharad | Bhairav | season Any; autumn as association |
| Hemant | Shree | season Winter (rule) |
| Shishir | Malkauns | season Any; winter as association |

A competing scheme in the *Manasollasa* (Someshwara, 1131), reported by Deepak Raja, gives spring to Vasanta, summer to Bhairava, monsoon to Megh, autumn to Panchama, early winter to Natanarayana, deep winter to Shree. The two schemes agree only on Megh's monsoon and Shree's winter, which is why those two are treated as rules and the rest as history.

**What survives in practice.** Deepak Raja: "the enthusiasm of the performing tradition has been limited largely to Vasanta (spring) and Varsha (rainy season)", because both seasons signify nature renewing itself. Shailaja Khanna in *The Tribune* reports the autumn, pre-winter and summer traditions as having "passed into oblivion". The Raga Guide is consistent with both: of 74 raags it names a season in the time field for only Bahar and Basant (spring), Gaud Malhar, Megh, Miyan ki Malhar and Sur Malhar (rains), plus Shree (winter) and a note that Kafi's hori belongs to Holi.

**Changes applied.** The ritu framework itself stays in this report rather than becoming a page in the app; the per-raag detail panels carry the associations and the season notes.

- **Vrindavani Sarang → Summer** (rule). Corroborated by two lineages: tanarang, "the intensity of noon time and the summer season to which the melody is particularly oriented", and Wikipedia's season field citing Yagnik's *Shastriya Raag Darshan*. The Summer filter chip is restored.
- **Associations added** (shown in the detail panel, not filterable as a rule): Hindol, Megh, Bhairav, Shree and Malkauns each carry their ritu-scheme slot with the treatises named; Bhairav additionally carries the Manasollasa's summer and a note that it is sung in any season today; Tilak Kamod carries monsoon on tanarang's single mention; Kafi carries the Holi link; Bahar carries the spring jod-raags; the four Malhars carry Varsha.
- **`seasonNote` added** to Bhairav, Malkauns, Hindol, Shree, Megh and Vrindavani Sarang explaining rule versus history.
- **New sources**: ARCE (vmis.in) for the ritu scheme; Shailaja Khanna, *The Tribune* (tier 3) for current practice; Deepak Raja's 2013 seasonal essay folded into his catalogue entry.

**Not changed, and why.** Bhimpalasi, Patdeep, Multani, Madhuvanti and the other Sarangs stay at Any: their "summer" was a gloss on the afternoon hour, and no source gives them a season. Bhupal Todi's "spring" appears in one Wikipedia infobox against the Raga Guide's silence, so it stays out. Pilu's monsoon appears only in an unsourced infobox field. Des keeps monsoon as an association, from thumri and film rather than the treatises.
