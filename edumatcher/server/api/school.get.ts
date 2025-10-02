import { defineEventHandler } from "h3";

const names = [
  "Etienne Dolet",
  "Lycée privé Charles de Foucauld",
  "Lycée polyvalent Guillaume Tirel",
  "Lycée polyvalent l'Initiative",
  "Lycée polyvalent privé Saint Jean de Montmartre",
  "Lycée privé Pascal",
  "Lycée du bâtiment et des travaux publics",
  "Lycée polyvalent privé Saint-Nicolas",
  "Lycée privé La Rochefoucauld",
  "Lycée technique privé de l'école technique supérieure du laboratoire",
  "Lycée privé Charles Péguy",
  "Lycée privé Sainte-Louise",
  "Lycée privé L'Ecole alsacienne",
  "Lycée polyvalent ESAA-Ecole Boulle",
  "Lycée polyvalent Paul Poiret",
  "Lycée Charlemagne",
  "Lycée Claude Monet",
  "Lycée privé Lucien de Hirsch",
  "Lycée privé Saint-Michel de Picpus",
];

const arrs = ["Paris 3e","Paris 5e","Paris 6e","Paris 11e","Paris 12e","Paris 13e","Paris 14e","Paris 15e","Paris 16e","Paris 17e","Paris 18e"];
const types = ["Public", "Privé"] as const;
const pick = <T,>(a: readonly T[]) => a[Math.floor(Math.random() * a.length)];

export default defineEventHandler(() => {
  return {
    name: pick(names),
    city: pick(arrs),
    type: pick(types)
  };
});
