using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zadatak_19
{
    class Program
    {
       

        static int Saberi(int a, int b)
        {
            return a + b;

        }
        static int Saberi(int a, int b, int c)
        {
            return a + b + c;

        }

        static void Main(string[] args)
        {
            

            int t1 = 5, t2 = 8, t3 = 12;
            Console.WriteLine("Prvo sa 2 sabiranje je: " + Saberi(t1, t3));
            Console.WriteLine("Drugo sa 2 sabiranje je: " + Saberi(t2, t3));
            Console.WriteLine("Trece sa 3 sabiranje je: " + Saberi(t1, t2, t3));



            Console.ReadKey();

        }
    }
}