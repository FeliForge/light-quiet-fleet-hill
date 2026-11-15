#!/usr/bin/env python3
"""StudySphere share card — exact 1200×630 artwork with a baked title."""

from PIL import Image, ImageDraw, ImageFilter, ImageFont

FONT = "/workspace/.grok/fonts/Nunito-wght.ttf"
S = 2  # supersample
W, H = 1200 * S, 630 * S

PRIMARY = (35, 64, 216)
INK = (15, 26, 51)
PAPER = (238, 243, 248)
PAPER_DEEP = (214, 226, 238)
GREEN = (43, 154, 79)
AMBER = (199, 127, 8)
PINK = (214, 51, 108)
TEAL = (10, 141, 184)
VIOLET = (118, 85, 197)
WHITE = (255, 255, 255)
BRONZE = (176, 112, 62)
BRONZE_LT = (232, 196, 150)
SILVER = (150, 162, 176)
SILVER_LT = (236, 240, 244)
GOLD = (212, 160, 42)
GOLD_LT = (255, 226, 140)


def P(x, y=None):
    if y is None:
        return int(round(x * S))
    return (int(round(x * S)), int(round(y * S)))


def font(px, weight=b"ExtraBold"):
    f = ImageFont.truetype(FONT, P(px))
    f.set_variation_by_name(weight)
    return f


def vertical_gradient(w, h, c1, c2):
    col = Image.new("RGB", (1, h))
    px = col.load()
    for y in range(h):
        t = y / max(1, h - 1)
        px[0, y] = tuple(int(c1[i] * (1 - t) + c2[i] * t) for i in range(3))
    return col.resize((w, h), Image.Resampling.BILINEAR)


def blit(base, layer, cx, cy, angle=0):
    if angle:
        layer = layer.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
    x = int(round(cx - layer.width / 2))
    y = int(round(cy - layer.height / 2))
    base.alpha_composite(layer, (x, y))


def rounded_rect(draw, box, r, fill):
    draw.rounded_rectangle(box, radius=r, fill=fill)


def notebook(w, h, cover, stripe, rules=True):
    """Upright notebook layer, origin at top-left of the layer."""
    pad = P(18)
    layer = Image.new("RGBA", (w + pad * 2, h + pad * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    x0, y0, x1, y1 = pad, pad, pad + w, pad + h
    # shadow
    sh = Image.new("RGBA", layer.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(sh)
    sd.rounded_rectangle((x0 + P(8), y0 + P(12), x1 + P(8), y1 + P(12)), radius=P(22), fill=(15, 26, 51, 50))
    sh = sh.filter(ImageFilter.GaussianBlur(P(8)))
    layer.alpha_composite(sh)
    d = ImageDraw.Draw(layer)
    d.rounded_rectangle((x0, y0, x1, y1), radius=P(22), fill=cover + (255,))
    # page block edge
    d.rounded_rectangle((x0 + P(16), y0 + P(10), x1 - P(10), y1 - P(10)), radius=P(12), fill=(255, 255, 255, 235))
    # spine
    d.rounded_rectangle((x0, y0, x0 + P(22), y1), radius=P(10), fill=tuple(max(0, c - 36) for c in cover) + (255,))
    d.rectangle((x0 + P(12), y0 + P(8), x0 + P(22), y1 - P(8)), fill=tuple(max(0, c - 36) for c in cover) + (255,))
    # highlighter stripe on the cover margin
    d.rounded_rectangle(
        (x0 + P(34), y0 + P(28), x1 - P(28), y0 + P(52)),
        radius=P(8),
        fill=stripe + (255,),
    )
    if rules:
        yy = y0 + P(78)
        while yy < y1 - P(28):
            d.line([(x0 + P(40), yy), (x1 - P(28), yy)], fill=(214, 224, 234, 255), width=max(1, P(2)))
            yy += P(22)
    return layer


def capsule(w, h, x0, y0, x1, y1, thickness, color, alpha=210):
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    fill = color + (alpha,)
    d.line([(x0, y0), (x1, y1)], fill=fill, width=thickness)
    r = thickness // 2
    d.ellipse((x0 - r, y0 - r, x0 + r, y0 + r), fill=fill)
    d.ellipse((x1 - r, y1 - r, x1 + r, y1 + r), fill=fill)
    return layer


def medal(r, metal, lite, rainbow=False):
    dpx = r * 2 + P(8)
    layer = Image.new("RGBA", (dpx, dpx + P(16)), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx, cy = dpx // 2, r + P(4)
    # ribbon tails
    d.polygon(
        [(cx - P(8), cy), (cx - P(16), cy + r + P(14)), (cx - P(4), cy + r + P(6))],
        fill=PINK + (255,),
    )
    d.polygon(
        [(cx + P(8), cy), (cx + P(16), cy + r + P(14)), (cx + P(4), cy + r + P(6))],
        fill=PRIMARY + (255,),
    )
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=metal + (255,))
    ir = int(r * 0.72)
    if rainbow:
        cols = [GREEN, AMBER, PINK, TEAL, VIOLET, PRIMARY]
        for i, c in enumerate(cols):
            d.pieslice((cx - ir, cy - ir, cx + ir, cy + ir), start=i * 60 - 90, end=(i + 1) * 60 - 90, fill=c + (255,))
    else:
        d.ellipse((cx - ir, cy - ir, cx + ir, cy + ir), fill=lite + (255,))
        core = int(r * 0.38)
        d.ellipse((cx - core, cy - core, cx + core, cy + core), fill=metal + (255,))
    # specular
    d.ellipse((cx - int(r * 0.45), cy - int(r * 0.55), cx - int(r * 0.05), cy - int(r * 0.15)), fill=(255, 255, 255, 140))
    return layer


def draw_mascot(base, cx, head_cy, k=0.88):
    """Chibi student: glossy sphere head, cobalt hoodie, highlighter. Not an owl."""

    def u(px):
        return int(round(px * S * k))

    r = u(58)
    sh = Image.new("RGBA", base.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(sh)
    sd.ellipse((cx - u(70), head_cy + u(108), cx + u(78), head_cy + u(132)), fill=(15, 26, 51, 45))
    base.alpha_composite(sh.filter(ImageFilter.GaussianBlur(max(1, u(8)))))

    d = ImageDraw.Draw(base)
    body_top = head_cy + u(34)
    d.rounded_rectangle((cx - u(62), body_top, cx + u(62), body_top + u(86)), radius=u(30), fill=PRIMARY + (255,))
    d.rounded_rectangle((cx - u(96), body_top + u(8), cx - u(46), body_top + u(52)), radius=u(18), fill=PRIMARY + (255,))
    d.rounded_rectangle((cx + u(46), body_top + u(6), cx + u(100), body_top + u(50)), radius=u(18), fill=PRIMARY + (255,))
    d.ellipse((cx - u(108), body_top + u(24), cx - u(80), body_top + u(50)), fill=(255, 244, 232, 255))
    d.ellipse((cx + u(84), body_top + u(22), cx + u(112), body_top + u(48)), fill=(255, 244, 232, 255))
    d.rounded_rectangle((cx - u(20), body_top + u(36), cx + u(20), body_top + u(68)), radius=u(10), fill=(24, 48, 176, 255))
    d.pieslice((cx - u(24), head_cy + u(24), cx + u(24), head_cy + u(70)), start=200, end=340, fill=(24, 48, 176, 255))

    pen = Image.new("RGBA", base.size, (0, 0, 0, 0))
    pd = ImageDraw.Draw(pen)
    pd.rounded_rectangle((cx + u(90), body_top - u(48), cx + u(114), body_top + u(36)), radius=u(8), fill=GREEN + (255,))
    pd.rectangle((cx + u(90), body_top - u(10), cx + u(114), body_top + u(4)), fill=(255, 255, 255, 230))
    pd.polygon(
        [
            (cx + u(92), body_top - u(48)),
            (cx + u(112), body_top - u(48)),
            (cx + u(108), body_top - u(68)),
            (cx + u(96), body_top - u(68)),
        ],
        fill=(190, 230, 90, 255),
    )
    pen = pen.rotate(22, resample=Image.Resampling.BICUBIC, center=(cx + u(102), body_top), expand=False)
    base.alpha_composite(pen)

    d = ImageDraw.Draw(base)
    d.ellipse((cx - r - u(3), head_cy - r + u(4), cx + r - u(3), head_cy + r + u(5)), fill=(180, 198, 216, 255))
    d.ellipse((cx - r, head_cy - r, cx + r, head_cy + r), fill=(247, 250, 253, 255))
    d.arc(
        (cx - r + u(8), head_cy - u(14), cx + r - u(8), head_cy + u(24)),
        start=200,
        end=340,
        fill=(198, 214, 228, 255),
        width=max(2, u(3)),
    )
    d.ellipse((cx - u(32), head_cy - u(36), cx - u(8), head_cy - u(14)), fill=(255, 255, 255, 230))
    eye_y = head_cy - u(4)
    d.ellipse((cx - u(22), eye_y - u(6), cx - u(10), eye_y + u(6)), fill=INK + (255,))
    d.ellipse((cx + u(10), eye_y - u(6), cx + u(22), eye_y + u(6)), fill=INK + (255,))
    d.ellipse((cx - u(19), eye_y - u(3), cx - u(15), eye_y + u(1)), fill=WHITE + (255,))
    d.ellipse((cx + u(13), eye_y - u(3), cx + u(17), eye_y + u(1)), fill=WHITE + (255,))
    d.arc((cx - u(14), head_cy + u(6), cx + u(14), head_cy + u(26)), start=20, end=160, fill=INK + (255,), width=max(2, u(3)))
    d.ellipse((cx - u(36), head_cy + u(8), cx - u(24), head_cy + u(15)), fill=PINK + (80,))
    d.ellipse((cx + u(24), head_cy + u(8), cx + u(36), head_cy + u(15)), fill=PINK + (80,))


def tracked_text(base, text, cx, cy, fnt, fill, tracking):
    """Center a string with extra tracking. cy is the visual center."""
    d = ImageDraw.Draw(base)
    widths = []
    for ch in text:
        b = d.textbbox((0, 0), ch, font=fnt)
        widths.append(b[2] - b[0])
    total = sum(widths) + tracking * (len(text) - 1)
    x = cx - total / 2
    # vertical: use a reference bbox
    ref = d.textbbox((0, 0), text, font=fnt)
    top = cy - (ref[3] - ref[1]) / 2 - ref[1]
    for ch, w in zip(text, widths):
        d.text((x, top), ch, font=fnt, fill=fill)
        x += w + tracking
    return (cx - total / 2, top, cx + total / 2, top + (ref[3] - ref[1]))


def main():
    rgb = vertical_gradient(W, H, (246, 249, 252), PAPER_DEEP)
    base = rgb.convert("RGBA")

    # soft sphere halo behind the lockup
    halo = Image.new("RGBA", base.size, (0, 0, 0, 0))
    hd = ImageDraw.Draw(halo)
    hd.ellipse(P(600 - 250, 250 - 210) + P(600 + 250, 250 + 230), fill=(255, 255, 255, 170))
    base.alpha_composite(halo.filter(ImageFilter.GaussianBlur(P(8))))

    # notebooks framing the sides
    left = notebook(P(280), P(390), TEAL, PINK)
    blit(base, left, P(78), P(330), angle=-16)
    right = notebook(P(270), P(380), VIOLET, AMBER)
    blit(base, right, P(1132), P(350), angle=14)
    slim = notebook(P(200), P(250), PINK, GREEN, rules=False)
    blit(base, slim, P(36), P(530), angle=-8)

    # highlighter marks in the margins, clear of the center lockup
    marks = [
        capsule(W, H, *P(70, 78), *P(250, 58), P(22), GREEN, 200),
        capsule(W, H, *P(980, 70), *P(1160, 96), P(20), AMBER, 200),
        capsule(W, H, *P(40, 200), *P(180, 230), P(16), TEAL, 170),
        capsule(W, H, *P(1020, 500), *P(1170, 470), P(18), PINK, 190),
    ]
    for m in marks:
        base.alpha_composite(m)

    # title lockup — centered, about two-thirds width, not edge to edge
    study_f = font(156, b"Black")
    sphere_f = font(156, b"Black")
    d = ImageDraw.Draw(base)
    study_bb = d.textbbox((0, 0), "STUDY", font=study_f)
    sphere_bb = d.textbbox((0, 0), "SPHERE", font=sphere_f)
    study_w = study_bb[2] - study_bb[0]
    sphere_w = sphere_bb[2] - sphere_bb[0]
    lock_cx = P(600)
    study_y = P(96)
    sphere_y = P(232)
    d.text((lock_cx - study_w / 2 - study_bb[0], study_y), "STUDY", font=study_f, fill=INK + (255,))
    d.text((lock_cx - sphere_w / 2 - sphere_bb[0], sphere_y), "SPHERE", font=sphere_f, fill=INK + (255,))

    eyebrow = font(20, b"Bold")
    tracked_text(
        base,
        "PROVA BIMESTRAL",
        lock_cx,
        P(74),
        eyebrow,
        PRIMARY + (255,),
        P(3.4),
    )

    draw_mascot(base, P(600), P(492))

    # league ladder: bronze → chromatic, flanking the mascot's shoulders
    medals = [
        medal(P(22), BRONZE, BRONZE_LT),
        medal(P(22), SILVER, SILVER_LT),
        medal(P(22), GOLD, GOLD_LT),
        medal(P(22), TEAL, (186, 230, 240)),
        medal(P(22), VIOLET, (214, 198, 245)),
        medal(P(22), INK, WHITE, rainbow=True),
    ]
    xs = [196, 254, 312, 888, 946, 1004]
    for m, x in zip(medals, xs):
        blit(base, m, P(x), P(548))

    out = base.convert("RGB").resize((1200, 630), Image.Resampling.LANCZOS)
    out.save("/workspace/.grok/og-raw.png", "PNG")

    # report title bounds in final pixels
    # recompute from the 2x draw positions
    def fin(bb):
        return tuple(round(v / S, 1) for v in bb)

    study_box = (lock_cx - study_w / 2, study_y + study_bb[1], lock_cx + study_w / 2, study_y + study_bb[3])
    sphere_box = (lock_cx - sphere_w / 2, sphere_y + sphere_bb[1], lock_cx + sphere_w / 2, sphere_y + sphere_bb[3])
    print("STUDY box px", fin(study_box), "width", round(study_w / S, 1))
    print("SPHERE box px", fin(sphere_box), "width", round(sphere_w / S, 1))
    print("frame", out.size)


if __name__ == "__main__":
    main()
