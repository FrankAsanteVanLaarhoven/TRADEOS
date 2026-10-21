/**
 * TradeOS Africa - Reactive State Store
 * SOTA Africa-Native B2B Commerce Operating System & Freight Logistics Core
 * Includes: 30-Language Global Localizer, Live Multi-Currency Converter,
 * FBT (Fulfilled by TradeOS), Vendor Pricing Watch, Product Hunt Reseller Hub,
 * and Multi-Modal Fleet Telematics (Maritime AIS, Air Cargo, Uber-Style Haulage).
 */

(function(window) {
  'use strict';

  // ==========================================================================
  // 1. GLOBAL CURRENCIES & LIVE FX CONVERTER
  // ==========================================================================
  const CURRENCIES = {
    USD: { code: 'USD', symbol: '$', rate: 1.0, name: 'US Dollar ($)' },
    NGN: { code: 'NGN', symbol: '₦', rate: 1640.0, name: 'Nigerian Naira (₦)' },
    GHS: { code: 'GHS', symbol: 'GH₵', rate: 15.65, name: 'Ghana Cedi (GH₵)' },
    KES: { code: 'KES', symbol: 'KSh', rate: 129.50, name: 'Kenyan Shilling (KSh)' },
    ZAR: { code: 'ZAR', symbol: 'R', rate: 17.80, name: 'South African Rand (R)' },
    XOF: { code: 'XOF', symbol: 'CFA', rate: 595.0, name: 'West African CFA (CFA)' },
    EGP: { code: 'EGP', symbol: 'E£', rate: 48.60, name: 'Egyptian Pound (E£)' },
    EUR: { code: 'EUR', symbol: '€', rate: 0.92, name: 'Euro (€)' },
    GBP: { code: 'GBP', symbol: '£', rate: 0.77, name: 'British Pound (£)' },
    CNY: { code: 'CNY', symbol: '¥', rate: 7.12, name: 'Chinese Yuan (¥)' }
  };

  // ==========================================================================
  // 2. 30 GLOBAL & AFRICAN LANGUAGES WITH REAL-TIME TRANSLATION MATRIX
  // ==========================================================================
  const LANGUAGES = [
    { code: 'en', flag: '🇬🇧', name: 'English (Global)' },
    { code: 'fr', flag: '🇫🇷', name: 'Français (Afrique de l\'Ouest)' },
    { code: 'sw', flag: '🇰🇪', name: 'Kiswahili (East Africa)' },
    { code: 'ha', flag: '🇳🇬', name: 'Hausa (Najeriya / Sahel)' },
    { code: 'yo', flag: '🇳🇬', name: 'Yorùbá (Iwọ-oorun Afirika)' },
    { code: 'ig', flag: '🇳🇬', name: 'Asụsụ Igbo (Ọwụwa Anyanwụ)' },
    { code: 'ar', flag: '🇪🇬', name: 'العربية (North Africa)' },
    { code: 'pt', flag: '🇦🇴', name: 'Português (PALOP / Angola)' },
    { code: 'am', flag: '🇪🇹', name: 'አማርኛ (Ethiopia)' },
    { code: 'zu', flag: '🇿🇦', name: 'isiZulu (South Africa)' },
    { code: 'af', flag: '🇿🇦', name: 'Afrikaans (Suid-Afrika)' },
    { code: 'es', flag: '🇪🇸', name: 'Español (Global)' },
    { code: 'zh', flag: '🇨🇳', name: '中文 (Simplified)' },
    { code: 'de', flag: '🇩🇪', name: 'Deutsch (Europe)' },
    { code: 'hi', flag: '🇮🇳', name: 'हिन्दी (India Trade)' },
    { code: 'it', flag: '🇮🇹', name: 'Italiano (Italia)' },
    { code: 'nl', flag: '🇳🇱', name: 'Nederlands (Europe)' },
    { code: 'ru', flag: '🇷🇺', name: 'Русский (Eurasia)' },
    { code: 'ja', flag: '🇯🇵', name: '日本語 (Japan)' },
    { code: 'ko', flag: '🇰🇷', name: '한국어 (Korea)' },
    { code: 'tr', flag: '🇹🇷', name: 'Türkçe (Turkey)' },
    { code: 'rw', flag: '🇷🇼', name: 'Kinyarwanda (Rwanda)' },
    { code: 'so', flag: '🇸🇴', name: 'Soomaali (Horn of Africa)' },
    { code: 'sn', flag: '🇿🇼', name: 'chiShona (Zimbabwe)' },
    { code: 'xh', flag: '🇿🇦', name: 'isiXhosa (South Africa)' },
    { code: 'st', flag: '🇱🇸', name: 'Sesotho (Lesotho / SA)' },
    { code: 'ts', flag: '🇿🇦', name: 'Xitsonga (Southern Africa)' },
    { code: 'tn', flag: '🇧🇼', name: 'Setswana (Botswana)' },
    { code: 'pl', flag: '🇵🇱', name: 'Polski (Poland)' },
    { code: 'vi', flag: '🇻🇳', name: 'Tiếng Việt (Vietnam)' }
  ];

  const TRANSLATIONS = {
    en: {
      brandSub: "B2B Commerce Operating System",
      wholesaleTab: "Wholesale Sourcing",
      procurementTab: "Buyer Procurement",
      supplierTab: "Supplier Hub & Catalog",
      corridorTab: "Corridor Radar & Escrow",
      apiTab: "Developer API",
      enterpriseAccess: "Enterprise Access",
      nativeEngine: "TradeOS Native Sovereign Engine",
      fbtNetwork: "Fulfilled by TradeOS (FBT)",
      vendorWatch: "Vendor Pricing Watch",
      productHunt: "Product Hunt & Reseller Hub",
      bulkImport: "Bulk Import (CSV / JSON)",
      exportCsv: "Export CSV",
      activeRadar: "Global Multi-Modal Radar (Maritime AIS, Air Cargo & Road Haulage)"
    },
    fr: {
      brandSub: "Système d'Exploitation Commercial B2B",
      wholesaleTab: "Approvisionnement de Gros",
      procurementTab: "Achats Entreprise",
      supplierTab: "Pôle Fournisseurs & Catalogue",
      corridorTab: "Radar des Corridors & Séquestre",
      apiTab: "API Développeurs",
      enterpriseAccess: "Accès Entreprise",
      nativeEngine: "Moteur Souverain TradeOS Natif",
      fbtNetwork: "Expédié par TradeOS (FBT)",
      vendorWatch: "Veille des Prix Fournisseurs",
      productHunt: "Chasse aux Produits & Revente",
      bulkImport: "Import en Masse (CSV / JSON)",
      exportCsv: "Exporter en CSV",
      activeRadar: "Radar Multimodal Mondial (AIS Maritime, Fret Aérien et Routier)"
    },
    sw: {
      brandSub: "Mfumo wa Biashara wa B2B wa Afrika",
      wholesaleTab: "Upatikanaji wa Jumla",
      procurementTab: "Ununuzi wa Biashara",
      supplierTab: "Kituo cha Wasambazaji & Katalogi",
      corridorTab: "Rada ya Njia za Biashara",
      apiTab: "API ya Wasanidi Programu",
      enterpriseAccess: "Ufikiaji wa Shirika",
      nativeEngine: "Injini ya Asili ya TradeOS",
      fbtNetwork: "Imeshughulikiwa na TradeOS (FBT)",
      vendorWatch: "Uangalizi wa Bei za Wasambazaji",
      productHunt: "Kituo cha Utafutaji wa Bidhaa",
      bulkImport: "Ingiza kwa Wingi (CSV / JSON)",
      exportCsv: "Pakua CSV",
      activeRadar: "Rada ya Usafirishaji wa Kimataifa (Bahari, Ndege na Malori)"
    },
    ha: {
      brandSub: "Tsarin Kasuwancin B2B na Afirka",
      wholesaleTab: "Sayen Kaya da Jumla",
      procurementTab: "Siyarwar Kamfanoni",
      supplierTab: "Wurin Masu Kaya & Katalo",
      corridorTab: "Hanyoyin Kasuwanci & Escrow",
      apiTab: "Developer API",
      enterpriseAccess: "Shiga Kamfani",
      nativeEngine: "Kayan Aikin Asali na TradeOS",
      fbtNetwork: "Aikin Sauke Kaya na TradeOS (FBT)",
      vendorWatch: "Lura da Farashin Masu Kaya",
      productHunt: "Binciken Sabbin Kayayyaki",
      bulkImport: "Shigo da Kaya da Yawa (CSV)",
      exportCsv: "Fitar da CSV",
      activeRadar: "Babban Taswirar Bin Sahun Kaya (Jirgin Ruwa, Jirgin Sama da Motocin Kaya)"
    },
    yo: {
      brandSub: "Eto Iṣowo B2B ti Afirika",
      wholesaleTab: "Iṣowo Osunwon",
      procurementTab: "Rira Ọja Idawọle",
      supplierTab: "Gbọngan Awọn Olupese",
      corridorTab: "Ọna Ọja & Escrow",
      apiTab: "API Olùgbéejáde",
      enterpriseAccess: "Wiwọle Idawọle",
      nativeEngine: "Ẹrọ Abinibi TradeOS",
      fbtNetwork: "Pipin Nipasẹ TradeOS (FBT)",
      vendorWatch: "Iṣọwo Iye Owo Olupese",
      productHunt: "Iwari Ọja Titun",
      bulkImport: "Gbe Wọle Ni Pupọ (CSV)",
      exportCsv: "Gba CSV",
      activeRadar: "Maapu Telematics Kariaye (Omi, Ọkọ ofurufu ati Ọkọ nla)"
    },
    ar: {
      brandSub: "نظام تشغيل التجارة بين الشركات B2B",
      wholesaleTab: "التوريد بالجملة",
      procurementTab: "مشتريات المؤسسات",
      supplierTab: "مركز الموردين والكتالوج",
      corridorTab: "رادار الممرات الحرة والضمان",
      apiTab: "واجهة المطورين API",
      enterpriseAccess: "دخول المؤسسات",
      nativeEngine: "محرك TradeOS السيادي الأصلي",
      fbtNetwork: "الشحن عبر TradeOS (FBT)",
      vendorWatch: "مراقبة أسعار الموردين",
      productHunt: "مركز اكتشاف المنتجات وإعادة البيع",
      bulkImport: "استيراد مجمع (CSV / JSON)",
      exportCsv: "تصدير CSV",
      activeRadar: "رادار التتبع متعدد الوسائط (الملاحة البحرية والشحن الجوي والبري)"
    },
    zh: {
      brandSub: "非洲原生B2B商业操作系统",
      wholesaleTab: "大宗批发采购",
      procurementTab: "企业集采工作台",
      supplierTab: "供应商门户与原生目录",
      corridorTab: "AfCFTA贸易走廊与托管结算",
      apiTab: "开发者API网关",
      enterpriseAccess: "企业级访问",
      nativeEngine: "TradeOS 原生主权目录引擎",
      fbtNetwork: "TradeOS 官方保税仓储履约 (FBT)",
      vendorWatch: "全球供应商价格对比雷达",
      productHunt: "爆品发掘与分销商中心",
      bulkImport: "批量导入 (CSV / JSON)",
      exportCsv: "导出CSV目录",
      activeRadar: "全球多式联运态势雷达 (船舶AIS、全货机与干线重卡)"
    }
  };

  // ==========================================================================
  // 3. INITIAL NATIVE PRODUCTS
  // ==========================================================================
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
      source: "tradeos_native",
      customOptions: {
        finishes: ["Clear Anodized 15µm", "Black Anodized 25µm", "Mill Finish"],
        sizes: ["Standard 35mm Clamp", "Heavy-Duty 40mm Clamp", "Mid-Clamp 30-45mm Universal"],
        packaging: ["Carton (50 pcs)", "Wooden Crate (1,000 pcs)", "40ft Container Palletized"]
      }
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
      source: "tradeos_native",
      customOptions: {
        voltages: ["380V Three-Phase", "400V Grid-Tied", "415V Heavy Mining"],
        telemetry: ["Starlink Satellite + GSM Dual Sim", "Standard 4G Cellular"],
        warranty: ["5-Year Commercial", "10-Year Enterprise Extend"]
      }
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
      source: "tradeos_native",
      customOptions: {
        enclosure: ["IP55 Outdoor Containerized", "IP20 Indoor Server Rack"],
        batteryGrade: ["Tier-1 Automotive Grade A+", "Standard Commercial"]
      }
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
      source: "tradeos_native",
      customOptions: {
        lengths: ["4400mm Standard", "3200mm Compact", "6000mm Commercial Span"],
        surface: ["Anodized Silver", "Anodized Black"]
      }
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
      source: "tradeos_native",
      customOptions: {
        processing: ["Deodorized", "Natural Unrefined Single-Origin"],
        packType: ["25kg Food-Grade Box", "200kg Steel Drum", "20MT Flexitank"]
      }
    }
  ];

  // ==========================================================================
  // 4. FULFILLED BY TRADEOS (FBT) BONDED WAREHOUSE NETWORK
  // ==========================================================================
  const FBT_WAREHOUSES = [
    {
      id: "fbt-los",
      name: "Lagos Free Zone Mega Hub",
      code: "FBT-LFZ-01",
      country: "Nigeria",
      city: "Lekki, Lagos",
      capacitySqFt: 180000,
      utilizedPct: 68,
      activeSKUs: 420,
      bondedStatus: "Customs Bonded Area (Zero Duty on Transit)",
      dispatchSLA: "4-Hour Pick, Pack & Gate-Out",
      feederPort: "Lekki Deep Sea Port / Apapa",
      storageFeePerCbm: 14.50
    },
    {
      id: "fbt-tma",
      name: "Tema Bonded Logistics Enclave",
      code: "FBT-TMA-02",
      country: "Ghana",
      city: "Tema Heavy Industrial Area",
      capacitySqFt: 120000,
      utilizedPct: 54,
      activeSKUs: 310,
      bondedStatus: "Ghana Free Zones Authority Registered",
      dispatchSLA: "Same-Day Cross-Border Dispatch to Abidjan/Lome",
      feederPort: "Tema MPS Terminal 3",
      storageFeePerCbm: 12.80
    },
    {
      id: "fbt-mba",
      name: "Mombasa Northern Corridor ICD",
      code: "FBT-MBA-03",
      country: "Kenya",
      city: "Mombasa SEZ",
      capacitySqFt: 150000,
      utilizedPct: 72,
      activeSKUs: 380,
      bondedStatus: "KRA Single Customs Territory Bonded",
      dispatchSLA: "Direct Standard Gauge Rail Link to Kampala",
      feederPort: "Kilindini Harbour",
      storageFeePerCbm: 13.20
    },
    {
      id: "fbt-dur",
      name: "Dube TradePort Special Economic Zone",
      code: "FBT-DUR-04",
      country: "South Africa",
      city: "Durban / King Shaka Hub",
      capacitySqFt: 220000,
      utilizedPct: 61,
      activeSKUs: 560,
      bondedStatus: "SARS Accredited Bonded Warehouse",
      dispatchSLA: "Express Super-B Double Link to Zambia/DRC",
      feederPort: "Port of Durban",
      storageFeePerCbm: 15.00
    },
    {
      id: "fbt-tng",
      name: "Tanger Med Logistics Free Zone",
      code: "FBT-TNG-05",
      country: "Morocco",
      city: "Tangier Hub",
      capacitySqFt: 200000,
      utilizedPct: 49,
      activeSKUs: 290,
      bondedStatus: "Mediterranean / West Africa Transshipment Gate",
      dispatchSLA: "Ro-Ro & Containerized Express Hub",
      feederPort: "Tanger Med Port",
      storageFeePerCbm: 16.50
    }
  ];

  // ==========================================================================
  // 5. VENDOR PRICING WATCH & SUPPLIES MATCH RADAR
  // ==========================================================================
  const VENDOR_PRICE_WATCH = [
    {
      sku: "SLR-MNT-AL6063",
      productTitle: "Solar Mounting Hardware AL6063-T6",
      africanVendor: { name: "Helios Aluminum Fab (Lagos, NG)", priceUSD: 3.68, moq: 500, leadDays: 21, afcftaDuty: 0, landedUSD: 3.98 },
      asiaVendor: { name: "Zhejiang Solar Hardware (Ningbo, CN)", priceUSD: 3.36, moq: 2000, leadDays: 48, dutyRate: 0.20, landedUSD: 4.86 },
      indianVendor: { name: "Gujarat Extrusions Ltd (Mundra, IN)", priceUSD: 3.52, moq: 1500, leadDays: 38, dutyRate: 0.20, landedUSD: 4.98 },
      advantagePct: 18.1,
      priceTrend: "down",
      shortageRisk: "LOW (Local Smelter Supply Stable)"
    },
    {
      sku: "AURA-INV-50KW",
      productTitle: "50kW Commercial Hybrid Inverter",
      africanVendor: { name: "Savannah Power Tech (Mombasa, KE)", priceUSD: 3450, moq: 2, leadDays: 14, afcftaDuty: 0, landedUSD: 3590 },
      asiaVendor: { name: "Shenzhen GrowPower Tech (Shenzhen, CN)", priceUSD: 3200, moq: 5, leadDays: 42, dutyRate: 0.20, landedUSD: 4180 },
      indianVendor: { name: "Tata Solar Component Co (Mumbai, IN)", priceUSD: 3380, moq: 4, leadDays: 32, dutyRate: 0.20, landedUSD: 4320 },
      advantagePct: 14.1,
      priceTrend: "stable",
      shortageRisk: "MEDIUM (Semiconductor allocation)"
    },
    {
      sku: "AGR-COCOA-BUTTER",
      productTitle: "Prime Pressed Pure Cocoa Butter (Food Grade)",
      africanVendor: { name: "GoldCoast Cocoa Processors (Tema, GH)", priceUSD: 7.45, moq: 1000, leadDays: 12, afcftaDuty: 0, landedUSD: 7.82 },
      asiaVendor: { name: "Indonesian Cocoa Derivatives (Jakarta, ID)", priceUSD: 8.90, moq: 5000, leadDays: 45, dutyRate: 0.20, landedUSD: 11.20 },
      indianVendor: { name: "Kerala Agro Confection (Cochin, IN)", priceUSD: 9.15, moq: 2500, leadDays: 40, dutyRate: 0.20, landedUSD: 11.55 },
      advantagePct: 30.2,
      priceTrend: "up",
      shortageRisk: "LOW (Direct Cocoa Belt Harvest)"
    }
  ];

  // ==========================================================================
  // 6. PRODUCT HUNT & RESELLER HUB
  // ==========================================================================
  const RESELLER_HUNT_ITEMS = [
    {
      id: "hunt-1",
      sku: "AGR-SHEA-ORG",
      title: "100% Grade-A Organic Unrefined Shea Butter (50kg Drum)",
      category: "Cosmetics & Agro Processing",
      origin: "Tamale, Ghana",
      supplier: "Savannah Women's Shea Bio-Collective",
      b2bWholesaleUSD: 4.20,
      suggestedRetailUSD: 18.50,
      estimatedMarginPct: 77.3,
      moq: 100,
      verifiedCert: "USDA Organic • Ecocert Fair Trade • AfCFTA #GH-9021",
      whiteLabelAvailable: true,
      samplesAvailable: true,
      dropshipReady: true,
      image: "assets/hero_solar_hardware.jpg"
    },
    {
      id: "hunt-2",
      sku: "SOL-GEN-500W",
      title: "All-in-One Portable 512Wh Solar Power Generator Hub",
      category: "Consumer Energy & Electronics",
      origin: "Lagos, Nigeria",
      supplier: "Aura Clean Energy Manufacturing Ltd",
      b2bWholesaleUSD: 185.00,
      suggestedRetailUSD: 399.00,
      estimatedMarginPct: 53.6,
      moq: 10,
      verifiedCert: "SONCAP • CE • UN38.3 Lithium Transport",
      whiteLabelAvailable: true,
      samplesAvailable: true,
      dropshipReady: true,
      image: "assets/industrial_inverter.jpg"
    },
    {
      id: "hunt-3",
      sku: "TEX-WAX-PREM",
      title: "Hand-Dyed Authentic Indigo & Wax Print Cotton Textiles (12-Yard)",
      category: "Apparel & Textiles",
      origin: "Abeokuta, Nigeria",
      supplier: "Adire Heritage Fabric Works",
      b2bWholesaleUSD: 28.00,
      suggestedRetailUSD: 95.00,
      estimatedMarginPct: 70.5,
      moq: 20,
      verifiedCert: "AfCFTA Rules of Origin 100% Wholly Produced",
      whiteLabelAvailable: true,
      samplesAvailable: true,
      dropshipReady: true,
      image: "assets/hero_solar_hardware.jpg"
    },
    {
      id: "hunt-4",
      sku: "BEV-COFF-YIRG",
      title: "Single-Origin Yirgacheffe Specialty Washed Green Coffee (60kg)",
      category: "Specialty Agro Commodities",
      origin: "Yirgacheffe, Ethiopia",
      supplier: "Oromia Highland Coffee Producers Cooperative",
      b2bWholesaleUSD: 6.80,
      suggestedRetailUSD: 24.00,
      estimatedMarginPct: 71.6,
      moq: 300,
      verifiedCert: "Q-Grader Score 88.5 • RainForest Alliance",
      whiteLabelAvailable: true,
      samplesAvailable: true,
      dropshipReady: false,
      image: "assets/hero_solar_hardware.jpg"
    }
  ];

  // ==========================================================================
  // 7. GLOBAL MULTI-MODAL RADAR FLEET (MARITIME AIS, AIR CARGO & HAULAGE)
  // ==========================================================================
  const MULTIMODAL_FLEET = [
    // Maritime AIS Vessels
    {
      id: "vsl-01",
      type: "maritime",
      carrier: "MSC (Mediterranean Shipping)",
      vesselName: "MSC West Africa Express (IMO: 9811024)",
      flag: "Liberia",
      lat: 5.820,
      lon: 2.140,
      speedKnots: 15.2,
      headingDeg: 265,
      originPort: "Port of Apapa (Lagos, Nigeria)",
      destPort: "Tema Port Terminal 3 (Ghana)",
      cargoDescription: "40ft High Cube • 5,000 Solar Brackets & Inverters",
      teuCapacity: 4500,
      currentTeu: 3820,
      eta: "Oct 22, 14:00 GMT",
      telematicsStatus: "Starlink AIS Connected • Keel Clearance Normal"
    },
    {
      id: "vsl-02",
      type: "maritime",
      carrier: "Maersk Line",
      vesselName: "Maersk Tema Feeder (IMO: 9740112)",
      flag: "Denmark",
      lat: 4.120,
      lon: -1.780,
      speedKnots: 14.1,
      headingDeg: 82,
      originPort: "Abidjan Port (Côte d'Ivoire)",
      destPort: "Tema Port (Ghana)",
      cargoDescription: "Reefer & Dry Containers (Cocoa Butter & Rubber)",
      teuCapacity: 3200,
      currentTeu: 2900,
      eta: "Oct 22, 22:30 GMT",
      telematicsStatus: "AIS Class A Nominal • Optimal Sea State"
    },
    {
      id: "vsl-03",
      type: "maritime",
      carrier: "CMA CGM",
      vesselName: "CMA CGM Tanger Med (IMO: 9698421)",
      flag: "France",
      lat: 34.10,
      lon: -6.40,
      speedKnots: 18.4,
      headingDeg: 195,
      originPort: "Tanger Med Port (Morocco)",
      destPort: "Dakar Port (Senegal)",
      cargoDescription: "Automotive Parts & Solar Electronics",
      teuCapacity: 6800,
      currentTeu: 6100,
      eta: "Oct 23, 18:00 GMT",
      telematicsStatus: "Military Grade GPS Encrypted • Nominal"
    },

    // Air Cargo Flights
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

    // Uber-Style Road Haulage Fleet (Live Trucks on Road Corridors)
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

  class TradeOSStore {
    constructor() {
      this.products = [...INITIAL_PRODUCTS];
      this.fbtWarehouses = [...FBT_WAREHOUSES];
      this.vendorPriceWatch = [...VENDOR_PRICE_WATCH];
      this.resellerHuntItems = [...RESELLER_HUNT_ITEMS];
      this.multimodalFleet = [...MULTIMODAL_FLEET];
      
      this.currencies = CURRENCIES;
      this.currentCurrency = 'USD';
      this.languages = LANGUAGES;
      this.currentLanguage = 'en';

      this.currentTheme = 'dark';
      this.initTheme();

      this.activeCorridor = "NG_GH";
      this.activeTrackingNumber = "TRK-AF-89412";
      this.activeView = "showcase";
      this.catalogEngine = "native";
      this.supplierSubView = "catalog"; // 'catalog', 'fbt', 'pricewatch', 'hunt'
      this.fleetFilter = "all"; // 'all', 'maritime', 'air', 'road'
      this.selectedFleetItemId = "trk-01";
      this.productViewMode = "grid";

      this.listeners = [];
      this.webhookLogs = [
        { time: "10:41:02", event: "tradeos/catalog.native_sync", payload: "Local catalog ready: 5 African manufacturing SKUs" },
        { time: "10:41:28", event: "telematics/multimodal.ais", payload: "Starlink AIS live: MSC West Africa Express en route to Tema" },
        { time: "10:42:15", event: "telematics/uber_haulage.ping", payload: "Truck LND-482-XA (Driver Babatunde) approach Seme-Krake" },
        { time: "10:43:50", event: "fbt/replenishment.optimal", payload: "Lagos Free Zone Mega Hub (FBT-LFZ-01) stock nominal" }
      ];

      // Order State
      this.activeOrder = {
        poNumber: "PO-2026-8812",
        rfqId: "RFQ-2026-9041",
        quoteId: "Q-01",
        item: "5,000 Solar Mounting Brackets (AL6063-T6)",
        supplier: "Helios Aluminum Fab Ltd (Lagos)",
        buyer: "GoldCoast Solar EPC Ltd (Accra)",
        totalAmount: 22910,
        depositAmount: 6873,
        finalAmount: 16037,
        approvalSteps: [
          { role: "Procurement Specialist", name: "Kwame Asante", approved: true, time: "2026-10-19 09:14" },
          { role: "Head of Engineering", name: "Dr. Mensah Osei", approved: true, time: "2026-10-19 14:32" },
          { role: "Chief Procurement Officer", name: "Ama Agyemang", approved: true, time: "2026-10-20 11:05" }
        ],
        escrowDepositPaid: true,
        escrowFinalReleased: false
      };

      this.quotes = [
        {
          id: "Q-01",
          rfqId: "RFQ-2026-9041",
          supplierId: "sup-1",
          supplierName: "Helios Aluminum Fab Ltd",
          origin: "Lagos, Nigeria (AfCFTA Corridor)",
          unitPrice: 3.68,
          productTotal: 18400,
          freightCost: 1850,
          customsDuty: 0,
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
        }
      ];

      this.shipments = [
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
        }
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

    // ------------------------------------------------------------------------
    // CURRENCY CONVERSION & FORMATTING
    // ------------------------------------------------------------------------
    setCurrency(code) {
      if (this.currencies[code]) {
        this.currentCurrency = code;
        this.logWebhook("tradeos/fx.switch", `Switched reporting currency to ${code} (Rate: ${this.currencies[code].rate})`);
        this.notify("CURRENCY_CHANGED", code);
      }
    }

    formatPrice(amountUSD) {
      const cur = this.currencies[this.currentCurrency] || this.currencies.USD;
      const converted = amountUSD * cur.rate;
      if (cur.code === 'NGN' || cur.code === 'XOF' || cur.code === 'KES') {
        return `${cur.symbol}${Math.round(converted).toLocaleString()}`;
      }
      return `${cur.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    // ------------------------------------------------------------------------
    // DARK / LIGHT / SYSTEM THEME ENGINE
    // ------------------------------------------------------------------------
    initTheme() {
      try {
        const saved = localStorage.getItem('tradeos_theme');
        if (saved && ['dark', 'light', 'system'].includes(saved)) {
          this.currentTheme = saved;
        } else {
          this.currentTheme = 'dark';
        }
      } catch (e) {
        this.currentTheme = 'dark';
      }
      this.applyTheme(this.currentTheme);
    }

    setTheme(theme) {
      if (!['dark', 'light', 'system'].includes(theme)) return;
      this.currentTheme = theme;
      try {
        localStorage.setItem('tradeos_theme', theme);
      } catch (e) {}
      this.applyTheme(theme);
      this.logWebhook("tradeos/theme.switch", `Theme set to: ${theme.toUpperCase()}`);
      this.notify("THEME_CHANGED", theme);
    }

    applyTheme(theme) {
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.setAttribute('data-theme', theme);
      }
    }

    // ------------------------------------------------------------------------
    // 30 LANGUAGES LOCALIZATION
    // ------------------------------------------------------------------------
    setLanguage(langCode) {
      this.currentLanguage = langCode;
      this.logWebhook("tradeos/locale.switch", `Interface translated to: ${langCode.toUpperCase()}`);
      this.notify("LANGUAGE_CHANGED", langCode);
    }

    t(key) {
      const langDict = TRANSLATIONS[this.currentLanguage] || TRANSLATIONS.en;
      return langDict[key] || TRANSLATIONS.en[key] || key;
    }

    // ------------------------------------------------------------------------
    // SUPPLIER HUB SUB-VIEWS
    // ------------------------------------------------------------------------
    setSupplierSubView(view) {
      this.supplierSubView = view; // 'catalog', 'fbt', 'pricewatch', 'hunt'
      this.notify("SUPPLIER_SUBVIEW_CHANGED", view);
    }

    // ------------------------------------------------------------------------
    // NATIVE CATALOG & CUSTOMIZATION CRUD
    // ------------------------------------------------------------------------
    setCatalogEngine(mode) {
      this.catalogEngine = mode;
      this.logWebhook("tradeos/catalog.mode_switch", `Engine set to: ${mode.toUpperCase()}`);
      this.notify("CATALOG_MODE_CHANGED", mode);
    }

    addProduct(productData) {
      const newProduct = {
        id: "prod-" + Date.now(),
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
        source: this.catalogEngine === 'native' ? 'tradeos_native' : 'shopify_mirror',
        customOptions: productData.customOptions || {
          packaging: ["Palletized Box (500 units)", "Industrial Bulk Crate"],
          finishes: ["Standard Factory Finish"]
        }
      };

      this.products.unshift(newProduct);
      this.logWebhook("tradeos/catalog.product_added", `Created SKU ${newProduct.sku} in Native Catalog`);
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
        this.logWebhook("tradeos/catalog.product_deleted", `Deleted SKU ${product.sku}`);
        this.notify("PRODUCT_DELETED", id);
      }
    }

    adjustStock(id, delta) {
      const product = this.products.find(p => p.id === id);
      if (product) {
        product.stock = Math.max(0, product.stock + delta);
        this.logWebhook("tradeos/catalog.stock_adjusted", `SKU ${product.sku} adjusted to ${product.stock}`);
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

        this.logWebhook("tradeos/catalog.bulk_imported", `Imported ${imported.length} SKUs into Native Catalog`);
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

    // ------------------------------------------------------------------------
    // FULFILLED BY TRADEOS (FBT)
    // ------------------------------------------------------------------------
    replenishWarehouse(warehouseId, sku, units) {
      const wh = this.fbtWarehouses.find(w => w.id === warehouseId);
      if (wh) {
        wh.activeSKUs += 1;
        this.logWebhook("fbt/replenishment.inbound", `Inbound dispatch of ${units} units (${sku}) to ${wh.name}`);
        this.notify("FBT_UPDATED", wh);
      }
    }

    // ------------------------------------------------------------------------
    // MULTI-MODAL RADAR FLEET
    // ------------------------------------------------------------------------
    setFleetFilter(filter) {
      this.fleetFilter = filter; // 'all', 'maritime', 'air', 'road'
      this.notify("FLEET_FILTER_CHANGED", filter);
    }

    selectFleetItem(id) {
      this.selectedFleetItemId = id;
      const item = this.multimodalFleet.find(f => f.id === id);
      if (item) {
        this.logWebhook("telematics/radar.inspect", `Inspecting telemetry: ${item.vesselName || item.flightNumber || item.truckPlate}`);
        this.notify("FLEET_ITEM_SELECTED", item);
      }
    }

    getFilteredFleet() {
      if (this.fleetFilter === 'all') return this.multimodalFleet;
      return this.multimodalFleet.filter(f => f.type === this.fleetFilter);
    }

    // ------------------------------------------------------------------------
    // END-TO-END SHIPMENT STATE
    // ------------------------------------------------------------------------
    getActiveShipment() {
      return this.shipments.find(s => s.trackingNumber === this.activeTrackingNumber) || this.shipments[0];
    }

    setTrackingConsignment(trackingNumber) {
      const target = this.shipments.find(s => s.trackingNumber === trackingNumber);
      if (target) {
        this.activeTrackingNumber = trackingNumber;
        this.activeCorridor = target.corridorId;
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
          this.activeOrder.escrowFinalReleased = true;
          this.logWebhook("tradeos/escrow.released", `Full escrow release confirmed for ${shipment.trackingNumber}`);
        }
      } else {
        const lastIncomplete = stages.findIndex(s => !s.completed);
        if (lastIncomplete !== -1) {
          stages[lastIncomplete].inProgress = true;
        }
      }
      this.notify("STAGE_ADVANCED", shipment);
    }

    releaseFinalEscrow() {
      if (this.activeOrder) {
        this.activeOrder.escrowFinalReleased = true;
      }
      this.logWebhook("tradeos/escrow.released", `Manual escrow milestone release of $16,037 to supplier via GhIPSS/PAPSS settlement`);
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
