using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zadatak_7
{
    class Program
    {
        static void Main(string[] args)
        {
            int a = 0;
            int[] brojevi = new int[6];
            Random x = new Random();
            for (int i = 0; i < 5; i++)
            {
                brojevi[i] = x.Next() % 100;
                Console.WriteLine("Element[" + i + "]=" + brojevi[i]);
                a += brojevi[i];
            }
            Console.WriteLine("Zbir je " + a);
            for (int i = 4; i > -1; i--)
            {

                Console.WriteLine("Element[" + i + "]=" + brojevi[i]);
                a += brojevi[i];
            }

            Console.ReadKey();
        }
    }
}