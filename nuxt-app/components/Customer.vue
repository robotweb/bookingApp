<template>
    <div style="display: flex; flex-direction: column; gap: 10px;">
        <Input placeholder="Name" v-model="name"/>
        <Button @click="save">Save</Button>
    </div>
</template>
<script>
export default{
    data(){
        return {
            name: null,
            selectedCustomer: null,
            customerPopover: false,
            bookingDetailLines: [{}],
            customers: []
        }
    },
    async mounted() {
    },
    methods:{
        async save(){
            try {
                const response = await this.$authFetch(API_URL+'/customer',{
                    method: "POST",
                    body: {
                        name: this.name,
                        team_id: 1
                    }
                })
                console.log(response)
                this.$emit("saved")
                this.$toast.success('Success')
            } catch (error) {
                this.$toast.error('Failed')
            }
        }
    }
}

</script>