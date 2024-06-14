using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Application.Persistence;
using Persistence.Persistence;
using Persistence.Settings;

namespace Persistence.Extensions
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistenceLayer(
            this IServiceCollection services,
            IConfiguration configuration)
        {

            var _dbSettings = new DatabaseSettings();
            configuration.Bind(DatabaseSettings.SectioName, _dbSettings);
            services.AddSingleton(_dbSettings);

            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IUsrRepository, UsrRepository>();
            services.AddTransient<IJobRepository, JobRepository>();

            return services;
        }
    }
}

