namespace Application.Mappings.Dtos.Usr
{
    public class UserDto
    {
        public string? Id { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public IEnumerable<RoleDto>? Roles { get; set; }
        public string? LinkCv { get; set; }
        public string? Summary { get; set; }
    }
}