/* Zadaci sa casova. Zadaci 1-25 imaju sliku i C# kod; 26-30 cekaju materijale. */
const COMPLETED_ASSIGNMENTS = [
  null,
  [null, "Moj prvi C# program - ispis poruke u konzoli.", "C#|Console"],
  ["Promenljive", "Ispis podataka iz promenljivih razlicitih tipova.", "C#|Promenljive"],
  ["Poredjenje brojeva", "Unos dva broja i odredjivanje veceg broja ili jednakosti.", "C#|Uslovi"],
  ["Metode i brojac", "Pozivanje metoda i pracenje broja njihovih poziva.", "C#|Metode"],
  ["Niz nasumicnih brojeva", "Popunjavanje niza sa pet nasumicnih brojeva.", "C#|Nizovi"],
  ["Zbir elemenata niza", "Racunanje zbira nasumicno generisanih elemenata niza.", "C#|Nizovi"],
  ["Ispis niza unazad", "Ispis elemenata niza obrnutim redosledom.", "C#|Nizovi"],
  ["Matrica brojeva", "Popunjavanje i ispis matrice dimenzija 5 x 5.", "C#|Matrice"],
  ["Tacka i udaljenost", "Generisanje tacke i racunanje njene udaljenosti od koordinatnog pocetka.", "C#|Strukture"],
  ["Niz tacaka", "Generisanje i ispis koordinata deset tacaka.", "C#|Strukture|Nizovi"],
  ["Najudaljenija tacka", "Pronalazenje najvece udaljenosti medju generisanim tackama.", "C#|Strukture|Nizovi"],
  ["Plate dva radnika", "Racunanje i poredjenje plata dva radnika.", "C#|Strukture|Uslovi"],
  ["Radnik sa najmanjom platom", "Unos podataka za radnike i pronalazenje najmanje plate.", "C#|Strukture|Nizovi"],
  ["Prosledjivanje po vrednosti", "Dupliranje broja u metodi pozvanoj po vrednosti.", "C#|Metode"],
  ["Prosledjivanje referencom", "Dupliranje broja u metodi uz koriscenje ref parametra.", "C#|Metode"],
  ["Kolicnik i ostatak", "Metoda vraca kolicnik i ostatak deljenja preko out parametara.", "C#|Metode"],
  ["Proizvod i parnost", "Mnozenje dva broja i provera da li je proizvod paran.", "C#|Metode|Uslovi"],
  ["Preopterecene metode", "Sabiranje dva ili tri broja pomocu istoimenih metoda.", "C#|Metode"],
  ["Upis u datoteku", "Upis tekstualnih poruka u datoteku poruka.txt.", "C#|Datoteke"],
  ["Citanje iz datoteke", "Upis poruka, a zatim citanje njihovog sadrzaja iz datoteke.", "C#|Datoteke"],
  ["Brojevi u datoteci", "Upis i citanje dvadeset nasumicnih brojeva iz datoteke.", "C#|Datoteke"],
  ["Najveci broj u datoteci", "Pronalazenje najveceg broja medju vrednostima iz datoteke.", "C#|Datoteke|Uslovi"],
  ["Imena ucenika", "Upis i citanje imena ucenika iz tekstualne datoteke.", "C#|Datoteke|Nizovi"],
  ["Rad sa imenima ucenika", "Upis i citanje imena ucenika iz tekstualne datoteke.", "C#|Datoteke|Nizovi"],
  ["Najduze ime ucenika", "Pronalazenje imena sa najvise slova u tekstualnoj datoteci.", "C#|Datoteke|Nizovi"]
];

const ASSIGNMENTS = Array.from({ length: 30 }, (_, index) => {
  const number = index + 1;
  const assignment = {
    number,
    lesson: number,
    title: `Zadatak ${number}`,
    date: "2026-09-22",
    description: "Ovde dodaj kratak opis zadatka.",
    technologies: [],
    screenshots: [],
    requiredPatterns: []
  };
  const details = COMPLETED_ASSIGNMENTS[number];
  if (details) {
    const [title, description, technologies] = details;
    const fileNumber = String(number).padStart(2, "0");
    Object.assign(assignment, {
      title: title || assignment.title,
      description,
      technologies: technologies.split("|"),
      screenshots: [`assets/img/assignments/zadatak-${fileNumber}.png`],
      codeFile: `assets/files/zadatak-${fileNumber}.cs`
    });
  }
  if (number === 1) assignment.requiredPatterns = ["Console.WriteLine", "Console.ReadKey"];
  return assignment;
});
