using Domain.Entities.Usr;

namespace Application.Services
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(User user);
        Task<string> GeneratePassword();

    }
}