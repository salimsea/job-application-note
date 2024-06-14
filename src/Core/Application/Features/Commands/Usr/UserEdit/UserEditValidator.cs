using FluentValidation;

namespace Application.Features.Commands.Usr
{
    public class UserEditValidator : AbstractValidator<UserEditCommand>
    {
        public UserEditValidator()
        {
            RuleFor(x => x.Username).NotEmpty();
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.FirstName).NotEmpty();
        }
    }
}