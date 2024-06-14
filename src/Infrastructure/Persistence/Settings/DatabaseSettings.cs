namespace Persistence.Settings
{
    public class DatabaseSettings
    {
        public const string SectioName = "DatabaseSettings";
        public static string Server { get; set; } = string.Empty;
        public static int Port { get; set; }
        public static string UserId { get; set; } = string.Empty;
        public static string Password { get; set; } = string.Empty;
        public static string Database { get; set; } = string.Empty;
        public static int CommandTimeout { get; set; }
    }
}