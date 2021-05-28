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
    public class SupplierController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public SupplierController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT SupplierID,Name,Address,Phone FROM dbo.Supplier";
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
        public JsonResult Post(Supplier supplier)
        {
            string query = @"insert into dbo.Supplier (Name, Address, Phone) values
            (
            '" + supplier.Name + @"'
            ,'" + supplier.Address + @"'
            ,'" + supplier.Phone + @"'
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
        public JsonResult Put(Supplier supplier)
        {
            string query = @"UPDATE dbo.Supplier SET 
                            Name = '" + supplier.Name + @"'
                            ,Address = '" + supplier.Address + @"'
                            ,Phone = '" + supplier.Phone + @"'
                            WHERE SupplierID = " + supplier.SupplierID + @"";
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
            string query = @"DELETE from dbo.Supplier                            
                            WHERE SupplierID = " + id + @" ";
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
