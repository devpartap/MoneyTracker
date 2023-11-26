<template>
    <c_header :title="_name" />

    <n-card title="Huge Card" size="huge" :embedded="true" style="text-align: center;" >
        Card Content<br><br><br><br><br><br><br>
    </n-card> 
    <br><br>
    
    <div :key="reload" v-show="cata_active == 0">
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
                                                            $data.required[itm_ref].value).toFixed(2)" />
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
                {{ $data[cata[cata_active]][itm_ref].value }} 
                
                <Icon size="15" @click="inputbox_value = $data.required[itm_ref].value;inputbox_show = true" 
                      style="float: right; margin-right: 50px;">
                <edit16-regular />
                </Icon>
            </n-gi>

            <n-gi>
                • Excludes
            </n-gi>
            <n-gi>
                {{ getExcludes($data.required[itm_ref].excludes) }}
                
                <Icon size="15" @click="showexcludes_value = $data.required[itm_ref].excludes;showexcludes = true" 
                    style="float: right; margin-right: 50px;">
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

        <!-- innut Box -->
        <n-modal v-model:show="inputbox_show" preset="dialog"
                positive-text="Confirm" negative-text="Cancel" 
                @positive-click="changeInputVal()" @negative-click="inputbox_show = false" >

            <template #header>
                <div>Input Value</div>
            </template>
        
            <n-input-number v-model:value="inputbox_value" />
            
        </n-modal>


        <!-- Excludes -->
        <n-modal v-model:show="showexcludes" preset="dialog"
                positive-text="Confirm" negative-text="Cancel" 
                @positive-click="changeExcludes()" @negative-click="showexcludes = false" >

            <template #header>
                <div>Choose Excludes</div>
            </template>
        
            <n-checkbox-group :default-value="showexcludes_value"
                              :on-update:value="checkexcludes">
                <n-space item-style="display: flex;">
                    <n-checkbox value=1 label="Mon" />
                    <n-checkbox value=2 label="Tue" />
                    <n-checkbox value=3 label="Wed" />
                    <n-checkbox value=4 label="Thu" />
                    <n-checkbox value=5 label="Fri" />
                    <n-checkbox value=6 label="Sat" />
                    <n-checkbox value=0 label="Sun" />
                </n-space>
            </n-checkbox-group>
            
        </n-modal>
        <n-modal v-model:show="showexcludes_expMdl" preset="dialog" title="Dialog">
            <template #header>
                <div>Cannot have all weekdays selected</div>
            </template>
            
        </n-modal>

        <!-- Monthly Entries -->
        <n-modal v-model:show="showmonthly" preset="dialog"
                positive-text="Confirm" negative-text="Cancel" 
                @positive-click="changeMonthlyEnteries()" @negative-click="showmonthly = false" >

            <template #header>
                <div>Input Value</div>
            </template>
            
            <!-- <n-space>
            <n-select placeholder="Please select Recurser" :options="() => {}"
                      v-model:value="showmonthly_value" @update:value="if(showmonthly_value){showmonthly_input = true}"/>   
                      
            <n-input-number v-model:value="inputbox_value" />
            </n-space> -->

        </n-modal>

    </div>
    
</template>

<script setup>

import { ref,inject } from 'vue'
import c_header from './../components/c_header.vue'

import { Icon } from '@vicons/utils';
import Edit16Regular from '@vicons/fluent/Edit16Regular'; 
import { NCard,NGi,NGrid,NStatistic,NModal,NInputNumber,NCheckboxGroup,NSpace,NCheckbox } from 'naive-ui';

const cata = ['required','needs','wants']
let cata_active = null

const reload = ref(false)

const inputbox_show = ref(false)
const inputbox_value = ref(null)

const showexcludes = ref(false)
const showexcludes_value = ref([])
const showexcludes_expMdl = ref(false)

const showmonthly = ref(false)
const showmonthly_input = ref(false)
const showmonthly_value = ref(null)


const props = defineProps({
    _name:String,
    _catagory:String
})

const itm_ref = props._catagory.substring(props._catagory.length-1)
const $data = inject('$data')  

if(props._catagory.substring(0, 8) == 'Required'){
    cata_active = 0;
}
else if(props._catagory.substring(0, 5) == 'Needs'){
    cata_active = 1;
}
else{
    cata_active = 2;
}

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

function changeInputVal()
{

    $data[cata[cata_active]][itm_ref].value = inputbox_value.value
    localStorage.setItem("_DATA_", JSON.stringify($data))

    inputbox_value.value = null
    inputbox_show.value = false

    reload.value = !reload.value
    console.log("Done")
}

function changeExcludes()
{
    
    $data[cata[cata_active]][itm_ref].excludes = showexcludes_value.value
    localStorage.setItem("_DATA_", JSON.stringify($data))

    showexcludes_value.value = []
    showexcludes.value = false

    reload.value = !reload.value
    console.log("Done")
}

function checkexcludes(val)
{   
    if(val.length >= 7){    
        showexcludes_expMdl.value = true   
    }
    else{
        showexcludes_value.value = val
    }
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