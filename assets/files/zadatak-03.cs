using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zadatak_3
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Unesite prvi broj: ");
            string x = Console.ReadLine();
            int a = Convert.ToInt32(x);
            Console.WriteLine("Unesite drugi broj: ");
            int b = Convert.ToInt32(Console.ReadLine());
            bool prvijeveci = a > b;
            bool drugijeveci = a < b;
            bool jednaki = a == b;

            if (prvijeveci) Console.WriteLine("Prvi je veci ");
            if (drugijeveci) Console.WriteLine("Drugi je veci ");
            if (jednaki) Console.WriteLine("Jednaki su");

            Console.ReadKey();


        }
    }
}