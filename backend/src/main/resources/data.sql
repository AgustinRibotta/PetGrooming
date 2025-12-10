-- Insert Owners
INSERT INTO owner (id, name, phone_number) VALUES
(1, 'John Doe', '555-1234'),
(2, 'Jane Smith', '555-5678'),
(3, 'Alice Johnson', '555-9012');

-- Insert Pets
INSERT INTO pet (id, name, race, color, allergic, special_attention, observations, shidt_date_time, owner_id) VALUES
(1, 'Buddy', 'Golden Retriever', 'Golden', 'No', 'None', 'Very friendly', '2025-12-10 10:00:00', 1),
(2, 'Mittens', 'Siamese Cat', 'Cream', 'Yes', 'Requires daily medicine', 'Loves sleeping on sofas', '2025-12-10 11:30:00', 1),
(3, 'Charlie', 'Bulldog', 'Brindle', 'No', 'None', 'Prone to overheating', '2025-12-11 09:00:00', 2),
(4, 'Luna', 'Persian Cat', 'White', 'No', 'Special diet', 'Shy with strangers', '2025-12-12 14:00:00', 3),
(5, 'Max', 'Beagle', 'Tri-color', 'Yes', 'None', 'Very energetic', '2025-12-12 16:00:00', 2);
