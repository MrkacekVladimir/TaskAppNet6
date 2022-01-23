using System;

namespace TaskAppNet6.Core.Time
{
    /// <summary>
    ///     Provides unified time accessor to other system components.
    /// </summary>
    public interface ITimeProvider
    {
        /// <summary>
        ///     Gets a <see cref="System.DateTime" /> object that is set to the current date and time on current execution environment.
        /// </summary>
        DateTime Now { get; }
    }
}