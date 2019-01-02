create database survey_db;
use survey_db;
create table friends(
id          int auto_increment primary key,
name        varchar(100),
img_url     varchar(100)
);

create table questions(
id          int auto_increment primary key,
question    varchar(100)
);

create table answers(
question_id   int references questions(id),
friend_id     int references friends(id),
answer        int
);

insert into questions(question) values 
("Your mind is always buzzing with unexplored ideas and plans."),
("Generally speaking, you rely more on your experience than your imagination."),
("You find it easy to stay relaxed and focused even when there is some pressure."),
("You rarely do something just out of sheer curiosity."),
("People can rarely upset you."),
("It is often difficult for you to relate to other people’s feelings."),
("In a discussion, truth should be more important than people’s sensitivities."),
("You rarely get carried away by fantasies and ideas."),
("You think that everyone’s views should be respected regardless of whether they are supported by facts or not."),
("You feel more energetic after spending time with a group of people.")



INSERT INTO answers (friend_id,question_id,answer) values(1,2,5)
