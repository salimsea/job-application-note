using System.Text.Json;
using Application.Models.Common;
using Npgsql;

namespace Japnot.Be.Extensions
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var customError = new ResponseModel<string> { IsSuccess = true };
            var response = context.Response;

            try
            {
                await _next(context);
            }
            catch (ApplicationException ex)
            {
                customError.IsSuccess = false;
                customError.ReturnMessage = ex.Message;
            }
            catch (NpgsqlException ex)
            {
                customError.IsSuccess = false;
                customError.ReturnMessage = "process failed (database error), please contact administrator" + Environment.NewLine + ex.Message;
                Logger.Instance.Error("SQL Exception:", ex);
            }
            catch (Exception ex)
            {
                customError.IsSuccess = false;
                customError.ReturnMessage = "process failed (application error), please contact administrator" + Environment.NewLine + ex.Message;
                Logger.Instance.Error("Exception:", ex);
            }

            if (!customError.IsSuccess)
            {
                context.Response.ContentType = "application/json;";
                var result = JsonSerializer.Serialize(customError);
                await response.WriteAsync(result);
            }
        }
    }

}
