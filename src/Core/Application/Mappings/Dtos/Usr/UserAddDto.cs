
namespace Application.Mappings.Dtos.Usr
{
    public class UserAddDto
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public List<string>? Roles { get; set; }
    }
}