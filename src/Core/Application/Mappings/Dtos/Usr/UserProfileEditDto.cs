
namespace Application.Mappings.Dtos.Usr
{
    public class UserProfileEditDto
    {
        public string UserId { get; set; } = string.Empty;
        public string Id { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string LinkCv { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
    }
}