using System;

namespace TaskAppNet6.Core.Time
{
    /// <summary>
    ///     Singleton time accessor for system components.
    /// </summary>
    /// <remarks>Default <see cref="ITimeProvider" /> is set to <see cref="UtcTimeProvider" />.</remarks>
    public static class SystemTime
    {
        /// <summary>
        ///     Injected provider with time accessor. Unless assigned explicitly, a <see cref="UtcTimeProvider" /> is used as default implementation.
        /// </summary>
        private static ITimeProvider Provider { get; set; } = new UtcTimeProvider();

        /// <summary>
        ///     Gets a <see cref="System.DateTime" /> object that is set to the current date and time in current <see cref="ITimeProvider" /> instance.
        /// </summary>
        public static DateTime Now => Provider.Now;

        /// <summary>
        ///     Injects provider dependency into current execution environment.
        /// </summary>
        /// <param name="provider">The <see cref="ITimeProvider" /> for current execution environment.</param>
        public static void SetProvider(ITimeProvider provider)
        {
            Provider = provider;
        }
    }
}