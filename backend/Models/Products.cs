namespace InventoryManagementSystem.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal PurchasePrice { get; set; }
        public decimal SellingPrice { get; set; }
        public int SupplierId { get; set; }
        public Supplier Supplier { get; set; }

        public Product()
        {
            Supplier = new Supplier
            {
                Name = "Default Supplier Name",
                ContactInfo = "Default Contact Info"
            };
        }
    }
}