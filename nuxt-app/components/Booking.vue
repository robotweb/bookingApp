<template>
<div class="flex flex-col gap-2">
    <div class="flex flex-col gap-2 col-grid">
        <div>
            <div style="display: flex; justify-content: space-between; gap: 10px; align-items: center;">
                <Label>Client</Label>
                <Popover v-model:open="customerPopover">
                    <PopoverTrigger style="height: 1.2em;" class="cursor-pointer">
                        <Icon  name="lucide:user-plus" />
                    </PopoverTrigger>
                    <PopoverContent>
                        <Customer @saved="customerSaved"/>
                    </PopoverContent>
                </Popover>
            </div>
            <MyCombobox
                v-model="selectedClient"
                :items="customers"
                placeholder="Select Client"
            />
        </div>
        <div>
            <Label style="height: 1.2em;">Customer</Label>
            <MyCombobox
                v-model="selectedCustomer"
                :items="customers"
                placeholder="Select Customer"
            />
        </div>
    </div>
    <div class="flex gap-2 col-grid">
        <div class="flex flex-col gap-2">
            <Label>PAX Name</Label>
            <Input v-model="paxName" />
        </div>
        <div class="flex flex-col gap-2">
            <Label>Total PAX</Label>
            <Input type="number" v-model="totalPax"/>
        </div>
    </div>
    <div class="flex flex-col gap-4">
        <BookingLine v-for="(line, index) in bookingDetailLines" :key="index" v-model="bookingDetailLines[index]"/>
    </div>
    <div class="flex gap-2">
        <Button @click="addBookingLine">Add service</Button>
        <Button v-if="bookingDetailLines.length > 1" @click="removeBookingLine">Remove service</Button>
    </div>
    <DialogFooter style="justify-content: space-between;">
        <MySelect
          v-model="selectedStatus"
          :options="statuses"
          placeholder="Select status"
        />
        <Button @click="save">Save</Button>
    </DialogFooter>
</div>
</template>

<script>
import { getLocalTimeZone } from '@internationalized/date'

export default{
    data(){
        return{
            selectedCustomer: null,
            selectedClient: null,
            paxName: '',
            totalPax: null,
            selectedStatus: null,
            customerPopover: false,
            bookingDetailLines: [
                {}
            ],
            customers: [],
            team: 1,
            statuses: [
                { value: 'pending', label: 'Pending' },
                { value: 'confirmed', label: 'Confirmed' },
                { value: 'cancelled', label: 'Cancelled' }
            ]
        }
    },
    watch: {
        customerPopover(newVal) {
            this.$store.setPopoverState(newVal)
        }
    },
    async mounted(){
       this.getCustomers();
    },
    methods: {
        addBookingLine() {
            this.bookingDetailLines.push({});
        },
        removeBookingLine() {
            if (this.bookingDetailLines.length > 1) {
                this.bookingDetailLines.pop();
            }
        },
        async getCustomers() {
            const response = await this.$authFetch(API_URL+'/customer',{
                    method: "GET",
                    params: {
                        team: this.team
                    }
                })
            const result = response.map( item =>({
                value: item.id,
                label: item.name
            }))

            console.log(result)
            this.customers = result;
        },
        customerSaved(){
            this.customerPopover = false;
            this.getCustomers();
        },
        save(){
            // Convert complex date objects to simple format
            const processedBookingLines = this.bookingDetailLines.map(line => {
                const processedLine = { ...line }
                
                // Convert date if it exists
                if (line.date && line.date.toDate) {
                    const date = line.date.toDate(getLocalTimeZone())
                    processedLine.date = {
                        year: date.getFullYear(),
                        month: date.getMonth() + 1,
                        day: date.getDate()
                    }
                }
                
                return processedLine
            })

            const bookingInfo = {
                client: this.selectedClient,
                customer: this.selectedCustomer,
                paxName: this.paxName,
                totalPax: this.totalPax,
                status: this.selectedStatus,
                bookingLines: processedBookingLines
            };

            console.log('Booking Information:', bookingInfo);
            console.log('Booking Information (JSON):', JSON.stringify(bookingInfo, null, 2));
        }
    }
}
</script>

<style scoped>
.col-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.small{
    height: 1rem;
}
</style>