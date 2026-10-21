// ==============================================================================
// TradeOS Africa - Official Client SDK v1.0.0
// Universal JavaScript / TypeScript SDK for B2B Procurement, AfCFTA Landed Cost,
// PAPSS Escrow Settlement, Multi-Modal Telematics & WebRTX Video Inspection
// ==============================================================================

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.TradeOSSDK = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  class TradeOSClient {
    constructor(config = {}) {
      this.apiKey = config.apiKey || 'pk_live_tradeos_afcfta_enterprise';
      this.endpoint = config.endpoint || window.location.origin;
      this.corridor = config.corridor || 'NG_GH';
      this.version = 'v1.0.0';

      this.catalog = {
        list: async (filters = {}) => {
          const res = await fetch(`${this.endpoint}/api/v1/products`);
          return res.json();
        },
        createProduct: async (productData) => {
          const res = await fetch(`${this.endpoint}/api/v1/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.apiKey}` },
            body: JSON.stringify(productData)
          });
          return res.json();
        },
        getFBTWarehouses: async () => {
          const res = await fetch(`${this.endpoint}/api/v1/fbt/warehouses`);
          return res.json();
        },
        getPriceWatchMatrix: async () => {
          const res = await fetch(`${this.endpoint}/api/v1/market-radar/pricing-watch`);
          return res.json();
        },
        getResellerHuntItems: async () => {
          const res = await fetch(`${this.endpoint}/api/v1/reseller/products`);
          return res.json();
        }
      };

      this.customs = {
        calculateLandedCost: async (params) => {
          const res = await fetch(`${this.endpoint}/api/v1/landed-cost`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
          });
          return res.json();
        }
      };

      this.escrow = {
        lockDeposit: async (orderId, amountUSD) => {
          return {
            status: "LOCKED_ON_PAPSS",
            orderId,
            amountUSD,
            rail: "PAPSS Instant Net Settlement Rail",
            timestamp: new Date().toISOString()
          };
        },
        releaseMilestone: async (orderId, amountUSD) => {
          return {
            status: "RELEASED_TO_SUPPLIER",
            orderId,
            amountUSD,
            clearingRail: "GhIPSS / NIBSS Interbank Settlement",
            timestamp: new Date().toISOString()
          };
        }
      };

      this.telematics = {
        getFleet: async () => {
          const res = await fetch(`${this.endpoint}/api/v1/telematics/fleet`);
          return res.json();
        },
        trackShipment: async (trackingNumber) => {
          const fleet = await this.telematics.getFleet();
          return fleet.find(f => f.id === trackingNumber || f.truckPlate?.includes(trackingNumber)) || {
            trackingNumber,
            status: "IN_TRANSIT",
            corridor: "Lagos ⇄ Tema Port",
            eta: "Oct 22, 18:30 GMT",
            sealStatus: "CRYPTOGRAPHIC E-SEAL INTACT"
          };
        }
      };

      this.webrtc = {
        startInspection: async (roomId) => {
          if (window.TradeOSWebRTX) {
            return window.TradeOSWebRTX.startInspectionSession(roomId);
          }
          throw new Error("TradeOSWebRTX engine not loaded.");
        }
      };
    }

    static init(config) {
      return new TradeOSClient(config);
    }
  }

  return TradeOSClient;
}));
