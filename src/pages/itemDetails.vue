<template>

    <div :key="reload">
        <c_header :title="_thetitle" />


    <n-card size="huge" :embedded="true" style="text-align: center;" >
        
        <template #header>
            <div>Week Details</div>
        </template>
        
        There Will Be A Graph Here later...<br><br><br><br><br><br>
    </n-card> 
    <br>
    <div class="cat_head">TEMPLATE {{ String(cata[cata_active]).toUpperCase() }}</div>
        <div id="head" v-if="cata_active != 3">
            <div class="cat_head">
                
                <n-grid :cols="getcols()">
                    <n-gi>
                        <n-statistic class="statHeading" :value=" '₹'+ $data[cata[cata_active]][itm_ref].valuePerMonth[$data[cata[cata_active]][itm_ref].valuePerMonth.length-1]" > 
                            <template #label>
                                <div class="statLable">This Month</div>
                            </template>

                        </n-statistic>
                        <h6 id="deviation">( {{ getMonthNm[parseInt($data[cata[cata_active]][itm_ref].track[$data[cata[cata_active]][itm_ref].track.length - 1]
                                                .date.split('-')[1]) - 1]}} )</h6>
                    </n-gi>

                    <n-gi>
                        <n-statistic class="statHeading" :value="`₹${$data[cata[cata_active]][itm_ref].totalspend}`">
                            <template #label>
                                <div class="statLable">Total Spend</div>
                            </template>
                        </n-statistic>
                    
                    </n-gi>

                    <n-gi v-if="cata_active == 0">
                        <n-statistic class="statHeading" :value="(($data[cata[cata_active]][itm_ref].valuePerMonth[$data[cata[cata_active]][itm_ref].valuePerMonth.length-1]/
                                                                $data[cata[cata_active]][itm_ref].enteriesPerMonth[$data[cata[cata_active]][itm_ref].enteriesPerMonth.length-1])/
                                                                $data[cata[cata_active]][itm_ref].value).toFixed(3)" >                                 
                            <template #label>
                                <div class="statLable">Deviation</div>
                            </template>
                        </n-statistic>

                        <h6 id="deviation">( {{ getMonthNm[parseInt($data[cata[cata_active]][itm_ref].track[$data[cata[cata_active]][itm_ref].track.length - 1]
                                                .date.split('-')[1]) - 1]}} )</h6>
                </n-gi>
                </n-grid>

            </div>
            
        </div>

        <!-- <div class="cat_head">FEILDS</div> -->

        <div style="width:100%">

            <n-grid :cols="2" :item-responsive="true" style="width:100%">

                <n-gi class="gridfeild" v-if="(cata_active == 0) || (cata_active == 3)">
                    • Default Value  
                </n-gi>
                <n-gi class="gridvalue" v-if="(cata_active == 0) || (cata_active == 3)">
                    ₹ {{ $data[cata[cata_active]][itm_ref].value }} 

                    <Icon size="19" @click="inputbox_value = $data[cata[cata_active]][itm_ref].value;inputbox_show = true" class="gridicon">
                        <edit16-regular />
                    </Icon>
                </n-gi>
                
                <n-gi class="gridfeild">
                    • Category Name
                </n-gi>
                <n-gi class="gridvalue">
                    {{ lenthCheck($data[cata[cata_active]][itm_ref].name) }}

                    <Icon size="19" @click="namebox_value = $data[cata[cata_active]][itm_ref].name;namebox_show = true" class="gridicon">
                        <edit16-regular />
                    </Icon>
                </n-gi>


                <n-gi class="gridfeild" v-if="(cata_active == 0) ">
                    • Excludes
                </n-gi>
                <n-gi class="gridvalue" v-if="(cata_active == 0)">
                    {{ getExcludes($data[cata[cata_active]][itm_ref].excludes) }}

                    <Icon size="19" @click="showexcludes_value = $data[cata[cata_active]][itm_ref].excludes;showexcludes = true" class="gridicon">
                        <edit16-regular />
                    </Icon>
                </n-gi>


                <n-gi class="gridfeild" v-if="($data.history.devmode == true) && (cata_active != 3)">
                    • Month Enteries 
                </n-gi>
                <n-gi class="gridvalue" v-if="($data.history.devmode == true) && (cata_active != 3)">
                    {{ $data[cata[cata_active]][itm_ref].enteriesPerMonth[$data[cata[cata_active]][itm_ref].enteriesPerMonth.length - 1] }} 
                    ({{ getMonthNm[$data[cata[cata_active]][itm_ref].track[$data[cata[cata_active]][itm_ref].track.length - 1].date.split('-')[1] - 1] }})

                    <Icon size="19" class="gridicon" @click="showmonthly = true;showmonthly_value = 0;showmonthly_input = true
                                    showmonthly_input_value = $data[cata[cata_active]][itm_ref].enteriesPerMonth[$data[cata[cata_active]][itm_ref].enteriesPerMonth.length - 1]">
                    <edit16-regular />
                    </Icon>
                </n-gi>


                <n-gi class="gridfeild" v-if="($data.history.devmode == true) && (cata_active != 3)">
                    • Total Enteries 
                </n-gi>
                <n-gi class="gridvalue" v-if="($data.history.devmode == true) && (cata_active != 3)">
                    {{ getTotalEnteries($data[cata[cata_active]][itm_ref].enteriesPerMonth) }}

                    <Icon size="19" class="gridicon" @click="showmonthly = true;showmonthly_value = null;showmonthly_input = false
                                    showmonthly_input_value = null">
                    <edit16-regular />
                    </Icon>
                </n-gi>


                <n-gi class="gridfeild">
                    • Initialized On
                </n-gi>
                <n-gi class="gridvalue">
                    {{ $data[cata[cata_active]][itm_ref].init }}

                    <Icon size="19" @click="showdatepicker = true;" class="gridicon">
                        <edit16-regular />
                    </Icon>
                </n-gi>

                <n-gi class="gridfeild" v-if="cata_active == 3">
                    • Base Span
                </n-gi>
                <n-gi class="gridvalue" v-if="cata_active == 3">
                    {{ printBaseRangeDates() }}

                    <Icon size="19" @click="showspan = true;" class="gridicon">
                    <edit16-regular />
                    </Icon>
                </n-gi>

                <n-gi class="gridfeild" v-if="cata_active == 0">
                    • Homepage Logging 
                </n-gi>
                <n-gi class="gridvalue" v-if="cata_active == 0">
                    {{ $data[cata[cata_active]][itm_ref].homelog }}

                    <Icon size="19" @click="showswitch = true;" class="gridicon">
                    <edit16-regular />
                    </Icon>
                </n-gi>

                <n-gi class="gridfeild" v-if="cata_active == 3">
                </n-gi>
                <n-gi class="gridvalue" v-if="cata_active == 3">
                    <strong>Delete</strong>
                    <Icon size="25" @click="deleteentery_show = true" class="gridicon">
                        <delete16-regular />
                    </Icon>
                </n-gi>

            </n-grid>
    

        </div>


        <!-- Input Box -->
        <n-modal v-model:show="inputbox_show" preset="dialog"
                positive-text="Confirm" negative-text="Cancel" 
                @positive-click="changeInputVal()" @negative-click="inputbox_show = false" >

                <template #header>
                    <div class="modalHeading">Input Value</div>
                </template>
        
            <n-input-number  class="inputvalue" v-model:value="inputbox_value" size="large" :min="1" :step="5"                         
                            :on-blur="() => {
                                if(checkInput(inputbox_value))
                                {
                                    inputbox_value = $data[cata[cata_active]][itm_ref].value
                                }
                            }"
            />
            
        </n-modal>



        <!-- Name box -->
        <n-modal v-model:show="namebox_show" preset="dialog" 
                positive-text="Confirm" negative-text="Cancel" 
                @positive-click="changeName()" @negative-click="namebox_show = false" >

            <template #header>
                <div class="modalHeading">Input Category</div>
            </template>
        
            <n-input class="inputvalue" :value="namebox_value" size="large" 
            :on-update:value="(inp) => {
                namebox_value = inp.replace('  ', ' ')
            }"
            :on-blur="() => {
                if(checkInput(namebox_value)) {
                    namebox_value = $data[cata[cata_active]][itm_ref].name
                }
            }"/>
            
        </n-modal>


        <!-- Excludes -->
        <n-modal v-model:show="showexcludes" preset="dialog"
                positive-text="Confirm" negative-text="Cancel"
                @positive-click="changeExcludes()" @negative-click="showexcludes = false" >

            <template #header>
                <div class="modalHeading" >Choose Excludes</div>
            </template>
        
            <n-checkbox-group :value="showexcludes_value" style="font-family: 'roboto-medium';color: rgb(77,77,77);"
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
                <div class="modalHeading">Input Value</div>
            </template>
            
            <n-space vertical> 
            <n-select class="inputvalue" size="large" v-model:value="showmonthly_value" placeholder="Please select Recurser"
                      :options="[...$data[cata[cata_active]][itm_ref].enteriesPerMonth.keys()].map(i => {
                                return {
                                    label:getValuePerMonthName(i)
                                    ,value:i
                                    }
                                })"
                      @update:value="() => {showmonthly_input = true;showmonthly_input_value = $data[cata[cata_active]][itm_ref].enteriesPerMonth[
                                            $data[cata[cata_active]][itm_ref].enteriesPerMonth.length - showmonthly_value - 1]}"/>   
                      
            <n-input-number class="inputvalue" size="large" :disabled="!showmonthly_input" v-model:value="showmonthly_input_value" min="1" />
            </n-space>

        </n-modal>


        <!-- Date Picker  -->
        <n-modal v-model:show="showdatepicker" preset="dialog">
            
            <template #header>
                <div class="modalHeading">Change Initialized Date</div>
            </template>


            <div style="margin-left:7.5%;margin-top: 15px;">
                <n-date-picker type="date"
                format="dd-MMM-yyyy" size="large"
                :actions="[]"
                :default-value="getinit()"
                :on-update:value="value => changeDate(value)"
                :is-date-disabled="initdate"/>
                <div class="smallText" v-show="(!$data.history.devmode) && (cata_active != 3)">
                    <u>Note:</u> Initialized Date cannot be further than Category's first entery's date
                </div>
            </div>
        </n-modal>


        <!-- DateSpan Picker  -->
        <n-modal v-model:show="showspan" preset="dialog">
           
            <template #header>
                <div class="modalHeading">Pick Base Span</div>
            </template>
           
            <div style="margin-left:7.5%;margin-top: 10px;font-family: 'roboto-medium';color:rgb(77, 77, 77)">
                <n-date-picker type="daterange"
                format="dd-MMM-yyyy"
                :actions="['confirm','clear']"
                :default-value="[$data[cata[cata_active]][itm_ref].spantill[0],
                                 $data[cata[cata_active]][itm_ref].spantill[1]]"
                :on-update:value="value => changeDateRange(value)"
                />
            </div>

        </n-modal>


        <!-- Switch  -->
        <n-modal v-model:show="showswitch" preset="dialog">
            
            <template #header>
                <div class="modalHeading">Toggle</div>
            </template>
            
            
            <div class="inputtext">Homepage Logging
                <n-switch :value="$data[cata[cata_active]][itm_ref].homelog" 
                :on-update:value="updateDevModeVal"
                style="float: right; margin-top: 6px;padding-right: 15px;"></n-switch>
            </div>
        </n-modal>
        

        <!-- Exception Modal -->
        <n-modal v-model:show="expMdl" preset="dialog" title="Dialog">
            <template #header>
                <div class="modalHeading" >{{ expMdl_msg }}</div>
            </template>
            
        </n-modal>

    </div>

    <br><br>
    <div v-if="cata_active != 3" style="margin-left: 10%;margin-right: 10%;">

        <div class="cat_head">HISTORY</div><br>
        <div v-for="(i,n) in $data[cata[cata_active]][itm_ref].track.slice().reverse()" :key="n" style="padding-bottom: 1px;">
            <n-card hoverable :title="getDateString(i.date)" size="small" style="text-align: center;">
                
                <div style="font-size: 20px;margin-top:-10px; font-family: 'roboto-bold';color:rgb(77, 77, 77)">₹ {{i.value }}</div>
                
                <div v-if="cata_active != 0" style="padding-bottom: 20px;">
                    <div style="font-size: 15px;font-weight: bold; float: left;">Name: {{ i.name }}</div><br>
                    <div style="font-size: 15px;font-weight: bold; float: left; position: absolute;">Mode: {{  i.mode }}</div>
                </div>

                <div style="display: flex;flex-direction: row;float: right; margin-top: -28px;" >
                    <Icon style=" margin-right: 7px;" size="24"
                            @click="deleteentery_show = true;
                            deleteentery_show_index = $data[cata[cata_active]][itm_ref].track.length - n - 1;
                            console.log(deleteentery_show_index)">

                        <delete16-regular />
                    </Icon>

                    <Icon size="24"
                          @click="editprevvalue_show = true; 
                          editprevvalue_show_index = $data[cata[cata_active]][itm_ref].track.length - n - 1;
                          editprevvalue_show_value = $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index].value;
                          //    improve
                            parseSetDate()

                          if(cata_active != 0){editprevvalue_show_name = $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index].name
                                                                editprevvalue_show_mode = $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index].mode}">

                        <edit16-regular />
                    </Icon>

                    </div>
            </n-card>
        </div>
    </div>

    <!-- Change Price -->
    <n-modal v-model:show="editprevvalue_show" preset="dialog"
                positive-text="Confirm" negative-text="Cancel" 
                @positive-click="changePrevValue()" @negative-click="editprevvalue_show = false;editprevvalue_show_index = null" >

            <template #header>
                <h3 class="modalHeading" v-if="$data[cata[cata_active]].hasOwnProperty(itm_ref)">New Value for {{ $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index].date }}</h3>
            </template>

            <n-grid :cols="2">
                <n-gi class="inputtext">
                    Value: 
                </n-gi>
                 <n-gi class="inputvalue">
                    <n-input-number size="large" v-model:value="editprevvalue_show_value" min="1" 
                                    :on-blur="() => {
                                        if(checkInput(editprevvalue_show_value)) {
                                            editprevvalue_show_value = editprevvalue_show_value = $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index].value
                                        }
                                    }"
                    />
                 </n-gi>
                 
                 <n-gi class="inputtext">
                    Initialized: 
                </n-gi>
                <n-gi>
                    <n-date-picker size="large" class="inputvalue" format="dd-MMM-yyyy" v-model:value="editprevvalue_show_date" type="date" 
                                    :is-date-disabled="(ts) => {
                                        if($data.history.devmode == true)
                                        { return false }

                                        return checkDateInRange(getParseDate($data[cata[cata_active]][itm_ref].init),Date.now(),ts)
                                       }"/>
                </n-gi>

                 <n-gi class="inputtext" v-if="cata_active != 0">
                    Item Name: 
                 </n-gi>
                 <n-gi>
                    <n-input size="large" class="inputvalue" v-if="cata_active != 0" :value="editprevvalue_show_name" type="text" 
                        :on-update:value="(inp) => {
                            editprevvalue_show_name = inp.replace('  ', ' ')
                        }"
                        :on-blur="() => {
                            if(checkInput(editprevvalue_show_name))
                            {
                                editprevvalue_show_name = $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index].name
                            }
                        }"/>
                </n-gi>

                <n-gi class="inputtext" v-if="cata_active != 0">
                    Mode:
                </n-gi>
                 <n-gi>
                    <n-input size="large" class="inputvalue" v-if="cata_active != 0" :value="editprevvalue_show_mode" type="text" 
                        :on-update:value="(inp) => {
                            editprevvalue_show_mode = inp.replace('  ', ' ')
                        }"
                        :on-blur="() => {
                            if(checkInput(editprevvalue_show_mode))
                            {
                                editprevvalue_show_mode = $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index].mode
                            }
                        }"/>
                </n-gi>
            </n-grid>
            
    </n-modal>

    <!-- Delete Entery -->
    <n-modal v-model:show="deleteentery_show" preset="dialog"
                positive-text="Confirm" negative-text="Cancel" 
                @positive-click="deleteEntery()" @negative-click="deleteentery_show = false">

            <template #header>
                <h3 class="modalHeading">Confirm to Delete this Entery</h3>
            </template>
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
         NCheckbox,NSelect,NDatePicker,NSwitch } from 'naive-ui';

const cata = ['required','needs','wants','base']
const getMonthNm = ['Jan','Feb','Mar','Aprl','May','June','July','Aug','Sept','Oct','Nov','Dec']
let cata_active = null

const reload = ref(false)

const inputbox_show = ref(false)
const inputbox_value = ref(null)

const namebox_show = ref(false)
const namebox_value = ref(null)

const showswitch = ref(false)

const showexcludes = ref(false)
const showexcludes_value = ref([])

const showmonthly = ref(false)
const showmonthly_value = ref(null)
const showmonthly_input = ref(false)
const showmonthly_input_value = ref(null)

const showspan = ref(false)

const showdatepicker = ref(false)

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
    _catagory:String
})

const itm_ref = parseInt(props._catagory.substring(props._catagory.length-1))

const $data = inject('$data')  

const Router = useRouter()

let _date = new Date()

if(props._catagory.substring(0, 8) == 'Required'){
    cata_active = 0;
}
else if(props._catagory.substring(0, 5) == 'Needs'){
    cata_active = 1;
}
else if(props._catagory.substring(0, 4) == 'Base'){
    cata_active = 3;
}
else{
    cata_active = 2;
}

const _thetitle = ref($data[cata[cata_active]][itm_ref].name)


function getExcludes(exc)
{
    let weeks = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    let toreturn = ""
    let ifone = false
    
    if(exc.length >= 1){

        for(let i = 0; i < exc.length;i++)
        {
            if(ifone) { toreturn += ','}

            toreturn += ` ${weeks[exc[i]]}` 
            ifone = true

            if(i == 2)
            {
                if(exc.length > 3)
                {
                    toreturn += "..."
                }
                
                break;
            }
        }

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
    if(cata_active == 3)
    {
        let index = $data.history.day.findLastIndex((element) => {
            if(element.date == $data[cata[cata_active]][itm_ref].init)
            {
                return true;
            }
            return false
        })
        
        $data.history.day[index].spend[4] += (inputbox_value.value - $data[cata[cata_active]][itm_ref].value)
    }
    
    $data[cata[cata_active]][itm_ref].value = inputbox_value.value

    localStorage.setItem("_DATA_", JSON.stringify($data))

    inputbox_value.value = null
    inputbox_show.value = false

    reload.value = !reload.value
    console.log("Done")
}

function changeName()
{
    if(namebox_value.value.length == 0)
    {
        expMdl_msg = "Category name cannot be empty!"
        expMdl.value = true
        return 0;
    }

    if(namebox_value.value.slice(0,1) == ' ') {
        namebox_value.value = namebox_value.value.slice(1,namebox_value.value.length)
    }

    if(namebox_value.value.slice(-1) == ' ') {
        namebox_value.value = namebox_value.value.slice(0,namebox_value.value.length - 1)
    }

    $data[cata[cata_active]][itm_ref].name = namebox_value.value
    localStorage.setItem("_DATA_", JSON.stringify($data))
   
    _thetitle.value = namebox_value.value

    namebox_value.value = null
    namebox_show.value = false

    reload.value = !reload.value
    console.log("Done")
}

function changeExcludes()
{
    
    $data[cata[cata_active]][itm_ref].excludes = showexcludes_value.value.sort()
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

    let itm_prev_index = $data.history.day.findLastIndex((element) => {
        return element.date == $data[cata[cata_active]][itm_ref].init
    })

    $data.history.day[itm_prev_index].spend[4] -= $data[cata[cata_active]][itm_ref].value

    let ind = $data.history.day.findLastIndex((ele) => {
        return getParseDate(ele.date) <= dte.valueOf() 
    })

    let toadd = 1

    if(ind == -1) {
        ind = 0
        toadd = 0
    }

    if(getParseDate($data.history.day[ind].date) == dte.valueOf())
    {
        $data.history.day[ind].spend[4] += $data[cata[cata_active]][itm_ref].value
    }
    else
    {
        $data.history.day.splice(ind+toadd,0,{
            "date":`${dte.getDate()}-${dte.getMonth() +1}-${dte.getFullYear()}`,
            "spend":[0,0,0,0,$data[cata[cata_active]][itm_ref].value]
        })
    }



    $data[cata[cata_active]][itm_ref].init = `${dte.getDate()}-${dte.getMonth() +1}-${dte.getFullYear()}`

    localStorage.setItem("_DATA_", JSON.stringify($data))
    showdatepicker.value = false

    reload.value = !reload.value
    console.log("Done")

}

function changeDateRange(range)
{
    if(range[0] == range[1])
    {
        expMdl_msg = 'Cannot have same start and end date'
        expMdl.value = true  
    }
    else
    {
        $data[cata[cata_active]][itm_ref].spantill[0] = range[0]
        $data[cata[cata_active]][itm_ref].spantill[1] = range[1]

        localStorage.setItem("_DATA_", JSON.stringify($data))

        showspan.value = false

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

function editHistory(diff,date,fnk,ndte = 0)
{
    // use different sorting methord
    let index = $data.history.day.length - 1
    let increment = 0

    if(fnk)
    {
        let matchdte = false

        for(; index>=0;index--)
        {
            
            let spl = $data.history.day[index].date.split('-')
            if(date >= Date.parse(`${spl[2]}/${spl[1]}/${spl[0]}`))
            { 
                if(date == Date.parse(`${spl[2]}/${spl[1]}/${spl[0]}`))
                {
                    matchdte = true
                }
                break;
            }
        }

        if((index == -1) || (!matchdte))
        {
            increment = 1
            $data.history.day.splice(index+increment,0,{
                "date": `${ndte.getDate()}-${ndte.getMonth() + 1}-${ndte.getFullYear()}`,
                "spend":[0,0,0,0]
            })
        }
    }
    else 
    {
        for(; index>=0;index--)
        {
            if($data.history.day[index].date == date)
            { break;}
        }
    }
    

    $data.history.day[index + increment].spend[0] += diff
    $data.history.day[index + increment].spend[cata_active+1] += diff
}


function changePrevValue()
{
    // debugger;

    let moneydiff = editprevvalue_show_value.value - $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index.value].value
    let newDte = new Date(editprevvalue_show_date.value)
    
    if(newDte.valueOf() != getParseDate($data[cata[cata_active]][itm_ref].track[editprevvalue_show_index.value].date))
    {

        let latestupd = $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index.value].date.split('-')
        let monDif = ((newDte.getFullYear() - parseInt(latestupd[2])) * 12) + (newDte.getMonth() - parseInt(latestupd[1]) + 1)

        if(editprevvalue_show_date.value < getParseDate($data[cata[cata_active]][itm_ref].init))
        {
            console.log("init changed!!")
            $data[cata[cata_active]][itm_ref].init = `${newDte.getDate()}-${newDte.getMonth() + 1}-${newDte.getFullYear()}`
        }

        if(monDif > 0)
        {
            let endstupd = $data[cata[cata_active]][itm_ref].track[$data[cata[cata_active]][itm_ref].track.length - 1].date.split('-') 
            let endDif = ((parseInt(endstupd[2]) - parseInt(latestupd[2])) * 12) + (parseInt(endstupd[1]) - parseInt(latestupd[1]))

            $data[cata[cata_active]][itm_ref].enteriesPerMonth[$data[cata[cata_active]][itm_ref].enteriesPerMonth.length - endDif - 1] -= 1
            $data[cata[cata_active]][itm_ref].valuePerMonth[$data[cata[cata_active]][itm_ref].valuePerMonth.length - endDif - 1] -= $data[
                  cata[cata_active]][itm_ref].track[editprevvalue_show_index.value].value


            for(;monDif > endDif;endDif++)
            {
                $data[cata[cata_active]][itm_ref].enteriesPerMonth.push(0)
                $data[cata[cata_active]][itm_ref].valuePerMonth.push(0)
            }  

            $data[cata[cata_active]][itm_ref].enteriesPerMonth[$data[cata[cata_active]][itm_ref].enteriesPerMonth.length - endDif + monDif - 1] += 1
            $data[cata[cata_active]][itm_ref].valuePerMonth[$data[cata[cata_active]][itm_ref].valuePerMonth.length - endDif + monDif - 1] += editprevvalue_show_value.value

        }

        else if(monDif < 0)
        {

            let ststupd = $data[cata[cata_active]][itm_ref].track[0].date.split('-') 
            let stDif = ((parseInt(latestupd[2]) - parseInt(ststupd[2])) * 12) + parseInt(latestupd[1]) - (parseInt(ststupd[1]))

            $data[cata[cata_active]][itm_ref].enteriesPerMonth[stDif] -= 1
            $data[cata[cata_active]][itm_ref].valuePerMonth[stDif] -= $data[
                  cata[cata_active]][itm_ref].track[editprevvalue_show_index.value].value

            for(;(-monDif) > stDif;stDif++)
            {
                $data[cata[cata_active]][itm_ref].enteriesPerMonth.splice(0,0,0)
                $data[cata[cata_active]][itm_ref].valuePerMonth.splice(0,0,0)
            }  

            $data[cata[cata_active]][itm_ref].enteriesPerMonth[(-monDif) - stDif] += 1
            $data[cata[cata_active]][itm_ref].valuePerMonth[(-monDif) - stDif] += editprevvalue_show_value.value
        }

        editHistory(-($data[cata[cata_active]][itm_ref].track[editprevvalue_show_index.value].value),
                         $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index.value].date,false)
    
        editHistory(editprevvalue_show_value.value, editprevvalue_show_date.value,true,newDte)
    

        $data[cata[cata_active]][itm_ref].track.splice(editprevvalue_show_index.value,1,)

        let index = $data[cata[cata_active]][itm_ref].track.length - 1

        for(; index>=0;index--)
        {
            if(editprevvalue_show_date.value >= getParseDate($data[cata[cata_active]][itm_ref].track[index].date))
            { 
                break;
            }
        }

        $data[cata[cata_active]][itm_ref].track.splice(index+1,0,{

            "date":`${newDte.getDate()}-${newDte.getMonth() + 1}-${newDte.getFullYear()}`,
            "value":editprevvalue_show_value.value
        })

        editprevvalue_show_index.value = index +1
        $data[cata[cata_active]][itm_ref].totalspend += moneydiff

        drop_zro($data[cata[cata_active]][itm_ref])
    }
    else
    {
        if(moneydiff != 0)
        {

            let latestupd = $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index.value].date.split('-')
            let endstupd = $data[cata[cata_active]][itm_ref].track[$data[cata[cata_active]][itm_ref].track.length - 1].date.split('-') 
            let endDif = ((parseInt(endstupd[2]) - parseInt(latestupd[2])) * 12) + (parseInt(endstupd[1]) - parseInt(latestupd[1]))

            $data[cata[cata_active]][itm_ref].valuePerMonth[$data[cata[cata_active]][itm_ref].valuePerMonth.length - endDif - 1] += moneydiff

            $data[cata[cata_active]][itm_ref].totalspend += moneydiff
            $data[cata[cata_active]][itm_ref].track[editprevvalue_show_index.value].value += moneydiff

            editHistory(moneydiff,$data[cata[cata_active]][itm_ref].track[editprevvalue_show_index.value].date,false)
        }
    }
    
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
    
    localStorage.setItem("_DATA_", JSON.stringify($data))

    editprevvalue_show_index.value = 0
    editprevvalue_show_value.value = null
    editprevvalue_show.value = false

    reload.value = !reload.value
    console.log("Done")
}

function deleteEntery()
{
    
    let deletedfeild = false

    if(cata_active == 3)
    {

        for(let i = $data.history.day.length - 1; i > 0; i--)
        {
            if($data.history.day[i].date == $data["base"][itm_ref].init)
            {
                $data.history.day[i].spend[4] -= $data["base"][itm_ref].value
                break;
            }
        }

        delete $data["base"][itm_ref]
        $data["base"].length -= 1

        for(let j = itm_ref;j<$data[cata[cata_active]].length;j++)
        {
            $data["base"][j] = $data["base"][j+1]
            delete $data[cata[cata_active]][j+1]
        }

        deletedfeild = true
    }
    else
    {

        let diff = -($data[cata[cata_active]][itm_ref].track[deleteentery_show_index.value].value)
    
        editHistory(diff,$data[cata[cata_active]][itm_ref].track[deleteentery_show_index.value].date)
    
        if($data[cata[cata_active]][itm_ref].track.length == 1)
        {
            delete $data[cata[cata_active]][itm_ref]
            $data[cata[cata_active]].length += -1
            
            for(let i = itm_ref;i<$data[cata[cata_active]].length;i++)
            {
                $data[cata[cata_active]][i] = $data[cata[cata_active]][i+1]
                delete $data[cata[cata_active]][i+1]
            }
    
            deletedfeild = true
        } 
        
        else 
        {
            let curstupd = $data[cata[cata_active]][itm_ref].track[deleteentery_show_index.value].date.split('-')  
            let endstupd = $data[cata[cata_active]][itm_ref].track[$data[cata[cata_active]][itm_ref].track.length - 1].date.split('-') 
            let endDif = ((parseInt(endstupd[2]) - parseInt(curstupd[2])) * 12) + (parseInt(endstupd[1]) - parseInt(curstupd[1]))
    
            $data[cata[cata_active]][itm_ref].valuePerMonth[$data[cata[cata_active]][itm_ref].valuePerMonth.length - 1 - endDif] += diff
            $data[cata[cata_active]][itm_ref].enteriesPerMonth[$data[cata[cata_active]][itm_ref].enteriesPerMonth.length - 1 - endDif] += -1
    
            drop_zro($data[cata[cata_active]][itm_ref])
    
            $data[cata[cata_active]][itm_ref].totalspend += diff
            $data[cata[cata_active]][itm_ref].track.splice(deleteentery_show_index.value,1)
        }  
    }

    deleteentery_show_index.value = null
    deleteentery_show.value = false
    
    localStorage.setItem("_DATA_", JSON.stringify($data))
    
    console.log("Done")
    
    if(deletedfeild)
    {
        Router.go(-1)
    }
    else
    {
        reload.value = !reload.value
    }
}

function lenthCheck(str)
{
    if(str.length > 12)
    { 
        return String(str.slice(0,11) + "...")
    }
    return str
}

function initdate(ts)
{
    if($data.history.devmode == true) {return false}

    if(cata_active != 3)
    {         
        if(ts <= getParseDate($data[cata[cata_active]][itm_ref].track[0].date))
        {
            return false
        }
    }
    else
    {
        if(ts <= _date.valueOf())
        {
            return false
        }
    }
    
    return true
}

function getinit()
{
    return getParseDate($data[cata[cata_active]][itm_ref].init)
}

function updateDevModeVal()
{
    $data[cata[cata_active]][itm_ref].homelog = !$data[cata[cata_active]][itm_ref].homelog
    localStorage.setItem("_DATA_", JSON.stringify($data))
    
    reload.value = !reload.value
}

function checkDateInRange(dleft,dright,date)
{
    if((date >= dleft) && (date<= dright))
    {
        return false
    }
    return true
}


function drop_zro(obj_ref)
{
    while(obj_ref.enteriesPerMonth[0] == 0)
    {
        obj_ref.enteriesPerMonth.shift()
    }

    while(obj_ref.valuePerMonth[0] == 0)
    {
        obj_ref.valuePerMonth.shift()
    }

    while(obj_ref.enteriesPerMonth[$data[cata[cata_active]][itm_ref].enteriesPerMonth.length - 1] == 0)
    {
        obj_ref.enteriesPerMonth.pop()
    }

    while(obj_ref.valuePerMonth[$data[cata[cata_active]][itm_ref].valuePerMonth.length - 1] == 0)
    {
        obj_ref.valuePerMonth.pop()
    }
}

function printBaseRangeDates()
{
    let st = new Date($data[cata[cata_active]][itm_ref].spantill[0])
    let ed = new Date($data[cata[cata_active]][itm_ref].spantill[1])

    if(st.getFullYear() == ed.getFullYear())
    {
        return `${st.getDate()} ${getMonthNm[st.getMonth()]} -
                ${ed.getDate()} ${getMonthNm[ed.getMonth()]}`
    }

    return `${getMonthNm[st.getMonth()]} ${st.getFullYear() - 2000} -
            ${getMonthNm[ed.getMonth()]} ${ed.getFullYear() - 2000}`
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

function getValuePerMonthName(i)
{
    let a = $data[cata[cata_active]][itm_ref].track[$data[cata[cata_active]][itm_ref].track.length - 1].date.split('-')[1]
    a = a - i
    while(a < 1)
    {
        a = a + 12
    }
    return `${$data[cata[cata_active]][itm_ref].enteriesPerMonth.length -  i} - ${getMonthNm[a - 1]}`
}

function getDateString(val)
{
    const dt = val.split('-');
    return `${dt[0]} ${getMonthNm[dt[1] - 1]} ${dt[2]}` 
}

function checkInput(str)
{
    if( (str == null) || (str.length == 0))
    {
        expMdl_msg = 'Input Cannot Be Empty!'
        expMdl.value = true 
        return true
    } 
    return false   
}

function parseSetDate()
{
    editprevvalue_show_date.value = getParseDate($data[cata[cata_active]][itm_ref].track[editprevvalue_show_index.value].date)

    console.log(editprevvalue_show_date.value)
    console.log($data[cata[cata_active]][itm_ref].track[editprevvalue_show_index.value].date);
}

function getParseDate(str)
{
    let dateparts = str.split('-')
    return Date.parse(`${dateparts[2]}/${dateparts[1]}/${dateparts[0]}`)
}




</script>   

<style scoped>
.cat_head{
    font-size: 19px;
    padding-bottom: 7px;
    padding-top:10px;
    color: rgb(112, 112, 112);
    text-align: center;
    font-weight: bolder;
    font-family: 'roboto-medium'
}

.templateHeading{
    font-size: 25px;
    color: grey;
    margin-right: 18%;
    font-family: 'roboto-bold'
}

.statHeading{
    font-family: 'roboto-medium';
    color: rgb(77,77,77);
}

.statLable{
    font-family: 'roboto-bold';
    font-size: 17px;
    margin-bottom: -10px;
}

.gridfeild{
    font-family: 'roboto-medium';
    color: rgb(77,77,77);
    font-size: 17px;
    padding-left: 30px;
}

.gridvalue{
    padding-left: 30px;
    font-family: 'roboto-regular';
    color:grey(77,77,77);
    font-size: 17px;
}

.gridicon{
    float:right;
    padding-right: 25px;
    padding-top: 4px;
}

.modalHeading{
    padding-left: 10px;
    font-family: 'roboto-medium';
    color: rgb(77,77,77);
    font-size: 20px;
}

.inputvalue{
    font-family: 'roboto-regular';
    color: rgb(77,77,77);
    font-size: 17px;
}

.inputtext{
    margin-left:7.5%;
    font-family:'roboto-medium';
    color: rgb(88, 88, 88);
    font-size: 18px;
}

.smallText{
    font-family: 'roboto-medium';
    color: rgb(77,77,77);
    margin-top: 15px;
}

#deviation{
      margin-top: -8px;
      color: grey;
}

</style>