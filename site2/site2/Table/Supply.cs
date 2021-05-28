using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Site2.Table
{
    public class Supply
    {
        public int SupplyID { get; set; }
        public int Amount { get; set; }
        public DateTime Date { get; set; }
        public int SupplierID { get; set; }
    }
}
