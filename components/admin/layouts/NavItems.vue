<script lang="ts" setup></script>

<template>
  <!-- Search -->
  <div
    class="d-flex ms-4 mb-4 align-center cursor-pointer"
    style="user-select: none"
  >
    <!-- Search Trigger button -->
    <IconBtn>
      <v-icon icon="ri-search-line" />
    </IconBtn>

    <span class="align-center text-disabled">
      <span class="me-3">Search</span>
      <span class="meta-key">&#8984;K</span>
    </span>
  </div>
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
        to: '/admin'
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
        to: '/admin/products/create'
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'Products List',
        to: '/admin/products/list'
      }"
    />
  </VerticalNavGroup>

  <!-- Categories -->
  <VerticalNavLink
    :item="{
      title: 'Categories',
      icon: 'ri-folder-line',
      to: '/admin/categories'
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
        to: '/admin/orders'
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
        to: '/admin/prescriptions'
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
      to: '/admin/account-settings'
    }"
  />
</template>
