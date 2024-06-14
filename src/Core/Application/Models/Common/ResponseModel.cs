namespace Application.Models.Common;

public class ResponseModel<T>
{
    public bool IsSuccess { get; set; }
    public string? ReturnMessage { get; set; }
    public T? Data { get; set; }
}
