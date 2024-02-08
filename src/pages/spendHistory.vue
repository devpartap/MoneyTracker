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
    <div style="width: 27%; margin-top: 10px; padding-bottom: 10px;">
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
            label: 'Day',
            value: 1,
        },
        {
            label: 'Week',
            value: 2,
        },
        {
            label: 'Month',
            value: 3,
        },
        {
            label: 'Year',
            value: 4,
        }

    ]" />
    </div>
    </n-flex>

    
</div>


    <n-scrollbar style="max-height: 46em;"  :trigger="hover" 
                 :on-scroll="(x) => {
                    if((x.target.scrollTop >= ( 300 + ((hiscallct - 1)* 860)) && (!isempty))){getDataHistory(15)}
                 }">

        <!-- Per Item -->
        <div v-if="listData.length != 0" :key="rerenderList">
            <div v-if="view_opt == 1" v-for="i in listData" v-bind:key="i.id" 
                 
                 :class="{
                        itm_contain: Boolean(catagory_actv[i.num_cat]),
                        itm_contain_emty : !Boolean(catagory_actv[i.num_cat])
                    }"

                 @click="$router.push({
                        name: 'itemDetails',
                        params:{_name: i.name,_catagory:i.catagory + i.ref}
                    })">
            
                <div id="itm_id">{{ i.id + 1}}</div>
                <div id="itm_name">{{ i.name }}</div>
                <div id="itm_cls">{{ i.class }}</div>
                <div id="itm_amt">₹ {{ i.value }}</div>
                <div id="itm_dte">{{ i.date.day }}-{{ getMonthNm[i.date.month] }}-{{  i.date.year }}</div> 
                
                <n-divider v-if="renderdivcount[i.id] == true" id="ndiv"/>

            </div>

            <div v-else-if="view_opt == 2" v-for="i in listData_PerDay" v-bind:key="i.day_id" id="itm_contain">
                
                <div id="itm_id">{{ i.day_id + 1}}</div>
                <div id="itm_name">{{ i.date.day }} {{ getMonthNm[i.date.month] }}</div>
                <div id="itm_cls">{{ rendercls(i.catagory_spend) }}</div>
                <div id="itm_amt">{{ renderamt(i.catagory_spend) }}</div>
                <div id="itm_dte">{{ i.date.day }}-{{ getMonthNm[i.date.month] }}-{{  i.date.year }}</div> 
            
                <n-divider v-if="i.day_id != listData_PerDay.length - 1" id="ndiv"/>
            
            </div>

        </div>
        <!-- per Day -->

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

let hiscallct = 0;
let pushed = 0;
let rerenderList = ref(0);
let isempty = false;


let listData = []
let listData_PerDay = []
let listcount = [[],[],[]]
let renderdivcount = []

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
    
    // debugger;
    while(true)
    {
        
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
                                    "id":pushed,
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
                            
                            pushed = pushed  + 1
                            listcount[2][ listcount[2][0] - i] = listcount[2][ listcount[2][0] - i] - 1
                            
                            if(pushed >= (retieveLimit * (hiscallct + 1))) 
                            {
                                exit = true;
                                hiscallct = hiscallct + 1;

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
                                    "id":pushed,
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

                            pushed = pushed  + 1
                            listcount[1][ listcount[1][0] - i] = listcount[1][ listcount[1][0] - i] - 1

                            if(pushed >= (retieveLimit * (hiscallct + 1))) 
                            {
                                exit = true;
                                hiscallct = hiscallct + 1;

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
                                    "id":pushed,
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
                            
                            pushed = pushed  + 1
                            listcount[0][ listcount[0][0] - i] = listcount[0][ listcount[0][0] - i] - 1
                            
                            if(pushed >= (retieveLimit * (hiscallct + 1)))
                            {
                                exit = true;
                                hiscallct = hiscallct + 1;

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
                            "id":pushed,
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

                    pushed = pushed  + 1
                    nv_bs = nv_bs + 1
 
                    if(pushed >= (retieveLimit * (hiscallct + 1))) 
                    {
                        exit = true;
                        hiscallct = hiscallct + 1;

                        break;
                    }  
                }
            }
            
        } else {q_bs = true}

        
        if((q_req) && (q_nd) && (q_wt) && (q_bs)) {isempty = true; console.log('out of gas');break;}
        date.setDate(date.getDate() - 1); 
    }

    toRenderDivide()
    rerenderList.value = rerenderList.value + 1
    return listData
    
}

function compilePerDay()
{
    if(listData.length == 0)  {
        return 0
    }

    let prev_itm = listData[0]
    let curr_itm
     

    for(let i = 1;i<listData.length;i++)
    {
        curr_itm = listData[i]

        let k = 0
        let tmp_data = {
            "day_id":listData_PerDay.length,
            "date":prev_itm.date,
            "catagory_spend":[0,0,0,0]
        }
        
        tmp_data.catagory_spend[prev_itm.num_cat] += prev_itm.value
        
        while(prev_itm.date.day == curr_itm.date.day)
        {
            tmp_data.catagory_spend[curr_itm.num_cat] += curr_itm.value
            
            k = k+1
            if(i+k >= listData.length - 1){
                // debugger;
                if(!isempty){
                    getDataHistory(15)
                } 
                else{
                    break;
                }
            }    
            
            curr_itm = listData[i+k]
        }

        prev_itm = curr_itm

        listData_PerDay.push(tmp_data)

        i = i + k
        if(i >= listData.length - 1){
            // debugger;
            if(!isempty){
                getDataHistory(15)
            } 
        }
        

        if(i == listData.length-1)
        {
            let lstTmp = {
                "day_id":listData_PerDay.length,
                "date":prev_itm.date,
                "catagory_spend":[0,0,0,0]
            }
            lstTmp.catagory_spend[prev_itm.num_cat] += prev_itm.value
            listData_PerDay.push(lstTmp)
        }

    }

}

function toRenderDivide(id)
{

    renderdivcount = []
    if(groupby_opt.value == 1)
    {
        for(let i = 0;i<listData.length;i++)
        {
            renderdivcount.push(true)
        }
    }

    else if(groupby_opt.value == 2)
    {
        let prevval = Date.parse(`${listData[0].date.year}-${listData[0].date.month + 1}-
                                  ${listData[0].date.day}`)
        let nxtval

        for(let i = 1; i<listData.length;i++)
        {
            nxtval = Date.parse(`${listData[i].date.year}-${listData[i].date.month + 1}-
                                 ${listData[i].date.day}`)
            if( Math.ceil(Math.floor((nxtval - prevval) / (24 * 60 * 60 * 1000)) / 7) != 0)
            {
                prevval = nxtval
                renderdivcount.push(true)
            }
            else
            {
                renderdivcount.push(false)
            }

        }

    }

    else if(groupby_opt.value == 3)
    {

        let prevval = listData[0].date
        let nxtval

        for(let i = 1; i<listData.length;i++)
        {
            nxtval = listData[i].date
            if(((nxtval.year - prevval.year) * 12) + (nxtval.month - prevval.month) != 0)
            {
                prevval = nxtval
                renderdivcount.push(true)
            }
            else
            {
                renderdivcount.push(false)
            }

        }
    }

    else if(groupby_opt.value == 4)
    {

        let prevval = listData[0].date
        let nxtval

        for(let i = 1; i<listData.length;i++)
        {
            nxtval = listData[i].date
            if((nxtval.year - prevval.year) != 0)
            {
                prevval = nxtval
                renderdivcount.push(true)
            }
            else
            {
                renderdivcount.push(false)
            }

        }
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
    // resetlistveriable()
    // getDataHistory(15)
}

function updateGroupBy(val)
{
    return false
    groupby_opt.value = val
    rerenderList.value = rerenderList.value + 1

    syncGlobalVeriables()
    toRenderDivide()
}

function updateView(val)
{
    view_opt.value = val

    if(val == 2)
    {
        if(listData_PerDay.length != 0){
            return false
        }
        compilePerDay()
    }

    rerenderList.value = rerenderList.value + 1

    syncGlobalVeriables()
}

function rendercls(spend)
{
    console.log(catagory_actv.value)
    let rtnString = "[ "

    if(catagory_actv.value[0] == 1)
    {
        rtnString += `Base: ${spend[0]} | `
    }
    if(catagory_actv.value[1] == 1)
    {
        rtnString += `Required: ${spend[1]} | `
    }
    if(catagory_actv.value[2] == 1)
    {
        rtnString += `Needs: ${spend[2]} | `
    }
    if(catagory_actv.value[3] == 1)
    {
        rtnString += `Wants: ${spend[3]} | `
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
        rtntotal += spend[0]
    }
    if(catagory_actv.value[1] == 1)
    {
        rtntotal += spend[1]
    }
    if(catagory_actv.value[2] == 1)
    {
        rtntotal += spend[2]
    }
    if(catagory_actv.value[3] == 1)
    {
        rtntotal += spend[3]
    }

    return rtntotal
}

function resetlistveriable()
{
    return false
    listData = []

    hiscallct = 0;
    pushed = 0;

    nv_req = 0;
    nv_nd = 0;
    nv_wt = 0;
    nv_bs = 0;

    isempty = false;

    listcount[0][0] = $data.required.length
    listcount[1][0] = $data.needs.length
    listcount[2][0] = $data.wants.length

    baselength = $data.base.length



    for(let i = 0;i<=listcount[0][0] - 1;i++)
    {   
        listcount[0][i+1] = $data.required[i].track.length
    }
    for(let i = 0;i<=listcount[1][0] - 1;i++)
    {
        listcount[1][i+1] = $data.needs[i].track.length
    }
    for(let i = 0;i<=listcount[2][0] - 1;i++)
    {
        listcount[2][i+1] = $data.wants[i].track.length
    }

    date = new Date(Date.now());
}

function syncGlobalVeriables()
{
    $globaldata.groupBy_opt = groupby_opt.value
    $globaldata.catagory_actv = catagory_actv.value
    $globaldata.view_opt = view_opt.value
}

function expandListData() {

    if(isempty){
        return false
    }

    getDataHistory(15)
    return true
}

getDataHistory(15)
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
