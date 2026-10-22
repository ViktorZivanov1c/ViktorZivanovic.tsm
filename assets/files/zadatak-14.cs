using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zadatak_14
{
    class Program
    {
        static void Dupliraj(int x)
        {
            x = x * 2;
            Console.WriteLine("U metodi broj je: " +x);
        } 


        static void Main(string[] args)
        {
            int broj = 10;
            Dupliraj(broj);
            Console.WriteLine("Van metode broj je: " + broj);
            Console.ReadKey();
        }
    }
}