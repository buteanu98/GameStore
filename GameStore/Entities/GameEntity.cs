using System.ComponentModel.DataAnnotations;
namespace GameStore.Entities
{
    public class GameEntity
    {
        [Key]
        public long Id { get; set; }

        public string Name { get; set; }
        public string Genre { get; set; }
        public int AgeRating { get; set; }
        public string Description { get; set; }
        public string Developer { get; set; }
        public string Publisher { get; set; }
        public string CoverLink { get; set; } 

        public DateTime CreatedAt { get; set; }=DateTime.Now;

        public DateTime UpdatedAt { get;set; }=DateTime.Now;
    }
}
