using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaskAppNet6.Application.Features.ToDoTasks.Commands;
using TaskAppNet6.Application.Features.ToDoTasks.Queries;
using TaskAppNet6.Core.Entities;

namespace TaskAppNet6.WebApp.Controllers
{
    public class ToDoTasksController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<ListToDoTasks.Response>> List(int pageNumber = 1, int pageSize = 10)
        {
            var query = new ListToDoTasks.Query(pageNumber, pageSize);
            var response = await Mediator.Send(query);
            return Ok(response);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<GetToDoTasksDetail.Response>> Get(int id)
        {
            var query = new GetToDoTasksDetail.Query(id);
            var response = await Mediator.Send(query);
            if (response is null)
                return NotFound();

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create([FromBody] CreateToDoTask.Command command)
        {
            var response = await Mediator.Send(command);
            return CreatedAtAction(nameof(Get), new {id = response}, response);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<int>> Update(int id, [FromBody] UpdateToDoTask.Command command)
        {
            command.Id = id;
            var wasUpdated = await Mediator.Send(command);
            if (!wasUpdated)
                return NotFound(wasUpdated);

            return Ok(wasUpdated);
        }


        [HttpPut("{id:int}/status")]
        public async Task<ActionResult<int>> UpdateStatus(int id, [FromBody] UpdateToDoTaskStatus.Command command)
        {
            command.Id = id;
            var wasUpdated = await Mediator.Send(command);
            if (!wasUpdated)
                return NotFound(wasUpdated);

            return Ok(wasUpdated);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var command = new DeleteToDoTask.Command(id);
            var response = await Mediator.Send(command);
            if (!response.WasDeleted)
                return NotFound();

            return Ok(response.Task);
        }
    }
}