<template>

<c_header title="Spend History" />

<div >
    <n-flex justify="space-around">
    <n-button quaternary type="primary" round secondary :color="button_colr[catagory_actv[1]]" 
              @click="changeButtonColor(1)" size="small">
      Required
    </n-button>
    <n-button quaternary type="primary" round secondary :color="button_colr[catagory_actv[2]]" 
              @click="changeButtonColor(2)" size="small">
      Needs
    </n-button>
    <n-button quaternary type="primary" round secondary :color="button_colr[catagory_actv[3]]" 
              @click="changeButtonColor(3)" size="small">
      Wants
    </n-button>
    <n-button quaternary type="primary" round secondary :color="button_colr[catagory_actv[0]]" 
              @click="changeButtonColor(0)" size="small">
      Base
    </n-button>
    </n-flex> 
    
    
    
    <n-flex justify="end" align-items="center">
    <span style="color: gray;font-weight: bold; margin-top: 12px;">View: </span>
    <div style="width: 30%; margin-top: 10px; padding-bottom: 10px;">
    <n-select :value="view_opt" size="small" :on-update:value="updateView" 
              :options="[
        {
            label: 'Per Item',
            value: 1,
        },
        {
            label: 'Per Day',
            value: 2,
        },
        {
            label: 'Per Month',
            value: 3,
        },

]" />
    </div>

    <span style="color: gray;font-weight: bold; margin-top: 12px;">Group By: </span>
    <div style="width: 27%; margin-top: 10px; padding-bottom: 10px;">
    <n-select :value="groupby_opt" size="small" :on-update:value="updateGroupBy" 
              :options="[
        {
            label: 'Item',
            value: 1,
            disabled: (view_opt > 1) 
        },     
        {
            label: 'Day',
            value: 2,
            disabled: (view_opt > 2) 
        },
        {
            label: 'Month',
            value: 3,
            disabled: (view_opt > 3) 
        },
        {
            label: 'Year',
            value: 4,
            disabled: (view_opt > 4) 
        }

    ]" />
    </div>
    </n-flex>

    
</div>


    <n-scrollbar style="max-height: 46em;"  :trigger="hover" 
                 :on-scroll="(x) => {
                    if((x.target.scrollTop >= ( 300 + ((dataCalls[view_opt - 1] - 1)* 860)) && (!dataEmpty[view_opt - 1]))){
                        if(view_opt == 1)
                        {
                            getDataHistory(15)
                        }  
                        else if(view_opt == 2)
                        {
                            compilePerDay(15)
                        }
                        else if(view_opt == 3)
                        {
                            compilePerMonth(15)
                        }
                    }
                 }">

        <!-- Per Item -->
        <div v-if="(listData.length > 0) || (data_perday.length > 0) || (data_permonth.length > 0)" :key="rerenderList">
            <div v-if="view_opt == 1" v-for="i in listData" v-bind:key="i.id" 
                 
                 :class="{
                        itm_contain: renderLoopedId(i.num_cat),
                        itm_contain_emty : !Boolean(catagory_actv[i.num_cat])
                    }"

                 @click="$router.push({
                        name: 'itemDetails',
                        params:{_name: i.name,_catagory:i.catagory + i.ref}
                    })">
            
                <div id="itm_id">{{ looprendercount }}</div>
                <div id="itm_name">{{ i.name }}</div>
                <div id="itm_cls">{{ i.class }}</div>
                <div id="itm_amt">{{ valueToTemplate(i.value) }}</div>
                <div id="itm_dte">{{ i.date.day }}-{{ getMonthNm[i.date.month] }}-{{  i.date.year }}</div> 
                
                <n-divider v-if="toRenderLine_vop1(i.id)" id="ndiv"/>

            </div>
            
            <div v-if="(view_opt == 1) && (looprendercount == 0)">
                <h2 style="text-align: center; color: gray;">NO SPENDING FOUND</h2>
            </div>
            
            <!-- per Day -->
            <div v-else-if="view_opt == 2" v-for="i in data_perday" v-bind:key="i.day_id" class="itm_contain">
                
                <div id="itm_id">{{ i.day_id +1 }}</div>
                <div id="itm_name">{{ i.date[0] }} {{ getMonthNm[i.date[1] - 1] }}</div>
                <div id="itm_cls">{{ rendercls(i.catagory_spend) }}</div>
                <div id="itm_amt">{{ valueToTemplate(renderamt(i.catagory_spend)) }}</div>
                <div id="itm_dte">{{ i.date[0] }}-{{ getMonthNm[i.date[1] - 1] }}-{{  i.date[2] }}</div> 
            
                <n-divider v-if="toRenderLine_vop2(i.day_id)" id="ndiv"/>
        
            </div>

            <!-- per Month -->
            <div v-else-if="view_opt == 3" v-for="i in data_permonth" v-bind:key="i.month_id" class="itm_contain">
                
                <div id="itm_id">{{ i.month_id +1 }}</div>
                <div id="itm_name">{{getMonthNm[i.date[0] - 1] }} {{ i.date[1] }}</div>
                <div id="itm_cls">{{ rendercls(i.catagory_spend) }}</div>
                <div id="itm_amt">{{ valueToTemplate(renderamt(i.catagory_spend)) }}</div>
            
                <n-divider v-if="toRenderLine_vop3(i.month_id)" id="ndiv"/>
                
            </div>

            <span style="display: none;">{{ checkListSize() }}</span>

        </div>
        

        <div v-else>
            <h2 style="text-align: center; color: gray;">NO SPENDING FOUND</h2>
        </div>
    </n-scrollbar>
    

</template>

<script setup>

import { NDivider,NScrollbar,NButton ,NFlex, NSelect} from 'naive-ui';
import { ref,inject } from 'vue';

import c_header from './../components/c_header.vue'

const $globaldata = inject('$globaldata')
const $data = inject('$data')


let listcount_pushed = 0;
let listData = []
let listcount = [[],[],[]]

let data_perday = []
let data_permonth = []

let dataCalls = [0,0,0]
let dataEmpty = [0,0,0]

let looprendercount = 0
let prevrerendercount = 0
let compilePerDay_flsdates = 0

let toRenderLine_vop1_tmp = 0

let rerenderList = ref(0)


let groupby_opt = ref($globaldata.groupBy_opt)
let view_opt = ref($globaldata.view_opt)
let catagory_actv = ref($globaldata.catagory_actv)
let button_colr = ref(['#444444','#01700c'])

let date = new Date(Date.now());

let nv_req = 0;
let nv_nd = 0;
let nv_wt = 0;
let nv_bs = 0;

const getMonthNm = ['Jan','Feb','Mar','Aprl','May','June','July','Aug','Sept','Oct','Nov','Dec']


listcount[0][0] = $data.required.length
listcount[1][0] = $data.needs.length
listcount[2][0] = $data.wants.length

let baselength = $data.base.length


for(let i = 0;i<=listcount[0][0] - 1;i++)
{
    listcount[0].push($data.required[i].track.length)
}
for(let i = 0;i<=listcount[1][0] - 1;i++)
{
    listcount[1].push($data.needs[i].track.length)
}
for(let i = 0;i<=listcount[2][0] - 1;i++)
{
    listcount[2].push($data.wants[i].track.length)
}

  
function getDataHistory(retieveLimit){

    let exit = false

    let q_req = false
    let q_nd = false
    let q_wt = false
    let q_bs = false

    console.log("rendering")

    let firstrec = $data.history.day[0].date.split('-')
    let firstrec_parse = Date.parse(`${firstrec[2]}/${firstrec[1]}/${firstrec[0]}`)
    
    // debugger;
    while(true)
    {
        // if(date.getDate() == 15){debugger;}
        if(exit == true) {break}

        if((nv_wt != listcount[2][0]) && (q_wt == false)){

            for(let i=0;i<=listcount[2][0] - 1;i++)
            {
                
                while(true){     
                    if((listcount[2][listcount[2][0] - i] <= 0))
                    {
                        if(listcount[2][listcount[2][0] - i] == 0){
                            nv_wt = nv_wt + 1
                            listcount[2][listcount[2][0] - i] = -1
                        }
                        break
                    }
                    else
                    {   
                        console.log(`${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`)       
                        if($data.wants[listcount[2][0] - 1 -i].track[listcount[2][listcount[2][0] - i] - 1].date == `${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`)
                        {
                            listData.push(
                                {
                                    "id":listcount_pushed,
                                    "ref":listcount[2][0] - 1 -i,
                                    "name":$data.wants[listcount[2][0] - 1 -i].track[listcount[2][listcount[2][0] - i] - 1].name,
                                    "date":{
                                        "day":date.getDate(),
                                        "month":date.getMonth(),
                                        "year":date.getFullYear()
                                    },
                                    "value":$data.wants[listcount[2][0] - 1 -i].track[listcount[2][listcount[2][0] - i] - 1].value,
                                    "class":"Wants > " + $data.wants[listcount[2][0] - 1 -i].name,
                                    "catagory":"Wants>" + $data.wants[listcount[2][0] - 1 -i].name,
                                    "num_cat":3
                                }
                            )
                            
                            listcount_pushed = listcount_pushed  + 1
                            listcount[2][ listcount[2][0] - i] = listcount[2][ listcount[2][0] - i] - 1
                            
                            if(listcount_pushed >= (retieveLimit * (dataCalls[0] + 1))) 
                            {
                                exit = true;
                                dataCalls[0] = dataCalls[0] + 1;

                                break
                            }   // exit call


                        }
                        else {break}
                    }
                    if(exit) {break}
                }

            }

        } else {q_wt = true}


        if(exit == true) {break}

        if((nv_nd != listcount[1][0]) && (q_nd == false)){

            for(let i=0;i<=listcount[1][0] - 1;i++)
            {

                while(true){     
                    if((listcount[1][listcount[1][0] - i] <= 0))
                    {
                        if(listcount[1][listcount[1][0] - i] == 0){
                            nv_nd = nv_nd + 1
                            listcount[1][listcount[1][0] - i] = -1
                        }
                        break
                    }
                    else
                    {   
                        if($data.needs[listcount[1][0] - 1 -i].track[listcount[1][listcount[1][0] - i] - 1].date == `${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`)
                        {
                            listData.push(
                                {
                                    "id":listcount_pushed,
                                    "ref":listcount[1][0] - 1 -i,
                                    "name":$data.needs[listcount[1][0] - 1 -i].track[listcount[1][listcount[1][0] - i] - 1].name,
                                    "date":{
                                        "day":date.getDate(),
                                        "month":date.getMonth(),
                                        "year":date.getFullYear()
                                    },
                                    "value":$data.needs[listcount[1][0] - 1 -i].track[listcount[1][listcount[1][0] - i] - 1].value,
                                    "class":"Needs > " + $data.needs[listcount[1][0] - 1 -i].name,
                                    "catagory":"Needs>" + $data.needs[listcount[1][0] - 1 -i].name,
                                    "num_cat":2
                                }
                            )

                            listcount_pushed = listcount_pushed  + 1
                            listcount[1][ listcount[1][0] - i] = listcount[1][ listcount[1][0] - i] - 1

                            if(listcount_pushed >= (retieveLimit * (dataCalls[0] + 1))) 
                            {
                                exit = true;
                                dataCalls[0] = dataCalls[0] + 1;

                                break
                            } // exit call
                            
                        }
                        else {break}
                    }
                    if(exit) {break}

                }
                
            }
               
        } else {q_nd = true}


        if(exit == true) {break}

        if((nv_req != listcount[0][0]) && (q_req == false)){

            for(let i=0;i<=listcount[0][0] - 1;i++)
            {
                while(true){ 
                
                    if(listcount[0][listcount[0][0] - i] <= 0)
                    {
                        if(listcount[0][listcount[0][0] - i] == 0){
                            nv_req = nv_req + 1
                            listcount[0][listcount[0][0] - i] = -1
                        }
                    
                        break
                    }
                    else
                    {
                        console.log(`${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`)       
                        if($data.required[listcount[0][0] - 1 -i].track[listcount[0][listcount[0][0] - i] - 1].date == `${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`)
                        {
                            listData.push(
                                {
                                    "id":listcount_pushed,
                                    "ref":listcount[0][0] - 1 -i,
                                    "name":$data.required[listcount[0][0] - 1 -i].name,
                                    "date":{
                                        "day":date.getDate(),
                                        "month":date.getMonth(),
                                        "year":date.getFullYear()
                                    },
                                    "value":$data.required[listcount[0][0] - 1 -i].track[listcount[0][listcount[0][0] - i] - 1].value,
                                    "class":"Required",
                                    "catagory":"Required",
                                    "num_cat":1
                                }
                            )
                            
                            listcount_pushed = listcount_pushed  + 1
                            listcount[0][ listcount[0][0] - i] = listcount[0][ listcount[0][0] - i] - 1
                            
                            if(listcount_pushed >= (retieveLimit * (dataCalls[0] + 1)))
                            {
                                exit = true;
                                dataCalls[0] = dataCalls[0] + 1;

                                break
                            } // exit call

                        }
                        else {break}
                    }
                    if(exit) {break}

                }
            }

        } else {q_req = true}


        if(exit == true) {break}

        if((nv_bs != baselength) && (q_bs == false)){
            for(let i = baselength-1; i >= 0;i--)
            {
                console.log(`${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`)       
                if($data.base[i].init == `${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`)
                {
                    listData.push(
                        {
                            "id":listcount_pushed,
                            "ref":i,
                            "name":$data.base[i].name,
                            "date":{
                                "day":date.getDate(),
                                "month":date.getMonth(),
                                "year":date.getFullYear()
                            },
                            "value":$data.base[i].value,
                            "class":"Base",
                            "catagory":"Base",
                            "num_cat":0
                        }
                    )

                    listcount_pushed = listcount_pushed  + 1
                    nv_bs = nv_bs + 1
 
                    if(listcount_pushed >= (retieveLimit * (dataCalls[0] + 1))) 
                    {
                        exit = true;
                        dataCalls[0] = dataCalls[0] + 1;

                        break;
                    }  
                }
            }
            
        } else {q_bs = true}

        
        if(date.valueOf() <  firstrec_parse)
        {
            dataEmpty[0] = true;
            console.log("explict break!")
            break;
        }
        
        if((q_req) && (q_nd) && (q_wt) && (q_bs)) {dataEmpty[0] = true; console.log('out of gas');break;}
        date.setDate(date.getDate() - 1); 
    }

    rerenderList.value = rerenderList.value + 1
    
}

function compilePerDay(retieveLimit)
{

    for(let i = (dataCalls[1]*retieveLimit) + compilePerDay_flsdates; data_perday.length < ((dataCalls[1] + 1)*retieveLimit); i++)
    {
        if(i > $data.history.day.length - 1)
        {
            dataEmpty[1] = true
            console.log("out of gas!!")
            break;
        }

        if(($data.history.day[$data.history.day.length - i - 1].spend[0] == 0) && 
           ($data.history.day[$data.history.day.length - i - 1].spend[4] == 0))
        {
            compilePerDay_flsdates += 1
           continue
        }

        data_perday.push({
            "day_id":data_perday.length,
            "date":$data.history.day[$data.history.day.length - i - 1].date.split('-'),
            "catagory_spend":$data.history.day[$data.history.day.length - i - 1].spend.slice(1)
        })
    }

    dataCalls[1] += 1
    rerenderList.value = rerenderList.value + 1
}

function compilePerMonth(retieveLimit)
{
    let prev 
    let curr
    let k = 0
    
    for(let i = (dataCalls[2]*retieveLimit); data_permonth.length < ((dataCalls[2] + 1)*retieveLimit); i++)
    {
        // debugger;
        let spnd = [0,0,0,0]

        if(i+k > $data.history.day.length - 1)
        {
            dataEmpty[2] = true
            console.log("out of gas!!")
            
            prev = $data.history.day[$data.history.day.length - i - k].date.split('-')
            curr = $data.history.day[$data.history.day.length + 1 - i - k].date.split('-')
            if((curr[1] != prev[1]) || (curr[2] != curr[2]))
            {
                data_permonth.push({
                    "month_id":data_permonth.length,
                    "date":prev.slice(1),
                    "catagory_spend":$data.history.day[$data.history.day.length - i - k].spend.slice(1)
                })
            }

            break;
        }
        
        
        while(true)
        {

            spnd.forEach((ele,index) =>{
                spnd[index] += $data.history.day[$data.history.day.length - 1 - i - k].spend[index + 1]
            })

            if(i+k > $data.history.day.length - 2) {
                break
            }

            prev = $data.history.day[$data.history.day.length - 1 - i - k].date.split('-')
            curr = $data.history.day[$data.history.day.length - 2 - i - k].date.split('-')
            
            k += 1
            if((curr[1] != prev[1]) || (curr[2] != curr[2]))
            {
                break;
            }
        }

        data_permonth.push({
            "month_id":data_permonth.length,
            "date":$data.history.day[$data.history.day.length - i - k ].date.split('-').slice(1),
            "catagory_spend":spnd
        })
        
    }

    dataCalls[2] += 1
    rerenderList.value = rerenderList.value + 1
}


function valueToTemplate(number)
    {
      let strtoreturn = "₹ "
      
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

function changeButtonColor(id)
{

    if(catagory_actv.value[id] == 1)
    {
        let onecount = 0
        catagory_actv.value.forEach(element => {
        if(element == 1)
        {
            onecount += 1
        }
        });

        if(onecount <=1 )
        {
            return false
        }

        catagory_actv.value[id] = 0
    }
    else 
    {
        catagory_actv.value[id] = 1
    }
    rerenderList.value = rerenderList.value + 1
    
    syncGlobalVeriables()
}

function updateGroupBy(val)
{
    groupby_opt.value = val
    rerenderList.value = rerenderList.value + 1

    syncGlobalVeriables()
}

function updateView(val)
{
    view_opt.value = val

    if((val == 1) && (listData.length == 0))
    {
        getDataHistory(15)
    }
    if((val == 2) && (data_perday.length == 0))
    {
        if(groupby_opt.value < 2) {
            groupby_opt.value = 2
        }
        compilePerDay(15)

    }
    if((val == 3) && (data_permonth.length == 0))
    {
        if(groupby_opt.value < 3) {
            groupby_opt.value = 3
        }
        compilePerMonth(15)
    }

    rerenderList.value = rerenderList.value + 1

    syncGlobalVeriables()
}



function rendercls(spend)
{
    let rtnString = "[ "

    if(catagory_actv.value[0] == 1)
    {
        rtnString += `Base: ${spend[3]} | `
    }
    if(catagory_actv.value[1] == 1)
    {
        rtnString += `Required: ${spend[0]} | `
    }
    if(catagory_actv.value[2] == 1)
    {
        rtnString += `Needs: ${spend[1]} | `
    }
    if(catagory_actv.value[3] == 1)
    {
        rtnString += `Wants: ${spend[2]} | `
    }

    rtnString = rtnString.slice(0,rtnString.length - 2)
    rtnString += "]"

    return rtnString
}

function renderamt(spend)
{
    let rtntotal = 0

    if(catagory_actv.value[0] == 1)
    {
        rtntotal += spend[3]
    }
    if(catagory_actv.value[1] == 1)
    {
        rtntotal += spend[0]
    }
    if(catagory_actv.value[2] == 1)
    {
        rtntotal += spend[1]
    }
    if(catagory_actv.value[3] == 1)
    {
        rtntotal += spend[2]
    }

    return rtntotal
}

function renderLoopedId(id)
{
    if(rerenderList.value != prevrerendercount)
    {
        prevrerendercount = rerenderList.value
        looprendercount = 0
    }

    if(Boolean(catagory_actv.value[id]))
    {
        looprendercount += 1
    }

    return Boolean(catagory_actv.value[id])
}

function syncGlobalVeriables()
{
    $globaldata.groupBy_opt = groupby_opt.value
    $globaldata.catagory_actv = catagory_actv.value
    $globaldata.view_opt = view_opt.value
}

function toRenderLine_vop1(loopct)
{
    if(loopct == listData.length - 1) {
        return false
    }

    if(groupby_opt.value == 1) {
        return true
    }

    let prev = loopct

    if(!Boolean(catagory_actv.value[listData[prev].num_cat]))
    {
        return false
    }


    let curr = prev + 1

    while(!Boolean(catagory_actv.value[listData[curr].num_cat]))
    {
        curr += 1
        if(curr == listData.length) {
            return false
        }
    }


    if(groupby_opt.value == 2)
    {
        if(listData[prev].date.day != listData[curr].date.day)
        {
            return true
        }
        else if(listData[prev].date.month != listData[curr].date.month)
        {
            return true
        }
        else if(listData[prev].date.year != listData[curr].date.year)
        {
            return true
        }
        else
        {
            return false
        }
    }

    else if(groupby_opt.value == 3)
    {
        if(listData[prev].date.month != listData[curr].date.month)
        {
            return true
        }
        else if(listData[prev].date.year != listData[curr].date.year)
        {
            return true
        }
        else
        {
            return false
        }
    }

    else if(groupby_opt.value == 4)
    {
        if(listData[prev].date.year != listData[curr].date.year)
        {
            return true
        }
        return false
        
    }
}

function toRenderLine_vop2(id)
{
    if(id == data_perday.length - 1) {
        return false
    }

    if(groupby_opt.value == 2) {
        return true
    }

    else if(groupby_opt.value == 3)
    {       
        if(data_perday[id].date[1] != data_perday[id+1].date[1])
        {
            return true
        }
        else if(data_perday[id].date[2] != data_perday[id+1].date[2])
        {
            return true
        }
        else
        {
            return false
        }
    }

    else if(groupby_opt.value == 4)
    {
        
        if(data_perday[id].date[2] != data_perday[id+1].date[2])
        {
            return true
        }
        return false
    }
}

function toRenderLine_vop3(id)
{
    if(id == data_permonth.length - 1) {
        return false
    }

    if(groupby_opt.value == 3) {
        return true
    }

    else if(groupby_opt.value == 4)
    {
        if(data_permonth[id].date[1] != data_permonth[id+1].date[1])
        {
            return true
        }
        return false
    }
}

function checkListSize()
{
    
    if(looprendercount < (14*dataCalls[0]))
    {
        if(dataEmpty[0] != true)
        {
            console.log("inhere sirr")
            getDataHistory(15)
            dataCalls[0] -= 1
        }
    }
}

if(view_opt.value == 1)
{
    getDataHistory(15)
}
else if(view_opt.value == 2)
{
    compilePerDay(15)
}
else if(view_opt.value == 3)
{
    compilePerMonth(15)
}
</script>

<style scoped>

.itm_contain{
    height: 75px;
}

.itm_contain_emty{
    display:none;
}

#itm_name{
    font-size: 20px;
    font-weight: bold;
    margin-left: 12px;
}

#itm_cls{
    font-size: 11px;
    font-weight: bold;
    margin-left: 12px;
    color: grey;
    
}

#itm_id{
    font-size: 7px;
    font-weight: bold;
    margin-right: 12px;
    color: grey;
    text-align: right;
    margin-top:-3px;
}

#itm_amt{
    text-align: right;
    font-size: 22px;
    font-weight: bold;
    margin-top: -50px;
    margin-bottom: 20px;
    margin-right: 12px;
}

#ndiv{
    margin-top: 7px;

}

#itm_dte {
    text-align: right;
    font-size: 11px;
    font-weight: bold;
    margin-right: 12px;
    color: grey;
    margin-top: -25px;
}


</style>
