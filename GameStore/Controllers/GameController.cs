using GameStore.Context;
using GameStore.Dtos;
using GameStore.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public GameController(ApplicationDbContext context)
        {
            _context = context;
        }

        //CRUD

        //Create
        [HttpPost]
        public async Task<IActionResult> CreateGame([FromBody] CreateUpdateGameDto dto)
        {
            var newGame = new GameEntity()
            {
                Name = dto.Name,
                Genre = dto.Genre,
                AgeRating = dto.AgeRating,
                Description = dto.Description,
                Developer = dto.Developer,
                Publisher = dto.Publisher,
                CoverLink = dto.CoverLink
            };
            await _context.Games.AddAsync(newGame);
            await _context.SaveChangesAsync();

            return Ok("Game saved Succesfully");
        }

        //Read
        [HttpGet]
        public async Task<ActionResult<List<GameEntity>>> GetAllGames()
        {
            var games = await _context.Games.OrderByDescending(x=>x.UpdatedAt).ToListAsync();
            return Ok(games);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<GameEntity>> GetGameByID([FromRoute] long id)
        {
            var game = await _context.Games.FirstOrDefaultAsync(x => x.Id == id);

            if (game is null)
            {
                return NotFound("Game Not Fount");
            }
            return Ok(game);
        }

        //Update
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateGame([FromRoute] long id, [FromBody] CreateUpdateGameDto dto)
        {
         var game = await _context.Games.FirstOrDefaultAsync(x => x.Id == id);

            if (game is null)
            {
                return NotFound("Game Not Fount");
            }
            game.Name = dto.Name;
            game.Genre = dto.Genre;
            game.AgeRating = dto.AgeRating;
            game.Description = dto.Description;
            game.Developer = dto.Developer;
            game.Publisher = dto.Publisher;
            game.CoverLink = dto.CoverLink;
            game.UpdatedAt=DateTime.Now;


                await _context.SaveChangesAsync();
            return Ok("Game"+game.Name+"Updated Succesfully");
        }

        //Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] long id)
        {
            var game = await _context.Games.FirstOrDefaultAsync(x => x.Id == id);
            if (game is null)
            {
                return NotFound("Game Not Fount");
            }

            _context.Games.Remove(game);
            await _context.SaveChangesAsync();

            return Ok("Game Deleted Succesfully");
        }

    }
}
