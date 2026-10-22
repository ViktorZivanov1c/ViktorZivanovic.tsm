using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Text;
using System.Threading.Tasks;

namespace Zadatak_8
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int[,] niz = new int[5, 5];
            Random x = new Random();
            for (int i = 0; i < 5; i++)
            {
                for (int j = 0; j < 5; j++)
                {
                    niz[i, j] = x.Next() % 100;
                    Console.Write($"{niz[i, j],3}");


                }
                Console.WriteLine();
            }
            Console.ReadKey();
        }
    }
}