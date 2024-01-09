import { DEFAULT_OPTIONS } from '@/utils/options';
import { computed, MaybeRef, unref } from 'vue';
import filterObject from '../utils/filterObject';

export default function useOptions(inputProps: MaybeRef<Record<string, unknown>>) {
  return computed(() => filterObject(unref(inputProps), (item, prop) => (
    prop in DEFAULT_OPTIONS
    && !!item
    && (prop !== 'countryIconMode' || item !== 'text')
    && (prop !== 'displayFormat' || item !== 'national')
  )));
}
