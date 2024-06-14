namespace Domain.Constants
{
    public class TypeWorkDayConstant
    {
        public static Dictionary<int, string> Dict = new()
        {
            {Fulltime,"Full-Time" },
            {Parttime,"Part-Time" },
            {Freelance,"Freelance" },
        };
        public const int Fulltime = 1;
        public const int Parttime = 2;
        public const int Freelance = 3;
    }
}