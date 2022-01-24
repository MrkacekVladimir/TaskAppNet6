using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TaskAppNet6.Application.Features.ToDoTasks.Commands;
using TaskAppNet6.Persistence;
using TaskAppNet6.Persistence.Interceptors;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddMediatR(typeof(CreateToDoTask).Assembly);

builder.Services.AddScoped<AuditEntityInterceptor>();
builder.Services.AddDbContext<ApplicationDbContext>((services, options) =>
{
    var auditInterceptor = services.GetRequiredService<AuditEntityInterceptor>();
    options.AddInterceptors(auditInterceptor);

    options.UseInMemoryDatabase("ToDoTasksTestingDatabase");
});
builder.Services.AddSwaggerGen(options => { options.CustomSchemaIds(x => x.FullName); });
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy => policy.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin());
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseSwagger();
app.UseSwaggerUI();
app.UseRouting();
app.UseCors();
app.MapControllers();
app.MapFallbackToFile("index.html");
app.Run();