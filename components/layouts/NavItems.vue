<script lang="ts" setup></script>

<template>
  <!-- Dashboards -->
  <VerticalNavGroup
    :item="{
      title: 'Dashboards',
      icon: 'ri-home-smile-line'
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Analytics',
        to: '/'
      }"
    />
  </VerticalNavGroup>

  <!-- Products -->
  <VerticalNavGroup
    :item="{
      title: 'Products',
      icon: 'ri-store-2-line'
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Add Products',
        to: '/products/create'
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'Products List',
        to: '/products/list'
      }"
    />
  </VerticalNavGroup>

  <!-- Categories -->
  <VerticalNavLink
    :item="{
      title: 'Categories',
      icon: 'ri-folder-line',
      to: '/categories'
    }"
  />

  <!-- orders -->
  <VerticalNavGroup
    :item="{
      title: 'Orders',
      icon: 'ri-shopping-cart-2-line'
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'All Orders',
        to: '/orders'
      }"
    />
  </VerticalNavGroup>

  <!-- orders -->
  <VerticalNavGroup
    :item="{
      title: 'Prescriptions',
      icon: 'ri-medicine-bottle-line'
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'All prescriptions',
        to: '/prescriptions'
      }"
    />
  </VerticalNavGroup>

  <!-- Apps & Pages -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Apps & Pages'
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Account Settings',
      icon: 'ri-user-settings-line',
      to: '/account-settings'
    }"
  />
</template>
