# Coverage Lookup

## Purpose
A shared source of approved TrackFlow website facts so agents can answer basic questions consistently. In the current project, these facts are written into the HTML page; there is no live coverage API or database.

## Inputs
A query object such as:
```json
{
  "country": "Spain",
  "service": "warehouse"
}
```
Suggested accepted countries: `United States`, `Spain`, `Both`, `Other`.
Suggested services: `warehouse`, `last_mile`, `returns`.

## Outputs
Return only matching, approved facts and include a `source` such as `TrackFlow website copy`. If no supported fact matches, return `unknown` or refer the question to the sales team rather than guessing.

Example:
```json
{
  "status": "known",
  "country": "Spain",
  "service": "warehouse",
  "facts": [
    "The website states that TrackFlow has a warehouse in Zaragoza."
  ],
  "source": "TrackFlow website copy"
}
```

## Facts stated in the supplied code
- TrackFlow presents itself as serving e-commerce businesses in the United States and Spain.
- United States: the page states that its warehouse is in Los Angeles and describes national coverage.
- Spain: the page states that its warehouse is in Zaragoza and describes coverage across mainland Spain and the islands.
- Last-mile delivery: the page describes a carrier network, unified shipment tracking, incident handling, and returns management.
- Reverse logistics: the page describes returns management, inspection/reconditioning, and integration with sales platforms.
- Warehousing: the page describes storage, picking, packing, and real-time inventory.
- The page names UPS, FedEx, and DHL in its United States coverage copy, and MRW, SEUR, and DHL in its Spain coverage copy.

These are statements made by the website, not independently verified facts or a guarantee that a particular shipment can be served.

## Permissions and security
- Read-only tool; no customer data is needed.
- No external API credentials should be required for the initial static version.
- If connected to a future internal source, use read-only credentials where possible and document the source of truth.

## Limits
Do not claim:
- A specific address is serviceable without an approved lookup.
- A guaranteed delivery date or transit time.
- A rate, capacity, service-level agreement, or carrier availability not explicitly returned by a trusted live source.
- That named carriers are available for every route or shipment type.

## Usage example
```text
answer = coverage_lookup.find(country="Spain", service="warehouse")
if answer.status == "unknown":
    route_to_sales()
```
Illustrative pseudocode only. No such function is implemented in the supplied HTML.

## Suggested tests
- Spain + warehouse returns the Zaragoza website claim.
- United States + warehouse returns the Los Angeles website claim.
- Unknown country/service does not produce invented facts.
- Queries about pricing or guaranteed transit time return unsupported/escalation.
