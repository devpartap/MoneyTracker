<template>
    <c_header :title="_name" />

    <n-card title="Huge Card" size="huge" :embedded="true" style="text-align: center;" >
        There Will Be A Graph Here<br><br><br><br><br><br><br>
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
                    <n-statistic label="Month deviation" :value="(($data[cata[cata_active]][itm_ref].valuePerMonth[$data[cata[cata_active]][itm_ref].valuePerMonth.length-1]/
                                                            $data[cata[cata_active]][itm_ref].enteriesPerMonth[$data[cata[cata_active]][itm_ref].enteriesPerMonth.length-1])/
                                                            $data[cata[cata_active]][itm_ref].value).toFixed(3)" />
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
                      @update:value="() => {showmonthly_input = true;showmonthly_input_value = $data[cata[cata_active]][itm_ref].enteriesPerMonth[
                                            $data[cata[cata_active]][itm_ref].enteriesPerMonth.length - showmonthly_value - 1]}"/>   
                      
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

    <br><br>
    <div style="margin-left: 10%;margin-right: 10%;">

        <div class="cat_head">History</div><br>
        <div v-for="(i,n) in $data[cata[cata_active]][itm_ref].track.slice().reverse()" :key="n" style="padding-bottom: 1px;">
            <n-card :title="getDateString(i.date)" size="small" style="text-align: center;">
                
                <div style="font-size: 20px;font-weight: bolder;">₹ {{i.value }}</div>
                
                <div v-if="cata_active != 0" style="font-size: 15px;font-weight: bold; float: left;">Name: {{ i.name }}</div><br>
                <div v-if="cata_active != 0" style="font-size: 15px;font-weight: bold; float: left; position: absolute;">Mode: {{  i.mode }}</div>
                

                <Icon style="float: right; margin-top: -23px;margin-left: 7px;" size="24"
                        @click="deleteentery_show = true;deleteentery_show_index = $data[cata[cata_active]][itm_ref].track.length - n - 1;console.log(deleteentery_show_index)">
                    
                    <delete16-regular />
                </Icon>
                
                <Icon style="float: right; margin-top: -23px; padding-bottom: 15px;" size="24"
                      @click="editprevvalue_show = true; editprevvalue_show_index = $data[cata[cata_active]][itm_ref].track.length - n - 1;
                                       editprevvalue_show_value = $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index].value;
                                    //    improve
                                        parseSetDate()

                                       if(cata_active != 0){editprevvalue_show_name = $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index].name
                                                            editprevvalue_show_mode = $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index].mode}">
                    
                    <edit16-regular />
                </Icon>

            </n-card>
        </div>
    </div>

    <!-- Change Price -->
    <n-modal v-model:show="editprevvalue_show" preset="dialog"
                positive-text="Confirm" negative-text="Cancel" 
                @positive-click="changePrevValue()" @negative-click="editprevvalue_show = false;editprevvalue_show_index = null" >

            <template #header>
                <h3 v-if="$data[cata[cata_active]].hasOwnProperty(itm_ref)">New Value for {{ $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index].date }}</h3>
            </template>

            <n-grid :cols="2">
                <n-gi>
                    Value: 
                </n-gi>
                 <n-gi>
                    <n-input-number v-model:value="editprevvalue_show_value" min="1" />
                 </n-gi>

                 <n-gi>
                    Initialized: 
                </n-gi>
                <n-gi>
                    <n-date-picker format="dd-MM-yyyy" v-model:value="editprevvalue_show_date" type="date" 
                                    :is-date-disabled="(ts) => {

                                        if((new Date(ts).getDate()) > (new Date().getDate())){
                                            return true;
                                        }
                                        else {
                                            return false;
                                        }
                                    }"/>
                </n-gi>

                 <n-gi v-if="cata_active != 0">
                    Name: 
                 </n-gi>
                 <n-gi>
                    <n-input v-if="cata_active != 0" v-model:value="editprevvalue_show_name" type="text" />
                </n-gi>

                <n-gi v-if="cata_active != 0">
                    Mode:
                </n-gi>
                 <n-gi>
                    <n-input v-if="cata_active != 0" v-model:value="editprevvalue_show_mode" type="text" />
                </n-gi>
            </n-grid>
            
    </n-modal>

    <!-- Delete Entery -->
    <n-modal v-model:show="deleteentery_show" preset="dialog"
                positive-text="Confirm" negative-text="Cancel" 
                @positive-click="deleteEntery()" @negative-click="deleteentery_show = false">

            <h3 v-if="$data[cata[cata_active]].hasOwnProperty(itm_ref)">Are You Sure To Delete {{ $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index].date }}</h3>
    </n-modal>
    
</template>

<script setup>

import { ref,inject } from 'vue'
import { useRouter } from 'vue-router';
import c_header from './../components/c_header.vue'

import { Icon } from '@vicons/utils';
import Edit16Regular from '@vicons/fluent/Edit16Regular'; 
import Delete16Regular from '@vicons/fluent/Delete16Regular'; 
import { NCard,NGi,NGrid,NStatistic,NModal,NInput,NInputNumber,NCheckboxGroup,NSpace,
         NCheckbox,NSelect,NDatePicker } from 'naive-ui';

const cata = ['required','needs','wants']
const getMonthNm = ['Jan','Feb','Mar','Aprl','May','June','July','Aug','Sept','Oct','Nov','Dec']
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

const editprevvalue_show = ref(false)
const editprevvalue_show_index = ref(0)
const editprevvalue_show_value = ref(0)
const editprevvalue_show_name = ref(null)
const editprevvalue_show_mode = ref(null)
const editprevvalue_show_date = ref(null)

const deleteentery_show = ref(false)
const deleteentery_show_index = ref(false)


const props = defineProps({
    _name:String,
    _catagory:String
})

const itm_ref = props._catagory.substring(props._catagory.length-1)
console.log(itm_ref)

const $data = inject('$data')  

const Router = useRouter()

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

function editHistory(diff,date)
{
    let index = 0
    for(; index<$data.history.day.length;index++)
    {
        if($data.history.day[index].date == date)
        { break;}
    }

    $data.history.day[index].spend[0] += diff
    $data.history.day[index].spend[cata_active+1] += diff
}


function changePrevValue()
{
    
     let diff = editprevvalue_show_value.value - $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index.value].value
     editHistory(diff,$data[cata[cata_active]][itm_ref].track[editprevvalue_show_index.value].date)

     $data[cata[cata_active]][itm_ref].totalspend += diff

    //to improve
    $data[cata[cata_active]][itm_ref].valuePerMonth[
        $data[cata[cata_active]][itm_ref].valuePerMonth.length - 1
        - parseInt($data[cata[cata_active]][itm_ref].track[$data[cata[cata_active]][itm_ref].track.length - 1].date.split('-')[1])
        + parseInt($data[cata[cata_active]][itm_ref].track[editprevvalue_show_index.value].date.split('-')[1])
    ] += diff

    if(cata_active != 0)
    {
        if((editprevvalue_show_name.value != null) &&(editprevvalue_show_name.value != "")){
            $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index.value].name = editprevvalue_show_name.value
        }
        if((editprevvalue_show_mode.value != null) &&(editprevvalue_show_mode.value != "")){
            $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index.value].mode = editprevvalue_show_mode.value
        }

        editprevvalue_show_name.value = null
        editprevvalue_show_mode.value = null
    }
    
    $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index.value].value = editprevvalue_show_value.value
        
    localStorage.setItem("_DATA_", JSON.stringify($data))

    editprevvalue_show_index.value = 0
    editprevvalue_show_value.value = null
    editprevvalue_show.value = false

    reload.value = !reload.value
    console.log("Done")
}

function deleteEntery(if_call_from_edit = false,change_mv = true)
{
    console.log(if_call_from_edit,change_mv)
    let diff = -($data[cata[cata_active]][itm_ref].track[deleteentery_show_index.value].value)
    let deletedfeild = false

    if(!if_call_from_edit){
        editHistory(diff,$data[cata[cata_active]][itm_ref].track[deleteentery_show_index.value].date)
        $data[cata[cata_active]][itm_ref].totalspend += diff

        $data[cata[cata_active]][itm_ref].track.splice(deleteentery_show_index.value,1)
        if($data[cata[cata_active]][itm_ref].track.length == 0)
        {
            delete $data[cata[cata_active]][itm_ref]
            $data[cata[cata_active]].length -= 1

            deletedfeild = true
            change_mv = false
        }    
    }

//to improve a lot
    if(change_mv)
    {
        $data[cata[cata_active]][itm_ref].valuePerMonth[
            $data[cata[cata_active]][itm_ref].valuePerMonth.length - 1
            - parseInt($data[cata[cata_active]][itm_ref].track[$data[cata[cata_active]][itm_ref].track.length - 1].date.split('-')[1])
            + parseInt($data[cata[cata_active]][itm_ref].track[deleteentery_show_index.value].date.split('-')[1])
            ] += diff

        $data[cata[cata_active]][itm_ref].enteriesPerMonth[
            $data[cata[cata_active]][itm_ref].enteriesPerMonth.length - 1
            - parseInt($data[cata[cata_active]][itm_ref].track[$data[cata[cata_active]][itm_ref].track.length - 1].date.split('-')[1])
            + parseInt($data[cata[cata_active]][itm_ref].track[deleteentery_show_index.value].date.split('-')[1])
        ] -= 1
    }

    
    deleteentery_show_index.value = null
    deleteentery_show.value = false
    
    if(!if_call_from_edit){
        localStorage.setItem("_DATA_", JSON.stringify($data))
        reload.value = !reload.value
        console.log("Done")
    }

    if(deletedfeild)
    {
        Router.go(-1)
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

function getDateString(val)
{
    const dt = val.split('-');
    return `${dt[0]} ${getMonthNm[dt[1] - 1]} ${dt[2]}` 
}

function parseSetDate()
{
    let date_arry = $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index.value].date.split('-');
    editprevvalue_show_date.value = Date.parse(`${date_arry[1]}-${date_arry[0]}-${date_arry[2]}`);

    console.log(editprevvalue_show_date.value)
    console.log($data[cata[cata_active]][itm_ref].track[editprevvalue_show_index.value].date);
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