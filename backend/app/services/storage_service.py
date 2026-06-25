import uuid
from pathlib import Path

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


async def save_file_locally(content: bytes, extension: str) -> str:
    filename = f"{uuid.uuid4().hex}.{extension}"
    dest = UPLOAD_DIR / filename
    dest.write_bytes(content)
    return f"/uploads/{filename}"


async def remove_background(image_url: str) -> str:
    return image_url
