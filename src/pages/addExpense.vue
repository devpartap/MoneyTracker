<template>

    <c_header title="Add Expense" />

    <n-space vertical size="large">
        <n-select v-model:value="Tvalue" :options="Template" 
            @update:value="GetSub()" />
        <n-select v-model:value="Svalue" :disabled="disableSub" 
            :options="SubTemplate" @update:value="GetNewSub()"/>
    </n-space>
        

    <div style="margin-left: 15px;margin-right:15px;">
            
        <n-divider v-if="newParameter"> Parameters</n-divider>
        <n-input v-model:value="nSvalue" type="text" 
            placeholder="Input New Category Name" v-show="newCatagory" :on-update-value="validData('nameinp',newCatagory)"/>


        <n-date-picker v-show="(newTempCat[1]) || (newTempCat[0])" 
            :on-update:value="tm => {requireRange = tm;validData((newTempCat[1]) || (newTempCat[0]))}"
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
                

            :update-value-on-close="true" type="daterange" 
            format="dd-mm-yyyy">
        </n-date-picker>
            
            
        <n-checkbox-group v-model:value="requireEcep" v-show="newTempCat[1]" 
                :on-update:value="requireEcepCheck">
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

        <n-modal v-model:show="requireEcepMdl" preset="dialog" title="Dialog">
            <template #header>
                <div>Info</div>
            </template>
            <b>Cannot Have All Weekdays selected</b>
        </n-modal>
        

    <!-- Needs And Wants -->

        <n-input v-model:value="requireSubName" type="text" 
                placeholder="Input Spend Name" v-show="(newTempCat[2]) || (newTempCat[3])"/>

        <n-input v-model:value="requireMode" type="text" 
                placeholder="Input Mode " v-show="(newTempCat[2]) || (newTempCat[3])"/>



        <n-input-number  :disabled="disableMony" id="inp_num" v-model:value="Mvalue" placeholder="O" :min="0" :show-button="false"  size="large" >
            <template #prefix>
                ₹
            </template>
        </n-input-number>

        <div style="width:100%;text-align: center; margin-top: 20px;">
                <n-button @click="updateData()" type="primary" v-show="Mvalue">
                    Create Value
                </n-button>
        </div>

    </div>
    
    
</template>

<script setup>
    import { ref,inject } from 'vue'
    import { NSpace,NSelect,NInputNumber,NInput,NButton,NDivider,NDatePicker,
             NCheckbox,NCheckboxGroup,NModal } from 'naive-ui'

    import { useRouter } from 'vue-router';
    const Router = useRouter()

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

    const newTempCat = ref([false,false,false,false])
    const catagoryFilled = ref([false,false,false])

    const requireRange = ref([null,null])
    const requireEcep = ref([])
    const requireEcepMdl = ref(false)
    const requireSubName = ref(null)
    const requireMode = ref(null)

    let dte = new Date
    let dateToday = `${dte.getDate()}-${dte.getMonth() +1}-${dte.getFullYear()}`

    
    const Template = [
        {label:'Base', value:'base' },
        {label:'Required', value:'required'},   
        {label:'Needs', value:'needs'},
        {label:'Wants',value:'wants'}
    ]

    let SubTemplate = []

    function choosenewTempCat(index)
    {
        newTempCat.value[0]= (index === 1);
        newTempCat.value[1] = (index === 2);
        newTempCat.value[2]  = (index === 3);
        newTempCat.value[3]  = (index === 4);
    }

    function choosenewCatagory(index)
    {
        catagoryFilled.value[0]= (index === 1);
        catagoryFilled.value[1] = (index === 2);
        catagoryFilled.value[2]  = (index === 3);
    }

    function GetSub() 
    {

        SubTemplate = []
    
            disableSub.value = false
            newParameter.value = false
            newCatagory.value = false
            disableMony.value = true

            Svalue.value = null
            choosenewTempCat(5)

            if(Tvalue.value != 'base'){

                for(let i = 0; i+1 <= $data[Tvalue.value].length;i++)
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
            disableMony.value = true
            if(Tvalue.value == "base") {
                choosenewTempCat(1)
            }
            else if(Tvalue.value == "required"){
                choosenewTempCat(2)
            }
            else if(Tvalue.value == "needs"){
                choosenewTempCat(3)
            }
            else {
                choosenewTempCat(4)
            }
        }
        
        else
        {
            newCatagory.value = false
            newParameter.value = false
            disableMony.value = true
            choosenewTempCat(0)
            choosenewCatagory(0)
            if(Tvalue.value == 'needs')
            {
                newParameter.value = true
                newCatagory.value = false
                choosenewTempCat(3)
            }
            if(Tvalue.value == 'wants')
            {
                newParameter.value = true
                newCatagory.value = false
                choosenewTempCat(4)
            }
            
        }
    }

    function validData(valid)
    {
        if(valid){
            if(Tvalue.value == "base") {
                console.log(requireRange.value)
                if((nSvalue.value != "")&&(requireRange.value[1]))
                {
                    console.log("yo")
                    disableMony.value = false
                    choosenewCatagory(1)
                }
                else
                {
                    disableMony.value = true
                    choosenewCatagory(0)
                }
            }
            else if(Tvalue.value == "required"){

                console.log(nSvalue.value)
                if(Svalue.value == "new")
                {
                    if((nSvalue.value != "")&&(requireRange.value[1]))
                    {
                        disableMony.value = false
                        choosenewCatagory(2)
                    }
                    else
                    {
                        disableMony.value = true
                        choosenewCatagory(0)
                    }
                }
                else
                {
                    if((Svalue.value != ""))
                    {
                        disableMony.value = false
                        choosenewCatagory(2)
                    }
                    else
                    {
                        disableMony.value = true
                        choosenewCatagory(0)
                    }   
                }
            }   
            else {
                if((requireSubName.value != "")&&(requireMode.value  != ""))
                {
                    if(Svalue.value == "new")
                    {
                        if(nSvalue.value != "")
                        {
                            disableMony.value = false
                            choosenewCatagory(3)
                        }
                        else
                        {
                            disableMony.value = true
                            choosenewCatagory(0)
                        }
                    }
                    else
                    {
                        disableMony.value = false
                        choosenewCatagory(3)
                    }
                }
                else
                {
                    disableMony.value = true
                    choosenewCatagory(0)
                }
            }

        }
    }

    function requireEcepCheck(val) {
        if(val.length >= 7)
        {    
            requireEcepMdl.value = true   
        }
        else
        {
            requireEcep.value = val
            validData(newTempCat.value[1])
        }
        
    }

    function updateData()
    {

        let toappend = false

        let tmp = {}
        console.log(catagoryFilled.value)
        if(catagoryFilled.value[0])
        {
            tmp[$data.base.length] = {
                "name":nSvalue.value,
                "value":Mvalue.value,
                "spantill":[requireRange.value[0],requireRange.value[1]],
                "init":dateToday
            }
            $data.base.length = $data.base.length + 1
            toappend = true
        }

        else if(catagoryFilled.value[1])
        {
            if(Svalue.value == 'new')
            {
                tmp[$data.required.length] = {
                    "name":nSvalue.value,
                    "value":Mvalue.value,
                    "totalspend":Mvalue.value,
                    "valuePerMonth":[Mvalue.value],
                    "enteriesPerMonth":[1],
                    "spantill":[requireRange.value[0],requireRange.value[1]],
                    "init":dateToday,
                    "excludes":requireEcep.value,
                    "track":[
                        {
                            "date":dateToday,
                            "value":Mvalue.value
                        }
                    ]   
                }
                $data.required.length = $data.required.length + 1
                toappend = true
            }
            else
            {
                $data.required[Svalue.value].track.push({
                    "date":dateToday,
                    "value":Mvalue.value
                })

                $data.required[Svalue.value].totalspend = $data.required[Svalue.value].totalspend  + Mvalue.value
                
                let logdate = $data.required[Svalue.value].track[$data.required[Svalue.value].track.length - 1].bdate
                if(getWithPredessorZero(logdate,2) <= dte.getMonth())
                {
                    $data.required[Svalue.value].valuePerMonth.push(Mvalue.value)
                    $data.required[Svalue.value].enteriesPerMonth.push(1)
                }
                else
                {
                    $data.required[Svalue.value].valuePerMonth[$data.required[Svalue.value].valuePerMonth.length - 1] += Mvalue.value
                    $data.required[Svalue.value].enteriesPerMonth[$data.required[Svalue.value].enteriesPerMonth.length - 1] += 1               
                }
            }

            updateHistory(1,Mvalue.value)
        }
        else
        {
            if(Svalue.value == 'new')
            {
                tmp[$data[Tvalue.value].length] = {
                    "name":nSvalue.value,
                    "valueTotal":Mvalue.value,
                    "init":dateToday,
                    "valuePerMonth":[Mvalue.value],
                    "enteriesPerMonth":[1],
                    "track":[
                        {
                            "name":requireSubName.value,
                            "value":Mvalue.value,
                            "bdate":dateToday,
                            "mode":requireMode.value
                        }
                    ]
                }
                $data[Tvalue.value].length = $data[Tvalue.value].length + 1
                toappend = true
            }
            else
            {
                $data[Tvalue.value][Svalue.value].track.push({
                    "name":requireSubName.value,
                    "value":Mvalue.value,
                    "bdate":dateToday,
                    "mode":requireMode.value
                })

                $data[Tvalue.value][Svalue.value].valueTotal = $data[Tvalue.value][Svalue.value].valueTotal + Mvalue.value

                let logdate = $data[Tvalue.value][Svalue.value].track[$data[Tvalue.value][Svalue.value].track.length - 1].bdate
                if(getWithPredessorZero(logdate,2) <= dte.getMonth())
                {
                    $data[Tvalue.value][Svalue.value].valuePerMonth.push(Mvalue.value)
                    $data[Tvalue.value][Svalue.value].enteriesPerMonth.push(1)
                }
                else
                {
                    $data[Tvalue.value][Svalue.value].valuePerMonth[$data[Tvalue.value][Svalue.value].valuePerMonth.length - 1] += Mvalue.value
                    $data[Tvalue.value][Svalue.value].enteriesPerMonth[$data[Tvalue.value][Svalue.value].enteriesPerMonth.length - 1] += 1
                }

            }
            if(Tvalue.value == "needs"){ updateHistory(2,Mvalue.value)}
            else {updateHistory(3,Mvalue.value)}
        }

        if(toappend){
            Object.assign($data[Tvalue.value],tmp)
            console.log(tmp)
        }

        localStorage.setItem("_DATA_", JSON.stringify($data))

        Router.go(-1)
        
    }

    function getWithPredessorZero(dateString,info) {
      const dte = dateString.split('-');
      return parseInt(dte[info-1])
    }

    function updateHistory(pera,vaue)
    {
        $data.history.day[$data.history.day.length - 1].spend[pera] += vaue
        $data.history.day[$data.history.day.length - 1].spend[0] += vaue
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

