const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require('@google/generative-ai');

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: 'user',
      parts: [
        {
          text: 'Create kids story on description for 5-8 Years kids, Educational story, and all images in styte: Paper, story of boy and Magic School, give me 5 chapters, with deailed image text prompt for each of chapter and image prompt for story cover book with story name, all in JSON field format. Translate to Slovak language.',
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: '```json\n{\n  "story_cover": {\n    "image_prompt": "Papierová ilustrácia chlapca s veľkým úsmevom, ktorý má na sebe jasne modrý batoh a čarovný klobúk, stojaci pred magickou školou. Škola je vyrobená z papiera, s farebnými oknami a obrovským lízankovým znakom, na ktorom je napísané „Magická škola“. Obloha je plná víriacich hviezd a dúhy, všetko vyrezané z papiera.",\n    "story_name": "Chlapec, ktorý našiel Magickú školu"\n  },\n  "chapters": [\n    {\n      "chapter_title": "Deň ako žiadny iný",\n      "chapter_text": "Kedysi dávno žil chlapec menom Leo, ktorý miloval objavovanie. Jedného slnečného rána sa ocitol v lese, ktorý nikdy predtým nevidel. Ako kráčal, vzduch sa stal sladkým a počul slabé šepoty. Leo nahliadol do medzery v stromoch a uvidel školu, ktorá sa nelíšila od žiadnej inej. Ale niečo na nej bolo zvláštne, svietilo to nezvyčajným svetlom.",\n      "image_prompt": "Papierová ilustrácia Lea, chlapca s hnedými vlasmi a zvedavými očami, ktorý sa pozerá na fantastickú školu. Škola je postavená z papiera, s oknami z farebného papiera a strechou z vlnitého papiera. Nad vchodom visí rozmarný nápis s nápisom „Magická škola“, tiež vyrobený z papiera.",\n      "educational_note": "Objavovanie nových miest môže byť vzrušujúce! Je dôležité zostať zvedavým a sledovať okolie, aby ste nepremeškali dobrodružstvá."\n    },\n    {\n      "chapter_title": "Magický vchod",\n      "chapter_text": "Leo kráčal smerom k škole a cítil v sebe chvenie vzrušenia. Uvidel dvere vyrobené z lesklého papiera a kľučku v tvare hviezdy, tiež z papiera. Otočil kľučkou a dvere sa s magickým „puk“ otvorili. Vo vnútri bola škola plná úžasných vecí - stoly a stoličky z papiera, knihy z papiera, a dokonca aj  magické zvieratá z papiera!",\n      "image_prompt": "Papierová ilustrácia Lea, stojaceho pred dverami z lesklého papiera. Dvere majú kľučku v tvare hviezdy, tiež z papiera, a keď Leo otvorí, vybuchnú z nich farebné papierové konfety, odhaľujúc školu plnú magických tvorov a predmetov z papiera.",\n      "educational_note": "Niekedy sú tie najmagickejšie miesta skryté na očiach. Je dôležité byť otvorený novým zážitkom."\n    },\n    {\n      "chapter_title": "Učenie s mágiou",\n      "chapter_text": "V Magickej škole sa Leo naučil vznášať papierové lietadla mávnutím ruky, zmeniť papierový obrúsok na papierovú kvetinu a rozprávať sa s papierovou sovou! Naučil sa o rôznych druhoch mágie, od rozkvitnutia papierových kvetov až po premenu papierového draka na živého. Dokonca sa naučil lietať na papierovom oblaku!",\n      "image_prompt": "Papierová ilustrácia Lea v Magickej škole obklopeného magickými tvormi a predmetmi z papiera. Učí sa rozkvitnúť papierovú kvetinu pomocou magického kúzla a priateľská papierová sova sedí na jeho pleci. V pozadí je papierový oblak v tvare dúhy a miestnosť je plná farebnej, víriacej mágie.",\n      "educational_note": "Učenie môže byť zábavné a vzrušujúce! Na svete je veľa vecí na objavovanie a mágiu nájdeš v bežných veciach, aj v papieri!"\n    },\n    {\n      "chapter_title": "Zdieľanie mágie",\n      "chapter_text": "Leo miloval Magickú školu tak veľmi, že sa chcel podeliť o jej zázraky so svojimi priateľmi. Rozhodol sa ich naučiť pár jednoduchých kúzla, ktoré sa naučil. Ukázal im, ako roztancovať papierový motýľ a ako sa rozprávať s papierovým vetrom. Jeho priatelia boli ohromení a nadšení, že sa môžu dozvedieť o mágii a o tom, aké zázračné je papier!"\n      "image_prompt": "Papierová ilustrácia Lea, ktorý učí svojich priateľov mágiu. Stojí v parku obklopený svojimi priateľmi. Jeden priateľ tancuje s papierovým motýľom, ďalší sa rozpráva s papierovým vetrom a ďalší sa snaží rozkvitnúť papierovú kvetinu. Obloha je plná víriacich hviezd a dúhy, všetko z papiera.",\n      "educational_note": "Zdieľanie vedomostí a zážitkov je dôležité. Pomáha nám rásť a učiť sa spoločne."\n    },\n    {\n      "chapter_title": "Mágia v nás",\n      "chapter_text": "Leo si uvedomil, že mágia nie je len o kúzlach a lektvaroch, ale aj o tom, ako tvorivo a s fantáziou využívať papier a všetko okolo nás. Vedel, že môže využiť mágiu, ktorú sa naučil, aby zmenil svet na lepšie miesto, jedným aktom láskavosti po druhom.",\n      "image_prompt": "Papierová ilustrácia Lea stojaceho pred veľkým srdcom z kvetov vyrobených z farebného papiera. Srdce žiari jemným svetlom a lietajú okolo neho malé magické tvory z papiera. Leo má na tvári široký úsmev a v ruke drží papierovú kvetinu. Pozadie ukazuje pokojný les s vtákmi, ktoré spievajú v korunách stromov, všetko z papiera.",\n      "educational_note": "Mágiu nájdeš v každodennom živote a v bežných veciach, ako je papier. Buď láskavý k druhým, používaj svoju fantáziu a ver v seba."\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});
