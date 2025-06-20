<template>
    <div style="display: flex; flex-direction: column; gap: 10px;">
        <MyCombobox
            v-model="selectedServiceGroup"
            :items="serviceGroups"
            placeholder="Select Service Group"
        />  
        <Input placeholder="Name" v-model="name"/>
        <Button @click="save()">Save</Button>
    </div>
</template>
<script>
export default{
    data(){
        return {
            serviceGroups: [],
            selectedServiceGroup: null,
            name: null,
            price: null
        }
    }
}

</script>