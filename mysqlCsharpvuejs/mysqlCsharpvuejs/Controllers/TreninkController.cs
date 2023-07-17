using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using mysqlCsharpvuejs.Models;
using System.Data;

namespace mysqlCsharpvuejs.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TreninkController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public TreninkController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"select TreninkId,DenTrenink,OdCasTrenink,DoCasTrenink from Trenink";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("CvikyAppCon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }
            var result = new JsonResult(table);
            return result;
        }


        [HttpPut]

        public JsonResult Put(Trenink dep)
        {
            string query = @"update Trenink set OdCasTrenink = @OdCasTrenink, DoCasTrenink = @DoCasTrenink where TreninkId = @TreninkId";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("CvikyAppCon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@TreninkId", dep.TreninkId);
                    myCommand.Parameters.AddWithValue("@OdCasTrenink", dep.OdCasTrenink);
                    myCommand.Parameters.AddWithValue("@DoCasTrenink", dep.DoCasTrenink);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }
            var result = new JsonResult("Úspěšně aktualizovaný");
            return result;
        }
    }
}
