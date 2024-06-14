namespace Domain.Constants
{
    public static class StatusCompanyConstant
    {
        public static readonly Dictionary<int, string> Dict = new()
        {
            { Pending, "Pending" },
            { TestAssessment, "Test Assessment" },
            { Interview, "Interview" },
            { OfferExtended, "Offer Extended" },
            { OfferAccepted, "Offer Accepted" },
            { Rejected, "Rejected" },
            { Withdrawn, "Withdrawn" },
            { Onboarding, "Onboarding" }
        };

        public const int Pending = 1;
        public const int TestAssessment = 2;
        public const int Interview = 3;
        public const int OfferExtended = 4;
        public const int OfferAccepted = 5;
        public const int Rejected = 6;
        public const int Withdrawn = 7;
        public const int Onboarding = 8;
    }
}
