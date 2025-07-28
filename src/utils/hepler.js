export const convertImageUrlToBase64 = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      // Fill canvas with white background first
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw image on top
      ctx.drawImage(img, 0, 0);

      // Export as JPEG to flatten transparency to white
      const dataUrl = canvas.toDataURL("image/jpeg");
      resolve(dataUrl);
    };

    img.onerror = reject;
    img.src = url;
  });
};
