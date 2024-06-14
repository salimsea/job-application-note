using AutoMapper;
using MediatR;
using Application.Mappings.Dtos.Usr;
using Application.Persistence;
using Domain.Extensions;

namespace Application.Features.Queries.Usr
{
    public class GetUsersQuery : IRequest<IEnumerable<UserDto>>
    {
        public bool IsAdministrator { get; set; }
    }
    internal class GetUsersQueryHandler : IRequestHandler<GetUsersQuery, IEnumerable<UserDto>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetUsersQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserDto>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
        {
            var users = await _unitOfWork.Usrs.GetUsers();

            var ret = users.Select(user =>
                            _mapper.Map<UserDto>(user, opt =>
                                opt.AfterMap((src, dest) =>
                                    dest.Password = request.IsAdministrator && user.Password != null
                                                    ? user.Password.DecryptString()
                                                    : string.Empty)));
            return ret;
        }

    }
}