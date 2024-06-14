namespace Application.Persistence
{
    public interface IUnitOfWork
    {
        IUsrRepository Usrs { get; }
        IJobRepository Jobs { get; }
    }
}

