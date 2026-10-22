using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace Zadatak_24
{
    class Program
    {
        static void Main(string[] args)
        {
            string[] ucenici = { "Ana", "Marko", "Jovana", "Petar", "Milica" };
            StreamWriter pisac = new StreamWriter("ucenici.txt");
            foreach (string ime in ucenici)
            {
                pisac.WriteLine(ime);
            }
            pisac.Close();
            Console.WriteLine("Imena ucenika su unesena");
            StreamReader citac = new StreamReader("ucenici.txt");
            string s;
            while ((s = citac.ReadLine()) != null)
            {
                Console.WriteLine(s);

            }
            citac.Close();
            Console.ReadKey();
        }
    }
}