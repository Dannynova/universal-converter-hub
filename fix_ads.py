import os, glob

OLD = """<div class="ad-universal"><script>atOptions={'key':'dcb1d6f117050a40765d2bebf40448ac','format':'iframe','height':90,'width':728,'params':{}};</script><script src="https://willingcease.com/dcb1d6f117050a40765d2bebf40448ac/invoke.js"></script></div>"""

NEW = """<div class="ad-universal"><div class="ad-show-desktop"><script>atOptions={'key':'dcb1d6f117050a40765d2bebf40448ac','format':'iframe','height':90,'width':728,'params':{}};</script><script src="https://willingcease.com/dcb1d6f117050a40765d2bebf40448ac/invoke.js"></script></div><div class="ad-show-mobile"><script>atOptions={'key':'0903b30bbe671500b3e5b3d22a792290','format':'iframe','height':250,'width':300,'params':{}};</script><script src="https://willingcease.com/0903b30bbe671500b3e5b3d22a792290/invoke.js"></script></div></div>"""

files = list(set(glob.glob('*.html') + glob.glob('**/*.html', recursive=True)))
changed = 0
for f in sorted(files):
    try:
        content = open(f, 'r', encoding='utf-8', errors='ignore').read()
        if OLD in content:
            open(f, 'w', encoding='utf-8').write(content.replace(OLD, NEW))
            print('FIXED:', f)
            changed += 1
        else:
            print('skip: ', f)
    except Exception as e:
        print('ERROR:', f, e)
print(f'\nDone — {changed} file(s) updated.')