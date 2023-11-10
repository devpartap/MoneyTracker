
<template>
  
  <div :key="reload_cards">
    <n-drawer v-model:show="active" :width="300" placement="left" >
      <n-drawer-content title="Production Info" closable>
        This app is Under Construction. Hitting Basic Beta Soon...

        <template #footer>
          <n-button type="warning" @click="clearCache">
            Clear Cache
          </n-button>
        </template>
      </n-drawer-content>
    </n-drawer>
  
    <Icon size="35" @click="active = true" style="margin-top: 10px;">
      <navigation16-filled />
    </Icon>
    <div style="text-align: right; margin-top: -42px;">
      <Icon size="35" @click="$router.push('/spendhistory')" style="">
        <money-hand20-regular />
      </Icon>
    </div>
    
  
    <n-scrollbar>
    
      <n-card size="huge" :embedded="true" style="text-align: center;" >
            <div>
              <n-statistic label="Today" :value="$data.history.day[$data.history.day.length - 1].spend[0]" />
            </div>
            <br>

        <n-grid :cols="3">
            <n-gi>
                <n-statistic label="Required" :value="$data.history.day[$data.history.day.length - 1].spend[1]" />
            </n-gi>
            <n-gi>
                <n-statistic label="Needs" :value="$data.history.day[$data.history.day.length - 1].spend[2]" />
            </n-gi>
            <n-gi>
                <n-statistic label="Wants" :value="$data.history.day[$data.history.day.length - 1].spend[3]" />
            </n-gi>
        </n-grid>
        <br>
      </n-card> 
      <br>
  
      <n-card v-show="ifCurrentDatePresent($data.required[i])" v-for="i in [...Array($data.required.length).keys()]" v-bind:key="$data.required[i].name" :title="$data.required[i].name" size="small" style="text-align: center;" >
        <div style="margin-bottom: 12px;">          <b class="card-center">
            <div>
              <n-input-number style="width: 45%;" :default-value="$data.required[i].value" :show-button='false' :on-update:value="(_val_) => {tmp_data_val.val = _val_;tmp_data_val.name=$data.required[i].name;}">
                <template #prefix>
                  ₹
                </template>
              </n-input-number>
            </div>
          </b>
          <div class="card-right" @click="acknowledgeObj($data.required[i]);reload_cards += 1;">Acknowledge <Icon size="25" style="position:absolute;"><checkmark-circle48-filled /></Icon>
          </div>
        </div>
      </n-card>
    
    </n-scrollbar>
  </div>

  <n-back-top :right="113" visibility-height="0" id="floatingBut" style="padding-left: 30px; padding-right: 30px;" @click="$router.push('/addExpense')">
    Add Expense
  </n-back-top>

  

 
  </template>
  
  <script setup>

  
    // -- deps
    import { Icon } from '@vicons/utils';
    import Navigation16Filled from '@vicons/fluent/Navigation16Filled';
    import CheckmarkCircle48Filled from '@vicons/fluent/CheckmarkCircle48Filled';
    import MoneyHand20Regular from '@vicons/fluent/MoneyHand20Regular';
    import { NButton,NDrawerContent,NDrawer,NPageHeader,NCard,NInputNumber,
             NScrollbar,NBackTop,NGi,NGrid,NStatistic } from 'naive-ui';
    import { ref,inject } from 'vue';


    const $data = inject('$data')
        
    const active = ref(false) 
    const reload_cards = ref(0)
       
    const date = new Date();

    let tmp_data_val = {
    name:"",
    val:0
    }

    let todayDate = `${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`
    
    {
      
      let pass = false
      if($data.history.day.length == 0)
      {
        pass = true
      }
      else
      {
        let lstdte = $data.history.day[$data.history.day.length - 1].date.split('-');
        if(((date.getFullYear() >= parseInt(lstdte[2])) && (date.getMonth() + 1 >= parseInt(lstdte[1])) && (date.getDate() > parseInt(lstdte[0]))) )
        {
          pass = true
        }
      }
      if(pass)
      {
        console.log("inhere :)")
        $data.history.day.push({
        'date':todayDate,
        'spend':[0,0,0,0] // total,req,need,wnt 
        })
      }

    }


    function ifCurrentDatePresent(obj){
      console.log(obj)
      let ed = new Date(obj.spantill[1])
      let st = new Date(obj.spantill[0])
      if((ed.getMonth() >= date.getMonth()) && (ed.getDate() >= date.getDate()))
      {
        if((st.getMonth() <= date.getMonth()) && (st.getDate() <= date.getDate()))
        {
          if(getWithPredessorZero(obj.track[obj.track.length - 1].date,1) != date.getDate())
          {
            for(let i = 0; i+1<=obj.excludes.length;i++)
            {
              if(obj.excludes[i] == date.getDay())
              {
                return false
              }
            } 
            return true         
          }
        }
      }
      return false
    }
  
    function acknowledgeObj(obj){

      let topush = {
        "date":todayDate,
        "value":0
      }
  
      if(obj.name == tmp_data_val.name)
      {
        topush.value = tmp_data_val.val
      }
      else topush.value = obj.value     
  
      obj.track.push(topush)

      obj.totalspend += topush.value
      if(date.getMonth() + 1 >= parseInt(obj.track[obj.track.length - 1].date.split('-')[1]))
      {
        obj.enteriesPerMonth.push(1)
        obj.valuePerMonth.push(topush.value)  
      }
      else
      {
        obj.enteriesPerMonth[obj.enteriesPerMonth.length - 1] += 1
        obj.valuePerMonth[obj.valuePerMonth.length - 1] += topush.value
      }

      $data.history.day[$data.history.day.length - 1].spend[1] += topush.value
      $data.history.day[$data.history.day.length - 1].spend[0] += topush.value
      localStorage.setItem("_DATA_", JSON.stringify($data))
    }

    function getWithPredessorZero(dateString,info) {
      const dte = dateString.split('-');
      return parseInt(dte[info-1])
    }
    
    function clearCache()
    {
      localStorage.clear();
      console.log("CacheCleard!!")
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
  