export type DisplayMode = 'national' | 'international' | 'e164';

export const DISPLAY_MODE_NATIONAL = 'national' as DisplayMode;
export const DISPLAY_MODE_INTERNATIONAL = 'international' as DisplayMode;
export const DISPLAY_MODE_E164 = 'e164' as DisplayMode;

export const DISPLAY_MODES = [
  DISPLAY_MODE_NATIONAL,
  DISPLAY_MODE_INTERNATIONAL,
  DISPLAY_MODE_E164,
];

export function validateMode(mode: string): mode is DisplayMode {
  return (DISPLAY_MODES as string[]).indexOf(mode) !== -1;
}

export function formatForMode(phoneObject: any, mode: DisplayMode): string {
  return phoneObject.number[phoneObject.valid ? mode : 'input'];
}
