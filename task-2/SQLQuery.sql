WITH RecursiveSubdivisions AS (
    SELECT 
        s.id,
        s.name,
        s.parent_id,
        0 as level
    FROM subdivisions s
    WHERE s.id = (SELECT subdivision_id FROM collaborators WHERE id = 710253)
    
    UNION ALL
    
    -- Recursive: find Subdivisions
    SELECT 
        s.id,
        s.name,
        s.parent_id,
        r.level + 1 as level
    FROM subdivisions s 
    INNER JOIN RecursiveSubdivisions r ON s.parent_id = r.id
    WHERE s.id NOT IN (100055, 100059)
)
SELECT 
    c.id,
    c.name,
    s.name as sub_name,
    c.subdivision_id as sub_id,
    s.level as sub_level,
    (SELECT COUNT(*) FROM collaborators c2 WHERE c2.subdivision_id = c.subdivision_id) as colls_count
FROM collaborators c
INNER JOIN RecursiveSubdivisions s ON c.subdivision_id = s.id
WHERE c.age < 40
  AND s.level > 0
ORDER BY s.level ASC;