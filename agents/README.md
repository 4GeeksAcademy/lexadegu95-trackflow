###TrackFlow Reusable Tools

#Purpose

This folder documents reusable tools that TrackFlow agents can share. The current TrackFlow website is a front-end HTML/CSS/JavaScript prototype. These documents are specifications derived from the website, not implemented backend services.

#Tools





lead-validator/README.md: validates and normalizes information entered into the prospect/contact form.



coverage-lookup/README.md: provides approved, static facts about TrackFlow's stated services and coverage.



sales-delivery/README.md: specification for securely forwarding qualified leads to a sales workflow. The current website does not send submissions to a server, CRM, or email inbox.



#Source-derived form fields

The contact form collects:





Company name and contact name



Corporate email and phone



Optional website



Main operating country: United States, Spain, Both, Other



Product type: Fashion, Electronics, Cosmetics, Food, Other



Estimated monthly shipping volume: 0-100, 101-500, 501-2000, 2000+, Not sure



Services: warehouse, last_mile, returns



Current third-party logistics provider status: Yes, No, Evaluating options



Optional comments, maximum 500 characters



Privacy-policy consent



Low-volume confirmation when the selected volume is 0-100



#Shared rules





Treat browser-side validation as convenience only. Revalidate all fields on the server before acting on submitted data.



Collect business contact details only. Do not request customer records, payment data, credentials, or sensitive product information.



Do not invent delivery times, prices, capacity, service guarantees, or address-level availability.



Treat website statements as marketing claims, not verified operational data.



Never log full lead payloads or expose personal contact details in agent responses.



Keep API keys and CRM credentials in server-side environment secrets. Never place secrets in browser JavaScript or commit them to Git.



Obtain and verify privacy consent before forwarding a lead. Define retention and deletion rules before production use.



#Suggested layout

agents/
  tools/
    README.md
    lead-validator/
      README.md
    coverage-lookup/
      README.md
    sales-delivery/
      README.md



<<<<<<< HEAD
Implementation status
=======
#Implementation status
>>>>>>> a80a08f (created readme for agent tools)







Tool



Status





Lead validation



Rules documented from the existing front-end; reusable server-side function not yet implemented





Coverage lookup



Approved facts summarized from page content; API/data source not implemented





Sales delivery



Planned integration only; no real submission endpoint or CRM connection in the source



<<<<<<< HEAD
Example agent references
=======
#Example agent references
>>>>>>> a80a08f (created readme for agent tools)





Lead Qualification Agent uses lead-validator.



Coverage Information Agent uses coverage-lookup.



<<<<<<< HEAD
Sales Routing Agent uses lead-validator and, once implemented, sales-delivery.
=======
Sales Routing Agent uses lead-validator and, once implemented, sales-delivery.
>>>>>>> a80a08f (created readme for agent tools)
