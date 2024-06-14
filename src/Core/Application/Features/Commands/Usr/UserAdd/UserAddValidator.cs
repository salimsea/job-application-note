using FluentValidation;

namespace Application.Features.Commands.Usr
{
    public class UserAddValidator : AbstractValidator<UserAddCommand>
    {
        public UserAddValidator()
        {
            RuleFor(x => x.Username).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.FirstName).NotEmpty();
        }
    }
}