<script lang="ts" setup>
const recentDevices = ref([
  {
    type: 'New for you',
    email: true,
    browser: true,
    app: true
  },
  {
    type: 'Account activity',
    email: true,
    browser: true,
    app: true
  },
  {
    type: 'A new browser used to sign in',
    email: true,
    browser: true,
    app: false
  },
  {
    type: 'A new device is linked',
    email: true,
    browser: false,
    app: false
  }
])

const selectedNotification = ref("Only when I'm online")
</script>

<template>
  <v-card title="Recent Devices">
    <v-card-text>
      We need permission from your browser to show notifications.
      <a href="javascript:void(0)">Request Permission</a>
    </v-card-text>

    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <th scope="col">Type</th>
          <th scope="col">EMAIL</th>
          <th scope="col">BROWSER</th>
          <th scope="col">App</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="device in recentDevices" :key="device.type">
          <td>
            {{ device.type }}
          </td>
          <td>
            <VCheckbox v-model="device.email" />
          </td>
          <td>
            <VCheckbox v-model="device.browser" />
          </td>
          <td>
            <VCheckbox v-model="device.app" />
          </td>
        </tr>
      </tbody>
    </VTable>
    <VDivider />

    <v-card-text>
      <VForm @submit.prevent="() => {}">
        <p class="text-base font-weight-medium">
          When should we send you notifications?
        </p>

        <v-row>
          <v-col cols="12" sm="6">
            <VSelect
              v-model="selectedNotification"
              mandatory
              :items="['Only when I\'m online', 'Anytime']"
            />
          </v-col>
        </v-row>

        <div class="d-flex flex-wrap gap-4 mt-4">
          <v-btn type="submit"> Save Changes </v-btn>
          <v-btn color="secondary" variant="outlined" type="reset">
            Reset
          </v-btn>
        </div>
      </VForm>
    </v-card-text>
  </v-card>
</template>
