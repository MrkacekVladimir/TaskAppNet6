using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Logging;
using TaskAppNet6.Core.Entities;

namespace TaskAppNet6.Persistence.Interceptors
{
    public class AuditEntityInterceptor : SaveChangesInterceptor
    {
        private readonly ILogger<AuditEntityInterceptor> _logger;

        public AuditEntityInterceptor(ILogger<AuditEntityInterceptor> logger)
        {
            _logger = logger;
        }

        public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = new CancellationToken())
        {
            var auditableEntries = eventData.Context?.ChangeTracker.Entries<IAuditableEntity>();
            if (auditableEntries != null)
            {
                foreach (var entry in auditableEntries)
                {
                    switch (entry.State)
                    {
                        case EntityState.Added:
                            entry.Entity.AuditCreation();
                            break;
                        case EntityState.Modified:
                            entry.Entity.AuditModification();
                            break;
                    }
                }
            }

            return base.SavingChangesAsync(eventData, result, cancellationToken);
        }
    }
}