<template>
    <div>
        <Icon size="35" @click="$router.go(-1)" style="margin-top: 10px; text-align: left;">
            <arrow-circle-left16-Regular />
        </Icon>

        <h1 style="text-align: center;margin-top: -47px;">
            {{ displaytitle }}
        <hr>
        </h1>
    </div>
</template>

<script setup>

import { Icon } from '@vicons/utils';
import ArrowCircleLeft16Regular from '@vicons/fluent/ArrowCircleLeft16Regular'


    const props = defineProps({
        title:""
    })
    let displaytitle = props.title

    console.log(displaytitle)

    if(displaytitle.length > 17)
    {
        displaytitle = displaytitle.slice(0,16)
        displaytitle += "..."
    }
    
    

</script>