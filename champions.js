import teddyrinerImage from "../Assets/oddqdcjqagrmoqssf8b1.avif";
import emilieandeolImage from "../Assets/1200x680_maxnewsworldfive268817.jpg";
import LarbiBenboudaoud from "../Assets/1200x680_maxnewsworldfive268817.jpg";
import MarieClaireRestouxGasset from "../Assets/1200x680_maxnewsworldfive268817.jpg";

export const champions = [
  {
    name: "Larbi Benboudaoud",
    weight: "100kg",
    year: 1997,
    description: "Larbi Benboudaoud est un judoka français. Il a remporté la médaille d'argent aux Jeux olympiques de 2000 à Sydney dans la catégorie des moins de 66 kg, ainsi que deux médailles de bronze aux championnats du monde, en 1999 et 2001.",
    icon: LarbiBenboudaoud
  },
  {
    name: "Teddy Riner",
    weight: "100kg",
    year: 2012,
    description: "Plongez dans l'action des Jeux Olympiques avec Teddy Riner, symbole de puissance et de maîtrise au judo. Dans ce moment épique, le monde retient son souffle, captivé par le talent et la détermination de ce champion légendaire.",
    icon: teddyrinerImage
  },
  {
    name: "Cécile Nowak-Grasso",
    weight: "-52kg",
    year: 2013,
    description: "Marie-Claire Restoux est une judokate française, championne olympique des -52 kg aux Jeux olympiques d'été de 1996 à Atlanta. Elle a également remporté deux médailles de bronzeS",
    icon: MarieClaireRestouxGasset
  },
  {
    name: "Emilie Andeol",
    weight: "78kg",
    year: 2016,
    description: "Emilie Andéol est une judokate française, championne olympique des +78 kg aux Jeux olympiques d'été de 2016 à Rio de Janeiro. Elle est également médaillée de bronze mondiale en 2014 et championne d'Europe en 2014.",
    icon: emilieandeolImage
  }
];

export function getNextChampion(currentChampions) {
  const existingNames = new Set(currentChampions.map(champ => champ.name));
  return champions.find(champion => !existingNames.has(champion.name));
}
