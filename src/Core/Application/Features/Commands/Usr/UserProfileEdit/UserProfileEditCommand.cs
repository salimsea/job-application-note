using AutoMapper;
using MediatR;
using Application.Mappings.Dtos.Usr;
using Application.Persistence;

namespace Application.Features.Commands.Usr
{
    public class UserProfileEditCommand : IRequest<UserDto>
    {
        public string UserId { get; set; } = string.Empty;
        public string Id { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? LinkCv { get; set; }
        public string? Summary { get; set; }
    }
    internal class UserProfileEditCommandHandler : IRequestHandler<UserProfileEditCommand, UserDto>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserProfileEditCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<UserDto> Handle(UserProfileEditCommand request, CancellationToken cancellationToken)
        {
            UserDto ret = new();
            var user = await _unitOfWork.Usrs.GetUserById(request.Id);
            if (user is null)
                throw new ApplicationException("user not found!");

            if (!string.IsNullOrEmpty(request.Email))
            {
                var userOther = await _unitOfWork.Usrs.GetByUsernameOrEmail(request.Email);
                if (userOther is not null)
                    if (userOther.Id != user.Id)
                        throw new ApplicationException("email has been registered!");
            }
            if (!string.IsNullOrEmpty(request.Email)) user.Email = request.Email;
            if (!string.IsNullOrEmpty(request.FirstName)) user.FirstName = request.FirstName;
            user.MiddleName = request.MiddleName;
            user.LastName = request.LastName;
            user.UpdatedDate = DateTime.Now;
            user.UpdatedBy = request.Id;
            user.Profile = new()
            {
                Id = request.Id,
                LinkCv = request.LinkCv,
                Summary = request.Summary
            };

            _unitOfWork.Usrs.UserProfileEdit(user, result =>
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