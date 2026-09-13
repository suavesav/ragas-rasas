# Raag data accuracy audit

**Status: all changes below were applied to `data.js`, `index.html`, `thaats.html` and `rasas.html` on 2026-09-10 (87 raags remain).**

Audit of the 97 raags in `data.js` (summary rows in `raags`, detail blocks in `raagDetails`) against published references. Date: 2026-09-10.

## Summary

- **What**: 97 raags checked for thaat, swaras, aroh/avroh, vadi/samvadi, time, season, and narrative claims.
- **Result**: 31 raags have wrong notes or wrong thaat. 19 more have wrong vadi/samvadi, wrong time, or missing aroh/avroh detail. 8 entries are duplicates of other entries. 1 entry (Yogi) could not be found in any reference.
- **Systematic issue**: the `season` field is invented for most raags. Only the Malhars (monsoon) and Basant, Bahar, Hindol, Bhairav Bahar (spring) have a real seasonal association. Bhairav, Lalit, Todi, Purvi, Shree, Marwa and the Sarangs do not.
- **Sources used**: tanarang.com, Rajan Parrikar Music Archive (parrikar.org), Wikipedia raga pages, ragajunglism.org, swarganga.org, indianclassicalmusic.com, chandrakantha.com. Where sources disagree the report says so.

Notation below follows the app: `(k)` komal, `(t)` tivra, `'` upper octave.

---

## 1. Duplicates and entries to merge or remove

| Keep | Remove | Reason |
|---|---|---|
| Des | Desh | Same raag, two spellings. |
| Vrindavani Sarang | Brindavani Sarang | Same raag, two spellings. |
| Gurjari Todi (move to Todi thaat) | Gujari Todi, Gujri Todi | Three spellings of one raag. All three entries also have wrong notes (see §2). |
| Nat Bhairav | Nata Bhairav | Same raag. Both entries have wrong notes (see §2). |
| Vibhas (Bhairav) | Bibhas (Marwa) | The Bibhas entry's notes (Sa Re(k) Pa Dha(k)) are the Bhairav-thaat Vibhas, identical to the Vibhas entry. A Marwa-thaat Bibhas exists but has shuddha Dha (Sa Re(k) Ga Pa Dha). Either delete Bibhas or give it the Marwa notes. |
| Shuddha Kalyan (add alt "Bhoop Kalyan") | Bhoop Kalyan | Most sources treat Bhoop Kalyan as another name for Shuddha Kalyan. A minority (Omkarnath Thakur's line) keeps them separate. Merge unless you want to document the minority view. |
| N/A | Yogi | No Hindustani raag by this name found in any reference. Its listed notes (Sa Ga(k) Ma Pa Ni(k)) are Dhani's. Recommend removal. |
| N/A | Mishra Bhairav, Mishra Khamaj | These are mishra (mixed) treatments used in thumri, not raags with their own grammar. Keep only if labelled as light-classical mixed forms. |

Also: Zila Kafi sits under the `// Khamaj Thaat` comment block in `data.js` but has `thaat: "Kafi"`. Move it.

---

## 2. Wrong notes or wrong thaat

These are the changes that matter most. The current entry would mislead a student.

### Kalyan thaat

**Gorakh Kalyan**: currently a Yaman clone (Kalyan thaat, tivra Ma). Wrong.
- Thaat: **Khamaj** (Bhatkhande; some say Kafi). Not Kalyan despite the name.
- Swaras: Sa Re Ma Pa Dha Ni(k). Ga omitted. Pa weak, often only a grace note.
- Aroh: Sa Re Ma Dha Sa' (Ni omitted in ascent). Avroh: Sa' Ni(k) Dha Pa Ma Re Sa.
- Vadi Ma, samvadi Sa. Time: early night (9–12). App has Evening; acceptable.
- Narrative: "scale similar to Yaman" is wrong. "Holds an important place in dhrupad" is unsupported. It is a khayal raag, associated with Kumar Gandharva and Bhimsen Joshi. Rewrite.
- Sources: [tanarang](http://www.tanarang.com/english/gorakh-kalyan_eng.htm), [Wikipedia](https://en.wikipedia.org/wiki/Gorakh_Kalyan), [ragajunglism](https://ragajunglism.org/ragas/gorakh-kalyan/)

**Hindol**: "no Sa or Pa" is wrong. Hindol omits **Re and Pa**.
- Swaras: Sa Ga Ma(t) Dha Ni. Fix `char` ("no Re or Pa"), `swaras` (add Sa), and the narrative sentence "omits both Sa and Pa".
- Vadi Dha, samvadi Ga per Wikipedia; app has Ga/Ni. Sources vary; Dha/Ga is more common.
- Sources: [Wikipedia](https://en.wikipedia.org/wiki/Hindol), [swarganga](https://www.swarganga.org/raags/76/Hindol)

**Kamod**: tivra Ma is missing entirely. Kamod uses both Ma; tivra Ma appears in the phrase Ma(t) Pa Dha Pa.
- Swaras: Sa Re Ga Ma Ma(t) Pa Dha Ni.
- Aroh: Sa Re Pa, Ga Ma Pa Dha Pa, Sa'. Avroh: Sa' Ni Dha Pa, Ga Ma Pa Ga Ma Re Sa.
- Raag-vachak phrase: Ga Ma Pa Ga Ma Re Sa and the Re–Pa sangati. Add to narrative.
- Vadi Pa, samvadi Re: correct.
- Sources: [tanarang](https://tanarang.com/raag-kamod/), [Parrikar](https://www.parrikar.org/hindustani/kamod/)

**Shuddha Kalyan**: aroh is wrong and the narrative's distinction from Yaman Kalyan is wrong.
- Aroh is pentatonic: Sa Re Ga Pa Dha Sa' (same as Bhoop). Avroh: Sa' Ni Dha Pa Ma(t) Ga Re Sa. Ma(t) and Ni appear only in descent, reached by meend (Sa'→Dha, Pa→Ga).
- Narrative currently says it "uses only tivra Ma throughout" as its defining feature. The defining feature is the Bhoop ascent with Ni and Ma(t) added in descent as meend.
- Sources: [chandrakantha](https://chandrakantha.com/music-and-dance/i-class-music/index-of-rags/rag-shuddha-kalyan/), [tanarang](https://tanarang.com/raag-shuddha-kalyan-2/), [ragajunglism](https://ragajunglism.org/ragas/shuddha-kalyan/)

**Hameer**: Ma usage is backwards and the aroh is wrong.
- Shuddha Ma is primary. Tivra Ma appears in descent in the phrase Pa Ma(t) Pa (or Ma(t) Pa Dha Pa), not in ascent.
- Aroh: Sa Re Ga Ma Dha Ni Sa' (Pa skipped, not Re and Ma). Avroh: Sa' Ni Dha Pa, Ma(t) Pa Ga Ma Re Sa.
- Narrative says "tivra in ascent and shuddha in descent" and "skips Re and Ma". Both wrong.
- Time: 2nd prahar of night (9–12). App says "Late night". Change to "Night".
- Sources: [Parrikar](https://www.parrikar.org/hindustani/hameer/), [Wikipedia](https://en.wikipedia.org/wiki/Hameer), [tanarang](https://tanarang.com/raag-hameer/)

**Nand**: Re is omitted in aroh; app's aroh is a straight Yaman scale.
- Aroh: Sa Ga Ma Pa, Dha Pa Ni Sa' (Re varjit in ascent; shuddha Ma primary, Ma(t) as a touch in Ma(t) Pa Dha Pa). Avroh: Sa' Ni Dha Pa, Ma(t) Pa Dha Pa Ma Ga, Ma Re Sa.
- Vadi/samvadi: app has Ga/Ni. tanarang does not give one; other sources give Sa/Pa. Mark unverified.
- Source: [tanarang](https://tanarang.com/raag-nand/)

**Kedar**: `swaras` field omits Re and Ga but the avroh uses them. Inconsistent.
- Swaras: Sa Re Ga Ma Ma(t) Pa Dha Ni, with Re and Ga weak and absent in ascent.
- Aroh: Sa Ma, Ma Pa, Dha Pa, Ni Dha Sa'. Vadi Ma, samvadi Sa: correct.
- Source: [Wikipedia](https://en.wikipedia.org/wiki/Kedar_(raga))

### Bilawal thaat

**Alhaiya Bilawal**: komal Ni is missing. It is the defining note of this raag.
- Aroh: Sa Re Ga Pa Dha Ni Sa' (Ma varjit in ascent). Avroh: Sa' Ni Dha Ni(k) Dha Pa, Ma Ga Re Sa.
- Narrative: "takes its name from the legendary warrior Alha" is unsupported. The name Alhaiya is attested in 16th-century texts (Lochan, Hridaya Narayanadeva). Drop the Alha claim.
- Sources: [tanarang](https://tanarang.com/raag-alhaiya-bilawal/), [ragajunglism](https://ragajunglism.org/ragas/alhaiya-bilawal/), [Wikipedia](https://en.wikipedia.org/wiki/Alhaiya_Bilaval)

**Bihag**: Re and Dha are dropped entirely. They are weak, not absent.
- Avroh: Sa' Ni Dha Pa, Ma(t) Pa, Ga Ma Ga, Re Sa. Add Re and Dha to `swaras` with a note that they are varjit in ascent.
- Source: [Wikipedia](https://en.wikipedia.org/wiki/Bihag)

**Nat Bilawal**: time should be **Morning** (Bilawal-ang raag), not Evening.

**Charukeshi**: thaat Bilawal is wrong. Charukeshi (Sa Re Ga Ma Pa Dha(k) Ni(k)) is a Carnatic import that fits none of the 10 thaats. Change thaat to a "Carnatic / no thaat" bucket. Notes in app are correct.
- Sources: [tanarang](https://tanarang.com/raag-charukeshi/), [ragajunglism](https://ragajunglism.org/ragas/charukeshi/)

**Saraswati**: entry describes a different raag. The Hindustani Saraswati (Carnatic import) is:
- Swaras: Sa Re Ma(t) Pa Dha Ni(k). Ga omitted. Vadi Pa, samvadi Re. Time: night (till midnight). Not a Bilawal-thaat morning raag.
- Narrative ("pure, scholarly, invokes the goddess", "morning prayers") should be rewritten.
- Source: [tanarang](https://tanarang.com/raag-saraswati/)

**Durga**: vadi Ma, samvadi Sa (app has Re/Pa). Notes correct.

### Khamaj thaat

**Des / Desh**: merge, then fix: aroh uses **shuddha Ni** (Sa Re Ma Pa Ni Sa'); komal Ni only in avroh. App has Ni(k) in aroh. Vadi Re, samvadi Pa (app has them reversed).
- Sources: [Parrikar](https://www.parrikar.org/hindustani/des/), [Wikipedia](https://en.wikipedia.org/wiki/Desh_(raga))

**Tilak Kamod**: uses **shuddha Ni**; komal Ni is only an occasional touch. App has Ni(k) throughout. Dha varjit in aroh. Vadi Re, samvadi Pa (app reversed).
- Aroh: Pa' Ni' Sa Re Ga Sa, Re Ma Pa Ni Sa'. Avroh: Sa' Pa Dha Ma Ga, Sa Re Ga Sa.
- Sources: [Wikipedia](https://en.wikipedia.org/wiki/Tilak_Kamod), [tanarang](https://tanarang.com/raag-tilak-kamod/)

**Khamaj**: Re is varjit in aroh, and shuddha Ni is used in aroh (komal in avroh). App aroh has Re and no Ni.
- Aroh: Sa Ga Ma Pa Dha Ni Sa'. Avroh: Sa' Ni(k) Dha Pa Ma Ga Re Sa.
- Source: [Wikipedia](https://en.wikipedia.org/wiki/Khamaj)

**Rageshri**: Pa is varjit in aroh (app has it). Aroh: Sa Ga Ma Dha Ni(k) Sa'. Vadi Ga, samvadi Ni: correct.
- Source: [Wikipedia](https://en.wikipedia.org/wiki/Rageshree)

**Pahadi**: thaat is **Bilawal** (all shuddha), not Khamaj. Time: evening.
- Source: [soundofindia](https://soundofindia.com/raagas/pahadi)

**Mand**: thaat is **Bilawal**, all shuddha swaras. App has Khamaj with komal Ni.
- Source: [ragajunglism](https://ragajunglism.org/ragas/mand/)

**Jog**: thaat "Mixed" should be **Khamaj**. Uses both Ga: shuddha in aroh, komal in avroh, plus komal Ni. "Combines Bhairavi and Kafi phrases" is wrong.
- Aroh: Sa Ga Ma Pa Ni(k) Sa'. Avroh: Sa' Ni(k) Pa Ma Ga Ma Ga(k) Sa. Vadi/samvadi in app (Ga(k)/Pa) unverified; most sources give Ma/Sa.
- Source: [tanarang](https://tanarang.com/raag-jog/)

### Bhairav thaat

**Nat Bhairav / Nata Bhairav**: merge, then fix: Nat Bhairav has **shuddha Re and komal Dha** (Sa Re Ga Ma Pa Dha(k) Ni). App has komal Re, shuddha Dha in both entries, which is the reverse.
- Source: [learnraga](https://learnraga.com/ragas/nat-bhairav)

**Lalit**: thaat Bhairav is wrong. With komal Dha (as in the app's notes, and as performed today) it is **Purvi** thaat. With shuddha Dha (Bhatkhande's form) it is Marwa. Vadi is shuddha Ma (app says Ma(t)); samvadi Sa.
- Sources: [tanarang](https://tanarang.com/raag-lalit/), [ragajunglism](https://ragajunglism.org/ragas/lalit/)

**Ramkali**: missing its two identifying notes. Ramkali is Bhairav plus **tivra Ma and komal Ni** in the descent phrase Ma(t) Pa Dha(k) Ni(k) Dha(k) Pa. Vadi Pa, samvadi Sa (app Ga/Ni).
- Aroh: Sa Ga Ma Pa Dha(k) Ni Sa'. Avroh: Sa' Ni Dha(k) Pa, Ma(t) Pa Dha(k) Ni(k) Dha(k) Pa, Ga Ma Re(k) Sa.
- Sources: [tanarang](https://tanarang.com/raag-ramkali/), [Wikipedia](https://en.wikipedia.org/wiki/Ramkali)

**Gurjari Todi** (Bhairav section): wrong thaat and wrong notes. See Todi section below; delete this entry and fix the Todi one.

**Lalita Gauri**: wrong thaat, time and notes. It is a **Purvi-ang jod raag** (Lalit + Gauri) created by Kesarbai Kerkar. Uses both Ma, komal Re, komal Dha (some use shuddha Dha). Time: evening / sunset, not dawn.
- Aroh: Sa Re(k) Ga Ma, Ma(t) Ma Ga, Pa Dha(k) Ni Sa'. Avroh: Sa' Ni Dha(k) Pa, Dha(k) Ma(t), Ma, Ga, Ma(t) Re(k) Sa.
- Sources: [Parrikar](https://www.parrikar.org/hindustani/lalitagouri/), [Milind Malshe](https://profmilindmalshe.in/2020/09/27/raag-lalita-gauri/)

**Bhairav Bahar**: a jod raag, not a scale. App's scale (komal Re, shuddha Dha, komal Ni) does not describe it. It combines Bhairav's poorvang (Sa Re(k) Ga Ma) with Bahar's uttarang (Pa Ga(k) Ma Ni(k) Dha Ni Sa'). Low priority, but the current notes are not a real form.

### Bhairavi / Todi thaats

**Bilaskhani Todi**: thaat is **Bhairavi**, not Todi, and Ma is **shuddha**, not tivra.
- Swaras: Sa Re(k) Ga(k) Ma Pa Dha(k) Ni(k). Aroh: Sa Re(k) Ga(k) Pa Dha(k) Sa' (Ma, Ni varjit in ascent). Avroh: Re(k)' Ni(k) Dha(k) Pa, Ma Ga(k) Re(k) Sa. Vadi Dha(k), samvadi Ga(k).
- The Bilas Khan legend in the narrative is fine.
- Sources: [tanarang](https://tanarang.com/raag-bilaskhani-todi/), [Wikipedia](https://en.wikipedia.org/wiki/Bilaskhani_Todi)

**Bhupali Todi** (Bhupal Todi): notes are entirely wrong. It is pentatonic **Sa Re(k) Ga(k) Pa Dha(k)**: no Ma, no Ni. App has Ma(t) and Ni and omits Pa. Thaat Bhairavi (conventional) or Todi-ang.
- Sources: [tanarang](https://tanarang.com/raag-bhupal-todi/), [Wikipedia](https://en.wikipedia.org/wiki/Bhupal_Todi)

**Gurjari Todi** (single merged entry): **Pa is varjit**. All three app entries include Pa; the Bhairav-section one also has shuddha Ma and shuddha Ga.
- Swaras: Sa Re(k) Ga(k) Ma(t) Dha(k) Ni. Aroh: Sa Re(k) Ga(k) Ma(t) Dha(k) Ni Sa'. Avroh: Sa' Ni Dha(k) Ma(t) Ga(k) Re(k) Sa. Vadi Dha(k), samvadi Re(k). Late morning.
- Sources: [Wikipedia](https://en.wikipedia.org/wiki/Gurjari_(raga)), [ragajunglism](https://ragajunglism.org/ragas/gujiri-todi/)

**Multani**: aroh omits Re and Dha: Ni' Sa Ga(k) Ma(t) Pa Ni Sa'. Vadi Pa, samvadi Sa (app Ma(t)/Sa).
- Source: [Wikipedia](https://en.wikipedia.org/wiki/Multani_(raga))

**Madhuvanti**: aroh omits Re and Dha: Ni' Sa Ga(k) Ma(t) Pa Ni Sa'. Vadi Pa, samvadi Sa (app Ga(k)/Ni). Time: late afternoon to early evening (4–8 pm). Thaat Todi is the conventional assignment though the notes (shuddha Re, Dha) do not fit; keep but note it.
- Sources: [tanarang](https://tanarang.com/raag-madhuvanti/), [Wikipedia](https://en.wikipedia.org/wiki/Madhuvanti)

**Chandrakauns**: two errors. It omits **Re and Pa** (not Re and Dha), and Ni is **shuddha**. App has Ni(k), which makes the entry identical to Malkauns. The shuddha Ni is the whole point of the raag.
- Swaras: Sa Ga(k) Ma Dha(k) Ni. Fix `char`, `swaras`, aroh, avroh, and the narrative. Thaat: fits none of the 10 cleanly; app's "Kafi" is defensible only by convention.
- Sources: [Wikipedia](https://en.wikipedia.org/wiki/Chandrakauns), [raga.one](https://raga.one/raag-chandrakauns/)

### Kafi thaat

**Bageshri**: Dha is **shuddha**, not komal. Aroh omits Re and Pa: Sa Ga(k) Ma Dha Ni(k) Sa'. Avroh: Sa' Ni(k) Dha, Ma Pa Dha Ma Ga(k) Re Sa. Vadi Ma, samvadi Sa (app Ga(k)/Ni(k)).
- Sources: [Parrikar](https://www.parrikar.org/hindustani/bageshree/), [hindustaniclassical.com](https://www.hindustaniclassical.com/article/raga-bageshri)

**Patdeep**: Ni is **shuddha**. That is what distinguishes it from Bhimpalasi. App has Ni(k). Aroh: Ni' Sa Ga(k) Ma Pa Ni Sa'. Avroh: Sa' Ni Dha Pa, Ma Pa Ga(k), Ma Ga(k) Re Sa. Vadi Pa, samvadi Sa (app Pa/Re).
- Sources: [tanarang](https://tanarang.com/raag-patdeep/), [Wikipedia](https://en.wikipedia.org/wiki/Patdeep)

**Bhimpalasi**: vadi Ma, samvadi Sa (app Ga(k)/Ni(k)). Notes correct.

**Sur Malhar**: Dha is **shuddha** (app komal). Aroh is Sarang-ang: Sa Re Ma Pa Ni Sa'; komal Ga only in avroh. Malhar-ang phrase Ma Re Pa, Ma Pa Ni(k) Dha Pa.
- Source: [tanarang](https://tanarang.com/raag-surdasi-malhar/)

**Gaud Malhar**: Ga is **shuddha** (app komal). Thaat: Bilawal (Wikipedia) or Khamaj; not Kafi. Vadi Ma, samvadi Sa (app Pa/Re).
- Aroh: Sa Re Ga Ma Re Pa, Ma Pa Dha Ni Sa'. Avroh: Sa' Dha Ni(k) Pa Ma Ga Ma Re Sa.
- Sources: [Wikipedia](https://en.wikipedia.org/wiki/Gaud_Malhar), [tanarang](https://tanarang.com/raag-gaud-malhar/)

**Miyan ki Malhar**: vadi Ma, samvadi Sa (app Ni/Pa). Notes correct. Add: Ga omitted in aroh, Dha omitted in avroh; the Ni(k) Dha Ni Sa' double-Ni phrase is the signature.
- Source: [tanarang](https://tanarang.com/raag-malhar-raag-miya-malhar/)

**Shuddha Sarang**: tivra Ma is missing, and thaat should be **Kalyan** (Bhatkhande put it in Kafi; modern texts Kalyan).
- Aroh: Ni' Sa Re Ma(t) Pa Ni Sa'. Avroh: Sa' Ni Dha Pa Ma(t) Pa Ma Re Ni' Sa. Signature: Ma(t) Ma Re.
- Sources: [tanarang](https://tanarang.com/raag-shuddha-sarang/), [Parrikar](https://www.parrikar.org/hindustani/sarang/)

**Gaur Sarang**: wrong thaat and wrong notes. It is **Kalyan** thaat, sampoorna and vakra, using both Ma and Ga (app omits Ga and Ma(t)). Vadi Ga, samvadi Dha (app Re/Pa). Early afternoon.
- Aroh: Sa Ga Re Ma Ga Pa Ma(t) Dha Pa Ni Dha Sa'. Avroh: Sa' Dha Ni Pa Dha Ma(t) Pa Ga Ma Re Pa Re Sa. Raag-vachak: Ga Re Ma(t) Ga Pa Re Sa.
- Sources: [Wikipedia](https://en.wikipedia.org/wiki/Gaud_Sarang), [tanarang](https://tanarang.com/raag-gaud-sarang/)

**Vrindavani Sarang**: uses **both Ni**: shuddha in aroh, komal in avroh. App has shuddha only. Merge Brindavani Sarang into this.
- Sources: [Wikipedia](https://en.wikipedia.org/wiki/Brindavani_Sarang), [tanarang](https://tanarang.com/raag-sarang-raag-brindavani-sarang/)

**Madhyamad Sarang**: same scale as Vrindavani but with **komal Ni only**. App has shuddha Ni. Fix, and say in the narrative that it differs from Vrindavani only in the Ni.

**Bahar**: uses both Ni (app komal only). Vadi Ma, samvadi Sa (app Ga(k)/Ni(k)). Aroh: Sa Ma, Pa Ga(k) Ma, Dha Ni Sa'.
- Sources: [Wikipedia](https://en.wikipedia.org/wiki/Bahar_(raga)), [indianclassicalmusic.com](https://www.indianclassicalmusic.com/bahar)

**Nayaki Kanada**: Dha is omitted in most renderings (app has Dha(k) in both directions). Aroh phrases: Sa Re Ga(k) Ma, Ma Pa Ni(k) Pa Sa'. Avroh: Sa' Ni(k) Pa, Ma Pa Ga(k) Ma Re Sa.
- Source: [tanarang](https://tanarang.com/raag-nayaki-kanada/)

### Asavari thaat

**Komal Rishabh Asavari**: thaat is **Bhairavi** (komal Re rules it out of Asavari). Notes and vadi/samvadi correct.
- Sources: [Wikipedia](https://en.wikipedia.org/wiki/Komal_Rishabh_Asavari), [tanarang](https://tanarang.com/raag-komal-rishabh-asawari/)

**Kirwani**: Ni is **shuddha** (harmonic minor: Sa Re Ga(k) Ma Pa Dha(k) Ni). App has Ni(k) and shuddha Ga, which is neither Kirwani nor harmonic minor. Thaat: fits none of the 10; not Asavari.
- Sources: [Wikipedia](https://en.wikipedia.org/wiki/Kirwani), [ragajunglism](https://ragajunglism.org/ragas/kirwani/)

**Adana**: vadi Sa, samvadi Pa (app Pa/Re). Aroh uses komal Ni primarily; shuddha Ni sparingly. Minor.
- Source: [Wikipedia](https://en.wikipedia.org/wiki/Adana_(raga))

**Jaunpuri**: vadi Dha(k), samvadi Ga(k) (app Ga(k)/Ni(k)). Minor.

### Purvi / Marwa thaats

**Sohini**: notes wrong and time wrong. **Pa is varjit; Dha is present and is the vadi.** App omits Dha and includes Pa.
- Swaras: Sa Re(k) Ga Ma(t) Dha Ni. Aroh: Sa Ga Ma(t) Dha Ni Sa'. Avroh: Sa' Ni Dha, Ga Ma(t) Dha Ga Ma(t) Ga Re(k) Sa. Vadi Dha, samvadi Ga.
- Time: last prahar of night (3–6 am). App says Night. Change to Pre-dawn.
- Sources: [tanarang](https://tanarang.com/raag-sohani/), [ragajunglism](https://ragajunglism.org/ragas/sohini/)

**Basant**: vadi Sa, samvadi Pa (app Ga/Ni). Both Ma are used in some traditions (tanarang); Wikipedia gives tivra only. Aroh: Sa Ga Ma(t) Dha(k) Ni Sa'.
- Sources: [Wikipedia](https://en.wikipedia.org/wiki/Basant_(raga)), [tanarang](https://tanarang.com/raag-basant/)

**Bhatiyar**: vadi Ma (shuddha), samvadi Sa (app Ga/Ni). Uses both Ma with shuddha Ma prominent; app has tivra only. Aroh: Sa Ma, Pa Ga, Ma(t) Dha Sa'. Thaat Marwa: correct.
- Sources: [tanarang](https://tanarang.com/raag-bhatiyar/), [Wikipedia](https://en.wikipedia.org/wiki/Bhatiyar)

**Puriya Dhanashri**: vadi Pa, samvadi Re(k) (app Ga/Ni). Pa is weak in aroh: Ni' Re(k) Ga Ma(t) Dha(k) Ni Sa'.
- Sources: [Wikipedia](https://en.wikipedia.org/wiki/Puriya_Dhanashree), [tanarang](https://tanarang.com/raag-puriya-dhanashree/)

**Shree**: avroh omits Dha(k) and Ga, which are present: Sa' Ni Dha(k) Pa, Ma(t) Ga Re(k) Sa. `swaras` should list all seven with Ga and Dha weak. Vadi Re(k), samvadi Pa: correct.

**Paraj**: time is last prahar of night (pre-dawn), not "Late night". Minor.

---

## 3. Time-of-day corrections

| Raag | App | Should be |
|---|---|---|
| Hameer | Late night | Night (9–12) |
| Sohini | Night | Pre-dawn (3–6) |
| Nat Bilawal | Evening | Morning |
| Saraswati | Morning | Night |
| Lalita Gauri | Dawn | Evening / sunset |
| Madhuvanti | Afternoon | Late afternoon (4–8 pm) |
| Paraj | Late night | Pre-dawn |

Everything else checked matched at least one reference.

---

## 4. Seasons

The `season` field is the weakest data in the app. Standard theory ties season to only two families:

- **Monsoon**: Megh, Miyan ki Malhar, Gaud Malhar, Nat Malhar, Sur Malhar. Des is a common but informal association. Keep.
- **Spring**: Basant, Bahar, Hindol, Bhairav Bahar. Kafi (via Holi/hori) is a soft association. Keep.

Not supported by any reference and recommended to change to "Any":

- Winter: Bhairav, Lalit, Jogiya, Miyan ki Todi, Bhatiyar, Bibhas.
- Autumn: Purvi, Shree, Marwa.
- Summer: Bhimpalasi, Patdeep, Multani, Madhuvanti, all five Sarangs.

The "hot afternoon" framing of the Sarangs and Bhimpalasi is a poetic gloss on their time of day, not a season. If you want to keep it, label the field "association" and make it clear in the UI that it is not a rule.

Narratives that lean on the invented season should lose that clause: Bhairav ("especially powerful in winter dawn"), Lalit ("winter pre-dawn"), Jogiya, Miyan ki Todi ("winter morning"), Purvi and Shree ("autumn"), Marwa ("autumn twilight"), Bhatiyar, Bibhas, Multani, Madhuvanti, Bhimpalasi, Patdeep.

---

## 5. Narrative claims to correct

- **Yaman**: "The Gwalior gharana traditionally begins the arohana from Ni in the lower octave": the Ni' Re Ga start is universal in Yaman, not a Gwalior trait. "Some older treatises and the Agra gharana treat the vadi as Ga while others assign it to Ni; the Ga vadi is now the accepted standard" contradicts itself. Replace with: Bhatkhande gives Ga/Ni; a minority gives Ni/Ga.
- **Alhaiya Bilawal**: drop the warrior-Alha etymology (see §2).
- **Gorakh Kalyan**: drop "important in dhrupad", drop "scale similar to Yaman" (see §2).
- **Jog**: drop "combines Bhairavi and Kafi phrases".
- **Shuddha Kalyan**: rewrite the distinction from Yaman Kalyan (see §2).
- **Hameer**: fix Ma direction and the "skips Re and Ma" claim (see §2).
- **Chandrakauns**: fix "no Re or Dha" and add that shuddha Ni is what separates it from Malkauns.
- **Hindol**: fix "omits both Sa and Pa".
- **Malkauns** ras: "Raudra" is unusual. Most sources describe it as Shanta / Bhakti / Veer. Taste call; flag only.
- **Kalingada** "rare": it is common in Punjab and in thumri/light forms. Soften.
- **Bilaskhani Todi** legend: fine. Fix the thaat sentence around it.

---

## 6. Verified as correct (no change needed)

Yaman, Yaman Kalyan, Bhoopali, Deshkar, Bilawal, Hansadhwani (vadi varies by source; app's Ga/Ni is one reading), Shankara, Devgiri Bilawal, Jhinjhoti, Tilang, Zila Kafi (apart from the comment-block placement), Bhairav, Ahir Bhairav, Vibhas, Kalingada (notes), Jogiya, Bairagi, Bhairavi, Sindhu Bhairavi, Malkauns (notes), Sampoorna Malkauns, Kafi, Dhani, Megh, Nat Malhar, Pilu, Asavari, Darbari Kanada, Gandhari (notes; vadi varies), Miyan ki Todi, Shuddha Todi, Purvi, Puriya, Marwa.

---

## 7. Suggested order of work

1. Merge duplicates and delete Yogi (§1). Nine entries removed, 88 remain.
2. Fix the note-level errors that change the raag's identity: Chandrakauns, Patdeep, Bageshri, Kirwani, Sohini, Bhupali Todi, Gurjari Todi, Bilaskhani Todi, Gorakh Kalyan, Saraswati, Nat Bhairav, Lalita Gauri, Gaur Sarang, Shuddha Sarang, Gaud Malhar, Sur Malhar.
3. Fix thaat labels: Komal Rishabh Asavari, Lalit, Jog, Pahadi, Mand, Charukeshi, Kirwani, Bilaskhani Todi, Gurjari Todi, Gorakh Kalyan, Shuddha Sarang, Gaur Sarang, Gaud Malhar. Consider adding a "No thaat / Carnatic import" value for Charukeshi, Kirwani, Saraswati, Chandrakauns.
4. Add missing Ma / Ni variants: Kamod, Hameer, Nand, Alhaiya Bilawal, Ramkali, Vrindavani Sarang, Madhyamad Sarang, Bahar, Basant, Bhatiyar, Des, Tilak Kamod, Khamaj.
5. Fix vadi/samvadi (§2, about 20 raags).
6. Reset seasons (§4) and edit the narratives that depend on them.
7. Fix the narrative claims in §5.
