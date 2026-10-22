using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zadatak_10
{
    class Program
    {
        struct tacka
        {
            public int x, y;

        }
        static void Main(string[] args)
        {

            tacka[] niz = new tacka[10];
            Random broj = new Random();
            for (int i = 0; i < 10; i++)
            {
                niz[i].x = broj.Next() % 100;
                niz[i].y = broj.Next() % 100;
                double d = Math.Sqrt(niz[i].x * niz[i].x + niz[i].y * niz[i].y);
                Console.WriteLine("Tacka " + i + " je na: " + niz[i].x + " i " + niz[i].y);

            }


            Console.ReadKey();

        }
    }
}