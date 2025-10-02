<!-- app/pages/result.vue -->
<script setup lang="ts">
const back = () => navigateTo("/");
const percent = 91;           // progress value
const size = 96;              // svg box
const stroke = 8;             // ring thickness
const r = (size - stroke) / 2;
const circumference = 2 * Math.PI * r;
const offset = circumference * (1 - percent / 100);
</script>

<template>
  <main class="mx-auto max-w-[720px] px-4 py-10">
    <div class="flex flex-col gap-4 md:gap-6">
      <!-- Card 1 (81px mobile / ~96px web) -->
      <section class="h-[81px] md:h-[96px] rounded-2xl bg-beige-300 p-4 text-center flex flex-col items-center justify-center">
        <p class="text-sm text-secondary inline-flex items-center gap-2">
          EDHEC Business School |
          <img src="/map.png" alt="" class="h-4 w-4" />
          Roubaix
        </p>
        <h2 class="mt-1 text-lg font-bold text-primary">EDHEC Business School</h2>
      </section>

      <!-- Card 2 (345px mobile / ~420px web) -->
      <section class="h-[345px] md:h-[420px] rounded-2xl border border-divider bg-white p-6 text-center flex flex-col items-center justify-center gap-3">
        <div class="relative h-24 w-24">
          <svg :viewBox="`0 0 ${size} ${size}`" class="-rotate-90 h-full w-full" fill="none">
                <defs>
                    <linearGradient id="brandRing" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#FF7342"/>
                    <stop offset="100%" stop-color="#B176FF"/>
                    </linearGradient>
                </defs>

                <!-- track -->
                <circle :cx="size/2" :cy="size/2" :r="r" stroke="var(--color-divider)" :stroke-width="stroke" />

                <!-- progress ring with brand gradient -->
                <circle
                    :cx="size/2" :cy="size/2" :r="r"
                    stroke="url(#brandRing)" :stroke-width="stroke" stroke-linecap="round"
                    :stroke-dasharray="circumference" :stroke-dashoffset="offset"
                />
            </svg>
          <img src="/flash.png" alt="" class="absolute inset-0 m-auto h-10 w-10" />
        </div>
        <h3 class="text-3xl font-bold text-primary">91% · Très élevées</h3>
        <p class="text-sm text-secondary">Fiabilité</p>
        <div class="text-xl leading-none">
          <span class="text-primary">★★★★</span><span class="text-divider">★</span>
        </div>
        <p class="mt-2 max-w-[560px] text-sm text-secondary">
          Cette estimation est fournie à titre indicatif et ne garantit en aucun cas la décision d’admission de l’établissement.
        </p>
      </section>

      <!-- Bottom button -->
      <button
        class="w-full rounded-3xl bg-primary px-4 py-3 text-sm text-white hover:opacity-90"
        @click="back"
      >
        Tester une autre formation
      </button>
    </div>
  </main>
</template>
