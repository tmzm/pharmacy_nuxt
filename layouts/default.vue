<template>
  <div :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'">
    <DefaultLayoutWithVerticalNav>
      <slot />
    </DefaultLayoutWithVerticalNav>
  </div>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use '@/@layouts/styles/default-layout';
</style>
