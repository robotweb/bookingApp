<template>
  <Select v-model="computedValue">
    <SelectTrigger class="w-[180px]">
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel v-if="label">{{ label }}</SelectLabel>
        <SelectItem 
          v-for="option in options" 
          :key="option.value" 
          :value="option.value"
        >
          {{ option.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    placeholder: {
      type: String,
      default: 'Select an option'
    },
    label: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  computed: {
    computedValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  }
}
</script>