
<template>

  <updatesInfo :key="toshowMdl" :tojustview="toshowMdl"/>  

  <div :key="reload_cards">
    <n-drawer v-model:show="active" :width="300" placement="left" >
      <n-drawer-content closable>
        
        <template #header>
            <div class="drawerHeader">MoneyTracker ({{$data.history.version}})</div>
        </template>
        <div >

          <h2 class="listItemsHeading">ACTIONS</h2>

          <n-list hoverable clickable class="listItems">

            <n-list-item @click="toshowMdl += 1">
              <strong> Show Update Info </strong>
            </n-list-item>

            <n-list-item v-if="devmode == true" @click="recalculate_Enteries_PerMonth_Data">
              <strong> Recalculate Enteries </strong>
            </n-list-item>
  
            <n-list-item v-if="devmode == true" @click="$router.push('/getCache')">
              <strong> Get JSON Cache </strong>
            </n-list-item>

            <n-list-item v-if="devmode == true" @click="clearCache" style="color: red;">
              <strong> Clear Cache </strong>
            </n-list-item>
          
          </n-list>

      </div>

        <br><br>
        <h2 class="listItemsHeading">OPTIONS</h2>
        <table class="optionsItems" >
          <tr>
            <td>
              Developer Mode
            </td>
            <td>
              <n-switch :value="devmode" :on-update:value="updateDevmode"/>
            </td>
          </tr>
        </table>

        
      </n-drawer-content>
    </n-drawer>
  <div style="width: 100%;display: flexbox;flex-direction: row;margin-top: -7px;">

    <div style="text-align: center;">
      <h2 id="heading">MoneyTracker</h2>
    </div>

    <div style="float: left;margin-top: -65px;">
      <Icon size="45" @click="active = true">
        <navigation16-filled />
      </Icon>
    </div>

    <div style="float: right;margin-top: -66px;">
      <Icon size="45" @click="$router.push('/spendhistory')" style="">
        <money-hand20-regular />
      </Icon>
    </div>
  </div>
    
  
    <n-scrollbar>

      <n-carousel show-arrow autoplay>
    
      <n-card size="large" :embedded="true" style="text-align: center;" >
            <div>
              <n-statistic :value="valueToTemplate($data.history.day[$data.history.day.length - 1].spend[0])">
                <template #label>
                    <div class="statLabel">Today</div>
                </template>

              </n-statistic>
            </div>
            <br>

        <n-grid :cols="3">
            <n-gi>
                <n-statistic :value="valueToTemplate($data.history.day[$data.history.day.length - 1].spend[1])" >
                  <template #label>
                    <div class="statLabel">Required</div>
                  </template>

                </n-statistic>
                <h6 id="deviation">({{requiredDeviationVal[0]}})</h6>
            </n-gi>
            <n-gi>
                <n-statistic :value="valueToTemplate($data.history.day[$data.history.day.length - 1].spend[2])" >
                  <template #label>
                    <div class="statLabel">Needs</div>
                  </template>
                </n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic :value="valueToTemplate($data.history.day[$data.history.day.length - 1].spend[3])" >
                  <template #label>
                    <div class="statLabel">Wants</div>
                  </template>
                </n-statistic>
            </n-gi>
        </n-grid>
        
      </n-card> 

      <n-card size="large" :embedded="true" style="text-align: center;" >
            <div>
              <n-grid :cols="2">

                <n-gi>
                  <n-statistic :value="valueToTemplate(roundTwoDecimal(MonthlySpend[0] + MonthlySpend[1] + MonthlySpend[2] + MonthlySpend[3]))" > 
                    <template #label>
                      <div class="statLabel">Base + Month</div>
                    </template>
                </n-statistic>
                </n-gi>
                <n-gi>
                  <n-statistic :value="valueToTemplate(roundTwoDecimal(MonthlySpend[1] + MonthlySpend[2] + MonthlySpend[3]))" >
                    <template #label>
                      <div class="statLabel">Month's Total</div>
                    </template>
                  </n-statistic>
                </n-gi>
            </n-grid>
            </div>
            <br>

        <n-grid :cols="3">
    
            <n-gi>
                <n-statistic :value="valueToTemplate(MonthlySpend[1])" >
                  <template #label>
                      <div class="statLabel">Required</div>
                    </template>
                  </n-statistic>
                <h6 id="deviation">({{requiredDeviationVal[1]}})</h6>
            </n-gi>
            <n-gi>
                <n-statistic :value="valueToTemplate(MonthlySpend[2])" >
                  <template #label>
                    <div class="statLabel">Needs</div>
                  </template>
                  </n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic :value="valueToTemplate(MonthlySpend[3])" >
                  <template #label>
                    <div class="statLabel">Wants</div>
                  </template>
                </n-statistic>
            </n-gi>
        </n-grid>
        
      </n-card> 

    </n-carousel>
      <br>
    <div :key="reload_acknowledge_obj">
      <n-card v-show="ifCurrentDatePresent($data.required[i],i)" v-for="i in [...Array($data.required.length).keys()]" v-bind:key="$data.required[i].name" 
              size="small" style="text-align: center;" >
        
          <template #header>
                <div class="cardHeading">{{$data.required[i].name}}</div>
                <Icon size="22" style="float: right; margin-top: -27px; margin-right: -3px; color: rgb(77,77,77);"
                      @click="removeItemAcknowledge(i)">
                  <dismiss12-regular />
                </Icon> 
          </template>

                
        
        <div style="margin-bottom: 12px;">          <b class="card-center">
            <div>
              <n-input-number style="width: 45%;" :default-value="$data.required[i].value" :show-button='false' :min="1"
                              :on-update:value="(_val_) => {tmp_data_val.val = _val_;tmp_data_val.name=$data.required[i].name;}">
                <template #prefix>
                  ₹
                </template>
              </n-input-number>
            </div>
          </b>

          <div class="card-right" @click="acknowledgeObj($data.required[i]);reload_cards += 1;getMontlyDetails();">
            <span style="padding-right: 5px;"> Acknowledge </span>

            <Icon size="25" style="position:absolute;color:rgb(77,77,77)">
              <checkmark-circle48-filled />
            </Icon>
          </div>
        </div>
  
      </n-card>
    </div>
    
    </n-scrollbar>
  </div>

  

  <div style="text-align: center;">
    <n-float-button type="primary"  visibility-height="0" :width="60" :height="60" 
                    :bottom="30" :right="25"
                    @click="$router.push('/addExpense')">
        <icon size="30">
          <add12-filled />
        </icon>    
    </n-float-button>
  </div>

  <!-- Exception Modal -->
  <n-modal v-model:show="expMdl" preset="dialog" title="Dialog">
      <template #header>
          <div class="modalHeading" >{{ expMdl_msg }}</div>
      </template>
            
  </n-modal>
 
</template>
  
<script setup>

  
    // -- deps
    import { Icon } from '@vicons/utils';
    import Navigation16Filled from '@vicons/fluent/Navigation16Filled';
    import CheckmarkCircle48Filled from '@vicons/fluent/CheckmarkCircle48Filled';
    import MoneyHand20Regular from '@vicons/fluent/MoneyHand20Regular';
    import Dismiss12Regular from '@vicons/fluent/Dismiss12Regular';
    import Add12Filled from '@vicons/fluent/Add12Filled';
    
    
    import { NFloatButton,NList,NListItem,NDrawerContent,NDrawer,NCard,NInputNumber,
             NScrollbar,NGi,NGrid,NStatistic,NCarousel,NSwitch,NModal } from 'naive-ui';
    import { ref,inject } from 'vue';

    import updatesInfo from './../components/updatesInfo.vue'

    // Update Scripts So They Can Be Exicuted Manually Too
    import * as v1_scripts from '../components/updatescripts/version_1_scripts.js'

    const $data = inject('$data')
        
    const active = ref(false) 
    const toshowMdl = ref(0)
    const reload_cards = ref(0)
    const reload_acknowledge_obj = ref(0)

    const expMdl = ref(false)
    const expMdl_msg = ref("")

    const devmode = ref($data.history.devmode)

    let MonthlySpend = [0,0,0,0] // base,req,need,wnt 
    let requiredDeviationVal = [0.00,0.00]
       
    const date = new Date();

    // -- For Testing Purposes --
    // date.setDate(date.getDate() + 16)
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
        $data.history.day.push({
        'date':todayDate,
        'spend':[0,0,0,0] // total,req,need,wnt 
        })
      }

  }

  function ifCurrentDatePresent(obj,index){
        console.log(obj)

        if(!obj.homelog)
        {
          return false
        }

        if($data.history.req_excp.includes(index))
        {
          return false
        }

        for(let i = 0; i<obj.excludes.length;i++)
        {
          if(parseInt(obj.excludes[i]) == date.getDay())
          {
            return false
          }
        } 

        if(obj.track[obj.track.length - 1].date == todayDate)
        {
          return false
        }

        return true
    }
  
    function acknowledgeObj(obj){

      let topush = {
        "date":todayDate,
        "value":0
      }
  
      if((obj.name == tmp_data_val.name) && (tmp_data_val.val != null))
      {
        topush.value = roundTwoDecimal(tmp_data_val.val)
      }
      else topush.value = roundTwoDecimal(obj.value)
      
      obj.totalspend += topush.value
      obj.totalspend = roundTwoDecimal(obj.totalspend)
      
      let itmdte = obj.track[obj.track.length - 1].date.split('-')

      for(let i = 0; i<((date.getFullYear() - parseInt(itmdte[2]))*12 + (date.getMonth() + 1) - parseInt(itmdte[1])) ; i++)
      {
        obj.enteriesPerMonth.splice(obj.enteriesPerMonth.length,0,0)
        obj.valuePerMonth.splice(obj.valuePerMonth.length,0,0)

      }

      obj.enteriesPerMonth[obj.enteriesPerMonth.length - 1] += 1
      obj.valuePerMonth[obj.valuePerMonth.length - 1] += topush.value
      obj.valuePerMonth[obj.valuePerMonth.length - 1] = roundTwoDecimal(obj.valuePerMonth[obj.valuePerMonth.length - 1])

      $data.history.day[$data.history.day.length - 1].spend[1] += topush.value
      $data.history.day[$data.history.day.length - 1].spend[1] = roundTwoDecimal($data.history.day[$data.history.day.length - 1].spend[1])
      $data.history.day[$data.history.day.length - 1].spend[0] += topush.value
      $data.history.day[$data.history.day.length - 1].spend[0] = roundTwoDecimal($data.history.day[$data.history.day.length - 1].spend[0])

      obj.track.push(topush)
      localStorage.setItem("_DATA_", JSON.stringify($data))

    }

    function getMontlyDetails()
    {
      for(let i = 0; i< MonthlySpend.length; i++)
      {
        MonthlySpend[i] = 0
      }

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

      MonthlySpend[0] = roundTwoDecimal(MonthlySpend[0])
      MonthlySpend[1] = roundTwoDecimal(MonthlySpend[1])
      MonthlySpend[2] = roundTwoDecimal(MonthlySpend[2])
      MonthlySpend[3] = roundTwoDecimal(MonthlySpend[3])

      getRequireDeviation()
    }

    function getRequireDeviation()
    {
      let defVal = 0
      let mthdev = 0
      let lp = 0
      
      for(;lp < $data.required.length;lp++)
      {
        defVal += parseFloat($data.required[lp].value)
        mthdev += ($data.required[lp].valuePerMonth[$data.required[lp].valuePerMonth.length-1]/
                    $data.required[lp].enteriesPerMonth[$data.required[lp].enteriesPerMonth.length-1])/$data.required[lp].value

      }
    
      requiredDeviationVal[0] = ($data.history.day[$data.history.day.length - 1].spend[1] / defVal).toFixed(3)

      requiredDeviationVal[1] = (mthdev / lp).toFixed(3)

    }

    function valueToTemplate(number)
    {
      let strtoreturn = "₹"
      
      
      if(number != 0)
      {      
        let numberString = number.toString()
        let decimalstring = ""
        
        let decimalIndex = numberString.indexOf('.')
        if(decimalIndex != -1)
        {
          decimalstring = numberString.slice(decimalIndex)
          numberString = numberString.slice(0, decimalIndex)
        }


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

        if(decimalIndex != -1)
        {
          return strtoreturn + decimalstring
        }
          return strtoreturn 
      }
      else
      {
        strtoreturn += "0"
        return strtoreturn
      }
    
    }

    function recalculate_Enteries_PerMonth_Data()
    {
      v1_scripts._0_4($data);
      expMdl_msg.value = "Done!"
      expMdl.value = true
    }

    function removeItemAcknowledge(index)
    {
      $data.history.req_excp.push(index);
      localStorage.setItem('_DATA_', JSON.stringify($data))

      reload_acknowledge_obj.value += 1
    }

    function updateDevmode()
    {
      devmode.value = !devmode.value
      $data.history.devmode = devmode.value
      localStorage.setItem('_DATA_', JSON.stringify($data))
                
      console.log('devmode changed!')
    }

    function getWithPredessorZero(dateString,info) {
      const dte = dateString.split('-');
      return parseInt(dte[info-1])
    }
    
    function clearCache()
    {
      expMdl_msg.value = "Cache Cleared"
      expMdl.value = true

      localStorage.clear();
      console.log("CacheCleared!!")
    }

    function roundTwoDecimal(num)
    {
      return Math.round(num * 100) / 100;
    }

    getMontlyDetails()

  </script>
  
  
  <style scoped>
    .card-center{
      text-align: center;
      width: 200px;
      
    }
  
    .card-right{
      font-size: 18px;
      text-align: right;
      margin-right: 20px; 
      margin-top: -30px;
      font-weight: bold;
    }

    .drawerHeader{
      font-family: 'roboto-medium';
      color:rgb(77,77,77);
    }

    .listItems{
      font-size: 15px;
      font-family: 'roboto-regular';
      color:rgb(77,77,77)
    }

    .optionsItems{
      font-family: 'roboto-medium';
      color:rgb(77,77,77);
      width: 100%;
      font-size: large;
      margin-left: 5px;
    }

    .listItemsHeading{
      font-family: 'roboto-medium';
      color:rgb(77,77,77)
    }

    .cardHeading{
      font-size: 20px;
      font-family: 'roboto-bold';
      color:rgb(77,77,77);
    }

    .statLabel{
      font-family: 'roboto-medium';
      font-size: 17.5px;
      margin-bottom: -7px;

    }

    #buttondiv{
      background-color: green;
      width: 100%;
      position: pos;
      margin-top: 77%;
      text-align: center;
    }

    #heading{
      text-align: center;
      font-family: 'roboto-medium';
      font-size: 26px;
    }

    #deviation{
      margin-top: -10px;
      color: grey;
    }
  </style>
  