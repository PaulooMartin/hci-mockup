# hci-mockup

Desktop-only payroll mockup in plain HTML, CSS and JavaScript. There is no build step and no server: open `index.html` in a browser, or publish the repository with GitHub Pages or Cloudflare Pages.

- `index.html` — cover page with a Start button, so participants don't see the design until they're ready
- `dashboard.html`, `attendance.html`, `payslips.html`, `complaints.html` — dashboard and list pages
- `payslip.html`, `complaint.html` — record detail pages
- `js/data.js` — all mock data (employees, pay periods, attendance, payslips, employee complaints)
- `js/app.js` — shared code; the other files in `js/` each render one page
- `references/` — the mockups the pages are built from

The chosen employee and pay period are carried in the URL (`?emp=10001&period=2026-09-A`). Until both are chosen, the list pages show the selection form. "Change Employee" and "Change Pay Period" clear that one and show the form again with the other still filled in.
