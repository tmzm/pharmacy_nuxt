<template>
  <v-btn icon class="cursor-pointer" variant="text">
    <v-icon>ri-translate-2</v-icon>

    <VMenu activator="parent" width="230" location="bottom end" offset="14px">
      <v-list>
        <v-list-item
          v-for="locale in $i18n.locales"
          link
          :active="$i18n.locale == locale.code"
          @click="$i18n.setLocale(locale.code)"
        >
          {{ $t(locale.iso ?? '') }}
        </v-list-item>
      </v-list>
    </VMenu>
  </v-btn>
</template>
