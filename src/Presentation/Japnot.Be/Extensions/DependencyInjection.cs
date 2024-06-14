using System.Reflection;
using Microsoft.OpenApi.Models;

namespace Japnot.Be.Extensions
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPresentationLayer(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddSwagger();
            return services;
        }
        public static void AddSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please insert JWT with Bearer into field",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
            {
                new OpenApiSecurityScheme
                {
                Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new string[] { }
            }
                });
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "JAPNOT BACKEND API",
                    Description = "List of APIs used in the survey admin application",
                });
            });

        }

    }
}