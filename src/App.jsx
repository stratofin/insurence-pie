import { useState } from "react";

const centerItem = {
  id: "center",
  name: "豁免保單",
  color: "#B0C4A8",
  hoverColor: "#9EB498",
  icon: "🛡️",
  subtitle: "附加條款・保費豁免",
  description: "假如發生條件（如重大傷病、全殘失能等），其他保費可以豁免，不需再繳交保費，保單繼續有效。",
};

const insuranceData = [
  { id: 1, name: "壽險",         color: "#C9A9A4", icon: "🏠", subtitle: "一般身故・家庭責任",             description: "任何原因而死亡。\n重要性：喪葬費、家庭責任、債務。" },
  { id: 2, name: "意外失能",     color: "#A4B5C9", icon: "⚡", subtitle: "一次性給付・11歲至80歲",          description: "好不了又死不了。\n重要性：失去工作、中斷收入（殘廢生活扶助金）、生活重新適應、單身找對象不容易。" },
  { id: 3, name: "意外日額",     color: "#C9B9A4", icon: "🏥", subtitle: "少額・保額×住院日數",             description: "外力突發／非疾病。\n重要性：請假扣薪、醫藥費損失、驚魂未定。" },
  { id: 9, name: "意外實支",     color: "#D4B89A", icon: "🧾", subtitle: "意外花費實報實銷・限額內給付",    description: "花多少賠多少（限額內給付收據）。\n重要性：請假扣薪、醫藥費損失、驚魂未定。" },
  { id: 4, name: "住院實支實付", color: "#A4C9B9", icon: "💊", subtitle: "多花多賠・限額內實報實銷",        description: "花多少賠多少（限額內給付收據）。\n重要性：二代健保自費項目增加、民眾荷包失血、只要額度夠醫生放心治療。" },
  { id: 5, name: "住院日額",     color: "#C4C0A0", icon: "📋", subtitle: "多花多賠・病房手術療養",          description: "定額給付住院天數（診斷證明書）。\n重要性：病房費、薪資損失、看護費、交通費營養品、減少家人負擔。" },
  { id: 6, name: "癌症",         color: "#B4A4C9", icon: "🎗", subtitle: "可選日額型・彈性給付",            description: "惡性腫瘤。\n重要性：昂貴標靶藥物費、治療過程長、影響工作收入、家人心情與經濟壓力大。" },
  { id: 7, name: "重大傷病",     color: "#A4C4A8", icon: "❤️", subtitle: "少額・保額×住院日數",             description: "七項重大疾病（病很重、花很多、拖很久、死不了）。\n重要性：復健安養治療時間長、收入中斷、生活費看護費龐大。" },
  { id: 8, name: "長照",         color: "#C4A8B4", icon: "🌿", subtitle: "持續給付・長期條件每年／每月",    description: "長期失能無法自理（吃飯、如廁、移位等六項失能）。\n重要性：長期看護費昂貴、家人照護壓力龐大、生活品質嚴重受影響。" },
];

// 權威說明：來自金管會、各大保險公司及專業保險資訊平台整理
const authorityDescriptions = {
  9: "因意外傷害產生的醫療費用，在保單限額內「花多少、賠多少」，涵蓋急診費、手術費、住院費及門診雜費等，正本單據方可申請。與意外日額險互補：日額險給固定現金，實支險補足實際支出。適合高自費風險族群，尤其有自費藥材或特殊手術需求者，建議優先配置於意外醫療保障中。",
  1: "被保險人身故或完全失能時，給付一筆保險金，讓遺屬有資金維持生活、償還債務或撫養子女。分為定期壽險（特定期間保障，適合家庭主要經濟支柱在子女成長期使用）與終身壽險（終生保障，採平準保費制，年齡增長保費不上漲）。壽險保額建議以「家庭年支出×10年」為基準。",
  2: "因意外事故導致身體機能永久受損，依失能等級1–11級給付保險金（1級最重，理賠100%；11級最輕，理賠5%）。屬於一次性給付，用於支付失能當下的高昂醫療費用及後續生活需求，無等待期。與失能扶助險不同，失能扶助險為持續型月給付，二者功能互補。",
  3: "因意外傷害住院時，按「日額×住院天數」給付，與實際花費無關。骨折即使未住院也可按嚴重程度申請給付。同一次住院最高給付365天，保費便宜且無等待期。適合高風險工作族群及希望住院期間有穩定現金流的人，可用來補貼薪資損失或住院期間額外支出。",
  4: "以「實際醫療費用」為理賠基準，在保障範圍及限額內「花多少、賠多少」。理賠項目涵蓋病房費、手術費及醫療雜費，特別適用於自費醫材、靶向藥物等健保不給付項目。新制採正本理賠，額度需足夠。建議優先投保，是目前最能彌補健保缺口的核心醫療險種。",
  5: "定額住院給付，不論實際花費多少，住院即按「日額×天數」給付。例如日額2,000元，即使花費不足仍全額賠付，可用於補貼薪資損失、看護費用或家屬往返交通費。同一次住院最高給付365天，條件簡單、保費低，適合作為實支實付的補充搭配。",
  6: "專門保障確診癌症後的醫療費用，分為初次罹癌一次給付型（確診即賠一筆，使用彈性最高）及療程給付型（按化療、放療、手術等分次理賠）。隨精準醫療普及，自費項目超過七成，標靶與免疫治療動輒50萬元以上，建議保額至少25萬元起，並優先選擇一次給付型保單。",
  7: "以健保重大傷病證明作為理賠依據，涵蓋22大類、逾300種疾病（含癌症、洗腎、器官移植等）。取得健保重大傷病卡後直接申請，無須提供醫療費用收據，一次給付、理賠簡便。理賠金可自由運用於醫療、康復或日常生活支出，是保障範圍最廣的重症保險之一。",
  8: "符合「長期照顧狀態」（六項日常生活自理能力中持續三項以上障礙，或認知功能障礙）時，給付一次金或每月扶助金。台灣65%失能者仰賴家人照顧，平均照護期8–10年，每月花費從2萬起、重度失能可達7萬以上。長照險保護家庭財務，避免照護費用拖垮整體收支。",
  center: "被稱為「保險的保險」：當被保險人發生身故、特定失能等級、重大疾病等豁免條件時，保險公司免除後續各期保費，原保障仍繼續有效。豁免範圍因商品而異，有些僅涵蓋主約、有些含主附約全部，購買前需確認涵蓋範圍。對於無法繼續工作的人，豁免設計可確保在最困難時保障不中斷。",
};

// 子分類定義（id 7=重大傷病, id 4=住院實支實付）
const subTypeData = {
  7: [
    { id: "重大疾病", name: "重大疾病" },
    { id: "特定傷病", name: "特定傷病" },
    { id: "重大傷病_sub", name: "重大傷病" },
  ],
  4: [
    { id: "一般實支", name: "一般醫療住院實支實付" },
    { id: "自負額實支", name: "自負額醫療住院實支實付" },
    { id: "終身實支", name: "終身醫療住院實支實付" },
  ],
};

// 子分類權威說明
const authoritySubDescriptions = {
  "重大疾病": "依金管會標準定義保障7大重大疾病：急性心肌梗塞、冠狀動脈繞道手術、末期腎病變、腦中風後障礙、癌症、癱瘓、重大器官移植。確診並符合定義，即一次給付全額保險金，無需提供費用收據。分甲型（需達重度症狀）與乙型（輕度症狀即可）；保費相對低廉，是重症保障最基礎的底層配置。",
  "特定傷病": "保障範圍比重大疾病更廣，涵蓋至少22種嚴重特定傷病（2019年起更名「嚴重特定傷病險」），含心臟瓣膜手術、嚴重燒燙傷、主動脈手術等重大疾病未涵蓋的項目。各家公司可自行增加保障種類，部分項目支援多次給付。保費介於重大疾病與重大傷病之間，適合追求更全面重症保障者。",
  "重大傷病_sub": "以全民健保重大傷病卡為認定依據，涵蓋22大類逾300種疾病（含癌症、洗腎、器官移植、罕見疾病等）。憑健保重大傷病證明即可申請，無須醫療收據，整筆給付自由運用，保障範圍最廣、認定最客觀。健保重大傷病項目政策只增不減，是三種重症險中涵蓋病種最多的選擇。",
  "一般實支": "標準型實支實付，在保單約定額度內，以實際發生的住院費用「花多少賠多少」。分病房費、手術費、雜費三大項目各有獨立限額，涵蓋自費醫材與健保不給付藥材。2024年新制改為正本理賠，額度需足以涵蓋常見手術自費金額，建議作為醫療險核心配置優先投保。",
  "自負額實支": "每次理賠先由被保險人自行承擔設定的自負額（如5,000至20,000元），超出部分才由保險公司賠付至保額上限。相同保額下保費顯著低於一般型，適合已有其他醫療保障、只需補強大額自費風險的人。可與一般型實支實付搭配，以低保費擴大總保額，提升保障效益。",
  "終身實支": "限期繳費（如20年）、終身保障，繳費期滿後保障不中斷，免除高齡難以續保或保費大幅上漲的風險。適合希望「一次規劃、終身無憂」的族群，特別是提早規劃的年輕族群。需注意部分商品保額固定，須考量長期通貨膨脹對實際醫療費用的影響；新型商品已延伸保障至100歲。",
};

// 子分類一般說明（留白，供用戶自行編輯）
const defaultSubDescriptions = Object.fromEntries(
  Object.values(subTypeData).flat().map((s) => [s.id, ""])
);

// 重大傷病各疾病別有效領證統計表（113年11月）— 資料來源：健保署
const majorIllnessStats = [
  { no:"01", name:"需積極或長期治療之癌症",                                         count:"488,032", people:"466,576" },
  { no:"02", name:"先天性凝血因子異常（血友病）",                                   count:"1,874",   people:"1,867"   },
  { no:"03", name:"嚴重溶血性及再生不良性貧血",                                     count:"1,498",   people:"1,489"   },
  { no:"04", name:"慢性腎衰竭（尿毒症）必須定期透析治療者",                         count:"89,786",  people:"89,777"  },
  { no:"05", name:"需終身治療之全身性自體免疫症候群",                               count:"141,991", people:"140,747" },
  { no:"06", name:"慢性精神病",                                                      count:"191,495", people:"189,057" },
  { no:"07", name:"先天性新陳代謝疾病",                                             count:"18,518",  people:"18,469"  },
  { no:"08", name:"心、肺等之先天性畸型及染色體異常",                               count:"38,581",  people:"37,759"  },
  { no:"09", name:"燒燙傷面積達全身20%以上；或顏面燒燙傷合併五官功能障礙者",       count:"289",     people:"288"     },
  { no:"10", name:"接受器官移植",                                                    count:"19,007",  people:"17,528"  },
  { no:"11", name:"小兒麻痺、腦性麻痺等之神經肌肉骨骼肺臟併發症（中度以上）",     count:"13,052",  people:"13,021"  },
  { no:"12", name:"重大創傷（創傷嚴重程度分數≥16）",                               count:"12,580",  people:"12,580"  },
  { no:"13", name:"因呼吸衰竭需長期使用呼吸器者",                                   count:"11,231",  people:"11,231"  },
  { no:"14", name:"因腸道大量切除或慢性疾病引起嚴重營養不良者（全靜脈營養）",     count:"75",      people:"75"      },
  { no:"15", name:"因潛水或減壓不當引起之嚴重型減壓病或空氣栓塞症",               count:"10",      people:"10"      },
  { no:"16", name:"重症肌無力症",                                                    count:"6,196",   people:"6,194"   },
  { no:"17", name:"先天性免疫不全症",                                               count:"216",     people:"217"     },
  { no:"18", name:"脊髓損傷或病變所引起之神經肌肉皮膚骨骼心肺泌尿胃腸等併發症（中度以上）", count:"7,486", people:"7,436" },
  { no:"19", name:"職業病",                                                          count:"1,375",   people:"1,375"   },
  { no:"21", name:"多發性硬化症",                                                    count:"56",      people:"56"      },
  { no:"22", name:"先天性肌肉萎縮症",                                               count:"362",     people:"362"     },
  { no:"23", name:"外皮之先天畸形",                                                  count:"131",     people:"131"     },
  { no:"24", name:"漢生病",                                                          count:"125",     people:"125"     },
  { no:"25", name:"肝硬化症",                                                        count:"3,541",   people:"3,529"   },
  { no:"26", name:"早產兒所引起之神經肌肉骨骼心臟肺臟等之併發症",                 count:"8",       people:"8"       },
  { no:"27", name:"砷及其化合物之毒性作用（烏腳病）",                               count:"53",      people:"53"      },
  { no:"28", name:"運動神經元疾病（中度以上或須使用呼吸器）",                       count:"94",      people:"94"      },
  { no:"29", name:"庫賈氏病",                                                        count:"22",      people:"22"      },
  { no:"30", name:"罕見疾病",                                                        count:"15,327",  people:"15,310"  },
];

function getSegmentPath(cx, cy, outerR, innerR, startAngle, endAngle) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const s1 = toRad(startAngle), e1 = toRad(endAngle);
  const x1 = cx + outerR * Math.cos(s1), y1 = cy + outerR * Math.sin(s1);
  const x2 = cx + outerR * Math.cos(e1), y2 = cy + outerR * Math.sin(e1);
  const x3 = cx + innerR * Math.cos(e1), y3 = cy + innerR * Math.sin(e1);
  const x4 = cx + innerR * Math.cos(s1), y4 = cy + innerR * Math.sin(s1);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${large} 0 ${x4} ${y4} Z`;
}

function getLabelPos(cx, cy, r, startAngle, endAngle) {
  const mid = ((startAngle + endAngle) / 2) * (Math.PI / 180);
  return { x: cx + r * Math.cos(mid), y: cy + r * Math.sin(mid) };
}

// SVG icon components
function IconDesktop() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function IconMobile() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  );
}

export default function InsuranceApp() {
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(false);
  const [descriptions, setDescriptions] = useState({
    ...Object.fromEntries(insuranceData.map((d) => [d.id, d.description])),
    center: centerItem.description,
  });
  const [editText, setEditText] = useState("");
  const [hoveredId, setHoveredId] = useState(null);
  const [centerHovered, setCenterHovered] = useState(false);
  const [viewMode, setViewMode] = useState("desktop"); // "desktop" | "mobile"
  const [useAuthority, setUseAuthority] = useState(false);
  const [selectedSubType, setSelectedSubType] = useState(null); // 目前選中的子分類 id
  const [subDescriptions, setSubDescriptions] = useState(defaultSubDescriptions);
  const [subEditing, setSubEditing] = useState(false);
  const [subEditText, setSubEditText] = useState("");
  const openStatsTable = () => window.open("/重大傷病統計表.pdf", "_blank");

  // Active descriptions: authority mode or user-edited descriptions
  const activeDescriptions = useAuthority ? authorityDescriptions : descriptions;

  const isMobile = viewMode === "mobile";

  // Chart geometry — same viewBox always (400×400), CSS scales the SVG element
  const cx = 200, cy = 200;
  const outerR = 160, innerR = 70;
  const gap = 2;
  const n = insuranceData.length;

  const handleSelect = (item) => {
    if (selected?.id === item.id) {
      setSelected(null); setEditing(false); setSelectedSubType(null); setSubEditing(false);
    } else {
      setSelected(item); setEditing(false); setSubEditing(false);
      // 若有子分類，預設選第一個
      const subs = subTypeData[item.id];
      setSelectedSubType(subs ? subs[0].id : null);
    }
  };
  const handleEdit = () => { setEditText(descriptions[selected.id]); setEditing(true); };
  const handleSave = () => { setDescriptions((prev) => ({ ...prev, [selected.id]: editText })); setEditing(false); };

  // 子分類說明文字（考慮權威模式）
  const getSubDesc = (subId) => useAuthority ? (authoritySubDescriptions[subId] ?? "") : (subDescriptions[subId] ?? "");
  const saveSubDesc = (subId, text) => setSubDescriptions((prev) => ({ ...prev, [subId]: text }));

  // ---------- SVG Chart ----------
  const chart = (
    <svg
      viewBox="0 0 400 400"
      style={{
        width: isMobile ? "min(92vw, 380px)" : "min(52vw, 520px)",
        height: "auto",
        flexShrink: 0,
        display: "block",
      }}
    >
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="rgba(0,0,0,0.1)" />
        </filter>
        <clipPath id="centerClip">
          <circle cx={cx} cy={cy} r={innerR - 5} />
        </clipPath>
      </defs>

      {/* Outer glow rings */}
      <circle cx={cx} cy={cy} r={outerR + 14} fill="rgba(0,0,0,0.03)" />
      <circle cx={cx} cy={cy} r={outerR + 9}  fill="rgba(255,255,255,0.45)" />

      {/* Segments */}
      {insuranceData.map((item, i) => {
        const totalAngle = 360 / n;
        const startAngle = i * totalAngle - 90 + gap / 2;
        const endAngle   = (i + 1) * totalAngle - 90 - gap / 2;
        const isSelected = selected?.id === item.id;
        const isHovered  = hoveredId === item.id;
        const midRad = ((startAngle + endAngle) / 2) * (Math.PI / 180);
        const tx = isSelected ? Math.cos(midRad) * 7 : 0;
        const ty = isSelected ? Math.sin(midRad) * 7 : 0;
        const labelPos = getLabelPos(cx, cy, (outerR + innerR) / 2 + 6, startAngle, endAngle);
        const longName = item.name.length > 3;

        return (
          <g
            key={item.id}
            transform={`translate(${tx},${ty})`}
            style={{ cursor: "pointer", transition: "transform 0.2s ease" }}
            onClick={() => handleSelect(item)}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <path
              d={getSegmentPath(cx, cy, outerR, innerR, startAngle, endAngle)}
              fill={item.color}
              stroke="white"
              strokeWidth="2.5"
              opacity={selected && selected.id !== item.id ? 0.55 : 1}
              style={{ transition: "opacity 0.2s" }}
            />
            {/* 1.5× font sizes: 11→17, 13→20 */}
            <text
              x={labelPos.x} y={labelPos.y}
              textAnchor="middle" dominantBaseline="middle"
              fill={isSelected ? "#2e2520" : "#4a3830"}
              fontSize={longName ? "16.5" : "20"}
              fontWeight={isSelected ? "700" : "600"}
              style={{ pointerEvents: "none", userSelect: "none" }}
            >
              {longName ? (
                <>
                  <tspan x={labelPos.x} dy="-10">{item.name.slice(0, 3)}</tspan>
                  <tspan x={labelPos.x} dy="21">{item.name.slice(3)}</tspan>
                </>
              ) : (
                item.name
              )}
            </text>
          </g>
        );
      })}

      {/* Center circle background */}
      <circle cx={cx} cy={cy} r={innerR - 4} fill="white" filter="url(#shadow)" />
      <circle cx={cx} cy={cy} r={innerR - 4} fill="white" stroke="#e8ddd8" strokeWidth="1.5" />

      {/* Lower half colored (豁免保單) — clipped */}
      <g clipPath="url(#centerClip)">
        <path
          d={`M ${cx - (innerR - 4)} ${cy} A ${innerR - 4} ${innerR - 4} 0 0 0 ${cx + (innerR - 4)} ${cy} Z`}
          fill={selected?.id === "center" ? "#9EB498" : centerHovered ? "#c4dab8" : "#ddecd6"}
          style={{ cursor: "pointer", transition: "fill 0.2s" }}
          onClick={() => handleSelect(centerItem)}
          onMouseEnter={() => setCenterHovered(true)}
          onMouseLeave={() => setCenterHovered(false)}
        />
      </g>

      {/* Divider */}
      <line x1={cx-(innerR-4)} y1={cy} x2={cx+(innerR-4)} y2={cy} stroke="#c8d8c0" strokeWidth="1.2" />

      {/* Upper: 保險・類型總覽 */}
      <text x={cx} y={cy - 40} textAnchor="middle" dominantBaseline="middle"
        fontSize="30" fill="#6a5a50" fontWeight="700" style={{ pointerEvents: "none" }}>
        保險
      </text>
      <text x={cx} y={cy - 13} textAnchor="middle" dominantBaseline="middle"
        fontSize="14" fill="#9a8a80" style={{ pointerEvents: "none" }}>
        類型總覽
      </text>

      {/* Lower: 豁免保單 — 1.5×: 11.5→17 */}
      <text
        x={cx} y={cy + 26}
        textAnchor="middle" dominantBaseline="middle"
        fontSize="17"
        fill={selected?.id === "center" ? "#2d4028" : "#4a6844"}
        fontWeight={selected?.id === "center" ? "700" : "600"}
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        豁免保單
      </text>
      <rect x={cx-36} y={cy+8} width={72} height={36} fill="transparent"
        style={{ cursor: "pointer" }}
        onClick={() => handleSelect(centerItem)}
        onMouseEnter={() => setCenterHovered(true)}
        onMouseLeave={() => setCenterHovered(false)}
      />
    </svg>
  );

  // ---------- Detail Panel ----------
  const detailPanel = (
    <div style={{ flex: 1, minWidth: isMobile ? "0" : "260px", maxWidth: isMobile ? "100%" : "400px", width: isMobile ? "100%" : undefined }}>
      {selected ? (
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          border: `2px solid ${selected.color}`,
          animation: "fadeIn 0.25s ease",
        }}>
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "12px",
                background: selected.color,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px",
              }}>{selected.icon}</div>
              <div>
                <h2 style={{ margin: 0, fontSize: "1.25rem", color: "#3a2f28", fontWeight: 700 }}>{selected.name}</h2>
                <p style={{ margin: 0, fontSize: "0.78rem", color: "#9a8a80" }}>{selected.subtitle}</p>
              </div>
            </div>
            {selected.id === 7 && (
              <button
                onClick={openStatsTable}
                title="查看健保重大傷病統計表（原始PDF）"
                style={{
                  width: "36px", height: "36px", borderRadius: "9px", flexShrink: 0,
                  background: selected.color, border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "opacity 0.18s",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3a2f28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="3" y1="15" x2="21" y2="15"/>
                  <line x1="9" y1="9" x2="9" y2="21"/>
                </svg>
              </button>
            )}
          </div>
          <div style={{ height: "3px", borderRadius: "2px", background: `linear-gradient(to right, ${selected.color}, transparent)`, marginBottom: "18px" }} />

          {/* ── 有子分類的項目 ── */}
          {subTypeData[selected.id] ? (() => {
            const subs = subTypeData[selected.id];
            const activeSub = subs.find((s) => s.id === selectedSubType) ?? subs[0];
            const subDesc = getSubDesc(activeSub.id);
            return (
              <div>
                {useAuthority && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px", padding: "6px 10px", background: "#f0f7ec", borderRadius: "8px", border: "1px solid #c8dcc0" }}>
                    <span style={{ fontSize: "14px" }}>💪</span>
                    <span style={{ fontSize: "0.75rem", color: "#4a6844", fontWeight: 600 }}>權威說明模式</span>
                  </div>
                )}
                {/* Sub-type tabs */}
                <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
                  {subs.map((s) => {
                    const isActive = s.id === (selectedSubType ?? subs[0].id);
                    return (
                      <button
                        key={s.id}
                        onClick={() => { setSelectedSubType(s.id); setSubEditing(false); }}
                        style={{
                          padding: "6px 12px", borderRadius: "20px",
                          border: `1.5px solid ${selected.color}`,
                          background: isActive ? selected.color : "transparent",
                          color: isActive ? "#2a2018" : "#7a6a60",
                          fontSize: "0.82rem", fontWeight: isActive ? 700 : 400,
                          cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s",
                        }}
                      >
                        {s.name}
                      </button>
                    );
                  })}
                </div>
                {/* Sub-type description */}
                {subEditing ? (
                  <div>
                    <textarea
                      value={subEditText}
                      onChange={(e) => setSubEditText(e.target.value)}
                      rows={5}
                      style={{
                        width: "100%", padding: "12px",
                        border: `1.5px solid ${selected.color}`, borderRadius: "10px",
                        fontSize: "0.9rem", color: "#4a3f38", lineHeight: "1.7",
                        resize: "vertical", outline: "none", fontFamily: "inherit",
                        background: "#fafaf8", boxSizing: "border-box",
                      }}
                    />
                    <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                      <button onClick={() => { saveSubDesc(activeSub.id, subEditText); setSubEditing(false); }} style={{ flex: 1, padding: "10px", background: selected.color, color: "#3a2f28", border: "none", borderRadius: "8px", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>✓ 儲存</button>
                      <button onClick={() => setSubEditing(false)} style={{ padding: "10px 16px", background: "#f0ede8", color: "#6a5a50", border: "none", borderRadius: "8px", fontSize: "0.9rem", cursor: "pointer", fontFamily: "inherit" }}>取消</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {subDesc ? (
                      <p style={{ fontSize: "0.92rem", color: "#5a4a40", lineHeight: "1.8", margin: "0 0 16px", whiteSpace: "pre-wrap" }}>{subDesc}</p>
                    ) : (
                      <div style={{ padding: "20px", background: "#fafaf8", borderRadius: "10px", border: "1.5px dashed #d8d0c8", marginBottom: "16px", textAlign: "center" }}>
                        <p style={{ margin: 0, color: "#b0a098", fontSize: "0.88rem" }}>尚無說明，點擊下方按鈕新增</p>
                      </div>
                    )}
                    {!useAuthority && (
                      <button onClick={() => { setSubEditText(subDesc); setSubEditing(true); }} style={{ padding: "9px 18px", background: "transparent", color: "#8a7a72", border: "1.5px solid #d0c8c0", borderRadius: "8px", fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "6px" }}>
                        ✏️ 編輯說明
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })() : (
          /* ── 一般項目（無子分類）── */
          editing ? (
            <div>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows={5}
                style={{
                  width: "100%", padding: "12px",
                  border: `1.5px solid ${selected.color}`, borderRadius: "10px",
                  fontSize: "0.9rem", color: "#4a3f38", lineHeight: "1.7",
                  resize: "vertical", outline: "none", fontFamily: "inherit",
                  background: "#fafaf8", boxSizing: "border-box",
                }}
              />
              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <button onClick={handleSave} style={{ flex: 1, padding: "10px", background: selected.color, color: "#3a2f28", border: "none", borderRadius: "8px", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>✓ 儲存</button>
                <button onClick={() => setEditing(false)} style={{ padding: "10px 16px", background: "#f0ede8", color: "#6a5a50", border: "none", borderRadius: "8px", fontSize: "0.9rem", cursor: "pointer", fontFamily: "inherit" }}>取消</button>
              </div>
            </div>
          ) : (
            <div>
              {useAuthority && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px", padding: "6px 10px", background: "#f0f7ec", borderRadius: "8px", border: "1px solid #c8dcc0" }}>
                  <span style={{ fontSize: "14px" }}>💪</span>
                  <span style={{ fontSize: "0.75rem", color: "#4a6844", fontWeight: 600 }}>權威說明模式</span>
                </div>
              )}
              <p style={{ fontSize: "0.92rem", color: "#5a4a40", lineHeight: "1.8", margin: "0 0 18px", whiteSpace: "pre-wrap" }}>
                {activeDescriptions[selected.id]}
              </p>
              {!useAuthority && (
                <button onClick={handleEdit} style={{ padding: "9px 18px", background: "transparent", color: "#8a7a72", border: "1.5px solid #d0c8c0", borderRadius: "8px", fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "6px" }}>
                  ✏️ 編輯說明
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: "rgba(255,255,255,0.5)", borderRadius: "16px", padding: isMobile ? "28px 20px" : "40px 28px", textAlign: "center", border: "2px dashed #d8cfc8" }}>
          <div style={{ fontSize: "44px", marginBottom: "12px" }}>☝️</div>
          <p style={{ color: "#9a8a80", fontSize: "0.93rem", margin: 0, lineHeight: "1.7" }}>
            點擊{isMobile ? "上方" : "左側"}圓餅圖<br />中的保險類型<br />查看詳細說明
          </p>
        </div>
      )}

      {/* Legend */}
      <div style={{ marginTop: "20px" }}>
        <p style={{ fontSize: "0.75rem", color: "#9a8a80", marginBottom: "8px", fontWeight: 600, letterSpacing: "0.05em" }}>所有類型</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
          {[...insuranceData, centerItem].map((item) => (
            <div key={item.id} onClick={() => handleSelect(item)} style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "4px 9px", borderRadius: "20px",
              background: selected?.id === item.id ? item.color : "rgba(255,255,255,0.8)",
              border: `1.5px solid ${item.color}`,
              cursor: "pointer", fontSize: "0.8rem", color: "#4a3f38",
              fontWeight: selected?.id === item.id ? 700 : 400, transition: "all 0.2s",
            }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: item.color, border: "1px solid rgba(0,0,0,0.1)", flexShrink: 0 }} />
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ---------- Render ----------
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8f5f0 0%, #f0ede8 100%)",
      fontFamily: "'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      {/* Header */}
      <div style={{
        width: "100%", boxSizing: "border-box",
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        padding: "16px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Left: Authority button */}
        <div style={{ width: "96px", display: "flex", justifyContent: "flex-start" }}>
          <button
            onClick={() => setUseAuthority((v) => !v)}
            title={useAuthority ? "切換回自訂說明" : "載入權威重點整理"}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: "2px", padding: "6px 10px", borderRadius: "10px", border: "none",
              background: useAuthority ? "#4a6844" : "#ede8e2",
              color: useAuthority ? "white" : "#7a6a60",
              cursor: "pointer", transition: "all 0.2s",
              fontSize: "20px", lineHeight: 1,
            }}
          >
            <span>💪</span>
            <span style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.02em", marginTop: "1px" }}>
              {useAuthority ? "權威ON" : "權威說明"}
            </span>
          </button>
        </div>

        {/* Title center */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: "1.45rem", fontWeight: 700, color: "#4a3f38", letterSpacing: "0.05em" }}>
            保險類型總覽
          </h1>
          <p style={{ margin: "3px 0 0", fontSize: "0.82rem", color: "#8a7a72" }}>點擊各區塊查看說明</p>
        </div>

        {/* View mode toggle buttons */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            onClick={() => setViewMode("desktop")}
            title="電腦版"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "44px", height: "44px", borderRadius: "10px", border: "none",
              background: viewMode === "desktop" ? "#4a3f38" : "#ede8e2",
              color: viewMode === "desktop" ? "white" : "#7a6a60",
              cursor: "pointer", transition: "all 0.2s",
            }}
          >
            <IconDesktop />
          </button>
          <button
            onClick={() => setViewMode("mobile")}
            title="手機版"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "44px", height: "44px", borderRadius: "10px", border: "none",
              background: viewMode === "mobile" ? "#4a3f38" : "#ede8e2",
              color: viewMode === "mobile" ? "white" : "#7a6a60",
              cursor: "pointer", transition: "all 0.2s",
            }}
          >
            <IconMobile />
          </button>
        </div>
      </div>

      {/* Main content */}
      {isMobile ? (
        // ── Mobile: stacked vertically, centred, narrow ──
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: "24px", padding: "28px 16px",
          width: "100%", maxWidth: "440px", boxSizing: "border-box",
        }}>
          {chart}
          {detailPanel}
        </div>
      ) : (
        // ── Desktop: side by side ──
        <div style={{
          display: "flex", flexDirection: "row",
          alignItems: "flex-start", justifyContent: "center",
          gap: "36px", padding: "36px 32px",
          width: "100%", maxWidth: "1100px", boxSizing: "border-box",
          flexWrap: "wrap",
        }}>
          {chart}
          {detailPanel}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
