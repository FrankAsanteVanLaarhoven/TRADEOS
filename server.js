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
