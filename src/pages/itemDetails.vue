<template>
    <c_header :title="_name" />

    <n-card title="Huge Card" size="huge" :embedded="true" style="text-align: center;" >
        Card Content<br><br><br><br><br><br><br>
    </n-card> 
    <br><br>
    
    <div v-show="_catagory.substring(0, 8) == 'Required'">
        <div class="cat_head">Catagory Required
            <br><br>
        
            
            <n-grid :cols="3">
                <n-gi>
                    <n-statistic label="This Month" :value="$data.required[itm_ref].valuePerMonth[$data.required[itm_ref].valuePerMonth.length-1]" />
                </n-gi>
                <n-gi>
                    <n-statistic label="This Span" :value="$data.required[itm_ref].totalspend" />
                </n-gi>
                <n-gi>
                    <n-statistic label="Month Mean" :value="(($data.required[itm_ref].valuePerMonth[$data.required[itm_ref].valuePerMonth.length-1]/
                                                            $data.required[itm_ref].enteriesPerMonth[$data.required[itm_ref].enteriesPerMonth.length-1])/
                                                            $data.required[itm_ref].value).toFixed(3)" />
                </n-gi>
            </n-grid>

        </div>
        <br>

        <div style="margin-left: 8%;margin-right: 18%;width: 100%;">
        <n-grid :cols="2" :item-responsive="true">
            <n-gi>
                • Default Value  
            </n-gi>
            <n-gi>
                {{ $data.required[itm_ref].value }} 
            </n-gi>

            <n-gi>
                • Excludes
            </n-gi>
            <n-gi>
                {{ getExcludes($data.required[itm_ref].excludes) }}
            </n-gi>

            <n-gi>
                • Month Enteries 
            </n-gi>
            <n-gi>
                {{ $data.required[itm_ref].enteriesPerMonth[$data.required[itm_ref].enteriesPerMonth.length - 1] }}
            </n-gi>

            <n-gi>
                • Total Enteries 
            </n-gi>
            <n-gi>
                {{ getTotalEnteries($data.required[itm_ref].enteriesPerMonth) }}
            </n-gi>

            <n-gi>
                • Initialized On
            </n-gi>
            <n-gi>
                {{ $data.required[itm_ref].init }}
            </n-gi>

            <n-gi>
                • Span from
            </n-gi>
            <n-gi>
                {{ getSpan($data.required[itm_ref].spantill[0]) }}
            </n-gi>

            <n-gi>
                • Span till 
            </n-gi>
            <n-gi>
                {{ getSpan($data.required[itm_ref].spantill[1]) }}
            </n-gi>           

        </n-grid>
    

    </div>

    </div>

    <div v-show="_catagory == 'Needs'">

    </div>

    <div v-show="_catagory == 'Wants'">

    </div>
    
</template>

<script setup>

import { ref,inject } from 'vue'
import c_header from './../components/c_header.vue'
import { NCard,NGi,NGrid,NStatistic } from 'naive-ui';


    const props = defineProps({
        _name:String,
        _catagory:String
    })

    const itm_ref = props._catagory.substring(props._catagory.length-1)
    const $data = inject('$data')  

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