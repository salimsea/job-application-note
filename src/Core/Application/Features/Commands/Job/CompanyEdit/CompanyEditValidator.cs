using FluentValidation;
using Domain.Constants;

namespace Application.Features.Commands.Job
{
    public class CompanyEditValidator : AbstractValidator<CompanyEditCommand>
    {
        public CompanyEditValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.Position).NotEmpty();
            RuleFor(x => x.TypeWorkDay)
                .NotEmpty()
                .Must(TypeWorkDayConstant.Dict.ContainsKey)
                .WithMessage("type work day not found!");

            RuleFor(x => x.TypeWorkPlace)
                .NotEmpty()
                .Must(TypeWorkPlaceConstant.Dict.ContainsKey)
                .WithMessage("type work place not found!");

            RuleFor(x => x.TypeUserCompany)
                .NotEmpty()
                .Must(TypeUserCompanyConstant.Dict.ContainsKey)
                .WithMessage("type work company not found!");

            RuleFor(x => x.Placement).NotEmpty();
            RuleFor(x => x.StrAppliedAt).NotEmpty();
            RuleFor(x => x.Status).NotEmpty();
            RuleFor(x => x.SourceJob).NotEmpty();
        }
    }
}
