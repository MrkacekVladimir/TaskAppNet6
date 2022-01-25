using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskAppNet6.Core.Entities;
using TaskAppNet6.Persistence;

namespace TaskAppNet6.Application.Features.ToDoTasks.Commands
{
    public class UpdateToDoTaskStatus
    {
        public class Command : IRequest<bool>
        {
            public int Id { get; set; }
            public ToDoTaskStatus Status { get; set; }
        }

        public class Handler : IRequestHandler<Command, bool>
        {
            private readonly ApplicationDbContext _dbContext;

            public Handler(ApplicationDbContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
            {
                var task = await _dbContext.ToDoTasks.FirstOrDefaultAsync(t => t.Id == request.Id, cancellationToken);
                if (task is null)
                    return false;

                if (task.Status == ToDoTaskStatus.Completed)
                    throw new InvalidOperationException("Completed status cannot be modified.");

                task.Status = request.Status;
                await _dbContext.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}