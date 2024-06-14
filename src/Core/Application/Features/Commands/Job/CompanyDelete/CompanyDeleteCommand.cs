using MediatR;
using Application.Persistence;
using Application.Mappings.Dtos.Job;
using AutoMapper;

namespace Application.Features.Commands.Job
{
    public class CompanyDeleteCommand : IRequest<CompanyDto>
    {
        public string Id { get; set; } = string.Empty;
    }
    internal class CompanyDeleteCommandHandler : IRequestHandler<CompanyDeleteCommand, CompanyDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CompanyDeleteCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<CompanyDto> Handle(CompanyDeleteCommand request, CancellationToken cancellationToken)
        {
            var data = await _unitOfWork.Jobs.GetCompanyById(request.Id);
            if (data is null)
                throw new ApplicationException("company not found!");

            CompanyDto ret = _mapper.Map<CompanyDto>(data);
            _unitOfWork.Jobs.CompanyDelete(request.Id, result => { });
            return ret;
        }
    }
}