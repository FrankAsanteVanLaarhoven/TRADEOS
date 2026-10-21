/**
 * TradeOS Africa - Enterprise HTTP & API Gateway
 * Africa-Native B2B Commerce Operating System & Cross-Border Logistics Backbone
 * Zero-dependency, standards-compliant server with REST, GraphQL, Native Catalog Engine, and Corridor Telematics.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.xml': 'application/xml; charset=UTF-8',
  '.txt': 'text/plain; charset=UTF-8',
  '.csv': 'text/csv; charset=UTF-8'
};

// ============================================================================
// 1. NATIVE TRADEOS SUPPLIER CATALOG STATE
// ============================================================================
let products = [
  {
    id: "prod-1",
    sku: "SLR-MNT-AL6063",
    title: "Aerospace Grade Solar Mounting Brackets & Clamps",
    category: "Solar Infrastructure",
    stock: 42000,
    basePrice: 4.50,
    b2bPrice: 3.68,
    moq: 500,
    leadTimeDays: 21,
    hsCode: "7610.90.00",
    weightKg: 0.38,
    afcftaCertified: true,
    originCountry: "Nigeria",
    originCity: "Ikeja Industrial Estate, Lagos",
    image: "assets/hero_solar_hardware.jpg",
    description: "Extruded AL6063-T6 anodized aluminum mounting bracket with pre-torqued stainless fasteners. Engineered for coastal corrosion resistance.",
    volumeTiers: [
      { minQty: 500, priceUSD: 3.68 },
      { minQty: 2500, priceUSD: 3.42 },
      { minQty: 10000, priceUSD: 3.15 }
    ]
  },
  {
    id: "prod-2",
    sku: "AURA-INV-50KW",
    title: "Aura Smart Industrial 50kW Hybrid Microinverter",
    category: "Power Electronics",
    stock: 85,
    basePrice: 3890.00,
    b2bPrice: 3450.00,
    moq: 2,
    leadTimeDays: 14,
    hsCode: "8504.40.80",
    weightKg: 46.5,
    afcftaCertified: true,
    originCountry: "Kenya",
    originCity: "Mombasa SEZ",
    image: "assets/industrial_inverter.jpg",
    description: "IP68 enterprise commercial solar inverter with built-in cellular telemetry and automatic phase balancing for West African grid stability.",
    volumeTiers: [
      { minQty: 2, priceUSD: 3450.00 },
      { minQty: 10, priceUSD: 3200.00 },
      { minQty: 25, priceUSD: 2980.00 }
    ]
  },
  {
    id: "prod-3",
    sku: "LFP-BATT-100KWH",
    title: "Modular 100kWh High-Voltage Battery Storage Rack",
    category: "Energy Storage",
    stock: 24,
    basePrice: 20500.00,
    b2bPrice: 18200.00,
    moq: 1,
    leadTimeDays: 28,
    hsCode: "8507.60.00",
    weightKg: 820.0,
    afcftaCertified: false,
    originCountry: "South Africa",
    originCity: "Coega SEZ, Gqeberha",
    image: "assets/industrial_inverter.jpg",
    description: "Prismatic LiFePO4 cells with dual-BMS and active aerosol suppression for tropical ambient conditions.",
    volumeTiers: [
      { minQty: 1, priceUSD: 18200.00 },
      { minQty: 5, priceUSD: 17400.00 }
    ]
  },
  {
    id: "prod-4",
    sku: "STR-RAIL-4400",
    title: "Heavy-Duty Extruded Anodized Rail 4400mm",
    category: "Solar Infrastructure",
    stock: 6400,
    basePrice: 22.00,
    b2bPrice: 18.50,
    moq: 100,
    leadTimeDays: 10,
    hsCode: "7604.29.90",
    weightKg: 3.2,
    afcftaCertified: true,
    originCountry: "South Africa",
    originCity: "City Deep, Johannesburg",
    image: "assets/hero_solar_hardware.jpg",
    description: "Structural mounting rail certified to withstand 160km/h coastal wind gusts across the Gulf of Guinea and East African corridors.",
    volumeTiers: [
      { minQty: 100, priceUSD: 18.50 },
      { minQty: 500, priceUSD: 16.90 },
      { minQty: 2000, priceUSD: 15.20 }
    ]
  },
  {
    id: "prod-5",
    sku: "AGR-COCOA-BUTTER",
    title: "Pure Deodorized Prime Pressed Cocoa Butter (Food Grade)",
    category: "Agro Commodities",
    stock: 15000,
    basePrice: 8.90,
    b2bPrice: 7.45,
    moq: 1000,
    leadTimeDays: 12,
    hsCode: "1804.00.00",
    weightKg: 25.0,
    afcftaCertified: true,
    originCountry: "Ghana",
    originCity: "Tema Free Zone Enclave",
    image: "assets/hero_solar_hardware.jpg",
    description: "Single-origin Ghana cocoa butter with AfCFTA Certificate of Origin #GH-CoO-8812. Ready for intra-African confectionary manufacturing.",
    volumeTiers: [
      { minQty: 1000, priceUSD: 7.45 },
      { minQty: 5000, priceUSD: 6.95 }
    ]
  }
];

// ============================================================================
// 2. AFCFTA CORRIDORS & END-TO-END LOGISTICS TELEMATICS STATE
// ============================================================================
const corridors = {
  NG_GH: {
    id: "NG_GH",
    name: "Gulf of Guinea Primary Corridor",
    route: "Lagos (Nigeria) ⇄ Tema/Accra (Ghana)",
    tradeLane: "Abidjan-Lagos Freight Superhighway",
    primaryBorder: "Seme-Krake Joint Border Post",
    customsProtocol: "AfCFTA Preferential Trade Protocol (0% Customs Duty)",
    totalVolumeUSD: 24800000,
    averageTransitHours: 42,
    settlementRails: ["PAPSS", "GhIPSS", "NIBSS"],
    activeCarrier: "MSC West Africa Feeder v.26 / DHL Bonded Transit Fleet",
    status: "OPERATIONAL"
  },
  KE_UG: {
    id: "KE_UG",
    name: "East Africa Northern Corridor",
    route: "Mombasa Port (Kenya) ⇄ Kampala ICD (Uganda)",
    tradeLane: "Mombasa-Nairobi-Malaba-Kampala Rail & Highway",
    primaryBorder: "One Stop Border Post (OSBP) Malaba",
    customsProtocol: "EAC Common Market & AfCFTA Zero Tariff",
    totalVolumeUSD: 18200000,
    averageTransitHours: 72,
    settlementRails: ["PAPSS", "KRA Single Window", "URA e-Tax"],
    activeCarrier: "SGR Freight Express / Rift Valley Logistics",
    status: "OPERATIONAL"
  },
  ZA_ZM: {
    id: "ZA_ZM",
    name: "North-South Mining & Industrial Corridor",
    route: "Johannesburg/Durban (South Africa) ⇄ Lusaka (Zambia)",
    tradeLane: "Trans-Kalahari & Beitbridge-Chirundu Link",
    primaryBorder: "Chirundu One-Stop Border Post",
    customsProtocol: "SADC Trade Protocol & AfCFTA Rule of Origin",
    totalVolumeUSD: 31400000,
    averageTransitHours: 110,
    settlementRails: ["PAPSS", "SADC-RTGS", "BOZ Escrow"],
    activeCarrier: "Bolloré African Logistics Super-B-Double Convoy",
    status: "OPERATIONAL"
  },
  SN_ML: {
    id: "SN_ML",
    name: "Sahel Trans-West Corridor",
    route: "Dakar Port (Senegal) ⇄ Bamako ICD (Mali)",
    tradeLane: "Dakar-Bamako Railway & Highway Corridor",
    primaryBorder: "Diboli-Kidira Border Crossing",
    customsProtocol: "WAEMU & AfCFTA Trade Protocol (Zero Tariff)",
    totalVolumeUSD: 14600000,
    averageTransitHours: 68,
    settlementRails: ["PAPSS", "BCEAO GIM-UEMOA"],
    activeCarrier: "Dakar Container Terminal Bonded Rail Express",
    status: "OPERATIONAL"
  }
};

let shipments = [
  {
    trackingNumber: "TRK-AF-89412",
    corridorId: "NG_GH",
    poNumber: "PO-2026-8812",
    consignmentTitle: "5,000 Solar Mounting Brackets & Clamps (AL6063-T6)",
    shipper: {
      name: "Helios Aluminum Fab Ltd",
      city: "Ikeja Industrial Estate, Lagos",
      country: "Nigeria",
      lei: "984500A412F8812E90",
      afcftaCertNo: "NG-CoO-2026-4819"
    },
    consignee: {
      name: "GoldCoast Solar EPC Ltd",
      city: "Accra / Tema Free Zone",
      country: "Ghana",
      taxId: "GH-TIN-990231"
    },
    containerId: "MSCU-748920-1 (40ft High Cube)",
    sealNumber: "E-SEAL-NGGH-9982",
    grossWeightKg: 1900,
    hsCode: "7610.90.00",
    incoterms: "CIF Tema Port",
    valueUSD: 22910,
    escrowDepositUSD: 6873,
    escrowBalanceUSD: 16037,
    carrierName: "MSC West Africa Feeder / Lagos-Tema Shunt",
    telematics: {
      latitude: 6.2415,
      longitude: 2.7150,
      locationName: "Gulf of Guinea Maritime Corridor (Offshore Cotonou/Tema)",
      temperatureC: 24.5,
      humidityPct: 58,
      speedKnots: 14.8,
      sealIntegrity: "INTACT - CRYPTOGRAPHICALLY VERIFIED",
      lastPing: "Just now (Live Starlink AIS Telemetry)",
      eta: "Oct 22, 14:00 GMT"
    },
    stages: [
      { id: 1, title: "Factory Gate Clearance & E-Seal Stamped", location: "Lagos Factory, Nigeria", desc: "Goods cleared factory gate; cryptographic e-seal applied; GPS container tracker locked.", completed: true, timestamp: "Oct 20, 08:30" },
      { id: 2, title: "Pre-Shipment Inspection & Digital e-CoO", location: "Standards Org of Nigeria (SONCAP)", desc: "AfCFTA Certificate of Origin #NG-CoO-2026-4819 verified on National Single Window.", completed: true, timestamp: "Oct 20, 11:15" },
      { id: 3, title: "Export Customs Release & Apapa Loading", location: "Nigeria Customs Service, Lagos", desc: "Export manifest cleared under 0% duty; container stevedored to feeder vessel.", completed: true, timestamp: "Oct 20, 18:00" },
      { id: 4, title: "Cross-Border Transit & Corridor Telematics", location: "Gulf of Guinea Maritime Lane", desc: "Feeder vessel en route to Tema Port. Container temperature and geofence telematics nominal.", completed: false, inProgress: true, timestamp: "In Transit • ETA 18h" },
      { id: 5, title: "Tema Port Customs Clearance & AfCFTA Duty Waiver", location: "Ghana Revenue Authority (ICUMS)", desc: "Electronic Single Window validation of preferential 0% tariff status.", completed: false, inProgress: false, timestamp: "Pending Arrival" },
      { id: 6, title: "Stevedoring & Container Terminal Gate-Out", location: "MPS Terminal 3, Tema Port", desc: "Offloading to bonded multi-axle prime mover for direct road transit.", completed: false, inProgress: false, timestamp: "Scheduled" },
      { id: 7, title: "Last-Mile Delivery to Buyer Facility", location: "GoldCoast Solar Logistics Hub, Accra", desc: "Bonded satellite geofence tracking to final warehouse.", completed: false, inProgress: false, timestamp: "Scheduled" },
      { id: 8, title: "Digital Consignment Acceptance & Seal Inspection", location: "Accra Warehouse Gate", desc: "Buyer inspects hardware against Bill of Lading and verifies digital e-seal.", completed: false, inProgress: false, timestamp: "Pending" },
      { id: 9, title: "Automated PAPSS Escrow Settlement Release", location: "PAPSS Central Settlement Rail", desc: "Remaining 70% balance ($16,037) automatically credited to supplier's local bank.", completed: false, inProgress: false, timestamp: "Pending Sign-Off" }
    ]
  },
  {
    trackingNumber: "TRK-AF-55021",
    corridorId: "KE_UG",
    poNumber: "PO-2026-9104",
    consignmentTitle: "85 Aura Smart 50kW Commercial Hybrid Microinverters",
    shipper: {
      name: "Savannah Power Tech Ltd",
      city: "Mombasa Special Economic Zone",
      country: "Kenya",
      lei: "984500KE77102911",
      afcftaCertNo: "KE-CoO-2026-1184"
    },
    consignee: {
      name: "Victoria CleanGrid Systems Ltd",
      city: "Kampala Industrial Business Park",
      country: "Uganda",
      taxId: "UG-TIN-778841"
    },
    containerId: "KHLU-119830-4",
    sealNumber: "E-SEAL-KEUG-4410",
    grossWeightKg: 3950,
    hsCode: "8504.40.80",
    incoterms: "DAP Kampala ICD",
    valueUSD: 293250,
    escrowDepositUSD: 87975,
    escrowBalanceUSD: 205275,
    carrierName: "SGR Freight Rail / Uganda Bonded Haulage",
    telematics: {
      latitude: 0.5823,
      longitude: 34.2810,
      locationName: "Malaba One-Stop Border Post (Kenya/Uganda)",
      temperatureC: 22.1,
      humidityPct: 52,
      speedKnots: 0,
      sealIntegrity: "INTACT - VERIFIED BY URA CUSTOMS GATE",
      lastPing: "4 mins ago",
      eta: "Oct 23, 10:00 EAT"
    },
    stages: [
      { id: 1, title: "Factory Gate Clearance & E-Seal Stamped", location: "Mombasa SEZ", desc: "Inverters cleared with serialized test certificates.", completed: true, timestamp: "Oct 19, 09:00" },
      { id: 2, title: "Pre-Shipment Inspection & Digital e-CoO", location: "Kenya Bureau of Standards (KEBS)", desc: "Certificate of Conformity and AfCFTA e-CoO approved.", completed: true, timestamp: "Oct 19, 14:00" },
      { id: 3, title: "SGR Freight Departure from Mombasa", location: "Mombasa Port Terminus", desc: "Loaded onto Standard Gauge Rail to Naivasha/Malaba.", completed: true, timestamp: "Oct 20, 06:30" },
      { id: 4, title: "Cross-Border Transit & Corridor Telematics", location: "Malaba Border Post", desc: "Crossed into Uganda; joint customs smart gate cleared with 0% tariff.", completed: false, inProgress: true, timestamp: "Customs Gate Cleared" },
      { id: 5, title: "Kampala ICD Inbound Discharge", location: "Mukono Inland Container Depot", desc: "Awaiting final road shunt to industrial park.", completed: false, inProgress: false, timestamp: "ETA 12 hrs" },
      { id: 6, title: "Delivery to Consignee Facility", location: "Kampala Industrial Park", desc: "Scheduled for site delivery.", completed: false, inProgress: false, timestamp: "Scheduled" },
      { id: 7, title: "Automated PAPSS Escrow Settlement Release", location: "Bank of Uganda / PAPSS", desc: "$205,275 release pending final site verification.", completed: false, inProgress: false, timestamp: "Pending Acceptance" }
    ]
  },
  {
    trackingNumber: "TRK-AF-33908",
    corridorId: "ZA_ZM",
    poNumber: "PO-2026-7832",
    consignmentTitle: "100 Heavy-Duty Anodized Rails 4400mm",
    shipper: {
      name: "Rand Structural Metals",
      city: "Johannesburg (City Deep)",
      country: "South Africa",
      lei: "984500ZA22019914",
      afcftaCertNo: "ZA-CoO-2026-6629"
    },
    consignee: {
      name: "Copperbelt Renewable Energy Ltd",
      city: "Lusaka Heavy Industrial Area",
      country: "Zambia",
      taxId: "ZM-TPIN-332910"
    },
    containerId: "MSCU-902194-9",
    sealNumber: "E-SEAL-ZAZM-2201",
    grossWeightKg: 3200,
    hsCode: "7604.29.90",
    incoterms: "CIP Lusaka",
    valueUSD: 18500,
    escrowDepositUSD: 5550,
    escrowBalanceUSD: 12950,
    carrierName: "Bolloré African Logistics Super-B Road Train",
    telematics: {
      latitude: -16.0298,
      longitude: 28.8504,
      locationName: "Chirundu One-Stop Border Post (Zambia)",
      temperatureC: 28.4,
      humidityPct: 44,
      speedKnots: 32,
      sealIntegrity: "INTACT - SCANNED BY ZRA OSBP",
      lastPing: "8 mins ago",
      eta: "Oct 22, 17:00 CAT"
    },
    stages: [
      { id: 1, title: "Factory Gate Clearance & E-Seal Stamped", location: "City Deep, Johannesburg", desc: "Dispatched under SABS certification.", completed: true, timestamp: "Oct 18, 11:00" },
      { id: 2, title: "Beitbridge Border Exit", location: "South Africa / Zimbabwe Border", desc: "Commercial transit bond registered.", completed: true, timestamp: "Oct 19, 16:30" },
      { id: 3, title: "Chirundu Border Entry into Zambia", location: "Chirundu OSBP", desc: "Zero customs duty verified under SADC/AfCFTA rules.", completed: true, timestamp: "Oct 21, 09:15" },
      { id: 4, title: "Lusaka Inland Delivery", location: "En route to Lusaka", desc: "Approaching final warehouse destination.", completed: false, inProgress: true, timestamp: "In Transit" },
      { id: 5, title: "Escrow Settlement Release", location: "PAPSS / Bank of Zambia", desc: "Final payment release pending goods inspection.", completed: false, inProgress: false, timestamp: "Pending" }
    ]
  }
];

// ----------------------------------------------------------------------------
// Fulfilled by TradeOS (FBT) Bonded Warehouses Network
// ----------------------------------------------------------------------------
const fbtWarehouses = [
  {
    id: "fbt-los-01",
    name: "Lagos Free Zone Mega Hub (LFZ)",
    city: "Lagos (Ibeju-Lekki)",
    country: "Nigeria",
    flag: "🇳🇬",
    customsZone: "Bonded Free Zone #FZ-NG-01",
    sqmCapacity: 45000,
    utilizationPct: 68,
    activeSKUs: 1420,
    temperatureControlled: true,
    status: "OPERATIONAL • FAST-TRACK CLEARANCE",
    description: "Deep sea port integrated bonded facility adjacent to Lekki Port with dedicated container freight terminal."
  },
  {
    id: "fbt-tma-02",
    name: "Tema Free Zone Logistics Enclave",
    city: "Tema / Greater Accra",
    country: "Ghana",
    flag: "🇬🇭",
    customsZone: "MPS Terminal 3 Bonded Zone",
    sqmCapacity: 28000,
    utilizationPct: 54,
    activeSKUs: 890,
    temperatureControlled: true,
    status: "OPERATIONAL • FAST-TRACK CLEARANCE",
    description: "Direct rail/road link from MPS Terminal 3 to inland transit depots across the Abidjan-Lagos corridor."
  },
  {
    id: "fbt-mba-03",
    name: "Mombasa Dongo Kundu SEZ Hub",
    city: "Mombasa",
    country: "Kenya",
    flag: "🇰🇪",
    customsZone: "Northern Corridor Bonded Depot",
    sqmCapacity: 35000,
    utilizationPct: 72,
    activeSKUs: 1140,
    temperatureControlled: true,
    status: "OPERATIONAL • FAST-TRACK CLEARANCE",
    description: "East African gateway facility connecting Mombasa Port with Nairobi, Kampala, and Kigali via standard gauge rail."
  },
  {
    id: "fbt-drb-04",
    name: "Dube TradePort Special Economic Zone",
    city: "Durban / King Shaka",
    country: "South Africa",
    flag: "🇿🇦",
    customsZone: "Dube Cargo Terminal Bonded Area",
    sqmCapacity: 50000,
    utilizationPct: 81,
    activeSKUs: 2300,
    temperatureControlled: true,
    status: "OPERATIONAL • FAST-TRACK CLEARANCE",
    description: "Air/road logistics platform providing bonded consolidation for Southern African cross-border trade."
  },
  {
    id: "fbt-tng-05",
    name: "Tanger Med Logistics Hub",
    city: "Tangier",
    country: "Morocco",
    flag: "🇲🇦",
    customsZone: "Strait of Gibraltar Gateway FZ",
    sqmCapacity: 60000,
    utilizationPct: 76,
    activeSKUs: 3100,
    temperatureControlled: true,
    status: "OPERATIONAL • FAST-TRACK CLEARANCE",
    description: "Pan-African transshipment crossroads connecting Mediterranean lanes with West African coastal trade."
  }
];

// ----------------------------------------------------------------------------
// Vendor Pricing Watch & Supplies Match
// ----------------------------------------------------------------------------
const vendorPriceWatch = [
  {
    id: "pw-01",
    productTitle: "AL6063-T6 Extruded Solar Mounting Clamps",
    category: "Solar Hardware",
    africanDomesticLandedUSD: 3.68,
    asiaChinaLandedUSD: 4.82,
    indiaLandedUSD: 4.65,
    afcftaDutyExemption: "0% Duty (Saves 20%)",
    leadTimeAfricanDays: 21,
    leadTimeAsiaDays: 52,
    tradeosMarginAdvantage: "+23.6% Margin Advantage"
  },
  {
    id: "pw-02",
    productTitle: "Aura 50kW Smart Industrial Hybrid Inverter",
    category: "Power Electronics",
    africanDomesticLandedUSD: 3450.00,
    asiaChinaLandedUSD: 4120.00,
    indiaLandedUSD: 3980.00,
    afcftaDutyExemption: "0% Duty (Saves 15%)",
    leadTimeAfricanDays: 14,
    leadTimeAsiaDays: 45,
    tradeosMarginAdvantage: "+16.2% Margin Advantage"
  },
  {
    id: "pw-03",
    productTitle: "Organic White Sesame Seeds (Metric Ton)",
    category: "Agro Commodities",
    africanDomesticLandedUSD: 1850.00,
    asiaChinaLandedUSD: 2340.00,
    indiaLandedUSD: 2210.00,
    afcftaDutyExemption: "0% Preferential Duty",
    leadTimeAfricanDays: 10,
    leadTimeAsiaDays: 38,
    tradeosMarginAdvantage: "+20.9% Margin Advantage"
  },
  {
    id: "pw-04",
    productTitle: "100kWh High-Voltage LiFePO4 Storage Rack",
    category: "Energy Storage",
    africanDomesticLandedUSD: 18200.00,
    asiaChinaLandedUSD: 21900.00,
    indiaLandedUSD: 20800.00,
    afcftaDutyExemption: "0% Duty (Saves 10%)",
    leadTimeAfricanDays: 28,
    leadTimeAsiaDays: 60,
    tradeosMarginAdvantage: "+16.8% Margin Advantage"
  }
];

// ----------------------------------------------------------------------------
// Product Hunt Hub for Resellers & Dropshippers
// ----------------------------------------------------------------------------
const resellerHuntItems = [
  {
    id: "hunt-01",
    title: "TradeOS Sovereign Solar Mounting Clamps (500-Pack)",
    category: "Solar Infrastructure",
    suggestedRetailUSD: 6.50,
    wholesalePriceUSD: 3.68,
    marginPct: "43.4%",
    moq: 50,
    leadTimeDays: 7,
    image: "assets/hero_solar_hardware.jpg",
    whiteLabelOEM: true,
    description: "High margin fast-turnover mounting clamps for solar installers and dropshippers. Pre-packaged in barcoded retailer boxes."
  },
  {
    id: "hunt-02",
    title: "Aura Grid-Sense IoT Energy Meter & Microinverter Bridge",
    category: "Smart Electronics",
    suggestedRetailUSD: 420.00,
    wholesalePriceUSD: 245.00,
    marginPct: "41.6%",
    moq: 5,
    leadTimeDays: 5,
    image: "assets/industrial_inverter.jpg",
    whiteLabelOEM: true,
    description: "Direct plug-and-play solar generation telematics bridge with 4G SIM slot and MQTT cloud integration for African microgrids."
  },
  {
    id: "hunt-03",
    title: "Anodized Aluminum Ground-Mount Rails (4.4m)",
    category: "Solar Infrastructure",
    suggestedRetailUSD: 38.00,
    wholesalePriceUSD: 22.50,
    marginPct: "40.8%",
    moq: 20,
    leadTimeDays: 10,
    image: "assets/hero_solar_hardware.jpg",
    whiteLabelOEM: false,
    description: "Commercial 4.4 meter structural rails with pre-drilled cable channels. Ready for direct distribution to EPC contractors."
  },
  {
    id: "hunt-04",
    title: "Solid-State DC Surge Protection Combiner Box (1000V)",
    category: "Industrial Power",
    suggestedRetailUSD: 185.00,
    wholesalePriceUSD: 108.00,
    marginPct: "41.6%",
    moq: 10,
    leadTimeDays: 7,
    image: "assets/industrial_inverter.jpg",
    whiteLabelOEM: true,
    description: "IP65 weather-proof outdoor combiner box with Type 2 SPD, touch-safe fuse holders, and isolation switch."
  }
];

// ----------------------------------------------------------------------------
// Global Multi-Modal Fleet Telematics (Maritime AIS, Air Cargo, Road Haulage)
// ----------------------------------------------------------------------------
const multimodalFleet = [
  {
    id: "ais-01",
    type: "maritime",
    carrier: "MSC (Mediterranean Shipping Company)",
    vesselName: "MSC West Africa Express",
    callsign: "3FEB8",
    mmsi: "211489020",
    lat: 5.250,
    lon: 1.100,
    headingDeg: 265,
    speedKnots: 15.2,
    draftMeters: 11.4,
    routeOrigin: "Apapa Port, Lagos, Nigeria",
    routeDestination: "Tema Port (MPS Terminal 3), Ghana",
    teuCapacity: 4500,
    cargoCategory: "Industrial Solar Components & Anodized Hardware",
    eta: "Oct 22, 14:00 GMT",
    telematicsStatus: "Starlink AIS Marine Satellite Uplink [LOCKED]"
  },
  {
    id: "ais-02",
    type: "maritime",
    carrier: "A.P. Moller - Maersk",
    vesselName: "Maersk Gibraltar Feeder",
    callsign: "OUKD2",
    mmsi: "220194000",
    lat: 34.800,
    lon: -6.500,
    headingDeg: 195,
    speedKnots: 17.8,
    draftMeters: 12.8,
    routeOrigin: "Tanger Med Logistics Free Zone, Morocco",
    routeDestination: "Dakar Port Autonome, Senegal",
    teuCapacity: 6200,
    cargoCategory: "Electronic Inverters & Battery Storage Racks",
    eta: "Oct 23, 08:30 GMT",
    telematicsStatus: "AIS-COSMOS Satellite Feed Nominal"
  },
  {
    id: "ais-03",
    type: "maritime",
    carrier: "CMA CGM Group",
    vesselName: "CMA CGM Africa Two",
    callsign: "9V8201",
    mmsi: "563912000",
    lat: -31.200,
    lon: 30.800,
    headingDeg: 45,
    speedKnots: 16.0,
    draftMeters: 13.5,
    routeOrigin: "Durban Container Terminal, South Africa",
    routeDestination: "Mombasa SEZ Deep Sea Berth, Kenya",
    teuCapacity: 7500,
    cargoCategory: "High-Voltage Power Assemblies & Cable Drums",
    eta: "Oct 24, 18:00 EAT",
    telematicsStatus: "Dual-Band Marine Radar AIS Active"
  },
  {
    id: "air-01",
    type: "air",
    carrier: "Ethiopian Airlines Cargo",
    flightNumber: "ET392 (Boeing 777-200F)",
    callsign: "ETH392",
    lat: 9.005,
    lon: 38.746,
    altitudeFt: 34000,
    speedKnots: 485,
    headingDeg: 255,
    originIATA: "ADD (Bole Intl, Addis Ababa)",
    destIATA: "LOS (Murtala Muhammed, Lagos)",
    cargoPayloadKg: 64000,
    cargoCategory: "High-Value Inverters & Pharmaceuticals",
    eta: "Oct 22, 16:15 WAT",
    telematicsStatus: "ADS-B Transponder 4821 Active • SATCOM Operational"
  },
  {
    id: "air-02",
    type: "air",
    carrier: "Kenya Airways Cargo",
    flightNumber: "KQ710 (Boeing 737-800BCF)",
    callsign: "KQA710",
    lat: -1.319,
    lon: 36.927,
    altitudeFt: 28000,
    speedKnots: 420,
    headingDeg: 310,
    originIATA: "NBO (Jomo Kenyatta, Nairobi)",
    destIATA: "EBB (Entebbe, Uganda)",
    cargoPayloadKg: 21500,
    cargoCategory: "Solar Modules & Perishables",
    eta: "Oct 22, 14:40 EAT",
    telematicsStatus: "ADS-B In-Flight Telematics Locked"
  },
  {
    id: "air-03",
    type: "air",
    carrier: "Emirates SkyCargo",
    flightNumber: "EK9912 (Boeing 777F)",
    callsign: "UAE9912",
    lat: 25.253,
    lon: 55.365,
    altitudeFt: 36000,
    speedKnots: 510,
    headingDeg: 230,
    originIATA: "DXB (Dubai World Central)",
    destIATA: "JNB (O.R. Tambo, Johannesburg)",
    cargoPayloadKg: 88000,
    cargoCategory: "Industrial Sensors & High-Density Batteries",
    eta: "Oct 23, 05:40 SAST",
    telematicsStatus: "Trans-Continental Freight Corridor Locked"
  },
  {
    id: "trk-01",
    type: "road",
    fleetName: "TradeOS Corridor Haulage Express",
    truckPlate: "LND-482-XA (Volvo FH16 6x4)",
    driverName: "Babatunde Adeleke (Verified Heavy Haul)",
    lat: 6.380,
    lon: 2.650,
    speedKmH: 64,
    headingDeg: 270,
    currentLocation: "Seme-Krake Joint Border Approach (Benin/Nigeria)",
    routeOrigin: "Ikeja Industrial Estate, Lagos",
    routeDestination: "Tema Free Zone Logistics Enclave, Ghana",
    consignmentId: "TRK-AF-89412",
    containerNo: "MSCU-748920-1",
    cargoType: "Solar Mounting Hardware",
    cargoTempC: 24.2,
    sealStatus: "CRYPTOGRAPHIC E-SEAL #NGGH-9982 INTACT",
    eta: "Oct 22, 18:30 GMT",
    uberTelemetry: {
      batteryPct: 98,
      fuelPct: 82,
      driverFatigueScore: "OPTIMAL (Rest break 45 min ago)",
      geofenceAlarm: "CLEAR (On Bonded Corridor Route)"
    }
  },
  {
    id: "trk-02",
    type: "road",
    fleetName: "Northern Corridor Bonded Haulage",
    truckPlate: "KDG-912-T (Scania R500)",
    driverName: "Geoffrey Kiprop (East Africa Bonded Certified)",
    lat: 0.582,
    lon: 34.281,
    speedKmH: 52,
    headingDeg: 290,
    currentLocation: "Malaba One-Stop Border Post (Kenya/Uganda)",
    routeOrigin: "Mombasa SEZ Logistics Depot",
    routeDestination: "Kampala Mukono ICD, Uganda",
    consignmentId: "TRK-AF-55021",
    containerNo: "KHLU-119830-4",
    cargoType: "85 Industrial Microinverters",
    cargoTempC: 21.8,
    sealStatus: "E-SEAL #KEUG-4410 INTACT (Scanned by URA)",
    eta: "Oct 23, 08:00 EAT",
    uberTelemetry: {
      batteryPct: 94,
      fuelPct: 69,
      driverFatigueScore: "OPTIMAL",
      geofenceAlarm: "CLEAR"
    }
  },
  {
    id: "trk-03",
    type: "road",
    fleetName: "Trans-Kalahari Super-B Road Train",
    truckPlate: "GP-772-ZN (Mercedes-Benz Actros 3358)",
    driverName: "Johannes Van Der Merwe",
    lat: -16.030,
    lon: 28.850,
    speedKmH: 72,
    headingDeg: 340,
    currentLocation: "Chirundu One-Stop Border Highway, Zambia",
    routeOrigin: "City Deep ICD, Johannesburg, South Africa",
    routeDestination: "Lusaka Heavy Industrial Enclave, Zambia",
    consignmentId: "TRK-AF-33908",
    containerNo: "MSCU-902194-9",
    cargoType: "100 Anodized Mounting Rails (4400mm)",
    cargoTempC: 27.9,
    sealStatus: "E-SEAL #ZAZM-2201 INTACT",
    eta: "Oct 22, 16:45 CAT",
    uberTelemetry: {
      batteryPct: 91,
      fuelPct: 75,
      driverFatigueScore: "OPTIMAL",
      geofenceAlarm: "CLEAR"
    }
  }
];

// Helper: Parse JSON or text bodies
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      resolve(body);
    });
    req.on('error', err => reject(err));
  });
}

const server = http.createServer(async (req, res) => {
  // Global Security & CORS Headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Shopify-Hmac-Sha256, X-TradeOS-Tenant');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const urlPath = parsedUrl.pathname;

  // --------------------------------------------------------------------------
  // API Route: Health & Operational Diagnostics
  // --------------------------------------------------------------------------
  if (urlPath === '/api/v1/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: "HEALTHY",
      service: "TradeOS Africa Core Engine",
      version: "v2.5.0-native-catalog",
      environment: "production-hardened",
      timestamp: new Date().toISOString(),
      catalogEngine: "TradeOS Native B2B Engine (Self-Hosted)",
      corridors: {
        NG_GH: "OPERATIONAL (Lagos ⇄ Tema Port)",
        KE_UG: "OPERATIONAL (Mombasa ⇄ Kampala)",
        ZA_ZM: "OPERATIONAL (Johannesburg ⇄ Lusaka)",
        SN_ML: "OPERATIONAL (Dakar ⇄ Bamako)"
      },
      settlementRails: ["PAPSS", "GhIPSS", "NIBSS", "Afreximbank"]
    }));
    return;
  }

  // --------------------------------------------------------------------------
  // API Route: Native Products Catalog
  // --------------------------------------------------------------------------
  if (urlPath === '/api/v1/products') {
    if (req.method === 'GET') {
      const category = parsedUrl.searchParams.get('category');
      const q = parsedUrl.searchParams.get('q');
      let result = products;
      if (category && category !== 'All') {
        result = result.filter(p => p.category === category);
      }
      if (q) {
        const queryLower = q.toLowerCase();
        result = result.filter(p => p.title.toLowerCase().includes(queryLower) || p.sku.toLowerCase().includes(queryLower));
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
      return;
    } else if (req.method === 'POST') {
      try {
        const bodyStr = await readBody(req);
        const p = JSON.parse(bodyStr);
        p.id = p.id || `prod-${Date.now()}`;
        p.sku = p.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`;
        p.stock = parseInt(p.stock) || 0;
        p.b2bPrice = parseFloat(p.b2bPrice) || 0;
        p.basePrice = parseFloat(p.basePrice) || p.b2bPrice * 1.25;
        p.moq = parseInt(p.moq) || 1;
        p.leadTimeDays = parseInt(p.leadTimeDays) || 14;
        p.afcftaCertified = !!p.afcftaCertified;
        p.image = p.image || 'assets/hero_solar_hardware.jpg';
        p.source = p.source || 'tradeos_native';
        products.unshift(p);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(p));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Invalid JSON payload" }));
      }
      return;
    }
  }

  // Handle specific product ID: GET, PUT, DELETE (/api/v1/products/:id)
  if (urlPath.startsWith('/api/v1/products/') && !urlPath.includes('bulk') && !urlPath.includes('export')) {
    const id = urlPath.replace('/api/v1/products/', '');
    const idx = products.findIndex(p => p.id === id);

    if (req.method === 'GET') {
      if (idx !== -1) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products[idx]));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Product not found" }));
      }
      return;
    } else if (req.method === 'PUT') {
      try {
        const bodyStr = await readBody(req);
        const updates = JSON.parse(bodyStr);
        if (idx !== -1) {
          products[idx] = { ...products[idx], ...updates, id };
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(products[idx]));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: "Product not found" }));
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Invalid update payload" }));
      }
      return;
    } else if (req.method === 'DELETE') {
      if (idx !== -1) {
        const removed = products.splice(idx, 1)[0];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, removedId: id, item: removed }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Product not found" }));
      }
      return;
    }
  }

  // API Route: Native Bulk CSV & JSON Catalog Import (/api/v1/products/bulk)
  if (urlPath === '/api/v1/products/bulk' && req.method === 'POST') {
    try {
      const raw = await readBody(req);
      let itemsToImport = [];

      // Detect if JSON or CSV
      if (raw.trim().startsWith('[') || raw.trim().startsWith('{')) {
        const parsed = JSON.parse(raw);
        itemsToImport = Array.isArray(parsed) ? parsed : [parsed];
      } else {
        // Simple CSV parser
        const lines = raw.trim().split(/\r?\n/);
        if (lines.length > 1) {
          const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/['"]/g, ''));
          for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
            if (cols.length >= 2 && cols[0]) {
              const item = {};
              headers.forEach((h, hIdx) => {
                item[h] = cols[hIdx] || '';
              });
              itemsToImport.push({
                sku: item.sku || `SKU-IMP-${Math.floor(1000 + Math.random() * 9000)}`,
                title: item.title || item.name || "Imported B2B Item",
                category: item.category || "General B2B",
                stock: parseInt(item.stock) || 100,
                b2bPrice: parseFloat(item.b2bprice || item.price) || 10.00,
                basePrice: parseFloat(item.baseprice) || (parseFloat(item.b2bprice || item.price) * 1.25),
                moq: parseInt(item.moq) || 50,
                leadTimeDays: parseInt(item.leadtimedays || item.leadtime) || 14,
                hsCode: item.hscode || "8479.90.00",
                originCountry: item.origincountry || item.origin || "Nigeria",
                afcftaCertified: (item.afcfta === 'true' || item.afcftacertified === 'true' || item.afcfta === '1'),
                image: "assets/hero_solar_hardware.jpg",
                description: item.description || "Bulk imported catalog product.",
                source: "native_bulk_import"
              });
            }
          }
        }
      }

      const importedList = [];
      itemsToImport.forEach(item => {
        item.id = item.id || `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        products.unshift(item);
        importedList.push(item);
      });

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        count: importedList.length,
        items: importedList
      }));
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: "Malformed bulk import payload", details: e.message }));
    }
    return;
  }

  // API Route: Native Catalog CSV Export (/api/v1/products/export.csv)
  if (urlPath === '/api/v1/products/export.csv' && req.method === 'GET') {
    const headers = "id,sku,title,category,stock,b2bPrice,basePrice,moq,leadTimeDays,hsCode,originCountry,afcftaCertified\n";
    const rows = products.map(p =>
      `"${p.id}","${p.sku}","${p.title.replace(/"/g, '""')}","${p.category}",${p.stock},${p.b2bPrice},${p.basePrice},${p.moq},${p.leadTimeDays},"${p.hsCode}","${p.originCountry || 'Africa'}",${p.afcftaCertified}`
    ).join("\n");

    res.writeHead(200, {
      'Content-Type': 'text/csv; charset=UTF-8',
      'Content-Disposition': 'attachment; filename="tradeos-native-catalog.csv"',
      'Cache-Control': 'no-cache'
    });
    res.end(headers + rows);
    return;
  }

  // --------------------------------------------------------------------------
  // API Route: AfCFTA Corridors & Real-Time Logistics Telematics
  // --------------------------------------------------------------------------
  if (urlPath === '/api/v1/corridors' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(corridors));
    return;
  }

  // API Route: List All Active Shipments
  if (urlPath === '/api/v1/shipments' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(shipments));
    return;
  }

  // API Route: Get Specific Consignment Telematics & Waybill (/api/v1/shipments/:trackingId)
  if (urlPath.startsWith('/api/v1/shipments/')) {
    const sub = urlPath.replace('/api/v1/shipments/', '');
    const parts = sub.split('/');
    const trackingId = parts[0];
    const shipment = shipments.find(s => s.trackingNumber === trackingId);

    if (!shipment) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: "Consignment not found" }));
      return;
    }

    // Sub-route: Advance milestone stage (/api/v1/shipments/:trackingId/advance)
    if (parts[1] === 'advance' && req.method === 'POST') {
      const cur = shipment.stages.findIndex(s => s.inProgress);
      if (cur !== -1) {
        shipment.stages[cur].inProgress = false;
        shipment.stages[cur].completed = true;
        if (cur + 1 < shipment.stages.length) {
          shipment.stages[cur + 1].inProgress = true;
        }
      } else {
        const lastIncomplete = shipment.stages.findIndex(s => !s.completed);
        if (lastIncomplete !== -1) {
          shipment.stages[lastIncomplete].inProgress = true;
        }
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, updatedShipment: shipment }));
      return;
    }

    // Sub-route: Waybill Details (/api/v1/shipments/:trackingId/waybill)
    if (parts[1] === 'waybill' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        waybillNumber: `AWB-${shipment.trackingNumber}`,
        issueDate: "2026-10-20",
        afcftaDigitalStamp: `VERIFIED-eCoO-${shipment.shipper.afcftaCertNo}`,
        originPort: shipment.shipper.city,
        destinationPort: shipment.consignee.city,
        goodsDescription: shipment.consignmentTitle,
        declaredValueUSD: shipment.valueUSD,
        containerNumber: shipment.containerId,
        sealNumber: shipment.sealNumber,
        grossWeightKg: shipment.grossWeightKg,
        carrierSignature: "Verified by TradeOS Smart Corridor Logistics Network"
      }));
      return;
    }

    // Default: Return the full shipment payload
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(shipment));
      return;
    }
  }

  // --------------------------------------------------------------------------
  // API Route: Fulfilled by TradeOS (FBT) Bonded Warehouses
  // --------------------------------------------------------------------------
  if (urlPath === '/api/v1/fbt/warehouses' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(fbtWarehouses));
    return;
  }

  // --------------------------------------------------------------------------
  // API Route: Vendor Pricing Watch & Landed Cost Intelligence
  // --------------------------------------------------------------------------
  if (urlPath === '/api/v1/market-radar/pricing-watch' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(vendorPriceWatch));
    return;
  }

  // --------------------------------------------------------------------------
  // API Route: Product Hunt Hub for Resellers
  // --------------------------------------------------------------------------
  if (urlPath === '/api/v1/reseller/products' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(resellerHuntItems));
    return;
  }

  // --------------------------------------------------------------------------
  // API Route: Global Multi-Modal Telematics Fleet (AIS, ADS-B, Road Haulage)
  // --------------------------------------------------------------------------
  if (urlPath === '/api/v1/telematics/fleet' && req.method === 'GET') {
    const filter = parsedUrl.searchParams.get('type');
    let results = multimodalFleet;
    if (filter && filter !== 'all') {
      results = results.filter(f => f.type === filter);
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(results));
    return;
  }

  // --------------------------------------------------------------------------
  // API Route: Landed Cost Engine
  // --------------------------------------------------------------------------
  if (urlPath === '/api/v1/landed-cost' && req.method === 'POST') {
    try {
      const bodyStr = await readBody(req);
      const data = JSON.parse(bodyStr);
      const qty = parseInt(data.quantity) || 5000;
      const unitPrice = parseFloat(data.unitPrice) || 3.68;
      const origin = data.origin || 'africa';

      const fobTotal = qty * unitPrice;
      const freightPerUnit = (origin === 'asia') ? 0.79 : 0.37;
      const freightCost = qty * freightPerUnit;
      const tariffRate = (origin === 'africa') ? 0.0 : 0.20;
      const customsTariff = fobTotal * tariffRate;
      const vat = (fobTotal + freightCost + customsTariff) * 0.125;
      const insurance = (fobTotal + freightCost) * 0.008;
      const escrowFee = fobTotal * 0.0108;
      const totalLandedUSD = fobTotal + freightCost + customsTariff + vat + insurance + escrowFee;

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        quantity: qty,
        fobProductTotal: fobTotal,
        freightCost,
        customsTariff,
        tariffRate,
        isAfcftaExempt: (origin === 'africa'),
        vat,
        insurance,
        escrowFee,
        totalLandedUSD,
        effectiveUnitCost: totalLandedUSD / qty,
        currencyRates: { GHS: 15.65, NGN: 1640.0, KES: 129.50, ZAR: 17.80 }
      }));
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: "Malformed payload" }));
    }
    return;
  }

  // --------------------------------------------------------------------------
  // API Route: GraphQL Endpoint
  // --------------------------------------------------------------------------
  if (urlPath === '/graphql' && req.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      data: {
        rfq: {
          id: "RFQ-2026-9041",
          sku: "SLR-MNT-AL6063",
          quantity: 5000,
          corridor: "NG_GH",
          buyer: {
            name: "GoldCoast Solar EPC Ltd",
            country: "Ghana",
            city: "Accra"
          },
          landedCost: {
            fobPriceUSD: 18400,
            freightUSD: 1850,
            afcftaDutyUSD: 0,
            vatUSD: 2300,
            totalLandedUSD: 22910,
            trustScore: 98
          },
          verifiedSupplier: {
            name: "Helios Aluminum Fab Ltd",
            country: "Nigeria",
            lei: "984500A412F8812E90",
            afcftaCert: "#NG-4819",
            trustRating: "AAA"
          }
        }
      }
    }));
    return;
  }

  // --------------------------------------------------------------------------
  // Static File Serving with No-Cache Security
  // --------------------------------------------------------------------------
  let safePath = path.normalize(urlPath);
  if (safePath === '/' || safePath === '') {
    safePath = '/index.html';
  }

  let filePath = path.join(PUBLIC_DIR, safePath);

  // Security check: prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Serve custom 404
      const notFoundPath = path.join(PUBLIC_DIR, '404.html');
      fs.readFile(notFoundPath, (err404, data404) => {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        if (!err404) {
          res.end(data404);
        } else {
          res.end('<h1>404 Not Found</h1>');
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Cache headers
    let cacheControl = 'no-cache, no-store, must-revalidate';
    if (ext === '.jpg' || ext === '.png' || ext === '.svg') {
      cacheControl = 'public, max-age=86400';
    } else if (ext === '.css' || ext === '.js') {
      cacheControl = 'no-cache';
    }

    const headers = {
      'Content-Type': contentType,
      'Cache-Control': cacheControl
    };
    if (cacheControl.includes('no-cache')) {
      headers['Pragma'] = 'no-cache';
      headers['Expires'] = '0';
    }

    res.writeHead(200, headers);

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`TradeOS Africa platform live on http://localhost:${PORT}`);
});
