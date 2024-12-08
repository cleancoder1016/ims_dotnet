namespace InventoryManagementSystem.Models
{
    public class Stock
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int CurrentStock { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}