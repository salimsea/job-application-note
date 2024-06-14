using AutoMapper;
using MediatR;
using Application.Mappings.Dtos.Usr;
using Application.Persistence;
using Domain.Entities.Usr;

namespace Application.Features.Commands.Usr
{
    public class UserEditCommand : IRequest<UserDto>
    {
        public string UserId { get; set; } = string.Empty;
        public string Id { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public int? Status { get; set; }
        public List<string>? Roles { get; set; }
    }
    internal class UserEditCommandHandler : IRequestHandler<UserEditCommand, UserDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserEditCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<UserDto> Handle(UserEditCommand request, CancellationToken cancellationToken)
        {
            UserDto ret = new();
            var user = await _unitOfWork.Usrs.GetUserById(request.Id);
            if (user is null)
                throw new ApplicationException("user not found!");
            if (!string.IsNullOrEmpty(request.Username))
            {
                var userOther = await _unitOfWork.Usrs.GetByUsernameOrEmail(request.Username);
                if (userOther is not null)
                    if (userOther.Id != user.Id)
                        throw new ApplicationException("username has been registered!");
            }
            if (!string.IsNullOrEmpty(request.Email))
            {
                var userOther = await _unitOfWork.Usrs.GetByUsernameOrEmail(request.Email);
                if (userOther is not null)
                    if (userOther.Id != user.Id)
                        throw new ApplicationException("email has been registered!");
            }
            if (!string.IsNullOrEmpty(request.Username)) user.Username = request.Username;
            if (!string.IsNullOrEmpty(request.Password)) user.Password = request.Password;
            if (!string.IsNullOrEmpty(request.Email)) user.Email = request.Email;
            if (!string.IsNullOrEmpty(request.FirstName)) user.FirstName = request.FirstName;
            user.MiddleName = request.MiddleName;
            user.LastName = request.LastName;
            user.UpdatedDate = DateTime.Now;
            user.UpdatedBy = request.UserId;

            user.Roles = null;
            if (request.Roles is not null)
                user.Roles = request.Roles.Select(x => new Role { Id = x });
            _unitOfWork.Usrs.UserEdit(user, result =>
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