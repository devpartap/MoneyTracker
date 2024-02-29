
<template>

    <c_header title="Cache" />

    <n-button type="info" @click="save()">
      Save
    </n-button><br><br>
    <n-scrollbar style="height:700px;">
        
        <n-input :autosize="true"
        v-model:value="formatted$data"
        type="textarea"
        />
    </n-scrollbar>
</template>

<script setup>

import { inject,ref } from 'vue'
import { NScrollbar,NButton,NInput } from 'naive-ui';
import c_header from './../components/c_header.vue'

const $data = JSON.stringify(inject('$data'))

let formatted$data = ref("{\n    ")
let space = "   "

for (let i = 1; i < $data.length; i++) { 

    if($data[i] == "[")
    {
        if($data[i+1] == '{')
        {
            space += "    "
        }
    }
    if($data[i] == "{")
    {

        if($data[i+1] == ","){
            formatted$data.value += `\n${space}${$data[i]}${$data[i+1]}\n${space}    `
            i = i + 1
        }
        else{
            formatted$data.value  += `\n${space}${$data[i]}\n${space}    `
        }
        space += "    "
        
    }
    else if($data[i] == "}"){

        space = space.substring(0,space.length-4)
        if($data[i+1] == "]")
        {
            formatted$data.value  += `\n${space}${$data[i]}`
            space = space.substring(0,space.length-4)
            formatted$data.value  += `\n${space}${$data[i+1]}\n${space}`
            i = i + 1
        }

        else if($data[i+1] == ","){
            formatted$data.value  += `\n${space}${$data[i]}${$data[i+1]}\n${space}`
            i = i + 1
        }

        else{
            formatted$data.value  += `\n${space}${$data[i]}\n${space}`
        }

    }

    else if($data[i] == ",")
    {
        if($data[i+4] == ']')
        {
            formatted$data.value  += $data[i]          
        }

        else if($data[i+1] == '"'){
            formatted$data.value  += `${$data[i]}\n${space}${$data[i+1]}`
            i = i + 1
        }

        else if($data[i+2] == '"'){
            formatted$data.value  += `${$data[i]}${$data[i+1]}\n${space}${$data[i+2]}`
            i = i + 2
        }

        else
        {
            formatted$data.value  += $data[i]
        }
    }

    else
    {
        formatted$data.value  += $data[i]
    }
};

console.log('done')
console.log(formatted$data.value )


function save()
{
    let tosave = formatted$data.value
    
    localStorage.setItem("_DATA_",tosave.replace(/(\r\n|\n|\r)/gm, ''))
    console.log("saved")

    location.reload();
}



</script>