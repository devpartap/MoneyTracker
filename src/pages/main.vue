
<template>
  
  <div :key="reload_cards">
    <n-drawer v-model:show="active" :width="300" placement="left" >
      <n-drawer-content title="Production Info" closable>
        This app is Under Construction. Hitting Basic Beta Soon...
        <br><br>
        <div style="float: right;">

          <n-button type="warning" @click="clearCache">
            Clear Cache
          </n-button><br><br>

          <n-button type="info" @click="$router.push('/getCache')">
            Get JSON Cache
          </n-button>
          
        </div>
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

      <n-carousel show-arrow autoplay>
    
      <n-card size="huge" :embedded="true" style="text-align: center;" >
            <div>
              <n-statistic label="Today" :value="valueToTemplate($data.history.day[$data.history.day.length - 1].spend[0])" />
            </div>
            <br>

        <n-grid :cols="3">
            <n-gi>
                <n-statistic label="Required" :value="valueToTemplate($data.history.day[$data.history.day.length - 1].spend[1])" />
            </n-gi>
            <n-gi>
                <n-statistic label="Needs" :value="valueToTemplate($data.history.day[$data.history.day.length - 1].spend[2])" />
            </n-gi>
            <n-gi>
                <n-statistic label="Wants" :value="valueToTemplate($data.history.day[$data.history.day.length - 1].spend[3])" />
            </n-gi>
        </n-grid>
        <br>
      </n-card> 

      <n-card size="huge" :embedded="true" style="text-align: center;" >
            <div>
              <n-grid :cols="2">

                <n-gi>
                  <n-statistic label="Base+ Month Total" :value="valueToTemplate(MonthlySpend[0] + MonthlySpend[1] + MonthlySpend[2] + MonthlySpend[3])" />
                </n-gi>
                <n-gi>
                  <n-statistic label="Month Total" :value="valueToTemplate(MonthlySpend[1] + MonthlySpend[2] + MonthlySpend[3])" />
                </n-gi>
            </n-grid>
            </div>
            <br>

        <n-grid :cols="3">
    
            <n-gi>
                <n-statistic label="Required" :value="valueToTemplate(MonthlySpend[1])" />
            </n-gi>
            <n-gi>
                <n-statistic label="Needs" :value="valueToTemplate(MonthlySpend[2])" />
            </n-gi>
            <n-gi>
                <n-statistic label="Wants" :value="valueToTemplate(MonthlySpend[3])" />
            </n-gi>
        </n-grid>
        <br>
      </n-card> 

    </n-carousel>
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
          <div class="card-right" @click="acknowledgeObj($data.required[i]);reload_cards += 1;getMontlyDetails();">Acknowledge <Icon size="25" style="position:absolute;"><checkmark-circle48-filled /></Icon>
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
             NScrollbar,NBackTop,NGi,NGrid,NStatistic,NCarousel } from 'naive-ui';
    import { ref,inject } from 'vue';


    const $data = inject('$data')
        
    const active = ref(false) 
    const reload_cards = ref(0)

    const MonthlySpend = [0,0,0,0] // base,req,need,wnt 
       
    const date = new Date();

    // -- For Testing Purposes --
    // date.setDate(date.getDate() - 2)
    // console.log(date.getDate())
    // --------------------------

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

      if((obj.spantill[1] > Date.now()) && (obj.spantill[0] < Date.now()))
      {
          if(getWithPredessorZero(obj.track[obj.track.length - 1].date,1) != date.getDate())
          {
            for(let i = 0; i<obj.excludes.length;i++)
            {
              if(parseInt(obj.excludes[i]) == date.getDay())
              {
                return false
              }
            } 
            return true         
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
      if(date.getMonth() + 1 > parseInt(obj.track[obj.track.length - 1].date.split('-')[1]))
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

    function getMontlyDetails()
    {
      for(let i = 0; i<= $data.base.length - 1;i++)
      {
        if($data.base.length >= 1){

          if((getWithPredessorZero($data.base[i].init,2) == date.getMonth() + 1) && 
             (getWithPredessorZero($data.base[i].init,3) == date.getFullYear()))
          {
            MonthlySpend[0] += $data.base[i].value
          }
        }
      } 

      let cata = ['required','needs','wants']
      for(let j = 1; j<=3; j++)
      {
        if($data[cata[j - 1]].length >= 1){

          for(let i = 0; i<= $data[cata[j - 1]].length - 1;i++)
          {
            if((getWithPredessorZero($data[cata[j - 1]][i].track[$data[cata[j - 1]][i].track.length - 1].date, 2) == date.getMonth() + 1) && 
               (getWithPredessorZero($data[cata[j - 1]][i].track[$data[cata[j - 1]][i].track.length - 1].date, 3) == date.getFullYear()))
            {
              MonthlySpend[j] += $data[cata[j - 1]][i].valuePerMonth[$data[cata[j - 1]][i].valuePerMonth.length - 1]
            }
          }
        }
      }
    }

    function valueToTemplate(number)
    {
      console.log('looping')
      let strtoreturn = "₹"
      
      if(number)
      {      
        const numberString = number.toString();
        let huntodo = false
        let toittr = numberString.length - 1
        
        if((toittr % 2) != 0)
        {
            strtoreturn = strtoreturn + numberString.substring(0,1) + ','
            toittr -= 1
            huntodo = true
        }
      
        for(let i = 0; i<toittr;i +=2)
        {
            strtoreturn = strtoreturn + numberString.substring(i + huntodo,i + huntodo + 2) + ','
        }
        strtoreturn = strtoreturn.slice(0,strtoreturn.length-1)
        strtoreturn += numberString.substring(numberString.length - 1,numberString.length - 0)

        return strtoreturn
      }
      else
      {
        strtoreturn += "0"
        return strtoreturn
      }
    
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

    getMontlyDetails()

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
  