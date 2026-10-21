/**
 * TradeOS Africa - Reactive State Store
 * SOTA Africa-Native B2B Commerce Operating System & Freight Logistics Core
 */

(function(window) {
  'use strict';

  const INITIAL_PRODUCTS = [
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
      source: "tradeos_native"
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
      source: "tradeos_native"
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
      description: "Prismatic LiFePO4 cells with smart dual-BMS, active aerosol fire suppression, and liquid cooling for tropical ambient conditions.",
      source: "tradeos_native"
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
      description: "Structural mounting rail certified to withstand 160km/h coastal wind gusts across the Gulf of Guinea corridor.",
      source: "tradeos_native"
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
      description: "Single-origin Ghana cocoa butter with AfCFTA Certificate of Origin #GH-CoO-8812. Ready for intra-African food manufacturing.",
      source: "tradeos_native"
    }
  ];

  const INITIAL_RFQS = [
    {
      id: "RFQ-2026-9041",
      buyer: "GoldCoast Solar EPC Ltd",
      buyerCountry: "Ghana",
      deliveryCity: "Accra / Tema Port",
      item: "5,000 Solar Mounting Brackets & Clamps (AL6063-T6)",
      quantity: 5000,
      sku: "SLR-MNT-AL6063",
      targetLandedBudget: 24000,
      createdDate: "2026-10-18",
      requiredBy: "2026-11-20",
      status: "Quotes Received"
    }
  ];

  const INITIAL_QUOTES = [
    {
      id: "Q-01",
      rfqId: "RFQ-2026-9041",
      supplierId: "sup-1",
      supplierName: "Helios Aluminum Fab Ltd",
      origin: "Lagos, Nigeria (AfCFTA Corridor)",
      unitPrice: 3.68,
      productTotal: 18400,
      freightCost: 1850,
      customsDuty: 0, // 0% under AfCFTA preferential tariff
      vat: 2300,
      insurance: 160,
      escrowFee: 200,
      totalLandedCost: 22910,
      leadTimeDays: 21,
      paymentTerms: "30% Escrow deposit, 70% upon Tema customs clearance",
      incoterms: "CIF Tema Port",
      trustScore: 98,
      verifiedExports: 4,
      afcftaZeroTariff: true,
      selected: true
    },
    {
      id: "Q-02",
      rfqId: "RFQ-2026-9041",
      supplierId: "sup-2",
      supplierName: "Zhejiang Solar Hardware Corp",
      origin: "Ningbo, China",
      unitPrice: 3.36,
      productTotal: 16800,
      freightCost: 3950,
      customsDuty: 3360, // 20% standard import duty (non-AfCFTA)
      vat: 2050,
      insurance: 290,
      escrowFee: 0,
      totalLandedCost: 26450,
      leadTimeDays: 48,
      paymentTerms: "100% upfront wire (T/T)",
      incoterms: "FOB Ningbo",
      trustScore: 89,
      verifiedExports: 18,
      afcftaZeroTariff: false,
      selected: false
    },
    {
      id: "Q-03",
      rfqId: "RFQ-2026-9041",
      supplierId: "sup-3",
      supplierName: "Cape Renewables Ltd",
      origin: "Cape Town, South Africa",
      unitPrice: 3.90,
      productTotal: 19500,
      freightCost: 2200,
      customsDuty: 0, // AfCFTA
      vat: 2100,
      insurance: 150,
      escrowFee: 150,
      totalLandedCost: 24100,
      leadTimeDays: 18,
      paymentTerms: "30% Escrow deposit, 70% delivery",
      incoterms: "CIF Tema Port",
      trustScore: 94,
      verifiedExports: 8,
      afcftaZeroTariff: true,
      selected: false
    }
  ];

  const INITIAL_CORRIDORS = {
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

  const INITIAL_SHIPMENTS = [
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

  class TradeOSStore {
    constructor() {
      this.products = [...INITIAL_PRODUCTS];
      this.rfqs = [...INITIAL_RFQS];
      this.quotes = [...INITIAL_QUOTES];
      this.corridors = { ...INITIAL_CORRIDORS };
      this.shipments = [...INITIAL_SHIPMENTS];
      this.activeCorridor = "NG_GH"; // Nigeria <-> Ghana
      this.activeTrackingNumber = "TRK-AF-89412";
      this.activeView = "showcase"; // showcase, control-room, shopify-admin, operations, api
      this.catalogEngine = "native"; // 'native' (TradeOS direct) or 'shopify' (mirror)
      this.productViewMode = "grid"; // grid or table
      
      // Active Order & Procurement State
      this.activeOrder = {
        poNumber: "PO-2026-8812",
        rfqId: "RFQ-2026-9041",
        quoteId: "Q-01",
        item: "5,000 Solar Mounting Brackets (AL6063-T6)",
        supplier: "Helios Aluminum Fab Ltd (Lagos)",
        buyer: "GoldCoast Solar EPC Ltd (Accra)",
        totalAmount: 22910,
        depositAmount: 6873, // 30%
        finalAmount: 16037,  // 70%
        approvalSteps: [
          { role: "Procurement Specialist", name: "Kwame Asante", approved: true, time: "2026-10-19 09:14" },
          { role: "Head of Engineering", name: "Dr. Mensah Osei", approved: true, time: "2026-10-19 14:32" },
          { role: "Chief Procurement Officer", name: "Ama Agyemang", approved: true, time: "2026-10-20 11:05" }
        ],
        escrowDepositPaid: true,
        escrowFinalReleased: false
      };

      this.listeners = [];
      this.webhookLogs = [
        { time: "10:41:02", event: "tradeos/catalog.native_sync", payload: "Local catalog ready: 5 African manufacturing SKUs" },
        { time: "10:41:28", event: "tradeos/rfq.matched", payload: "Corridor NG-GH match found for 5,000 brackets" },
        { time: "10:42:15", event: "tradeos/escrow.locked", payload: "PAPSS Deposit of $6,873 confirmed by GhIPSS" },
        { time: "10:43:50", event: "telematics/corridor.ais", payload: "Starlink telemetry verified: E-Seal intact on MSC Feeder" }
      ];
    }

    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }

    notify(eventType, data) {
      this.listeners.forEach(fn => fn(eventType, data));
    }

    /* ------------------------------------------------------------------------
       NATIVE CATALOG ENGINE METHODS (Independent of external Shopify)
       ------------------------------------------------------------------------ */
    setCatalogEngine(mode) {
      this.catalogEngine = mode; // 'native' or 'shopify'
      this.logWebhook("tradeos/catalog.mode_switch", `Catalog engine set to: ${mode.toUpperCase()}`);
      this.notify("CATALOG_MODE_CHANGED", mode);
    }

    addProduct(productData) {
      const newProduct = {
        id: "prod-" + (Date.now()),
        sku: productData.sku || "SKU-" + Math.floor(1000 + Math.random() * 9000),
        title: productData.title || "Custom Industrial Component",
        category: productData.category || "General B2B",
        stock: parseInt(productData.stock) || 100,
        basePrice: parseFloat(productData.basePrice) || 10.00,
        b2bPrice: parseFloat(productData.b2bPrice) || 8.50,
        moq: parseInt(productData.moq) || 10,
        leadTimeDays: parseInt(productData.leadTimeDays) || 14,
        hsCode: productData.hsCode || "8479.90.00",
        weightKg: parseFloat(productData.weightKg) || 1.0,
        afcftaCertified: !!productData.afcftaCertified,
        originCountry: productData.originCountry || "Nigeria",
        originCity: productData.originCity || "Industrial Area",
        image: productData.image || "assets/hero_solar_hardware.jpg",
        description: productData.description || "Enterprise certified B2B commodity.",
        source: this.catalogEngine === 'native' ? 'tradeos_native' : 'shopify_mirror'
      };

      this.products.unshift(newProduct);
      this.logWebhook("tradeos/catalog.product_added", `Created SKU ${newProduct.sku} (${newProduct.title}) in Native Catalog`);
      this.notify("PRODUCT_ADDED", newProduct);
      return newProduct;
    }

    updateProduct(id, updates) {
      const index = this.products.findIndex(p => p.id === id);
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updates };
        this.logWebhook("tradeos/catalog.product_updated", `Updated SKU ${this.products[index].sku}`);
        this.notify("PRODUCT_UPDATED", this.products[index]);
      }
    }

    deleteProduct(id) {
      const product = this.products.find(p => p.id === id);
      this.products = this.products.filter(p => p.id !== id);
      if (product) {
        this.logWebhook("tradeos/catalog.product_deleted", `Deleted SKU ${product.sku} from Native Catalog`);
        this.notify("PRODUCT_DELETED", id);
      }
    }

    adjustStock(id, delta) {
      const product = this.products.find(p => p.id === id);
      if (product) {
        product.stock = Math.max(0, product.stock + delta);
        this.logWebhook("tradeos/catalog.stock_adjusted", `SKU ${product.sku} inventory adjusted to ${product.stock}`);
        this.notify("STOCK_ADJUSTED", product);
      }
    }

    bulkImportProducts(csvOrJsonText) {
      try {
        let imported = [];
        const raw = csvOrJsonText.trim();

        if (raw.startsWith('[') || raw.startsWith('{')) {
          const parsed = JSON.parse(raw);
          imported = Array.isArray(parsed) ? parsed : [parsed];
        } else {
          // Native CSV Parser
          const lines = raw.split(/\r?\n/);
          if (lines.length > 1) {
            const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/['"]/g, ''));
            for (let i = 1; i < lines.length; i++) {
              const cols = lines[i].split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
              if (cols.length >= 2 && cols[0]) {
                const item = {};
                headers.forEach((h, hIdx) => { item[h] = cols[hIdx] || ''; });
                imported.push({
                  sku: item.sku || `SKU-CSV-${Math.floor(1000 + Math.random() * 9000)}`,
                  title: item.title || item.name || "Imported B2B Item",
                  category: item.category || "General B2B",
                  stock: parseInt(item.stock) || 100,
                  b2bPrice: parseFloat(item.b2bprice || item.price) || 10.00,
                  basePrice: parseFloat(item.baseprice) || (parseFloat(item.b2bprice || item.price) * 1.25),
                  moq: parseInt(item.moq) || 50,
                  leadTimeDays: parseInt(item.leadtime || item.leadtimedays) || 14,
                  hsCode: item.hscode || "8479.90.00",
                  originCountry: item.origincountry || item.origin || "Ghana",
                  originCity: item.origincity || "Industrial Enclave",
                  afcftaCertified: (item.afcfta === 'true' || item.afcftacertified === 'true' || item.afcfta === '1'),
                  image: "assets/hero_solar_hardware.jpg",
                  description: item.description || "Bulk imported B2B product.",
                  source: "tradeos_native"
                });
              }
            }
          }
        }

        imported.forEach(item => {
          item.id = item.id || `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
          this.products.unshift(item);
        });

        this.logWebhook("tradeos/catalog.bulk_imported", `Successfully imported ${imported.length} SKUs into Native Catalog`);
        this.notify("CATALOG_BULK_IMPORTED", imported);
        return { success: true, count: imported.length };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }

    exportCatalogCSV() {
      const headers = "id,sku,title,category,stock,b2bPrice,basePrice,moq,leadTimeDays,hsCode,originCountry,afcftaCertified\n";
      const rows = this.products.map(p =>
        `"${p.id}","${p.sku}","${p.title.replace(/"/g, '""')}","${p.category}",${p.stock},${p.b2bPrice},${p.basePrice},${p.moq},${p.leadTimeDays},"${p.hsCode}","${p.originCountry || 'Africa'}",${p.afcftaCertified}`
      ).join("\n");
      
      const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `tradeos_catalog_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.logWebhook("tradeos/catalog.exported", `Exported ${this.products.length} SKUs to CSV`);
    }

    /* ------------------------------------------------------------------------
       END-TO-END CORRIDOR LOGISTICS & TELEMATICS METHODS
       ------------------------------------------------------------------------ */
    getActiveShipment() {
      return this.shipments.find(s => s.trackingNumber === this.activeTrackingNumber) || this.shipments[0];
    }

    setTrackingConsignment(trackingNumber) {
      const target = this.shipments.find(s => s.trackingNumber === trackingNumber);
      if (target) {
        this.activeTrackingNumber = trackingNumber;
        this.activeCorridor = target.corridorId;
        this.logWebhook("telematics/consignment.lookup", `Switched tracking to: ${trackingNumber}`);
        this.notify("SHIPMENT_CHANGED", target);
      }
    }

    advanceShipmentStage() {
      const shipment = this.getActiveShipment();
      if (!shipment) return;

      const stages = shipment.stages;
      const cur = stages.findIndex(s => s.inProgress);
      if (cur !== -1) {
        stages[cur].inProgress = false;
        stages[cur].completed = true;
        if (cur + 1 < stages.length) {
          stages[cur + 1].inProgress = true;
          this.logWebhook("logistics/corridor.milestone", `${shipment.trackingNumber} advanced to: ${stages[cur + 1].title}`);
        } else {
          // All stages complete - trigger escrow final release
          this.activeOrder.escrowFinalReleased = true;
          this.logWebhook("tradeos/escrow.released", `Full escrow release confirmed for ${shipment.trackingNumber}`);
        }
      } else {
        const lastIncomplete = stages.findIndex(s => !s.completed);
        if (lastIncomplete !== -1) {
          stages[lastIncomplete].inProgress = true;
          this.logWebhook("logistics/corridor.milestone", `${shipment.trackingNumber} active stage: ${stages[lastIncomplete].title}`);
        }
      }
      this.notify("STAGE_ADVANCED", shipment);
    }

    /* ------------------------------------------------------------------------
       BUYER RFQ & QUOTE WORKFLOW METHODS
       ------------------------------------------------------------------------ */
    selectQuote(quoteId) {
      this.quotes.forEach(q => {
        q.selected = (q.id === quoteId);
      });
      const selected = this.quotes.find(q => q.id === quoteId);
      this.notify("QUOTE_SELECTED", selected);
    }

    submitSupplierQuote(quoteData) {
      const newQuote = {
        id: "Q-" + (this.quotes.length + 1).toString().padStart(2, '0'),
        rfqId: "RFQ-2026-9041",
        supplierId: "sup-1",
        supplierName: "Helios Aluminum Fab Ltd (Lagos)",
        origin: "Lagos, Nigeria (AfCFTA Corridor)",
        unitPrice: parseFloat(quoteData.unitPrice),
        productTotal: parseFloat(quoteData.unitPrice) * 5000,
        freightCost: parseFloat(quoteData.freightCost) || 1850,
        customsDuty: 0,
        vat: 2300,
        insurance: 160,
        escrowFee: 200,
        totalLandedCost: (parseFloat(quoteData.unitPrice) * 5000) + 1850 + 2300 + 160 + 200,
        leadTimeDays: parseInt(quoteData.leadTimeDays) || 21,
        paymentTerms: quoteData.paymentTerms || "30% Escrow deposit, 70% delivery",
        incoterms: quoteData.incoterms || "CIF Tema Port",
        trustScore: 98,
        verifiedExports: 5,
        afcftaZeroTariff: true,
        selected: true
      };

      this.quotes.unshift(newQuote);
      this.selectQuote(newQuote.id);
      this.logWebhook("tradeos/quote.submitted", `Helios submitted quote for $${newQuote.productTotal}`);
      this.notify("QUOTE_SUBMITTED", newQuote);
    }

    approveCPO() {
      const cpoStep = this.activeOrder.approvalSteps.find(s => s.role.includes("Chief Procurement"));
      if (cpoStep) {
        cpoStep.approved = true;
        cpoStep.time = "Just now (Approved by Digital Key)";
        this.notify("PO_APPROVED", this.activeOrder);
      }
    }

    releaseFinalEscrow() {
      this.activeOrder.escrowFinalReleased = true;
      const shipment = this.getActiveShipment();
      if (shipment) {
        shipment.stages.forEach(s => {
          s.completed = true;
          s.inProgress = false;
        });
      }
      this.logWebhook("tradeos/escrow.released", `Released $16,037 final settlement to Helios Aluminum Fab via PAPSS`);
      this.notify("ESCROW_RELEASED", this.activeOrder);
    }

    logWebhook(event, payload) {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      this.webhookLogs.unshift({ time: timeStr, event, payload });
      if (this.webhookLogs.length > 25) this.webhookLogs.pop();
      this.notify("WEBHOOK_LOGGED", { time: timeStr, event, payload });
    }
  }

  window.TradeOSStore = new TradeOSStore();
})(window);
