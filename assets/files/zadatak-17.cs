using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zadatak_18
{
    class Program
    {
        static int Mnozi(int x, int y)
        {
            int rez = x * y;
            return rez;

        }

        static void Parnost(int x)
        {
            int ostatak = x % 2;
            if (ostatak == 0) Console.WriteLine("Proizvod je paran");
            if (ostatak == 1) Console.WriteLine("Proizvod je neparan");


        }

        static void Main(string[] args)
        {
            int a, b;
            string z;
            Console.WriteLine("Unesi prvi broj");
            z = Console.ReadLine();
            a = Convert.ToInt32(z);

            Console.WriteLine("Unesi drugi broj");
            z = Console.ReadLine();
            b = Convert.ToInt32(z);

            int rezultat = Mnozi(a, b);

            Console.WriteLine("Proizvod je " + rezultat);
            Parnost(rezultat);
            Console.ReadKey();

        }
    }
}