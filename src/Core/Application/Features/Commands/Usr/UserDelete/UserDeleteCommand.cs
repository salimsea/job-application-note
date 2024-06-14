using MediatR;
using Application.Persistence;
using Application.Mappings.Dtos.Usr;
using AutoMapper;

namespace Application.Features.Commands.Usr
{
    public class UserDeleteCommand : IRequest<UserDto>
    {
        public string Id { get; set; } = string.Empty;
    }
    internal class UserDeleteCommandHandler : IRequestHandler<UserDeleteCommand, UserDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserDeleteCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<UserDto> Handle(UserDeleteCommand request, CancellationToken cancellationToken)
        {
            var user = await _unitOfWork.Usrs.GetUserById(request.Id);
            if (user is null)
                throw new ApplicationException("user not found!");

            UserDto ret = _mapper.Map<UserDto>(user);
            _unitOfWork.Usrs.UserDelete(request.Id, result => { });

            return ret;
        }
    }
}