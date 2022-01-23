using System;
using TaskAppNet6.Core.Time;

namespace TaskAppNet6.Core.Entities
{
    public class BaseEntity: IAuditableEntity
    {
        public DateTime CreatedOn { get; private set; } = SystemTime.Now;
        public DateTime? LastModifiedOn { get; private set; }

        public void AuditCreation()
        {
            CreatedOn = SystemTime.Now;
        }

        public void AuditModification()
        {
            LastModifiedOn = SystemTime.Now;
        }
    }
}