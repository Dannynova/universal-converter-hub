import cairosvg

# Convert SVG to PNG
cairosvg.svg2png(url='logo.svg', write_to='logo.png', output_width=256, output_height=256)