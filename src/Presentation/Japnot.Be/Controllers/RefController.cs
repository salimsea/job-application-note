using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Models.Common;
using Domain.Constants;
using Application.Mappings.Dtos;
using Application.Mappings.Dtos.Usr;
using Application.Features.Queries.Usr;
using Application.Common.Extensions;

namespace Japnot.Be.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [Tags("04-Refrence")]
    public class RefController : BaseApiController
    {
        private readonly IMediator _mediator;
        public RefController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet("GetTypeWorkDay", Name = "GetTypeWorkDay")]
        public ActionResult<IEnumerable<TypeDto>> GetTypeWorkDay()
        {
            return Ok(new ResponseModel<IEnumerable<TypeDto>>
            {
                IsSuccess = true,
                Data = TypeWorkDayConstant.Dict.Select(x => new TypeDto { Id = x.Key, Name = x.Value }).ToList()
            });
        }

        [HttpGet("GetTypeWorkPlace", Name = "GetTypeWorkPlace")]
        public ActionResult<IEnumerable<TypeDto>> GetTypeWorkPlace()
        {
            return Ok(new ResponseModel<IEnumerable<TypeDto>>
            {
                IsSuccess = true,
                Data = TypeWorkPlaceConstant.Dict.Select(x => new TypeDto { Id = x.Key, Name = x.Value }).ToList()
            });
        }

        [HttpGet("GetTypeUserCompany", Name = "GetTypeUserCompany")]
        public ActionResult<IEnumerable<TypeDto>> GetTypeUserCompany()
        {
            return Ok(new ResponseModel<IEnumerable<TypeDto>>
            {
                IsSuccess = true,
                Data = TypeUserCompanyConstant.Dict.Select(x => new TypeDto { Id = x.Key, Name = x.Value }).ToList()
            });
        }

        [HttpGet("GetStatusCompany", Name = "GetStatusCompany")]
        public ActionResult<IEnumerable<TypeDto>> GetStatusCompany()
        {
            return Ok(new ResponseModel<IEnumerable<TypeDto>>
            {
                IsSuccess = true,
                Data = StatusCompanyConstant.Dict.Select(x => new TypeDto { Id = x.Key, Name = x.Value }).ToList()
            });
        }

        [HttpGet("GetRoles", Name = "GetRoles")]
        public async Task<ActionResult<IEnumerable<RoleDto>>> GetRoles()
        {
            var result = await _mediator.Send(new GetRolesQuery());
            if (!result.Any())
            {
                return NotFound(new ResponseModel<IEnumerable<RoleDto>>
                {
                    IsSuccess = false,
                    ReturnMessage = "data not found"
                });
            }
            return Ok(new ResponseModel<IEnumerable<RoleDto>>
            {
                IsSuccess = true,
                Data = result
            });
        }

    }
}

