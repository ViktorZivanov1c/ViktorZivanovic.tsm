using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zadatak_4
{
    class Program
    {
        static int brojac = 0;
        static void Pozovi()
        {
            brojac++;
            Console.WriteLine("Metoda je pozvana " + brojac + ".put");


        }
        static void Druga()
        {
            brojac += 3;
            Console.WriteLine("Druga metoda je pozvana " + brojac + ".put");


        }
        static void Main(string[] args)
        {
            Pozovi(); Druga(); Pozovi(); Pozovi();
            Console.ReadKey();
        }
    }
}