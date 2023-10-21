

<template>
  
  <n-drawer v-model:show="active" :width="300" placement="left" >
    <n-drawer-content title="Stoner" closable>
      Stoner is a 1965 novel by the American writer John Williams.
    </n-drawer-content>
  </n-drawer>

  <Icon size="35" @click="active = true" style="margin-top: 10px;">
    <navigation16-filled />
  </Icon>
  
  <n-card title="Huge Card" size="huge" style="text-align: center;">
    Card Content
  </n-card>


  

  <!-- <RouterView /> -->
</template>

<script setup>
  //import { RouterLink, RouterView } from 'vue-router';

  // -- icons
  import { Icon } from '@vicons/utils'
  import Navigation16Filled from '@vicons/fluent/Navigation16Filled'
  // -- deps

  import { NButton,NDrawerContent,NDrawer,NPageHeader,NCard } from 'naive-ui';
  import { ref } from 'vue';

  const active = ref(false) 
</script>


<style scoped>

</style>
