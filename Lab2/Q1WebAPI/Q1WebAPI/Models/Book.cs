namespace Q1WebAPI.Models;

public class Book
{
    public int Id { get; set; }
    public  string? Name { get; set; }
    public string? Description { get; set; }
    public double? Price { get; set; }
    public string? Note { get; set; }

    public Book()
    {
        
    }
}