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
  } else if (number === 2) {
    Object.assign(assignment, {
      title: "Promenljive",
      description: "Ispis podataka iz promenljivih različitih tipova.",
      technologies: ["C#", "Promenljive"],
      screenshots: ["assets/img/assignments/zadatak-02.png"],
      codeFile: "assets/files/zadatak-02.cs"
    });
  } else if (number === 3) {
    Object.assign(assignment, {
      title: "Poređenje brojeva",
      description: "Unos dva broja i određivanje većeg broja ili jednakosti.",
      technologies: ["C#", "Uslovi"],
      screenshots: ["assets/img/assignments/zadatak-03.png"],
      codeFile: "assets/files/zadatak-03.cs"
    });
  } else if (number === 4) {
    Object.assign(assignment, {
      title: "Metode i brojač",
      description: "Pozivanje metoda i praćenje broja njihovih poziva.",
      technologies: ["C#", "Metode"],
      screenshots: ["assets/img/assignments/zadatak-04.png"],
      codeFile: "assets/files/zadatak-04.cs"
    });
  }

  return assignment;
});
