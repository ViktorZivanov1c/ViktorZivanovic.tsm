using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zadatak_15
{
    class ProgramS
    {
        static void Dupliraj(ref int x)
        {
            x = x * 2;
            Console.WriteLine("U metodi broj je: " + x);
        }


        static void Main(string[] args)
        {
            int broj = 10;
            Dupliraj(ref broj);
            Console.WriteLine("Van metode broj je: " + broj);
            Console.ReadKey();
        }
    }
}