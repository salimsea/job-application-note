using AutoMapper;
using MediatR;
using Application.Mappings.Dtos.Usr;
using Application.Persistence;

namespace Application.Features.Queries.Usr
{
    public class GetRolesQuery : IRequest<IEnumerable<RoleDto>>
    {
    }
    internal class GetRolesQueryHandler : IRequestHandler<GetRolesQuery, IEnumerable<RoleDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetRolesQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RoleDto>> Handle(GetRolesQuery request, CancellationToken cancellationToken)
        {
            var roles = await _unitOfWork.Usrs.GetRoles();
            return roles.Select(_mapper.Map<RoleDto>);
        }
    }
}