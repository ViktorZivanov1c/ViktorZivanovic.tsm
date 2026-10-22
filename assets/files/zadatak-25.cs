using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace Zadatak_25
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
            string s; string temp = "";int max = 0;
            while ((s = citac.ReadLine()) != null)
            {
                Console.WriteLine(s);
                if (s.Length>=max) {
                    temp = s;
                    max = s.Length;
                }
            }
            citac.Close();
            Console.WriteLine("Najduze ima ima "+max+" slova i to je "+temp);


            Console.ReadKey();
        }
    }
}