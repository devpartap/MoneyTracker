<template>
    <n-modal v-model:show="toshowModal" preset="dialog"  title="New Version Available">

        <h4 style="text-align: center;"> {{ props.version }} -> 0.9(betaz) </h4>

    </n-modal>
</template>

<script setup>

    import { NModal } from 'naive-ui';
    import { ref } from 'vue';
    
    const props = defineProps({
        version:""
    })

    let toshowModal = ref(false)

    if(props.version != '0.8')
    {
        toshowModal.value = true
    }


</script>