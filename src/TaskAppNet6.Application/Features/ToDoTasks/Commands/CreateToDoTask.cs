using System.Data;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using TaskAppNet6.Core.Entities;
using TaskAppNet6.Persistence;

namespace TaskAppNet6.Application.Features.ToDoTasks.Commands
{
    public class CreateToDoTask
    {
        public class Command: IRequest<int>
        {
            public string Name { get; set; }
            public string Description { get; set; }
            public int Priority { get; set; }
            public ToDoTaskStatus Status { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(p => p.Name)
                    .NotEmpty().WithMessage("{PropertyName} cannot be empty")
                    .MaximumLength(256).WithMessage("{PropertyName} length cannot exceed 256 characters.");

                RuleFor(p => p.Priority)
                    .GreaterThanOrEqualTo(1).WithMessage("{PropertyName} must be in range from 1 to 5.")
                    .LessThanOrEqualTo(5).WithMessage("{PropertyName} must be in range from 1 to 5.");
            }
        }

        public class Handler: IRequestHandler<Command, int>
        {
            private readonly ApplicationDbContext _dbContext;

            public Handler(ApplicationDbContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                var task = new ToDoTask(request.Name, request.Description, request.Priority, request.Status);

                await _dbContext.ToDoTasks.AddAsync(task, cancellationToken);
                await _dbContext.SaveChangesAsync(cancellationToken);

                return task.Id;
            }
        }
    }
}