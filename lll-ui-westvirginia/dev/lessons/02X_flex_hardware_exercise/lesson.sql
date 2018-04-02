CREATE TABLE lesson (
    [title] NVARCHAR(28),
    [activities_type] NVARCHAR(7),
    [activities_name] NVARCHAR(7),
    [activities_feedback_valid_label] NVARCHAR(10),
    [activities_feedback_valid_text] NVARCHAR(47),
    [activities_feedback_invalid_label] NVARCHAR(1),
    [activities_isOptional] NVARCHAR(5)
);
INSERT INTO lesson VALUES (N'External Hardware - Exercise',N'custom',N' ',N'Great work',N'identifying all the parts of your new terminal!',N' ',NULL);
INSERT INTO lesson VALUES (N'External Hardware - Exercise',N'summary',N'Summary',NULL,NULL,NULL,N'False');
