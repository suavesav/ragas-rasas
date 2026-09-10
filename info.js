// Shared descriptions of the ras and the ten thaats.
// Used by rasas.html, thaats.html and recommend.html.

const rasInfo = [
  {
    name: "Shringar",
    sanskrit: "शृंगार",
    meaning: "Love & Beauty",
    color: "#e080b0",
    deity: "Vishnu",
    description: "The king of ras and the most musically fertile of the nine, Shringar encompasses the full spectrum of love: the joy of union (sambhoga shringar) and the ache of separation (vipralambha shringar). In Hindustani music it is omnipresent — the majority of raags carry Shringar as a primary or secondary ras, reflecting the centrality of love as the supreme aesthetic experience. Shringar is not personal longing but its distilled, universal form: beauty itself, made audible.",
    raags: "Bageshri, Bhimpalasi, Khamaj, Des, Kafi, Kalingada, Sohini, Madhuvanti, and many others"
  },
  {
    name: "Karuna",
    sanskrit: "करुण",
    meaning: "Compassion & Pathos",
    color: "#8898e0",
    deity: "Yama",
    description: "The ras of grief, compassion, and pathos — and perhaps the most deeply explored ras in Hindustani music. Karuna is not personal sadness but the aesthetic experience of sorrow rendered universal: the listener does not weep for themselves but touches the fundamental human condition of loss. The dawn hours are Karuna's domain, and the great morning raags — Todi, Bhairav, Bhairavi — together with the late-night Darbari are among the most profound expressions of this ras in any musical tradition.",
    raags: "Bhairavi, Miyan ki Todi, Gurjari Todi, Bilaskhani Todi, Asavari, Jogiya, Miyan ki Malhar, Puriya Dhanashri"
  },
  {
    name: "Shanta",
    sanskrit: "शान्त",
    meaning: "Peace & Serenity",
    color: "#80c080",
    deity: "Vishnu / Narayana",
    description: "The ninth and highest ras, added by the Kashmiri philosopher Abhinavagupta to Bharata's original eight. Shanta represents not the absence of emotion but its transcendence — the peace that lies beyond all striving, the stillness at the heart of all movement. In music, Shanta raags carry a sattvic clarity that neither excites nor depresses but simply opens. Abhinavagupta argued that Shanta is the foundational ras from which all others arise and into which all finally dissolve.",
    raags: "Yaman, Malkauns, Marwa, Puriya, Purvi, Alhaiya Bilawal, Durga, Shuddha Kalyan"
  },
  {
    name: "Bhakti",
    sanskrit: "भक्ति",
    meaning: "Devotion",
    color: "#90b8e0",
    deity: "Vishnu / Krishna",
    description: "Not one of Bharata Muni's nine, Bhakti was argued into the rank of a ras by Rupa Goswami in the Bhakti-rasamrita-sindhu (16th century) and has been treated as one by musicians ever since. It is the devotional stance: not the peace of Shanta, which withdraws, but love directed at the divine, which reaches. In the Hindustani sources consulted for this site it is the single most common mood word, applied above all to the dawn and early-morning raags of the Bhairav and Todi families and to the sunset raags Shree and Lalit. Tanarang names it outright for a dozen raags; the Raga Guide reports musicians describing Bhairav and Lalit as devotional.",
    raags: "Bhairav, Lalit, Shree, Bhoopali, Kedar, Ahir Bhairav, Vibhas, Bairagi, Multani, Jaunpuri, Bhupali Todi"
  },
  {
    name: "Raudra",
    sanskrit: "रौद्र",
    meaning: "Fury & Ferocity",
    color: "#e07060",
    deity: "Rudra (Shiva)",
    description: "The ras of righteous fury, ferocity, and the terrifying aspect of divine power. In Hindustani music, Raudra appears less frequently than Karuna or Shringar, but where it does — in raags like Malkauns, Shankara, or Adana — it carries an unmistakable quality of compressed intensity. Raudra is not mere anger but the wrath of principle: the force that destroys in order to renew. Associated with fire, the midday sun, and Shiva in his Rudra aspect.",
    raags: "Adana carries it as a secondary ras; no raag in the sources is described with Raudra as its primary mood. The Raga Guide records an older view of Bhairav as 'awesome grandeur, horror and fright'."
  },
  {
    name: "Veer",
    sanskrit: "वीर",
    meaning: "Heroism & Courage",
    color: "#e09840",
    deity: "Indra",
    description: "The ras of heroism, nobility, and courageous action. Veer in music is not aggression but elevation — the calm confidence of one who acts from principle rather than passion. Raags with Veer ras tend to have strong, direct phrase movements, bold interval leaps, and a quality of unstoppable forward momentum. The Veer ras is associated with the saffron color, the season of spring, and compositions celebrating great deeds and righteous enterprise.",
    raags: "Hameer, Shankara, Adana, Darbari Kanada, Chhayanat, Megh, Nat Bhairav, Nayaki Kanada"
  },
  {
    name: "Adbhuta",
    sanskrit: "अद्भुत",
    meaning: "Wonder & Mystery",
    color: "#b080e0",
    deity: "Brahma",
    description: "The ras of wonder, the marvelous, and the mysteriously beautiful. Adbhuta is the aesthetic experience of encountering something that exceeds ordinary understanding — not fear but the sublime. In Hindustani music it appears most vividly in the monsoon raags, the raags that omit Pa (like Chandrakauns, Marwa and Lalit), and the great twilight raags like Marwa and Puriya where tonal resolution is deliberately withheld. Adbhuta raags seem to open onto something vast and unnamed.",
    raags: "Miyan ki Malhar, Megh, Gaud Malhar, Sur Malhar, Chandrakauns, Bhatiyar (secondary in each)"
  },
  {
    name: "Hasya",
    sanskrit: "हास्य",
    meaning: "Joy & Humor",
    color: "#d0b050",
    deity: "Pramatha",
    description: "The ras of joy, lightness, and laughter — from gentle humor to pure exuberance. In Hindustani music Hasya manifests as rhythmic playfulness, folk-tinged buoyancy, and the festive energy of seasonal celebrations. The spring raags (Bahar, Hindol, Basant) and the folk-influenced thumri raags carry the most Hasya, reflecting the ras's close association with the outdoor world, folk music, and communal celebration. Hasya raags tend toward pentatonic scales and simple, direct phrase movements.",
    raags: "Bahar, Dhani, Hansadhwani, Khamaj, Jhinjhoti, Kalingada, Basant, Sohini"
  },
  {
    name: "Bhayanaka",
    sanskrit: "भयानक",
    meaning: "Fear & Dread",
    color: "#50b0a0",
    deity: "Yama / Kala",
    description: "The ras of fear, dread, and the uncanny. In its refined musical form, Bhayanaka is not mere fright but the profound unease of encountering the vast, the dark, and the incomprehensible — the eerie stillness of pre-dawn, the approaching monsoon storm, the ascetic silence that borders on the supernatural. Raags carrying Bhayanaka tend to use sparse textures, unusual omissions of stable swaras, and the particular quality of emptiness that creates unease in the listener.",
    raags: "None of the sources consulted describes a raag with Bhayanaka; the Raga Guide notes only that superstitious musicians ascribe supernatural powers to Malkauns and Vibhas."
  },
  {
    name: "Bibhatsa",
    sanskrit: "बीभत्स",
    meaning: "Disgust & Aversion",
    color: "#909090",
    deity: "Shiva / Mahakala",
    description: "The rarest of the nine ras in classical music, Bibhatsa represents disgust, aversion, and the turning away from the impure or excessive. In its highest aesthetic form, Bibhatsa is not revulsion but the renunciate's clear-eyed rejection of all that obscures — a kind of austere discrimination. It appears fleetingly in raags that touch on dissolution, darkness, and the limits of the musically beautiful, and its presence is more implied than directly expressed. Almost no raags carry it as a primary ras.",
    raags: "Appears rarely, as a secondary quality in some dark, austere raags"
  },
];

const thaatInfo = [
  {
    name: "Kalyan",
    sanskrit: "कल्याण",
    scale: "Sa Re Ga Ma(t) Pa Dha Ni",
    alteration: "Tivra Madhyam",
    time: "Evening",
    color: "#c9a84c",
    description: "The thaat of the evening, Kalyan's single defining characteristic is the tivra (sharp) Madhyam — a raised fourth degree that gives all Kalyan raags their characteristic open, luminous, reaching quality. This one alteration from the natural scale creates a sound of effortless expansiveness, as though the music is straining upward toward something beautiful just beyond grasp. The Kalyan family is the largest and most beloved group of evening raags in the repertoire.",
    raags: "Yaman, Shuddha Kalyan, Kedar, Hameer, Kamod, Chhayanat, Shyam Kalyan, Maru Bihag, Bhoopali, Hindol, Shuddha Sarang, Gaur Sarang"
  },
  {
    name: "Bilawal",
    sanskrit: "बिलावल",
    scale: "Sa Re Ga Ma Pa Dha Ni",
    alteration: "All shuddha (natural scale)",
    time: "Morning",
    color: "#f0e8d8",
    description: "The natural scale — all seven swaras in their unaltered, shuddha form. Equivalent to the Western major scale, Bilawal carries a quality of pure, sattvic brightness that is associated with the morning hours when the mind is clear and receptive. Despite (or because of) its simplicity, Bilawal has a vast number of derived raags, each finding a distinct emotional world within the same seven notes through different vadi-samvadi relationships, arohana-avarohana patterns, and characteristic phrase vocabularies.",
    raags: "Bilawal, Alhaiya Bilawal, Bihag, Deshkar, Durga, Shankara, Hansadhwani, Kaushik Dhwani, Pahadi, Gaud Malhar"
  },
  {
    name: "Khamaj",
    sanskrit: "खमाज",
    scale: "Sa Re Ga Ma Pa Dha Ni(k)",
    alteration: "Komal Nishad (in descent)",
    time: "Night",
    color: "#c47030",
    description: "Khamaj introduces the komal Ni in descent while using shuddha Ni in ascent — a characteristic that gives all Khamaj raags a folk-tinged, sensuous quality. The dual Ni treatment creates a natural flexibility that makes Khamaj the primary thaat for thumri, dadra, and light classical forms, where strict adherence to a single swara gives way to emotional directness. Khamaj raags tend to feel warm, accessible, and rooted in the outdoor, folk world.",
    raags: "Khamaj, Des, Jaijaivanti, Jhinjhoti, Rageshri, Tilak Kamod, Jog, Gorakh Kalyan, Tilang"
  },
  {
    name: "Bhairav",
    sanskrit: "भैरव",
    scale: "Sa Re(k) Ga Ma Pa Dha(k) Ni",
    alteration: "Komal Rishabh & Komal Dhaivat",
    time: "Dawn",
    color: "#90a8c8",
    description: "One of the oldest and most revered thaats, Bhairav flattens the second (Re) and sixth (Dha) degrees. These two komal swaras — positioned symmetrically around the central Pa — create a scale of austere, solemn gravity unlike any other. The characteristic andolan (oscillation) on both komal swaras is one of the most recognizable sounds in Hindustani music. Bhairav is the thaat of dawn, Lord Shiva, and the austere devotional tradition. Its raags are among the most ancient in the repertoire.",
    raags: "Bhairav, Ahir Bhairav, Nat Bhairav, Jogiya, Ramkali, Vibhas, Bairagi, Kalingada, Basant Mukhari"
  },
  {
    name: "Bhairavi",
    sanskrit: "भैरवी",
    scale: "Sa Re(k) Ga(k) Ma Pa Dha(k) Ni(k)",
    alteration: "Komal Re, Ga, Dha & Ni",
    time: "Morning / Concluding",
    color: "#8898e0",
    description: "The most densely chromatic of the ten thaats, Bhairavi flattens all four alterable swaras — Re, Ga, Dha, and Ni. The result is a scale of extraordinary emotional richness, with no natural third, sixth, or seventh. This concentration of komal swaras creates the most 'minor' and melancholic sound in the system. Bhairavi is also the most 'mishra' (mixed) thaat in practice — its raags routinely incorporate swaras from other thaats for expressive effect, giving them unusual breadth and flexibility.",
    raags: "Bhairavi, Malkauns, Sindhu Bhairavi, Bilaskhani Todi, Bhupali Todi, Komal Rishabh Asavari"
  },
  {
    name: "Kafi",
    sanskrit: "काफी",
    scale: "Sa Re Ga(k) Ma Pa Dha Ni(k)",
    alteration: "Komal Gandhar & Komal Nishad",
    time: "Night / Spring / Monsoon",
    color: "#4a8a4a",
    description: "Kafi thaat flattens the third (Ga) and seventh (Ni), creating a scale that feels earthy, folk-rooted, and deeply connected to the natural world. The komal Ga — the defining characteristic of the Kafi family — carries a tenderness and vulnerability that is the emotional signature of all Kafi raags. This is the thaat of spring, the monsoon, and the summer afternoon; of Holi music, bhajan, and the devotional poetry of the Bhakti movement. The Kafi family includes some of the most beloved and widely performed raags.",
    raags: "Kafi, Bageshri, Bhimpalasi, Miyan ki Malhar, Megh, Bahar, Desi, Sindhura, Abhogi, Shahana Kanada, Shivranjani"
  },
  {
    name: "Asavari",
    sanskrit: "आसावरी",
    scale: "Sa Re Ga(k) Ma Pa Dha(k) Ni(k)",
    alteration: "Komal Ga, Dha & Ni",
    time: "Morning",
    color: "#7a6130",
    description: "Asavari flattens three swaras — Ga, Dha, and Ni — creating a scale of austere, detached gravity. The three komal notes in the upper half of the scale (Ga, Dha, Ni) give Asavari raags their characteristic downward pull: the music seems to lean toward the lower register, contemplating rather than reaching upward. The characteristic vakra arohana of most Asavari raags (which skips Ga and Ni in ascent) reinforces this quality of subdued, dignified restraint. Asavari is one of the oldest recognized raags and thaat families.",
    raags: "Asavari, Jaunpuri, Darbari Kanada, Adana, Gandhari"
  },
  {
    name: "Todi",
    sanskrit: "तोड़ी",
    scale: "Sa Re(k) Ga(k) Ma(t) Pa Dha(k) Ni",
    alteration: "Komal Re, Ga & Dha; Tivra Ma",
    time: "Morning",
    color: "#b080e0",
    description: "The most ornate of the ten thaats and arguably the most harmonically complex scale in Hindustani music. Todi combines three komal swaras (Re, Ga, Dha) with a tivra Ma — the only thaat to use both a flattened and a sharpened note. The tivra Ma creates an extraordinary tension as it pulls upward against the komal swaras surrounding it. This concentration of alteration demands slow, deliberate performance and elaborate ornamentation; Todi raags cannot be rushed. The supreme Todi raag (Miyan ki Todi) is often called the most complete raag in the tradition.",
    raags: "Miyan ki Todi, Gurjari Todi, Multani, Shuddha Todi, Madhuvanti"
  },
  {
    name: "Purvi",
    sanskrit: "पूर्वी",
    scale: "Sa Re(k) Ga Ma(t) Pa Dha(k) Ni",
    alteration: "Komal Re & Dha; Tivra Ma",
    time: "Sunset",
    color: "#c87040",
    description: "Purvi thaat uses komal Re, tivra Ma, and komal Dha, creating a scale of profound twilight tension. The tivra Ma sits at the center of the scale, pulling against the komal swaras on either side, while the shuddha Ga provides an unexpected brightness that intensifies the surrounding shadows. The result is a scale perfectly suited to the sunset hour — poised between two worlds, neither resolving upward nor settling downward. Purvi raags carry an atmosphere of austere contemplation and spiritual urgency.",
    raags: "Purvi, Shree, Puriya Dhanashri, Basant, Paraj, Lalit, Lalita Gauri"
  },
  {
    name: "Marwa",
    sanskrit: "मारवा",
    scale: "Sa Re(k) Ga Ma(t) Dha Ni",
    alteration: "Komal Re; Tivra Ma (Pa omitted in most Marwa raags)",
    time: "Sunset",
    color: "#2a8a7a",
    description: "The most psychologically unsettled of the ten thaats, Marwa's defining characteristic is not an alteration but an omission: Pa, the most grounding and stabilizing of all swaras, is absent from Marwa itself and from most of its raags (Bhatiyar is the exception). Combined with komal Re and tivra Ma, this creates a scale without any stable anchor — the music reaches in all directions without finding rest. The tension between komal Re at the bottom and tivra Ma in the middle, with no Pa to mediate, is the sonic embodiment of suspension and incompleteness. Marwa is the thaat of restless twilight.",
    raags: "Marwa, Puriya, Sohini, Bhatiyar, Puriya Kalyan"
  },
];
