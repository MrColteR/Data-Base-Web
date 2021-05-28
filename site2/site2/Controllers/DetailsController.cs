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
    public class DetailsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public DetailsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT DetailsID,Article,Price,Note,Name FROM dbo.Details";
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
        public JsonResult Post(Details details)
        {
            string query = @"INSERT INTO dbo.Details (Article, Price, Note, Name) VALUES
            (
            '" + details.Article + @"'
            ,'" + details.Price + @"'
            ,'" + details.Note + @"'
            ,'" + details.Name + @"'
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
        public JsonResult Put(Details details)
        {
            string query = @"UPDATE dbo.Details SET 
                            Article = '" + details.Article + @"'
                            ,Price = '" + details.Price + @"'
                            ,Note = '" + details.Note + @"'
                            ,Name = '" + details.Name + @"'
                            WHERE DetailsID = " + details.DetailsID + @"";
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
            string query = @"DELETE from dbo.Details                            
                            WHERE DetailsID = " + id + @"";
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
