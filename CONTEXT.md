CONTEXT.md

Trackflow Application Webpage

1. Project Overview

Project name: Trackflow Logistics Application

Primary file: application.html

Purpose: Build a responsive, accessible business application form that allows e-commerce companies to request customized logistics proposals from Trackflow.

Trackflow provides logistics services such as:

Warehouse management

Last-mile delivery

Returns management

Customized logistics solutions

The application webpage must collect relevant business and contact information, validate user input, and prepare the application for secure submission to a backend API.

2. Technology Requirements

Use semantic HTML5.

Use Tailwind CSS for styling if consistent with the existing website.

Use JavaScript for client-side form validation and submission behavior.

Maintain compatibility with modern browsers.

Follow the existing Trackflow website's branding, typography, spacing, and color scheme.

Keep code readable, maintainable, and organized.

3. HTML Structure

The webpage must contain:

A document declaration and HTML language attribute.

A <head> section containing character encoding, viewport settings, page title, and metadata.

A semantic <header> containing the Trackflow logo and navigation.

A <main> element containing the page introduction and application form.

A semantic <footer> containing copyright information and relevant navigation links.

A <form> element with a unique ID and an appropriate submission configuration.

Use semantic elements such as <section>, <fieldset>, <legend>, <label>, and <button> where appropriate.

Do not use generic <div> elements when a meaningful semantic element is more suitable.

4. Form Field Requirements

Section A: Contact Information

Include the following fields:

Field

Input type

Required

First name

text

Yes

Last name

text

Yes

Business email

email

Yes

Phone number

tel

No

Use appropriate autocomplete attributes:

First name: given-name

Last name: family-name

Business email: email

Phone number: tel

Section B: Business Information

Field

Input type

Required

Company name

text

Yes

Company website

url

No

Operating country

select

Yes

Industry

select

Yes

Country options should include the United States, Spain, and Other.

Industry options should include Fashion and Apparel, Electronics, Beauty and Personal Care, Home and Lifestyle, Food and Beverage, and Other.

Section C: Logistics Requirements

Field

Input type

Required

Warehouse management

checkbox

No

Last-mile delivery

checkbox

No

Returns management

checkbox

No

Custom logistics

checkbox

No

Estimated monthly orders

select

Yes

Required service start date

date

No

Estimated monthly order count, if collected separately

number

No

Additional requirements

textarea

Yes

The service start date and separate numeric order count are optional extensions. Do not add duplicate fields if an equivalent field already exists or if the business requirements do not need them.

Use appropriate constraints for numeric inputs, including min, max, and step where relevant. Do not use type="number" for telephone numbers, postal codes, or other identifiers that are not quantities.

The additional requirements field should have a sensible maximum length and a minimum length that matches the actual business need.

At least one logistics service must be selected before the form can be submitted.

Section D: Privacy Consent

Include a required checkbox acknowledging the applicable privacy policy.

The privacy policy link must point to a real page. Do not create a misleading link or claim that a policy exists if it has not been implemented.

5. Appropriate Input Types

Use HTML input types according to the kind of information collected.

text: Names and company names.

email: Email addresses.

tel: Telephone numbers.

url: Company website addresses.

date: Optional requested service start date.

number: Optional numeric quantities, such as monthly order counts.

checkbox: Service selections and required privacy acknowledgment.

select: Country, industry, and order-volume categories.

textarea: Longer business requirements.

Use <select> for predefined categories rather than asking users to type values that should come from a controlled list.

Use required on mandatory fields. Remember that required on a checkbox group does not automatically enforce that at least one checkbox in the group is selected. Implement explicit group validation in JavaScript or use an equivalent accessible validation method.

6. Group Related Fields

Use <fieldset> and <legend> to group related controls.

Recommended field groups:

Contact Information

Business Information

Logistics Requirements

Privacy Consent

Each group must have a clear heading or legend.

Every input must have a visible, programmatically associated <label>. Do not rely on placeholder text as the only field label.

Use unique IDs and ensure each label's for attribute matches the correct input ID.

7. Required Field Validation

Mandatory fields must include the HTML required attribute.

Use appropriate native validation:

Email addresses must use type="email".

URLs must use type="url" when provided.

Dates must use type="date" when collected.

Numeric quantities must use type="number" with suitable bounds.

Required dropdowns must include an empty default option.

Text fields must enforce appropriate length constraints.

JavaScript must:

Validate that at least one logistics service is selected.

Provide clear and understandable validation feedback.

Prevent submission when required information is invalid.

Preserve entered values when a submission fails.

Prevent repeated submissions while a request is processing.

Display success only after the backend confirms successful processing.

Display an accessible error message if the request fails.

Client-side validation is for usability, not security. The backend must validate all submitted data independently.

8. Responsive Form Design

The form must work on mobile phones, tablets, laptops, and desktop screens.

Use a mobile-first layout.

Mobile requirements

Use a single-column layout for form fields.

Make inputs and buttons fit within the viewport.

Use readable font sizes and adequate spacing.

Prevent horizontal page overflow.

Ensure controls are comfortable to operate with touch.

Keep labels visible above their respective inputs.

Tablet and desktop requirements

Use two-column grids for related short fields when sufficient space is available.

Keep long textareas and section headings full width.

Use a centered container with a sensible maximum width.

Maintain consistent spacing, alignment, and typography.

Avoid excessively wide text fields and long lines of text.

Example Tailwind layout:

<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
    <div>
        <label for="firstName">First name *</label>
        <input
            id="firstName"
            name="firstName"
            type="text"
            autocomplete="given-name"
            required
            class="w-full rounded-lg border px-4 py-3"
        >
    </div>

    <div>
        <label for="lastName">Last name *</label>
        <input
            id="lastName"
            name="lastName"
            type="text"
            autocomplete="family-name"
            required
            class="w-full rounded-lg border px-4 py-3"
        >
    </div>
</div>

The grid-cols-1 class creates one column by default, while sm:grid-cols-2 enables two columns at the small breakpoint and above.

Test layouts at viewport widths of approximately 320px, 375px, 768px, 1024px, and 1440px.

9. Accessibility Requirements

Include lang="en" on the HTML element.

Include a descriptive page title.

Use semantic landmarks.

Maintain a logical heading hierarchy.

Associate every form field with a visible label.

Make all controls keyboard accessible.

Provide visible focus indicators.

Ensure text and controls have sufficient contrast.

Communicate errors using text, not color alone.

Associate field-specific error messages with their controls.

Use an accessible live region for submission status messages.

Give links meaningful text.

Use meaningful alternative text for informative images.

Target WCAG 2.2 Level AA where applicable.

10. Submission and Backend Integration

The form must submit to a configured backend endpoint or approved form service.

The expected API route is:

POST /api/applications

The backend must be implemented before the form can be considered production-ready.

The frontend should:

Send the submitted data in the format expected by the API.

Include all selected logistics services.

Handle successful responses and HTTP errors.

Handle network failures.

Avoid displaying success before confirmation.

Avoid logging personal application data unnecessarily.

The backend should:

Validate all fields and allowed values.

Enforce appropriate length and quantity limits.

Handle privacy-sensitive information securely.

Prevent abuse and duplicate processing where necessary.

Store or route applications to the authorized business destination.

Return appropriate HTTP status codes.

Never place private credentials, API secrets, or database passwords in frontend HTML or JavaScript.

11. Code Quality Requirements

Use consistent indentation and descriptive names.

Avoid duplicate IDs.

Avoid invalid HTML nesting.

Keep JavaScript logic understandable.

Avoid unsafe insertion of user input into HTML.

Remove unused code and unnecessary dependencies.

Handle errors explicitly.

Keep labels, field names, and backend payload properties consistent.

Do not claim backend functionality exists unless it has been implemented and verified.

12. Evaluation Requirements

Use the evaluation documents in the evaluations/ directory.

Before considering the webpage complete, evaluate:

Accessibility and keyboard navigation.

Responsive behavior at mobile, tablet, and desktop widths.

Required fields and invalid input handling.

At least one selected logistics service.

Valid and invalid submission scenarios.

Backend response and network failure handling.

HTML validity and JavaScript console errors.

Security and correct handling of submitted data.

Record test outcomes honestly as PASS, FAIL, BLOCKED, or NOT APPLICABLE.

13. Definition of Done

The webpage is ready for review when:

The form contains the approved fields.

Appropriate HTML input types are used.

Required fields have the required attribute.

Related fields are grouped with <fieldset> and <legend>.

The layout responds correctly to different viewport sizes.

Accessibility requirements have been reviewed.

Validation errors are clear and accessible.

All selected services are included in the submission payload.

The backend submission flow has been tested, or its absence is explicitly documented.

Applicable evaluation tests have been completed.

No unresolved critical security or accessibility defects remain.