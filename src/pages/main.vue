
<template>
  
    <n-drawer v-model:show="active" :width="300" placement="left" >
      <n-drawer-content title="Stoner" closable>
        Stoner is a 1965 novel by the American writer John Williamsss.
      </n-drawer-content>
    </n-drawer>
  
    <Icon size="35" @click="active = true" style="margin-top: 10px;">
      <navigation16-filled />
    </Icon>
    <div style="text-align: right; margin-top: -42px;">
      <Icon size="35" @click="$router.push('/insert')" style="">
        <add-square-multiple20-filled />
      </Icon>
    </div>
    
  
  
    <div :key="reload_cards">
      <n-card title="Huge Card" size="huge" style="text-align: center;" >
        Card Content<br><br><br><br><br><br><br>
      </n-card> 
  
      <n-card v-show="!(ifCurrentDatePresent(i))" v-for="i in data.required" v-bind:key="i.name" :title="i.name" size="small" style="text-align: center;" >
        <b class="card-center">
          <div>
            <n-input-number style="width: 45%;" :default-value="i.value" :show-button='false' :on-update:value="(_val_) => {tmp_data_val.val = _val_;tmp_data_val.name=i.name;}">
              <template #prefix>
                ₹
              </template>
            </n-input-number>
          </div>
        </b>
        <div class="card-right" @click="acknowledgeObj(i);reload_cards += 1;">Acknowledge <Icon size="25" style="position:absolute;"><checkmark-circle48-filled /></Icon>
        </div>
      </n-card>
      <n-card v-for="i in data.needs" v-bind:key="i" :title="i.name" size="small" style="text-align: center;" >
        {{ i.value }}
      </n-card>
      <n-card v-for="i in data.wants" v-bind:key="i" :title="i.name" size="small" style="text-align: center;" >
        {{ i.value }}
      </n-card>
    </div>
  
    
  
  
  
  
    
  
    <!-- <RouterView /> -->
  </template>
  
  <script setup>
    //import { RouterLink, RouterView } from 'vue-router';
  
  
    // -- deps
    import { Icon } from '@vicons/utils';
    import Navigation16Filled from '@vicons/fluent/Navigation16Filled';
    import CheckmarkCircle48Filled from '@vicons/fluent/CheckmarkCircle48Filled';
    import AddSquareMultiple20Filled from '@vicons/fluent/AddSquareMultiple20Filled';
    import { NButton,NDrawerContent,NDrawer,NPageHeader,NCard,NInputNumber } from 'naive-ui';
    import { ref } from 'vue';
  
    // import markup from './../../ext/localstoragemarkup';
    // localStorage.setItem("_DATA_", JSON.stringify(markup))
  
  
    const active = ref(false) 
    const reload_cards = ref(0)
    let data = getFeilds()
  
    function getFeilds(){
      let dta = JSON.parse(localStorage.getItem("_DATA_"))
      console.log(dta)
      return dta
    }
  
    function saveFeilds(){
      localStorage.setItem("_DATA_", JSON.stringify(data))
    }
    
  </script>
  
  <script>
  const date = new Date();
  
    let tmp_data_val = {
    name:"",
    val:0
    }
  
    function getDtMonYr(){
      return `${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`
    }
  
    function ifCurrentDatePresent(obj){
      if(obj.track[obj.track.length-1].date == getDtMonYr())
      { return true}
  
      return false
    }
  
    function acknowledgeObj(obj){
      
      let topush = {
        "date":getDtMonYr(),
        "value":0
      }
  
      if(obj.name == tmp_data_val.name)
      {
        topush.value =  tmp_data_val.val
      }
      else topush.value =  obj.value 
  
      obj.track.push(topush)
      
  
      console.log(obj)
    }
  </script>
  
  
  <style scoped>
    .card-center{
      text-align: center;
      width: 200px;
      
    }
  
    .card-right{
      font-size: 17px;
      text-align: right;
      margin-right: 10px; 
      margin-top: -30px;
      font-weight: bold;
    }
  </style>
  