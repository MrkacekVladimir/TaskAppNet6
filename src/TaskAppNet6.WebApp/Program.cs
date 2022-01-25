using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Events;
using TaskAppNet6.Application.Features.ToDoTasks.Commands;
using TaskAppNet6.Application.MediatR.Behaviours;
using TaskAppNet6.Persistence;
using TaskAppNet6.Persistence.Interceptors;
using TaskAppNet6.WebApp.Middlewares;

var builder = WebApplication.CreateBuilder(args);

//Logging
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .CreateLogger();
builder.Logging.AddSerilog(Log.Logger);

//CORS and ASP.NET Services
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy => policy.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin());
});
builder.Services.AddControllers();

//MediatR + FluentValidation
builder.Services.AddValidatorsFromAssembly(typeof(CreateToDoTask).Assembly);
builder.Services.AddMediatR(typeof(CreateToDoTask).Assembly);
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

//EF Core services
builder.Services.AddScoped<AuditEntityInterceptor>();
builder.Services.AddDbContext<ApplicationDbContext>((services, options) =>
{
    var auditInterceptor = services.GetRequiredService<AuditEntityInterceptor>();
    options.AddInterceptors(auditInterceptor);

    options.UseInMemoryDatabase("ToDoTasksTestingDatabase");
});

//Swagger
builder.Services.AddSwaggerGen(options => { options.CustomSchemaIds(x => x.FullName); });
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseMiddleware<ExceptionHandlerMiddleware>();
app.UseSwagger();
app.UseSwaggerUI();
app.UseRouting();
app.UseCors();
app.MapControllers();
app.MapFallbackToFile("index.html");
app.Run();