<template>
    <n-modal v-model:show="toshowModal" preset="dialog">
        <template #header>
            <div class="header">New Update</div>
        </template>
    
        
        <h3 v-if="updateavl" class="version_info">{{ this_version }} -> {{ latest_version }}</h3>
        <h3 v-else class="version_info">{{ latest_version }} </h3>
        
        <n-scrollbar class="scrollbar">

            
            <h2 class="info_heading">New Features</h2>
            <ul class="info_content">
                <li>
                    <p>Added <strong>Developer Mode Toggle</strong> in slide menu to hide App critical functions.</p>
                </li>
                <li>
                    <p>Added <strong>Filters</strong> In <strong>Spend History</strong> view for better expenditure
                        analysis.</p>
                </li>
                <li>
                    <p>Added <strong>Group By</strong> option in <strong>Spend History</strong> view for grouping
                        expenditure.</p>
                </li>
                <li>
                    <p>Added <strong>Base Template</strong> in <strong>Spend History</strong> page.</p>
                </li>
                <li>
                    <p>Added <strong>Day of Week</strong> in <strong>Spend History</strong> page.</p>
                </li>
                <li>
                    <p>Added <strong>Payment Mode Button</strong> in <strong>Add Expense</strong> page.</p>
                </li>
                <li>
                    <p>Added <strong>Decline</strong> button for hiding acknowledge item for the day in  <strong>Main</strong> page.</p>
                </li>
                <li>
                    <p>Improved <strong>UI</strong> of the App.</p>
                </li>
                <li>
                    <p>Added <strong>Past Date Options</strong> in <strong>Add Expense</strong> page.</p>
                </li>
            </ul>

            <h2 class="info_heading">Structure Changes</h2>
            <ul class="info_content"> 
                <li>
                    <p>Replaced <strong>Span-from</strong> from <strong>Required Template</strong> for <strong>Homepage
                            logging toggle</strong> which can be toggled in it&#39;s item-view page. Only those required
                        items will be logged on homepage until there toggle is on.</p>
                </li>
                <li>
                    <p>Added more <strong>Validation data</strong> in Item-Details view.</p>
                </li>
                <li>
                    <p>Added <strong>upgradeation script</strong> for changing Local Storage JSON Structure.</p>
                </li>
                <li>
                    <p><strong>Initialized dates</strong> now in required don&#39;t pass the first entry&#39;s date.</p>
                </li>
            </ul>

            <h2 class="info_heading">Bug Fixes</h2>
            <ul class="info_content">
                <li>
                    <p>Fixed <strong>Empty Spend</strong> Name.</p>
                </li>
                <li>
                    <p>Fixed <strong>Wild Input Fields</strong>.</p>
                </li>
                <li>
                    <p>Fixed <strong>Span-till&#39;s Date Picker</strong>.</p>
                </li>
                <li>
                    <p>Fixed <strong>Modal not closing</strong> on Delete Values.</p>
                </li>
                <li>
                    <p>Fixed <strong>Registration of spending</strong> when the start span date of required category is
                        future and not today.</p>
                </li>
                <li>
                    <p>Fixed editing <strong>Item specific date</strong> in required doesn&#39;t works.</p>
                </li>
                <li>
                    <p>Fixed 0 while adding item to a existing catagory past date.</p>
                </li>
                <li>
                    <p>Fixed <strong>Delete entries</strong> doesn&#39;t work this year when the catagory is not fully
                        filled.</p>
                </li>
                <li>
                    <p>Fixed <strong>Main Page</strong> Required template logging.</p>
                </li>
                <li>
                    <p>Fixed <strong>View Per Month</strong> Single Entery Bug.</p>
                </li>
                <li>
                    <p>Fixed <strong>MainPage </strong> Required template <strong>Default Value</strong> Bug.</p>
                </li>
                <li>
                    <p>Fixed <strong>Overflowing </strong> of the user inputed data in various divs.</p>
                </li>
                <li>
                    <p>Fixed <strong>Validate Data </strong> In Add Expense Page for <strong>Base Template</strong> .</p>
                </li>
            </ul>

            <h2 class="info_heading">Minor Changes</h2>
            <ul class="info_content">
                <li>
                    <p>Added function to <strong>separate money value</strong> with commas too in Spend History view.</p>
                </li>
                <li>
                    <p>View wants, then needs, then required in <strong>Spend History</strong> page.</p>
                </li>
                <li>
                    <p>Added <strong>month names</strong> in the edit menu for entries and values per month.</p>
                </li>
                <li>
                    <p>Adjusted <strong>Spacing</strong> in various pages.</p>
                </li>
            </ul>

        </n-scrollbar>

        <div v-if="ScriptAvailable" class="scriptLines">
            <n-button v-show="($data.history.devmode) && (script_status == 0)" type="success" @click="executeUpdateScripts()">
                Execute Script 
            </n-button>
            <div v-show="(!$data.history.devmode)">
                {{ toexicuteauto() }}
            </div>

            <div v-show="script_status == 1" style="color: rgb(73, 73, 73);">
                Running Update script...
            </div>
            <div v-show="script_status == 2" style="color: rgb(50, 117, 50);">
                Script Done!
            </div>
        </div>

    </n-modal>
</template>

<script setup>

import { NButton, NModal, NScrollbar } from 'naive-ui';
import { ref,inject } from 'vue';

const props = defineProps({
        tojustview:Boolean
})

const $globaldata = inject('$globaldata')
const $data = inject('$data')

console.log("App version -> " + $data.history.version)

const latest_version = "1.0.0"
let this_version = ""

let toshowModal = ref(false)
let script_status = ref(0)

let runIndex = 0
let rnjustview = 0
let ScriptAvailable = false
let updateavl = true


console.log("inUpdates")

if($data.history.version == undefined){
    this_version = "0.9.0"
}
else{
    this_version = $data.history.version
}
// this_version = "0.9.4"


function checkupgradeScripts()
{

    let availablescripts = Object.keys(upgradeScripts)
    console.log(availablescripts)

    let this_v_arry = this_version.replace('.','')

    for(let i = availablescripts.length - 1; i>=0;i--)
    {
        let inlist = availablescripts[i].replace('.','')
        if(parseFloat(inlist) <= parseFloat(this_v_arry))
        {
            runIndex = i  
            break;    
        }
    }

    if(runIndex == availablescripts.length-1)
    {
        return false
    }
    else
    {
        return true
    }
}

function toexicuteauto()
{
    if((!$data.history.devmode) && script_status.value == 0)
    {
        executeUpdateScripts()
    }
}

function executeUpdateScripts()
{

    updateScript_value()
    console.log("Running script now")

    let availablescripts = Object.keys(upgradeScripts)
    for(let i = runIndex; i< availablescripts.length-1;i++)
    {
        upgradeScripts[availablescripts[i+1]]()
    }

    $data.history.version = latest_version
    localStorage.setItem("_DATA_", JSON.stringify($data))

    updateScript_value()
    console.log("Script Done!")
}

function updateScript_value()
{
    script_status.value += 1
}


let upgradeScripts = {

    "0.9.0":function(){
        console.log("Base Script") 
    },

    "0.9.1": function() {
        $data.history.version = "0.9.1"
        console.log("runned 0.9.1")
    },

    "0.9.4": function() {
        $data.history["req_excp"] = []
        console.log("runned 0.9.4")
    }
}

if ((this_version != latest_version) && ($globaldata.showedUpdateOnce == false)) {
    toshowModal.value = true
    $globaldata.showedUpdateOnce = true
    ScriptAvailable = checkupgradeScripts()
    
    if(!ScriptAvailable)
    {
        $data.history.version = latest_version
        localStorage.setItem("_DATA_", JSON.stringify($data))
        console.log("updated!!")
    }

}

else if(props.tojustview > rnjustview)
{
    ScriptAvailable = false
    updateavl = false
    toshowModal.value = true
}

</script>

<style>

.version_info {
    text-align: center;
    color: rgb(78, 78, 78);
    font-family: 'roboto-bold';
    margin-top: 0px;
    margin-bottom: 3px;
    
}

.scrollbar {
    background-color: #78b69a;
    border-radius: 5px 5px 5px 5px;
    padding-left: 7px;
    padding-right: 7px;
    max-height: 550px;
    margin-left: -9px;
    margin-right: -4px;
}

.scriptLines{
    text-align: center;
    margin-top: 7px;
    font-size: medium;
    font-weight: bold;
}

.header{
    font-family: 'roboto-medium';
    font-size: 22px;
    margin-left: 5px;
    color: rgb(77, 77, 77);
}

.info_heading{
    font-family: 'roboto-medium';
    font-size: 21px;
    margin-left: 7px;
}

.info_content{
    font-size: 14.5px;
    text-justify:auto;
}

</style>