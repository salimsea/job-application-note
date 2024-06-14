using Microsoft.AspNetCore.Mvc;
using Domain.Entities.Usr;
using Application.Common.Extensions;

namespace Japnot.Be.Controllers
{
    [Authorize]
    public class BaseApiController : Controller
    {
        protected User? UserInfo()
        {
            var ret = HttpContext.Items["User"];
            return ret as User;
        }
    }
}