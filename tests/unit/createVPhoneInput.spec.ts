import { createVPhoneInput } from '@/index';
import { describe, expect, it } from 'vitest';
import Vue from 'vue';

describe('createVPhoneInput.ts', () => {
  it('should throw an error when plugin options are passed to Vue', async () => {
    expect(() => Vue.use(createVPhoneInput(), {} as never))
      .toThrowError('options must be passed when calling createVPhoneInput');
  });

  it('should not throw an error when plugin options are passed to plugin constructor', async () => {
    expect(() => Vue.use(createVPhoneInput({}))).not.toThrow();
  });
});
