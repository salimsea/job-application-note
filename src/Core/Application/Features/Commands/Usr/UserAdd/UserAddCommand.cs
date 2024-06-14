using AutoMapper;
using MediatR;
using Application.Mappings.Dtos.Usr;
using Application.Persistence;
using Domain.Entities.Usr;
using Domain.Extensions;
using Application.Services;

namespace Application.Features.Commands.Usr
{
    public class UserAddCommand : IRequest<UserDto>
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public List<string>? Roles { get; set; }
    }
    internal class UserAddCommandHandler : IRequestHandler<UserAddCommand, UserDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        public UserAddCommandHandler(IUnitOfWork unitOfWork, IMapper mapper, IJwtTokenGenerator jwtTokenGenerator)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        public async Task<UserDto> Handle(UserAddCommand request, CancellationToken cancellationToken)
        {
            var user = await _unitOfWork.Usrs.GetByUsernameOrEmail(request.Username);
            if (user is not null)
                throw new ApplicationException("username has been registered!");
            user = await _unitOfWork.Usrs.GetByUsernameOrEmail(request.Email);
            if (user is not null)
                throw new ApplicationException("email has been registered!");
            User userAdd = _mapper.Map<User>(request);
            string password = await _jwtTokenGenerator.GeneratePassword();
            userAdd.Password = password;
            userAdd.Password = userAdd.Password.EncryptString();
            UserDto ret = new();
            _unitOfWork.Usrs.UserAdd(userAdd, result =>
            {
                if (result is not null)
                {
                    ret = _mapper.Map<UserDto>(result);
                }
            });
            return ret;
        }
    }
}