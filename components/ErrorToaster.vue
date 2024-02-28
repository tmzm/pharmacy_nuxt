<template>
  <div v-if="toasterStore.showToaster" color="error" class="buy-now-button">
    {{ toasterStore.message }}
    <v-icon
      icon="ri-close-line"
      class="close"
      @click="showToaster = !showToaster"
    />
  </div>
</template>

<script setup lang="ts">
const toasterStore = useToasterStore()

const { showToaster } = storeToRefs(toasterStore)
</script>

<style lang="scss" scoped>
.close {
  cursor: pointer;
}
.buy-now-button,
.button-inner {
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 6px;
  margin: 0;
  appearance: none;
  background: red;
  background-size: 600%;
  color: rgba(255, 255, 255, 90%);
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: 0.43px;
  line-height: 1.2;
  min-inline-size: 50px;
  outline: 0;
  padding-block: 0.625rem;
  padding-inline: 1.25rem;
  text-decoration: none;
  text-transform: none;
  vertical-align: middle;
}

.buy-now-button {
  position: fixed;
  z-index: 999;
  inset-block-end: 5%;
  inset-inline-end: 79px;

  &:hover {
    color: white;
    text-decoration: none;
  }

  .button-inner {
    position: absolute;
    z-index: -1;
    filter: blur(12px);
    inset: 0;
    opacity: 0;
    transition: opacity 200ms ease-in-out;
  }

  &:not(:hover) .button-inner {
    opacity: 0.8;
  }
}

@keyframes anime {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>
