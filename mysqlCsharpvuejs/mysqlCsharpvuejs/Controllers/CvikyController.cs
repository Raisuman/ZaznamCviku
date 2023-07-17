 using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using mysqlCsharpvuejs.Models;
using System.Data;

namespace mysqlCsharpvuejs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CvikyController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public CvikyController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"select CvikyId,DruhCviku,CasCviku,DenCviku from Cviky";

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

        [HttpPost]
        public JsonResult Post(Cviky dep)
        {
            string getMaxIdQuery = @"SELECT MAX(CvikyId) FROM Cviky";

            string insertQuery = @"INSERT INTO Cviky (CvikyId, DruhCviku, CasCviku, DenCviku) VALUES (@CvikyId, @DruhCviku, @CasCviku, @DenCviku)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("CvikyAppCon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();

                // Získání aktuálního nejvyššího CvikyId
                using (MySqlCommand getMaxIdCommand = new MySqlCommand(getMaxIdQuery, mycon))
                {
                    int maxId = Convert.ToInt32(getMaxIdCommand.ExecuteScalar());

                    // Nastavení nového CvikyId pro přidávaný záznam
                    int newId = maxId + 1;

                    // Vložení záznamu s novým CvikyId
                    using (MySqlCommand insertCommand = new MySqlCommand(insertQuery, mycon))
                    {
                        insertCommand.Parameters.AddWithValue("@CvikyId", newId);
                        insertCommand.Parameters.AddWithValue("@DruhCviku", dep.DruhCviku);
                        insertCommand.Parameters.AddWithValue("@CasCviku", dep.CasCviku);
                        insertCommand.Parameters.AddWithValue("@DenCviku", dep.DenCviku);

                        myReader = insertCommand.ExecuteReader();
                        table.Load(myReader);
                        myReader.Close();
                    }
                }

                mycon.Close();
            }

            var result = new JsonResult("Úspěšně přidáno");
            return result;
        }


        [HttpPut]

        public JsonResult Put(Cviky dep)
        {
            string query = @"update Cviky set DruhCviku = @DruhCviku, CasCviku = @CasCviku, DenCviku = @DenCviku where CvikyId = @CvikyId";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("CvikyAppCon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@CvikyId", dep.CvikyId);
                    myCommand.Parameters.AddWithValue("@DruhCviku", dep.DruhCviku);
                    myCommand.Parameters.AddWithValue("@CasCviku", dep.CasCviku);
                    myCommand.Parameters.AddWithValue("@DenCviku", dep.DenCviku);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }
            var result = new JsonResult("Úspěšně aktualizovaný");
            return result;
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string deleteQuery = @"DELETE FROM Cviky WHERE CvikyId = @CvikyId;";
            string updateQuery = @"UPDATE Cviky SET CvikyId = CvikyId - 1 WHERE CvikyId > @DeletedId;";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("CvikyAppCon");
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();

                // Smazání záznamu se specifikovaným id
                using (MySqlCommand deleteCommand = new MySqlCommand(deleteQuery, mycon))
                {
                    deleteCommand.Parameters.AddWithValue("@CvikyId", id);
                    deleteCommand.ExecuteNonQuery();
                }

                // Aktualizace indexů záznamů
                using (MySqlCommand updateCommand = new MySqlCommand(updateQuery, mycon))
                {
                    updateCommand.Parameters.AddWithValue("@DeletedId", id);
                    updateCommand.ExecuteNonQuery();
                }

                mycon.Close();
            }

            var result = new JsonResult("Uspěšně odstraněno");
            return result;
        }

    }
}
