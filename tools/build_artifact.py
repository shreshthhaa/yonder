"""Bundle yonder/ into one self-contained page (demo version) for sharing as a link: dist/yonder.html"""
import pathlib
root = pathlib.Path(__file__).resolve().parent.parent
y = root / 'yonder'
css = (y / 'styles.css').read_text()
data = (y / 'data.js').read_text()
app = (y / 'app.js').read_text()
page = f'''<title>Yonder</title>
<meta name="description" content="Save the reels your friends send, plan with AI, vote and go.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,500..900&family=Space+Grotesk:wght@400..700&display=swap" rel="stylesheet">
<style>
:root{{color-scheme:light}}
{css}
</style>
<div id="app" aria-live="polite"></div>
<div id="modal-root"></div>
<div id="toast-root"></div>
<script>window.YONDER_CONFIG = {{ supabaseUrl: '', supabaseAnonKey: '', bundle: true }};</script>
<script>
{data}
</script>
<script>
{app}
</script>
'''
out = root / 'dist' / 'yonder.html'
out.write_text(page)
print(out, len(page)//1024, 'KB')
