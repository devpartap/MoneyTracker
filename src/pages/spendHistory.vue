<template>

<c_header title="Add Expense" />

    <n-scrollbar style="max-height: 46em;"  :trigger="hover" 
        :on-scroll="(x) => {
            if((x.target.scrollTop >= ( 300 + ((hiscallct - 1)* 860)) && (!isempty))){getDataHistory(15)}}">

        <div v-if="listData.length != 0" :key="rerenderList">
            <div v-for="i in listData" v-bind:key="i.id" id="itm_contain" @click="$router.push({name: 'itemDetails',params:{_name: i.name,_catagory:i.catagory + i.ref}})">

                <div id="itm_id">{{ i.id + 1}}</div>
                <div id="itm_name">{{ i.name }}</div>
                <div id="itm_cls">{{ i.class }}</div>
                <div id="itm_amt">₹ {{ i.value }}</div>
                <div id="itm_dte">{{ i.date.day }}-{{ getMonthNm[i.date.month] }}-{{  i.date.year }}</div> 
                <n-divider id="ndiv"/>

            </div>
        </div>
        <div v-else>
            <h2 style="text-align: center; color: gray;">NO SPENDING FOUND</h2>
        </div>
    </n-scrollbar>


</template>

<script setup>

import { NDivider,NScrollbar } from 'naive-ui';
import { ref,inject  } from 'vue';

import c_header from './../components/c_header.vue'

const $data = inject('$data')

let hiscallct = 0;
let pushed = 0;
let rerenderList = ref(0);
let isempty = false;

let listData = []
let listcount = [[],[],[]]

let date = new Date();

let nv_req = 0;
let nv_nd = 0;
let nv_wt = 0;

const getMonthNm = ['Jan','Feb','Mar','Aprl','May','June','July','Aug','Sept','Oct','Nov','Dec']


listcount[0][0] = $data.required.length
listcount[1][0] = $data.needs.length
listcount[2][0] = $data.wants.length


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

    
    // debugger;
    while(true)
    {
        if(exit == true) {break}
        if(nv_req != listcount[0][0]){

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
                                    "catagory":"Required"
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
        if(nv_nd != listcount[1][0]){

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
                        if($data.needs[listcount[1][0] - 1 -i].track[listcount[1][listcount[1][0] - i] - 1].bdate == `${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`)
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
                                    "catagory":"Needs>" + $data.needs[listcount[1][0] - 1 -i].name
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
        if(nv_wt != listcount[2][0]){

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
                        if($data.wants[listcount[2][0] - 1 -i].track[listcount[2][listcount[2][0] - i] - 1].bdate == `${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`)
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
                                    "catagory":"Wants>" + $data.wants[listcount[2][0] - 1 -i].name
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


        if((q_req) && (q_nd) && (q_wt)) {isempty = true; console.log('out of gas');break;}
        date.setDate(date.getDate() - 1); 
    }


    rerenderList.value = rerenderList.value + 1
    return listData
    
}

getDataHistory(15)
</script>

<style scoped>

#itm_contain{
    height: 75px;
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
