# ⚔️ SenopaTEA v2.0

> *The autonomous developer army, forged by zhayyn — Secured & Enhanced Edition*

[![Security](https://img.shields.io/badge/Security-OWASP%20v2.0-green.svg)]()
[![Version](https://img.shields.io/badge/Version-2.0-blue.svg)]()

---

## 🎯 Overview

**SenopaTEA** (*SenoPati TEA - The Evilsign Army*) is an autonomous DevOps framework using multi-agent architecture with 4 persona roles: `@pm`, `@engineer`, `@qa`, and `@devops`.

### What's New in v2.0?

This version includes **comprehensive security enhancements**:

| Feature | Description |
|---------|-------------|
| 🛡️ **Defense in Depth** | 5 layers of security controls |
| ✅ **OWASP Coverage** | Full OWASP Top 10 2021 compliance |
| 🔒 **Secrets Protection** | Mandatory hardcoded secret scanning |
| 🚫 **Command Whitelist** | Only safe commands allowed |
| 🎯 **Approval Gates** | User confirmation at critical phases |
| 📋 **Security Policy** | Complete security documentation |
| 🔍 **Dependency Audit** | npm/pip/composer vulnerability scanning |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        SENOPATEA FRAMEWORK                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐     ┌──────────────┐     ┌──────────────┐       │
│  │    @pm   │────▶│  @engineer   │────▶│     @qa      │       │
│  │  Design  │     │    Build    │     │    Audit     │       │
│  └──────────┘     └──────────────┘     └──────────────┘       │
│       │                                        │                │
│       ▼                                        ▼                │
│  ┌──────────────┐                    ┌──────────────┐          │
│  │ production_  │                    │  app_build/  │          │
│  │  artifacts/ │                    │              │          │
│  └──────────────┘                    └──────────────┘          │
│                                          ▲                      │
│                                          │                      │
│                                     ┌──────────────┐           │
│                                     │   @devops   │           │
│                                     │   Deploy    │           │
│                                     └──────────────┘           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📂 Directory Structure

```
senopatea/
├── .agents/
│   ├── agents.md              # 4 persona definitions + constraints
│   ├── security_policy.md     # Security policies & OWASP coverage
│   ├── skills/
│   │   ├── write_specs.md     # @pm - Technical specification
│   │   ├── generate_code.md   # @engineer - Code generation
│   │   ├── audit_code.md      # @qa - Security audit
│   │   └── deploy_app.md      # @devops - Safe deployment
│   └── workflows/
│       └── startcycle.md      # Main pipeline orchestration
├── app_build/                  # Generated code output
├── production_artifacts/       # Specification documents
└── README.md                   # This file
```

---

## 🎭 The 4 Agents

| Agent | Role | Constraint | Security Posture |
|-------|------|------------|------------------|
| **@pm** | Lead Architect | MUST NOT write code | HIGH trust, LOW risk |
| **@engineer** | Polyglot Builder | Sandboxed to app_build/ | MEDIUM trust, MEDIUM risk |
| **@qa** | Security Auditor | Read-only + limited fixes | MEDIUM trust, LOW risk |
| **@devops** | Deployment Wizard | Approval gate + whitelist | LOW trust, HIGH risk |

---

## 🚀 Usage

### Command: `/startcycle <idea>`

Starts the full pipeline from idea to deployed application.

```bash
/startcycle Build a secure REST API for task management
```

### Pipeline Flow

```
1. Phase 0: Pre-Validation (reject malicious requests)
2. Phase 1: @pm generates specification (waits for YES)
3. Phase 2: @engineer generates code
4. Phase 3: @qa audits and fixes issues
5. Phase 4: @devops deploys (waits for YES)
```

### Options

| Flag | Description |
|------|-------------|
| `--skip-audit` | Skip QA audit phase |
| `--skip-deploy` | Stop after code generation |
| `--dry-run` | Show what would happen without executing |
| `--force` | Bypass safety gates (DANGER) |

### Emergency Commands

| Command | Action |
|---------|--------|
| `STOP` | Halt entire pipeline |
| `ABORT` | Stop and cleanup everything |
| `RESTART` | Start from Phase 1 |
| `SKIP TO DEPLOY` | Jump to Phase 4 |

---

## 🔒 Security Features

### Defense in Depth Layers

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 1: Pre-Validation      → Reject malicious requests  │
├─────────────────────────────────────────────────────────────┤
│  Layer 2: Design Security    → Security by design in specs  │
├─────────────────────────────────────────────────────────────┤
│  Layer 3: Secure Code Gen    → Mandatory security patterns   │
├─────────────────────────────────────────────────────────────┤
│  Layer 4: Audit              → OWASP + Secrets scan          │
├─────────────────────────────────────────────────────────────┤
│  Layer 5: Deployment Gate    → Approval + Whitelist        │
└─────────────────────────────────────────────────────────────┘
```

### OWASP Top 10 Coverage

| # | Category | Coverage |
|---|----------|----------|
| A01 | Broken Access Control | ✅ Auth middleware, RBAC |
| A02 | Cryptographic Failures | ✅ No secrets in code, TLS |
| A03 | Injection | ✅ Parameterized queries, sanitization |
| A04 | Insecure Design | ✅ Rate limiting, error handling |
| A05 | Security Misconfiguration | ✅ Security headers, proper config |
| A06 | Vulnerable Components | ✅ npm audit, dependency scan |
| A07 | Auth Failures | ✅ Password policy, session management |
| A08 | Software Integrity | ✅ Package lock, integrity checks |
| A09 | Security Logging | ✅ Logging middleware, no PII |
| A10 | SSRF | ✅ URL validation, allowlists |

---

## 🛡️ Safety Mechanisms

### Command Whitelist

**ALLOWED:**
- `npm install`, `npm run dev/start/build`
- `pip install -r requirements.txt`, `python app.py`
- `composer install`, `php artisan serve`
- `bun install`, `pnpm install`
- `go mod download`, `go run .`

**BLOCKED:**
- `rm -rf` (any form)
- `sudo` commands
- `curl | bash`
- `wget | bash`
- `git push`
- Docker privileged mode

### Approval Gates

```
Phase 1 (@pm):     MUST wait for YES
Phase 4 (@devops): MUST wait for YES
```

---

## 📋 Generated Code Standards

### Required Patterns

```javascript
// ❌ WRONG - SQL Injection
db.query(`SELECT * FROM users WHERE id = ${userId}`)

// ✅ CORRECT - Parameterized
db.query('SELECT * FROM users WHERE id = $1', [userId])
```

```javascript
// ❌ WRONG - XSS
element.innerHTML = userInput

// ✅ CORRECT - Safe
element.textContent = userInput
```

```javascript
// ❌ WRONG - Hardcoded Secret
const apiKey = 'sk-1234567890'

// ✅ CORRECT - Environment
const apiKey = process.env.API_KEY
```

---

## 📊 Comparison: v1.0 vs v2.0

| Feature | v1.0 | v2.0 |
|---------|------|------|
| OWASP Coverage | ❌ | ✅ Full |
| Secrets Scanning | ❌ | ✅ Mandatory |
| Command Whitelist | ❌ | ✅ Enforced |
| Approval Gates | Partial | ✅ All |
| Security Policy | ❌ | ✅ Full doc |
| Pre-validation | ❌ | ✅ Phase 0 |
| Dependency Audit | ❌ | ✅ Mandatory |
| Emergency Stop | ❌ | ✅ All phases |

---

## 📜 Branches

| Branch | Description |
|--------|-------------|
| `main` | **v2.0** - Secured edition with OWASP coverage |
| `v1-original` | Original version for reference |

---

## 🔗 References

- [OWASP Top 10 2021](https://owasp.org/Top10/)
- [CWE Top 25 2023](https://cwe.mitre.org/top25/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

**Version**: 2.0 - Secured Edition
**Last Updated**: 2026-05-28
**Framework**: Claude Code Compatible

---

*Built with ❤️ for secure autonomous development*