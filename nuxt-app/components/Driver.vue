<template>
    <div style="display: flex; flex-direction: column; gap: 10px;">
        <Input placeholder="Name" v-model="name"/>
        <Button @click="save()">Save</Button>
    </div>
</template>
<script>
export default{
    data(){
        return{
            name: null
        }
    },
    methods: {
        save(){

        }
    }
}
</script>