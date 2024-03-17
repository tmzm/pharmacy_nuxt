<script setup lang="ts"></script>

<template>
  <v-row class="match-height">
    <v-col cols="12">
      <v-card title="Recent Users"> <AnalyticsUserTable /> </v-card>
    </v-col>

    <v-col cols="12" md="4">
      <AnalyticsAward />
    </v-col>

    <v-col cols="12" md="8">
      <AnalyticsTransactions />
    </v-col>

    <v-col cols="12" md="4">
      <AnalyticsWeeklyOverview />
    </v-col>

    <v-col cols="12" md="4">
      <AnalyticsTotalEarning />
    </v-col>

    <v-col cols="12" md="4">
      <v-row class="match-height">
        <v-col cols="12" sm="6">
          <AnalyticsTotalProfitLineCharts />
        </v-col>

        <v-col cols="12" sm="6">
          <AnalyticsBarCharts />
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" md="4">
      <AnalyticsSalesByCountries />
    </v-col>

    <v-col cols="12" md="8">
      <AnalyticsDepositWithdraw />
    </v-col>
  </v-row>
</template>
