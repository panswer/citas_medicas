
CREATE TABLE Doctores (
                doctor_id INT AUTO_INCREMENT NOT NULL,
                nombre VARCHAR(30) NOT NULL,
                apellido VARCHAR(30) NOT NULL,
                PRIMARY KEY (doctor_id)
);


CREATE TABLE Paciente (
                paciente_id INT AUTO_INCREMENT NOT NULL,
                nombre VARCHAR(30) NOT NULL,
                apellido VARCHAR(30) NOT NULL,
                DNI VARCHAR(30) NOT NULL,
                fecha_nacimiento DATE NOT NULL,
                PRIMARY KEY (paciente_id)
);


CREATE TABLE Admision (
                admision_id INT AUTO_INCREMENT NOT NULL,
                paciente_id INT NOT NULL,
                fecha_ingreso DATETIME DEFAULT NOW() NOT NULL,
                PRIMARY KEY (admision_id)
);


CREATE TABLE Citas (
                cita_id INT AUTO_INCREMENT NOT NULL,
                admision_id INT NOT NULL,
                status VARCHAR(30) DEFAULT "pendiente" NOT NULL,
                doctor_id INT NOT NULL,
                cuando DATE NOT NULL,
                consultorio INT DEFAULT 1 NOT NULL,
                direccion_paciente VARCHAR(30) NOT NULL,
                telefono VARCHAR(30) NOT NULL,
                telefono_allegado VARCHAR(30) NOT NULL,
                created_at DATETIME DEFAULT NOW() NOT NULL,
                updated_at DATETIME DEFAULT NOW() NOT NULL,
                PRIMARY KEY (cita_id)
);


CREATE TABLE Historial (
                historial_id INT AUTO_INCREMENT NOT NULL,
                cita_id INT NOT NULL,
                descripcion VARCHAR(30) NOT NULL,
                resumen VARCHAR(30) NOT NULL,
                created_at DATETIME DEFAULT NOW() NOT NULL,
                updated_at DATETIME DEFAULT NOW() NOT NULL,
                PRIMARY KEY (historial_id)
);


CREATE TABLE Alertas (
                alerta_id INT AUTO_INCREMENT NOT NULL,
                status VARCHAR(30) DEFAULT "pendiente" NOT NULL,
                paciente_id INT NOT NULL,
                razon VARCHAR(30) NOT NULL,
                created_at DATETIME DEFAULT NOW() NOT NULL,
                PRIMARY KEY (alerta_id)
);


ALTER TABLE Citas ADD CONSTRAINT doctorestable_citastable_fk
FOREIGN KEY (doctor_id)
REFERENCES Doctores (doctor_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Alertas ADD CONSTRAINT pacientetable_alertastable_fk
FOREIGN KEY (paciente_id)
REFERENCES Paciente (paciente_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Admision ADD CONSTRAINT pacientetable_admisiontable_fk
FOREIGN KEY (paciente_id)
REFERENCES Paciente (paciente_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Citas ADD CONSTRAINT admisiontable_citastable_fk
FOREIGN KEY (admision_id)
REFERENCES Admision (admision_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Historial ADD CONSTRAINT citastable_historialtable_fk
FOREIGN KEY (cita_id)
REFERENCES Citas (cita_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION;