<template>
  <v-card class="my-8" elevation="0">
    <v-card-subtitle v-if="item.keyword" class="text-primary text-h4 mt-6">{{
      item.keyword
    }}</v-card-subtitle>
    <v-card-title v-if="item.title" class="text-secondary text-h2 my-4"
      >{{ item.title }}

      <nuxt-link
        class="text-h6"
        v-if="item.link && !item.text"
        :to="item.link.to"
      >
        {{ item.link.title }}
        <v-icon size="15" v-if="item.link.icon">{{ item.link.icon }}</v-icon>
      </nuxt-link></v-card-title
    >
    <v-card-text
      ><div v-if="item.text">
        {{ item.text }}
        <nuxt-link v-if="item.link" :to="item.link.to">
          {{ item.link.title }}
          <v-icon v-if="item.link.icon" size="15">{{ item.link.icon }}</v-icon>
        </nuxt-link>
      </div>

      <slot />
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  item: {
    keyword?: string
    title?: string
    text?: string
    link?: {
      title: string
      icon: string
      to: string
    }
  }
}>()
</script>

<!-- <style>

</style> -->
