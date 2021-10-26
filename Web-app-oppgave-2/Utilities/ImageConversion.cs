using System.IO;
using System.Drawing;
using System.Net.Mime;


namespace Web_app_oppgave_2.Utilities
{
    public class ImageConversion
    {
        public static byte[] BildeTilByte(Image bilde)
        {
            
            using (MemoryStream ms = new MemoryStream())
            {
                bilde.Save(ms, bilde.RawFormat);
                return ms.ToArray();
            }    
        }

        public static Image ByteTilBilde(byte[] bytes)
        {
            using (MemoryStream ms = new MemoryStream(bytes))
            {
                return Image.FromStream(ms);
            }
        }
    }
}