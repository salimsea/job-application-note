using Application.Persistence;
using Dapper;
using Domain.Entities.Usr;
using Persistence.Services;

namespace Persistence.Persistence
{
    public class JobRepository : IJobRepository
    {
        #region COMPANY
        public void CompanyAdd(Company entity, Action<Company> result)
        {
            using var conn = DapperConnectionProvider.CreatePgConnection();
            conn.Open();
            using var tx = conn.BeginTransaction();
            _ = conn.Insert<string, Company>(entity);
            result(entity);
            tx.Commit();
        }

        public void CompanyDelete(string id, Action<string> result)
        {
            using var conn = DapperConnectionProvider.CreatePgConnection();
            conn.Open();
            using var tx = conn.BeginTransaction();
            _ = conn.DeleteList<Company>(new { Id = id });
            result(string.Empty);
            tx.Commit();
        }

        public void CompanyEdit(Company entity, Action<Company> result)
        {
            using var conn = DapperConnectionProvider.CreatePgConnection();
            conn.Open();
            using var tx = conn.BeginTransaction();
            _ = conn.Update(entity);
            result(entity);
            tx.Commit();
        }

        public Task<IEnumerable<Company>> GetCompanies()
        {
            using var conn = DapperConnectionProvider.CreatePgConnection();
            var companies = conn.GetList<Company>();
            return Task.FromResult(companies);
        }

        public Task<Company> GetCompanyById(string id)
        {
            using var conn = DapperConnectionProvider.CreatePgConnection();
            var companies = conn.GetList<Company>().Where(x => x.Id == id).FirstOrDefault();
            return Task.FromResult<Company>(companies);
        }
        #endregion
    }
}