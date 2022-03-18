INSERT INTO department (name)
VALUES 	("Ownership"), 
		("Executive Board"),
        ("Team Management"),
        ("Players"),
        ("Other");
      
       
INSERT INTO roles (title, salary, department_id)
VALUES ("Chairman", 900000, 1),
       ("Director of Football", 300000, 2),
       ("Head Coach", 800000, 3),
       ("Assistant Coach", 200000, 3),
       ("Player", 5000000, 4),
       ("Head of Marketing", 300000, 5),
       ("Kit Man," 30000, 5);
       
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Rebecca", "Welton", 1, 1),
       ("Leslie", "Higgins", 2, 1),
       ("Ted", "Lasso", 3, 1),
       ("'Coach'", "Beard", 4, 3),
       ("Nathan", "Shelley", 7, 3),
       ("Roy", "Kent", 5, 3),
       ("Jamie", "Tart", 5, 3),
       ("Sam", "Obisanya", 5, 3);
