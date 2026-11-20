<script setup lang="ts" generic="Type">
import { computed, nextTick, ref, watch, type VNodeChild, type VNodeRef } from 'vue';

const props = defineProps<{
    options: Type[];
    sortingFunction: (input:string, a:Type, b: Type) => number;
    renderingFunction: (x:Type) => VNodeChild;
    //what to display in the input box when an option is selected
    selectedValueFunction: (x:Type) => string;
}>()

const emit = defineEmits<{
    select: [Type]
}>()

const isFocused = ref(false);
const input = ref("");
const inputElement = ref<HTMLInputElement | null>(null);
const optionsUlElement = ref<HTMLUListElement | null>(null);
const selectedIndex = ref(0);

const sortedOptions = computed<Type[]>(() => {
    return [...props.options].sort((a, b)=>{
        return props.sortingFunction(input.value, a, b);
    });
});

watch(input, ()=>{selectedIndex.value = 0})

function onFocus(){
    isFocused.value = true;
}

function onUnfocus(){
    isFocused.value = false;
    selectedIndex.value = 0;
}

function onOptionSelect(index: number){
    const selectedOption = sortedOptions.value[index]!;
    input.value = props.selectedValueFunction(selectedOption);
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
            autocomplete="off"
            v-model="input"
        />
        <div v-if="isFocused" class="absolute bg-white h-20 overflow-scroll w-full scrollbar-thin bor">
            <ul ref="optionsUlElement">
                <li
                    v-for="(option, index) in sortedOptions"
                    :class="{'bg-blue-100': index == selectedIndex}"
                    @pointerdown.prevent
                    @click="onOptionSelect(index)"
                    @mouseenter="selectedIndex = index"
                ><component :is="renderingFunction(option)"></component></li>
            </ul>
        </div>
    </div>
</template>