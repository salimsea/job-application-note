using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Features.Commands.Usr;
using Application.Mappings.Dtos.Usr;
using Application.Models.Common;

namespace Japnot.Be.Controllers
{
    [Route("api/[controller]")]
    [Tags("01-Autorisasi")]
    public class AuthController : Controller
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        public AuthController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }
        [HttpPost("Login", Name = "Login")]
        public async Task<ResponseModel<UserJwtDto>> Login(string usernameOrEmail, string password)
        {
            LoginCommand command = new()
            {
                UsernameOrEmail = usernameOrEmail,
                Password = password
            };
            var validator = new UserLoginValidator();
            var validatorResult = validator.Validate(command);
            if (!validatorResult.IsValid)
                throw new ApplicationException(string.Join("; ", validatorResult.Errors.Select(error => error.ErrorMessage).ToList()));

            var result = await _mediator.Send(command);
            return new ResponseModel<UserJwtDto>
            {
                IsSuccess = result is not null,
                Data = result
            };
        }


    }
}

