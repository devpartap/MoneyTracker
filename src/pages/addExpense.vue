<template>

    <c_header title="Add Expense" />

    <n-space vertical size="large" style="margin-left: 7px;margin-right:7px;">
        <n-select v-model:value="Tvalue" :options="Template" size="large" class="inputFeild"
            placeholder="Please Select Template" @update:value="GetSub()" />
        <n-select v-model:value="Svalue" :disabled="disableSub" size="large" class="inputFeild"
            placeholder="Please Select Category" :options="SubTemplate" @update:value="GetNewSub()"/>
        </n-space>
        

    <div style="margin-left: 20px;margin-right:20px;">
      
      <n-space vertical>
            
        <n-divider class="dividerStyle" v-if="newParameter"> Parameters</n-divider>
        <n-input :value="nSvalue" type="text" maxlength="20" size="large" class="inputFeild"
            placeholder="Input New Category Name" v-show="newCatagory" 
            :on-input="ot_nsValue_oninput"
            :on-blur="ot_nsValue_onblur" />

        
        <n-date-picker v-show="(newTempCat[0])" class="inputFeild"
            :on-update:value="tm => {requireRange = tm; validData(newTempCat[0])}"              
            :update-value-on-close="true"  size="large"
            type="daterange" 
            format="dd-MMM-yyyy">
        </n-date-picker>

       
        <div v-show="(newTempCat[1])" class="optionsStyle">Enable Homepage Logging
            <n-switch v-model:value="requirehomelog" style="float: right; margin-top: 3px;"></n-switch>
        </div>

      </n-space>

      <n-space vertical>
        <n-modal v-model:show="requireEcepMdl" preset="dialog" title="Dialog">
            <template #header>
                <div>Input New Value</div>
            </template>
            
        </n-modal>
        

    <!-- Needs And Wants -->

        <n-input :value="requireSubName" type="text" maxlength="20" size="large" class="inputFeild"
                placeholder="Input Spend Name" v-show="(newTempCat[2]) || (newTempCat[3])"
                :on-input="ot_SubName_oninput"/>

        <n-input :value="requireMode" type="text" maxlength="20" size="large" class="inputFeild"
                placeholder="Input Mode " v-show="(newTempCat[2]) || (newTempCat[3])"
                :on-input="ot_RequireMode_oninput"/>

            
            <n-checkbox  v-show="showPrevDcheck" v-model:checked="showPrevDmenu"
                         class="optionsStyle" :on-update:value="validData(true)">
                Add to a Past Date
            </n-checkbox>


        <!-- Expection Days -->

            <n-divider class="dividerStyle" v-if="newTempCat[1]"> Exception Days</n-divider>
        
        </n-space>

        <n-checkbox-group v-model:value="requireEcep" v-show="newTempCat[1]" class="optionsStyle"
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

        <n-space vertical>    
    
    <!-- Previous Date -->

        <n-divider class="dividerStyle" v-if="showPrevDmenu"> Past Date </n-divider>

        <n-date-picker v-show="showPrevDmenu" v-model:value="prevDate" type="date" size="large" class="inputFeild"
                       :is-date-disabled="compareInitDate" 
                       :on-confirm="validData(showPrevDmenu)"
                       format="dd-MMM-yyyy"
                       :actions="['clear']" />
        

        <n-input-number  :disabled="disableMony" id="inp_num" v-model:value="Mvalue" placeholder="O" 
                         :min="0" :show-button="false"  size="large" class="moneyInputStyle">
            <template #prefix>
                ₹
            </template>
        </n-input-number>

        <div style="width:100%;text-align: center; margin-top: 10px;">
                <n-button class="createButton" @click="updateData()" type="primary" v-show="Mvalue" size="large">
                    Create Value
                </n-button>
        </div>

      </n-space>
    </div>

    <!-- Exception Modal -->
    <n-modal v-model:show="expMdl" preset="dialog" title="Dialog">
            <template #header>
                <div>{{ expMdl_msg }}</div>
            </template>
            
        </n-modal>
    
    
</template>



<script setup>
    import { ref,inject } from 'vue'
    import { NSpace,NSelect,NInputNumber,NInput,NButton,NDivider,NDatePicker,
             NCheckbox,NCheckboxGroup,NModal,NSwitch } from 'naive-ui'
             
    import c_header from './../components/c_header.vue'

    import { useRouter } from 'vue-router';
    const Router = useRouter()


    const $data = inject('$data')

    const Tvalue = ref("")                // main tempelate's value in [base,required,needs,wants]
    const Svalue = ref("")                // catagory of template. value in [2 to no of catagories]. 0 means not selected. 1 means new catagory selected
    const nSvalue = ref("")               // name of new catagory. value in string
    const Mvalue = ref(null)              // value of money inputed. value in positive interger

    const disableSub = ref(true)
    const disableMony = ref(true)

    const newCatagory = ref(false)
    const newParameter = ref(false)

    const newTempCat = ref([false,false,false,false])
    const catagoryFilled = ref([false,false,false])

    const requirehomelog = ref(true)
    const requireRange = ref([null,null])
    const requireEcep = ref([])
    const requireEcepMdl = ref(false)
    const requireSubName = ref("")
    const requireMode = ref("")

    const showPrevDcheck = ref(false)
    const showPrevDmenu = ref(false)
    const diablePrevD = ref(false)
    const prevDate = ref()

    const expMdl = ref(false)
    let   expMdl_msg = ""


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
        newTempCat.value[0]  = (index === 1);
        newTempCat.value[1]  = (index === 2);
        newTempCat.value[2]  = (index === 3);
        newTempCat.value[3]  = (index === 4);
    }

    function choosenewCatagory(index)
    {
        catagoryFilled.value[0]  = (index === 1);
        catagoryFilled.value[1]  = (index === 2);
        catagoryFilled.value[2]  = (index === 3);
    }

    function GetSub() 
    {

        SubTemplate = []
    
            disableSub.value = false
            newParameter.value = false
            newCatagory.value = false
            disableMony.value = true
            showPrevDcheck.value = false
            showPrevDmenu.value = false

            Svalue.value = ""
            choosenewTempCat(5)

            if(Tvalue.value != 'base'){

                for(let i = 0; i+1 <= $data[Tvalue.value].length;i++)
                {
                    console.log($data[Tvalue.value][i].name)
                    SubTemplate.push({label:$data[Tvalue.value][i].name,value:i+2})
                }
                
            }
            SubTemplate.push({label:'New Category',value:1})
            console.log(SubTemplate)
    }

    function GetNewSub()
    {

        disableMony.value = true

        if(Svalue.value == 1)
        {
            newParameter.value = true
            newCatagory.value = true
            
            if(Tvalue.value == "base") {
                choosenewTempCat(1)
            }
            else if(Tvalue.value == "required"){
                diablePrevD.value = true;
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
            diablePrevD.value = false

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

        showPrevDcheck.value = true
        validData(true)
    }

    function validData(valid)
    {
        if(valid){

            if(Tvalue.value == "base") {
                console.log(requireRange.value)
                if((nSvalue.value != "") && (requireRange.value))
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
                if(Svalue.value == 1)
                {
                    if((nSvalue.value != ""))
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
                    if((Svalue.value != 0))
                    {   
                        console.log("inhere!!!")
                        console.log(Svalue.value)
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
                if((requireSubName.value != "") && (requireMode.value  != ""))
                {
                                   
                    if(Svalue.value == 1)
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

            if(showPrevDmenu.value)
            {
                if(!prevDate.value)
                {
                    disableMony.value = true;
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
        /* 
            This function addes the expense in the database.
        */
        // debugger;
        let toappend = false

        let tmp = {}
        console.log(catagoryFilled.value)

        let putdte = dateToday;
        let enteries = [1]
        let values = [Mvalue.value]

        let inpdte = dte
        let fdindex = null
        let pushhed = false

        if(showPrevDmenu.value){
            inpdte = new Date(prevDate.value)
            putdte = `${inpdte.getDate()}-${inpdte.getMonth() +1}-${inpdte.getFullYear()}`
        }

        
        if(!catagoryFilled.value[0])
        {   
            // debugger;
            let latestupd
            let diff = 0
            
        

            if(Svalue.value != 1)
            {
                latestupd = $data[Tvalue.value][Svalue.value - 2 + (Svalue.value === 1)].track[$data[Tvalue.value][Svalue.value - 2 + (Svalue.value === 1)].track.length - 1].date.split('-')
                diff = ((inpdte.getFullYear() - parseInt(latestupd[2])) * 12) + (inpdte.getMonth() - parseInt(latestupd[1]) + 1)
                for(let i = 0; i < diff; i++)
                {
                    $data[Tvalue.value][Svalue.value - 2].valuePerMonth.push(0)
                    $data[Tvalue.value][Svalue.value - 2].enteriesPerMonth.push(0)
                }

            }
            else
            {
                if(nSvalue.value[nSvalue.value.length - 1] == ' ')
                {
                    nSvalue.value = nSvalue.value.slice(0,nSvalue.value.length - 1)
                }
            }

    

            if(showPrevDmenu.value)
            {

                for(let i = 1;i <=(-diff);i++)
                {
                    enteries.push(0)
                    values.push(0)
                }

                if(Svalue.value != 1)
                {

                    let slt
                    let i = $data[Tvalue.value][Svalue.value - 2].track.length - 1
                    // debugger;

                        for(; i >= 0 ;i--)
                        {
                            if(inpdte.valueOf() < getParseDate($data[Tvalue.value][Svalue.value - 2].track[i].date))
                            {
                                continue;
                            }

                            else 
                            {
                                if(catagoryFilled.value[1])
                                {
                                    $data.required[Svalue.value - 2].track.splice(i+1, 0, {
                                        "date":putdte,
                                        "value":Mvalue.value
                                    });
                                }
                                else
                                {
                                    $data[Tvalue.value][Svalue.value - 2].track.splice(i+1, 0, {
                                    "name":requireSubName.value,
                                    "value":Mvalue.value,
                                    "date":putdte,
                                    "mode":requireMode.value
                                    });

                                }
                                break;
                            }

                        }

                        if(i == -1)
                        {
                            if(catagoryFilled.value[1])
                            {
                                $data[Tvalue.value][Svalue.value - 2].track.splice(0,0,{
                                    "date":putdte,
                                    "value":Mvalue.value
                                })
                            }
                            else
                            {
                                $data[Tvalue.value][Svalue.value - 2].track.splice(0,0,{
                                    "name":requireSubName.value,
                                    "value":Mvalue.value,
                                    "date":putdte,
                                    "mode":requireMode.value
                                })
                            }
                        }


                        while($data[Tvalue.value][Svalue.value - 2].enteriesPerMonth.length < enteries.length)
                        {
                            $data[Tvalue.value][Svalue.value - 2].enteriesPerMonth.splice(0,0,0);
                            $data[Tvalue.value][Svalue.value - 2].valuePerMonth.splice(0,0,0);
                        }

                        while($data[Tvalue.value][Svalue.value - 2].enteriesPerMonth.length > enteries.length)
                        {
                            enteries.splice(0,0,0)
                            values.splice(0,0,0)
                        }

                        $data[Tvalue.value][Svalue.value - 2].enteriesPerMonth = enteries.map((a, i) => a + $data[Tvalue.value][Svalue.value - 2].enteriesPerMonth[i])
                        $data[Tvalue.value][Svalue.value - 2].valuePerMonth = values.map((a, i) => a + $data[Tvalue.value][Svalue.value - 2].valuePerMonth[i])

                        if(inpdte.valueOf() <  getParseDate($data[Tvalue.value][Svalue.value - 2].init))
                        {
                            $data[Tvalue.value][Svalue.value - 2].init = putdte;
                        }

                        pushhed = true
                    
                }   

            
                let his = [Mvalue.value,0,0,0,0]

                if(Tvalue.value == "required")
                {
                    his[1] += Mvalue.value
                }
                else if(Tvalue.value == "needs")
                {
                    his[2] += Mvalue.value
                }
                else 
                {
                    his[3] += Mvalue.value
                }

                for(fdindex = $data.history.day.length - 1;fdindex >= 0 ;fdindex--)
                {
                     if(inpdte.valueOf() >= getParseDate($data.history.day[fdindex].date))
                     {
                        break;
                     }             
                }

                if(fdindex == -1)
                {
                    $data.history.day.splice(0,0, {

                        "date":putdte,
                        "spend":his
                    } )
                }
                else
                {
                    if($data.history.day[fdindex].date == putdte)
                    {
                        $data.history.day[fdindex].spend = $data.history.day[fdindex].spend.map((a , i) => a + his[i] )
                    }
                    else
                    {
                        $data.history.day.splice(fdindex+1,0, {
                        
                            "date":putdte,
                            "spend":his
                        } )
                    }
                }

            }
        }

        

        if(catagoryFilled.value[0])
        {
            tmp[$data.base.length] = {
                "name":nSvalue.value,
                "value":Mvalue.value,
                "spantill":[requireRange.value[0],requireRange.value[1]],
                "init":putdte
            }

            if(showPrevDmenu.value)
            {

                let ind = $data.history.day.findLastIndex((ele) => {
                    return getParseDate(ele.date) <= inpdte.valueOf() 
                })

                let toadd = 1

                if(ind == -1) {
                    ind = 0
                    toadd = 0
                }

                if(getParseDate($data.history.day[ind].date) == inpdte.valueOf())
                {
                    $data.history.day[ind].spend[4] += Mvalue.value
                }
                else
                {
                    $data.history.day.splice(ind+toadd,0,{
                        "date":putdte,
                        "spend":[0,0,0,0,Mvalue.value]
                    })
                }
            }
            else
            {
                $data.history.day[$data.history.day.length - 1].spend[4] = Mvalue.value
            }


            $data.base.length = $data.base.length + 1
            toappend = true
        }

        else if(catagoryFilled.value[1])
        {           
            if(Svalue.value == 1)
            {
                tmp[$data.required.length] = {
                    "name":nSvalue.value,
                    "value":Mvalue.value,
                    "totalspend":Mvalue.value,
                    "valuePerMonth":values,
                    "enteriesPerMonth":enteries,
                    "homelog":requirehomelog.value,
                    "init":putdte,
                    "excludes":requireEcep.value.sort(),
                    "track":[
                        {
                            "date":putdte,
                            "value":Mvalue.value
                        }
                    ]  
                }
                $data.required.length = $data.required.length + 1
                toappend = true
                console.log(tmp)
                
            }
            else
            {
                            
                $data.required[Svalue.value - 2].totalspend = $data.required[Svalue.value - 2].totalspend  + Mvalue.value
                
                if(!pushhed)
                {
                    $data.required[Svalue.value - 2].track.push({
                        "date":putdte,
                        "value":Mvalue.value
                    })

                    let logdate = $data.required[Svalue.value - 2].track[$data.required[Svalue.value - 2].track.length - 2].date
                    if(getWithPredessorZero(logdate,2) <= dte.getMonth())
                    {
                        $data.required[Svalue.value - 2].valuePerMonth.push(Mvalue.value)
                        $data.required[Svalue.value - 2].enteriesPerMonth.push(1)
                    }
                    else
                    {
                        $data.required[Svalue.value - 2].valuePerMonth[$data.required[Svalue.value - 2].valuePerMonth.length - 1] += Mvalue.value
                        $data.required[Svalue.value - 2].enteriesPerMonth[$data.required[Svalue.value - 2].enteriesPerMonth.length - 1] += 1               
                    }   
                }     
            }

            if(!showPrevDmenu.value)
            {
                updateHistory(1,Mvalue.value)
            }
            
        }
        else
        {

            if(requireSubName.value[requireSubName.value.length - 1] == ' ')
            {
                requireSubName.value = requireSubName.value.slice(0,requireSubName.value.length - 1)
            }

            if(requireMode.value[requireMode.value.length - 1] == ' ')
            {
                requireMode.value = requireMode.value.slice(0,requireMode.value.length - 1)
            }

            if(Svalue.value == 1)
            {
                tmp[$data[Tvalue.value].length] = {
                    "name":nSvalue.value,
                    "totalspend":Mvalue.value,
                    "init":putdte,
                    "valuePerMonth":values,
                    "enteriesPerMonth":enteries,
                    "track":[
                        {
                            "name":requireSubName.value,
                            "value":Mvalue.value,
                            "date":putdte,
                            "mode":requireMode.value
                        }
                    ]
                }
                $data[Tvalue.value].length = $data[Tvalue.value].length + 1
                toappend = true
            }
            else
            {
                $data[Tvalue.value][Svalue.value - 2].totalspend = $data[Tvalue.value][Svalue.value - 2].totalspend + Mvalue.value
                
                if(!pushhed)
                {
                    
                    $data[Tvalue.value][Svalue.value - 2].track.push({
                        "name":requireSubName.value,
                        "value":Mvalue.value,
                        "date":putdte,
                        "mode":requireMode.value
                    })


                    let logdate = $data[Tvalue.value][Svalue.value - 2].track[$data[Tvalue.value][Svalue.value - 2].track.length - 2].date
                    if(getWithPredessorZero(logdate,2) <= dte.getMonth())
                    {
                        $data[Tvalue.value][Svalue.value - 2].valuePerMonth.push(Mvalue.value)
                        $data[Tvalue.value][Svalue.value - 2].enteriesPerMonth.push(1)
                    }
                    else
                    {
                        $data[Tvalue.value][Svalue.value - 2].valuePerMonth[$data[Tvalue.value][Svalue.value - 2].valuePerMonth.length - 1] += Mvalue.value
                        $data[Tvalue.value][Svalue.value - 2].enteriesPerMonth[$data[Tvalue.value][Svalue.value - 2].enteriesPerMonth.length - 1] += 1
                    }
                }

            }
            if(!showPrevDmenu.value)
            {
                if(Tvalue.value == "needs")
                { 
                    updateHistory(2,Mvalue.value)
                }
                else 
                {
                    updateHistory(3,Mvalue.value)
                }
            }
        }

        if(toappend){
            Object.assign($data[Tvalue.value],tmp)
            console.log(tmp)
        }

        localStorage.setItem("_DATA_", JSON.stringify($data))

        Router.go(-1)
        
    }

    function compareInitDate(ts)
    {
        if(ts >= dte.valueOf())
        {
            return true;
        }
        return false;
    }

    function getParseDate(str)
    {
        let dateparts = str.split('-')
        return Date.parse(`${dateparts[2]}/${dateparts[1]}/${dateparts[0]}`)
    }

    function getWithPredessorZero(dateString,info) {
      const dt = dateString.split('-');
      return parseInt(dt[info-1])
    }

    function updateHistory(pera,vaue)
    {
        $data.history.day[$data.history.day.length - 1].spend[pera] += vaue
        $data.history.day[$data.history.day.length - 1].spend[0] += vaue
    }

    // ot are one time called functions. they are just there to make code clear.

    function ot_nsValue_oninput(inp)
    {
        if(inp.length > 1)
        {
            if(!((inp[inp.length - 1] == ' ') && (inp[inp.length - 2] == ' ')))
            { 
                nSvalue.value = inp 
            }
        }
        else
        {
            if(inp[0] != ' ')
            {
                nSvalue.value = inp 
            }
        }

        validData(newCatagory.value)
    }

    function ot_nsValue_onblur()
    {
        let toreplacedval = nSvalue.value.replaceAll(' ', '')
        
        for(let i = 0; i < $data[Tvalue.value].length;i++)
        {
            if(toreplacedval == $data[Tvalue.value][i].name)
            {
                expMdl_msg = "Catagory with this name already exists!"
                expMdl.value = true

                nSvalue.value = ""
            }
        }
    }

    function ot_SubName_oninput(inp)
    {
        if(inp.length > 1)
        {
            if(!((inp[inp.length - 1] == ' ') && (inp[inp.length - 2] == ' ')))
            { 
                requireSubName.value = inp 
            }
        }
        else
        {
            if(inp[0] != ' ')
            {
                requireSubName.value = inp 
            }
        }

        validData(((newTempCat.value[2]) || (newTempCat.value[3])))
    }

    function ot_RequireMode_oninput(inp)
    {
        requireMode.value = inp.replace('  ', ' ')
        validData(((newTempCat.value[2]) || (newTempCat.value[3])))
    }


</script>

<style scoped>
    #inp_num{
        text-align: center;
        width: 50%;
        margin-top: 40px;
        margin-left: auto;
        margin-right: auto;
    }

    .optionsStyle{
        font-family: 'roboto-medium';
        font-size: 17px;
        color: rgb(77,77,77);
    }
    .dividerStyle{
        font-family: 'roboto-medium';
        font-size: 19px;
        color: grey;
    }

    .inputFeild{
        font-family: 'roboto-regular';
        font-size: 17px;
        color: grey;
    }

    .moneyInputStyle{
        font-family: 'roboto-regular';
    }

    .createButton{
        font-family: 'roboto-medium';
        font-size: 18px;
    }


</style>

