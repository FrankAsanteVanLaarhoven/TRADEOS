/**
 * TradeOS Africa - Reactive State Store
 * SOTA Africa-Native B2B Commerce Operating System
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
      image: "assets/hero_solar_hardware.jpg",
      description: "Extruded AL6063-T6 anodized aluminum mounting bracket with pre-torqued stainless fasteners. Engineered for coastal corrosion resistance."
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
      image: "assets/industrial_inverter.jpg",
      description: "IP68 enterprise commercial solar inverter with built-in cellular telemetry and automatic phase balancing for West African grid stability."
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
      image: "assets/industrial_inverter.jpg",
      description: "Prismatic LiFePO4 cells with smart dual-BMS, active aerosol fire suppression, and liquid cooling for tropical ambient conditions."
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
      image: "assets/hero_solar_hardware.jpg",
      description: "Structural mounting rail certified to withstand 160km/h coastal wind gusts across the Gulf of Guinea corridor."
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

  class TradeOSStore {
    constructor() {
      this.products = [...INITIAL_PRODUCTS];
      this.rfqs = [...INITIAL_RFQS];
      this.quotes = [...INITIAL_QUOTES];
      this.activeCorridor = "NG_GH"; // Nigeria <-> Ghana
      this.activeView = "showcase"; // showcase, control-room, shopify-admin, operations, api
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
        escrowFinalReleased: false,
        currentStageIndex: 6, // 0 to 8
        stages: [
          { id: 1, title: "RFQ Issued & Matched", desc: "GoldCoast Solar matched with 3 Tier-1 suppliers", completed: true, timestamp: "Oct 18, 10:20" },
          { id: 2, title: "Landed-Cost Analysis & Quote Accepted", desc: "Helios Fab $22,910 landed accepted over China import", completed: true, timestamp: "Oct 19, 08:45" },
          { id: 3, title: "Digital PO Signed & 3-Tier Approval", desc: "CPO Ama Agyemang approved budget code GH-SOL-09", completed: true, timestamp: "Oct 19, 14:32" },
          { id: 4, title: "30% Escrow Deposited ($6,873)", desc: "Secured via Pan-African Payment & Settlement System (PAPSS)", completed: true, timestamp: "Oct 19, 16:10" },
          { id: 5, title: "Factory Production & Quality Stamping", desc: "Lagos fabrication completed; AfCFTA batch tag #NG-4819", completed: true, timestamp: "Oct 20, 11:30" },
          { id: 6, title: "Apapa Port Customs Clearance", desc: "Nigeria Customs Service issued export clearance manifest", completed: true, timestamp: "Oct 20, 18:00" },
          { id: 7, title: "Gulf of Guinea Coastal Transit", desc: "Vessel MSC West Africa en route to Tema Port (ETA 28 hrs)", completed: false, inProgress: true, timestamp: "In Transit" },
          { id: 8, title: "AfCFTA Duty Waiver & Tema Port Release", desc: "Ghana Revenue Authority validates zero-tariff certificate", completed: false, inProgress: false, timestamp: "Pending Arrival" },
          { id: 9, title: "Final Inspection & 70% Escrow Release", desc: "Goods accepted at Accra warehouse; $16,037 released to Helios", completed: false, inProgress: false, timestamp: "Pending Acceptance" }
        ]
      };

      this.listeners = [];
      this.webhookLogs = [
        { time: "10:41:02", event: "shopify/inventory_levels.update", payload: "SLR-MNT-AL6063 stock sync: 42,000 units" },
        { time: "10:41:28", event: "tradeos/rfq.matched", payload: "Corridor NG-GH match found for 5,000 brackets" },
        { time: "10:42:15", event: "tradeos/escrow.locked", payload: "PAPSS Deposit of $6,873 confirmed by GhIPSS" }
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

    /* CRUD Operations for Products */
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
        image: productData.image || "assets/hero_solar_hardware.jpg",
        description: productData.description || "Enterprise certified B2B commodity."
      };

      this.products.unshift(newProduct);
      this.logWebhook("shopify/products.create", `Created SKU ${newProduct.sku} (${newProduct.title})`);
      this.notify("PRODUCT_ADDED", newProduct);
      return newProduct;
    }

    updateProduct(id, updates) {
      const index = this.products.findIndex(p => p.id === id);
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updates };
        this.logWebhook("shopify/products.update", `Updated SKU ${this.products[index].sku}`);
        this.notify("PRODUCT_UPDATED", this.products[index]);
      }
    }

    deleteProduct(id) {
      const product = this.products.find(p => p.id === id);
      this.products = this.products.filter(p => p.id !== id);
      if (product) {
        this.logWebhook("shopify/products.delete", `Deleted SKU ${product.sku}`);
        this.notify("PRODUCT_DELETED", id);
      }
    }

    adjustStock(id, delta) {
      const product = this.products.find(p => p.id === id);
      if (product) {
        product.stock = Math.max(0, product.stock + delta);
        this.logWebhook("shopify/inventory_levels.set", `SKU ${product.sku} adjusted to ${product.stock}`);
        this.notify("STOCK_ADJUSTED", product);
      }
    }

    /* Workflow Actions */
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
      // Mark stage 8 and 9 completed
      this.activeOrder.stages[7].completed = true;
      this.activeOrder.stages[7].inProgress = false;
      this.activeOrder.stages[8].completed = true;
      this.activeOrder.stages[8].inProgress = false;
      this.activeOrder.currentStageIndex = 8;
      this.logWebhook("tradeos/escrow.released", `Released $16,037 final settlement to Helios Aluminum Fab`);
      this.notify("ESCROW_RELEASED", this.activeOrder);
    }

    advanceShipmentStage() {
      const stages = this.activeOrder.stages;
      const cur = stages.findIndex(s => s.inProgress);
      if (cur !== -1) {
        stages[cur].inProgress = false;
        stages[cur].completed = true;
        if (cur + 1 < stages.length) {
          stages[cur + 1].inProgress = true;
          this.logWebhook("logistics/corridor.milestone", `Stage advanced to: ${stages[cur + 1].title}`);
        } else {
          this.releaseFinalEscrow();
        }
      } else {
        const lastIncomplete = stages.findIndex(s => !s.completed);
        if (lastIncomplete !== -1) {
          stages[lastIncomplete].inProgress = true;
          this.logWebhook("logistics/corridor.milestone", `Stage active: ${stages[lastIncomplete].title}`);
        }
      }
      this.notify("STAGE_ADVANCED", this.activeOrder);
    }

    logWebhook(event, payload) {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      this.webhookLogs.unshift({ time: timeStr, event, payload });
      if (this.webhookLogs.length > 20) this.webhookLogs.pop();
      this.notify("WEBHOOK_LOGGED", { time: timeStr, event, payload });
    }
  }

  window.TradeOSStore = new TradeOSStore();
})(window);
