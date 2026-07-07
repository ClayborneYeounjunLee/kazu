window.__KAZU_DATA = (function(){
/* kazu-duo-data.js
   카즈 v1(kazu/숫자_암기카드.html)에서 그대로 이식한 데이터 · 유틸 모듈.
   숫자·조수사·날짜 데이터(270장 · 24파트), KO/EN 번역, 파트 그룹, 복습 기준, 데모 프로필 생성기.
   카드: { num(문제면 표기), kanji, kana(읽기=정답면), roma, kor, note } + buildPools가 {cat, part, key} 부여
   key = part + ":" + num — stats/기록의 키 (v1과 동일해 기존 사용자 기록이 그대로 이어짐) */

const DATA = {
  /* ── 숫자 ── */
  kihon: [
    {num:"0",kanji:"零",kana:"ゼロ",roma:"zero",kor:"제로",note:"れい로도 읽음"},
    {num:"1",kanji:"一",kana:"いち",roma:"ichi",kor:"이치",note:""},
    {num:"2",kanji:"二",kana:"に",roma:"ni",kor:"니",note:""},
    {num:"3",kanji:"三",kana:"さん",roma:"san",kor:"산",note:""},
    {num:"4",kanji:"四",kana:"よん",roma:"yon",kor:"욘",note:"し로도 읽음"},
    {num:"5",kanji:"五",kana:"ご",roma:"go",kor:"고",note:""},
    {num:"6",kanji:"六",kana:"ろく",roma:"roku",kor:"로쿠",note:""},
    {num:"7",kanji:"七",kana:"なな",roma:"nana",kor:"나나",note:"しち로도 읽음"},
    {num:"8",kanji:"八",kana:"はち",roma:"hachi",kor:"하치",note:""},
    {num:"9",kanji:"九",kana:"きゅう",roma:"kyuu",kor:"큐",note:"く로도 읽음"},
    {num:"10",kanji:"十",kana:"じゅう",roma:"juu",kor:"주",note:""}
  ],
  juu: [
    {num:"11",kanji:"十一",kana:"じゅういち",roma:"juuichi",kor:"주이치",note:""},
    {num:"15",kanji:"十五",kana:"じゅうご",roma:"juugo",kor:"주고",note:""},
    {num:"20",kanji:"二十",kana:"にじゅう",roma:"nijuu",kor:"니주",note:""},
    {num:"24",kanji:"二十四",kana:"にじゅうよん",roma:"nijuuyon",kor:"니주욘",note:"4는 し로도 읽음"},
    {num:"30",kanji:"三十",kana:"さんじゅう",roma:"sanjuu",kor:"산주",note:""},
    {num:"38",kanji:"三十八",kana:"さんじゅうはち",roma:"sanjuuhachi",kor:"산주하치",note:""},
    {num:"40",kanji:"四十",kana:"よんじゅう",roma:"yonjuu",kor:"욘주",note:"し로도 읽음(しじゅう)"},
    {num:"50",kanji:"五十",kana:"ごじゅう",roma:"gojuu",kor:"고주",note:""},
    {num:"60",kanji:"六十",kana:"ろくじゅう",roma:"rokujuu",kor:"로쿠주",note:""},
    {num:"70",kanji:"七十",kana:"ななじゅう",roma:"nanajuu",kor:"나나주",note:"しちじゅう로도 읽음"},
    {num:"80",kanji:"八十",kana:"はちじゅう",roma:"hachijuu",kor:"하치주",note:""},
    {num:"90",kanji:"九十",kana:"きゅうじゅう",roma:"kyuujuu",kor:"큐주",note:""},
    {num:"99",kanji:"九十九",kana:"きゅうじゅうきゅう",roma:"kyuujuukyuu",kor:"큐주큐",note:""}
  ],
  hyaku: [
    {num:"100",kanji:"百",kana:"ひゃく",roma:"hyaku",kor:"햐쿠",note:""},
    {num:"200",kanji:"二百",kana:"にひゃく",roma:"nihyaku",kor:"니햐쿠",note:""},
    {num:"300",kanji:"三百",kana:"さんびゃく",roma:"sanbyaku",kor:"산뱌쿠",note:"발음 변화 (ひゃく→びゃく)"},
    {num:"400",kanji:"四百",kana:"よんひゃく",roma:"yonhyaku",kor:"욘햐쿠",note:""},
    {num:"500",kanji:"五百",kana:"ごひゃく",roma:"gohyaku",kor:"고햐쿠",note:""},
    {num:"600",kanji:"六百",kana:"ろっぴゃく",roma:"roppyaku",kor:"롭퍄쿠",note:"발음 변화 (촉음+ひゃく→ぴゃく)"},
    {num:"700",kanji:"七百",kana:"ななひゃく",roma:"nanahyaku",kor:"나나햐쿠",note:""},
    {num:"800",kanji:"八百",kana:"はっぴゃく",roma:"happyaku",kor:"핫퍄쿠",note:"발음 변화 (촉음+ひゃく→ぴゃく)"},
    {num:"900",kanji:"九百",kana:"きゅうひゃく",roma:"kyuuhyaku",kor:"큐햐쿠",note:""}
  ],
  sen: [
    {num:"1000",kanji:"千",kana:"せん",roma:"sen",kor:"센",note:"いっせん이 아니라 せん"},
    {num:"2000",kanji:"二千",kana:"にせん",roma:"nisen",kor:"니센",note:""},
    {num:"3000",kanji:"三千",kana:"さんぜん",roma:"sanzen",kor:"산젠",note:"발음 변화 (せん→ぜん)"},
    {num:"4000",kanji:"四千",kana:"よんせん",roma:"yonsen",kor:"욘센",note:"よん으로 읽음"},
    {num:"5000",kanji:"五千",kana:"ごせん",roma:"gosen",kor:"고센",note:""},
    {num:"6000",kanji:"六千",kana:"ろくせん",roma:"rokusen",kor:"로쿠센",note:""},
    {num:"7000",kanji:"七千",kana:"ななせん",roma:"nanasen",kor:"나나센",note:"なな로 읽음"},
    {num:"8000",kanji:"八千",kana:"はっせん",roma:"hassen",kor:"핫센",note:"발음 변화 (촉음 っ)"},
    {num:"9000",kanji:"九千",kana:"きゅうせん",roma:"kyuusen",kor:"큐우센",note:"きゅう 장음"}
  ],
  man: [
    {num:"10000",kanji:"一万",kana:"いちまん",roma:"ichiman",kor:"이치만",note:"★반드시 いち 붙임 (만은 일만으로 읽음)"},
    {num:"12345",kanji:"一万二千三百四十五",kana:"いちまんにせんさんびゃくよんじゅうご",roma:"ichiman nisen sanbyaku yonjuugo",kor:"이치만 니센 산뱌쿠 욘주고",note:"혼합 예시; 三百 さんびゃく 발음 변화, 4는 よん"},
    {num:"100000",kanji:"十万",kana:"じゅうまん",roma:"juuman",kor:"쥬만",note:""},
    {num:"1000000",kanji:"百万",kana:"ひゃくまん",roma:"hyakuman",kor:"햐쿠만",note:""},
    {num:"10000000",kanji:"千万",kana:"せんまん",roma:"senman",kor:"센만",note:""},
    {num:"100000000",kanji:"一億",kana:"いちおく",roma:"ichioku",kor:"이치오쿠",note:"억; 반드시 いち 붙임"}
  ],
  /* ── 조수사 ── */
  tsu: [
    {num:"1つ",kanji:"一つ",kana:"ひとつ",roma:"hitotsu",kor:"히토츠",note:""},
    {num:"2つ",kanji:"二つ",kana:"ふたつ",roma:"futatsu",kor:"후타츠",note:""},
    {num:"3つ",kanji:"三つ",kana:"みっつ",roma:"mittsu",kor:"밋츠",note:"발음 변화"},
    {num:"4つ",kanji:"四つ",kana:"よっつ",roma:"yottsu",kor:"욧츠",note:"발음 변화"},
    {num:"5つ",kanji:"五つ",kana:"いつつ",roma:"itsutsu",kor:"이츠츠",note:""},
    {num:"6つ",kanji:"六つ",kana:"むっつ",roma:"muttsu",kor:"뭇츠",note:"발음 변화"},
    {num:"7つ",kanji:"七つ",kana:"ななつ",roma:"nanatsu",kor:"나나츠",note:""},
    {num:"8つ",kanji:"八つ",kana:"やっつ",roma:"yattsu",kor:"얏츠",note:"발음 변화"},
    {num:"9つ",kanji:"九つ",kana:"ここのつ",roma:"kokonotsu",kor:"코코노츠",note:""},
    {num:"10",kanji:"十",kana:"とお",roma:"too",kor:"토오",note:"つ 없음, 특수 읽기"},
    {num:"いくつ",kanji:"幾つ",kana:"いくつ",roma:"ikutsu",kor:"이쿠츠",note:"몇 개"}
  ],
  ko: [
    {num:"1個",kanji:"一個",kana:"いっこ",roma:"ikko",kor:"익코",note:"발음 변화(促音)"},
    {num:"2個",kanji:"二個",kana:"にこ",roma:"niko",kor:"니코",note:""},
    {num:"3個",kanji:"三個",kana:"さんこ",roma:"sanko",kor:"산코",note:""},
    {num:"4個",kanji:"四個",kana:"よんこ",roma:"yonko",kor:"욘코",note:""},
    {num:"5個",kanji:"五個",kana:"ごこ",roma:"goko",kor:"고코",note:""},
    {num:"6個",kanji:"六個",kana:"ろっこ",roma:"rokko",kor:"록코",note:"발음 변화(促音)"},
    {num:"7個",kanji:"七個",kana:"ななこ",roma:"nanako",kor:"나나코",note:"보통 なな로 읽음"},
    {num:"8個",kanji:"八個",kana:"はっこ",roma:"hakko",kor:"학코",note:"발음 변화(促音)"},
    {num:"9個",kanji:"九個",kana:"きゅうこ",roma:"kyuuko",kor:"큐코",note:""},
    {num:"10個",kanji:"十個",kana:"じゅっこ",roma:"jukko",kor:"죽코",note:"じっこ로도 읽음, 발음 변화(促音)"},
    {num:"なん個",kanji:"何個",kana:"なんこ",roma:"nanko",kor:"난코",note:"의문사"}
  ],
  nin: [
    {num:"1人",kanji:"一人",kana:"ひとり",roma:"hitori",kor:"히토리",note:"특수 읽기"},
    {num:"2人",kanji:"二人",kana:"ふたり",roma:"futari",kor:"후타리",note:"특수 읽기"},
    {num:"3人",kanji:"三人",kana:"さんにん",roma:"sannin",kor:"산닌",note:""},
    {num:"4人",kanji:"四人",kana:"よにん",roma:"yonin",kor:"요닌",note:"특수 읽기 (よ로 읽음)"},
    {num:"5人",kanji:"五人",kana:"ごにん",roma:"gonin",kor:"고닌",note:""},
    {num:"6人",kanji:"六人",kana:"ろくにん",roma:"rokunin",kor:"로쿠닌",note:""},
    {num:"7人",kanji:"七人",kana:"しちにん",roma:"shichinin",kor:"시치닌",note:"ななにん으로도 읽음"},
    {num:"8人",kanji:"八人",kana:"はちにん",roma:"hachinin",kor:"하치닌",note:""},
    {num:"9人",kanji:"九人",kana:"きゅうにん",roma:"kyuunin",kor:"큐닌",note:"くにん으로도 읽음"},
    {num:"10人",kanji:"十人",kana:"じゅうにん",roma:"juunin",kor:"주닌",note:""},
    {num:"なん人",kanji:"何人",kana:"なんにん",roma:"nannin",kor:"난닌",note:"의문사"}
  ],
  hon: [
    {num:"1本",kanji:"一本",kana:"いっぽん",roma:"ippon",kor:"입폰",note:"발음 변화"},
    {num:"2本",kanji:"二本",kana:"にほん",roma:"nihon",kor:"니혼",note:""},
    {num:"3本",kanji:"三本",kana:"さんぼん",roma:"sanbon",kor:"삼본",note:"발음 변화"},
    {num:"4本",kanji:"四本",kana:"よんほん",roma:"yonhon",kor:"욘혼",note:""},
    {num:"5本",kanji:"五本",kana:"ごほん",roma:"gohon",kor:"고혼",note:""},
    {num:"6本",kanji:"六本",kana:"ろっぽん",roma:"roppon",kor:"롭폰",note:"발음 변화"},
    {num:"7本",kanji:"七本",kana:"ななほん",roma:"nanahon",kor:"나나혼",note:""},
    {num:"8本",kanji:"八本",kana:"はっぽん",roma:"happon",kor:"합폰",note:"발음 변화"},
    {num:"9本",kanji:"九本",kana:"きゅうほん",roma:"kyuuhon",kor:"큐혼",note:""},
    {num:"10本",kanji:"十本",kana:"じゅっぽん",roma:"juppon",kor:"줍폰",note:"발음 변화; じっぽん으로도 읽음"},
    {num:"なん本",kanji:"何本",kana:"なんぼん",roma:"nanbon",kor:"난본",note:"발음 변화"}
  ],
  mai: [
    {num:"1枚",kanji:"一枚",kana:"いちまい",roma:"ichimai",kor:"이치마이",note:""},
    {num:"2枚",kanji:"二枚",kana:"にまい",roma:"nimai",kor:"니마이",note:""},
    {num:"3枚",kanji:"三枚",kana:"さんまい",roma:"sanmai",kor:"삼마이",note:""},
    {num:"4枚",kanji:"四枚",kana:"よんまい",roma:"yonmai",kor:"욘마이",note:""},
    {num:"5枚",kanji:"五枚",kana:"ごまい",roma:"gomai",kor:"고마이",note:""},
    {num:"6枚",kanji:"六枚",kana:"ろくまい",roma:"rokumai",kor:"로쿠마이",note:""},
    {num:"7枚",kanji:"七枚",kana:"ななまい",roma:"nanamai",kor:"나나마이",note:"しち로도 읽음"},
    {num:"8枚",kanji:"八枚",kana:"はちまい",roma:"hachimai",kor:"하치마이",note:""},
    {num:"9枚",kanji:"九枚",kana:"きゅうまい",roma:"kyuumai",kor:"큐마이",note:""},
    {num:"10枚",kanji:"十枚",kana:"じゅうまい",roma:"juumai",kor:"주마이",note:""},
    {num:"なん枚",kanji:"何枚",kana:"なんまい",roma:"nanmai",kor:"남마이",note:"의문사"}
  ],
  hiki: [
    {num:"1匹",kanji:"一匹",kana:"いっぴき",roma:"ippiki",kor:"입피키",note:"발음 변화"},
    {num:"2匹",kanji:"二匹",kana:"にひき",roma:"nihiki",kor:"니히키",note:""},
    {num:"3匹",kanji:"三匹",kana:"さんびき",roma:"sanbiki",kor:"삼비키",note:"발음 변화"},
    {num:"4匹",kanji:"四匹",kana:"よんひき",roma:"yonhiki",kor:"욘히키",note:""},
    {num:"5匹",kanji:"五匹",kana:"ごひき",roma:"gohiki",kor:"고히키",note:""},
    {num:"6匹",kanji:"六匹",kana:"ろっぴき",roma:"roppiki",kor:"롭피키",note:"발음 변화"},
    {num:"7匹",kanji:"七匹",kana:"ななひき",roma:"nanahiki",kor:"나나히키",note:"しちひき로도 읽음"},
    {num:"8匹",kanji:"八匹",kana:"はっぴき",roma:"happiki",kor:"합피키",note:"발음 변화"},
    {num:"9匹",kanji:"九匹",kana:"きゅうひき",roma:"kyuuhiki",kor:"큐히키",note:""},
    {num:"10匹",kanji:"十匹",kana:"じゅっぴき",roma:"juppiki",kor:"줍피키",note:"발음 변화; じっぴき로도 읽음"},
    {num:"なん匹",kanji:"何匹",kana:"なんびき",roma:"nanbiki",kor:"남비키",note:"발음 변화"}
  ],
  dai: [
    {num:"1台",kanji:"一台",kana:"いちだい",roma:"ichidai",kor:"이치다이",note:""},
    {num:"2台",kanji:"二台",kana:"にだい",roma:"nidai",kor:"니다이",note:""},
    {num:"3台",kanji:"三台",kana:"さんだい",roma:"sandai",kor:"산다이",note:""},
    {num:"4台",kanji:"四台",kana:"よんだい",roma:"yondai",kor:"욘다이",note:""},
    {num:"5台",kanji:"五台",kana:"ごだい",roma:"godai",kor:"고다이",note:""},
    {num:"6台",kanji:"六台",kana:"ろくだい",roma:"rokudai",kor:"로쿠다이",note:""},
    {num:"7台",kanji:"七台",kana:"ななだい",roma:"nanadai",kor:"나나다이",note:""},
    {num:"8台",kanji:"八台",kana:"はちだい",roma:"hachidai",kor:"하치다이",note:""},
    {num:"9台",kanji:"九台",kana:"きゅうだい",roma:"kyuudai",kor:"큐다이",note:""},
    {num:"10台",kanji:"十台",kana:"じゅうだい",roma:"juudai",kor:"주다이",note:""},
    {num:"なん台",kanji:"何台",kana:"なんだい",roma:"nandai",kor:"난다이",note:"의문사 (기계·차량)"}
  ],
  satsu: [
    {num:"1冊",kanji:"一冊",kana:"いっさつ",roma:"issatsu",kor:"잇사츠",note:"발음 변화(促音)"},
    {num:"2冊",kanji:"二冊",kana:"にさつ",roma:"nisatsu",kor:"니사츠",note:""},
    {num:"3冊",kanji:"三冊",kana:"さんさつ",roma:"sansatsu",kor:"산사츠",note:""},
    {num:"4冊",kanji:"四冊",kana:"よんさつ",roma:"yonsatsu",kor:"욘사츠",note:""},
    {num:"5冊",kanji:"五冊",kana:"ごさつ",roma:"gosatsu",kor:"고사츠",note:""},
    {num:"6冊",kanji:"六冊",kana:"ろくさつ",roma:"rokusatsu",kor:"로쿠사츠",note:""},
    {num:"7冊",kanji:"七冊",kana:"ななさつ",roma:"nanasatsu",kor:"나나사츠",note:""},
    {num:"8冊",kanji:"八冊",kana:"はっさつ",roma:"hassatsu",kor:"핫사츠",note:"발음 변화(促音); はちさつ로도 읽음"},
    {num:"9冊",kanji:"九冊",kana:"きゅうさつ",roma:"kyuusatsu",kor:"큐사츠",note:""},
    {num:"10冊",kanji:"十冊",kana:"じゅっさつ",roma:"jussatsu",kor:"줏사츠",note:"발음 변화(促音); じっさつ로도 읽음"},
    {num:"なん冊",kanji:"何冊",kana:"なんさつ",roma:"nansatsu",kor:"난사츠",note:"의문사 (책)"}
  ],
  sai: [
    {num:"1歳",kanji:"一歳",kana:"いっさい",roma:"issai",kor:"잇사이",note:"발음 변화(促音)"},
    {num:"2歳",kanji:"二歳",kana:"にさい",roma:"nisai",kor:"니사이",note:""},
    {num:"3歳",kanji:"三歳",kana:"さんさい",roma:"sansai",kor:"산사이",note:""},
    {num:"4歳",kanji:"四歳",kana:"よんさい",roma:"yonsai",kor:"욘사이",note:"し가 아닌 よん"},
    {num:"5歳",kanji:"五歳",kana:"ごさい",roma:"gosai",kor:"고사이",note:""},
    {num:"6歳",kanji:"六歳",kana:"ろくさい",roma:"rokusai",kor:"로쿠사이",note:""},
    {num:"7歳",kanji:"七歳",kana:"ななさい",roma:"nanasai",kor:"나나사이",note:"しち로도 읽음"},
    {num:"8歳",kanji:"八歳",kana:"はっさい",roma:"hassai",kor:"핫사이",note:"발음 변화(促音)"},
    {num:"9歳",kanji:"九歳",kana:"きゅうさい",roma:"kyuusai",kor:"큐사이",note:""},
    {num:"10歳",kanji:"十歳",kana:"じゅっさい",roma:"jussai",kor:"줏사이",note:"발음 변화(促音); じっさい로도 읽음"},
    {num:"20歳",kanji:"二十歳",kana:"はたち",roma:"hatachi",kor:"하타치",note:"특수 읽기(熟字訓)"},
    {num:"なん歳",kanji:"何歳",kana:"なんさい",roma:"nansai",kor:"난사이",note:"의문사; おいくつ로도 물음"}
  ],
  hai: [
    {num:"1杯",kanji:"一杯",kana:"いっぱい",roma:"ippai",kor:"입빠이",note:"발음 변화 (促音+半濁音)"},
    {num:"2杯",kanji:"二杯",kana:"にはい",roma:"nihai",kor:"니하이",note:""},
    {num:"3杯",kanji:"三杯",kana:"さんばい",roma:"sanbai",kor:"삼바이",note:"발음 변화 (連濁)"},
    {num:"4杯",kanji:"四杯",kana:"よんはい",roma:"yonhai",kor:"욘하이",note:""},
    {num:"5杯",kanji:"五杯",kana:"ごはい",roma:"gohai",kor:"고하이",note:""},
    {num:"6杯",kanji:"六杯",kana:"ろっぱい",roma:"roppai",kor:"롭빠이",note:"발음 변화 (促音+半濁音)"},
    {num:"7杯",kanji:"七杯",kana:"ななはい",roma:"nanahai",kor:"나나하이",note:""},
    {num:"8杯",kanji:"八杯",kana:"はっぱい",roma:"happai",kor:"합빠이",note:"발음 변화 (促音+半濁音)"},
    {num:"9杯",kanji:"九杯",kana:"きゅうはい",roma:"kyuuhai",kor:"큐우하이",note:""},
    {num:"10杯",kanji:"十杯",kana:"じゅっぱい",roma:"juppai",kor:"줍빠이",note:"발음 변화; じっぱい로도 읽음"},
    {num:"なん杯",kanji:"何杯",kana:"なんばい",roma:"nanbai",kor:"남바이",note:"발음 변화 (連濁)"}
  ],
  kai_floor: [
    {num:"1階",kanji:"一階",kana:"いっかい",roma:"ikkai",kor:"익카이",note:"발음 변화"},
    {num:"2階",kanji:"二階",kana:"にかい",roma:"nikai",kor:"니카이",note:""},
    {num:"3階",kanji:"三階",kana:"さんがい",roma:"sangai",kor:"산가이",note:"발음 변화; さんかい로도 읽음"},
    {num:"4階",kanji:"四階",kana:"よんかい",roma:"yonkai",kor:"욘카이",note:""},
    {num:"5階",kanji:"五階",kana:"ごかい",roma:"gokai",kor:"고카이",note:""},
    {num:"6階",kanji:"六階",kana:"ろっかい",roma:"rokkai",kor:"록카이",note:"발음 변화"},
    {num:"7階",kanji:"七階",kana:"ななかい",roma:"nanakai",kor:"나나카이",note:""},
    {num:"8階",kanji:"八階",kana:"はっかい",roma:"hakkai",kor:"학카이",note:"발음 변화; はちかい로도 읽음"},
    {num:"9階",kanji:"九階",kana:"きゅうかい",roma:"kyuukai",kor:"큐카이",note:""},
    {num:"10階",kanji:"十階",kana:"じゅっかい",roma:"jukkai",kor:"죽카이",note:"발음 변화; じっかい로도 읽음"},
    {num:"なん階",kanji:"何階",kana:"なんがい",roma:"nangai",kor:"난가이",note:"발음 변화"}
  ],
  kaicnt: [
    {num:"1回",kanji:"一回",kana:"いっかい",roma:"ikkai",kor:"익카이",note:"발음 변화(促音)"},
    {num:"2回",kanji:"二回",kana:"にかい",roma:"nikai",kor:"니카이",note:""},
    {num:"3回",kanji:"三回",kana:"さんかい",roma:"sankai",kor:"산카이",note:""},
    {num:"4回",kanji:"四回",kana:"よんかい",roma:"yonkai",kor:"욘카이",note:""},
    {num:"5回",kanji:"五回",kana:"ごかい",roma:"gokai",kor:"고카이",note:""},
    {num:"6回",kanji:"六回",kana:"ろっかい",roma:"rokkai",kor:"록카이",note:"발음 변화(促音)"},
    {num:"7回",kanji:"七回",kana:"ななかい",roma:"nanakai",kor:"나나카이",note:""},
    {num:"8回",kanji:"八回",kana:"はっかい",roma:"hakkai",kor:"학카이",note:"발음 변화(促音); はちかい로도 읽음"},
    {num:"9回",kanji:"九回",kana:"きゅうかい",roma:"kyuukai",kor:"큐카이",note:""},
    {num:"10回",kanji:"十回",kana:"じゅっかい",roma:"jukkai",kor:"죽카이",note:"발음 변화(促音); じっかい로도 읽음"},
    {num:"なん回",kanji:"何回",kana:"なんかい",roma:"nankai",kor:"난카이",note:"의문사 (몇 번)"}
  ],
  en: [
    {num:"1円",kanji:"一円",kana:"いちえん",roma:"ichien",kor:"이치엔",note:""},
    {num:"2円",kanji:"二円",kana:"にえん",roma:"nien",kor:"니엔",note:""},
    {num:"3円",kanji:"三円",kana:"さんえん",roma:"san'en",kor:"산엔",note:""},
    {num:"4円",kanji:"四円",kana:"よえん",roma:"yoen",kor:"요엔",note:"특수 읽기 (よん이 아닌 よ)"},
    {num:"5円",kanji:"五円",kana:"ごえん",roma:"goen",kor:"고엔",note:"ご縁(인연)과 발음 같음"},
    {num:"6円",kanji:"六円",kana:"ろくえん",roma:"rokuen",kor:"로쿠엔",note:""},
    {num:"7円",kanji:"七円",kana:"ななえん",roma:"nanaen",kor:"나나엔",note:"しち로도 읽음(しちえん)"},
    {num:"8円",kanji:"八円",kana:"はちえん",roma:"hachien",kor:"하치엔",note:""},
    {num:"9円",kanji:"九円",kana:"きゅうえん",roma:"kyuuen",kor:"큐엔",note:"く로는 읽지 않음"},
    {num:"10円",kanji:"十円",kana:"じゅうえん",roma:"juuen",kor:"주엔",note:""},
    {num:"100円",kanji:"百円",kana:"ひゃくえん",roma:"hyakuen",kor:"햐쿠엔",note:""},
    {num:"1000円",kanji:"千円",kana:"せんえん",roma:"sen'en",kor:"센엔",note:""},
    {num:"10000円",kanji:"一万円",kana:"いちまんえん",roma:"ichiman'en",kor:"이치만엔",note:"만은 반드시 いち를 붙임"},
    {num:"なん円",kanji:"何円",kana:"なんえん",roma:"nan'en",kor:"난엔",note:"의문사 (얼마)"}
  ],
  /* ── 날짜·시간 ── */
  gatsu: [
    {num:"1月",kanji:"一月",kana:"いちがつ",roma:"ichigatsu",kor:"이치가츠",note:""},
    {num:"2月",kanji:"二月",kana:"にがつ",roma:"nigatsu",kor:"니가츠",note:""},
    {num:"3月",kanji:"三月",kana:"さんがつ",roma:"sangatsu",kor:"산가츠",note:""},
    {num:"4月",kanji:"四月",kana:"しがつ",roma:"shigatsu",kor:"시가츠",note:"특수 읽기 (よん이 아닌 し)"},
    {num:"5月",kanji:"五月",kana:"ごがつ",roma:"gogatsu",kor:"고가츠",note:""},
    {num:"6月",kanji:"六月",kana:"ろくがつ",roma:"rokugatsu",kor:"로쿠가츠",note:""},
    {num:"7月",kanji:"七月",kana:"しちがつ",roma:"shichigatsu",kor:"시치가츠",note:"특수 읽기 (なな가 아닌 しち)"},
    {num:"8月",kanji:"八月",kana:"はちがつ",roma:"hachigatsu",kor:"하치가츠",note:""},
    {num:"9月",kanji:"九月",kana:"くがつ",roma:"kugatsu",kor:"쿠가츠",note:"특수 읽기 (きゅう가 아닌 く)"},
    {num:"10月",kanji:"十月",kana:"じゅうがつ",roma:"juugatsu",kor:"주가츠",note:""},
    {num:"11月",kanji:"十一月",kana:"じゅういちがつ",roma:"juuichigatsu",kor:"주이치가츠",note:""},
    {num:"12月",kanji:"十二月",kana:"じゅうにがつ",roma:"juunigatsu",kor:"주니가츠",note:""},
    {num:"なん月",kanji:"何月",kana:"なんがつ",roma:"nangatsu",kor:"난가츠",note:"몇 월 (의문사)"}
  ],
  nichi: [
    {num:"1日",kanji:"一日",kana:"ついたち",roma:"tsuitachi",kor:"츠이타치",note:"특수 읽기"},
    {num:"2日",kanji:"二日",kana:"ふつか",roma:"futsuka",kor:"후츠카",note:"특수 읽기"},
    {num:"3日",kanji:"三日",kana:"みっか",roma:"mikka",kor:"믹카",note:"특수 읽기"},
    {num:"4日",kanji:"四日",kana:"よっか",roma:"yokka",kor:"욕카",note:"특수 읽기"},
    {num:"5日",kanji:"五日",kana:"いつか",roma:"itsuka",kor:"이츠카",note:"특수 읽기"},
    {num:"6日",kanji:"六日",kana:"むいか",roma:"muika",kor:"무이카",note:"특수 읽기"},
    {num:"7日",kanji:"七日",kana:"なのか",roma:"nanoka",kor:"나노카",note:"특수 읽기"},
    {num:"8日",kanji:"八日",kana:"ようか",roma:"youka",kor:"요카",note:"특수 읽기 (むいか와 혼동 주의)"},
    {num:"9日",kanji:"九日",kana:"ここのか",roma:"kokonoka",kor:"코코노카",note:"특수 읽기"},
    {num:"10日",kanji:"十日",kana:"とおか",roma:"tooka",kor:"토오카",note:"특수 읽기"},
    {num:"11日",kanji:"十一日",kana:"じゅういちにち",roma:"juuichinichi",kor:"주이치니치",note:""},
    {num:"14日",kanji:"十四日",kana:"じゅうよっか",roma:"juuyokka",kor:"주욕카",note:"특수 읽기 (よっか 유지)"},
    {num:"19日",kanji:"十九日",kana:"じゅうくにち",roma:"juukunichi",kor:"주쿠니치",note:"특수 읽기 (く로 읽음)"},
    {num:"20日",kanji:"二十日",kana:"はつか",roma:"hatsuka",kor:"하츠카",note:"특수 읽기"},
    {num:"24日",kanji:"二十四日",kana:"にじゅうよっか",roma:"nijuuyokka",kor:"니주욕카",note:"특수 읽기 (よっか 유지)"},
    {num:"30日",kanji:"三十日",kana:"さんじゅうにち",roma:"sanjuunichi",kor:"산주니치",note:""},
    {num:"なん日",kanji:"何日",kana:"なんにち",roma:"nannichi",kor:"난니치",note:"며칠 (의문사)"}
  ],
  youbi: [
    {num:"月曜日",kanji:"月曜日",kana:"げつようび",roma:"getsuyoubi",kor:"게츠요비",note:"월요일"},
    {num:"火曜日",kanji:"火曜日",kana:"かようび",roma:"kayoubi",kor:"카요비",note:"화요일"},
    {num:"水曜日",kanji:"水曜日",kana:"すいようび",roma:"suiyoubi",kor:"스이요비",note:"수요일"},
    {num:"木曜日",kanji:"木曜日",kana:"もくようび",roma:"mokuyoubi",kor:"모쿠요비",note:"목요일"},
    {num:"金曜日",kanji:"金曜日",kana:"きんようび",roma:"kin'youbi",kor:"킨요비",note:"금요일"},
    {num:"土曜日",kanji:"土曜日",kana:"どようび",roma:"doyoubi",kor:"도요비",note:"토요일"},
    {num:"日曜日",kanji:"日曜日",kana:"にちようび",roma:"nichiyoubi",kor:"니치요비",note:"일요일"},
    {num:"なん曜日",kanji:"何曜日",kana:"なんようび",roma:"nan'youbi",kor:"난요비",note:"무슨 요일 (의문사)"}
  ],
  ji: [
    {num:"1時",kanji:"一時",kana:"いちじ",roma:"ichiji",kor:"이치지",note:""},
    {num:"2時",kanji:"二時",kana:"にじ",roma:"niji",kor:"니지",note:""},
    {num:"3時",kanji:"三時",kana:"さんじ",roma:"sanji",kor:"산지",note:""},
    {num:"4時",kanji:"四時",kana:"よじ",roma:"yoji",kor:"요지",note:"특수 읽기 (よん·し 아님)"},
    {num:"5時",kanji:"五時",kana:"ごじ",roma:"goji",kor:"고지",note:""},
    {num:"6時",kanji:"六時",kana:"ろくじ",roma:"rokuji",kor:"로쿠지",note:""},
    {num:"7時",kanji:"七時",kana:"しちじ",roma:"shichiji",kor:"시치지",note:"특수 읽기 (なな 아님)"},
    {num:"8時",kanji:"八時",kana:"はちじ",roma:"hachiji",kor:"하치지",note:""},
    {num:"9時",kanji:"九時",kana:"くじ",roma:"kuji",kor:"쿠지",note:"특수 읽기 (きゅう 아님)"},
    {num:"10時",kanji:"十時",kana:"じゅうじ",roma:"juuji",kor:"주지",note:""},
    {num:"11時",kanji:"十一時",kana:"じゅういちじ",roma:"juuichiji",kor:"주이치지",note:""},
    {num:"12時",kanji:"十二時",kana:"じゅうにじ",roma:"juuniji",kor:"주니지",note:""},
    {num:"なん時",kanji:"何時",kana:"なんじ",roma:"nanji",kor:"난지",note:"몇 시 (의문사)"}
  ],
  fun: [
    {num:"1分",kanji:"一分",kana:"いっぷん",roma:"ippun",kor:"입푼",note:"발음 변화 (促音+半濁音)"},
    {num:"2分",kanji:"二分",kana:"にふん",roma:"nifun",kor:"니훈",note:""},
    {num:"3分",kanji:"三分",kana:"さんぷん",roma:"sanpun",kor:"삼푼",note:"발음 변화 (半濁音)"},
    {num:"4分",kanji:"四分",kana:"よんぷん",roma:"yonpun",kor:"욤푼",note:"발음 변화 (半濁音)"},
    {num:"5分",kanji:"五分",kana:"ごふん",roma:"gofun",kor:"고훈",note:""},
    {num:"6分",kanji:"六分",kana:"ろっぷん",roma:"roppun",kor:"롭푼",note:"발음 변화 (促音+半濁音)"},
    {num:"7分",kanji:"七分",kana:"ななふん",roma:"nanafun",kor:"나나훈",note:""},
    {num:"8分",kanji:"八分",kana:"はっぷん",roma:"happun",kor:"합푼",note:"발음 변화; はちふん으로도 읽음"},
    {num:"9分",kanji:"九分",kana:"きゅうふん",roma:"kyuufun",kor:"큐훈",note:""},
    {num:"10分",kanji:"十分",kana:"じゅっぷん",roma:"juppun",kor:"줍푼",note:"발음 변화; じっぷん으로도 읽음"},
    {num:"15分",kanji:"十五分",kana:"じゅうごふん",roma:"juugofun",kor:"주고훈",note:""},
    {num:"半",kanji:"半",kana:"はん",roma:"han",kor:"한",note:"30분=半, 특수 읽기"},
    {num:"なん分",kanji:"何分",kana:"なんぷん",roma:"nanpun",kor:"남푼",note:"발음 변화 (半濁音)"}
  ],
  jikan: [
    {num:"1時間",kanji:"一時間",kana:"いちじかん",roma:"ichijikan",kor:"이치지칸",note:"소요 시간"},
    {num:"2時間",kanji:"二時間",kana:"にじかん",roma:"nijikan",kor:"니지칸",note:""},
    {num:"3時間",kanji:"三時間",kana:"さんじかん",roma:"sanjikan",kor:"산지칸",note:""},
    {num:"4時間",kanji:"四時間",kana:"よじかん",roma:"yojikan",kor:"요지칸",note:"특수 읽기 (よ로 읽음)"},
    {num:"5時間",kanji:"五時間",kana:"ごじかん",roma:"gojikan",kor:"고지칸",note:""},
    {num:"6時間",kanji:"六時間",kana:"ろくじかん",roma:"rokujikan",kor:"로쿠지칸",note:""},
    {num:"7時間",kanji:"七時間",kana:"ななじかん",roma:"nanajikan",kor:"나나지칸",note:"しちじかん으로도 읽음"},
    {num:"8時間",kanji:"八時間",kana:"はちじかん",roma:"hachijikan",kor:"하치지칸",note:""},
    {num:"9時間",kanji:"九時間",kana:"くじかん",roma:"kujikan",kor:"쿠지칸",note:"특수 읽기 (く로 읽음)"},
    {num:"10時間",kanji:"十時間",kana:"じゅうじかん",roma:"juujikan",kor:"주지칸",note:""},
    {num:"なん時間",kanji:"何時間",kana:"なんじかん",roma:"nanjikan",kor:"난지칸",note:"몇 시간 (의문사)"}
  ]
};

/* 카테고리 → 파트 구성 */
const CATS = [
  { cat:"num",      parts:["kihon","juu","hyaku","sen","man"] },
  { cat:"counter",  parts:["tsu","ko","nin","hon","mai","hiki","dai","satsu","sai","hai","kai_floor","kaicnt","en"] },
  { cat:"datetime", parts:["gatsu","nichi","youbi","ji","fun","jikan"] }
];
const ALL_PARTS = CATS.flatMap(c => c.parts);
const PART_CAT = {}; CATS.forEach(c => c.parts.forEach(p => PART_CAT[p] = c.cat));

function buildPools(){
  const pools = {};
  for (const part of ALL_PARTS){
    pools[part] = (DATA[part] || []).map(e => ({ ...e, cat:PART_CAT[part], part, key: part + ":" + e.num }));
  }
  return pools;
}
let POOLS = buildPools();
let FULL_POOL = Object.values(POOLS).flat();

/* ═════════ 비고 번역 (EN 모드) — DATA의 모든 고유 note 값 수록 ═════════ */
const NOTE_TR = {
  "30분=半, 특수 읽기": "30 min = 半 (han) — special reading",
  "4는 し로도 읽음": "4 can also be read し",
  "★반드시 いち 붙임 (만은 일만으로 읽음)": "★ always takes いち (10,000 = ichiman)",
  "いっせん이 아니라 せん": "せん, not いっせん",
  "きゅう 장음": "long vowel きゅう",
  "くにん으로도 읽음": "also read くにん",
  "く로는 읽지 않음": "never read く",
  "く로도 읽음": "also read く",
  "ご縁(인연)과 발음 같음": "same sound as ご縁 (good ties)",
  "しちじかん으로도 읽음": "also read しちじかん",
  "しちじゅう로도 읽음": "also read しちじゅう",
  "しちひき로도 읽음": "also read しちひき",
  "しち로도 읽음": "also read しち",
  "しち로도 읽음(しちえん)": "also read しち (しちえん)",
  "し가 아닌 よん": "よん, not し",
  "し로도 읽음": "also read し",
  "し로도 읽음(しじゅう)": "also read し (しじゅう)",
  "じっこ로도 읽음, 발음 변화(促音)": "also じっこ; sound change (sokuon)",
  "つ 없음, 특수 읽기": "no つ — special reading",
  "ななにん으로도 읽음": "also read ななにん",
  "なな로 읽음": "read with なな",
  "よん으로 읽음": "read with よん",
  "れい로도 읽음": "also read れい",
  "금요일": "Friday",
  "만은 반드시 いち를 붙임": "10,000 always takes いち",
  "며칠 (의문사)": "what day of the month (question word)",
  "몇 개": "how many (things)",
  "몇 시 (의문사)": "what time (question word)",
  "몇 시간 (의문사)": "how many hours (question word)",
  "몇 월 (의문사)": "what month (question word)",
  "목요일": "Thursday",
  "무슨 요일 (의문사)": "what day of the week (question word)",
  "발음 변화 (せん→ぜん)": "sound change (せん→ぜん)",
  "발음 변화 (ひゃく→びゃく)": "sound change (ひゃく→びゃく)",
  "발음 변화 (促音+半濁音)": "sound change (sokuon + handakuten)",
  "발음 변화 (半濁音)": "sound change (handakuten)",
  "발음 변화 (連濁)": "sound change (rendaku)",
  "발음 변화 (촉음 っ)": "sound change (sokuon っ)",
  "발음 변화 (촉음+ひゃく→ぴゃく)": "sound change (sokuon + ひゃく→ぴゃく)",
  "발음 변화": "sound change",
  "발음 변화(促音)": "sound change (sokuon)",
  "발음 변화(促音); じっかい로도 읽음": "sound change (sokuon); also じっかい",
  "발음 변화(促音); じっさい로도 읽음": "sound change (sokuon); also じっさい",
  "발음 변화(促音); じっさつ로도 읽음": "sound change (sokuon); also じっさつ",
  "발음 변화(促音); はちかい로도 읽음": "sound change (sokuon); also はちかい",
  "발음 변화(促音); はちさつ로도 읽음": "sound change (sokuon); also はちさつ",
  "발음 변화; さんかい로도 읽음": "sound change; also さんかい",
  "발음 변화; じっかい로도 읽음": "sound change; also じっかい",
  "발음 변화; じっぱい로도 읽음": "sound change; also じっぱい",
  "발음 변화; じっぴき로도 읽음": "sound change; also じっぴき",
  "발음 변화; じっぷん으로도 읽음": "sound change; also じっぷん",
  "발음 변화; じっぽん으로도 읽음": "sound change; also じっぽん",
  "발음 변화; はちかい로도 읽음": "sound change; also はちかい",
  "발음 변화; はちふん으로도 읽음": "sound change; also はちふん",
  "보통 なな로 읽음": "usually read なな",
  "소요 시간": "duration (hours)",
  "수요일": "Wednesday",
  "억; 반드시 いち 붙임": "100 million — always takes いち",
  "월요일": "Monday",
  "의문사 (기계·차량)": "question word (machines · vehicles)",
  "의문사 (몇 번)": "question word (how many times)",
  "의문사 (얼마)": "question word (how much)",
  "의문사 (책)": "question word (books)",
  "의문사": "question word",
  "의문사; おいくつ로도 물음": "question word; also おいくつ",
  "일요일": "Sunday",
  "토요일": "Saturday",
  "특수 읽기 (きゅう 아님)": "special reading (not きゅう)",
  "특수 읽기 (きゅう가 아닌 く)": "special reading (く, not きゅう)",
  "특수 읽기 (く로 읽음)": "special reading (read く)",
  "특수 읽기 (なな 아님)": "special reading (not なな)",
  "특수 읽기 (なな가 아닌 しち)": "special reading (しち, not なな)",
  "특수 읽기 (むいか와 혼동 주의)": "special reading (careful: not むいか)",
  "특수 읽기 (よっか 유지)": "special reading (keeps よっか)",
  "특수 읽기 (よん·し 아님)": "special reading (not よん/し)",
  "특수 읽기 (よん이 아닌 し)": "special reading (し, not よん)",
  "특수 읽기 (よん이 아닌 よ)": "special reading (よ, not よん)",
  "특수 읽기 (よ로 읽음)": "special reading (read よ)",
  "특수 읽기": "special reading",
  "특수 읽기(熟字訓)": "special reading (jukujikun)",
  "혼합 예시; 三百 さんびゃく 발음 변화, 4는 よん": "mixed example; 三百 = さんびゃく (sound change), 4 = よん",
  "화요일": "Tuesday"
};

/* ═════════ 학습 파트 그룹 · 표 탭 · 통계 섹션 · 복습 기준 ═════════ */
const PART_GROUPS = CATS.map(g => ({ cat: g.cat, items: g.parts.map(p => [p, "p_" + p]) }));
const CHART_TABS = CATS.map(g => [g.cat, "cat_" + g.cat]);
const STAT_SECTIONS = ALL_PARTS.slice();
const REMIND_MIN_SEEN = 3, REMIND_MIN_RATE = 0.3;

/* ═════════ 유틸 ═════════ */
function shuffle(arr){
  for (let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
const pad2 = n => String(n).padStart(2, "0");
const dateKey = d => d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
const todayKey = () => dateKey(new Date());

/* ═════════ 다국어 (카나데 v2 키 집합 + 카즈 고유 파트/카테고리 라벨) ═════════ */
const T = {
  ko: {
    brandSub:"카즈",
    tagline:"일본어 숫자 · 조수사 · 날짜, 하나씩 가볍게 🔢",
    googleBtn:"Google로 시작하기",
    authStart:"이 기기에서 바로 시작하기",
    loginBusy:"Google 로그인 창을 여는 중…",
    fbLoading:"로그인 준비 중이에요. 잠시 후 다시 눌러 주세요.",
    loginFail:"로그인에 실패했어요: ",
    moduleFail:"로그인 모듈을 불러오지 못했어요. 게스트로 이용해 주세요.",
    cloudMeta:"클라우드 동기화",
    authHint:"게스트는 이 기기에만 저장, Google 로그인은 클라우드에 저장돼 기기 간에 이어져요.",
    toDark:"다크 모드로 전환", toLight:"라이트 모드로 전환",
    greetLine1:"안녕하세요,", greetHonorific:"님",
    heroSub:"오늘도 숫자 하나씩, 천천히.",
    qsToday:"오늘 학습", qsStreak:"연속 학습일", qsAcc:"전체 정답률",
    studyName:"학습하기", studyDesc:"연습 · 퀴즈 · 복습을 한 곳에서",
    chartsName:"숫자 표", chartsDesc:"숫자 · 조수사 · 날짜 읽기 한눈에",
    myName:"마이페이지", myDesc:"학습 기록 · 오답률 · 로그아웃",
    segPractice:"🃏 연습", segQuiz:"❓ 퀴즈", segReview:"🔁 복습",
    labelParts:"학습할 파트", labelMode:"출제 방식",
    modeNum:"숫자 → 읽기", modeRead:"읽기 → 숫자", modeRandom:"랜덤 믹스",
    labelHard:"하드 모드", hardName:"⏱ 제한시간", hardDesc:"시간 안에 못 고르면 오답 처리",
    totalPre:"총 ", totalPost:"장의 카드가 랜덤 순서로 나와요",
    beginPractice:"연습 시작", beginQuiz:"퀴즈 시작",
    reviewIntro:"3회 이상 학습했는데 오답률이 30% 이상인 항목을 모아 집중 복습합니다. 오답률 높은 순으로 보여드려요.",
    quitTitle:"그만하기", revealBtn:"정답 보기",
    revealHint:"카드를 누르거나 스페이스/엔터로 정답 보기",
    gradeHint:"스페이스/엔터 = 알았어요 · X = 몰랐어요",
    dunnoBtn:"✗ 몰랐어요", knowBtn:"✓ 알았어요",
    quizKbdHint:"키보드 1〜6으로도 선택할 수 있어요",
    restartAllBtn:"전체 다시 (재셔플)", toSetupBtn:"학습 설정으로", homeBtn:"홈으로",
    resultPracticeTitle:"연습 완료!", resultQuizTitle:"퀴즈 완료!",
    heartsOutTitle:"하트가 다 떨어졌어요!",
    heartsOutSub:"괜찮아요 — 틀린 것만 다시 도전해봐요!",
    scoreKnew:"알았어요", scoreDunno:"몰랐어요",
    scoreCorrect:"정답", scoreWrong:"오답", scoreRate:"오답률", scoreCombo:"최고 콤보",
    comboSuffix:" 콤보!",
    retryWrongPractice:"📝 저장한 카드만 다시 학습", retryWrongQuiz:"💪 틀린 것만 다시 퀴즈",
    reviewPracticeBtn:"🃏 카드로 복습하기", reviewQuizBtn:"❓ 퀴즈로 복습하기",
    reviewEmpty:"아직 복습이 필요한 항목이 없어요 🌿 연습 · 퀴즈를 진행하면 기록이 쌓이고, 3회 이상 학습 + 오답률 30% 이상인 항목이 여기에 모입니다.",
    hintName:"읽기 표시", hintDesc:"끄면 읽기를 가려 스스로 테스트",
    chartSpeakHint:"🔊 줄을 누르면 발음이 들려요",
    statTotal:"총 학습 카드", statAcc:"전체 정답률", statDays:"학습한 날", statStreak:"연속 학습일",
    activityTitle:"🌱 학습 활동 (최근 17주)", legendLess:"적음", legendMore:"많음",
    errTitle:"📊 항목별 오답률",
    langName:"🌐 English mode", langDesc:"끄면 한국어로 표시",
    darkName:"🌙 다크 모드", darkDesc:"어두운 곳에서 눈이 편한 테마",
    soundName:"🔊 사운드 이펙트", soundDesc:"정답 · 오답 · 콤보 효과음",
    logoutBtn:"로그아웃",
    unseen:"미학습", guest:"게스트", learner:"학습자",
    guestLocal:"게스트 · 이 기기에만 저장", since:"시작일",
    streakSuffix:"일 연속",
    moaLink:"◈ 모아 허브로",
    cat_num:"숫자", cat_counter:"조수사", cat_datetime:"날짜·시간",
    p_kihon:"기본 0–10", p_juu:"십 10–90", p_hyaku:"백 100–900", p_sen:"천 1000–9000", p_man:"만·억",
    p_tsu:"～つ 개수", p_ko:"～個 개", p_nin:"～人 명", p_hon:"～本 자루", p_mai:"～枚 장",
    p_hiki:"～匹 마리", p_dai:"～台 대", p_satsu:"～冊 권", p_sai:"～歳 살", p_hai:"～杯 잔",
    p_kai_floor:"～階 층", p_kaicnt:"～回 번", p_en:"～円 엔",
    p_gatsu:"～月 월", p_nichi:"～日 일", p_youbi:"曜日 요일", p_ji:"～時 시", p_fun:"～分 분", p_jikan:"～時間 시간"
  },
  en: {
    brandSub:"Numbers",
    tagline:"Japanese numbers, counters & dates — one at a time 🔢",
    googleBtn:"Continue with Google",
    authStart:"Start on this device",
    loginBusy:"Opening Google sign-in…",
    fbLoading:"Sign-in is still loading — try again in a moment.",
    loginFail:"Sign-in failed: ",
    moduleFail:"Couldn't load the sign-in module. Please continue as guest.",
    cloudMeta:"Cloud sync",
    authHint:"Guest data stays on this device; sign in with Google to sync across devices.",
    toDark:"Switch to dark mode", toLight:"Switch to light mode",
    greetLine1:"Hello,", greetHonorific:"",
    heroSub:"One number a day, nice and easy.",
    qsToday:"Today", qsStreak:"Day streak", qsAcc:"Accuracy",
    studyName:"Study", studyDesc:"Practice · Quiz · Review in one place",
    chartsName:"Number Chart", chartsDesc:"Numbers · counters · dates at a glance",
    myName:"My Page", myDesc:"History · Errors · Logout",
    segPractice:"🃏 Practice", segQuiz:"❓ Quiz", segReview:"🔁 Review",
    labelParts:"Parts to study", labelMode:"Question type",
    modeNum:"Number → Reading", modeRead:"Reading → Number", modeRandom:"Random mix",
    labelHard:"Hard mode", hardName:"⏱ Time limit", hardDesc:"Counts as wrong if time runs out",
    totalPre:"", totalPost:" cards in random order",
    beginPractice:"Start practice", beginQuiz:"Start quiz",
    reviewIntro:"Items studied 3+ times with an error rate of 30%+ are gathered here for focused review, sorted by highest error rate.",
    quitTitle:"Quit", revealBtn:"Show answer",
    revealHint:"Tap the card or press Space/Enter to reveal",
    gradeHint:"Space/Enter = Knew it · X = Didn't know",
    dunnoBtn:"✗ Didn't know", knowBtn:"✓ Knew it",
    quizKbdHint:"You can also pick with keys 1–6",
    restartAllBtn:"Restart all (reshuffle)", toSetupBtn:"Back to setup", homeBtn:"Home",
    resultPracticeTitle:"Practice done!", resultQuizTitle:"Quiz done!",
    heartsOutTitle:"Out of hearts!",
    heartsOutSub:"No worries — retry just the ones you missed!",
    scoreKnew:"Knew", scoreDunno:"Didn't",
    scoreCorrect:"Correct", scoreWrong:"Wrong", scoreRate:"Error %", scoreCombo:"Best combo",
    comboSuffix:" combo!",
    retryWrongPractice:"📝 Restudy saved cards", retryWrongQuiz:"💪 Retry wrong ones",
    reviewPracticeBtn:"🃏 Review with cards", reviewQuizBtn:"❓ Review with quiz",
    reviewEmpty:"No items need review yet 🌿 Do some practice or quizzes to build up records. Items studied 3+ times with a 30%+ error rate appear here.",
    hintName:"Show readings", hintDesc:"Turn off to hide readings and self-test",
    chartSpeakHint:"🔊 Tap a row to hear it",
    statTotal:"Total cards", statAcc:"Accuracy", statDays:"Days studied", statStreak:"Day streak",
    activityTitle:"🌱 Activity (last 17 weeks)", legendLess:"Less", legendMore:"More",
    errTitle:"📊 Error rate by item",
    langName:"🌐 한국어 (Korean)", langDesc:"Turn off for Korean",
    darkName:"🌙 Dark mode", darkDesc:"Easy on the eyes in the dark",
    soundName:"🔊 Sound effects", soundDesc:"Correct · wrong · combo sounds",
    logoutBtn:"Logout",
    unseen:"Unseen", guest:"Guest", learner:"Learner",
    guestLocal:"Guest · saved on this device only", since:"since",
    streakSuffix:"-day streak",
    moaLink:"◈ Back to moa hub",
    cat_num:"Numbers", cat_counter:"Counters", cat_datetime:"Date · Time",
    p_kihon:"Basics 0–10", p_juu:"Tens 10–90", p_hyaku:"Hundreds", p_sen:"Thousands", p_man:"10k · 100M",
    p_tsu:"～tsu", p_ko:"～ko 個", p_nin:"～nin 人", p_hon:"～hon 本", p_mai:"～mai 枚",
    p_hiki:"～hiki 匹", p_dai:"～dai 台", p_satsu:"～satsu 冊", p_sai:"～sai 歳", p_hai:"～hai 杯",
    p_kai_floor:"～kai 階", p_kaicnt:"～kai 回", p_en:"～en 円",
    p_gatsu:"～gatsu 月", p_nichi:"～nichi 日", p_youbi:"曜日 day", p_ji:"～ji 時", p_fun:"～fun 分", p_jikan:"～jikan 時間"
  }
};

/* ═════════ 데모 프로필 (디자인 리뷰용 — 잔디·오답률·복습 목록이 채워져 보이도록) ═════════ */
function makeDemoProfile(){
  const stats = {}, activity = {};
  const today = new Date();
  // 오늘 포함 7일 연속 스트릭
  for (let i = 0; i < 7; i++){
    const d = new Date(today); d.setDate(d.getDate() - i);
    activity[dateKey(d)] = i === 0 ? 24 : 8 + Math.floor(Math.random() * 42);
  }
  // 최근 17주에 드문드문 활동
  for (let i = 8; i < 119; i++){
    if (Math.random() < 0.45){
      const d = new Date(today); d.setDate(d.getDate() - i);
      activity[dateKey(d)] = 3 + Math.floor(Math.random() * 62);
    }
  }
  // 항목별 기록: 초반·조수사 파트 위주로 학습, 일부는 복습 대상(오답률 30%+)이 되도록
  // stats 키 = card.key ("part:num")
  const focus = ["kihon","juu","hyaku","tsu","ko","nin","hon","mai","gatsu","nichi","ji","fun"];
  FULL_POOL.forEach(c => {
    if (Math.random() < (focus.indexOf(c.part) >= 0 ? 0.7 : 0.15)){
      const s = 3 + Math.floor(Math.random() * 12);
      let w = Math.random() < 0.25
        ? Math.ceil(s * (0.3 + Math.random() * 0.4))
        : Math.floor(s * Math.random() * 0.25);
      if (w > s) w = s;
      stats[c.key] = { s, w };
    }
  });
  const created = new Date(today); created.setDate(created.getDate() - 118);
  return { nick: "이연준", created: dateKey(created), stats, activity, bestCombo: 12 };
}

return { DATA, CATS, ALL_PARTS, PART_CAT, buildPools, POOLS, FULL_POOL, NOTE_TR, PART_GROUPS, CHART_TABS, STAT_SECTIONS, REMIND_MIN_SEEN, REMIND_MIN_RATE, shuffle, pad2, dateKey, todayKey, T, makeDemoProfile };
})();
