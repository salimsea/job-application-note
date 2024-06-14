using Japnot.Be.Extensions;
using Application.Common.Extensions;
using Infrastructure.Extensions;
using Persistence.Extensions;
using Application.Settings;
using Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplicationLayer(builder.Configuration);
builder.Services.AddInfrastructureLayer(builder.Configuration);
builder.Services.AddPersistenceLayer(builder.Configuration);
builder.Services.AddPresentationLayer(builder.Configuration);
builder.Services.AddControllers(options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.WebHost.UseUrls(FileDirectorySettings.BaseUrlProxy);


var app = builder.Build();

var pathBase = "/api-web";
if (app.Environment.IsDevelopment())
    pathBase = "";

app.UsePathBase(pathBase);

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("v1/swagger.json", "Backend API V1");
});

app.UseMiddleware<ExceptionMiddleware>();
app.UseMiddleware<ValidationMiddleware>();
app.UseHttpsRedirection();
app.UseCors();
app.UseMiddleware<JwtMiddleware>();
app.UseAuthorization();

app.MapControllers();
app.UseHttpMethodOverride();
app.UseRouting();


app.Run();
