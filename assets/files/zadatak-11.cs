using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zadatak_11
{
    class Program
    {
        struct tacka
        {
            public int x, y;

        }
        static void Main(string[] args)
        {
            double max = 0;
            tacka[] niz = new tacka[10];
            Random broj = new Random();
            for (int i = 0; i < 10; i++)
            {
                niz[i].x = broj.Next() % 100;
                niz[i].y = broj.Next() % 100;
                double d = Math.Sqrt(niz[i].x * niz[i].x + niz[i].y * niz[i].y);
                if (d > max) max = d;

                Console.WriteLine("Tacka " + i + " je na: " + niz[i].x + " i " + niz[i].y);
                Console.WriteLine("*** udaljenost = " + $"{d:F2}");
                Console.WriteLine();

            }
            Console.WriteLine("Max udaljenost = " + $"{max:F2}");


            Console.ReadKey();

        }
    }
}