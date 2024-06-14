using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Domain.Entities.Usr
{
    [Table("user_profile", Schema = "usr")]
    public class UserProfile
    {
        [Dapper.Contrib.Extensions.ExplicitKey, Required]
        [Column("user_id")]
        public string? Id { get; set; }
        [Column("link_cv")]
        public string? LinkCv { get; set; }
        [Column("summary")]
        public string? Summary { get; set; }
    }
}