using FluentValidation;

namespace Application.Features.Commands.Usr
{
    public class UserLoginValidator : AbstractValidator<LoginCommand>
    {
        public UserLoginValidator()
        {
            RuleFor(x => x.UsernameOrEmail).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
        }
    }
}
