using System;
using TaskAppNet6.Core.Entities;
using Xunit;

namespace TestAppNet6.UnitTests.Entities
{
    public class ToDoTaskTests
    {
        [Fact]
        public void SettingPriorityGreaterThan5_Should_ThrowException()
        {
            //Arrange
            var task = new ToDoTask("Testing Task", "DESCRIPTION", 1, ToDoTaskStatus.Initial);

            //Act
            //Assert
            Assert.Throws<ArgumentOutOfRangeException>(() => { task.Priority = 7; });
        }

        [Fact]
        public void SettingPriorityGreaterThan5InConstructor_Should_ThrowException()
        {
            //Arrange
            //Act
            //Assert
            Assert.Throws<ArgumentOutOfRangeException>(() => { new ToDoTask("Testing Task", "DESCRIPTION", 8, ToDoTaskStatus.Initial); });
        }

        [Fact]
        public void SettingPriorityLowerThan1_Should_ThrowException()
        {
            //Arrange
            var task = new ToDoTask("Testing Task", "DESCRIPTION", 1, ToDoTaskStatus.Initial);

            //Act
            //Assert
            Assert.Throws<ArgumentOutOfRangeException>(() => { task.Priority = 0; });
        }

        [Fact]
        public void SettingPriorityLowerThan1InConstructor_Should_ThrowException()
        {
            //Arrange
            //Act
            //Assert
            Assert.Throws<ArgumentOutOfRangeException>(() => { new ToDoTask("Testing Task", "DESCRIPTION", 0, ToDoTaskStatus.Initial); });
        }
    }
}