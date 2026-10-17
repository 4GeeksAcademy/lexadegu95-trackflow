"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("applicationForm");

  if (!form) {
    console.error("Application form not found.");
    return;
  }

  const submitButton = form.querySelector('[type="submit"]');
  const statusMessage = document.getElementById("form-status");
  form.noValidate = true;

  const fields = {
    firstName: {
      label: "First name",
      validate: (value) =>
        value.trim() ? "" : "Please enter your first name."
    },

    lastName: {
      label: "Last name",
      validate: (value) =>
        value.trim() ? "" : "Please enter your last name."
    },

    email: {
      label: "Email address",
      validate: (value) => {
        if (!value.trim()) {
          return "Please enter your email address.";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Enter a valid email, such as name@example.com.";
        }

        return "";
      }
    },

    phone: {
      label: "Phone number",
      validate: (value, input) => {
        if (!value.trim()) {
          return input.required
            ? "Please enter your phone number."
            : "";
        }

        const digits = value.replace(/\D/g, "");

        if (digits.length < 10 || digits.length > 15) {
          return "Enter a phone number containing 10–15 digits.";
        }

        return "";
      }
    },

    company: {
      label: "Company name",
      validate: (value) =>
        value.trim() ? "" : "Please enter your company name."
    },

    website: {
      label: "Company website",
      validate: (value) => {
        if (!value.trim()) return "";

        try {
          const url = new URL(value.trim());

          if (!["http:", "https:"].includes(url.protocol)) {
            return "Website must begin with http:// or https://.";
          }

          if (!url.hostname.includes(".")) {
            return "Enter a complete website address, such as https://example.com.";
          }

          return "";
        } catch {
          return "Enter a valid website address, such as https://example.com.";
        }
      }
    },

    country: {
      label: "Country",
      validate: (value) =>
        ["United States", "Spain", "Other"].includes(value)
          ? ""
          : "Please select your country."
    },

    industry: {
      label: "Industry",
      validate: (value) =>
        [
          "Fashion and Apparel",
          "Electronics",
          "Beauty and Personal Care",
          "Home and Lifestyle",
          "Food and Beverage",
          "Other"
        ].includes(value)
          ? ""
          : "Please select your industry."
    },

    monthlyOrders: {
      label: "Monthly orders",
      validate: (value) =>
        value ? "" : "Please select your estimated monthly orders."
    },

    serviceStartDate: {
      label: "Requested service start date",
      validate: (value, input) =>
        input.validity.valid ? "" : "Enter a valid requested service start date."
    },

    requirements: {
      label: "Logistics requirements",
      validate: (value, input) => {
        const trimmedValue = value.trim();

        if (input.required && !trimmedValue) {
          return "Please describe your logistics requirements.";
        }

        if (trimmedValue.length < input.minLength) {
          return `Please provide at least ${input.minLength} non-space characters describing your logistics requirements.`;
        }

        return "";
      }
    }
  };

  // Create an error message element for each field.
  Object.keys(fields).forEach((name) => {
    const input = form.elements.namedItem(name);

    if (!input || input instanceof RadioNodeList) return;

    let error = document.getElementById(`${name}-error`);

    if (!error) {
      error = document.createElement("p");
      error.id = `${name}-error`;
      error.className =
        "mt-2 rounded border-l-4 border-red-700 bg-red-50 px-3 py-2 text-sm leading-6 text-red-800";
      error.setAttribute("aria-live", "polite");
      error.setAttribute("aria-atomic", "true");
      error.hidden = true;
      input.insertAdjacentElement("afterend", error);
    }

    input.setAttribute("aria-describedby", error.id);
  });

  // Show a field-specific error or clear it.
  function validateField(name) {
    const rule = fields[name];
    const input = form.elements.namedItem(name);

    if (!rule || !input || input instanceof RadioNodeList) {
      return true;
    }

    const error = document.getElementById(`${name}-error`);
    const message = rule.validate(input.value, input);

    // Use browser validation for constraints such as type=email and min/max.
    const nativeMessage = input.validity.valid
      ? ""
      : input.validity.valueMissing
        ? `Please enter ${rule.label.toLowerCase()}.`
        : input.validity.typeMismatch
          ? `Please enter a valid ${rule.label.toLowerCase()}.`
          : input.validity.tooShort
            ? `${rule.label} must contain at least ${input.minLength} characters.`
            : input.validity.tooLong
              ? `${rule.label} must contain no more than ${input.maxLength} characters.`
              : input.validity.patternMismatch
                ? input.title || `Enter a valid ${rule.label.toLowerCase()}.`
                : input.validity.badInput
                  ? `Enter a valid ${rule.label.toLowerCase()}.`
                  : input.validity.rangeUnderflow
                    ? `${rule.label} must be on or after ${input.min}.`
                    : input.validity.rangeOverflow
                      ? `${rule.label} must be on or before ${input.max}.`
                      : input.validity.stepMismatch
                        ? `Enter a valid ${rule.label.toLowerCase()}.`
                        : input.validity.customError && input.validationMessage
                          ? input.validationMessage
                          : `Enter a valid ${rule.label.toLowerCase()} value.`;

    const finalMessage = message || nativeMessage;

    input.setAttribute("aria-invalid", String(Boolean(finalMessage)));

    if (error) {
      if (finalMessage) {
        error.hidden = false;
        if (error.textContent !== finalMessage) error.textContent = finalMessage;
      } else {
        error.hidden = true;
        if (error.textContent) error.textContent = "";
      }
    }

    return !finalMessage;
  }

  // Validate while typing, and when a field loses focus or changes.
  Object.keys(fields).forEach((name) => {
    const input = form.elements.namedItem(name);

    if (!input || input instanceof RadioNodeList) return;

    input.addEventListener("input", () => validateField(name));
    input.addEventListener("blur", () => validateField(name));
    input.addEventListener("change", () => validateField(name));
  });

  // Validate the service checkbox group.
  const services = form.querySelectorAll('input[name="services[]"]');
  const serviceError = document.getElementById("services-error");
  const allowedServices = new Set([
    "Warehouse management",
    "Last-mile delivery",
    "Returns management",
    "Custom logistics"
  ]);

  function validateServices() {
    const valid = Array.from(services).some(
      (service) => service.checked && allowedServices.has(service.value)
    );

    if (serviceError) {
      const message = valid
        ? ""
        : "Please select at least one logistics service.";
      if (message) {
        serviceError.hidden = false;
        if (serviceError.textContent !== message) serviceError.textContent = message;
      } else {
        serviceError.hidden = true;
        if (serviceError.textContent) serviceError.textContent = "";
      }
    }

    services.forEach((service) => {
      service.setAttribute("aria-invalid", String(!valid));
    });

    return valid;
  }

  services.forEach((service) => {
    service.addEventListener("change", validateServices);
  });

  // Validate required privacy consent.
  const consent = form.querySelector('[name="privacyConsent"]');
  const consentError = document.getElementById("privacyConsent-error");

  function validateConsent() {
    if (!consent) return true;

    const valid = !consent.required || consent.checked;

    consent.setAttribute("aria-invalid", String(!valid));

    if (consentError) {
      const message = valid
        ? ""
        : "You must agree to the privacy policy before submitting.";
      if (message) {
        consentError.hidden = false;
        if (consentError.textContent !== message) consentError.textContent = message;
      } else {
        consentError.hidden = true;
        if (consentError.textContent) consentError.textContent = "";
      }
    }

    return valid;
  }

  if (consent) {
    consent.addEventListener("change", validateConsent);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submitButton?.disabled) return;

    const fieldResults = Object.keys(fields).map(validateField);
    const servicesValid = validateServices();
    const consentValid = validateConsent();

    const allValid =
      fieldResults.every(Boolean) &&
      servicesValid &&
      consentValid &&
      form.checkValidity();

    if (!allValid) {
      if (statusMessage) {
        statusMessage.textContent =
          "Please fix the highlighted errors before submitting.";
        statusMessage.className =
          "rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 empty:hidden";
      }

      const firstInvalid = form.querySelector(
        '[aria-invalid="true"]'
      );

      firstInvalid?.focus();
      return;
    }

    const originalButtonText = submitButton?.textContent;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
    }

    if (statusMessage) {
      statusMessage.textContent = "Submitting your application...";
      statusMessage.className =
        "rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800 empty:hidden";
    }

    try {
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      payload["services[]"] = formData.getAll("services[]");
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Application submission failed.");
      }

      if (statusMessage) {
        statusMessage.textContent =
          "Your application was submitted successfully. Thank you for contacting Trackflow.";
        statusMessage.className =
          "rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800 empty:hidden";
      }

      form.reset();
    } catch (error) {
      if (statusMessage) {
        statusMessage.textContent =
          "We could not submit your application. Please try again later or contact our team.";
        statusMessage.className =
          "rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 empty:hidden";
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
});