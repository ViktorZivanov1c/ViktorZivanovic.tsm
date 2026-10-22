using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zadatak_9
{
    class Program
    {
        struct tacka
        {
            public int x, y;

        }
        static void Main(string[] args)
        {
            tacka p;
            Random broj = new Random();
            p.x = broj.Next() % 100;
            p.y = broj.Next() % 100;

            double d = Math.Sqrt(p.x * p.x + p.y * p.y);

            Console.WriteLine("Tacka je na: "+p.x+" i "+p.y);
            Console.WriteLine("Udaljenost je: " + $"{d:F2}");
            Console.ReadKey();

        }
    }
}