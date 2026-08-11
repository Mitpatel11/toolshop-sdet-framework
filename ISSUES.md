# Issue / Defect Log

Two kinds of entries live here, tagged separately:
- **[APP]** — a real bug found in Toolshop (functional or with-bugs variant) via the test suite
- **[FW]** — a bug/limitation in our own framework (flaky test, wrong assertion, broken fixture)

This is the STLC defect-tracking artifact — treat it like a lightweight Jira.
Every entry should be traceable to the day/commit that found it and, later,
the day/commit that fixed or worked around it.

Status: `[ ]` Open · `[~]` Investigating · `[x]` Resolved · `[-]` Won't fix (with reason)

## Format
```
### [APP|FW]-<id> <title>
- Found: Day <N> (<date>), commit <hash>
- Severity: Critical / High / Medium / Low
- Steps to reproduce:
- Expected:
- Actual:
- Resolution / commit:
```

## Log

<!-- example, delete once real items exist
### APP-001 Cart quantity allows negative value via API PATCH
- Found: Day 26 (2026-09-05), commit a1b2c3d
- Severity: High
- Steps to reproduce: PATCH /cart/items/{id} with quantity: -1 as authenticated customer
- Expected: 400 Bad Request
- Actual: 200 OK, cart line item quantity set to -1
- Resolution / commit: reported only (external app, no fix in our control) — see Day 51 bug report writeup
-->
