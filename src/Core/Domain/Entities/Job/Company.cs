using System.ComponentModel.DataAnnotations.Schema;
namespace Domain.Entities.Usr
{
    [Table("company", Schema = "job")]
    public class Company : BaseEntity
    {
        [Column("name")]
        public string? Name { get; set; }
        [Column("email")]
        public string? Email { get; set; }
        [Column("position")]
        public string? Position { get; set; }
        [Column("type_work_day")]
        public int TypeWorkDay { get; set; }
        [Column("type_work_place")]
        public int TypeWorkPlace { get; set; }
        [Column("type_user_company")]
        public int TypeUserCompany { get; set; }
        [Column("placement")]
        public string? Placement { get; set; }
        [Column("applied_at")]
        public DateTime AppliedAt { get; set; } = DateTime.MinValue;
        [Column("status")]
        public int Status { get; set; }
        [Column("source_job")]
        public string? SourceJob { get; set; }
        [Column("created_by")]
        public string? CreatedBy { get; set; }
        [Column("created_date")]
        public DateTime CreatedDate { get; set; }
        [Column("updated_date")]
        public DateTime? UpdatedDate { get; set; }
    }
}