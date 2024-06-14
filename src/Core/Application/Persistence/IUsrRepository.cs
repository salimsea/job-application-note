using Domain.Entities.Usr;

namespace Application.Persistence
{
    public interface IUsrRepository
    {
        #region ROLE
        Task<IEnumerable<Role>> GetRoles();
        #endregion 

        #region USER
        void UserAdd(User entity, Action<User> result);
        void UserDelete(string id, Action<string> result);
        void UserEdit(User entity, Action<User> result);
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUserById(string id);
        Task<User> GetByUsernameOrEmail(string usernameOrEmail);

        void UserProfileEdit(User entity, Action<User> result);
        #endregion


    }
}