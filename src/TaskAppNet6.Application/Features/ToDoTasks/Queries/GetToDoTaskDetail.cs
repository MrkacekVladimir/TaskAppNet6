using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskAppNet6.Core.Entities;
using TaskAppNet6.Persistence;

namespace TaskAppNet6.Application.Features.ToDoTasks.Queries
{
    public class GetToDoTasksDetail
    {
        public class Query : IRequest<Response?>
        {
            public Query(int id)
            {
                Id = id;
            }

            public int Id { get; }
        }

        public record Response(int Id, string Name, string Description, int Priority, ToDoTaskStatus Status);

        public class Handler : IRequestHandler<Query, Response?>
        {
            private readonly ApplicationDbContext _dbContext;

            public Handler(ApplicationDbContext dbContext)
            {
                _dbContext = dbContext;
            }

            public Task<Response?> Handle(Query request, CancellationToken cancellationToken)
                => _dbContext.ToDoTasks
                    .AsNoTracking()
                    .Select(t => new Response(t.Id, t.Name, t.Description, t.Priority, t.Status))
                    .FirstOrDefaultAsync(t => t.Id == request.Id, cancellationToken);
        }
    }
}