<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="booking in bookings" :key="booking.id">
        {{ booking }}
      </div>
    </div>
    <Dialog>
      <DialogTrigger>
        <Button>
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <!-- <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> -->
        </DialogHeader>
        <div 
          class="max-h-[60vh] overflow-y-auto scrollbar-hide" 
          style="padding: 8px;"
          :class="{ 'overflow-hidden': $store.isAnyPopoverOpen }"
        >
          <Booking class="overflow-visible" />
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loading: false,
      bookings: []
    }
  },
  methods: {
    async getBookings() {
      this.$store.setLoading(true)
      try {
        const response = await this.$authFetch(API_URL + '/booking')
        if (!response.ok) {
          throw new Error('Failed to fetch bookings')
        }
        const data = await response.json()
        this.bookings = data
      } catch (e) {
        console.error('Error fetching bookings:', e)
        this.$store.setError(e)
      } finally {
        this.$store.setLoading(false)
      }
    }
  },
  mounted() {
    //this.getBookings()
  }
}
</script>

<style scoped>
.overflow-hidden{
  overflow-y: hidden !important;
}
</style>