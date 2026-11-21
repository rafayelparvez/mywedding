const MAX_AVATAR_BYTES = 4 * 1024 * 1024;
const AVATAR_SIZE = 512;
const ALLOWED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];

/**
 * Reads an image file in the browser, crops it to a square and resizes it so
 * the resulting data URL can be stored on the Better Auth user record.
 */
export async function createAvatarDataUrl(file: File): Promise<string> {
  if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
    throw new Error("Use a JPG, PNG or WebP image.");
  }

  if (file.size > MAX_AVATAR_BYTES) {
    throw new Error("Profile pictures must be 4 MB or smaller.");
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error("That image could not be read. Try a JPG, PNG or WebP file.");
  }

  try {
    const side = Math.min(bitmap.width, bitmap.height);
    const sourceX = (bitmap.width - side) / 2;
    const sourceY = (bitmap.height - side) / 2;

    const canvas = document.createElement("canvas");
    canvas.width = AVATAR_SIZE;
    canvas.height = AVATAR_SIZE;

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Your browser could not process that image.");
    }

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, AVATAR_SIZE, AVATAR_SIZE);
    context.imageSmoothingQuality = "high";
    context.drawImage(
      bitmap,
      sourceX,
      sourceY,
      side,
      side,
      0,
      0,
      AVATAR_SIZE,
      AVATAR_SIZE,
    );

    return canvas.toDataURL("image/jpeg", 0.85);
  } finally {
    bitmap.close();
  }
}
