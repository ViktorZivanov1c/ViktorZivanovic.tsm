using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace Zadatak_21
{
    class Program
    {
        static void Main(string[] args)
        {
            StreamWriter fajl = new StreamWriter("poruka.txt");

            fajl.WriteLine("Zdravo iz C# programa!");
            fajl.WriteLine("Ovo je druga linija teksta!");
            fajl.WriteLine("Ovo je treca linija teksta!");
            fajl.Write("PROBA");
            fajl.Write(" NOVA");
            fajl.Close();

            string s;
            StreamReader citaj = new StreamReader("poruka.txt");
            while ((s = citaj.ReadLine()) != null)
            {
                Console.WriteLine(s);
            }
            citaj.Close();

            Console.ReadKey();
        }
    }
}