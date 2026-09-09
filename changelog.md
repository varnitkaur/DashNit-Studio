# Changelog
All notable changes to the **DashNit Artisan Studio & Operations** platform are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- PostgreSQL persistence layer integration using Prisma ORM to replace client-side storage bridge.
- Real-time WhatsApp Cloud API webhook receiver for automated two-way client communication.

---

## [1.5.0] - 2026-09-08

### Added
- **Multi-Hub Atelier Network & Hub Switcher:**
  - Implemented multi-atelier routing across `jaipur_02` (Main Candle & Vector Atelier), `jaipur_01` (Heritage Loom & Crochet Studio), and `mumbai_hub` (3PL Metro Distribution & Cold Storage).
  - Added interactive hub switcher dropdown in [`Header.tsx`](file:///c:/Users/ASUS/DashNit-Studio/src/components/Header.tsx) displaying capacity utilization (units/max), operational focus tags, and automated toast feedback.
  - Hub selection is synchronized to `localStorage` (`current_hub`) via [`src/utils/storage.ts`](file:///c:/Users/ASUS/DashNit-Studio/src/utils/storage.ts).
- **Public-Facing Customer Live Tracking Portal (`track.dashnit.com`):**
  - Built [`CustomerTrackingPortalModal.tsx`](file:///c:/Users/ASUS/DashNit-Studio/src/components/CustomerTrackingPortalModal.tsx) simulating DashNit's branded client portal.
  - Live 4-stage visual stepper synchronized with atelier Kanban states (`new_placed` → `in_crafting` → `qc_packaging` → `manifested`).
  - Real-time 48-hour candle curing dial with remaining cure countdown and ambient temperature verification.
  - Artisan spotlight card celebrating crafter heritage, years of experience, and preview of handwritten wax-sealed calligraphy gift notes.
  - Live courier tracking timeline with Delhivery/BlueDart AWB integration.
- **B2B Bulk Corporate Gifting Engine:**
  - Created [`CorporateGiftingModal.tsx`](file:///c:/Users/ASUS/DashNit-Studio/src/components/CorporateGiftingModal.tsx) for enterprise bespoke orders.
  - 3 curated luxury gift suites: *The Royal Jaipur Executive Suite*, *The Organic Artisan Duet*, and *Botanical Wax Discovery Vault*.
  - Tiered dynamic volume discount calculator (Bronze 5% at 25+, Silver 12% at 50+, Gold 20% at 200+ with complimentary custom brass die).
  - Real-time corporate laser engraving simulation with custom logo vectors and brand inscriptions.
  - Simulated multi-city dropship allocation across Bangalore, Mumbai, Delhi-NCR, and Hyderabad.
  - 1-Click batch queuing into the atelier queue (`CORP-XXXA`) with instant toast confirmation.
- **Artisan Piece-Rate Wage & Payroll Ledger:**
  - Implemented [`ArtisanWageLedgerModal.tsx`](file:///c:/Users/ASUS/DashNit-Studio/src/components/ArtisanWageLedgerModal.tsx) featuring transparent piece-rate accounting for 4 workshop artisans (Nita, Dashrath, Kavita, Priya).
  - Itemized compensation breakdown by task (candle pours, crochet row sets, vector engraving, floor coordination).
  - Automated 10% Zero-Defect Quality Bonus calculated from verified Gemini Vision QC pass rates (>98%).
  - One-click instant UPI disbursement simulation (`handleDisburse`) and printable standardized payroll vouchers.
- **Omnichannel Navigation Integration:**
  - Added dedicated navigation triggers in [`Sidebar.tsx`](file:///c:/Users/ASUS/DashNit-Studio/src/components/Sidebar.tsx) and quick launcher action buttons in [`Header.tsx`](file:///c:/Users/ASUS/DashNit-Studio/src/components/Header.tsx).

---

## [1.4.0] - 2026-09-08

### Added
- **Atelier Barcode & QR Scanner Workbench:**
  - Implemented [`ScannerWorkbenchModal.tsx`](file:///c:/Users/ASUS/DashNit-Studio/src/components/ScannerWorkbenchModal.tsx) with hands-free station advancement (`ACTION:STAGE_IN_CRAFTING`, `ACTION:STAGE_QC`, `ACTION:STAGE_MANIFEST`) and staging bin allocation (`BIN-JA-01` through `BIN-JA-08`).
  - Added universal keyboard-wedge laser scanner listener in [`src/utils/scannerListener.ts`](file:///c:/Users/ASUS/DashNit-Studio/src/utils/scannerListener.ts) detecting rapid keystrokes from USB/Bluetooth handheld scanners.
  - Added dedicated **"📷 Scanner"** launcher button in [`Header.tsx`](file:///c:/Users/ASUS/DashNit-Studio/src/components/Header.tsx).
- **IoT Curing Room Environmental Telemetry:**
  - Created [`IoTCuringTelemetry.tsx`](file:///c:/Users/ASUS/DashNit-Studio/src/components/IoTCuringTelemetry.tsx) embedded directly above the Crafting Board columns.
  - Monitors real-time ambient temperature (23.4°C), relative humidity (46% RH), and VOC index (142 ppb).
  - Built interactive simulator controls to test thermal threshold alarms (28.2°C) and automated curing timer preservation locks.
- **Gemini Vision Automated QC Surface Auditor:**
  - Built [`GeminiVisionQCModal.tsx`](file:///c:/Users/ASUS/DashNit-Studio/src/components/GeminiVisionQCModal.tsx) for camera snapshot quality audits of finished candles and crochet commissions.
  - Added 3 workshop station presets with AI bounding boxes and 4-point automated scoring (Pristine 99% vs Cavity Defect 48%).
  - One-click **"Certify & Pass 4-Point QC"** action updating cards with verified quality badges.
- **Direct Thermal Printing & Raw ZPL Generator:**
  - Enhanced [`ShippingLabelModal`](file:///c:/Users/ASUS/DashNit-Studio/src/components/Modals.tsx) with a raw Zebra Programming Language (`^XA ... ^XZ`) viewer and 1-click clipboard exporter for TSC/Zebra 4x6 label printers.

---

## [1.3.0] - 2026-09-08

### Added
- **Gemini AI Artisan Concierge (`@google/genai`):**
  - Implemented server-side microservice in [`server.ts`](file:///c:/Users/ASUS/DashNit-Studio/server.ts) (`POST /api/v1/ai/parse-commission`) consuming Gemini 2.5 Flash to parse natural language WhatsApp messages and voice note transcripts into structured `CraftCard` specifications.
  - Built client-side intelligent fallback engine in [`src/services/geminiService.ts`](file:///c:/Users/ASUS/DashNit-Studio/src/services/geminiService.ts) ensuring 100% offline and zero-downtime execution.
  - Added [`AIConciergeModal.tsx`](file:///c:/Users/ASUS/DashNit-Studio/src/components/AIConciergeModal.tsx) with 3 realistic WhatsApp customer commission presets, dynamic price calculation, confidence scoring, and one-click queue injection to the Jaipur Atelier.
- **Session State Persistence Engine:**
  - Created [`src/utils/storage.ts`](file:///c:/Users/ASUS/DashNit-Studio/src/utils/storage.ts) synchronizing `craftCards`, `catalogProducts`, `rawMaterials`, and `logisticsOrders` with browser `localStorage`. Hard refreshing preserves all newly added orders, stage transitions, and inventory updates.
- **Role-Based Access Control (RBAC):**
  - Defined `UserRole` taxonomy in [`src/types.ts`](file:///c:/Users/ASUS/DashNit-Studio/src/types.ts) covering `atelier_manager` (Director), `artisan_crafter` (Dashrath M.), `qc_packaging` (Kavita S.), and `logistics_dispatcher` (Ramesh Patel).
  - Built interactive Persona Switcher in [`Header.tsx`](file:///c:/Users/ASUS/DashNit-Studio/src/components/Header.tsx) with role badges, color coding, and role profiles.
- **Backend Tooling & Dev Proxy:**
  - Added `"server": "tsx server.ts"` script in `package.json`.
  - Configured `/api` proxy in `vite.config.ts`.

---

## [1.2.0] - 2026-09-08

### Added
- **AI Persistent Context System:** Created dedicated long-term context files:
  - [`decisions.md`](file:///c:/Users/ASUS/DashNit-Studio/decisions.md): Comprehensive Architecture Decision Records (ADRs 001 through 007).
  - [`rules.md`](file:///c:/Users/ASUS/DashNit-Studio/rules.md): Mandatory AI coding guidelines, styling standards, naming conventions, and security rules.
  - [`memory.md`](file:///c:/Users/ASUS/DashNit-Studio/memory.md): Living knowledge base of domain logic, API contracts, PostgreSQL schemas, and roadmaps.
  - [`changelog.md`](file:///c:/Users/ASUS/DashNit-Studio/changelog.md): SemVer release history.
- **Custom Order Studio Enhancements:**
  - Live commission builder in [`CustomOrderStudio.tsx`](file:///c:/Users/ASUS/DashNit-Studio/src/components/CustomOrderStudio.tsx) with real-time price computation.
  - Instant dispatch of newly created bespoke commissions into the live Kanban queue (`handleCommissionCreated` in [`App.tsx`](file:///c:/Users/ASUS/DashNit-Studio/src/App.tsx#L58)).
  - Auto-generation of unique commission IDs (`DN-XXXX`) with craft-specific metadata.
- **System Architecture Visualizer:**
  - Interactive topology viewer in [`ArchitectureView.tsx`](file:///c:/Users/ASUS/DashNit-Studio/src/components/ArchitectureView.tsx) detailing all 5 architectural tiers, subsystem status, latency, and REST endpoints.

### Changed
- Refined navigation tab handling to support instant transitions to newly injected cards on the crafting queue.
- Updated Tailwind CSS v4 styling rules in [`src/index.css`](file:///c:/Users/ASUS/DashNit-Studio/src/index.css) to support specialized print stylesheets for thermal labels.

### Fixed
- Fixed state desynchronization where newly poured batch units were not reflected immediately in catalog inventory counters.
- Corrected responsive layout overflows on the Kanban board on displays narrower than 1200px.

---

## [1.1.0] - 2026-08-20

### Added
- **Orders & Logistics Hub:**
  - Full dispatch management view in [`OrdersLogistics.tsx`](file:///c:/Users/ASUS/DashNit-Studio/src/components/OrdersLogistics.tsx).
  - Integration support for Delhivery Surface/Express and BlueDart Apex Air tracking.
  - Dynamic status filters: `in_crafting`, `ready_for_packing`, `manifested`, `in_transit`, `delivered`.
- **Thermal Shipping Label Modal:**
  - 4x6 inch print-ready shipping label with QR verification code, courier barcode, GST breakdown, and fragile handling tags.
- **Personalized Calligraphy Gift Slip Generator:**
  - Formats custom customer gift notes into printable gift cards for luxury hamper boxes.
- **One-Click WhatsApp Dispatch Notification:**
  - Pre-drafts WhatsApp tracking link messages to send to customer mobile numbers.

### Changed
- Standardized typography for tracking codes and AWBs to use `font-['Space_Mono']`.
- Enhanced search bar in [`Header.tsx`](file:///c:/Users/ASUS/DashNit-Studio/src/components/Header.tsx) to filter across customer names, cities, phone numbers, and product titles.

### Fixed
- Resolved missing PIN code routing tags for Tier-2 Indian delivery destinations.

---

## [1.0.0] - 2026-07-15

### Added
- **Official Production Release for Jaipur Craft House Unit 02.**
- **Artisan Crafting Board:**
  - 4-Stage Kanban workflow (`new_placed` → `in_crafting` → `qc_packaging` → `manifested`).
  - Real-time candle curing clock with countdown, ambient temperature monitor, and chemical lock indicator.
  - Crochet stitch row progress indicator (percentage completion and row tally, e.g. Row 42/65).
  - Fast-track urgency flags for orders with less than 48 hours SLA buffer.
- **Daily Batch Sheet Modal:**
  - Printable run-sheet aggregating all daily active commissions, crafter assignments, and material batches.
- **Offline Job Slips:**
  - Floor printouts for artisans with physical checkboxes for 4-point quality control.
- **Comprehensive Domain Typing:**
  - Established TypeScript contracts in [`src/types.ts`](file:///c:/Users/ASUS/DashNit-Studio/src/types.ts) for `CraftCard`, `CatalogProduct`, `RawMaterial`, and `LogisticsOrder`.

### Changed
- Upgraded project toolchain to React 19 and Vite 6.
- Migrated styling framework to `@tailwindcss/vite` (Tailwind CSS v4).

---

## [0.9.0] - 2026-06-01

### Added
- **Dual-Track Inventory Supervisor:**
  - Finished Goods Catalog tab tracking SKUs, fulfillment modes (`ready_to_ship`, `made_to_order`, `hybrid`), MRP, and GST rates.
  - Raw Materials Ledger tracking soy wax flakes, crackling wood wicks, fragrance oils, and organic cotton yarns.
- **Automated WhatsApp Purchase Orders:**
  - One-click trigger for replenishing low-stock raw materials via preformatted messages to supplier mills.
- **Batch Pour Simulation:**
  - Action button to trigger instant pour of 12 catalog units and clear critical low-stock warnings.

### Changed
- Unified inventory thresholds with color-coded badges (`sufficient`, `normal`, `low`, `critical`).

---

## [0.5.0] - 2026-05-02

### Added
- **Analytics & Revenue Dashboard:**
  - Financial overview tracking gross monthly revenue, average order value (AOV), and profit margins.
  - On-time delivery SLA compliance metrics (96% target).
  - Product category breakdown charts (Candles, Crochet, Hampers, Wax Melts).
  - Atelier capacity gauge (45 units/day limit).

---

## [0.1.0] - 2026-04-10

### Added
- Initial project scaffold with Vite, React, TypeScript, and Tailwind CSS.
- Core brand aesthetic definition with curated artisanal color palette.
- Seed data structures for Jaipur Craft House Unit 02 in `mockData.ts`.
- Basic header and sidebar navigation layout.
