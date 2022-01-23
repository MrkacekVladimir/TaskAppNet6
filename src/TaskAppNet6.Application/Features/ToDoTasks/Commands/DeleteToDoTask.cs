using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskAppNet6.Core.Entities;
using TaskAppNet6.Persistence;

namespace TaskAppNet6.Application.Features.ToDoTasks.Commands
{
    public class DeleteToDoTask
    {
        public class Command : IRequest<(bool WasDeleted, ToDoTask? Task)>
        {
            public Command(int Id)
            {
                this.Id = Id;
            }

            public int Id { get; }
        }

        public class Handler : IRequestHandler<Command, (bool WasDeleted, ToDoTask? Task)>
        {
            private readonly ApplicationDbContext _dbContext;

            public Handler(ApplicationDbContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<(bool WasDeleted, ToDoTask? Task)> Handle(Command request, CancellationToken cancellationToken)
            {
                var task = await _dbContext.ToDoTasks.FirstOrDefaultAsync(t => t.Id == request.Id, cancellationToken);
                if (task is null)
                    return (false, null);

                _dbContext.ToDoTasks.Remove(task);
                await _dbContext.SaveChangesAsync(cancellationToken);

                return (true, task);
            }
        }
    }
}