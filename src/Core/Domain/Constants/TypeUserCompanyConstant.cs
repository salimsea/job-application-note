namespace Domain.Constants
{
    public class TypeUserCompanyConstant
    {
        public static Dictionary<int, string> Dict = new()
        {
            {EndUser,"End-User" },
            {Vendor,"Vendor" },
        };
        public const int EndUser = 1;
        public const int Vendor = 2;
    }
}