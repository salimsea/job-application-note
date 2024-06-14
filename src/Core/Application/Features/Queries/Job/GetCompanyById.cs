using AutoMapper;
using MediatR;
using Application.Mappings.Dtos.Job;
using Application.Persistence;

namespace Application.Features.Queries.Job
{
    public class GetCompanyByIdQuery : IRequest<CompanyDto>
    {
        public string Id { get; set; } = string.Empty;
    }
    internal class GetCompanyByIdQueryHandler : IRequestHandler<GetCompanyByIdQuery, CompanyDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetCompanyByIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<CompanyDto> Handle(GetCompanyByIdQuery request, CancellationToken cancellationToken)
        {
            var company = await _unitOfWork.Jobs.GetCompanyById(request.Id);
            var ret = _mapper.Map<CompanyDto>(company);
            return ret;
        }

    }
}