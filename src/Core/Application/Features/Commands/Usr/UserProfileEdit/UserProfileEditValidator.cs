using FluentValidation;

namespace Application.Features.Commands.Usr
{
    public class UserProfileEditValidator : AbstractValidator<UserProfileEditCommand>
    {
        public UserProfileEditValidator()
        {
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.FirstName).NotEmpty();
        }
    }
}