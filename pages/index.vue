<script setup lang="ts">
const totalProfit = {
  title: 'Total Profit',
  color: 'secondary',
  icon: 'ri-pie-chart-2-line',
  stats: '$25.6k',
  change: 42,
  subtitle: 'Weekly Project'
}

const newProject = {
  title: 'New Project',
  color: 'primary',
  icon: 'ri-file-word-2-line',
  stats: '862',
  change: -18,
  subtitle: 'Yearly Project'
}
</script>

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
          <CardStatisticsVertical v-bind="totalProfit" />
        </v-col>

        <v-col cols="12" sm="6">
          <CardStatisticsVertical v-bind="newProject" />
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
