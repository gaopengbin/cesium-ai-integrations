# 🏔️ Cesium Terrain MCP Server

MCP server for managing terrain providers on CesiumJS 3D globe applications.

## ✨ Features

- **Multiple Source Types**: Support for Cesium Ion terrain assets, direct terrain server URLs, and flat WGS84 ellipsoid
- **Terrain Configuration**: Control vertex normals, water masks, and metadata requests
- **Get/Set/Remove**: Query current terrain, switch providers, or reset to flat ellipsoid
- **Default Terrain**: Easily load Cesium World Terrain with Ion asset ID 1

## 📦 Installation

```bash
pnpm install
pnpm run build
```

## 🚀 Running the Server

```bash
pnpm run dev    # Development mode with auto-reload
pnpm start      # Production mode
```

The server will start on port 3007 with WebSocket transport.

## 🛠️ Tools

### 1. `terrain_set`

**Set the terrain provider for the globe**

Supports Cesium Ion terrain assets, direct terrain server URLs, and WGS84 ellipsoid for a flat globe.

**Supported Source Types:**

- `ion` — Cesium Ion terrain assets (e.g., Cesium World Terrain with asset ID 1)
- `url` — Direct terrain server URLs (quantized-mesh endpoints)
- `ellipsoid` — Flat WGS84 ellipsoid with no terrain elevation

**Input:**

| Parameter              | Type    | Required | Description                                                     |
| ---------------------- | ------- | -------- | --------------------------------------------------------------- |
| `type`                 | string  | Yes      | Source type: `ion`, `url`, or `ellipsoid`                       |
| `assetId`              | number  | ion only | Cesium Ion asset ID                                             |
| `url`                  | string  | url only | URL to a terrain server                                         |
| `name`                 | string  | No       | Display name for the terrain provider                           |
| `requestVertexNormals` | boolean | No       | Request vertex normals for lighting (default: true for ion/url) |
| `requestWaterMask`     | boolean | No       | Request water mask data for water effects (default: false)      |
| `requestMetadata`      | boolean | No       | Request terrain metadata (default: true)                        |

**Output:**

- Source type, name, and response time

**Examples:**

```json
// Load Cesium World Terrain
{ "type": "ion", "assetId": 1 }

// Load terrain from URL
{ "type": "url", "url": "https://example.com/terrain" }

// Reset to flat globe
{ "type": "ellipsoid" }
```

---

### 2. `terrain_get`

**Get information about the current terrain provider**

Returns the current terrain provider's source type, name, configuration, and capabilities.

**Input:** None required

**Output:**

| Field                      | Type    | Description                          |
| -------------------------- | ------- | ------------------------------------ |
| `terrain.sourceType`       | string  | Current terrain source type          |
| `terrain.name`             | string  | Display name                         |
| `terrain.assetId`          | number  | Ion asset ID (if applicable)         |
| `terrain.url`              | string  | Terrain server URL (if applicable)   |
| `terrain.hasVertexNormals` | boolean | Whether vertex normals are available |
| `terrain.hasWaterMask`     | boolean | Whether water mask data is available |
| `terrain.hasMetadata`      | boolean | Whether metadata is available        |

---

### 3. `terrain_remove`

**Remove the current terrain provider and reset to flat ellipsoid**

Resets the terrain to the default WGS84 ellipsoid (flat globe with no terrain elevation data).

**Input:** None required

**Output:**

- Previous source type and name of the removed terrain provider

---

## ⚙️ Configuration

Copy `.env.example` to `.env` and configure:

```env
TERRAIN_SERVER_PORT=3007        # WebSocket server port
MAX_RETRIES=10                  # Max connection retry attempts
COMMUNICATION_PROTOCOL=websocket # websocket or sse
STRICT_PORT=false               # Whether to fail if port is taken
MCP_TRANSPORT=stdio             # stdio or streamable-http
```

## 🧪 Testing

```bash
pnpm test              # Run all tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # Coverage report
```

## 📁 Project Structure

```
terrain-server/
├── src/
│   ├── index.ts                    # Server entry point
│   ├── schemas/
│   │   ├── core-schemas.ts         # Core terrain data types
│   │   ├── tool-schemas.ts         # Tool input schemas
│   │   ├── response-schemas.ts     # Response schemas
│   │   └── index.ts                # Schema exports
│   ├── tools/
│   │   ├── terrain-set.ts          # Set terrain provider
│   │   ├── terrain-get.ts          # Get terrain info
│   │   ├── terrain-remove.ts       # Remove terrain
│   │   └── index.ts                # Tool registration
│   └── utils/
│       ├── helpers.ts              # Validation & error formatting
│       ├── types.ts                # Result type definitions
│       └── index.ts                # Utility exports
├── test/
│   ├── schemas/
│   │   └── schemas.test.ts         # Schema validation tests
│   └── tools/
│       ├── terrain-set.test.ts     # Set tool tests
│       ├── terrain-get.test.ts     # Get tool tests
│       └── terrain-remove.test.ts  # Remove tool tests
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── .env.example
```

## 🔗 Related

- [CesiumJS Terrain Documentation](https://cesium.com/learn/cesiumjs/ref-doc/CesiumTerrainProvider.html)
- [Cesium World Terrain](https://cesium.com/platform/cesium-ion/content/cesium-world-terrain/)
