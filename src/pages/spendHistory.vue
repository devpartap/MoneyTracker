<template>

<c_header title="Spend History" />

<div >
    <n-flex justify="space-around" style="font-family: 'roboto-medium';">
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
    <span class="dropdownTitle">View: </span>
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
        {
            label: 'Per Template',
            value: 4,
        },

]" />
    </div>

    <span class="dropdownTitle">Group By: </span>
    <div style="width: 27%; margin-top: 10px; padding-bottom: 10px;">
    <n-select :value="groupby_opt" size="small" :on-update:value="updateGroupBy" 
              :options="[
        {
            label: 'Item',
            value: 1,
            disabled: (view_opt > 1) && (view_opt != 4)
        },     
        {
            label: 'Day',
            value: 2,
            disabled: (view_opt > 2) || (view_opt == 4)
        },
        {
            label: 'Month',
            value: 3,
            disabled: (view_opt > 3) || (view_opt == 4)
        },
        {
            label: 'Year',
            value: 4,
            disabled: (view_opt > 4) || (view_opt == 4)
        }

    ]" />
    </div>
    </n-flex>

    
</div>

    <!-- <div v-if="if_loaded" style="text-align: center;width: 100%;">
        <n-spin size="medium" />
    </div> -->

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
        <div :key="rerenderList">
            <div v-if="(view_opt == 1) && (listData.length > 0)" v-for="i in listData" v-bind:key="i.id" 
                 
                 :class="{
                        itm_contain: renderLoopedId(i.num_cat),
                        itm_contain_emty : !Boolean(catagory_actv[i.num_cat])
                    }"

                 @click="$router.push({
                        name: 'itemDetails',
                        params:{_name: i.name,_catagory:i.catagory + '\0' +i.ref}
                    })">
            
                <div id="itm_id">{{ looprendercount }}</div>
                <div id="itm_name">{{ check_overflow(i.name,25) }}</div>
                <div id="itm_cls">{{ check_overflow(i.class,45) }}</div>
                <div id="itm_amt">{{ valueToTemplate(i.value) }}</div>
                <div id="itm_dte">{{ i.date.day }}-{{ getMonthNm[i.date.month] }}-{{  i.date.year }} ({{ getWeekDay(i.date.year,i.date.month,i.date.day) }})</div> 
                
                <n-divider v-if="toRenderLine_vop1(i.id)" id="ndiv"/>

            </div>
            
            
            <!-- per Day -->
            <div v-else-if="(view_opt == 2) && (data_perday.length > 0)" v-for="i in data_perday" v-bind:key="i.day_id" class="itm_contain">
                
                <div id="itm_id">{{ i.day_id +1 }}</div>
                <div id="itm_name">{{ i.date[0] }} {{ getMonthNm[i.date[1] - 1] }}</div>
                <div id="itm_cls">{{ rendercls(i.catagory_spend) }}</div>
                <div id="itm_amt">{{ valueToTemplate(renderamt(i.catagory_spend)) }}</div>
                <div id="itm_dte">{{ i.date[0] }}-{{ getMonthNm[i.date[1] - 1] }}-{{  i.date[2] }} ({{ getWeekDay(i.date[2],i.date[1] - 1,i.date[0]) }})</div> 
            
                <n-divider v-if="toRenderLine_vop2(i.day_id)" id="ndiv"/>
        
            </div>

            <!-- per Month -->
            <div v-else-if="(view_opt == 3) && (data_permonth.length > 0)" v-for="i in data_permonth" v-bind:key="i.month_id" class="itm_contain">
                
                <div id="itm_id">{{ i.month_id +1 }}</div>
                <div id="itm_name">{{getMonthNm[i.date[0] - 1] }} {{ i.date[1] }}</div>
                <div id="itm_cls">{{ rendercls(i.catagory_spend) }}</div>
                <div id="itm_amt">{{ valueToTemplate(renderamt(i.catagory_spend)) }}</div>
            
                <n-divider v-if="toRenderLine_vop3(i.month_id)" id="ndiv"/>
                
            </div>

            <!-- per Template -->
            <div v-else-if="(view_opt == 4) && (empty_category == false)">
                
                <!-- Template Loop -->
                <div v-if="!viewCategory" v-for="i in Object.keys($data).slice(0,4)" v-bind:key="i" class="itm_contain" 
                    @click="compilePerTemplate(i)">

                    <div id="itm_name" >{{i.toUpperCase()}}</div>
                    <div id="itm_cls">Sub Categories: {{ $data[i].length }} </div>

                    <n-divider v-show="i != 'wants'" id="ndiv" />
                </div>

                <!-- Categories Loop -->
                

                <div v-else v-for="j in Object.keys($data[activeTemplate]).slice(0,$data[activeTemplate].length).sort((a,b) => {
                        if(activeTemplate != 'base')
                        {
                            return $data[activeTemplate][b].track.length - $data[activeTemplate][a].track.length
                        }
                        else
                        {
                            return $data[activeTemplate][b].spantill[0] - $data[activeTemplate][a].spantill[0];
                        }
                        
                    })" 

                    @click="$router.push({
                        name: 'itemDetails',
                        params:{_name: $data[activeTemplate][j].name,_catagory:(activeTemplate[0].toUpperCase() + activeTemplate.slice(1) + '\0' + j)}
                    })"
                    v-bind:key="j" class="itm_contain" >


                    <div id="itm_id">Total</div>
                    <div id="itm_name" >{{ check_overflow($data[activeTemplate][j].name,25)}}</div>
                    
                    <div v-if="activeTemplate != 'base'" id="itm_cls">Enteries: {{ $data[activeTemplate][j].track.length }}</div>
                    <div v-else id="itm_cls">Base</div>
                    
                    <div v-if="activeTemplate != 'base'" id="itm_amt">{{ valueToTemplate(roundTwoDecimal($data[activeTemplate][j].totalspend))}}</div>
                    <div v-else id="itm_amt">{{valueToTemplate(roundTwoDecimal($data[activeTemplate][j].value))}}</div>
                    
                    <div id="itm_dte">Initialized On: {{$data[activeTemplate][j].init}}</div> 

                    <n-divider id="ndiv"/>
                </div>


            </div>

            <div v-else>
                <h2 style="text-align: center; color: gray;">NO SPENDING FOUND</h2>
                {{ console.log(view_opt) }}
            </div>

            <span style="display: none;">{{ checkListSize() }}</span>

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

let viewCategory = ref(false)
let activeTemplate = ref("")
let empty_category = ref(false)

let dataCalls = [0,0,0]
let dataEmpty = [0,0,0]

let looprendercount = 0
let prevrerendercount = 0
let compilePerDay_flsdates = 0

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

let itteration = 15;

const getMonthNm = ['Jan','Feb','Mar','Aprl','May','June','July','Aug','Sept','Oct','Nov','Dec']
const getWeekNm = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']


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
    let ifcut = false;

    let i = (dataCalls[2]*retieveLimit)
    
    for(let t = 0; data_permonth.length < ((dataCalls[2] + 1)*retieveLimit);t++)
    {
        //  debugger;z
        let spnd = [0,0,0,0]

        if(i+k >= $data.history.day.length - 1)
        {
            // debugger;
            
            if(!ifcut)
            {
                data_permonth.push({
                    "month_id":data_permonth.length,
                    "date":$data.history.day[0].date.split('-').slice(1),
                    "catagory_spend":$data.history.day[0].spend.slice(1)
                })
            }

            dataEmpty[2] = true
            console.log("out of gas!!")

            break;
        }
        
        
        while(true)
        {

            spnd.forEach((ele,index) =>{
                spnd[index] += $data.history.day[$data.history.day.length - 1 - i - k].spend[index + 1]
            })

            if(i+k > $data.history.day.length - 2) {
                ifcut = true
                break
            }

            prev = $data.history.day[$data.history.day.length - 1 - i - k].date.split('-')
            curr = $data.history.day[$data.history.day.length - 2 - i - k].date.split('-')
            
            k += 1
            if((curr[1] != prev[1]) || (curr[2] != curr[2]))
            {
                ifcut = false
                break;
            }
        }
        
        spnd[0] = roundTwoDecimal(spnd[0])
        spnd[1] = roundTwoDecimal(spnd[1])
        spnd[2] = roundTwoDecimal(spnd[2])
        spnd[3] = roundTwoDecimal(spnd[3])

        data_permonth.push({
            "month_id":data_permonth.length,
            "date":$data.history.day[$data.history.day.length - i - k ].date.split('-').slice(1),
            "catagory_spend":spnd
        })
        
    }

    dataCalls[2] += 1
    rerenderList.value = rerenderList.value + 1
}


function compilePerTemplate(category)
{
    activeTemplate.value=category;
    if($data[category].length == 0){
        empty_category.value = true;
    }
    else{
        empty_category.value = false;
    }
    viewCategory.value = true;

}


function valueToTemplate(number)
    {
        let strtoreturn = "₹"
      
      
      if(number)
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
    syncGlobalVeriables()

    rerenderList.value = rerenderList.value + 1

}

function updateView(val)
{
    view_opt.value = val
    // debugger;
    if((val == 1) && (listData.length == 0))
    {
        getDataHistory(15)
    }
    else if((val == 2) && (data_perday.length == 0))
    {
        if(groupby_opt.value < 2) {
            groupby_opt.value = 2
        }
        compilePerDay(15)

    }
    else if((val == 3) && (data_permonth.length == 0))
    {
        if(groupby_opt.value < 3) {
            groupby_opt.value = 3
        }
        compilePerMonth(15)
    }
    else if(val == 4)
    {
        groupby_opt.value = 1

    }

    syncGlobalVeriables()

    rerenderList.value = rerenderList.value + 1

}


function rendercls(spend)
{
    let rtnString = "[ "

    if(catagory_actv.value[0] == 1)
    {
        rtnString += "B: " + valueToTemplate(spend[3]) + " | "
        // rtnString += "Base: " + valueToTemplate(spend[3]) + " | "
    }
    if(catagory_actv.value[1] == 1)
    {
        rtnString += "R: " + valueToTemplate(spend[0]) + " | "
        // rtnString += "Required: " + valueToTemplate(spend[0]) + " | "
    }
    if(catagory_actv.value[2] == 1)
    {
        rtnString += "N: " + valueToTemplate(spend[1]) + " | "
        // rtnString += "Needs: " + valueToTemplate(spend[1]) + " | "
    }
    if(catagory_actv.value[3] == 1)
    {
        rtnString += "W: " + valueToTemplate(spend[2]) + " | "
        // rtnString += "Wants: " + valueToTemplate(spend[2]) + " | "
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

    return roundTwoDecimal(rtntotal)
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

function check_overflow(msg,overflow_limit)
{
    if(msg.length >= overflow_limit)
    {
        return (msg.slice(0,overflow_limit - 3) + "...")
    }

    return msg
}


function checkListSize()
{
    if(looprendercount < (14*dataCalls[0]))
    {
        if(dataEmpty[0] != true)
        {
            console.log("RecallingMore")
            getDataHistory(itteration)
            itteration += 15
            dataCalls[0] -= 1
        }
    }
}

function roundTwoDecimal(num)
{
    return Math.round(num * 100) / 100;
}

function getWeekDay(year,month,day)
{
    let smdate = new Date(year,month,day)
    return getWeekNm[smdate.getDay()]
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

.dropdownTitle{
    color: rgb(77, 77, 77);
    font-family: 'roboto-medium';
    margin-top: 12px;
    font-size: 15px;
}

#itm_name{
    font-size: 20px;
    margin-left: 7px;
    color: rgb(63,63,63);
    font-family: 'roboto-bold';
}

#itm_cls{
    font-size: 11px;
    font-family: 'roboto-bold';
    margin-left: 7px;
    color: rgb(114, 114, 114);
    
}

#itm_id{
    font-size: 8px;
    font-weight: bold;
    margin-right: 5px;
    color: rgb(63,63,63);
    text-align: right;
    margin-top:-3px;
}

#itm_amt{
    text-align: right;
    font-size: 22px;
    font-family: 'roboto-bold';
    margin-top: -50px;
    margin-bottom: 20px;
    margin-right: 5px;
}

#ndiv{
    margin-top: 7px;

}

#itm_dte {
    text-align: right;
    font-size: 11px;
    font-family: 'roboto-bold';
    margin-right: 5px;
    color: grey;
    margin-top: -25px;
}

</style>
