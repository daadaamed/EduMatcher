<script setup lang="ts">
type Section = { subtitle: string; options: string[] };

const props = defineProps<{
  title: string;
  sections: Section[];
  modelValue?: Record<string, string[]>; // committed selection
}>();

const emit = defineEmits<{
  'update:modelValue': [Record<string, string[]>];
  confirm: [Record<string, string[]>];
}>();

const open = ref(false);

// helpers
const clone = <T,>(o: T): T => JSON.parse(JSON.stringify(o));
const count = (o: Record<string, string[]>) =>
  Object.values(o).reduce((n, arr) => n + (arr?.length ?? 0), 0);

// committed (from parent) and draft (local while dropdown is open)
const committed = computed<Record<string, string[]>>(() => props.modelValue ?? {});
const draft = ref<Record<string, string[]>>(clone(committed.value));

watch(open, (isOpen) => {
  if (isOpen) draft.value = clone(committed.value); // start from committed on open
});

const committedCount = computed(() => count(committed.value));
const draftCount = computed(() => count(draft.value));

const toggle = () => (open.value = !open.value);

const choose = (subtitle: string, opt: string) => {
  const curr = new Set(draft.value[subtitle] ?? []);
  curr.has(opt) ? curr.delete(opt) : curr.add(opt);
  draft.value = { ...draft.value, [subtitle]: Array.from(curr) };
};

const summary = computed(() => {
  if (committedCount.value === 0) return "";
  return props.sections
    .map(s => {
      const vals = committed.value[s.subtitle] ?? [];
      if (!vals.length) return null;
      return `${vals.join(", ")}`;
    })
    .filter(Boolean)
    .join(" | ");
});

const onConfirm = () => {
  emit('update:modelValue', clone(draft.value));
  emit('confirm', clone(draft.value));
  open.value = false;
};
</script>

<template>
  <section class="rounded-2xl border border-divider bg-white p-4 shadow-sm">
    <div class="flex items-start">
      <h2 class="flex-1 text-base font-semibold">{{ title }}</h2>
      <span v-if="committedCount === 0" class="mr-2 text-sm text-muted">uncomplete</span>
      <button
        type="button"
        class="ml-auto inline-flex size-8 items-center justify-center rounded-xl hover:bg-gray-100"
        :aria-expanded="open"
        @click="toggle"
      >
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <!-- committed summary when closed -->
    <p v-if="!open && summary" class="mt-1 text-sm text-secondary">{{ summary }}</p>

    <!-- draft selection when open -->
    <div v-if="open" class="mt-3 space-y-3">
      <div v-for="(sec, idx) in sections" :key="sec.subtitle">
        <p class="mb-2 text-sm font-medium text-primary/80">{{ sec.subtitle }}</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="opt in sec.options"
            :key="opt"
            type="button"
            :aria-pressed="(draft[sec.subtitle] ?? []).includes(opt)"
            @click="choose(sec.subtitle, opt)"
            :class="[
              'rounded-full border px-4 py-2 text-sm',
              (draft[sec.subtitle] ?? []).includes(opt)
                ? 'bg-white text-primary border-primary'
                : 'bg-card text-primary border-divider hover:bg-gray-50'
            ]"
          >
            {{ opt }}
          </button>
        </div>
        <div v-if="idx < sections.length - 1" class="my-3 h-px w-full bg-divider"></div>
      </div>

      <!-- Confirm button (commits draft -> parent) -->
      <div class="mt-4">
        <button
          type="button"
          :disabled="draftCount === 0"
          @click="onConfirm"
          :class="[
            'w-full rounded-xl px-4 py-2 text-sm transition',
            draftCount === 0
              ? 'bg-white text-muted border border-muted cursor-not-allowed'
              : 'bg-primary text-white border border-primary hover:opacity-90'
          ]"
        >
          Confirmer
        </button>
      </div>
    </div>
  </section>
</template>
