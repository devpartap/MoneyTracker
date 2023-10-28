<template>

    <c_header title="Add Expense" />

    <n-space vertical size="large">

        <n-select v-model:value="Tvalue" :options="Template" 
            @update:value="GetSub" />
        <n-select v-model:value="Svalue" :disabled="disableSub" 
            :options="SubTemplate" @update:value="GetNewSub()"/>
    </n-space>
        
        <div style="margin-left: 15px;margin-right:15px;">
            
            <n-divider v-if="newParameter"> Parameters</n-divider>
            <n-input v-model:value="nSvalue" type="text" 
                placeholder="Input New Category Name" v-show="newCatagory"/>


            <n-date-picker v-show="(newRequired) || (newBase)" v-model:value="requireRange" 
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
        

    <!-- Needs And Wants -->

    <n-input v-model:value="requireSubName" type="text" 
                placeholder="Input Spend Name" v-show="(newNeeds) || (newWants)"/>

    <n-input v-model:value="requireSubName" type="text" 
                placeholder="Input Mode " v-show="(newNeeds) || (newWants)"/>


        <n-input-number id="inp_num" v-model:value="Mvalue" placeholder="O" :min="0" :show-button="false" :disabled="disableMony" size="large" >
            <template #prefix>
                ₹
            </template>
        </n-input-number>
        <div style="width:100%;text-align: center; margin-top: 20px;">
                <n-button @click="null" type="primary" v-show="Mvalue">
                    Create Value
                </n-button>
        </div>
    </div>
    

    
        
    
</template>

<script setup>
    import { ref,inject } from 'vue'
    import { NSpace,NSelect,NInputNumber,NInput,NButton,NDivider,NDatePicker,
             NCheckbox,NCheckboxGroup,NModal } from 'naive-ui'

    import c_header from './../components/c_header.vue'

    const $data = inject('$data')

    const Tvalue = ref(null)
    const Svalue = ref(null)
    const nSvalue = ref('')
    const Mvalue = ref(null)

    const disableSub = ref(true)
    const disableMony = ref(true)
    const newCatagory = ref(false)
    const newParameter = ref(false)

    
    const newBase = ref(false)
    const newRequired = ref(false)
    const newNeeds = ref(false)
    const newWants = ref(false)

    const requireRange = ref(null)
    const requireEcep = ref([])
    const requireEcepMdl = ref(false)
    const requireSubName = ref(null)

    


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
            newParameter.value = false
            newCatagory.value = false
            Svalue.value = null
            newBase.value = false
            newRequired.value  = false
            newNeeds.value = false
            newWants.value = false
            if(Tvalue.value != 'base'){
                for(let i in $data[Tvalue.value])
                {
                    console.log($data[Tvalue.value][i].name)
                    SubTemplate.push({label:$data[Tvalue.value][i].name,value:i})
                }
            }
            SubTemplate.push({label:'New Category',value:'new'})
            console.log(SubTemplate)
    }

    function GetNewSub()
    {
        if(Svalue.value == 'new')
        {
            newParameter.value = true
            newCatagory.value = true
            if(Tvalue.value == "base") {
                newBase.value = true
                newRequired.value  = false
                newNeeds.value = false
                newWants.value = false
            }
            else if(Tvalue.value == "required"){
                newBase.value = false
                newRequired.value  = true
                newNeeds.value = false
                newWants.value = false
            }
            else if(Tvalue.value == "needs"){
                newBase.value = false
                newRequired.value  = false
                newNeeds.value = true
                newWants.value = false
            }
            else {
                newBase.value = false
                newRequired.value  = false
                newNeeds.value = false
                newWants.value = true
            }
        }
        
        else
        {
            if(Tvalue.value == 'needs')
            {
                newParameter.value = true
                newCatagory.value = false
                newBase.value = false
                newRequired.value  = false
                newNeeds.value = true
                newWants.value = false
            }
            if(Tvalue.value == 'wants')
            {
                newParameter.value = true
                newCatagory.value = false
                newBase.value = false
                newRequired.value  = false
                newNeeds.value = false
                newWants.value = true
            }
            
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

