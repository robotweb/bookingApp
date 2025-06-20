<template>
<Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'w-full justify-start text-left font-normal',
          !value && 'text-muted-foreground',
        )"
      >
        <Icon name="lucide:calendar" class="mr-2 h-4 w-4 opacity-50" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value" initial-focus />
    </PopoverContent>
  </Popover>
</template>

<script setup>
import { cn } from '@/lib/utils'
import { getLocalTimeZone } from '@internationalized/date'
import { DateFormatter } from '@internationalized/date'

const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
})

const value = defineModel('value', {
  type: Object,
  default: null
})
</script>