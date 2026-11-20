<script setup lang="ts" generic="Type">
import { computed, nextTick, ref, watch, type VNodeChild, type VNodeRef } from 'vue';

const props = defineProps<{
    options: Type[];
    //function that gives a numeric value for how similiar the text input is to this option
    //autocomplete will be sorted descending according to this function
    similarityScoreFunction: (textInput:string, x:Type) => number;
    renderingFunction: (x:Type) => VNodeChild;
    //what to display in the input box when an option is selected
    selectedValueFunction: (x: Type) => string;
    disabled?: boolean;
    initialValue?: string | null;
}>()

const emit = defineEmits<{
    select: [Type]
}>()
const isFocused = ref(false);
const inputValue = ref(props.initialValue ?? "");
const inputElement = ref<HTMLInputElement | null>(null);
const optionsUlElement = ref<HTMLUListElement | null>(null);
const selectedIndex = ref(0);

defineExpose({inputValue, inputElement});

const sortedOptions = computed<Type[]>(() => {
    return [...props.options].sort((a, b)=>{
        return props.similarityScoreFunction(inputValue.value, b) - props.similarityScoreFunction(inputValue.value, a);
    });
});

watch(inputValue, ()=>{
    selectedIndex.value = 0;
    scrollOptionIntoView();
})


function onFocus(){
    isFocused.value = true;
}

function onUnfocus(){
    isFocused.value = false;
    selectedIndex.value = 0;
}

function onOptionSelect(index: number){
    const selectedOption = sortedOptions.value[index]!;
    inputValue.value = props.selectedValueFunction(selectedOption);
    emit("select", selectedOption)

    inputElement.value?.blur();
}

function onArrowDown(){
    selectedIndex.value = Math.min(selectedIndex.value + 1, sortedOptions.value.length - 1);
    scrollOptionIntoView();
}

function onArrowUp(){
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0);
    scrollOptionIntoView();
}

function scrollOptionIntoView(){
    const selected = optionsUlElement.value?.children[selectedIndex.value];
    selected?.scrollIntoView({behavior: 'instant', block:"nearest" })
}

</script>

<template>
    <div class="relative">
        <input
            @focusin="onFocus"
            @focusout="onUnfocus"
            @keydown.arrow-down.prevent="onArrowDown"
            @keydown.arrow-up.prevent="onArrowUp"
            @keydown.enter.prevent="onOptionSelect(selectedIndex)"
            ref="inputElement"
            type="text"
            :disabled="disabled"
            autocomplete="off"
            v-model="inputValue"
            class="py-2 pl-1"
        />
        <div v-if="isFocused" class="absolute bg-surface h-25 overflow-scroll w-full scrollbar-thin z-50 border rounded-sm border-separator">
            <ul ref="optionsUlElement">
                <li
                    v-for="(option, index) in sortedOptions"
                    :class="{'bg-blue-100': index == selectedIndex}"
                    @pointerdown.prevent
                    @click="onOptionSelect(index)"
                    @mouseenter="selectedIndex = index"
                ><component :is="renderingFunction(option)" class="p-1"></component></li>
            </ul>
        </div>
    </div>
</template>