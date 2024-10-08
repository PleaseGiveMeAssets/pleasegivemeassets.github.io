<template>
  <div :key="forceRerender" class="card-ui">
    <div>Market Capitalization: {{ data.marketCapitalization }}</div>
    <div>PER: {{ data.per }}</div>
    <div>PBR: {{ data.pbr }}</div>
    <div>ROE: {{ data.roe }}</div>
    <div>PSR: {{ data.psr }}</div>
    <div>BPS: {{ data.bps }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped></style>
