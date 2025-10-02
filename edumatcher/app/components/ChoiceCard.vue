<script setup lang="ts">
const props = defineProps<{ title: string; options: string[]; modelValue?: string[] }>();
const emit = defineEmits<{ 'update:modelValue': [string[]] }>();

const open = ref(false);
const selected = computed<string[]>({
  get: () => props.modelValue ?? [],
  set: (v) => emit('update:modelValue', v)
});
const toggle = () => (open.value = !open.value);
const choose = (opt: string) => { 
    const set = new Set(selected.value);
    set.has(opt) ? set.delete(opt) : set.add(opt);
    selected.value = Array.from(set);
 };
</script>

<template>
  <section class="rounded-2xl border border-divider bg-white p-4 shadow-sm">
    <div class="flex items-start">
      <h2 class="flex-1 text-base font-semibold">{{ title }}</h2>
      <span v-if="selected.length === 0" class="mr-2 text-sm text-muted">uncomplete</span>
      <button
        type="button"
        class="ml-auto inline-flex size-8 items-center justify-center rounded-md hover:bg-gray-100"
        :aria-expanded="open"
        @click="toggle"
      >
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <p v-if="!open && selected.length" class="mt-1 text-sm text-secondary">
      {{ selected.join(', ') }}
    </p>

    <div v-if="open" class="mt-3 flex flex-wrap gap-2">
      <button
        v-for="opt in options"
        :key="opt"
        type="button"
        :aria-pressed="selected.includes(opt)"
        @click="choose(opt)"
        :class="[
          'rounded-full border px-4 py-2 text-sm',
          selected.includes(opt)
            ? 'bg-primary text-white border-primary'
            : 'bg-white text-primary border-divider hover:bg-gray-50'
        ]"
      >
        {{ opt }}
      </button>
    </div>
  </section>
</template>
