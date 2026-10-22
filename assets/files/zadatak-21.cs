using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace Zadatak_22
{
    class Program
    {
        static void Main(string[] args)
        {
            Random x = new Random();
            StreamWriter fajl = new StreamWriter("brojevi.txt");
            for (int i = 0; i < 20; i++)
                fajl.WriteLine(x.Next());

            fajl.Close();

            string s;
            StreamReader citaj = new StreamReader("brojevi.txt");
            while ((s = citaj.ReadLine()) != null)
            {
                Console.WriteLine(s);
            }
            citaj.Close();

            Console.ReadKey();
        }
    }
}