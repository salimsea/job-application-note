using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Application.Models.Common;
using Application.Mappings.Dtos.Job;
using Application.Features.Queries.Job;
using Application.Features.Commands.Job;
using Application.Common.Extensions;

namespace Japnot.Be.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [Tags("03-Company")]
    public class CompanyController : BaseApiController
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        public CompanyController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }
        [HttpGet("GetCompanies", Name = "GetCompanies")]
        public async Task<ActionResult<IEnumerable<CompanyDto>>> GetCompanies()
        {
            var result = await _mediator.Send(new GetCompaniesQuery());
            if (!result.Any())
            {
                return NotFound(new ResponseModel<IEnumerable<CompanyDto>>
                {
                    IsSuccess = false,
                    ReturnMessage = "data not found"
                });
            }
            return Ok(new ResponseModel<IEnumerable<CompanyDto>>
            {
                IsSuccess = true,
                Data = result
            });
        }

        [HttpGet("GetCompanyById", Name = "GetCompanyById")]
        public async Task<ActionResult<CompanyDto>> GetCompanyById(string id)
        {
            var result = await _mediator.Send(new GetCompanyByIdQuery { Id = id });
            if (result == null)
            {
                return NotFound(new ResponseModel<CompanyDto>
                {
                    IsSuccess = false,
                    ReturnMessage = "data not found"
                });
            }
            return Ok(new ResponseModel<CompanyDto>
            {
                IsSuccess = true,
                Data = result
            });
        }

        [HttpPost("CompanyAdd", Name = "CompanyAdd")]
        public async Task<ActionResult<CompanyDto>> CompanyAdd(CompanyAddDto companyAddDto)
        {
            companyAddDto.CreatedBy = UserInfo().Id;
            var command = _mapper.Map<CompanyAddCommand>(companyAddDto);
            var result = await _mediator.Send(command);
            if (result == null)
            {
                return BadRequest(new ResponseModel<CompanyDto>
                {
                    IsSuccess = false,
                    ReturnMessage = "bad request"
                });
            }
            return Ok(new ResponseModel<CompanyDto>
            {
                IsSuccess = true,
                Data = result
            });
        }

        [HttpPut("CompanyEdit", Name = "CompanyEdit")]
        public async Task<ActionResult<CompanyDto>> CompanyEdit(CompanyEditDto companyEditDto)
        {
            var command = _mapper.Map<CompanyEditCommand>(companyEditDto);
            var result = await _mediator.Send(command);
            if (result == null)
            {
                return BadRequest(new ResponseModel<CompanyDto>
                {
                    IsSuccess = false,
                    ReturnMessage = "bad request"
                });
            }
            return Ok(new ResponseModel<CompanyDto>
            {
                IsSuccess = true,
                Data = result
            });
        }

        [HttpDelete("CompanyDelete", Name = "CompanyDelete")]
        public async Task<ActionResult<CompanyDto>> CompanyDelete(string companyId)
        {
            var result = await _mediator.Send(new CompanyDeleteCommand { Id = companyId });
            if (result == null)
            {
                return BadRequest(new ResponseModel<CompanyDto>
                {
                    IsSuccess = false,
                    ReturnMessage = "bad request"
                });
            }
            return Ok(new ResponseModel<CompanyDto>
            {
                IsSuccess = true,
                Data = result
            });
        }

    }
}

