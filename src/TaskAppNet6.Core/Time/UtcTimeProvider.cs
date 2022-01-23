using System;

namespace TaskAppNet6.Core.Time
{
    /// <summary>
    ///     Provides Coordinated Universal Time (UTC) time accessor to other system components.
    /// </summary>
    public class UtcTimeProvider : ITimeProvider
    {
        /// <summary>
        ///     Gets a <see cref="System.DateTime" /> object that is set to the current date and time on current execution
        ///     environment, expressed as the Coordinated Universal Time (UTC).
        /// </summary>
        public DateTime Now => DateTime.UtcNow;
    }
}