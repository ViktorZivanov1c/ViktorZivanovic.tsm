using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zadatak_12
{
    class Program
    {
        struct radnik
        {
            public int cena, plata,sati;

        }
        static void Main(string[] args)
        {
            radnik mika, zika;
            Random x = new Random();
            mika.cena = x.Next() % 6+4;
            mika.sati = x.Next() % 100+80;
            zika.cena = x.Next() % 6+4;
            zika.sati = x.Next() % 100 + 80;
            mika.plata = mika.cena * mika.sati;
            zika.plata = zika.cena * zika.sati;
            Console.WriteLine("Mika: " + mika.cena + " eur is radio je  " +mika.sati);
            Console.WriteLine("Zika: " + zika.cena + " eur is radio je  " + zika.sati);
            Console.WriteLine();
            Console.WriteLine("Mika ima " + mika.plata);
            Console.WriteLine("Zika ima " + zika.plata);
            Console.WriteLine();

            if (mika.plata>zika.plata) Console.WriteLine("Mika je Veci ");
            if (mika.plata < zika.plata) Console.WriteLine("Zika je Veci ");
            if (mika.plata == zika.plata) Console.WriteLine("Jednaki su ");
    
            Console.ReadKey();

        }
    }
}