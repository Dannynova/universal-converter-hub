import glob, re

# ══════════════════════════════════════════════════════════════════════
# FOOTER UPDATER
# Replaces the old footer with the current one (2026, + Privacy Policy link).
# Safe to re-run anytime — skips files that already have the new footer.
# ══════════════════════════════════════════════════════════════════════

NEW_FOOTER = '<footer>\u00a9 2026 Universal Converter Hub \u2013 All tools are free. Ads help us improve. &nbsp;|&nbsp; <a href="privacy-policy.html">Privacy Policy</a></footer>'

# Matches any existing <footer>...</footer> regardless of exact wording/year
FOOTER_PATTERN = re.compile(r'<footer>.*?</footer>', re.DOTALL)

changed = 0
skipped = 0

html_files = sorted(set(glob.glob('*.html') + glob.glob('**/*.html', recursive=True)))

for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        print(f'  ERROR reading {filepath}: {e}')
        continue

    if NEW_FOOTER in content:
        print(f'  skip (already up to date): {filepath}')
        skipped += 1
        continue

    if not FOOTER_PATTERN.search(content):
        print(f'  skip (no <footer> found): {filepath}')
        skipped += 1
        continue

    new_content = FOOTER_PATTERN.sub(NEW_FOOTER, content, count=1)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f'  UPDATED: {filepath}')
    changed += 1

print(f'\nDone. {changed} file(s) updated, {skipped} skipped.')