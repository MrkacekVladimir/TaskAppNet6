using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskAppNet6.Core.Entities;
using TaskAppNet6.Persistence;

namespace TaskAppNet6.Application.Features.ToDoTasks.Queries
{
    public class ListToDoTasks
    {
        public class Query : IRequest<Response>
        {
            public Query(int pageNumber = 1, int pageSize = 10)
            {
                PageNumber = pageNumber;
                PageSize = pageSize;
            }

            public int PageNumber { get; }
            public int PageSize { get; }
        }

        public record Response(int TotalCount, List<ListItem> Items);

        public record ListItem(int Id, string Name, string Description, int Priority, ToDoTaskStatus Status, DateTime CreatedOn);

        public class Handler : IRequestHandler<Query, Response>
        {
            private readonly ApplicationDbContext _dbContext;

            public Handler(ApplicationDbContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
            {
                var tasksQuery = _dbContext.ToDoTasks
                    .AsNoTracking();

                var totalCount = await tasksQuery.CountAsync(cancellationToken);

                var tasks = await tasksQuery.Skip((request.PageNumber - 1) * request.PageSize)
                    .Take(request.PageSize)
                    .Select(t => new ListItem(t.Id, t.Name, t.Description, t.Priority, t.Status, t.CreatedOn))
                    .ToListAsync(cancellationToken);

                return new Response(totalCount, tasks);
            }
        }
    }
}