using System;

namespace TaskAppNet6.Core.Entities
{
    public class ToDoTask : BaseEntity
    {
        /// <summary>
        ///     Private constructor for EF Core Activator.
        /// </summary>
        private ToDoTask()
        {
        }

        public ToDoTask(string name, string description, int priority, ToDoTaskStatus status)
        {
            Name = name;
            Description = description;
            Priority = priority;
            Status = status;
        }

        public int Id { get; private set; }
        public string Name { get; set; }
        public string Description { get; set; }

        private int _priority = 1;
        public int Priority
        {
            get => _priority;
            set
            {
                if (value < 1 || value > 5)
                    throw new ArgumentOutOfRangeException(nameof(Priority), "Priority must be from 1 to 5");

                _priority = value;
            }
        }

        public ToDoTaskStatus Status { get; set; }
    }

    public enum ToDoTaskStatus
    {
        Initial = 1,
        InProgress = 2,
        Completed = 3
    }
}