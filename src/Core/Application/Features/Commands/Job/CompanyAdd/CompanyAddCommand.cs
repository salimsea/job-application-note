using AutoMapper;
using MediatR;
using Application.Persistence;
using Application.Mappings.Dtos.Job;
using Domain.Entities.Usr;

namespace Application.Features.Commands.Job
{
    public class CompanyAddCommand : IRequest<CompanyDto>
    {
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
        public string CreatedBy { get; set; } = string.Empty;
    }
    internal class CompanyAddCommandHandler : IRequestHandler<CompanyAddCommand, CompanyDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CompanyAddCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public Task<CompanyDto> Handle(CompanyAddCommand request, CancellationToken cancellationToken)
        {
            var ret = new CompanyDto();
            Company companyAdd = _mapper.Map<Company>(request);

            _unitOfWork.Jobs.CompanyAdd(companyAdd, result =>
            {
                if (result is not null)
                {
                    ret = _mapper.Map<CompanyDto>(result);
                }
            });

            return Task.FromResult(ret);
        }
    }
}