using System;

namespace ZadatakRadnici
{
    // 1. Definisanje strukture Radnik
    struct Radnik
    {
        public double BrojSati;
        public double CenaPoSatu;

        // Metoda za izračunavanje ukupne plate radnika
        public double IzracunajPlatu()
        {
            return BrojSati * CenaPoSatu;
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            // 2. Kreiranje niza od 8 radnika
            Radnik[] radnici = new Radnik[8];

            // Unos podataka za svakog radnika
            for (int i = 0; i < radnici.Length; i++)
            {
                Console.WriteLine($"--- Radnik {i + 1} ---");

                Console.Write("Unesite broj sati: ");
                radnici[i].BrojSati = Convert.ToDouble(Console.ReadLine());

                Console.Write("Unesite cenu po satu: ");
                radnici[i].CenaPoSatu = Convert.ToDouble(Console.ReadLine());

                Console.WriteLine();
            }

            // 3. Pronalaženje radnika sa najmanjom potom
            int indeksNajmanjeg = 0;
            double najmanjaPlata = radnici[0].IzracunajPlatu();

            for (int i = 1; i < radnici.Length; i++)
            {
                double trenutnaPlata = radnici[i].IzracunajPlatu();

                if (trenutnaPlata < najmanjaPlata)
                {
                    najmanjaPlata = trenutnaPlata;
                    indeksNajmanjeg = i;
                }
            }

            // Ispis rezultata
            Console.WriteLine("==========================================");
            Console.WriteLine($"Radnik sa najmanjom potom je radnik broj {indeksNajmanjeg + 1}.");
            Console.WriteLine($"Njegova plata iznosi: {najmanjaPlata}");

            Console.ReadKey();
        }
    }
}