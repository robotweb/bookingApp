<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'w-full justify-start text-left font-normal',
          !computedValue && 'text-muted-foreground',
        )"
      >
        <Icon name="lucide:clock" class="mr-2 h-4 w-4 opacity-50" />
        {{ computedValue ? formatTime(computedValue) : "Pick a time" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <div class="p-3">
        <div class="grid gap-2">
          <div class="grid grid-cols-2 gap-2">
            <div class="space-y-2">
              <Label>Hours</Label>
              <Select v-model="hours">
                <SelectTrigger>
                  <SelectValue :placeholder="'00'" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="h in 24" :key="h-1" :value="(h-1).toString()">
                    {{ (h-1).toString().padStart(2, '0') }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="space-y-2">
              <Label>Minutes</Label>
              <Select v-model="minutes">
                <SelectTrigger>
                  <SelectValue :placeholder="'00'" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="m in 60" :key="m-1" :value="(m-1).toString()">
                    {{ (m-1).toString().padStart(2, '0') }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script>
import { cn } from '@/lib/utils'

export default {
  props: {
    value: {
      type: Object,
      default: null
    }
  },
  emits: ['update:value'],
  data() {
    return {
      hours: '00',
      minutes: '00'
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('update:value', val)
      }
    }
  },
  watch: {
    hours(newHours) {
      this.updateTime()
    },
    minutes(newMinutes) {
      this.updateTime()
    },
    value: {
      handler(newValue) {
        if (newValue) {
          this.hours = newValue.hour.toString().padStart(2, '0')
          this.minutes = newValue.minute.toString().padStart(2, '0')
        }
      },
      immediate: true
    }
  },
  methods: {
    cn,
    updateTime() {
      this.computedValue = {
        hour: parseInt(this.hours),
        minute: parseInt(this.minutes)
      }
    },
    formatTime(time) {
      if (!time) return ''
      const hours = time.hour.toString().padStart(2, '0')
      const minutes = time.minute.toString().padStart(2, '0')
      return `${hours}:${minutes}`
    }
  }
}
</script>