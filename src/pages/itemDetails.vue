<template>
    <c_header :title="_name" />

    <n-card title="Huge Card" size="huge" :embedded="true" style="text-align: center;" >
        Card Content<br><br><br><br><br><br><br>
    </n-card> 
    <br><br>
    
    <div :key="reload">
        <div class="cat_head">Category {{ cata[cata_active] }}
            <br><br>
        
            
            <n-grid :cols="getcols()">
                <n-gi>
                    <n-statistic label="This Month" :value="$data[cata[cata_active]][itm_ref].valuePerMonth[$data[cata[cata_active]][itm_ref].valuePerMonth.length-1]" />
                </n-gi>
                <n-gi>
                    <n-statistic label="Total Spend" :value="`${$data[cata[cata_active]][itm_ref].totalspend}`" />
                </n-gi>
                <n-gi v-if="cata_active == 0">
                    <n-statistic label="Month Mean" :value="(($data[cata[cata_active]][itm_ref].valuePerMonth[$data[cata[cata_active]][itm_ref].valuePerMonth.length-1]/
                                                            $data[cata[cata_active]][itm_ref].enteriesPerMonth[$data[cata[cata_active]][itm_ref].enteriesPerMonth.length-1])/
                                                            $data[cata[cata_active]][itm_ref].value).toFixed(2)" />
                </n-gi>
            </n-grid>

        </div>
        <br>

        <div style="margin-left: 8%;margin-right: 18%;width: 100%;">
        <n-grid :cols="2" :item-responsive="true">

            <n-gi v-if="cata_active == 0">
                • Default Value  
            </n-gi>
            <n-gi v-if="cata_active == 0">
                {{ $data[cata[cata_active]][itm_ref].value }} 
                
                <Icon size="15" @click="inputbox_value = $data[cata[cata_active]][itm_ref].value;inputbox_show = true" 
                      style="float: right; margin-right: 50px;">
                <edit16-regular />
                </Icon>
            </n-gi>


            <n-gi v-if="cata_active != 0">
                • SubCategory
            </n-gi>
            <n-gi v-if="cata_active != 0">
                {{ $data[cata[cata_active]][itm_ref].name }} 
                
                <Icon size="15" @click="namebox_value = $data[cata[cata_active]][itm_ref].name;namebox_show = true" 
                      style="float: right; margin-right: 50px;">
                <edit16-regular />
                </Icon>
            </n-gi>


            <n-gi v-if="cata_active == 0">
                • Excludes
            </n-gi>
            <n-gi v-if="cata_active == 0">
                {{ getExcludes($data[cata[cata_active]][itm_ref].excludes) }}
                
                <Icon size="15" @click="showexcludes_value = $data[cata[cata_active]][itm_ref].excludes;showexcludes = true" 
                    style="float: right; margin-right: 50px;">
                <edit16-regular />
                </Icon>
            </n-gi>


            <n-gi>
                • Month Enteries 
            </n-gi>
            <n-gi>
                {{ $data[cata[cata_active]][itm_ref].enteriesPerMonth[$data[cata[cata_active]][itm_ref].enteriesPerMonth.length - 1] }}
                
                <Icon size="15" style="float: right; margin-right: 50px;" @click="showmonthly = true;showmonthly_value = 0;showmonthly_input = true
                                showmonthly_input_value = $data[cata[cata_active]][itm_ref].enteriesPerMonth[$data[cata[cata_active]][itm_ref].enteriesPerMonth.length - 1]">
                <edit16-regular />
                </Icon>
            </n-gi>


            <n-gi>
                • Total Enteries 
            </n-gi>
            <n-gi>
                {{ getTotalEnteries($data[cata[cata_active]][itm_ref].enteriesPerMonth) }}
                
                <Icon size="15" style="float: right; margin-right: 50px;" @click="showmonthly = true;showmonthly_value = null;showmonthly_input = false
                                showmonthly_input_value = null">
                <edit16-regular />
                </Icon>
            </n-gi>


            <n-gi>
                • Initialized On
            </n-gi>
            <n-gi>
                {{ $data[cata[cata_active]][itm_ref].init }}
                
                <Icon size="15" @click="showdatepicker = true;dateIndex = 1" style="float: right; margin-right: 50px;">
                <edit16-regular />
                </Icon>
            </n-gi>


            <n-gi v-if="cata_active == 0">
                • Span from
            </n-gi>
            <n-gi v-if="cata_active == 0">
                {{ getSpan($data[cata[cata_active]][itm_ref].spantill[0]) }}
                
                <Icon size="15" @click="showdatepicker = true;dateIndex = 2" style="float: right; margin-right: 50px;">
                <edit16-regular />
                </Icon>
            </n-gi>


            <n-gi v-if="cata_active == 0">
                • Span till 
            </n-gi>
            <n-gi v-if="cata_active == 0">
                {{ getSpan($data[cata[cata_active]][itm_ref].spantill[1]) }}
                
                <Icon size="15" @click="showdatepicker = true;dateIndex = 3" style="float: right; margin-right: 50px;">
                <edit16-regular />
                </Icon>
            </n-gi>           

        </n-grid>
    

    </div>


    
        <!-- Input Box -->
        <n-modal v-model:show="inputbox_show" preset="dialog"
                positive-text="Confirm" negative-text="Cancel" 
                @positive-click="changeInputVal()" @negative-click="inputbox_show = false" >

            <template #header>
                <div>Input Value</div>
            </template>
        
            <n-input-number v-model:value="inputbox_value" min="1" />
            
        </n-modal>



        <!-- Name box -->
        <n-modal v-model:show="namebox_show" preset="dialog" 
                positive-text="Confirm" negative-text="Cancel" 
                @positive-click="changeName()" @negative-click="namebox_show = false" >

            <template #header>
                <div>Input SubCategory</div>
            </template>
        
            <n-input v-model:value="namebox_value" />
            
        </n-modal>


        <!-- Excludes -->
        <n-modal v-model:show="showexcludes" preset="dialog"
                positive-text="Confirm" negative-text="Cancel" 
                @positive-click="changeExcludes()" @negative-click="showexcludes = false" >

            <template #header>
                <div>Choose Excludes</div>
            </template>
        
            <n-checkbox-group :value="showexcludes_value"
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


        <!-- Monthly Entries -->
        <n-modal v-model:show="showmonthly" preset="dialog"
                positive-text="Confirm" negative-text="Cancel" 
                @positive-click="changeMonthlyEnteries()" @negative-click="showmonthly = false" >

            <template #header>
                <div>Input Value</div>
            </template>
            
            <n-space vertical> 
            <n-select v-model:value="showmonthly_value" placeholder="Please select Recurser"
                      :options="[...$data[cata[cata_active]][itm_ref].enteriesPerMonth.keys()].map(i => {return {label:i,value:i}})"
                      @update:value="() => {showmonthly_input = true;showmonthly_input_value = $data[cata[cata_active]][itm_ref].enteriesPerMonth[showmonthly_value]}"/>   
                      
            <n-input-number :disabled="!showmonthly_input" v-model:value="showmonthly_input_value" min="1" />
            </n-space>

        </n-modal>


        <!-- Date Picker  -->
        <n-modal v-model:show="showdatepicker" preset="dialog">
            <div style="margin-left:7.5%">
                <n-date-picker panel type="date" clearable :on-update:value="value => changeDate(value)"/>
            </div>
        </n-modal>
        

        <!-- Exception Modal -->
        <n-modal v-model:show="expMdl" preset="dialog" title="Dialog">
            <template #header>
                <div>{{ expMdl_msg }}</div>
            </template>
            
        </n-modal>

    </div>
    
</template>

<script setup>

import { ref,inject } from 'vue'
import c_header from './../components/c_header.vue'

import { Icon } from '@vicons/utils';
import Edit16Regular from '@vicons/fluent/Edit16Regular'; 
import { NCard,NGi,NGrid,NStatistic,NModal,NInput,NInputNumber,NCheckboxGroup,NSpace,
         NCheckbox,NSelect,NDatePicker } from 'naive-ui';

const cata = ['required','needs','wants']
let cata_active = null

const reload = ref(false)

const inputbox_show = ref(false)
const inputbox_value = ref(null)

const namebox_show = ref(false)
const namebox_value = ref(null)

const showexcludes = ref(false)
const showexcludes_value = ref([])

const showmonthly = ref(false)
const showmonthly_value = ref(null)
const showmonthly_input = ref(false)
const showmonthly_input_value = ref(null)

const showdatepicker = ref(false)
let   dateIndex = 0

const expMdl = ref(false)
let   expMdl_msg = ""


const props = defineProps({
    _name:String,
    _catagory:String
})

const itm_ref = props._catagory.substring(props._catagory.length-1)
console.log(itm_ref)
const $data = inject('$data')  

if(props._catagory.substring(0, 8) == 'Required'){
    console.log("required")
    cata_active = 0;
}
else if(props._catagory.substring(0, 5) == 'Needs'){
    console.log("needs")
    cata_active = 1;
}
else{
    cata_active = 2;
    console.log("wants")
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

function changeName()
{
    if(namebox_value.value)
    {
        $data[cata[cata_active]][itm_ref].name = namebox_value.value
        localStorage.setItem("_DATA_", JSON.stringify($data))

        namebox_value.value = null
        namebox_show.value = false

        reload.value = !reload.value
        console.log("Done")
    }
    else
    {
        expMdl_msg = "Name of a SubCategory is required"
        expMdl.value = true  
    }
}

function changeExcludes()
{
    
    $data[cata[cata_active]][itm_ref][itm_ref].excludes = showexcludes_value.value
    localStorage.setItem("_DATA_", JSON.stringify($data))

    showexcludes_value.value = []
    showexcludes.value = false

    reload.value = !reload.value
    console.log("Done")
}

function changeMonthlyEnteries()
{
    if(showmonthly_input.value)
    {
        $data[cata[cata_active]][itm_ref].enteriesPerMonth[showmonthly_value.value] = showmonthly_input_value.value
        localStorage.setItem("_DATA_", JSON.stringify($data))

        showmonthly.value = false
        showmonthly_value.value  = null
        showmonthly_input.value  = false
        showmonthly_input_value.value  = null

        reload.value = !reload.value
        console.log("Done")
    }
    else
    {
        expMdl_msg = "Please Choose Atleast One Option"
        expMdl.value = true  
    }
}

function changeDate(val)
{
    let dte = new Date(val)
    let valid = true

    if(dateIndex == 1){
        $data[cata[cata_active]][itm_ref].init = `${dte.getDate()}-${dte.getMonth() +1}-${dte.getFullYear()}`
    }
    else if(dateIndex == 2){
        let spntill = new Date($data[cata[cata_active]][itm_ref].spantill[1])

        if(val >= $data[cata[cata_active]][itm_ref].spantill[1]) {
            
            expMdl_msg = `Date cannot be greater than endspan -> ${`${spntill.getDate()}-${spntill.getMonth() +1}-${spntill.getFullYear()}`} `
            expMdl.value = true 
            valid = false 
        }
        else {
            $data[cata[cata_active]][itm_ref].spantill[0] = val
        } 
    }
    else if(dateIndex == 3){
        $data[cata[cata_active]][itm_ref].spantill[1] = val
    }

    if(valid){

        localStorage.setItem("_DATA_", JSON.stringify($data))

        showdatepicker.value = false
        dateIndex = 0

        reload.value = !reload.value
        console.log("Done")
    }
}

function checkexcludes(val)
{   
    if(val.length >= 7){    
        expMdl.value = true  
        expMdl_msg = "Cannot have all weekdays selected" 
    }
    else{
        showexcludes_value.value = val
    }
}

function getcols()
{
    if(cata_active == 0){ 
        return 3 
    }
    else{ 
        return 2 
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