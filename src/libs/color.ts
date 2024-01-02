type RGBColor = {
  r: number;
  g: number;
  b: number;
};

function hexToRgb(hex: string): RGBColor | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? ({
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      } as RGBColor)
    : null;
}

function rgbToHex({ r, g, b }: RGBColor): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16).split(".")[0];
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

export function reduceBrightness(
  hexColor: string,
  reductionFactor: number
): string | null {
  let rgbColor = hexToRgb(hexColor);
  if (!rgbColor) {
    return null;
  }

  rgbColor.r = Math.max(0, rgbColor.r * reductionFactor);
  rgbColor.g = Math.max(0, rgbColor.g * reductionFactor);
  rgbColor.b = Math.max(0, rgbColor.b * reductionFactor);

  console.log(rgbColor, rgbToHex(rgbColor));

  return rgbToHex(rgbColor);
}
