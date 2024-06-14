using System.ComponentModel.DataAnnotations.Schema;
namespace Domain.Entities.Usr
{
    [Table("role", Schema = "usr")]
    public class Role : BaseEntity
    {
        [Column("name")]
        public string Name { get; set; } = string.Empty;
    }
}