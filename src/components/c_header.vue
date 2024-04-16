<template>
    <div>
        <Icon size="40" @click="$router.go(-1)" style="text-align: left;">
            <arrow-circle-left16-Regular />
        </Icon>

        <div id="pageTitle">
            {{ displaytitle }}
        </div>
        <hr style="margin-bottom: 18px;">
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

    if(displaytitle.length >= 16)
    {
        displaytitle = displaytitle.slice(0,14)
        displaytitle += "..."
    }
    
    

</script>

<style>
    #pageTitle{
        text-align: center;
        margin-top: -51px;
        font-family:"roboto-bold";
        font-size: 30px;
    }
</style>