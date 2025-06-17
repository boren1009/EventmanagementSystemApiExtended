
-- Create extended DB
CREATE DATABASE EventManagementDB;
GO
USE EventManagementDB;
GO
CREATE TABLE Events (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    Date DATETIME NOT NULL,
    Location NVARCHAR(200),
    TicketPrice DECIMAL(10,2),
    ExpectedParticipants INT,
    NumSessions INT
);
GO
INSERT INTO Events (Title, Description, Date, Location, TicketPrice, ExpectedParticipants, NumSessions) VALUES
(N'Annual Conference', N'Tech conference', '2025-09-15', N'Tel Aviv', 120.00, 100, 5),
(N'Music Festival', N'Outdoor event', '2025-07-10', N'Jerusalem', 80.00, 150, 4);
GO
