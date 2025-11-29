<template>
  <v-phone-input>
    <template #country-display="{ country, decorative }">
      <my-country-icon-component
        :country="country.iso2"
        :title="decorative ? undefined : country.name"
      />
    </template>
  </v-phone-input>
</template>
