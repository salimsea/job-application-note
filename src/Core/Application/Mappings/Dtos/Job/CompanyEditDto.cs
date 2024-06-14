namespace Application.Mappings.Dtos.Job
{
    public class CompanyEditDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public int TypeWorkDay { get; set; }
        public int TypeWorkPlace { get; set; }
        public int TypeUserCompany { get; set; }
        public string Placement { get; set; } = string.Empty;
        public string StrAppliedAt { get; set; } = string.Empty;
        public int Status { get; set; }
        public string SourceJob { get; set; } = string.Empty;
    }
}