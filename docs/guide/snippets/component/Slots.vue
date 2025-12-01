<template>
  <v-phone-input>
    <template #country-input:prepend-inner>
      <v-icon icon="mdi-phone" />
    </template>
    <template #country-title="{ country }">
      {{ country.name }}
    </template>
  </v-phone-input>
</template>
