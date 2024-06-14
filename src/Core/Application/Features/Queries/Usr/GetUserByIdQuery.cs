using AutoMapper;
using MediatR;
using Application.Mappings.Dtos.Usr;
using Application.Persistence;

namespace Application.Features.Queries.Usr
{
    public class GetUserByIdQuery : IRequest<UserDto>
    {
        public string Id { get; set; } = string.Empty;
    }
    internal class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, UserDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetUserByIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<UserDto> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
        {
            var user = await _unitOfWork.Usrs.GetUserById(request.Id);
            var userDto = _mapper.Map<UserDto>(user, opt =>
                            opt.AfterMap((src, dest) => dest.Password = string.Empty));
            return userDto;
        }

    }
}