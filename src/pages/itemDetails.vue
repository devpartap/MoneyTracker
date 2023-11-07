<template>
    <c_header :title="_name" />

    <n-card title="Huge Card" size="huge" style="text-align: center;" >
        Card Content<br><br><br><br><br><br><br>
    </n-card> 
    
    <div v-show="_catagory.substring(0, 8) == 'Required'">
        <div class="cat_head">Catagory Required
            <br><br>
            
        <n-grid :cols="3">
            <n-gi>
                <n-statistic label="This Month" :value="$data.required[itm_ref].valuePerMonth[$data.required[itm_ref].valuePerMonth.length-1]" />
            </n-gi>
            <n-gi>
                <n-statistic label="This Span" :value="$data.required[itm_ref].totalspend" />
            </n-gi>
            <n-gi>
                <n-statistic label="Month Mean" :value="(($data.required[itm_ref].valuePerMonth[$data.required[itm_ref].valuePerMonth.length-1]/
                                                        $data.required[itm_ref].enteriesPerMonth[$data.required[itm_ref].enteriesPerMonth.length-1])/
                                                        $data.required[itm_ref].value).toFixed(3)" />
            </n-gi>
        </n-grid>
    </div>

    </div>

    <div v-show="_catagory == 'Needs'">

    </div>

    <div v-show="_catagory == 'Wants'">

    </div>
    
</template>

<script setup>

import { ref,inject } from 'vue'
import c_header from './../components/c_header.vue'
import { NCard,NGi,NGrid,NStatistic } from 'naive-ui';


    const props = defineProps({
        _name:String,
        _catagory:String
    })

    const itm_ref = props._catagory.substring(props._catagory.length-1)
    const $data = inject('$data')  


</script>   

<style scoped>
.cat_head{
    font-size: 20px;
    color: grey;
    text-align: center;
    font-weight: bolder;
    font-family:'Franklin Gothic Medium';
}
</style>