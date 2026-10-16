# Sales Delivery

## Purpose
A planned shared integration for sending a validated TrackFlow prospect to an approved sales destination, such as a CRM or a protected backend endpoint.

## Current status
**Not implemented in the supplied website.** The HTML JavaScript validates the form and displays a simulated success message, but it does not submit the lead to a server, CRM, or email service. Do not tell a prospect their request was actually received until a real integration confirms success.

## Inputs
Accept only a validated lead object from `lead-validator`, including:
- Company and contact details
- Country and product type
- Monthly volume
- Requested services
- Current 3PL status
- Optional comments
- Consent status and timestamp (recommended for a real implementation)

Do not accept arbitrary agent-generated data without validation.

## Outputs
Return a minimal delivery result, for example:
```json
{
  "status": "accepted",
  "request_id": "server-generated-id",
  "destination": "approved-crm"
}
```
Possible statuses: `accepted`, `rejected`, `retryable_error`, `permanent_error`. Use a server-generated request ID; do not expose internal stack traces or credentials.

## Future workflow
1. Validate the payload on the server using `lead-validator`.
2. Verify privacy consent and the permitted purpose of processing.
3. Send the minimum required fields to the approved CRM or sales API over HTTPS.
4. Use authentication, timeouts, bounded retries, and idempotency to avoid duplicate leads.
5. Record delivery status without logging the full personal-data payload.
6. Show a success confirmation only after the backend confirms acceptance. If delivery fails, show a truthful error and provide the published sales contact as a fallback.

## Permissions and security
- Requires explicit approval for the destination system and its data-processing rules.
- Store credentials in server-side environment secrets or a secret manager.
- Never embed API keys in HTML/JavaScript or commit them to the repository.
- Use HTTPS, least-privilege credentials, input validation, rate limiting, and abuse protection.
- Define retention, deletion, access controls, and consent handling before production.
- Do not email or forward data to an unapproved recipient.

## Limits
- No destination endpoint, CRM credentials, or email provider are present in the supplied source.
- No actual lead persistence or delivery is currently available.
- Delivery acceptance by a CRM does not mean a sales representative has reviewed or contacted the prospect.

## Usage example
```text
validation = lead_validator.validate(submission)
if validation.valid:
    result = sales_delivery.send(validation.normalized_lead)
    show_success_only_if(result.status == "accepted")
```
Illustrative pseudocode only, not working code from the HTML.

## Suggested tests
- Invalid lead is never sent.
- Missing consent blocks delivery.
- CRM timeout returns a retryable error.
- Retry with the same idempotency key does not create a duplicate.
- Credentials never appear in browser assets, logs, or error messages.
- UI shows success only after confirmed backend acceptance.
