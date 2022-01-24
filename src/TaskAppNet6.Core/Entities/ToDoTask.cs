namespace TaskAppNet6.Core.Entities
{
    public class ToDoTask: BaseEntity
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
        public int Priority { get; set; }
        public ToDoTaskStatus Status { get; set; }
    }

    public enum ToDoTaskStatus
    {
        Initial = 1,
        InProgress = 2,
        Completed = 3
    }
}