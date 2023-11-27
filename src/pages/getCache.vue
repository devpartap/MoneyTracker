
<template>
    <n-code :code="formatted$data" language="javascript"/>
</template>

<script setup>

import { inject } from 'vue'
import { NCode } from 'naive-ui';

const $data = JSON.stringify(inject('$data'))
console.log($data.length)


let formatted$data = "const markup = {\n    "
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
            formatted$data += `\n${space}${$data[i]}${$data[i+1]}\n${space}    `
            i = i + 1
        }
        else{
            formatted$data += `\n${space}${$data[i]}\n${space}    `
        }
        space += "    "
        
    }
    else if($data[i] == "}"){

        space = space.substring(0,space.length-4)
        if($data[i+1] == "]")
        {
            formatted$data += `\n${space}${$data[i]}`
            space = space.substring(0,space.length-4)
            formatted$data += `\n${space}${$data[i+1]}\n${space}`
            i = i + 1
        }

        else if($data[i+1] == ","){
            formatted$data += `\n${space}${$data[i]}${$data[i+1]}\n${space}`
            i = i + 1
        }

        else{
            formatted$data += `\n${space}${$data[i]}\n${space}`
        }

    }

    else if($data[i] == ",")
    {
        if($data[i+4] == ']')
        {
            formatted$data += $data[i]          
        }

        else if($data[i+1] == '"'){
            formatted$data += `${$data[i]}\n${space}${$data[i+1]}`
            i = i + 1
        }

        else if($data[i+2] == '"'){
            formatted$data += `${$data[i]}${$data[i+1]}\n${space}${$data[i+2]}`
            i = i + 2
        }

        else
        {
            formatted$data += $data[i]
        }
    }

    else
    {
        formatted$data += $data[i]
    }
};

console.log('done')
console.log(formatted$data)


</script>