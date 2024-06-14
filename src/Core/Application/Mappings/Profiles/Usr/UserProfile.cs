using AutoMapper;
using Domain.Entities.Usr;
using Application.Mappings.Dtos.Usr;
using Application.Features.Commands.Usr;

namespace Application.Mappings.Profiles.Usr
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.LinkCv, opt => opt.MapFrom(src => src.Profile != null ? src.Profile.LinkCv : null))
                .ForMember(dest => dest.Summary, opt => opt.MapFrom(src => src.Profile != null ? src.Profile.Summary : null))
                .ForMember<IEnumerable<RoleDto>>(dest => dest.Roles, opt => opt.MapFrom<IEnumerable<Role>>(src => src.Roles ?? null))
                ;

            CreateMap<UserAddCommand, User>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid()))
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                ;

            CreateMap<UserAddDto, UserAddCommand>();
            CreateMap<UserEditDto, UserEditCommand>();
            CreateMap<UserProfileEditDto, UserProfileEditCommand>();
        }
    }
}