import { EMAIL_TYPES } from "../email.constants.js";
import { verifyEmailTemplate } from "../templates/verifyEmail.template.js";
import { forgotPasswordTemplate } from "../templates/forgotPassword.template.js";
// =========================
// 🔒 HELPERS
// =========================

export const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const normalizeEmail = (email) =>
  String(email).trim().toLowerCase();


export const buildCustomEmail = (data) => {
  if (
    !data ||
    typeof data.subject !== "string" ||
    typeof data.html !== "string"
  ) {
    throw new Error("Custom email requires valid subject and html");
  }

  return {
    subject: escapeHtml(data.subject),
    html: data.html // trusted
  };
};

export const buildTemplateEmail = (type, data) => {
  let rendered;

  try {
    rendered = renderTemplate(type, data);
  } catch (err) {
    throw new Error(`Template render failed: ${err.message}`);
  }

  if (!rendered || !rendered.subject || !rendered.html) {
    throw new Error("Invalid template output");
  }

  return rendered;
};

export const buildEmailContent = (type, data) => {
  if (type === EMAIL_TYPES.CUSTOM) {
    return buildCustomEmail(data);
  }

  return buildTemplateEmail(type, data);
};




export const sendEmailWithTimeout = async (
  provider,
  payload,
  timeoutMs = 10000
) => {
  let timeoutId;
  try {
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error("Email timeout"));
      }, timeoutMs);
    });
    const sendPromise = provider.sendEmail(payload);
    return await Promise.race([sendPromise, timeoutPromise]);
  } finally {
    clearTimeout(timeoutId);
  }
};



// 🔥 Central registry (scalable)
const templateMap = {
  [EMAIL_TYPES.VERIFY_EMAIL]: verifyEmailTemplate,
  [EMAIL_TYPES.FORGOT_PASSWORD]: forgotPasswordTemplate
};

export const renderTemplate = (type, data = {}) => {
  const templateFn = templateMap[type];

  if (!templateFn) {
    throw new Error(`Unknown email template type: ${type}`);
  }

  const result = templateFn(data);

  // ✅ strict validation
  if (
    !result ||
    typeof result.subject !== "string" ||
    typeof result.html !== "string"
  ) {
    throw new Error(`Invalid template output for type: ${type}`);
  }

  return result;
};