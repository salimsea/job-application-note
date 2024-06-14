using AutoMapper;
using Application.Mappings.Dtos.Usr;
using Domain.Entities.Usr;

namespace Application.Mappings.Profiles.Usr
{
    public class RoleProfile : Profile
    {
        public RoleProfile()
        {
            CreateMap<Role, RoleDto>();
            CreateMap<string, Role>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src))
            ;
        }
    }
}