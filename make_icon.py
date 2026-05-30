from PIL import Image, ImageDraw, ImageFont
import os

def create_iqs_icon():
    sizes = [256, 128, 64, 48, 32, 16]
    images = []

    for size in sizes:
        img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)

        # Sfondo navy con angoli arrotondati
        navy = (5, 17, 31, 255)
        cyan = (0, 194, 232, 255)
        r = max(size // 8, 4)

        # Disegna sfondo arrotondato
        draw.rounded_rectangle([0, 0, size-1, size-1], radius=r, fill=navy)

        # Linea accent cyan in alto
        bar_h = max(size // 16, 2)
        draw.rounded_rectangle([0, 0, size-1, bar_h], radius=r, fill=cyan)

        # Testo "IQS" centrato
        padding = size * 0.1
        text_area = size - padding * 2

        try:
            font_size = int(text_area * 0.48)
            font = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", font_size)
        except:
            font = ImageFont.load_default()

        text = "IQS"
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        tx = (size - tw) / 2 - bbox[0]
        ty = (size - th) / 2 - bbox[1] + size * 0.04

        # Ombra sottile
        draw.text((tx+1, ty+1), text, font=font, fill=(0, 0, 0, 120))
        # Testo bianco
        draw.text((tx, ty), text, font=font, fill=(255, 255, 255, 255))

        # Puntino cyan in basso a destra (accent)
        dot_r = max(size // 12, 2)
        dot_x = size - dot_r - max(size // 10, 2)
        dot_y = size - dot_r - max(size // 10, 2)
        draw.ellipse([dot_x - dot_r, dot_y - dot_r, dot_x + dot_r, dot_y + dot_r], fill=cyan)

        images.append(img)

    out_path = os.path.join(os.path.dirname(__file__), "iqs.ico")
    images[0].save(out_path, format="ICO", sizes=[(s, s) for s in sizes], append_images=images[1:])
    print(f"Icona creata: {out_path}")

create_iqs_icon()
