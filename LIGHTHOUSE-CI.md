# Lighthouse CI Workflow

## Running the audit locally
1. Build the site: `npm run build` (already required by LHCI).
2. Run the automated LHCI flow: `npm run lhci`. That command runs `lhci autorun`, which builds, starts `npm run preview` on port `4173`, and generates Lighthouse reports for Performance, Accessibility, Best Practices, and SEO.
3. After the run finishes, LHCI uploads the report to a temporary public storage URL (printed in the terminal) so you can review the full report if needed.

## Adjusting thresholds
- Thresholds live in `.lighthouserc.json` under the `assertions` section. Update values if you want stricter or laxer gates.

## CI integration ideas
- Add `npm run lhci` to your CI workflow after `npm run build`. LHCI will fail the job if any category score drops below the thresholds defined above.
- For richer historical tracking, configure LHCI's `upload` target to point at a persistent storage backend (e.g., `lhci upload --target=github`).

## Windows helper script
- If you're running the audit from Windows, use the helper `scripts/run-lhci.ps1`. It prepends `C:\Windows\System32` to the process `PATH` so that `taskkill` is available for ChromeLauncher and then runs `npm run lhci`. Execute it with:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/run-lhci.ps1
```
