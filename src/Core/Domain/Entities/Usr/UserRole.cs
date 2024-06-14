using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Domain.Entities.Usr
{
    [Table("user_role", Schema = "usr")]
    public class UserRole
    {
        [Dapper.Contrib.Extensions.ExplicitKey, Required]
        [Column("user_id")]
        public string? Id { get; set; }
        [Dapper.Contrib.Extensions.ExplicitKey, Required]
        [Column("role_id")]
        public string? RoleId { get; set; }
    }
}