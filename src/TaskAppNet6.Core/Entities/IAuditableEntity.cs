using System;

namespace TaskAppNet6.Core.Entities
{
    public interface IAuditableEntity
    {
        void AuditCreation();
        void AuditModification();
    }
}