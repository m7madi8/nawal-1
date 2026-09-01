"""Generate transparent logo variants for light and dark surfaces."""
from pathlib import Path

from PIL import Image, ImageChops, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "media" / "brand" / "logo.png"
OUT = ROOT / "public" / "media" / "brand"

INK = (37, 34, 31)
ACCENT = (139, 107, 82)


def remove_black_bg(img: Image.Image, threshold: int = 42) -> Image.Image:
    img = img.convert("RGBA")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if r + g + b <= threshold * 3:
                pixels[x, y] = (0, 0, 0, 0)
    return img


def is_accent(r: int, g: int, b: int) -> bool:
    return r > 95 and g < 185 and b < 135 and r > g + 15


def recolor_for_light(img: Image.Image) -> Image.Image:
    img = img.copy()
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if a < 12:
                continue
            if is_accent(r, g, b):
                pixels[x, y] = (*ACCENT, 255)
            else:
                pixels[x, y] = (*INK, 255)
    return img


def strengthen_lines(img: Image.Image, radius: int = 3) -> Image.Image:
    """Slightly thicken faint strokes for small header sizes."""
    r, g, b, a = img.split()
    a = a.filter(ImageFilter.MaxFilter(radius))
    a = a.point(lambda v: min(255, int(v * 1.05)))
    return Image.merge("RGBA", (r, g, b, a))


def trim(img: Image.Image, pad: int = 24) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        return img
    x0, y0, x1, y1 = bbox
    return img.crop(
        (
            max(0, x0 - pad),
            max(0, y0 - pad),
            min(img.width, x1 + pad),
            min(img.height, y1 + pad),
        )
    )


def crop_mark(img: Image.Image) -> Image.Image:
    """Keep the yoga figure mark only (exclude wordmark)."""
    w, h = img.size
    return img.crop((0, 0, w, int(h * 0.48)))


def main() -> None:
    src = Image.open(SRC)
    base = trim(remove_black_bg(src))

    on_dark = strengthen_lines(base.copy())
    on_dark.save(OUT / "logo-on-dark.png", optimize=True)

    mark_dark = trim(strengthen_lines(crop_mark(base.copy())))
    mark_dark.save(OUT / "logo-mark-on-dark.png", optimize=True)

    on_light = strengthen_lines(recolor_for_light(base.copy()))
    on_light.save(OUT / "logo-on-light.png", optimize=True)

    mark_light = trim(strengthen_lines(recolor_for_light(crop_mark(base.copy())), radius=5))
    mark_light.save(OUT / "logo-mark-on-light.png", optimize=True)

    print("Created logo variants in", OUT)


if __name__ == "__main__":
    main()
