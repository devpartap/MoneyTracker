<template>
    <n-modal v-model:show="toshowModal" preset="dialog" title="New Update">

    <h4 class="version_info">{{ this_version }} -> {{ latest_version }} </h4>

        <n-scrollbar class="scrollbar">

            

            <h2 id="new-features">New Features</h2>
            <ul>
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
                    <p>Added <strong>Base Template</strong> in <strong>Spend History</strong> page .</p>
                </li>
                <li>
                    <p>Adding <strong>Day of Week</strong> in <strong>Spend History</strong> page .</p>
                </li>
            </ul>
            <h2 id="structure-changes">Structure Changes</h2>
            <ul>
                <li>
                    <p>Replaced <strong>Span-from</strong> from <strong>Required Template</strong> for <strong>Homepage
                            logging toggle</strong> which can be toggled in it&#39;s item-view page. Only those required
                        items will be logged on homepage until there toggle is on.</p>
                </li>
                <li>
                    <p>Added more <strong>Validation data</strong> in Item-Details view.</p>
                </li>
                <li>
                    <p>Added <strong>installation script</strong> for changing Local Storage JSON Structure.</p>
                </li>
                <li>
                    <p><strong>Initialized dates</strong> now in required don&#39;t pass the first entry&#39;s date.</p>
                </li>
            </ul>
            <h2 id="bug-fixes">Bug Fixes</h2>
            <ul>
                <li>
                    <p>Fixed <strong>Empty Spend</strong> Name</p>
                </li>
                <li>
                    <p>Fixed <strong>Wild Input Fields</strong></p>
                </li>
                <li>
                    <p>Fixed <strong>Span-till&#39;s Date Picker</strong></p>
                </li>
                <li>
                    <p>Fixed <strong>Modal not closing</strong> on Delete Values</p>
                </li>
                <li>
                    <p>Fixed <strong>Registration of spending</strong> when the start span date of required category is
                        future and not today.</p>
                </li>
                <li>
                    <p>Fixed editing <strong>Item specific date</strong> in required doesn&#39;t works</p>
                </li>
                <li>
                    <p>Fixed 0 while adding item to a existing catagory past date.</p>
                </li>
                <li>
                    <p>Fixed <strong>Delete entries</strong> doesn&#39;t work this year when the catagory is not fully
                        filled</p>
                </li>
            </ul>
            <h2 id="minor-changes">Minor Changes</h2>
            <ul>
                <li>
                    <p>Added function to <strong>separate money value</strong> with commas too in Spend History view.</p>
                </li>
                <li>
                    <p>View wants, then needs, then required in <strong>Spend History</strong> page.</p>
                </li>
                <li>
                    <p>Added <strong>month names</strong> in the edit menu for entries and values per month</p>
                </li>
            </ul>

        </n-scrollbar>

        <div v-if="checkInstallScripts()">
            <n-button v-show="($data.history.devmode) && (scrypt_done == 0)" type="success" @click="executeUpdateScripts()">
                Execute Script
            </n-button>
            <div v-if="(!$data.history.devmode)">
                {{ executeUpdateScripts() }}
            </div>

            <div v-if="scrypt_done == 1">
                Running Update script 
            </div>
            <div v-show="scrypt_done == 2">
                ScriptDone!
            </div>
        </div>

    </n-modal>
</template>

<script setup>

import { NButton, NModal, NScrollbar } from 'naive-ui';
import { ref,inject } from 'vue';

const $data = inject('$data')

console.log("App version -> " + $data.history.version)

const latest_version = "0.9.1"
let this_version = ""

let toshowModal = ref(false)
let scrypt_done = ref(0)

let runIndex = null


if($data.history.version == undefined){
    this_version = "0.9.0"
}
else{
    this_version = $data.history.version
}


if (this_version != latest_version) {
    toshowModal.value = true
}


function checkInstallScripts()
{
    // debugger;
    let availablescripts = Object.keys(installScripts)
    console.log(availablescripts)

    let this_v_arry = this_version.split('.')

    runIndex = availablescripts.findIndex((element) => {
        let element_arry = element.split('.')
        if(this_v_arry[0] > element_arry[0]){
            return true
        }
        else if(this_v_arry[1] > element_arry[1]){
            return true
        }
        else if(this_v_arry[2] > element_arry[2]){
            return true
        }
    })

    if(runIndex == 0)
    {
        runIndex = null
        return false
    }
    if(runIndex == -1)
    {
        runIndex = availablescripts.length - 1
        return true
    }
    return false

}

function executeUpdateScripts()
{
    scrypt_done.value = 1
    console.log("running script now")
    scrypt_done.value = 2
}


let installScripts = {
    "0.9.1": function() {
        $data.history.version = "0.9.2"
    }
}

function save()
{
    localStorage.setItem("_DATA_", JSON.stringify($data))
}

</script>

<style>.version_info {
    text-align: center;
    color: rgb(78, 78, 78);
    font-weight: bold;
    margin-top: 0px;
    margin-bottom: 3px;
}

.scrollbar {
    background-color: #78b69a;
    border-radius: 5px 5px 5px 5px;
    padding-left: 7px;
    padding-right: 7px;
    max-height: 500px;
    margin-left: -9px;
    margin-right: -4px;
}</style>