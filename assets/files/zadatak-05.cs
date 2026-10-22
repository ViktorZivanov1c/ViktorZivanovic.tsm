using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zadatak_5
{
    class Program
    {
        static void Main(string[] args)
        {
            int[] brojevi = new int[5];
            Random x = new Random();
            for (int i = 0; i < 5; i++)
            {
                brojevi[i] = x.Next() % 100;
                Console.WriteLine("Element[" + i + "]=" + brojevi[i]);
            }
            Console.ReadKey();
        }
    }
}