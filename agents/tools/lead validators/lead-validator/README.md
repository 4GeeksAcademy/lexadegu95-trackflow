# Lead Validator

## Purpose
A shared validation and normalization tool for TrackFlow prospect form data. The website currently validates form input in client-side JavaScript; this document describes how to extract those rules into a reusable tool for agents and a future backend.

## Inputs
An object representing a prospect submission:
- `company_name` (required)
- `contact_name` (required)
- `email` (required; corporate email requested by the form)
- `phone` (required)
- `website` (optional)
- `country` (required: `United States`, `Spain`, `Both`, `Other`)
- `product_type` (required: `Fashion`, `Electronics`, `Cosmetics`, `Food`, `Other`)
- `monthly_volume` (required: `0-100`, `101-500`, `501-2000`, `2000+`, `Not sure`)
- `services` (one or more of `warehouse`, `last_mile`, `returns`)
- `current_3pl` (required: `Yes`, `No`, `Evaluating options`)
- `comments` (optional, maximum 500 characters)
- `consent` (must be true/accepted)
- `low_volume_confirmed` (required only when `monthly_volume` is `0-100`)

Field names should be aligned with the actual form's `name` attributes when wiring this tool to the page.

## Outputs
Return a structured result, for example:
```json
{
  "valid": false,
  "errors": [
    {"field": "services", "code": "required", "message": "Select at least one service."}
  ],
  "normalized_lead": null,
  "flags": ["low_monthly_volume"]
}
```
For valid submissions, `normalized_lead` may contain trimmed values, a normalized email, the selected services, and consent status. Do not include unnecessary personal data in error messages or logs.

## Validation rules
1. Required fields must be present and non-empty.
2. Email must have a plausible format. Email format validation does not prove that the mailbox exists.
3. At least one service must be selected.
4. `comments` must be no longer than 500 characters.
5. Consent must be explicitly accepted.
6. If volume is `0-100`, require the user's explicit confirmation after showing the site's low-volume warning.
7. Values for country, product type, monthly volume, services, and `current_3pl` must match the allowed values above.
8. Trim surrounding whitespace from text fields. Do not silently invent missing values.
9. Apply server-side validation even if the browser already validated the form.

## Permissions and security
- No external permissions are required for pure validation.
- Do not send data to third parties.
- Avoid logging names, emails, phone numbers, or free-text comments.
- Treat all input as untrusted and escape output before rendering it in HTML.
- Do not treat the front-end validation as a security boundary.

## Limits and exclusions
- Does not decide whether TrackFlow can operationally serve a specific prospect.
- Does not estimate pricing or delivery times.
- Does not contact the prospect or persist data.
- Does not determine whether an email is genuinely a corporate address beyond configurable syntax/domain checks.

## Usage example
```text
result = lead_validator.validate(submission)
if not result.valid:
    return validation_errors(result.errors)
if "low_monthly_volume" in result.flags and not submission.low_volume_confirmed:
    request_confirmation()
```
This is illustrative pseudocode, not an existing function in the supplied HTML.

## Suggested tests
- Missing required field is rejected.
- No selected service is rejected.
- Unknown service value is rejected.
- Comments of 501 characters are rejected.
- Missing consent is rejected.
- Volume `0-100` without confirmation is rejected or flagged for confirmation.
- Valid submission with multiple services passes.
