<template>

    <div>
        <Icon size="35" @click="$router.go(-1)" style="margin-top: 10px; text-align: left;">
            <arrow-circle-left16-Regular />
        </Icon>

        <h1 style="text-align: center;margin-top: -47px;">
            Add Expense
        <hr>
        </h1>
        <br>
    </div>

    <n-space vertical size="large">

        <n-select v-model:value="Tvalue" :options="Template" 
            @update:value="GetSub" />
        <n-select v-model:value="Svalue" :disabled="disableSub" 
            :options="SubTemplate" @update:value="GetNewSub()"/>
    </n-space>
        
        <div style="margin-left: 15px;margin-right:15px;">
            
            <n-divider v-if="!(disableNewSub)"> Parameters</n-divider>
            <n-input v-model:value="nSvalue" type="text" 
                placeholder="Input New Category Name" v-show="!(disableNewSub)"/>

            <!-- Base Template -->


            <!-- Required Template -->
            <n-date-picker v-show="newRequired" v-model:value="requireRange" 
                :default-value="Date.now()"
                :is-date-disabled="(ts) => {
                    let comp = new Date();
                    let slt = new Date(ts);
                    if(comp.getFullYear() < (slt.getFullYear()))
                    {
                        return false
                    }
                    if(((comp.getDate()) > (slt.getDate())) && ((comp.getMonth()) > (slt.getMonth() - 1)))
                    {
                        return true
                    }
                    return false
                }"
                

                update-value-on-close type="daterange" format="dd-mm-yyyy"
                :actions="console.log(requireRange)">
            </n-date-picker>
            
            
            <n-checkbox-group v-model:value="requireEcep" v-show="newRequired" 
                :on-update:value="requireEcepCheck">
                <n-space item-style="display: flex;">
                <n-checkbox value=0 label="Mon" />
                <n-checkbox value=1 label="Tue" />
                <n-checkbox value=2 label="Wed" />
                <n-checkbox value=3 label="Thu" />
                <n-checkbox value=4 label="Fri" />
                <n-checkbox value=5 label="Sat" />
                <n-checkbox value=6 label="Sun" />
                </n-space>
            </n-checkbox-group>

            <n-modal v-model:show="requireEcepMdl" preset="dialog" title="Dialog">
                <template #header>
                    <div>Info</div>
                </template>
                <b>Cannot Have All Weekdays selected</b>
            </n-modal>
        </div>

    


        <n-input-number id="inp_num" v-model:value="Mvalue" placeholder="O" :min="0" :show-button="false" :disabled="disableMony" size="large" >
            <template #prefix>
                ₹
            </template>
        </n-input-number>
        <div style="width:100%;text-align: center; margin-top: 20px;">
                <n-button @click="" type="primary" v-show="Mvalue">
                    Create Value
                </n-button>
        </div>
    

    
        
    
</template>

<script setup>
    import { Icon } from '@vicons/utils';
    import ArrowCircleLeft16Regular from '@vicons/fluent/ArrowCircleLeft16Regular';

    import { NSpace,NSelect,NInputNumber,NInput,NButton,NDivider,NDatePicker,
             NCheckbox,NCheckboxGroup,NModal } from 'naive-ui';
    import { ref,inject } from 'vue';

    const $data = inject('$data')

    const Tvalue = ref(null)
    const Svalue = ref(null)
    const nSvalue = ref('')
    const Mvalue = ref(null)

    const disableSub = ref(true)
    const disableMony = ref(true)
    const disableNewSub = ref(true)
    
    const newRequired = ref(false)
    const requireRange = ref(null)
    const requireEcep = ref([])
    const requireEcepMdl = ref(false)

    const newBase = ref(false)


    const Template = [
        {label:'Base', value:'base' },
        {label:'Required', value:'required'},   
        {label:'Needs', value:'needs'},
        {label:'Wants',value:'wants'}
    ]
    let SubTemplate = []

    function GetSub() 
    {

        SubTemplate = []
    
            disableSub.value = false

            for( let i in $data[Tvalue.value])
            {
                console.log($data[Tvalue.value][i].name)
                SubTemplate.push({label:$data[Tvalue.value][i].name,value:i})
            }
            SubTemplate.push({label:'New Category',value:'new'})
            console.log(SubTemplate)
    }

    function GetNewSub()
    {
        if(Svalue.value == 'new')
        {
            disableNewSub.value = false
            if(Tvalue.value == "base") {

            }
            else if(Tvalue.value == "required"){
                newRequired.value  = true;
                console.log("true")
            }
            else if(Tvalue.value == "needs"){

            }
            else {
                
            }
        }
        else
        {
            disableMony.value = false
        }
    }

    function createNewTemplate()
    {
        let dte = new Date
        let tmp = {}

        if(Tvalue.value == "required")
        {
            tmp[Tvalue.value + 1] = {
                "name":nSvalue.value,
                "value":Mvalue.value,
                "spantill":"",
                "excludes":[],
                "init":`${dte.getDate()}-${dte.getMonth() +1}-${dte.getFullYear()}`,
                "track":[
                    {
                        "date":`${dte.getDate()}-${dte.getMonth() +1}-${dte.getFullYear()}`,
                        "value":Mvalue.value,
                    }
                ]
            }
        }


        $data[Tvalue.value] = Object.keys(tmp,$data[Tvalue.value])
        console.log($data[Tvalue.value]) 
    }

    function requireEcepCheck(val) {
        if(val.length >= 7)
        {    
            requireEcepMdl.value = true   
        }
        else
        {
            requireEcep.value = val
        }
    }


    
</script>

<style scoped>
    #inp_num{
        text-align: center;
        width: 45%;
        margin-top: 100px;
        margin-left: auto;
        margin-right: auto;
    }
</style>

