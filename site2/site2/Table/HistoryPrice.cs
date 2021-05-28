using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Site2.Table
{
    public class HistoryPrice
    {
        public int HistoryID { get; set; }
        public DateTime DateOfChangePrice { get; set; }
        public int NewPrice { get; set; }
        public int SupplierID { get; set; }
        public int DetailsID { get; set; }
    }
}
