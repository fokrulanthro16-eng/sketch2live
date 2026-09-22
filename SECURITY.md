# Security Policy

## Enterprise Security Architecture & Assurance

At **Sketch2Live**, enterprise-grade security and developer privacy are foundational. This application is architected from the ground up to prevent credential leakage, isolate untrusted user inputs, and ensure complete transparency in AI data flows.

---

## 🔒 Zero-Leakage Credential Protection

1. **Client-Side Key Isolation**:
   - If an API key is configured in the web interface, it is stored strictly within the user's browser `localStorage` under domain-isolated origin keys.
   - Keys are never persisted to a backend database, telemetry service, or analytics pipeline.

2. **Environment Variable Fallback**:
   - When deploying to production environments (Vercel, AWS ECS, Docker, or Kubernetes), configure `GEMINI_API_KEY` securely via environment variables or secret managers (e.g., AWS Secrets Manager, HashiCorp Vault).
   - `.env` and `.env.local` files are strictly excluded from version control via `.gitignore` and `.dockerignore`.

3. **Isolated Direct Ingestion**:
   - API keys are passed only in encrypted HTTPS payloads directly to Google Generative AI endpoints (`generativelanguage.googleapis.com`) using official Google SDKs.

---

## 🛡️ Sandbox & Output Isolation

- **IFrame Sandboxing**:
  - All synthesized HTML and Tailwind CSS previews execute inside a sandboxed `<iframe>` with explicit restrictions:
    ```html
    sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
    ```
  - This prevents untrusted user-injected code from accessing the parent Next.js application DOM, session storage, or cookie jars.

- **Offline-Only Field Data**:
  - The Emergency & Field Relief module operates with **100% local client-side memory buffers**. Patient records and triage logs never leave the device unless explicitly exported via client-side CSV generation.

---

## 🚨 Reporting a Vulnerability

We take all security vulnerability disclosures seriously. If you discover a security vulnerability within **Sketch2Live**, please report it responsibly:

1. **Do NOT report security vulnerabilities via public GitHub issues.**
2. Send an email to: **security@sketch2live.dev** (or contact the maintainer via GitHub Security Advisories).
3. Include the following details in your report:
   - Description of the vulnerability and attack vector.
   - Minimal reproducible proof of concept (PoC) or step-by-step instructions.
   - Impact assessment on credentials, runtime execution, or data integrity.

### Disclosure Timeline
- **Initial Response**: Within 24 hours.
- **Triage & Reproduction**: Within 48 hours.
- **Patch Deployment**: As expeditiously as possible based on severity level.
- **Public Advisory**: Published once a fix is verified and deployed.

---

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |
