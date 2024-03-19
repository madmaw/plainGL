export const enum Size {
  Small = 1,
  Medium,
  Large,
}

// force compiler to check that all sizes are handled
const _SIZES: Record<Size, null> = {
  [Size.Small]: null,
  [Size.Medium]: null,
  [Size.Large]: null,
};
export const SIZES: Size[] = Object.keys(_SIZES).map(Number);

export type Metrics = {
  gridBaseline: number,
  textLineHeight: number,
  borderWidth: number,
  borderRadius: number,
  strokeWidth: number,
};
