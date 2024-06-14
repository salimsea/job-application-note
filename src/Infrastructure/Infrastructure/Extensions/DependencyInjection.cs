using System.Text;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Application.Services;
using Infrastructure.Services;
using Infrastructure.Settings;

namespace Infrastructure.Extensions
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureLayer(this IServiceCollection services, IConfiguration configuration)
        {
            var _jwtSettings = new JwtSettings();
            configuration.Bind(JwtSettings.SectioName, _jwtSettings);
            services.AddSingleton(_jwtSettings);

            services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();

            services.AddAuthentication(defaultScheme: JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(
                options => options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = JwtSettings.AppIssuer,
                    ValidAudience = JwtSettings.AppAudience,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(JwtSettings.AppSecret)
                        )
                }
                );
            services.AddSingleton<IDateTimeProvider, DateTimeProvider>();
            services.AddTransient<IMediator, Mediator>();

            return services;
        }
    }
}

