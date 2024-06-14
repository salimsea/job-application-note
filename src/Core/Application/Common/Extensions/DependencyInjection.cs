using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using FluentValidation;
using MediatR;
using System.Globalization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpOverrides;
using Application.Settings;
namespace Application.Common.Extensions
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationLayer(
            this IServiceCollection services,
            ConfigurationManager configuration)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddMediatR(typeof(DependencyInjection).Assembly);
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            services.AddCors();

            services.ConfigureCulture();
            services.ConfigureJson();
            services.ConfigureCorsPolicy();
            services.ConfigurePath(configuration);


            return services;
        }
        public static void AddCors(this IServiceCollection services)
        {
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                policy =>
                      {
                          policy.WithOrigins("http://localhost:3000");
                      });
            });
        }
        public static void ConfigureCulture(this IServiceCollection services)
        {
            services.Configure<RequestLocalizationOptions>(options =>
            {
                var cultureInfo = new CultureInfo("en-US");
                cultureInfo.NumberFormat.NumberDecimalSeparator = ".";
                cultureInfo.NumberFormat.CurrencyDecimalSeparator = ".";
                CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
                CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;
                var supportedCultures = new List<CultureInfo> { cultureInfo };

            });
        }
        public static void ConfigureJson(this IServiceCollection services)
        {
            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders =
                    ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
            });
            services.AddControllersWithViews().AddJsonOptions(o =>
            {
                o.JsonSerializerOptions.PropertyNamingPolicy = null;
                o.JsonSerializerOptions.DictionaryKeyPolicy = null;
                o.JsonSerializerOptions.WriteIndented = true;
            });
        }
        public static void ConfigureCorsPolicy(this IServiceCollection services)
        {
            services.AddCors(opt =>
            {
                opt.AddDefaultPolicy(builder => builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });
        }
        public static void ConfigurePath(this IServiceCollection services, ConfigurationManager configuration)
        {
            var _fileDirectorySettings = new FileDirectorySettings();
            configuration.Bind(FileDirectorySettings.SectioName, _fileDirectorySettings);
            services.AddSingleton(_fileDirectorySettings);
        }

    }
}