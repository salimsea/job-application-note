using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Features.Commands.Usr;
using Application.Mappings.Dtos.Usr;
using Application.Models.Common;
using Application.Features.Queries.Usr;
using Application.Common.Extensions;

namespace Japnot.Be.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [Tags("02-User")]
    public class UserController : BaseApiController
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        public UserController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }
        [HttpGet("GetInfoUser")]
        public async Task<ActionResult<ResponseModel<UserDto>>> GetInfoUser()
        {
            await Task.CompletedTask;
            return new ResponseModel<UserDto>
            {
                IsSuccess = true,
                Data = _mapper.Map<UserDto>(UserInfo())
            };
        }

        [HttpGet("GetUsers", Name = "GetUsers")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var result = await _mediator.Send(new GetUsersQuery());
            if (!result.Any())
            {
                return NotFound(new ResponseModel<IEnumerable<UserDto>>
                {
                    IsSuccess = false,
                    ReturnMessage = "data not found"
                });
            }
            return Ok(new ResponseModel<IEnumerable<UserDto>>
            {
                IsSuccess = true,
                Data = result
            });
        }

        [HttpGet("GetUserById", Name = "GetUserById")]
        public async Task<ActionResult<UserDto>> GetUserById(string id)
        {
            var result = await _mediator.Send(new GetUserByIdQuery { Id = id });
            if (result == null)
            {
                return NotFound(new ResponseModel<UserDto>
                {
                    IsSuccess = false,
                    ReturnMessage = "data not found"
                });
            }
            return Ok(new ResponseModel<UserDto>
            {
                IsSuccess = true,
                Data = result
            });
        }

        [HttpPost("UserAdd", Name = "UserAdd")]
        public async Task<ActionResult<UserDto>> UserAdd(UserAddDto userDto)
        {
            var command = _mapper.Map<UserAddCommand>(userDto);
            var result = await _mediator.Send(command);
            if (result == null)
            {
                return BadRequest(new ResponseModel<UserDto>
                {
                    IsSuccess = false,
                    ReturnMessage = "bad request"
                });
            }
            return Ok(new ResponseModel<UserDto>
            {
                IsSuccess = true,
                Data = result
            });
        }

        [HttpPut("UserEdit", Name = "UserEdit")]
        public async Task<ActionResult<UserDto>> UserEdit(UserEditDto userDto)
        {
            userDto.UserId = UserInfo().Id;
            var command = _mapper.Map<UserEditCommand>(userDto);
            var result = await _mediator.Send(command);
            if (result == null)
            {
                return BadRequest(new ResponseModel<UserDto>
                {
                    IsSuccess = false,
                    ReturnMessage = "bad request"
                });
            }
            return Ok(new ResponseModel<UserDto>
            {
                IsSuccess = true,
                Data = result
            });
        }

        [HttpDelete("UserDelete", Name = "UserDelete")]
        public async Task<ActionResult<UserDto>> UserDelete(string userId)
        {
            var result = await _mediator.Send(new UserDeleteCommand { Id = userId });
            if (result == null)
            {
                return BadRequest(new ResponseModel<UserDto>
                {
                    IsSuccess = false,
                    ReturnMessage = "bad request"
                });
            }
            return Ok(new ResponseModel<UserDto>
            {
                IsSuccess = true,
                Data = result
            });
        }

        [HttpPut("UserProfileEdit", Name = "UserProfileEdit")]
        public async Task<ActionResult<UserDto>> UserProfileEdit(UserProfileEditDto userDto)
        {
            userDto.Id = UserInfo().Id;
            var command = _mapper.Map<UserProfileEditCommand>(userDto);
            var result = await _mediator.Send(command);
            if (result == null)
            {
                return BadRequest(new ResponseModel<UserDto>
                {
                    IsSuccess = false,
                    ReturnMessage = "bad request"
                });
            }
            return Ok(new ResponseModel<UserDto>
            {
                IsSuccess = true,
                Data = result
            });
        }

    }
}

