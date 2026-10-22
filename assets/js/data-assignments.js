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
  const assignment = {
    number,
    lesson: number,
    title: `Zadatak ${number}`,
    date: "2026-09-22",
    description: "Ovde dodaj kratak opis zadatka.",
    technologies: [],
    screenshots: [],
    // Opciona pravila za proveru izvornog C# koda, npr. ["Console.WriteLine"].
    requiredPatterns: []
  };

  if (number === 1) {
    Object.assign(assignment, {
      description: "Moj prvi C# program — ispis poruke u konzoli.",
      technologies: ["C#", "Console"],
      screenshots: ["assets/img/assignments/zadatak-01.png"],
      codeFile: "assets/files/zadatak-01.cs",
      requiredPatterns: ["Console.WriteLine", "Console.ReadKey"]
    });
  }

  return assignment;
});
