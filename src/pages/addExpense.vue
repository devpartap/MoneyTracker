<template>

    <c_header title="Add Expense" />

    <n-space vertical size="large">
        <n-select v-model:value="Tvalue" :options="Template"
            placeholder="Please Select Template" @update:value="GetSub()" />
        <n-select v-model:value="Svalue" :disabled="disableSub" 
            placeholder="Please Select Category" :options="SubTemplate" @update:value="GetNewSub()"/>
        </n-space>
        

    <div style="margin-left: 15px;margin-right:15px;">
      
      <n-space vertical>
            
        <n-divider v-if="newParameter"> Parameters</n-divider>
        <n-input v-model:value="nSvalue" type="text" 
            placeholder="Input New Category Name" v-show="newCatagory" :on-update-value="validData('nameinp',newCatagory)"/>


        <n-date-picker v-show="(newTempCat[1]) || (newTempCat[0])"
            :on-update:value="tm => {requireRange = tm;validData((newTempCat[1]) || (newTempCat[0]))}"
            :on-confirm="enablePast"
            :is-date-disabled="(ts) => {
                if(Tvalue != 'base' && showPrevDmenu != true)
                {
                    let slt = new Date(ts);

                    if((dte.getFullYear()) != (slt.getFullYear()))
                    {
                        return ((dte.getFullYear()) > (slt.getFullYear()))
                    }
                    if((dte.getMonth()) != (slt.getMonth()))
                    {
                        return ((dte.getMonth()) > (slt.getMonth()))
                    }
                    if((dte.getDate()) > (slt.getDate()))
                    {
                        return true
                    }
                }
                return false
            }"
                
            :update-value-on-close="true" type="daterange" 
            format="dd-MM-yyyy">
        </n-date-picker>
        <br>


      </n-space>

      <n-space vertical>
        <n-modal v-model:show="requireEcepMdl" preset="dialog" title="Dialog">
            <template #header>
                <div>Input New Value</div>
            </template>
            
        </n-modal>
        

    <!-- Needs And Wants -->

        <n-input v-model:value="requireSubName" type="text" 
                placeholder="Input Spend Name" v-show="(newTempCat[2]) || (newTempCat[3])"/>

        <n-input v-model:value="requireMode" type="text" 
                placeholder="Input Mode " v-show="(newTempCat[2]) || (newTempCat[3])"/>

            
            <n-checkbox  v-show="showPrevDcheck" v-model:checked="showPrevDmenu"
                         style="margin-top: 12px;">
                Add to a Past Date
            </n-checkbox>


        <!-- Expection Days -->

            <n-divider v-if="newTempCat[1]"> Exception Days</n-divider>
        
        </n-space>

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

        <n-space vertical>    
    
    <!-- Previous Date -->

        <n-divider v-if="showPrevDmenu"> Past Date </n-divider>

        <n-date-picker v-show="showPrevDmenu" v-model:value="prevDate" type="date" 
                       :disabled="diablePrevD" 
                       :is-date-disabled="compareInitDate" :on-confirm="validData(showPrevDmenu.value)"/>
        


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

      </n-space>
    </div>
    
    
</template>



<script setup>
    import { ref,inject } from 'vue'
    import { NSpace,NSelect,NInputNumber,NInput,NButton,NDivider,NDatePicker,
             NCheckbox,NCheckboxGroup,NModal } from 'naive-ui'
             
    import c_header from './../components/c_header.vue'

    import { useRouter } from 'vue-router';
    const Router = useRouter()


    const $data = inject('$data')

    const Tvalue = ref("")
    const Svalue = ref("")
    const nSvalue = ref("")
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
    const requireSubName = ref("")
    const requireMode = ref("")

    const showPrevDcheck = ref(false)
    const showPrevDmenu = ref(false)
    const diablePrevD = ref(false)
    const prevDate = ref()


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

        if(Tvalue.value != 'base'){
            showPrevDcheck.value = true
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
                if(Svalue.value == 1)
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
                    if((Svalue.value != 0))
                    {
                        console.log("inhere!!!")
                        console.log(Svalue.value)
                        disableMony.value = false
                        choosenewCatagory(2)
                        //debugger;
                    }
                    else
                    {
                        disableMony.value = true
                        choosenewCatagory(0)
                    } 
                    
                    //disableMony.value = true
                }
            }   
            else {
                if((requireSubName.value != "")&&(requireMode.value  != ""))
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
        
        let toappend = false

        let tmp = {}
        console.log(catagoryFilled.value)

        let putdte = dateToday;
        let enteries = [1]
        let values = [Mvalue.value]

        let pushhed = false

        // debugger;
        if(Svalue.value != 1)
        {
            let latestupd = $data[Tvalue.value][Svalue.value - 2].track[$data[Tvalue.value][Svalue.value - 2].track.length - 1].date.split('-')

            let monpast = ((dte.getFullYear() - parseInt(latestupd[2])) * 12) + (dte.getMonth() - parseInt(latestupd[1]) + 1)
            for(let i = 0; i < monpast; i++)
            {
                $data[Tvalue.value][Svalue.value - 2].valuePerMonth.push(0)
                $data[Tvalue.value][Svalue.value - 2].enteriesPerMonth.push(0)
            }

        }

        if(showPrevDmenu.value)
        {
            let inpdte = new Date(prevDate.value)
            let fdindex = null

            putdte = `${inpdte.getDate()}-${inpdte.getMonth() +1}-${inpdte.getFullYear()}`

            let diff = ((dte.getFullYear() - inpdte.getFullYear()) * 12) + (dte.getMonth() - inpdte.getMonth())
            for(let i = 1;i <=diff;i++)
            {
                enteries.push(0)
                values.push(0)
            }
            
            if(Svalue.value != 1)
            {
                
                let slt
                let i = $data[Tvalue.value][Svalue.value - 2].track.length - 1

                    for(; i >= 0 ;i--)
                    {
                        slt = $data[Tvalue.value][Svalue.value - 2].track[i].date.split('-')

                        if(inpdte.getFullYear() < parseInt(slt[2]))
                        {
                            continue;
                        }
                        else if((inpdte.getMonth() + 1) < parseInt(slt[1]))
                        {
                            continue;
                        }
                        else if((inpdte.getMonth() + 1) == parseInt(slt[1]) &&
                                ((inpdte.getDate()) < parseInt(slt[0])))
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
                        $data[Tvalue.value][Svalue.value - 2].track.splice(0,0,{
                            "date":putdte,
                            "value":Mvalue.value
                        })
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


                    pushhed = true
               
            }   

           
            let his = [Mvalue.value,0,0,0]

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

            
            let nxt_his
            for(fdindex = $data.history.day.length - 1;fdindex >= 0 ;fdindex--)
            {
                nxt_his = $data.history.day[fdindex].date.split('-')

                if(inpdte.getFullYear() < parseInt(nxt_his[2]))
                {
                    continue;
                }
                else if((inpdte.getMonth() + 1) < parseInt(nxt_his[1]))
                {
                    continue;
                }

                else if((inpdte.getMonth() + 1) == parseInt(nxt_his[1]) &&
                       ((inpdte.getDate()) < parseInt(nxt_his[0])))
                {
                    continue;
                }

                else 
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
            if(Svalue.value == 1)
            {
                tmp[$data.required.length] = {
                    "name":nSvalue.value,
                    "value":Mvalue.value,
                    "totalspend":Mvalue.value,
                    "valuePerMonth":values,
                    "enteriesPerMonth":enteries,
                    "spantill":[requireRange.value[0],requireRange.value[1]],
                    "init":putdte,
                    "excludes":requireEcep.value,
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
        let slt = new Date(ts);

        if(Tvalue.value == 'required'){

            let jj = []
            let kk

            if(Svalue.value == 1)
            {
                if(requireRange.value[0] != null)
                {
                    kk = new Date(requireRange.value[0]) 
                }
                else
                {
                    return false
                } 
            }
            else
            {
                kk = new Date($data[Tvalue.value][Svalue.value-2].spantill[0])  
            }

            jj[0] = kk.getDate()
            jj[1] = kk.getMonth() +1
            jj[2] = kk.getFullYear() 


            if(slt.getFullYear() > parseInt(jj[2]))
            {
                return false
            }
            else if((slt.getMonth() + 1 ) > parseInt(jj[1]))
            {
                return false
            }  

            else if((slt.getMonth() + 1 ) == parseInt(jj[1]) && 
                    (slt.getDate()) >= parseInt(jj[0]))
            {
                return false
            }  
            else{
                return true
            }
        }

        else 
        {
            
            if(dte.getFullYear() < (slt.getFullYear()))
            {
                return true
            }
            else if((dte.getMonth()) < (slt.getMonth()))
            {
                return true
            }
            else if((dte.getMonth()) == (slt.getMonth()) &&
                    ((dte.getDate()) < (slt.getDate())))
            {        
                return true
            }              
            else{
                return false
            }

        }         
    }


    function enablePast(rq)
    {
        if((rq != 0) && (rq != null))
        {
            diablePrevD.value = false
        }
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

