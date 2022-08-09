import { createVPhoneInput } from '@/index';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App, createApp } from 'vue';

describe('createVPhoneInput.ts', () => {
  let app: App;

  beforeEach(() => {
    app = createApp(() => undefined);
    console.warn = vi.fn();
  });

  it('should warn when plugin options are passed to app.use', async () => {
    console.warn = vi.fn();

    app.use(createVPhoneInput(), {} as never);

    expect(console.warn).toHaveBeenCalledWith('[v-phone-input] options must be passed as first argument of createVPhoneInput()');
  });

  it('should not warn when plugin options are passed to plugin factory', async () => {
    console.warn = vi.fn();

    app.use(createVPhoneInput({}));

    expect(console.warn).not.toHaveBeenCalled();
  });
});
