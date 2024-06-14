using AutoMapper;
using Domain.Entities.Usr;
using Application.Mappings.Dtos.Job;
using Application.Features.Commands.Job;
using Application.Mappings.Dtos;
using Domain.Constants;
using Domain.Extensions;

namespace Application.Mappings.Profiles.Job
{
    public class CompanyProfile : Profile
    {
        public CompanyProfile()
        {
            CreateMap<Company, CompanyDto>()
                    .ForMember(dest => dest.TypeWorkDay, opt => opt.MapFrom(src => new TypeDto { Id = src.TypeWorkDay, Name = TypeWorkDayConstant.Dict[src.TypeWorkDay] }))
                    .ForMember(dest => dest.TypeWorkPlace, opt => opt.MapFrom(src => new TypeDto { Id = src.TypeWorkPlace, Name = TypeWorkPlaceConstant.Dict[src.TypeWorkPlace] }))
                    .ForMember(dest => dest.TypeUserCompany, opt => opt.MapFrom(src => new TypeDto { Id = src.TypeUserCompany, Name = TypeUserCompanyConstant.Dict[src.TypeUserCompany] }))
                    .ForMember(dest => dest.Status, opt => opt.MapFrom(src => new TypeDto { Id = src.Status, Name = StatusCompanyConstant.Dict[src.Status] }))
                    .ForMember(dest => dest.AppliedAt, opt => opt.MapFrom(src => src.AppliedAt.ToString("dd-MM-yyyy")))
                    ;
            CreateMap<CompanyAddCommand, Company>()
                    .ForMember(dest => dest.AppliedAt, opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.StrAppliedAt) ? src.StrAppliedAt.ToDateTime() : (DateTime?)null))
                    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid()))
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.UpdatedDate, opt => opt.Ignore())
                    ;

            CreateMap<CompanyAddDto, CompanyAddCommand>();
            CreateMap<CompanyEditDto, CompanyEditCommand>();
        }
    }
}