// Coverage checks for recommend.js. Run: node test-recommend.js
const fs = require('fs');
const vm = require('vm');

const ctx = { module: { exports: {} }, console };
vm.createContext(ctx);
for (const f of ['data.js', 'info.js', 'recommend.js']) vm.runInContext(fs.readFileSync(f, 'utf8'), ctx);
vm.runInContext('this.raags = raags; this.raagDetails = raagDetails; this.rasInfo = rasInfo; this.thaatInfo = thaatInfo;', ctx);
const R = ctx.module.exports;
const raags = ctx.raags;

let failures = 0;
function check(cond, msg) {
  if (!cond) { failures++; console.log('FAIL', msg); }
}

const KNOWN_TIMES = new Set([...R.BUCKETS, 'Any']);
const KNOWN_SEASONS = new Set(['Any', 'Spring', 'Summer', 'Monsoon', 'Autumn', 'Winter']);
const thaatNames = new Set(ctx.thaatInfo.map(t => t.name));
const rasNames = new Set(ctx.rasInfo.map(r => r.name));

for (const r of raags) {
  check(KNOWN_TIMES.has(R.normalizeTime(r.time)), `${r.name}: unknown time "${r.time}"`);
  check(KNOWN_SEASONS.has(r.season), `${r.name}: unknown season "${r.season}"`);
  check(thaatNames.has(r.thaat) || r.thaat === 'Mixed', `${r.name}: no thaatInfo for "${r.thaat}"`);
  for (const s of r.ras) check(rasNames.has(s), `${r.name}: no rasInfo for "${s}"`);
  check(ctx.raagDetails[r.name], `${r.name}: no raagDetails entry`);
}

for (let h = 0; h < 24; h++) check(R.BUCKETS.includes(R.bucketForHour(h)), `hour ${h} has no bucket`);

for (const b of R.BUCKETS) {
  const pool = R.buildPool(raags, b);
  const feelings = R.feelingsFor(pool);
  check(feelings.length > 0, `${b}: no feelings`);
  for (const f of feelings) {
    for (const season of KNOWN_SEASONS) {
      check(R.rank(pool, new Set([f.ras]), season).length > 0, `${b}/${f.word}/${season}: no raag`);
    }
  }
  // every pairing of two feelings still yields something
  for (const a of feelings) for (const c of feelings) {
    check(R.rank(pool, new Set([a.ras, c.ras]), 'Any').length > 0, `${b}/${a.word}+${c.word}: no raag`);
  }
  console.log(b.padEnd(11), 'pool', String(pool.length).padStart(3), 'feelings', feelings.length);
}

// season rules
check(R.seasonFromWeather({ temperature: 24, precipitation: 0.4, weatherCode: 61 }, 8) === 'Monsoon', 'rain → Monsoon');
check(R.seasonFromWeather({ temperature: 24, precipitation: 0, weatherCode: 95 }, 8) === 'Monsoon', 'thunder code → Monsoon');
check(R.seasonFromWeather({ temperature: 34, precipitation: 0, weatherCode: 0 }, 3) === 'Summer', 'hot → Summer');
check(R.seasonFromWeather({ temperature: 5, precipitation: 0, weatherCode: 0 }, 0) === 'Winter', 'cold → Winter');
check(R.seasonFromWeather({ temperature: 20, precipitation: 0, weatherCode: 1 }, 10) === 'Autumn', 'mild Nov → Autumn');
check(R.seasonFromMonth(1) === 'Spring' && R.seasonFromMonth(5) === 'Summer' && R.seasonFromMonth(8) === 'Monsoon'
  && R.seasonFromMonth(10) === 'Autumn' && R.seasonFromMonth(11) === 'Winter', 'month table');
check(R.seasonFromMonth(0, -30) === 'Monsoon', 'southern January → Monsoon');

// ranking order: matched count beats tier, season match beats Any
const evening = R.buildPool(raags, 'Evening');
const top = R.rank(evening, new Set(['Shringar']), 'Any', () => 0.5)[0];
check(top.tier === 0 && top.raag.ras[0] === 'Shringar', 'top Evening/Shringar is a tier-0 primary match');
const monsoonNight = R.rank(R.buildPool(raags, 'Night'), new Set(['Shringar', 'Karuna']), 'Monsoon', () => 0.5);
check(monsoonNight[0].matched === 2 && monsoonNight[0].seasonRank === 0, 'Night/Shringar+Karuna/Monsoon ranks Des or Desh first');

console.log(failures ? `${failures} failure(s)` : 'all checks passed');
process.exit(failures ? 1 : 0);
