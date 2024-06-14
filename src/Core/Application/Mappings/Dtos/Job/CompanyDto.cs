namespace Application.Mappings.Dtos.Job
{
    public class CompanyDto
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Position { get; set; }
        public TypeDto? TypeWorkDay { get; set; }
        public TypeDto? TypeWorkPlace { get; set; }
        public TypeDto? TypeUserCompany { get; set; }
        public string? Placement { get; set; }
        public string? AppliedAt { get; set; }
        public TypeDto? Status { get; set; }
        public string? SourceJob { get; set; }
        public string? CreatedBy { get; set; }
        public string? CreatedDate { get; set; }
        public string? UpdatedDate { get; set; }
    }
}