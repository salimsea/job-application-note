namespace Domain.Constants
{
    public class TypeWorkPlaceConstant
    {
        public static Dictionary<int, string> Dict = new()
        {
            {Hybrid,"Hybrid" },
            {Remote,"Remote" },
            {Onsite,"Onsite" },
        };
        public const int Hybrid = 1;
        public const int Remote = 2;
        public const int Onsite = 3;
    }
}