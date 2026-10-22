using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zadatak_16
{
    class Program
    {


        static void Podeli(int a, int b, out int kol, out int ost)
        {
            kol = a / b;
            ost = a % b;
        }
        static void Main(string[] args)
        {
            int x, y;
            int rezkol, rezost;
            x = 9; y = 4;
            Podeli(x, y, out rezkol, out rezost);
            Console.WriteLine("Delim " + x + " sa " + y + " i rezultat je ");
            Console.WriteLine(rezkol + " a ostatak je " + rezost);

            Console.ReadKey();
        }
    }
}