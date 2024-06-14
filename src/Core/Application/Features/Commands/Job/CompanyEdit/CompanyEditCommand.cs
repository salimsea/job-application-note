using AutoMapper;
using MediatR;
using Application.Persistence;
using Application.Mappings.Dtos.Job;
using Domain.Extensions;

namespace Application.Features.Commands.Job
{
    public class CompanyEditCommand : IRequest<CompanyDto>
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public int TypeWorkDay { get; set; }
        public int TypeWorkPlace { get; set; }
        public int TypeUserCompany { get; set; }
        public string Placement { get; set; } = string.Empty;
        public string StrAppliedAt { get; set; } = string.Empty;
        public int Status { get; set; }
        public string SourceJob { get; set; } = string.Empty;
    }
    internal class CompanyEditCommandHandler : IRequestHandler<CompanyEditCommand, CompanyDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CompanyEditCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<CompanyDto> Handle(CompanyEditCommand request, CancellationToken cancellationToken)
        {
            var company = await _unitOfWork.Jobs.GetCompanyById(request.Id);
            if (company is null)
                throw new ApplicationException("company not found!");

            var ret = new CompanyDto();
            if (!string.IsNullOrEmpty(request.Name))
                company.Name = request.Name;
            if (!string.IsNullOrEmpty(request.Email))
                company.Email = request.Email;
            if (!string.IsNullOrEmpty(request.Position))
                company.Position = request.Position;

            company.TypeWorkDay = request.TypeWorkDay;
            company.TypeWorkPlace = request.TypeWorkPlace;
            company.TypeUserCompany = request.TypeUserCompany;

            if (!string.IsNullOrEmpty(request.Placement))
                company.Placement = request.Placement;
            if (!string.IsNullOrEmpty(request.StrAppliedAt))
                company.AppliedAt = request.StrAppliedAt.ToDateTime();

            company.Status = request.Status;

            if (!string.IsNullOrEmpty(request.SourceJob))
                company.SourceJob = request.SourceJob;

            company.UpdatedDate = DateTime.Now;

            _unitOfWork.Jobs.CompanyEdit(company, result =>
            {
                if (result is not null)
                {
                    ret = _mapper.Map<CompanyDto>(result);
                }
            });

            return ret;
        }
    }
}