using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace Zadatak_23
{
    class Program
    {
        static void Main(string[] args)
        {
            Random x = new Random();
            StreamWriter fajl = new StreamWriter("brojevi.txt");
            for (int i = 0; i < 20; i++)
                fajl.WriteLine(x.Next()%100);

            fajl.Close();

            string s;int max = 0;
            StreamReader citaj = new StreamReader("brojevi.txt");
            while ((s = citaj.ReadLine()) != null)
            {
                Console.WriteLine(s);
                if (max < Convert.ToInt32(s)) max = Convert.ToInt32(s);
            }
            citaj.Close();
            Console.WriteLine("Najveci broj je: "+max);

            Console.ReadKey();
        }
    }
}