namespace GameStore.Dtos
{
    public class CreateUpdateGameDto
    {
        public string Name { get; set; }
        public string Genre { get; set; }
        public int AgeRating { get; set; }
        public string Description { get; set; }
        public string Developer { get; set; }
        public string Publisher { get; set; }
        public string CoverLink { get; set; }
    }
}
