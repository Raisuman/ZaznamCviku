using Org.BouncyCastle.Asn1.Cms;
using Org.BouncyCastle.Asn1.X509;

namespace mysqlCsharpvuejs.Models
{
    public class Trenink
    {
        public int TreninkId { get; set; }
        public string? DenTrenink { get; set; }
        public TimeSpan? OdCasTrenink { get; set; }
        public TimeSpan? DoCasTrenink { get; set; }
    }
}
