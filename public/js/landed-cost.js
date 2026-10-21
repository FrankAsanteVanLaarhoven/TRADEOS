/**
 * TradeOS Africa - Landed-Cost Engine
 * Transparent Landed-Cost Calculation for Intra-African & Global Trade
 */

(function(window) {
  'use strict';

  class LandedCostEngine {
    constructor() {
      this.corridors = {
        "NG_GH": {
          name: "Nigeria ⇄ Ghana (Lagos / Tema)",
          originCountry: "Nigeria",
          destCountry: "Ghana",
          freightBase: 1200,
          freightPerKg: 0.35,
          dutyRateStandard: 0.20,
          dutyRateAfCFTA: 0.00, // 0% Duty under AfCFTA preferential trade
          vatRate: 0.125, // 12.5% VAT
          insuranceRate: 0.008,
          platformFeeRate: 0.01,
          leadDaysLocal: 18,
          leadDaysAsia: 48
        },
        "KE_UG": {
          name: "Kenya ⇄ Uganda (Mombasa / Kampala)",
          originCountry: "Kenya",
          destCountry: "Uganda",
          freightBase: 1400,
          freightPerKg: 0.40,
          dutyRateStandard: 0.25,
          dutyRateAfCFTA: 0.00,
          vatRate: 0.18,
          insuranceRate: 0.009,
          platformFeeRate: 0.01,
          leadDaysLocal: 12,
          leadDaysAsia: 45
        },
        "ZA_ZM": {
          name: "South Africa ⇄ Zambia (JHB / Lusaka)",
          originCountry: "South Africa",
          destCountry: "Zambia",
          freightBase: 1600,
          freightPerKg: 0.42,
          dutyRateStandard: 0.25,
          dutyRateAfCFTA: 0.00,
          vatRate: 0.16,
          insuranceRate: 0.008,
          platformFeeRate: 0.01,
          leadDaysLocal: 14,
          leadDaysAsia: 52
        }
      };
    }

    calculate({ quantity, unitPrice, originType, corridorKey, unitWeightKg = 0.38 }) {
      const config = this.corridors[corridorKey] || this.corridors["NG_GH"];
      const isAfCFTA = (originType === "africa");
      
      const productCost = quantity * unitPrice;
      const totalWeightKg = quantity * unitWeightKg;
      
      // Freight
      const freight = isAfCFTA 
        ? config.freightBase + (totalWeightKg * config.freightPerKg * 0.7) 
        : config.freightBase * 2.6 + (totalWeightKg * 0.9);

      // CIF Value
      const cif = productCost + freight;

      // Duty
      const duty = isAfCFTA ? 0 : (cif * config.dutyRateStandard);

      // VAT
      const vat = (cif + duty) * config.vatRate;

      // Cargo Insurance
      const insurance = cif * config.insuranceRate;

      // Platform Escrow Fee (1%)
      const platformFee = productCost * config.platformFeeRate;

      // Total Landed Cost
      const totalLandedCost = productCost + freight + duty + vat + insurance + platformFee;
      const landedPerUnit = totalLandedCost / quantity;

      // Estimated compare against non-AfCFTA Asian sourcing baseline
      const nonAfcftaDuty = (productCost + (config.freightBase * 2.6 + totalWeightKg * 0.9)) * config.dutyRateStandard;
      const baselineLanded = productCost + (config.freightBase * 2.6 + totalWeightKg * 0.9) + nonAfcftaDuty + vat + (cif * 0.012);
      const savings = Math.max(0, baselineLanded - totalLandedCost);
      const daysSaved = isAfCFTA ? (config.leadDaysAsia - config.leadDaysLocal) : 0;

      return {
        productCost,
        freight: Math.round(freight),
        duty: Math.round(duty),
        vat: Math.round(vat),
        insurance: Math.round(insurance),
        platformFee: Math.round(platformFee),
        totalLandedCost: Math.round(totalLandedCost),
        landedPerUnit: landedPerUnit.toFixed(2),
        savings: Math.round(savings),
        daysSaved,
        isAfCFTA
      };
    }
  }

  window.TradeOSLandedCostEngine = new LandedCostEngine();
})(window);
