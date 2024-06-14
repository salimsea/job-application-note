using System.ComponentModel.DataAnnotations.Schema;
namespace Domain.Entities.Usr
{
    [Table("user", Schema = "usr")]
    public class User : BaseEntity
    {
        [Column("username")]
        public string Username { get; set; } = string.Empty;
        [Column("password")]
        public string Password { get; set; } = string.Empty;
        [Column("email")]
        public string Email { get; set; } = string.Empty;
        [Column("first_name")]
        public string FirstName { get; set; } = string.Empty;
        [Column("middle_name")]
        public string? MiddleName { get; set; }
        [Column("last_name")]
        public string? LastName { get; set; }
        [Column("created_date")]
        public DateTime CreatedDate { get; set; }
        [Column("updated_by")]
        public string? UpdatedBy { get; set; }
        [Column("updated_date")]
        public DateTime? UpdatedDate { get; set; }

        [NotMapped]
        public string FullName
        {
            get
            {
                string fullName = FirstName;
                if (!string.IsNullOrEmpty(MiddleName))
                    fullName += " " + MiddleName;
                if (!string.IsNullOrEmpty(LastName))
                    fullName += " " + LastName;
                return fullName.Trim();
            }
        }
        public IEnumerable<Role>? Roles { get; set; }
        public UserProfile? Profile { get; set; }
    }
}