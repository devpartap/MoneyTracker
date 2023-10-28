<template>
    <div>
    <Icon size="35" @click="$router.go(-1)" style="margin-top: 10px; text-align: left;">
        <arrow-circle-left16-Regular />
    </Icon>

    <h1 style="text-align: center;margin-top: -47px;">
        {{ title }}
    <hr>
    </h1>
    <br>
    </div>
</template>

<script setup>
import {defineProps} from 'vue'
import { Icon } from '@vicons/utils';
import ArrowCircleLeft16Regular from '@vicons/fluent/ArrowCircleLeft16Regular'

    const props = defineProps({
        title:""
    })

</script>