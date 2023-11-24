<template>
    <c_header :title="_name" />

    <n-card title="Huge Card" size="huge" :embedded="true" style="text-align: center;" >
        Card Content<br><br><br><br><br><br><br>
    </n-card> 
    <br><br>
    
    <div :key="reload" v-show="_catagory.substring(0, 8) == 'Required'">
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
        <br>

        <div style="margin-left: 8%;margin-right: 18%;width: 100%;">
        <n-grid :cols="2" :item-responsive="true">
            <n-gi>
                • Default Value  
            </n-gi>
            <n-gi>
                {{ $data.required[itm_ref].value }} 
                
                <Icon size="15" @click="showinput_box = true" style="float: right; margin-right: 50px;">
                <edit16-regular />
                </Icon>
            </n-gi>

            <n-gi>
                • Excludes
            </n-gi>
            <n-gi>
                {{ getExcludes($data.required[itm_ref].excludes) }}
                
                <Icon size="15" style="float: right; margin-right: 50px;">
                <edit16-regular />
                </Icon>
            </n-gi>

            <n-gi>
                • Month Enteries 
            </n-gi>
            <n-gi>
                {{ $data.required[itm_ref].enteriesPerMonth[$data.required[itm_ref].enteriesPerMonth.length - 1] }}
                
                <Icon size="15" style="float: right; margin-right: 50px;">
                <edit16-regular />
                </Icon>
            </n-gi>

            <n-gi>
                • Total Enteries 
            </n-gi>
            <n-gi>
                {{ getTotalEnteries($data.required[itm_ref].enteriesPerMonth) }}
                
                <Icon size="15" style="float: right; margin-right: 50px;">
                <edit16-regular />
                </Icon>
            </n-gi>

            <n-gi>
                • Initialized On
            </n-gi>
            <n-gi>
                {{ $data.required[itm_ref].init }}
                
                <Icon size="15" style="float: right; margin-right: 50px;">
                <edit16-regular />
                </Icon>
            </n-gi>

            <n-gi>
                • Span from
            </n-gi>
            <n-gi>
                {{ getSpan($data.required[itm_ref].spantill[0]) }}
                
                <Icon size="15" style="float: right; margin-right: 50px;">
                <edit16-regular />
                </Icon>
            </n-gi>

            <n-gi>
                • Span till 
            </n-gi>
            <n-gi>
                {{ getSpan($data.required[itm_ref].spantill[1]) }}
                
                <Icon size="15" style="float: right; margin-right: 50px;">
                <edit16-regular />
                </Icon>
            </n-gi>           

        </n-grid>
    

    </div>

    </div>

    <div :key="reload" v-show="_catagory == 'Needs'">

    </div>

    <div :key="reload" v-show="_catagory == 'Wants'">

    </div>

    <div>
        <n-modal v-model:show="showinput_box" preset="dialog"
                positive-text="Confirm" negative-text="Cancel" 
                @positive-click="Req_changeDefVal()" @negative-click="showinput_box = false"
                clearable >

            <template #header>
                <div>Input Value</div>
            </template>
        
            <n-input-number v-model:value="showinput_box_value" />
            
        </n-modal>

    </div>
    
</template>

<script setup>

import { ref,inject } from 'vue'
import c_header from './../components/c_header.vue'

import { Icon } from '@vicons/utils';
import Edit16Regular from '@vicons/fluent/Edit16Regular'; 
import { NCard,NGi,NGrid,NStatistic,NModal,NInputNumber } from 'naive-ui';

const reload = ref(false)

const showinput_box = ref(false)
const showinput_box_value = ref(null)


const props = defineProps({
    _name:String,
    _catagory:String
})

const itm_ref = props._catagory.substring(props._catagory.length-1)
const $data = inject('$data')  

function getSpan(time){
    let ed = new Date(time)
    return `${ed.getDate()}-${ed.getMonth() +1}-${ed.getFullYear()}`
}

function getExcludes(exc)
{
    let weeks = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    let toreturn = ""
    let ifone = false
    
    if(exc.length >= 1){
        exc.forEach(element => {

            if(ifone) { toreturn += ','}
            toreturn += ` ${weeks[element]}` 
            ifone = true
             
        });
        return toreturn
    }
    else return "No Excludes"
}

function getTotalEnteries(enteries)
{
    let totalNo = 0
    enteries.forEach(element => {
        totalNo += element
    });

    return totalNo
}

function Req_changeDefVal()
{
    $data.required[itm_ref].value = showinput_box_value.value
    localStorage.setItem("_DATA_", JSON.stringify($data))

    showinput_box_value.value = null
    showinput_box.value = false

    reload.value = !reload.value
    console.log("Done")
}


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