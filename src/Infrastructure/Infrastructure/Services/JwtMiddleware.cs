using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Application.Persistence;
using Infrastructure.Settings;

namespace Infrastructure.Services
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IUsrRepository user)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
                attachUserToContext(context, user, token);

            await _next(context);
        }

        private void attachUserToContext(HttpContext context, IUsrRepository user, string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(JwtSettings.AppSecret);
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = jwtToken.Claims.First(x => x.Type == "userid").Value;

                // attach user to context on successful jwt validation
                context.Items["User"] = user.GetUserById(userId).Result;
            }
            catch
            {
                // do nothing if jwt validation fails
                // user is not attached to context so request won't have access to secure routes
            }
        }
    }
}