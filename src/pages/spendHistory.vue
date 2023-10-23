<template>

    <div>
        <Icon size="35" @click="$router.go(-1)" style="margin-top: 10px; text-align: left;">
            <arrow-circle-left16-Regular />
        </Icon>

        <h1 style="text-align: center;margin-top: -47px;">
            Spending History
            <hr>
        </h1>
    </div>

    <n-scrollbar trigger="hover">
        Oops
        <n-divider />
        Oops
    </n-scrollbar>

</template>

<script setup>

import { Icon } from '@vicons/utils';
import ArrowCircleLeft16Regular from '@vicons/fluent/ArrowCircleLeft16Regular';
import { NDivider} from 'naive-ui';
import { ref,inject  } from 'vue';

const $data = inject('$data')
let listData = []
let listcount = [[],[],[]]


listcount[0][0] = Object.keys($data.required).length
listcount[1][0] = Object.keys($data.needs).length
listcount[2][0] = Object.keys($data.wants).length


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
    

function getDataHistory(){

    let pushed = 0;
    let exit = false

    let nv_req = 0;
    let nv_nd = 0;
    let nv_wt = 0;

    let q_req = false
    let q_nd = false
    let q_wt = false

    let date = new Date();
    
    const retieveLimit = 15

    debugger;
    while(true)
    {
        if(exit == true) {break}
        if(nv_req != listcount[0][0]){

            for(let i=0;i<=listcount[0][0] - 1;i++)
            {
                while(true){ 

                    if((listcount[0][listcount[0][0] - i] == 0))
                    {
                        nv_req = nv_req + 1
                        break
                    }
                    else
                    {
                        console.log(`${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`)       
                        if($data.required[listcount[0][0] - 1 -i].track[listcount[0][listcount[0][0] - i] - 1].date == `${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`)
                        {
                            listData.push(
                                {
                                    "name":$data.required[listcount[0][0] - 1 -i].name,
                                    "date":$data.required[listcount[0][0] - 1 -i].track[listcount[0][listcount[0][0] - i] - 1].date,
                                    "value":$data.required[listcount[0][0] - 1 -i].track[listcount[0][listcount[0][0] - i] - 1].value
                                }
                            )
                            
                            pushed = pushed  + 1
                            listcount[0][ listcount[0][0] - i] = listcount[0][ listcount[0][0] - i] - 1

                            if(pushed >= retieveLimit) {exit = true;break} // exit call
                            
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
                    if((listcount[1][listcount[1][0] - i] == 0))
                    {
                        nv_nd = nv_nd + 1
                        break
                    }
                    else
                    {   
                        console.log(`${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`)       
                        if($data.needs[listcount[1][0] - 1 -i].track[listcount[1][listcount[1][0] - i] - 1].bdate == `${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`)
                        {
                            listData.push(
                                {
                                    "name":$data.needs[listcount[1][0] - 1 -i].track[listcount[1][listcount[1][0] - i] - 1].name,
                                    "date":$data.needs[listcount[1][0] - 1 -i].track[listcount[1][listcount[1][0] - i] - 1].bdate,
                                    "value":$data.needs[listcount[1][0] - 1 -i].track[listcount[1][listcount[1][0] - i] - 1].value
                                }
                            )

                            pushed = pushed  + 1
                            listcount[1][ listcount[1][0] - i] = listcount[1][ listcount[1][0] - i] - 1

                            if(pushed >= retieveLimit) {exit = true;break} // exit call
                            
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
                    if((listcount[2][listcount[2][0] - i] == 0))
                    {
                        nv_wt = nv_wt + 1
                        break
                    }
                    else
                    {   
                        console.log(`${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`)       
                        if($data.needs[listcount[2][0] - 1 -i].track[listcount[2][listcount[2][0] - i] - 1].bdate == `${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`)
                        {
                            listData.push(
                                {
                                    "name":$data.wants[listcount[2][0] - 1 -i].track[listcount[2][listcount[2][0] - i] - 1].name,
                                    "date":$data.wants[listcount[2][0] - 1 -i].track[listcount[2][listcount[2][0] - i] - 1].bdate,
                                    "value":$data.wants[listcount[2][0] - 1 -i].track[listcount[2][listcount[2][0] - i] - 1].value
                                }
                            )

                            pushed = pushed  + 1
                            listcount[2][ listcount[2][0] - i] = listcount[2][ listcount[2][0] - i] - 1

                            if(pushed >= retieveLimit) {exit = true;break} // exit call
                            
                        }
                        else {break}
                    }
                    if(exit) {break}
                }
                
            }
               
        } else {q_wt = true}


        if((q_req) && (q_nd) && (q_wt)) {break}
        date.setDate(date.getDate() - 1); 
    }
    
}
getDataHistory()
console.log(listData)
</script>

<style scoped>

</style>
