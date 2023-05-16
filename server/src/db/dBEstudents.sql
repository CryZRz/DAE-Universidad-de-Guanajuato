CREATE DATABASE siiaug;

use siiaug;

CREATE TABLE turns (
    id INT (255) NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    start_time TIME,
    end_time TIME,
    CONSTRAINT pk_turns PRIMARY KEY(id)
)

CREATE TABLE teachers (
    id INT(255) NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    CONSTRAINT pk_teachers PRIMARY KEY(id)
)

CREATE TABLE semesters (
    id INT (10) NOT NULL AUTO_INCREMENT,
    name INT (10) NOT NULL,
    CONSTRAINT pk_semesters PRIMARY KEY(id)
)

CREATE TABLE teams (
    id INT (255) NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    semester_id INT (255) NOT NULL,
    CONSTRAINT pk_teams PRIMARY KEY(id),
    CONSTRAINT fk_semester FOREIGN KEY(semester_id) REFERENCES semesters(id)
)

CREATE TABLE subjects (
    id INT (255) NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    credits INT (25) NOT NULL,
    teacher_id INT(255) NOT NULL,
    team_id INT (255) NOT NULL,
    semester_id INT(255) NOT NULL,
    CONSTRAINT pk_subjects PRIMARY KEY(id),
    CONSTRAINT fk_teacher FOREIGN KEY(teacher_id) REFERENCES users(id),
    CONSTRAINT fk_team FOREIGN KEY(team_id) REFERENCES teams(id)
)

CREATE TABLE students (
    id INT(255) NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    team_id int (255) NOT NULL,
    CONSTRAINT pk_students PRIMARY KEY(id),
    CONSTRAINT fk_team_students FOREIGN KEY(team_id) REFERENCES teams(id)
)

CREATE TABLE subjects_studied (
    id INT(255) NOT NULL AUTO_INCREMENT,
    subject_id INT (255) NOT NULL,
    student_id INT (255) NOT NULL,
    qualification int (10) NOT NULL,
    CONSTRAINT pk_subjects_studied PRIMARY KEY(id),
    CONSTRAINT fk_subject FOREIGN KEY(subject_id) REFERENCES subjects(id),
    CONSTRAINT fk_student FOREIGN KEY(student_id) REFERENCES students(id)
)

CREATE TABLE events (
    id INT(255) AUTO_INCREMENT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    CONSTRAINT pk_subjects_studied PRIMARY KEY(id)
);

CREATE TABLE subjects (
    id INT(255) AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    credits INT(255) NOT NULL,
    semester_id INT(255) NOT NULL
)

CREATE TABLE course_subjects(
    id INT(255) NOT NULL AUTO_INCREMENT,
    subject_id INT(255) NOT NULL,
    teacher_id INT(255),
    team_id INT(255) NOT NULL,
    CONSTRAINT pk_course_subjects PRIMARY KEY(id),
    CONSTRAINT fk_subject FOREIGN KEY(subject_id) REFERENCES subjects(id),
    CONSTRAINT fk_teacher FOREIGN KEY(teacher_id) REFERENCES users(id),
    CONSTRAINT fk_team FOREIGN KEY(team_id) REFERENCES teams(id),
)

CREATE TABLE subjects_studied (
    id INT(255) NOT NULL AUTO_INCREMENT,
    date_qualification_one DATE,
    qualification_one INT(10),
    date_qualification_two DATE,
    qualification_two INT(10),
    date_qualification_three DATE,
    qualification_three INT(10),
    CONSTRAINT pk_subjects_studied PRIMARY KEY(id),
    CONSTRAINT fk_subject FOREIGN KEY(subject_id) REFERENCES subjects(id),
    CONSTRAINT fk_student FOREIGN KEY(student_id) REFERENCES students(id)
)