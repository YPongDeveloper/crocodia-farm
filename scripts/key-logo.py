# Extract the emblem from a checkerboard-background JPG -> transparent logo.webp + icon-96.png
# Background = low-saturation gray pixels connected to the image border.
# NOTE: Pillow 12 ImageDraw.floodfill silently fails on Image.fromarray results -> use .copy().
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

SRC = '../information/_picked/logo_hi.jpg'
im = Image.open(SRC).convert('RGB')
W, H = im.size
a = np.asarray(im).astype(int)
R, G, B = a[:,:,0], a[:,:,1], a[:,:,2]
mx = np.maximum(np.maximum(R, G), B); mn = np.minimum(np.minimum(R, G), B)
sat = mx - mn; lum = mx

cand = ((sat < 34) & (lum > 35) & (lum < 200)).astype(np.uint8) * 255
mask = Image.fromarray(cand, 'L').copy()  # .copy() is REQUIRED for floodfill
for seed in [(0,0), (W-1,0), (0,H-1), (W-1,H-1), (W//2,0), (W//2,H-1), (0,H//2), (W-1,H//2)]:
    if mask.getpixel(seed) == 255:
        ImageDraw.floodfill(mask, seed, 128)
bg = np.asarray(mask) == 128
print('background px:', int(bg.sum()), 'of', W*H)

alpha = np.where(bg, 0, 255).astype(np.uint8)
am = Image.fromarray(alpha, 'L').filter(ImageFilter.GaussianBlur(0.8))
alpha = np.minimum(np.asarray(am), alpha)  # feather, never exceed original

rgba = np.dstack([np.asarray(im), alpha])
out = Image.fromarray(rgba, 'RGBA')
out.thumbnail((720, 720), Image.LANCZOS)
out.save('public/img/logo.webp', quality=88)

fav = Image.fromarray(rgba, 'RGBA').resize((96, 96), Image.LANCZOS)
fav.save('public/icon-96.png')
print('logo.webp', out.size, 'transparent px:', int((alpha == 0).sum()))
