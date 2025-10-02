<script setup lang="ts">
type School = { name: string; city: string; type: "Public" | "Privé" };
const { data, pending, refresh } = await useFetch<School>("/api/school");
const classe = ref<Record<string, string[]>>({});
const specialites = ref<Record<string, string[]>>({});
const notes = ref<Record<string, string[]>>({});
</script>
<template>
  <main class="px-4 py-10">
    <section class="school-card mx-auto">
        <div class="flex flex-wrap items-start md:items-center gap-3">
            <div class="min-w-0 flex-1">
                <h1 class="text-2xl font-semibold truncate">{{ pending ? "…" : data?.name }}</h1>
                <div class="text-sm/6 opacity-90">
                  <span v-if="pending">…</span>
                  <div v-else class="flex flex-wrap items-center gap-3">
                    <span class="inline-flex items-center gap-1.5">
                      <img src="/map.png" alt="" class="h-4 w-4" />
                      {{ data?.city }}
                    </span>
                    <span class="inline-flex items-center gap-1.5">
                      <img src="/building.png" alt="" class="h-4 w-4" />
                      {{ data?.type }}
                    </span>
                  </div>
                </div>
            </div>
            <button
            class="order-last self-start  basis-full bg-white text-primary   md:order-none md:basis-auto md:ml-auto rounded-xl border border-divider px-4 py-2 text-sm"
            @click="refresh()"
            >
                Modifier
            </button>
        </div>
    </section>
    <div class="mx-auto mt-6 max-w-[720px]">
          <ChoiceCard
            title="Classe"
            :sections="[
                { subtitle: '', options: ['Seconde','Première','Terminale'] },
                { subtitle: 'Générales', options: ['Mathématiques','Physique-Chimie','SVT','SES','HGGSP','NSI'] },
            ]"
            
            v-model="classe"
          />
    </div>
    <div class="mx-auto mt-6 max-w-[720px]">
        <ChoiceCard
        title="Spécialités"
        :sections="[
        ]"
        v-model="specialites"
        />
    </div>
    <div class="mx-auto mt-6 max-w-[720px]">
        <ChoiceCard
        title="notes"
        :sections="[
        ]"
        v-model="notes"
        />
    </div>
  </main>
</template>
