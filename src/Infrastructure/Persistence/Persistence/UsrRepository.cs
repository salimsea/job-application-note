using Application.Features.Queries.Usr;
using Application.Persistence;
using Dapper;
using Domain.Entities.Usr;
using Persistence.Services;

namespace Persistence.Persistence
{
    public class UsrRepository : IUsrRepository
    {
        #region private
        private static async Task<IEnumerable<User>> GetUsers(UserParamsQuery paramsQuery)
        {
            using var conn = DapperConnectionProvider.CreatePgConnection();
            var users = (from user in conn.GetList<User>()
                            .Where(x => paramsQuery is null || paramsQuery.Id is null || x.Id == paramsQuery.Id)
                            .Where(x => paramsQuery is null || paramsQuery.UsernameOrEmail is null || x.Username == paramsQuery.UsernameOrEmail || x.Email == paramsQuery.UsernameOrEmail)
                         join role in from userRole in conn.GetList<UserRole>()
                                      join role in conn.GetList<Role>() on userRole.RoleId equals role.Id
                                      select new { userRole, role } on user.Id equals role.userRole.Id into role1
                         from role in role1.DefaultIfEmpty()
                         join profile in conn.GetList<UserProfile>() on user.Id equals profile.Id into profile1
                         from profile in profile1.DefaultIfEmpty()
                         select new { user, role?.role, profile }
                        ).ToList().GroupBy(x => x.user).Select(g =>
                        {
                            var user = g.Select(x => x.user).First();
                            user.Roles = !g.Where(x => x.role is not null).Any() ? null : g.Where(x => x.role != null).Select(x => x.role).Distinct();
                            user.Profile = g.Select(x => x.profile).First();
                            return user;
                        });
            return await Task.FromResult(users);
        }
        #endregion


        #region ROLE
        public async Task<IEnumerable<Role>> GetRoles()
        {
            using var conn = DapperConnectionProvider.CreatePgConnection();
            var roles = conn.GetList<Role>();
            return await Task.FromResult(roles);
        }
        #endregion

        #region USER
        public void UserAdd(User entity, Action<User> result)
        {
            using var conn = DapperConnectionProvider.CreatePgConnection();
            conn.Open();
            using var tx = conn.BeginTransaction();
            _ = conn.Insert<string, User>(entity);
            _ = conn.Insert<string, UserProfile>(new UserProfile()
            {
                Id = entity.Id,
            });
            if (entity.Roles is not null)
            {
                List<UserRole> userRoles = entity.Roles.Select(x => new UserRole { Id = entity.Id, RoleId = x.Id }).ToList();
                foreach (var userRole in userRoles)
                    _ = conn.Insert<string, UserRole>(userRole);
            }
            result(entity);
            tx.Commit();
        }
        public void UserDelete(string id, Action<string> result)
        {
            using var conn = DapperConnectionProvider.CreatePgConnection();
            conn.Open();
            using var tx = conn.BeginTransaction();
            _ = conn.DeleteList<UserRole>(new { Id = id });
            _ = conn.DeleteList<UserProfile>(new { Id = id });
            _ = conn.DeleteList<User>(new { Id = id });
            result(string.Empty);
            tx.Commit();
        }
        public void UserEdit(User entity, Action<User> result)
        {
            using var conn = DapperConnectionProvider.CreatePgConnection();
            conn.Open();
            using var tx = conn.BeginTransaction();
            _ = conn.Update(entity);
            if (entity.Roles is not null)
            {
                _ = conn.DeleteList<UserRole>(new { Id = entity.Id });
                foreach (var item in entity.Roles)
                {
                    UserRole userRole = new()
                    {
                        Id = entity.Id,
                        RoleId = item.Id
                    };
                    _ = conn.Insert<string, UserRole>(userRole);
                }
            }
            result(entity);
            tx.Commit();
        }
        public Task<IEnumerable<User>> GetUsers()
        {
            return GetUsers(null);
        }
        public Task<User> GetUserById(string id)
        {
            UserParamsQuery userParamsQuery = new() { Id = id };
            var users = GetUsers(userParamsQuery);
            var result = users.Result.Any() ? users.Result.First() : null;
            return Task.FromResult<User>(result);
        }

        public Task<User> GetByUsernameOrEmail(string usernameOrEmail)
        {
            UserParamsQuery userParamsQuery = new() { UsernameOrEmail = usernameOrEmail };
            var users = GetUsers(userParamsQuery);
            var result = users.Result.Any() ? users.Result.First() : null;
            return Task.FromResult<User>(result);
        }

        public void UserProfileEdit(User entity, Action<User> result)
        {
            using var conn = DapperConnectionProvider.CreatePgConnection();
            conn.Open();
            using var tx = conn.BeginTransaction();
            _ = conn.Update(entity);
            _ = conn.Update(entity.Profile);

            result(entity);
            tx.Commit();
        }

        #endregion
    }
}