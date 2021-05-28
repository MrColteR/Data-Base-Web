using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using Site2.Table;

namespace Site2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplyController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public SupplyController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT SupplyID,Amount,Date,SupplierID FROM dbo.Supply";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SupplierAppCon");
            SqlDataReader myReader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand myCommand = new SqlCommand(query, con))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); 
                    myReader.Close();
                    con.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Supply supply)
        {
            string query = @"INSERT INTO dbo.Supplier (Amount, Date, SupplierID) VALUES
            (
            '" + supply.Amount + @"'
            ,'" + supply.Date + @"'
            ,'" + supply.SupplierID + @"'
            )";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SupplierAppCon");
            SqlDataReader myReader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand myCommand = new SqlCommand(query, con))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    con.Close();
                }
            }

            return new JsonResult("Добавлен поставщик");
        }

        [HttpPut]
        public JsonResult Put(Supply supply)
        {
            string query = @"UPDATE dbo.Supplier SET 
                            Amount = '" + supply.Amount + @"'
                            ,Date = '" + supply.Date + @"'
                            ,SupplierID = '" + supply.SupplierID + @"'
                            WHERE SupplyID = " + supply.SupplyID + @"";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SupplierAppCon");
            SqlDataReader myReader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand myCommand = new SqlCommand(query, con))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    con.Close();
                }
            }

            return new JsonResult("Изменен");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"DELETE from dbo.Supply                            
                            WHERE SupplyID = " + id + @"";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SupplierAppCon");
            SqlDataReader myReader;
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand myCommand = new SqlCommand(query, con))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    con.Close();
                }
            }

            return new JsonResult("Удален");
        }
    }
}
