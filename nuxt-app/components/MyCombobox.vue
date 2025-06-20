<template>
    <Combobox v-model="selectedValue" by="label">
    <ComboboxAnchor>
        <div class="relative w-full max-w-sm items-center">
            <ComboboxInput 
                :display-value="(val: Item | null) => val?.label ?? ''" 
                :placeholder="placeholder" 
            />
        </div>
    </ComboboxAnchor>
    <ComboboxList>
        <ComboboxEmpty>
            No items found.
        </ComboboxEmpty>
        <ComboboxGroup>
            <ComboboxItem
                v-for="item in items"
                :key="item.value"
                :value="item"
            >
                {{ item.label }}
                <ComboboxItemIndicator>
                    <Check class="ml-auto h-4 w-4" />
                </ComboboxItemIndicator>
            </ComboboxItem>
        </ComboboxGroup>
    </ComboboxList>
    </Combobox>
</template>

<script lang="ts">
import { Check } from 'lucide-vue-next'

interface Item {
    label: string
    value: string | number
}

export default defineComponent({
    name: 'MyCombobox',
    props: {
        items: {
            type: Array as PropType<Item[]>,
            required: true
        },
        modelValue: {
            type: Object as PropType<Item | null>,
            default: null
        },
        placeholder: {
            type: String,
            default: 'Select an option...'
        }
    },
    emits: ['update:modelValue'],
    computed: {
        selectedValue: {
            get() {
                return this.modelValue
            },
            set(value: Item | null) {
                this.$emit('update:modelValue', value)
            }
        }
    },
    mounted(){
        console.log(this.items)
    }
})
</script>