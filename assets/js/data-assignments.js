/*
  ZADACI SA CASOVA

  Kada dodas sliku u assets/img/assignments/, kopiraj primer ispod
  u niz ASSIGNMENTS i popuni podatke.

  {
    number: 1,
    lesson: 1,
    title: "Naziv zadatka",
    date: "2026-09-22",
    description: "Kratak opis zadatka.",
    screenshots: ["assets/img/assignments/naziv-slike.png"]
  }
*/
// Privremeni unosi za testiranje prikaza i pretrage.
const ASSIGNMENTS = Array.from({ length: 20 }, (_, index) => {
  const number = index + 1;
  return {
    number,
    lesson: number,
    title: `Zadatak ${number}`,
    date: "2026-09-22",
    description: "Ovde dodaj kratak opis zadatka.",
    technologies: [],
    screenshots: []
  };
});
