using Org.BouncyCastle.Asn1.Cms;
using Org.BouncyCastle.Asn1.X509;

namespace mysqlCsharpvuejs.Models
{
    public class Cviky
    {
        public int CvikyId { get; set; }
        public string? DruhCviku { get; set; }
        public TimeSpan? CasCviku { get; set; }
        public DateTime? DenCviku { get; set; }
    }
}
