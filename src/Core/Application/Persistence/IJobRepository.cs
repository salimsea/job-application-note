using Domain.Entities.Usr;

namespace Application.Persistence
{
    public interface IJobRepository
    {
        #region COMPANY
        void CompanyAdd(Company entity, Action<Company> result);
        void CompanyDelete(string id, Action<string> result);
        void CompanyEdit(Company entity, Action<Company> result);
        Task<IEnumerable<Company>> GetCompanies();
        Task<Company> GetCompanyById(string id);
        #endregion 
    }
}