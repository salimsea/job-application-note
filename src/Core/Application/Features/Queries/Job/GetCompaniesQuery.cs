using AutoMapper;
using MediatR;
using Application.Mappings.Dtos.Job;
using Application.Persistence;

namespace Application.Features.Queries.Job
{
    public class GetCompaniesQuery : IRequest<IEnumerable<CompanyDto>>
    {
    }
    internal class GetCompaniesQueryHandler : IRequestHandler<GetCompaniesQuery, IEnumerable<CompanyDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetCompaniesQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CompanyDto>> Handle(GetCompaniesQuery request, CancellationToken cancellationToken)
        {
            var companies = await _unitOfWork.Jobs.GetCompanies();
            return companies.Select(_mapper.Map<CompanyDto>);
        }

    }
}