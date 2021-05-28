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
    public class HistoryPriceController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public HistoryPriceController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT HistoryID, DateOfChangePrice, NewPrice, SupplierID, DetailsID FROM dbo.HistoryPrice";
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
        public JsonResult Post(HistoryPrice history)
        {
            string query = @"INSERT INTO dbo.HistoryPrice (DateOfChangePrice, NewPrice, SupplierID, DetailsID) VALUES
            (
            '" + history.DateOfChangePrice + @"'
            ,'" + history.NewPrice + @"'
            ,'" + history.SupplierID + @"'
            ,'" + history.DetailsID + @"'
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
        public JsonResult Put(HistoryPrice history)
        {
            string query = @"UPDATE dbo.HistoryPrice SET 
                            DateOfChangePrice = '" + history.DateOfChangePrice + @"'
                            ,NewPrice = '" + history.NewPrice + @"'
                            ,SupplierID = '" + history.SupplierID + @"'
                            ,DetailsID = '" + history.DetailsID + @"'
                            WHERE HistoryID = " + history.HistoryID + @"";
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
            string query = @"DELETE from dbo.HistoryPrice                            
                            WHERE HistoryID = " + id + @"";
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
