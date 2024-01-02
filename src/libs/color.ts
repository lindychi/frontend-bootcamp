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
        const hex = (x > 255 ? 255 : x).toString(16).split(".")[0];
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

  return rgbToHex(rgbColor);
}

export const isBrightness = (hexString: string): boolean => {
  // HEX 색상 문자열을 RGB 값으로 변환
  const r = parseInt(hexString.substring(1, 3), 16);
  const g = parseInt(hexString.substring(3, 5), 16);
  const b = parseInt(hexString.substring(5, 7), 16);

  // 밝기 계산
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // 밝기가 125보다 크면 true, 아니면 false 반환
  return brightness > 125;
};
