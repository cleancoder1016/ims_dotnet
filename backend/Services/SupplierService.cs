using backend.Data;

namespace backend.Services
{
    public class SupplierService
    {
        private readonly ApplicationDbContext _context;

        public SupplierService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Add methods to manage suppliers here
    }
}