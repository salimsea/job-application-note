using MediatR;
using Application.Persistence;
using Application.Services;
using Domain.Extensions;
using Application.Mappings.Dtos.Usr;

namespace Application.Features.Commands.Usr
{
    public class LoginCommand : IRequest<UserJwtDto>
    {
        public string UsernameOrEmail { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

    }
    internal class LoginCommandHandler : IRequestHandler<LoginCommand, UserJwtDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;

        public LoginCommandHandler(IUnitOfWork unitOfWork, IJwtTokenGenerator jwtTokenGenerator)
        {
            _unitOfWork = unitOfWork;
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        public async Task<UserJwtDto> Handle(LoginCommand request, CancellationToken cancellationToken)
        {

            var user = await _unitOfWork.Usrs.GetByUsernameOrEmail(request.UsernameOrEmail);
            if (user is null)
                throw new ApplicationException("username not found!");
            if (user.Password.DecryptString() != request.Password)
                throw new ApplicationException("password wrong!");
            UserJwtDto ret = new()
            {
                UserId = user.Id,
                Token = _jwtTokenGenerator.GenerateToken(user)
            };
            return ret;
        }
    }
}