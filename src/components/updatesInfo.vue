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
                    <p>Included <strong>View By Templates</strong> and <strong>SubCategories</strong> in <strong>Spendhistory Page</strong>.</p>
                </li>
                <li>
                    <p>Finally Included <strong>Graphs</strong> in <strong>Item Details Page</strong> in <strong>Spendhistory Page</strong>. More improvemnts in upcoming versions.</p>
                </li>
                <li>
                    <p>Included button to <strong>Recalculate VPM & EPM</strong> in <strong>SubCategories</strong> in <strong>Developer options</strong>.</p>
                </li>
            </ul>

            <h2 class="info_heading">Structural Changes</h2>
            <ul class="info_content"> 
                <li>
                    <p>Added <strong>Decimal System</strong>.</p>
                </li>
                <li>
                    <p>Imporved managing of <strong>Scripts</strong> in <strong>Update Script</strong>.</p>
                </li>
            </ul>

            <h2 class="info_heading">Bug Fixes</h2>
            <ul class="info_content">
                <li>
                    <p>Fixed ',' Formatting in <strong>Main Page</strong> and <strong>Spendhistory Page</strong>.</p>
                </li>
                <li>
                    <p>Fixed Category name overflowing in <strong>Item Details Page</strong>.</p>
                </li>
                <li>
                    <p>Fixed <strong>Incorrect</strong> value change in items during moving to the <strong>Past</strong>.</p>
                </li>
                <li>
                    <p>Fixed the Index of the Item in <strong>Router Props</strong>.</p>
                </li>
                <li>
                    <p>Fix the <strong>Incorrect Values</strong> in <strong>Values per Month</strong> and <strong>Enteries per Month</strong> bug.</p>
                </li>
            </ul>

            <!-- <h2 class="info_heading">Minor Changes</h2>
            <ul class="info_content">
                <li>
                </li>

            </ul> -->

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

// Update Scripts
import * as script_v_0 from '../components/updatescripts/version_0_scripts.js'
import * as script_v_1 from '../components/updatescripts/version_1_scripts.js'

console.log(script_v_0);
const props = defineProps({
        tojustview:Boolean
})

const $globaldata = inject('$globaldata')
const $data = inject('$data')

console.log("App version -> " + $data.history.version)

const latest_version = "1.0.4"
let this_version = ""

let toshowModal = ref(false)
let script_status = ref(0)

let runIndex = 0
let rnjustview = 0
let ScriptAvailable = false
let updateavl = true


console.log("inUpdates")

if($data.history.version == undefined){
    this_version = "0.8.9"
}
else{
    this_version = $data.history.version
}
// this_version = "1.0.3"


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
        upgradeScripts[availablescripts[i+1]]($data)
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

    "0.9.0": script_v_0._9_0,
    "0.9.1": script_v_0._9_1,
    "0.9.4": script_v_0._9_4,
    "1.0.4": script_v_1._0_4
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