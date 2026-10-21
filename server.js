/**
 * TradeOS Africa - Enterprise HTTP & API Gateway
 * Zero-dependency, standards-compliant server with REST, GraphQL, and static asset pipeline.
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
  '.txt': 'text/plain; charset=UTF-8'
};

// In-memory catalog state
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
    image: "assets/hero_solar_hardware.jpg",
    description: "Extruded AL6063-T6 anodized aluminum mounting bracket with pre-torqued stainless fasteners."
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
    description: "IP68 enterprise commercial solar inverter with built-in telemetry for West African grid stability."
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
    description: "Prismatic LiFePO4 cells with dual-BMS and liquid cooling for tropical ambient conditions."
  }
];

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Shopify-Hmac-Sha256');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const urlPath = req.url.split('?')[0];

  // API Route: Health
  if (urlPath === '/api/v1/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: "HEALTHY",
      service: "TradeOS Africa Core Engine",
      version: "v2.4.0-enterprise",
      environment: "production-hardened",
      timestamp: new Date().toISOString(),
      corridors: {
        NG_GH: "OPERATIONAL (Lagos ⇄ Tema Port)",
        KE_UG: "OPERATIONAL (Mombasa ⇄ Kampala)",
        ZA_ZM: "OPERATIONAL (Johannesburg ⇄ Lusaka)"
      },
      settlementRails: ["PAPSS", "GhIPSS", "NIBSS", "Afreximbank"]
    }));
    return;
  }

  // API Route: Products
  if (urlPath === '/api/v1/products') {
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(products));
      return;
    } else if (req.method === 'POST') {
      try {
        const p = await readJsonBody(req);
        p.id = p.id || `prod-${Date.now()}`;
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

  // API Route: Landed Cost Engine
  if (urlPath === '/api/v1/landed-cost' && req.method === 'POST') {
    try {
      const data = await readJsonBody(req);
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

  // API Route: GraphQL
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

  // Normalize URL path for static file serving
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

    // Cache static assets
    let cacheControl = 'public, max-age=3600';
    if (ext === '.jpg' || ext === '.png' || ext === '.svg') {
      cacheControl = 'public, max-age=86400';
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': cacheControl
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`TradeOS Africa platform live on http://localhost:${PORT}`);
});
