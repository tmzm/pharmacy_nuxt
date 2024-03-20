<template>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      Made With
      <v-icon icon="ri-heart-line" color="error" size="1.25rem" class="mx-1" />
      By
      <a
        href="https://www.facebook.com/creativeidtm"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
        >Tareq AlMozayek</a
      >
    </span>
  </div>
</template>
