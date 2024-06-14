using Application.Persistence;

namespace Persistence.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        public UnitOfWork(
            IUsrRepository usrRepository,
            IJobRepository jobRepository
            )
        {
            Usrs = usrRepository;
            Jobs = jobRepository;
        }

        public IUsrRepository Usrs { get; set; }
        public IJobRepository Jobs { get; set; }
    }
}
